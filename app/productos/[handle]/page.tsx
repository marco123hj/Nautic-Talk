import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";

function formatPrice(amount: string, currency: string) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
  }).format(parseFloat(amount));
}

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" />
    </svg>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}) {
  const product = await getProductByHandle(params.handle);
  if (!product) return {};
  return {
    title: `${product.title} | Nautic Talk`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  let product;
  try {
    product = await getProductByHandle(params.handle);
  } catch {
    return (
      <div className="error-message">
        <p>No se pudo cargar el producto.</p>
        <Link href="/productos" style={{ color: "var(--terracotta-deep)", display: "inline-block", marginTop: "1rem" }}>
          &larr; Volver al cat&aacute;logo
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

  return (
    <>
      <div className="page-header">
        <div className="page-header-breadcrumb">
          <Link href="/">Inicio</Link>
          <span>&loz;</span>
          <Link href="/productos">Cat&aacute;logo</Link>
          <span>&loz;</span>
          {product.title}
        </div>
      </div>

      <div className="product-detail">
        <div className="product-images">
          {mainImage && (
            <div className="product-main-image">
              <img
                src={mainImage.url}
                alt={mainImage.altText ?? product.title}
              />
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

        <div className="product-info">
          <div className="product-vendor">{product.vendor || "Nautic Talk"}</div>
          <h1>{product.title}</h1>
          <div className="product-price">
            {formatPrice(price.amount, price.currencyCode)}
          </div>

          {product.description && (
            <p className="product-description">{product.description}</p>
          )}

          {product.variants && product.variants.edges.length > 1 && (
            <>
              <div className="product-variants-label">Opciones disponibles</div>
              <div className="product-variants">
                {product.variants.edges.map(({ node: variant }) => (
                  <span
                    key={variant.id}
                    className={`variant-chip${
                      !variant.availableForSale ? " variant-chip--soldout" : ""
                    }`}
                  >
                    {variant.title}
                  </span>
                ))}
              </div>
            </>
          )}

          <button type="button" className="add-to-cart-btn">
            <span>Comprar ahora</span>
            <ArrowRight />
          </button>

          <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid var(--hairline)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", fontSize: "0.8125rem", color: "var(--text-muted)" }}>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "0.625rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--terracotta)", marginBottom: "0.5rem" }}>Env&iacute;o</div>
              <div>24&ndash;72h en toda la UE con seguimiento</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "0.625rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--terracotta)", marginBottom: "0.5rem" }}>Garant&iacute;a</div>
              <div>2 a&ntilde;os oficiales del fabricante</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
