// Judge.me reviews for the product page, read server-side with the PRIVATE
// token (never sent to the browser). Same approach as hookedjapan.nl:
//  - a hard overall deadline, so a slow Judge.me can never hold up a page;
//  - a cheap, cached shop-wide count that skips all other calls while the
//    store has no reviews;
//  - only published, moderated reviews are shown.
//
// Env: NAUTICTALK_JUDGEME_PRIVATE_TOKEN (Judge.me > Settings > Integrations >
// View API tokens). The shop domain is the store's myshopify domain, taken
// from NEXT_PUBLIC_NAUTICTALK_SHOPIFY_STORE_DOMAIN unless set separately.

import { unstable_cache } from "next/cache";

export const JUDGEME_SHOP =
  process.env.NAUTICTALK_JUDGEME_SHOP_DOMAIN ||
  process.env.NEXT_PUBLIC_NAUTICTALK_SHOPIFY_STORE_DOMAIN ||
  "";
const TOKEN = process.env.NAUTICTALK_JUDGEME_PRIVATE_TOKEN || "";
const API = "https://api.judge.me/api/v1";

/** Reviews are switched on once the Judge.me token is in place. */
export const reviewsConnected = Boolean(JUDGEME_SHOP && TOKEN);

const REQ_TIMEOUT = 2500;
const OVERALL_DEADLINE = 3000;

export interface Review {
  id: number;
  rating: number;
  title: string;
  body: string;
  name: string;
  createdAt: string;
  verified: boolean;
}

export interface ProductReviews {
  rating: number; // average, one decimal
  count: number;
  reviews: Review[];
}

export const NO_REVIEWS: ProductReviews = { rating: 0, count: 0, reviews: [] };

export function numericId(gid: string): string | null {
  const m = String(gid).match(/(\d+)\s*$/);
  return m ? m[1] : null;
}

async function getJson(url: string): Promise<Record<string, unknown> | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(REQ_TIMEOUT) });
    if (!res.ok) return null;
    return (await res.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

const auth = () => `api_token=${TOKEN}&shop_domain=${JUDGEME_SHOP}`;

const shopCount = unstable_cache(
  async () => {
    if (!reviewsConnected) return 0;
    const json = await getJson(`${API}/reviews/count?${auth()}`);
    const c = Number(json?.count);
    return Number.isFinite(c) ? c : 0;
  },
  ["nt-judgeme-count"],
  { revalidate: 3600, tags: ["judgeme"] },
);

// Shopify product id -> Judge.me product id (the catalogue is small).
const productMap = unstable_cache(
  async () => {
    const map: Record<string, number> = {};
    if (!reviewsConnected) return map;
    for (let page = 1; page <= 3; page++) {
      const json = await getJson(`${API}/products?${auth()}&per_page=100&page=${page}`);
      const list = (json?.products as Array<Record<string, unknown>>) || [];
      for (const p of list) {
        if (p?.external_id != null && p?.id != null) map[String(p.external_id)] = Number(p.id);
      }
      if (list.length < 100) break;
    }
    return map;
  },
  ["nt-judgeme-products"],
  { revalidate: 3600, tags: ["judgeme"] },
);

function isLive(r: Record<string, unknown>) {
  if (!r || typeof r.rating !== "number" || r.rating <= 0) return false;
  if (r.hidden === true || r.published === false) return false;
  if (r.curated != null && r.curated !== "ok") return false;
  return true;
}

async function fetchReviews(jmId: number, externalId: string): Promise<ProductReviews> {
  const raw: Array<Record<string, unknown>> = [];
  for (let page = 1; page <= 3; page++) {
    const json = await getJson(
      `${API}/reviews?${auth()}&product_id=${jmId}&published=true&per_page=100&page=${page}`,
    );
    const list = (json?.reviews as Array<Record<string, unknown>>) || [];
    raw.push(...list);
    if (list.length < 100) break;
  }
  const live = raw.filter((r) => {
    if (!isLive(r)) return false;
    const ref = r.product_id ?? r.product_external_id;
    return ref == null || String(ref) === String(jmId) || String(ref) === externalId;
  });
  if (live.length === 0) return NO_REVIEWS;
  const avg = live.reduce((s, r) => s + Number(r.rating), 0) / live.length;
  return {
    rating: Math.round(avg * 10) / 10,
    count: live.length,
    reviews: live.slice(0, 20).map((r) => {
      const reviewer = (r.reviewer as Record<string, unknown>) || {};
      return {
        id: Number(r.id) || 0,
        rating: Number(r.rating) || 0,
        title: typeof r.title === "string" ? r.title : "",
        body: typeof r.body === "string" ? r.body : "",
        name:
          (typeof reviewer.name === "string" && reviewer.name) ||
          (typeof r.reviewer_name === "string" && r.reviewer_name) ||
          "Klant",
        createdAt: typeof r.created_at === "string" ? r.created_at : "",
        verified: r.verified === true || r.verified === "buyer",
      };
    }),
  };
}

/** Reviews for one product (Shopify GID). Never throws, never waits longer than 3 s. */
export async function getProductReviews(gid: string): Promise<ProductReviews> {
  try {
    if (!reviewsConnected) return NO_REVIEWS;
    const externalId = numericId(gid);
    if (!externalId) return NO_REVIEWS;
    return await Promise.race([
      (async () => {
        if (!(await shopCount())) return NO_REVIEWS;
        const jmId = (await productMap())[externalId];
        if (!jmId) return NO_REVIEWS;
        return unstable_cache(() => fetchReviews(jmId, externalId), ["nt-judgeme-reviews", String(jmId)], {
          revalidate: 3600,
          tags: ["judgeme"],
        })();
      })(),
      new Promise<ProductReviews>((resolve) => setTimeout(() => resolve(NO_REVIEWS), OVERALL_DEADLINE)),
    ]);
  } catch {
    return NO_REVIEWS;
  }
}
