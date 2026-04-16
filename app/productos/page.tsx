import Link from "next/link";
import { getProducts, type ShopifyProduct } from "@/lib/shopify";

export const metadata = {
  title: "Cat\u00e1logo | Nautic Talk",
};

function formatPrice(amount: string, currency: string) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
  }).format(parseFloat(amount));
}

function ArrowRight({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" />
    </svg>
  );
}

export default async function ProductsPage() {
  let products: ShopifyProduct[] = [];
  let error: string | null = null;

  try {
    products = await getProducts(50);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load products";
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header-breadcrumb">
          <Link href="/">Inicio</Link>
          <span>&loz;</span>
          Productos
        </div>
        <div className="page-header-title">
          <h1>
            Todos los <em>productos</em>
          </h1>
          <p>
            {products.length > 0
              ? `${products.length} producto${products.length === 1 ? "" : "s"}`
              : "Sistemas, soportes y accesorios"}
          </p>
        </div>
      </div>

      {error && (
        <p className="error-message">
          No se pudieron cargar los productos. Verifica las variables de entorno.
        </p>
      )}

      {!error && products.length === 0 && (
        <p className="empty-message">A&uacute;n no hay productos en este puerto.</p>
      )}

      <div className="catalog-grid">
        {products.map((product, index) => {
          const image = product.images.edges[0]?.node;
          const price = product.priceRange.minVariantPrice;
          const num = String(index + 1).padStart(2, "0");

          return (
            <Link
              key={product.id}
              href={`/productos/${product.handle}`}
              className="product-card"
            >
              <div className="product-card-num">№ {num}</div>
              <div className="product-card-image">
                {image && (
                  <img
                    src={image.url}
                    alt={image.altText ?? product.title}
                    loading={index < 8 ? "eager" : "lazy"}
                  />
                )}
              </div>
              <div className="product-card-vendor">{product.vendor || "Nautic Talk"}</div>
              <div className="product-card-title">{product.title}</div>
              <div className="product-card-bottom">
                <span className="product-card-price">
                  {formatPrice(price.amount, price.currencyCode)}
                </span>
                <span className="product-card-arrow">
                  Ver <ArrowRight />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
