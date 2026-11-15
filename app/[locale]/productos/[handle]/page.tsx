import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import {
  getProductByHandle,
  getProducts,
  getCategory,
  type ShopifyProduct,
} from "@/lib/shopify";
import AddToCartButton from "@/components/cart/AddToCartButton";
import ProductDescription from "@/components/ProductDescription";

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

function formatPrice(amount: string, currency: string, locale: string = "es-ES") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(parseFloat(amount));
}

function translateCategory(cat: string, t: (k: string) => string): string {
  const map: Record<string, string> = {
    Intercomunicadores: "catIntercoms",
    Soportes: "catMounts",
    Cascos: "catHelmets",
    Auriculares: "catHeadsets",
    Accesorios: "catAccessories",
    Merchandising: "catMerch",
  };
  const key = map[cat];
  return key ? t(key) : cat;
}

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" />
    </svg>
  );
}

function IconTruck() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="12" height="10" rx="1" />
      <path d="M14 10h4l3 3v4h-7" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconReturn() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-3-6.7" />
      <path d="M21 3v6h-6" />
    </svg>
  );
}

function IconSupport() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 14v-2a7 7 0 1 1 14 0v2" />
      <rect x="3" y="14" width="4" height="6" rx="1" />
      <rect x="17" y="14" width="4" height="6" rx="1" />
      <path d="M19 20v1a3 3 0 0 1-3 3h-2" />
    </svg>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string; locale: string }>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return {};
  return {
    title: `${product.title} | Nautic Talk`,
    description:
      product.description?.slice(0, 160) ??
      "Equipo de comunicaci\u00f3n marina Nautic Talk.",
  };
}

/* ============ RELATED PRODUCTS ============ */

function pickRelated(
  all: ShopifyProduct[],
  current: ShopifyProduct,
  limit = 4,
): ShopifyProduct[] {
  const currentCat = getCategory(current);
  const others = all.filter((p) => p.id !== current.id);

  // Same category first, then fill with anything
  const sameCat = others.filter((p) => getCategory(p) === currentCat);
  const rest = others.filter((p) => getCategory(p) !== currentCat);

  // Pin the two flagships higher in the "rest" bucket so they surface when
  // a tiny accessory has no category siblings
  rest.sort((a, b) => {
    const w = (p: ShopifyProduct) =>
      p.handle === "nautic-talk-trio" ? 0 : p.handle === "nautic-talk-duo" ? 1 : 2;
    return w(a) - w(b);
  });

  return [...sameCat, ...rest].slice(0, limit);
}

/* ============ PAGE ============ */

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string; locale: string }>;
}) {
  const { handle, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "product" });
  const tFilters = await getTranslations({ locale, namespace: "filters" });
  const tCatalog = await getTranslations({ locale, namespace: "catalog" });
  const priceLoc = priceLocale(locale);

  let product;
  let allProducts: ShopifyProduct[] = [];
  try {
    [product, allProducts] = await Promise.all([
      getProductByHandle(handle),
      getProducts(30),
    ]);
  } catch {
    return (
      <div className="error-message">
        <p>{t("errorLoad")}</p>
        <Link
          href="/productos"
          style={{ color: "var(--terracotta-deep)", display: "inline-block", marginTop: "1rem" }}
        >
          &larr; {t("backToCatalog")}
        </Link>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const price = product.priceRange.minVariantPrice;
  const mainImage = product.images.edges[0]?.node;
  const additionalImages = product.images.edges.slice(1, 5);
  const related = pickRelated(allProducts, product, 3);

  const teaser = product.description
    ? product.description.trim().split(/\.\s+/).slice(0, 2).join(". ") + "."
    : "";

  const category = translateCategory(getCategory(product), tFilters);

  return (
    <>
      <div className="page-header">
        <div className="page-header-breadcrumb">
          <Link href="/">{t("breadcrumbHome")}</Link>
          <span>/</span>
          <Link href="/productos">{t("breadcrumbCatalog")}</Link>
          <span>/</span>
          <span className="page-header-breadcrumb-current">{product.title}</span>
        </div>
      </div>

      <div className="product-detail">
        {/* IMAGES */}
        <div className="product-images">
          {mainImage && (
            <div className="product-main-image">
              <img
                src={mainImage.url}
                alt={mainImage.altText ?? product.title}
              />
              <div className="product-main-image-tag">{category}</div>
            </div>
          )}
          {additionalImages.length > 0 && (
            <div className="product-thumbnails">
              {additionalImages.map(({ node: image }, index) => (
                <div key={index} className="product-thumbnail">
                  <img
                    src={image.url}
                    alt={image.altText ?? `${product.title} ${index + 2}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BUY COLUMN */}
        <div className="product-info">
          <div className="product-vendor">{product.vendor || "Nautic Talk"}</div>
          <h1>{product.title}</h1>
          <div className="product-price">
            {formatPrice(price.amount, price.currencyCode, priceLoc)}
            <span className="product-price-note">{t("priceNote")}</span>
          </div>

          {teaser && <p className="product-teaser">{teaser}</p>}

          <AddToCartButton
            handle={product.handle}
            title={product.title}
            image={mainImage?.url}
            variants={
              product.variants?.edges.map((e) => ({
                id: e.node.id,
                title: e.node.title,
                availableForSale: e.node.availableForSale,
                price: e.node.price,
              })) ?? []
            }
          />

          {/* Trust row */}
          <ul className="product-trust">
            <li>
              <IconTruck />
              <div>
                <strong>{t("trustShippingTitle")}</strong>
                <span>{t("trustShippingDesc")}</span>
              </div>
            </li>
            <li>
              <IconShield />
              <div>
                <strong>{t("trustWarrantyTitle")}</strong>
                <span>{t("trustWarrantyDesc")}</span>
              </div>
            </li>
            <li>
              <IconReturn />
              <div>
                <strong>{t("trustReturnsTitle")}</strong>
                <span>{t("trustReturnsDesc")}</span>
              </div>
            </li>
            <li>
              <IconSupport />
              <div>
                <strong>{t("trustSupportTitle")}</strong>
                <span>{t("trustSupportDesc")}</span>
              </div>
            </li>
          </ul>

          {product.descriptionHtml && (
            <ProductDescription html={product.descriptionHtml} />
          )}
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <section className="related-products">
          <div className="related-products-head">
            <div>
              <div className="section-eyebrow">{t("relatedEyebrow")}</div>
              <h2 className="section-title">{t("relatedTitle1")} <em>{t("relatedTitleEm")}</em></h2>
            </div>
            <Link href="/productos" className="btn-link">
              <span>{t("relatedAllCatalog")}</span>
              <ArrowRight size={12} />
            </Link>
          </div>
          <div className="related-grid">
            {related.map((p) => {
              const image = p.images.edges[0]?.node;
              const pprice = p.priceRange.minVariantPrice;
              return (
                <Link
                  key={p.id}
                  href={`/productos/${p.handle}`}
                  className="product-card product-card--related"
                >
                  <div className="product-card-image">
                    {image && (
                      <img src={image.url} alt={image.altText ?? p.title} />
                    )}
                  </div>
                  <div className="product-card-vendor">{p.vendor || "Nautic Talk"}</div>
                  <div className="product-card-title">{p.title}</div>
                  <div className="product-card-bottom">
                    <span className="product-card-price">
                      {formatPrice(pprice.amount, pprice.currencyCode, priceLoc)}
                    </span>
                    <span className="product-card-arrow">
                      {tCatalog("viewShort")} <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}
