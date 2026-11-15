import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  getProducts,
  getNewestProducts,
  getCategory,
  type ShopifyProduct,
} from "@/lib/shopify";
import CrewHero from "@/components/home/CrewHero";
import NewsletterForm from "@/components/NewsletterForm";

function formatPrice(
  amount: string,
  currency: string,
  locale: string = "es-ES",
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(parseFloat(amount));
}

function priceLocale(locale: string) {
  switch (locale) {
    case "nl":
      return "nl-NL";
    case "en":
      return "en-GB";
    default:
      return "es-ES";
  }
}

/* ============ ICONS ============ */

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" />
    </svg>
  );
}

function IconHeadset() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M10 28v-4c0-7.7 6.3-14 14-14s14 6.3 14 14v4" />
      <rect x="6" y="28" width="8" height="12" rx="2" />
      <rect x="34" y="28" width="8" height="12" rx="2" />
      <path d="M38 40v2c0 2-1.5 4-4 4h-4" />
    </svg>
  );
}

function IconAnchor() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <circle cx="24" cy="9" r="3.5" />
      <path d="M24 12.5V38" />
      <path d="M16 18h16" />
      <path d="M8 28c0 8.5 7 14 16 14s16-5.5 16-14" />
      <path d="M8 28l-3 2.5M40 28l3 2.5" />
    </svg>
  );
}

function IconBike() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <circle cx="11" cy="33" r="7" />
      <circle cx="37" cy="33" r="7" />
      <path d="M11 33l8-15h11l7 15" />
      <path d="M19 18h-4" />
      <path d="M30 18l-3-6h-4" />
    </svg>
  );
}

function IconHardhat() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M8 32c0-9 7-16 16-16s16 7 16 16" />
      <path d="M5 36h38" />
      <path d="M5 36v3h38v-3" />
      <path d="M19 16v-4h10v4" />
      <path d="M14 28l2-6M34 28l-2-6" />
    </svg>
  );
}

function IconWaveform() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M5 24h4M13 18v12M19 12v24M25 18v12M31 9v30M37 18v12M43 24h-2" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M27 6L9 28h12l-3 14 18-22H24l3-14z" />
    </svg>
  );
}

function IconStack() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M24 6l18 9-18 9L6 15l18-9z" />
      <path d="M6 24l18 9 18-9" />
      <path d="M6 33l18 9 18-9" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
      <path d="M8.5 12l2.5 2.5L16 9.5" />
    </svg>
  );
}

function IconTruck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M2.5 6.5h11v9h-11z" />
      <path d="M13.5 10h4l4 3.5v2h-8z" />
      <circle cx="7" cy="18" r="1.7" />
      <circle cx="17" cy="18" r="1.7" />
    </svg>
  );
}

function IconReturns() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M4 11a8 8 0 1 1 2.5 5.8" />
      <path d="M4 5v6h6" />
    </svg>
  );
}

