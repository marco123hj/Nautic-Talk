import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import {
  getProductByHandle,
  getProducts,
  getCategory,
  type ShopifyProduct,
} from "@/lib/shopify";
import { categoryLabel, displayName, formatPrice, shopCopy, specLine, specRows } from "@/lib/catalog";
import { COMPANY } from "@/lib/site";
import AddToCartButton from "@/components/cart/AddToCartButton";
import ProductCard from "@/components/shop/ProductCard";
import ProductDetails from "@/components/shop/ProductDetails";
import Reviews from "@/components/shop/Reviews";
import Stars from "@/components/shop/Stars";
import { REVIEW_COPY } from "@/components/shop/reviewCopy";
import { getProductReviews, reviewsConnected } from "@/lib/judgeme";
import Gallery from "@/components/shop/Gallery";
import p from "@/components/shop/product.module.css";

// Shipping and returns lines repeat what the site and the returns page
// already promise (lib/legal.ts); change them there first.
const COPY = {
  nl: {
    vat: "incl. btw, verzending apart",
    facts: ["Gratis verzending vanaf € 120", "30 dagen bedenktijd", "2 jaar garantie"],
    help: "Vragen over dit product? Bel",
    related: "Bekijk ook",
    picture: "Foto",
    error: "Dit product kon niet geladen worden.",
    back: "Terug naar alle producten",
    details: {
      description: "Beschrijving",
      specs: "Specificaties",
      shipping: "Verzending en retour",
      more: "Lees meer",
      less: "Minder tonen",
      shippingLines: [
        "Gratis verzending vanaf € 120. Daaronder zie je de verzendkosten bij het afrekenen.",
        "We verzenden binnen 24 tot 72 uur, door de hele EU.",
        "Je hebt 30 dagen bedenktijd. Stuur het product compleet terug en je krijgt je geld terug. Het terugsturen betaal je zelf, behalve bij een defect of een verkeerde levering.",
        "2 jaar garantie. Is er iets kapot, dan lossen wij het op en betalen wij de verzending.",
      ],
      returnsLink: "Alles over retourneren",
    },
  },
  en: {
    vat: "incl. VAT, shipping extra",
    facts: ["Free shipping from € 120", "30-day returns", "2-year warranty"],
    help: "Questions about this product? Call",
    related: "You may also need",
    picture: "Picture",
    error: "This product could not be loaded.",
    back: "Back to all products",
    details: {
      description: "Description",
      specs: "Specifications",
      shipping: "Shipping and returns",
      more: "Read more",
      less: "Show less",
      shippingLines: [
        "Free shipping from € 120. Below that, you see the shipping cost at checkout.",
        "We ship within 24 to 72 hours, across the EU.",
        "You have 30 days to change your mind. Send the product back complete and you get your money back. Return shipping is on you, unless the product is faulty or we sent the wrong item.",
        "2-year warranty. If something breaks, we fix it and pay the shipping.",
      ],
      returnsLink: "All about returns",
    },
  },
};

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4 4L19 6.5" />
    </svg>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string; locale: string }>;
}) {
  const { handle, locale } = await params;
  const product = await getProductByHandle(handle).catch(() => null);
  if (!product) return {};
  return {
    title: displayName(product, locale),
    description: product.description?.slice(0, 160),
  };
}

