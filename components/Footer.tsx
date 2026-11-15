"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useFavorites } from "./favorites/FavoritesContext";

/* ============ ICONS ============ */

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" />
    </svg>
  );
}
function IgIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="14" height="14" rx="4" />
      <circle cx="10" cy="10" r="3.5" />
      <circle cx="14.5" cy="5.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FbIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <path d="M12 6h2V3h-2c-2 0-3.5 1.5-3.5 3.5V9H6v3h2.5v6h3v-6H14l.5-3H11.5V6.5c0-.3.2-.5.5-.5z" fill="currentColor" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" />
      <path d="M3 6l7 5 7-5" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <path d="M4.5 7h2.5v8.5H4.5V7zm1.2-3a1.4 1.4 0 110 2.8 1.4 1.4 0 010-2.8zM9 7h2.4v1.2c.5-.8 1.6-1.4 2.8-1.4 2 0 2.8 1.3 2.8 3.3v5.4h-2.5v-4.7c0-1-.3-1.7-1.3-1.7-.9 0-1.3.6-1.3 1.6v4.8H9V7z" fill="currentColor" />
    </svg>
  );
}

/* ============ PAYMENT ICONS ============ */

function VisaIcon() {
  return (
    <svg width="28" height="18" viewBox="0 0 34 22" fill="none">
      <rect width="34" height="22" rx="3" fill="#ffffff" />
      <text x="17" y="15" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="sans-serif" fill="#1A1F71">VISA</text>
    </svg>
  );
}
function MasterCardIcon() {
  return (
    <svg width="28" height="18" viewBox="0 0 34 22" fill="none">
      <rect width="34" height="22" rx="3" fill="#ffffff" />
      <circle cx="14" cy="11" r="5" fill="#EB001B" />
      <circle cx="20" cy="11" r="5" fill="#F79E1B" />
      <path d="M17 7.2a5 5 0 000 7.6 5 5 0 000-7.6z" fill="#FF5F00" />
    </svg>
  );
}
function PayPalIcon() {
  return (
    <svg width="28" height="18" viewBox="0 0 34 22" fill="none">
      <rect width="34" height="22" rx="3" fill="#ffffff" />
      <text x="17" y="15" textAnchor="middle" fontSize="7" fontWeight="700" fontFamily="sans-serif" fill="#003087">Pay<tspan fill="#009CDE">Pal</tspan></text>
    </svg>
  );
}
function IdealIcon() {
  return (
    <svg width="28" height="18" viewBox="0 0 34 22" fill="none">
      <rect width="34" height="22" rx="3" fill="#ffffff" />
      <text x="17" y="14" textAnchor="middle" fontSize="7" fontWeight="700" fontFamily="sans-serif" fill="#CC0066">iDEAL</text>
    </svg>
  );
}
function BizumIcon() {
  return (
    <svg width="28" height="18" viewBox="0 0 34 22" fill="none">
      <rect width="34" height="22" rx="3" fill="#ffffff" />
      <text x="17" y="15" textAnchor="middle" fontSize="7" fontWeight="700" fontFamily="sans-serif" fill="#00ABBC">Bizum</text>
    </svg>
  );
}

/* ============ COMPONENT ============ */

export default function Footer() {
  const t = useTranslations("footer");
  const tFav = useTranslations("favorites");
  const { count: favCount } = useFavorites();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-wordmark">Nautic Talk</div>
            <p className="footer-desc">{t("desc")}</p>
            <div className="footer-social">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><IgIcon /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FbIcon /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
              <a href="mailto:hola@nautictalk.com" aria-label="Email"><MailIcon /></a>
            </div>
          </div>

          {/* Shop */}
          <div className="footer-col">
            <div className="footer-col-title">{t("colShop")}</div>
            <ul className="footer-links">
              <li><Link href="/productos/nautic-talk-trio">{t("trio")}</Link></li>
              <li><Link href="/productos/nautic-talk-duo">{t("duo")}</Link></li>
              <li><Link href="/productos?category=Soportes">{t("mounts")}</Link></li>
              <li><Link href="/productos?category=Accesorios">{t("accessories")}</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div className="footer-col">
            <div className="footer-col-title">{t("colSupport")}</div>
            <ul className="footer-links">
              <li><Link href="/contacto">{t("contact")}</Link></li>
              <li>
                <Link href="/favoritos">
                  {tFav("linkLabel")}
                  {favCount > 0 && <span className="footer-link-badge">{favCount}</span>}
                </Link>
              </li>
              <li><Link href="/sistema">{t("system")}</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <div className="footer-col-title">{t("colNewsletter")}</div>
            <p className="footer-newsletter-desc">{t("newsletterDesc")}</p>
            <form
              className="footer-newsletter-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                name="email"
                placeholder={t("newsletterPlaceholder")}
                aria-label="Email"
                className="footer-newsletter-input"
                required
              />
              <button type="submit" className="footer-newsletter-btn" aria-label="Subscribe">
                <ArrowIcon />
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-bottom-copy">{t("copyright", { year })}</span>
          <div className="footer-payments">
            <VisaIcon />
            <MasterCardIcon />
            <PayPalIcon />
            <IdealIcon />
            <BizumIcon />
          </div>
        </div>
      </div>
    </footer>
  );
}
