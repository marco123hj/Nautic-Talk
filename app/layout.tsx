import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nautic Talk — Comunicación adaptada a tu mundo",
  description:
    "Intercomunicadores Bluetooth profesionales para n\u00e1utica, ciclismo y entornos laborales. Audio cristalino, full-duplex, resistente al agua. Sistemas para 2 o 3 personas.",
};

function CompassMark({ size = 24 }: { size?: number }) {
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
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {/* TOP STATUS / ANNOUNCEMENT */}
        <div className="announce">
          <span>Env&iacute;o gratuito en pen&iacute;nsula desde &euro;120</span>
          <span className="announce-divider">&loz;</span>
          <span>Garant&iacute;a oficial 2 a&ntilde;os</span>
          <span className="announce-divider">&loz;</span>
          <span>Asesoramiento t&eacute;cnico en espa&ntilde;ol</span>
        </div>

        {/* NAV */}
        <nav className="nav">
          <Link href="/" className="nav-brand" aria-label="Nautic Talk">
            <div className="nav-mark">
              <CompassMark />
            </div>
            <div className="nav-wordmark">
              <span className="nav-wordmark-name">Nautic Talk</span>
              <span className="nav-wordmark-sub">Comunicaci&oacute;n profesional</span>
            </div>
          </Link>

          <ul className="nav-center">
            <li><Link href="/productos" className="nav-link">Productos</Link></li>
            <li><Link href="/sistema" className="nav-link">El sistema</Link></li>
            <li><Link href="/sistema#tecnologia" className="nav-link">Tecnolog&iacute;a</Link></li>
            <li><Link href="/sistema#sectores" className="nav-link">Sectores</Link></li>
            <li><Link href="/productos" className="nav-link">Contacto</Link></li>
          </ul>

          <Link href="/productos" className="nav-cta">
            <span>Ver productos</span>
            <ArrowIcon />
          </Link>
        </nav>

        {children}

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-top">
              <div className="footer-brand">
                <div className="footer-mark">
                  <CompassMark size={28} />
                </div>
                <div>
                  <div className="footer-wordmark">
                    Nautic Talk
                    <span className="footer-wordmark-sub">Comunicaci&oacute;n adaptada a tu mundo</span>
                  </div>
                </div>
                <p className="footer-desc">
                  Intercomunicadores Bluetooth profesionales para n&aacute;utica,
                  ciclismo y entornos laborales. Audio cristalino y manos libres
                  donde lo necesites.
                </p>
              </div>

              <div>
                <div className="footer-col-title">Productos</div>
                <ul className="footer-links">
                  <li><Link href="/productos">Nautic Talk Trio</Link></li>
                  <li><Link href="/productos">Nautic Talk Duo</Link></li>
                  <li><Link href="/productos">Soportes y mounts</Link></li>
                  <li><Link href="/productos">Cascos y kits</Link></li>
                  <li><Link href="/productos">Accesorios</Link></li>
                </ul>
              </div>

              <div>
                <div className="footer-col-title">Sectores</div>
                <ul className="footer-links">
                  <li><Link href="/productos">N&aacute;utica</Link></li>
                  <li><Link href="/productos">Ciclismo</Link></li>
                  <li><Link href="/productos">Industria y obra</Link></li>
                  <li><Link href="/productos">Eventos y log&iacute;stica</Link></li>
                </ul>
              </div>

              <div>
                <div className="footer-col-title">Soporte</div>
                <ul className="footer-links">
                  <li><Link href="/productos">Asesoramiento</Link></li>
                  <li><Link href="/productos">Env&iacute;os</Link></li>
                  <li><Link href="/productos">Devoluciones</Link></li>
                  <li><Link href="/productos">Garant&iacute;a</Link></li>
                  <li><Link href="/productos">FAQ</Link></li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <span>&copy; {new Date().getFullYear()} Nautic Talk &middot; Todos los derechos reservados</span>
              <div className="footer-payments">
                <span>Visa</span>
                <span>Mastercard</span>
                <span>PayPal</span>
                <span>iDEAL</span>
                <span>Bizum</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
