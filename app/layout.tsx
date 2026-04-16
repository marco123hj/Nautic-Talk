import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nautic Talk — Marine Communications",
  description:
    "Equipos de comunicación marina profesional. VHF, AIS, antenas y más para navegación segura.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <nav className="nav">
          <Link href="/" className="nav-left">
            <div className="nav-logo-icon">NT</div>
            <div className="nav-logo-text">
              <span className="nav-logo-name">Nautic Talk</span>
              <span className="nav-logo-sub">Marine Communications</span>
            </div>
          </Link>
          <ul className="nav-center">
            <li>
              <Link href="/productos" className="nav-link">
                Productos
              </Link>
            </li>
            <li>
              <Link href="/productos" className="nav-link">
                Marcas
              </Link>
            </li>
            <li>
              <Link href="/productos" className="nav-link">
                Nosotros
              </Link>
            </li>
          </ul>
          <Link href="/productos" className="nav-cta">
            Ver cat&aacute;logo
          </Link>
        </nav>
        {children}
        <footer className="footer">
          <div className="footer-inner">
            <div>
              <div className="footer-brand-name">
                <div className="footer-logo-icon">NT</div>
                <div className="footer-logo-text">
                  <span className="footer-logo-name">Nautic Talk</span>
                  <span className="footer-logo-sub">Marine Communications</span>
                </div>
              </div>
              <p className="footer-desc">
                Equipos de comunicaci&oacute;n marina profesional para
                navegaci&oacute;n segura. VHF, AIS, antenas y accesorios.
              </p>
            </div>
            <div>
              <div className="footer-col-title">Productos</div>
              <ul className="footer-links">
                <li><Link href="/productos">VHF</Link></li>
                <li><Link href="/productos">AIS</Link></li>
                <li><Link href="/productos">Antenas</Link></li>
                <li><Link href="/productos">Ver todo</Link></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Soporte</div>
              <ul className="footer-links">
                <li><Link href="/productos">Contacto</Link></li>
                <li><Link href="/productos">Env&iacute;os</Link></li>
                <li><Link href="/productos">Devoluciones</Link></li>
                <li><Link href="/productos">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Legal</div>
              <ul className="footer-links">
                <li><Link href="/productos">Aviso legal</Link></li>
                <li><Link href="/productos">Privacidad</Link></li>
                <li><Link href="/productos">Cookies</Link></li>
                <li><Link href="/productos">Condiciones</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} Nautic Talk</span>
            <div className="footer-payments">
              <span>VISA</span>
              <span>MC</span>
              <span>PAYPAL</span>
              <span>iDEAL</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
