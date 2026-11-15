import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

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
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "scenarios" });
  return {
    title: `${t("pageTitle1")} ${t("pageTitleEm")}`,
    description: t("desc"),
  };
}

export default async function ScenariosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "scenarios" });

  // 6 scenarios
  const cards = [1, 2, 3, 4, 5, 6] as const;

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
          <p>{t("pageSubtitle")}</p>
        </div>
      </div>

      <section className="section">
        <div className="section-head">
          <div className="section-head-left">
            <div className="section-eyebrow">{t("eyebrow")}</div>
            <h2 className="section-title">
              {t("title1")} <em>{t("titleEm")}</em>
            </h2>
          </div>
          <div className="section-head-right">{t("desc")}</div>
        </div>

        <div className="scenarios-grid">
          {cards.map((n) => {
            const labelKey = `card${n}Label` as const;
            const probKey = `card${n}Problem` as const;
            const solKey = `card${n}Solution` as const;
            const ctaKey = `card${n}Cta` as const;
            const hrefKey = `card${n}Href` as const;
            return (
              <article key={n} className="scenario-card">
                <div className="scenario-card-head">
                  <span className="scenario-card-num">0{n}</span>
                  <span className="scenario-card-label">{t(labelKey)}</span>
                </div>
                <blockquote className="scenario-card-problem">
                  <span className="scenario-card-quote-mark" aria-hidden>&ldquo;</span>
                  {t(probKey)}
                </blockquote>
                <div className="scenario-card-divider">
                  <span className="scenario-card-divider-label">
                    {t("solutionLabel")}
                  </span>
                </div>
                <p className="scenario-card-solution">{t(solKey)}</p>
                <Link href={t(hrefKey)} className="scenario-card-cta">
                  <span>{t(ctaKey)}</span>
                  <ArrowRight size={12} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* Final CTA — "Your scenario not here? Contact us" */}
      <section className="cta-strip">
        <div className="cta-strip-inner">
          <h2 className="cta-strip-title">
            <em>{t("ctaTitle")}</em>
          </h2>
          <p className="cta-strip-desc">{t("ctaDesc")}</p>
          <div className="cta-strip-actions">
            <Link href="/contacto" className="btn-primary">
              <span>{t("ctaButton")}</span>
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