// Same category first, then the two sets, then the rest.
function pickRelated(all: ShopifyProduct[], current: ShopifyProduct, limit = 4) {
  const cat = getCategory(current);
  const others = all.filter((x) => x.id !== current.id);
  const w = (x: ShopifyProduct) =>
    getCategory(x) === cat ? 0 : x.handle === "nautic-talk-trio" || x.handle === "nautic-talk-duo" ? 1 : 2;
  return [...others].sort((a, b) => w(a) - w(b)).slice(0, limit);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string; locale: string }>;
}) {
  const { handle, locale } = await params;
  setRequestLocale(locale);
  const t = COPY[locale === "en" ? "en" : "nl"];
  const c = shopCopy(locale);

  let product: ShopifyProduct | null = null;
  let all: ShopifyProduct[] = [];
  try {
    [product, all] = await Promise.all([getProductByHandle(handle), getProducts(40)]);
  } catch {
    return (
      <div className={p.wrap} style={{ padding: "4rem 1.25rem" }}>
        <p>{t.error}</p>
        <Link href="/productos">{t.back}</Link>
      </div>
    );
  }
  if (!product) notFound();

  // Reviews show once the Judge.me token is set; locally the section is
  // always there so the design can be checked.
  const showReviews = reviewsConnected || process.env.NODE_ENV !== "production";
  const reviews = await getProductReviews(product.id);
  const rc = REVIEW_COPY[locale === "en" ? "en" : "nl"];
  const ratingText = reviews.rating.toLocaleString(locale === "en" ? "en-GB" : "nl-NL", { maximumFractionDigits: 1 });

  const name = displayName(product, locale);
  const category = getCategory(product);
  const price = product.priceRange.minVariantPrice;
  const images = product.images.edges.map((e) => e.node);
  const variants = product.variants?.edges.map((e) => e.node) ?? [];
  const available = product.availableForSale ?? variants.some((v) => v.availableForSale);
  const related = pickRelated(all, product);
  const tel = COMPANY.phone.replace(/\s/g, "");

  return (
    <div className={p.wrap}>
      <nav aria-label="Breadcrumb">
        <ol className={p.crumbs}>
          <li><Link href="/">{c.home}</Link></li>
          <li><Link href="/productos">{c.products}</Link></li>
          <li><Link href={`/productos?category=${category}`}>{categoryLabel(category, locale)}</Link></li>
          <li aria-current="page">{name}</li>
        </ol>
      </nav>

      <div className={p.top}>
        <Gallery images={images} name={name} thumbLabel={t.picture} />

        <div className={p.head}>
          <h1 className={p.title}>{name}</h1>
          {reviews.count > 0 && (
            <a href="#reviews" className={p.rating}>
              <Stars rating={reviews.rating} label={rc.outOf(ratingText)} />
              <span>{ratingText} · {rc.count(reviews.count)}</span>
            </a>
          )}
          <p className={p.spec}>{specLine(product, locale)}</p>
          <div className={p.priceRow}>
            <p className={p.price}>{formatPrice(price.amount, price.currencyCode, locale)}</p>
            <p className={p.vat}>{t.vat}</p>
          </div>
          <p className={`${p.stock} ${available ? "" : p.stockOut}`}>{available ? c.available : c.soldOut}</p>
        </div>

        <div className={p.purchase}>
          <AddToCartButton
            handle={product.handle}
            title={name}
            image={images[0]?.url}
            variants={variants.map((v) => ({
              id: v.id,
              title: v.title,
              availableForSale: v.availableForSale,
              price: v.price,
            }))}
          />

          <ul className={p.facts}>
            {t.facts.map((f) => (
              <li key={f}><Check /> {f}</li>
            ))}
            <li><Check /> <span>{t.help} <a href={`tel:${tel}`}>{COMPANY.phone}</a></span></li>
          </ul>

          <ProductDetails
            html={product.descriptionHtml}
            specs={specRows(product.handle, locale)}
            copy={t.details}
          />
        </div>
      </div>

      {showReviews && <Reviews data={reviews} gid={product.id} productName={name} locale={locale} />}

      {related.length > 0 && (
        <section
          className={p.section}
          aria-labelledby="related-title"
          style={{ marginBottom: 96 }}
          {...(showReviews ? {} : { "data-buy-bar-end": "" })}
        >
          <h2 className={p.h2} id="related-title">{t.related}</h2>
          <div className={p.related}>
            {related.map((r) => (
              <ProductCard key={r.id} product={r} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
