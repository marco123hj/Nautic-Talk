import Link from "next/link";
import { getProducts, type ShopifyProduct } from "@/lib/shopify";

export const metadata = {
  title: "Productos | Nautic Talk",
};

function formatPrice(amount: string, currency: string) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
  }).format(parseFloat(amount));
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
          <Link href="/">Inicio</Link> &nbsp;/&nbsp; Productos
        </div>
        <h1>Todos los productos</h1>
        <p>
          {products.length > 0
            ? `${products.length} producto${products.length === 1 ? "" : "s"}`
            : "Nuestro cat\u00e1logo completo"}
        </p>
      </div>

      {error && (
        <p className="error-message">
          No se pudieron cargar los productos. Verifica las variables de entorno.
        </p>
      )}

      {!error && products.length === 0 && (
        <p className="empty-message">No se encontraron productos.</p>
      )}

      <div className="catalog-grid">
        {products.map((product, index) => {
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
                    loading={index < 8 ? "eager" : "lazy"}
                  />
                )}
              </div>
              <div className="product-card-info">
                <div className="product-card-vendor">{product.vendor || "NAUTIC TALK"}</div>
                <div className="product-card-title">{product.title}</div>
                <div className="product-card-bottom">
                  <span className="product-card-price">
                    {formatPrice(price.amount, price.currencyCode)}
                  </span>
                  <span className="product-card-buy">Comprar</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
