import { NextRequest, NextResponse } from "next/server";
import { JUDGEME_SHOP } from "@/lib/judgeme";

// A customer review from the product page, passed on to Judge.me's public
// review endpoint (the same one its own widget uses). No API token is sent:
// Judge.me treats it as a web review, so it only works while "reviews via
// integrations (API)" is on in Judge.me. Whether it goes live at once or waits
// for approval is set in Judge.me (Publiceren en moderatie); on 18 Nov 2026
// Marco chose to publish at once. The site picks it up within the hour.

const JUDGEME_URL = "https://judge.me/api/v1/reviews";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Small in-memory limit: 3 reviews per minute per address.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 3;
}

export async function POST(request: NextRequest) {
  try {
    if (!JUDGEME_SHOP) {
      return NextResponse.json({ error: "Reviews are not available right now." }, { status: 503 });
    }
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    if (limited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 415 });
    }

    const body = await request.json();
    if (body.website) return NextResponse.json({ success: true }); // honeypot

    const { productId, name, email, rating, title, review } = body;
    const stars = Number(rating);
    const ok =
      /^\d+$/.test(String(productId ?? "")) &&
      typeof name === "string" && name.trim().length > 0 && name.length <= 100 &&
      typeof email === "string" && EMAIL.test(email) && email.length <= 320 &&
      Number.isInteger(stars) && stars >= 1 && stars <= 5 &&
      typeof review === "string" && review.trim().length > 0 && review.length <= 5000 &&
      (title == null || (typeof title === "string" && title.length <= 140));
    if (!ok) return NextResponse.json({ error: "Invalid review" }, { status: 400 });

    const params = new URLSearchParams({
      shop_domain: JUDGEME_SHOP,
      platform: "shopify",
      id: String(productId),
      name: name.trim(),
      email: email.trim(),
      rating: String(stars),
      body: review.trim(),
    });
    if (title?.trim()) params.set("title", title.trim());

    const upstream = await fetch(JUDGEME_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body: params.toString(),
      signal: AbortSignal.timeout(8000),
    });
    if (!upstream.ok) {
      console.error("Judge.me review error:", upstream.status);
      return NextResponse.json({ error: "Failed to submit review" }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
