"use client";

import Link from "next/link";

/* ============ ICONS ============ */

function CompassMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <path d="M12 7l2.5 4.5L12 17l-2.5-5.5L12 7z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" />
    </svg>
  );
}

function IgIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="14" height="14" rx="4" />
      <circle cx="10" cy="10" r="3.5" />
      <circle cx="14.5" cy="5.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FbIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 6h2V3h-2c-2 0-3.5 1.5-3.5 3.5V9H6v3h2.5v6h3v-6H14l.5-3H11.5V6.5c0-.3.2-.5.5-.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" />
      <path d="M3 6l7 5 7-5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M4.5 7h2.5v8.5H4.5V7zm1.2-3a1.4 1.4 0 110 2.8 1.4 1.4 0 010-2.8zM9 7h2.4v1.2c.5-.8 1.6-1.4 2.8-1.4 2 0 2.8 1.3 2.8 3.3v5.4h-2.5v-4.7c0-1-.3-1.7-1.3-1.7-.9 0-1.3.6-1.3 1.6v4.8H9V7z" fill="currentColor" />
    </svg>
  );
}

/* ============ PAYMENT ICONS (small SVG marks) ============ */

function VisaIcon() {
  return (
    <svg width="34" height="22" viewBox="0 0 34 22" fill="none">
      <rect width="34" height="22" rx="3" fill="#ffffff" stroke="rgba(255,255,255,0.15)" />
      <text x="17" y="15" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="sans-serif" fill="#1A1F71">VISA</text>
    </svg>
  );
}

function MasterCardIcon() {
  return (
    <svg width="34" height="22" viewBox="0 0 34 22" fill="none">
      <rect width="34" height="22" rx="3" fill="#ffffff" stroke="rgba(255,255,255,0.15)" />
      <circle cx="14" cy="11" r="5" fill="#EB001B" />
      <circle cx="20" cy="11" r="5" fill="#F79E1B" />
      <path d="M17 7.2a5 5 0 000 7.6 5 5 0 000-7.6z" fill="#FF5F00" />
    </svg>
  );
}

function PayPalIcon() {
  return (
    <svg width="34" height="22" viewBox="0 0 34 22" fill="none">
      <rect width="34" height="22" rx="3" fill="#ffffff" stroke="rgba(255,255,255,0.15)" />
      <text x="17" y="15" textAnchor="middle" fontSize="7" fontWeight="700" fontFamily="sans-serif" fill="#003087">Pay<tspan fill="#009CDE">Pal</tspan></text>
    </svg>
  );
}

function IdealIcon() {
  return (
    <svg width="34" height="22" viewBox="0 0 34 22" fill="none">
      <rect width="34" height="22" rx="3" fill="#ffffff" stroke="rgba(255,255,255,0.15)" />
      <text x="17" y="14" textAnchor="middle" fontSize="7" fontWeight="700" fontFamily="sans-serif" fill="#CC0066">iDEAL</text>
    </svg>
  );
}

function BizumIcon() {
  return (
    <svg width="34" height="22" viewBox="0 0 34 22" fill="none">
      <rect width="34" height="22" rx="3" fill="#ffffff" stroke="rgba(255,255,255,0.15)" />
      <text x="17" y="15" textAnchor="middle" fontSize="7" fontWeight="700" fontFamily="sans-serif" fill="#00ABBC">Bizum</text>
    </svg>
  );
}

function AmexIcon() {
  return (
    <svg width="34" height="22" viewBox="0 0 34 22" fill="none">
      <rect width="34" height="22" rx="3" fill="#006FCF" />
      <text x="17" y="14" textAnchor="middle" fontSize="6.5" fontWeight="700" fontFamily="sans-serif" fill="#ffffff">AMEX</text>
    </svg>
  );
}

