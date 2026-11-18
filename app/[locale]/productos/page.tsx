import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import CatalogClient from "@/components/CatalogClient";
import { getProducts, getCategory, type ShopifyProduct } from "@/lib/shopify";
import { categoryLabel } from "@/lib/catalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catalog" });
  return {
    title: `${t("title1")} ${t("titleEm")}`,
  };
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "catalog" });

  let products: ShopifyProduct[] = [];
  let error: string | null = null;

  try {
    products = await getProducts(50);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load products";
  }

  const shown = category ? products.filter((p) => getCategory(p) === category).length : products.length;

  return (
    <>
      <div className="page-header">
        <nav className="page-header-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">{t("breadcrumbHome")}</Link>
          <span>/</span>
          {category ? (
            <>
              <Link href="/productos">{t("breadcrumb")}</Link>
              <span>/</span>
              {categoryLabel(category, locale)}
            </>
          ) : (
            t("breadcrumb")
          )}
        </nav>
        <div className="page-header-title">
          <h1>{category ? categoryLabel(category, locale) : `${t("title1")} ${t("titleEm")}`}</h1>
          <p>
            {shown > 0
              ? shown === 1
                ? t("countProduct", { count: shown })
                : t("countProducts", { count: shown })
              : t("subtitle")}
          </p>
        </div>
      </div>

      {error && <p className="error-message">{t("errorLoad")}</p>}

      {!error && products.length === 0 && (
        <p className="empty-message">{t("empty")}</p>
      )}

      {products.length > 0 && (
        <Suspense fallback={null}>
          <CatalogClient products={products} />
        </Suspense>
      )}
    </>
  );
}
