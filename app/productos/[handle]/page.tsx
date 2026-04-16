import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";

function formatPrice(amount: string, currency: string) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
  }).format(parseFloat(amount));
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
        <p>No se pudo cargar el producto. Verifica las variables de entorno.</p>
        <Link href="/productos" style={{ color: "var(--ocean)" }}>
          &larr; Volver a productos
        </Link>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const price = product.priceRange.minVariantPrice;
  const mainImage = product.images.edges[0]?.node;
  const additionalImages = product.images.edges.slice(1);

  return (
    <>
      <div className="page-header">
        <div className="page-header-breadcrumb">
          <Link href="/">Inicio</Link> &nbsp;/&nbsp;{" "}
          <Link href="/productos">Productos</Link> &nbsp;/&nbsp;{" "}
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
          <div className="product-vendor">{product.vendor || "NAUTIC TALK"}</div>
          <h1>{product.title}</h1>
          <div className="product-price">
            {formatPrice(price.amount, price.currencyCode)}
          </div>

          {product.description && (
            <p className="product-description">{product.description}</p>
          )}

          {product.variants && product.variants.edges.length > 1 && (
            <>
              <div className="product-variants-label">Opciones</div>
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

          <button className="add-to-cart-btn">Comprar ahora &rarr;</button>
        </div>
      </div>
    </>
  );
}