function IconSupport() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M5 13v-2a7 7 0 0 1 14 0v2" />
      <rect x="3" y="12.5" width="4" height="6" rx="1.5" />
      <rect x="17" y="12.5" width="4" height="6" rx="1.5" />
      <path d="M19 18.5v.5a3 3 0 0 1-3 3h-3" />
    </svg>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale });
  const priceLoc = priceLocale(locale);

  let products: ShopifyProduct[] = [];
  let newArrivals: ShopifyProduct[] = [];
  try {
    [products, newArrivals] = await Promise.all([
      getProducts(20),
      getNewestProducts(8),
    ]);
  } catch {
    // Fallback handled per section
  }

  const trio =
    products.find((p) => p.handle === "nautic-talk-trio") ?? products[0];
  const duo = products.find((p) => p.handle === "nautic-talk-duo");

  const featured = [
    trio,
    duo,
    ...products.filter(
      (p) => p && p.handle !== "nautic-talk-trio" && p.handle !== "nautic-talk-duo",
    ),
  ]
    .filter(Boolean)
    .slice(0, 4) as ShopifyProduct[];

  const newIn = newArrivals.slice(0, 4);


  const repImage = (category: string) =>
    products.find((p) => getCategory(p) === category)?.images.edges[0]?.node.url;

  const cats = [
    { href: "/productos?category=Intercomunicadores", label: t("filters.catIntercoms"), category: "Intercomunicadores", Icon: IconHeadset },
    { href: "/productos?category=Soportes", label: t("filters.catMounts"), category: "Soportes", Icon: IconStack },
    { href: "/productos?category=Cascos", label: t("filters.catHelmets"), category: "Cascos", Icon: IconHardhat },
    { href: "/productos?category=Auriculares", label: t("filters.catHeadsets"), category: "Auriculares", Icon: IconWaveform },
    { href: "/productos?category=Accesorios", label: t("filters.catAccessories"), category: "Accesorios", Icon: IconBolt },
  ];

  const bigCards = [
    { product: trio, tag: t("nav.category.trioDesc") },
    { product: duo, tag: t("nav.category.duoDesc") },
  ].filter((c) => c.product);

  const trustBadges = [
    { Icon: IconShield, title: t("product.trustWarrantyTitle"), desc: t("product.trustWarrantyDesc") },
    { Icon: IconTruck, title: t("product.trustShippingTitle"), desc: t("product.trustShippingDesc") },
    { Icon: IconReturns, title: t("product.trustReturnsTitle"), desc: t("product.trustReturnsDesc") },
    { Icon: IconSupport, title: t("product.trustSupportTitle"), desc: t("product.trustSupportDesc") },
  ];

  const productCard = (product: ShopifyProduct, index: number) => {
    const image = product.images.edges[0]?.node;
    const price = product.priceRange.minVariantPrice;
    return (
      <Link
        key={product.id}
        href={`/productos/${product.handle}`}
        className="product-card"
      >
        <div className="product-card-image">
          {image && (
            <img
              src={image.url}
              alt={image.altText ?? product.title}
              loading={index < 4 ? "eager" : "lazy"}
            />
          )}
        </div>
        <div className="product-card-vendor">{product.vendor || "Nautic Talk"}</div>
        <div className="product-card-title">{product.title}</div>
        <div className="product-card-bottom">
          <span className="product-card-price">
            {formatPrice(price.amount, price.currencyCode, priceLoc)}
          </span>
          <span className="product-card-arrow">
            {t("featured.viewShort")} <ArrowRight size={12} />
          </span>
        </div>
      </Link>
    );
  };

  return (
    <>
      <CrewHero
        headline="Praat met je hele crew."
        lead="Eén Bluetooth-module klikt op elke helm, op het water, op de fiets of op de bouwplaats, en verbindt 2 of 3 mensen handsfree."
        meta="Handsfree · Draadloos · Klikt op elke helm"
        ctaPrefix="Bekijk de"
        duo={{
          key: "duo",
          label: "Duo",
          count: "2 personen",
          price: duo
            ? `Vanaf ${formatPrice(duo.priceRange.minVariantPrice.amount, duo.priceRange.minVariantPrice.currencyCode, priceLoc)}`
            : "",
          href: duo ? `/productos/${duo.handle}` : "/productos",
          img: duo?.images.edges[0]?.node.url,
          alt: duo?.images.edges[0]?.node.altText ?? "Nautic Talk Duo",
        }}
        trio={{
          key: "trio",
          label: "Trio",
          count: "3 personen",
          price: trio
            ? `Vanaf ${formatPrice(trio.priceRange.minVariantPrice.amount, trio.priceRange.minVariantPrice.currencyCode, priceLoc)}`
            : "",
          href: trio ? `/productos/${trio.handle}` : "/productos",
          img: trio?.images.edges[0]?.node.url,
          alt: trio?.images.edges[0]?.node.altText ?? "Nautic Talk Trio",
        }}
      />

      {/* SHOP BY CATEGORY */}
      <section className="section" style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}>
        <div className="section-head-inline">
          <h2>{t("home.shopCatsTitle")}</h2>
          <Link href="/productos" className="head-arrow" aria-label={t("featured.viewAll")}>
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="shop-cats-grid">
          {cats.map((cat) => {
            const Icon = cat.Icon;
            const img = repImage(cat.category);
            return (
              <Link key={cat.href} href={cat.href} className="shop-cat-tile">
                <div className="shop-cat-tile-media">
                  {img ? (
                    <img src={img} alt={cat.label} />
                  ) : (
                    <span className="shop-cat-tile-media-icon"><Icon /></span>
                  )}
                </div>
                <div className="shop-cat-tile-bar">
                  <span className="shop-cat-tile-label">{cat.label}</span>
                  <span className="shop-cat-tile-arrow"><ArrowRight size={14} /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* TRIO / DUO FEATURE CARDS */}
      {bigCards.length > 0 && (
        <section className="section" style={{ paddingTop: 0, paddingBottom: "2.5rem" }}>
          <div className="big-cards">
            {bigCards.map(({ product }) => {
              const p = product as ShopifyProduct;
              const image = p.images.edges[0]?.node;
              return (
                <Link key={p.id} href={`/productos/${p.handle}`} className="big-card">
                  <div className="big-card-media">
                    {image && <img src={image.url} alt={image.altText ?? p.title} />}
                  </div>
                  <div className="big-card-bar">
                    <div>
                      <span className="big-card-title">{p.title}</span>
                    </div>
                    <span className="big-card-arrow"><ArrowRight size={16} /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* NEW IN */}
      {newIn.length > 0 && (
        <section className="section" style={{ paddingTop: "2.5rem" }}>
          <div className="section-head-inline">
            <h2>{t("home.newInTitle")}</h2>
            <Link href="/productos" className="head-link">
              {t("featured.viewAll")} <ArrowRight size={12} />
            </Link>
          </div>
          <div className="product-grid">
            {newIn.map((product, index) => productCard(product, index))}
          </div>
        </section>
      )}

      {/* FEATURED PRODUCTS */}
      <section className="section" style={{ paddingTop: "2.5rem" }}>
        <div className="section-head-inline">
          <h2>
            {t("featured.title1")} {t("featured.titleEm")} {t("featured.title2")}
          </h2>
          <Link href="/productos" className="head-link">
            {t("featured.viewAll")} <ArrowRight size={12} />
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="product-grid">
            {featured.map((product, index) => productCard(product, index))}
          </div>
        ) : (
          <p className="empty-message">{t("featured.empty")}</p>
        )}
      </section>

      {/* PROMO BAND */}
      <section className="promo-band">
        <div className="promo-band-inner">
          <h2 className="promo-band-title">{t("home.promoTitle")}</h2>
          <Link href="/productos" className="promo-cta">
            <span>{t("home.promoCta")}</span>
            <ArrowRight />
          </Link>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="trust-badges">
        <div className="trust-badges-inner">
          {trustBadges.map((badge, i) => {
            const Icon = badge.Icon;
            return (
              <div key={i} className="trust-badge">
                <div className="trust-badge-icon"><Icon /></div>
                <div className="trust-badge-text">
                  <strong>{badge.title}</strong>
                  <span>{badge.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* WORLDS — one system, three worlds */}
      <section className="worlds">
        <div className="worlds-inner">
          <div className="worlds-intro">
            <h2 className="worlds-title">
              {t("worlds.title1")} {t("worlds.titleEm")}
            </h2>
            <p className="worlds-lead">{t("worlds.desc")}</p>
          </div>
          <ol className="worlds-list">
            <li className="worlds-item">
              <h3>{t("worlds.marineTitle")}</h3>
              <p>{t("worlds.marineDesc")}</p>
            </li>
            <li className="worlds-item">
              <h3>{t("worlds.cyclingTitle")}</h3>
              <p>{t("worlds.cyclingDesc")}</p>
            </li>
            <li className="worlds-item">
              <h3>{t("worlds.industrialTitle")}</h3>
              <p>{t("worlds.industrialDesc")}</p>
            </li>
          </ol>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <div className="newsletter-inner">
          <div className="newsletter-eyebrow">{t("newsletter.eyebrow")}</div>
          <h2>
            {t("newsletter.title1")} <em>{t("newsletter.titleEm")}</em>
          </h2>
          <p className="newsletter-desc">{t("newsletter.desc")}</p>
          <NewsletterForm variant="home" />
        </div>
      </section>
    </>
  );
}
