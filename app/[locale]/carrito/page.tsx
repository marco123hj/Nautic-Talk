import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import CartPageClient from "@/components/cart/CartPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cart" });
  return {
    title: t("pageTitle"),
  };
}

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "cart" });

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
        </div>
      </div>

      <section className="cart-page-section">
        <CartPageClient />
      </section>
    </>
  );
}
