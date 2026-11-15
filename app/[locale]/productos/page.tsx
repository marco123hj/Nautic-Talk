import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import CatalogClient from "@/components/CatalogClient";
import { getProducts, type ShopifyProduct } from "@/lib/shopify";

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
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "catalog" });

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
          <Link href="/">{t("breadcrumbHome")}</Link>
          <span>/</span>
          {t("breadcrumb")}
        </div>
        <div className="page-header-title">
          <h1>
            {t("title1")} <em>{t("titleEm")}</em>
          </h1>
          <p>
            {products.length > 0
              ? products.length === 1
                ? t("countProduct", { count: products.length })
                : t("countProducts", { count: products.length })
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
