import Link from "next/link";
import CatalogClient from "@/components/CatalogClient";
import { getProducts, type ShopifyProduct } from "@/lib/shopify";

export const metadata = {
  title: "Cat\u00e1logo | Nautic Talk",
};

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

      {products.length > 0 && <CatalogClient products={products} />}
    </>
  );
}