/* ============ COMPONENT ============ */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* TOP ROW — brand + newsletter */}
        <div className="footer-top-row">
          <div className="footer-brand">
            <div className="footer-mark">
              <CompassMark />
            </div>
            <div className="footer-wordmark">
              Nautic Talk
              <span className="footer-wordmark-sub">Comunicaci&oacute;n adaptada a tu mundo</span>
            </div>
            <p className="footer-desc">
              Intercomunicadores Bluetooth profesionales para n&aacute;utica,
              ciclismo y entornos laborales. Audio cristalino y manos libres
              donde lo necesites.
            </p>
            <div className="footer-social">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Instagram"><IgIcon /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Facebook"><FbIcon /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="LinkedIn"><LinkedInIcon /></a>
              <a href="mailto:hola@nautictalk.com" className="footer-social-icon" aria-label="Email"><MailIcon /></a>
            </div>
          </div>

          <div className="footer-newsletter">
            <div className="footer-col-title">Mantente al d&iacute;a</div>
            <p className="footer-newsletter-desc">
              Novedades, gu&iacute;as de instalaci&oacute;n y mejoras del
              sistema. Una carta puntual, sin spam.
            </p>
            <form
              className="footer-newsletter-form"
              action="#"
              method="post"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                name="email"
                placeholder="tu@email.com"
                aria-label="Correo electr\u00f3nico"
                className="footer-newsletter-input"
                required
              />
              <button type="submit" className="footer-newsletter-btn" aria-label="Suscribir">
                <ArrowIcon />
              </button>
            </form>
            <div className="footer-newsletter-small">
              Al suscribirte aceptas nuestra pol&iacute;tica de privacidad.
            </div>
          </div>
        </div>

        {/* LINK COLUMNS — desktop grid, mobile accordion via <details> */}
        <div className="footer-columns">
          <details className="footer-col" open>
            <summary className="footer-col-title">
              Productos
              <ArrowIcon />
            </summary>
            <ul className="footer-links">
              <li><Link href="/productos/nautic-talk-trio">Nautic Talk Trio</Link></li>
              <li><Link href="/productos/nautic-talk-duo">Nautic Talk Duo</Link></li>
              <li><Link href="/productos">Soportes y mounts</Link></li>
              <li><Link href="/productos">Cascos y kits</Link></li>
              <li><Link href="/productos">Auriculares</Link></li>
              <li><Link href="/productos">Accesorios</Link></li>
            </ul>
          </details>

          <details className="footer-col" open>
            <summary className="footer-col-title">
              Sectores
              <ArrowIcon />
            </summary>
            <ul className="footer-links">
              <li><Link href="/sistema#sectores">N&aacute;utica</Link></li>
              <li><Link href="/sistema#sectores">Ciclismo</Link></li>
              <li><Link href="/sistema#sectores">Industria y obra</Link></li>
              <li><Link href="/sistema#sectores">Eventos y log&iacute;stica</Link></li>
            </ul>
          </details>

          <details className="footer-col" open>
            <summary className="footer-col-title">
              Soporte
              <ArrowIcon />
            </summary>
            <ul className="footer-links">
              <li><Link href="/productos">Asesoramiento</Link></li>
              <li><Link href="/productos">Env&iacute;os</Link></li>
              <li><Link href="/productos">Devoluciones</Link></li>
              <li><Link href="/productos">Garant&iacute;a</Link></li>
              <li><Link href="/productos">FAQ</Link></li>
            </ul>
          </details>

          <details className="footer-col" open>
            <summary className="footer-col-title">
              Empresa
              <ArrowIcon />
            </summary>
            <ul className="footer-links">
              <li><Link href="/sistema">El sistema</Link></li>
              <li><Link href="/productos">Sobre nosotros</Link></li>
              <li><Link href="/productos">Aviso legal</Link></li>
              <li><Link href="/productos">Privacidad</Link></li>
              <li><Link href="/productos">Cookies</Link></li>
            </ul>
          </details>
        </div>

        {/* BOTTOM BAR */}
        <div className="footer-bottom">
          <span className="footer-bottom-copy">
            &copy; {year} Nautic Talk &middot; Todos los derechos reservados
          </span>
          <div className="footer-payments">
            <VisaIcon />
            <MasterCardIcon />
            <AmexIcon />
            <PayPalIcon />
            <IdealIcon />
            <BizumIcon />
          </div>
        </div>
      </div>
    </footer>
  );
}
