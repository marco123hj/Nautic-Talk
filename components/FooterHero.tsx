"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" />
    </svg>
  );
}

export default function FooterHero() {
  const t = useTranslations("footerHero");

  return (
    <section className="footer-hero" aria-label="Nautic Talk">
      <div className="footer-hero-image">
        <img src="/footer-hero.jpg" alt={t("imageAlt")} loading="lazy" />
      </div>

      <div className="footer-hero-content">
        <span className="footer-hero-eyebrow">{t("eyebrow")}</span>
        <h2 className="footer-hero-title">
          {t("title1")} <em>{t("titleEm")}</em>
        </h2>
        <p className="footer-hero-desc">{t("desc")}</p>
        <Link href="/productos" className="footer-hero-cta">
          <span>{t("cta")}</span>
          <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
