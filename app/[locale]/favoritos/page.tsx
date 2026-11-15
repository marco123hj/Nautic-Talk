import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import FavoritesPageClient from "@/components/favorites/FavoritesPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "favorites" });
  return {
    title: t("pageTitle"),
  };
}

export default async function FavoritesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "favorites" });

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
            {t("pageTitle1")} <em>{t("pageTitleEm")}</em>
          </h1>
          <p>{t("subtitle")}</p>
        </div>
      </div>

      <section className="cart-page-section">
        <FavoritesPageClient />
      </section>
    </>
  );
}
