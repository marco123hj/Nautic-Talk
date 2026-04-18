"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/* ============ ICONS ============ */

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

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="6" />
      <path d="M17 17l-3.5-3.5" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="6.5" r="3" />
      <path d="M3.5 17c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h14l-1.5 8.5a1.5 1.5 0 01-1.5 1.2H7a1.5 1.5 0 01-1.5-1.2L4 6z" />
      <path d="M4 6l-1-3H1" />
      <circle cx="8" cy="18" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="18" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M3 6h14M3 10h14M3 14h14" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M4 4l12 12M16 4L4 16" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3.5l3 3 3-3" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
      <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ============ CATEGORY DATA ============ */

const PRODUCT_CATEGORIES = [
  { label: "Nautic Talk Trio", handle: "nautic-talk-trio", desc: "Para 3 personas" },
  { label: "Nautic Talk Duo", handle: "nautic-talk-duo", desc: "Para 2 personas" },
  { label: "Soportes y mounts", href: "/productos", desc: "Clip, adhesivo, magnético" },
  { label: "Cascos y kits", href: "/productos", desc: "Cascos de seguridad" },
  { label: "Auriculares", href: "/productos", desc: "Sets y recambios" },
  { label: "Accesorios", href: "/productos", desc: "Antiviento, cables" },
];

const SECTORS = [
  { label: "N\u00e1utica", href: "/sistema#sectores" },
  { label: "Ciclismo", href: "/sistema#sectores" },
  { label: "Industria y obra", href: "/sistema#sectores" },
];

/* ============ COMPONENT ============ */

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  // Close all overlays on route change
  useEffect(() => {
    setDropdownOpen(false);
    setSearchOpen(false);
    setDrawerOpen(false);
  }, [pathname]);

  // Escape key closes overlays
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Lock body scroll when drawer or search is open
  useEffect(() => {
    if (drawerOpen || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen, searchOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  const cartCount = 0; // TODO: wire to real cart

  return (
    <>
      {/* TOP ANNOUNCEMENT */}
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
          <li
            className="nav-item-dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link href="/productos" className="nav-link nav-link-trigger">
              Productos <ChevronDown />
            </Link>
            {dropdownOpen && (
              <div className="nav-dropdown">
                <div className="nav-dropdown-inner">
                  <div className="nav-dropdown-col">
                    <div className="nav-dropdown-label">Cat&aacute;logo</div>
                    <ul>
                      {PRODUCT_CATEGORIES.map((cat) => (
                        <li key={cat.label}>
                          <Link
                            href={cat.handle ? `/productos/${cat.handle}` : cat.href ?? "/productos"}
                            className="nav-dropdown-item"
                          >
                            <span className="nav-dropdown-item-title">{cat.label}</span>
                            <span className="nav-dropdown-item-desc">{cat.desc}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="nav-dropdown-col">
                    <div className="nav-dropdown-label">Sectores</div>
                    <ul>
                      {SECTORS.map((s) => (
                        <li key={s.label}>
                          <Link href={s.href} className="nav-dropdown-item">
                            <span className="nav-dropdown-item-title">{s.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link href="/sistema" className="nav-dropdown-cta">
                      Ver el sistema <ArrowIcon />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </li>
          <li><Link href="/sistema" className="nav-link">El sistema</Link></li>
          <li><Link href="/sistema#tecnologia" className="nav-link">Tecnolog&iacute;a</Link></li>
          <li><Link href="/productos" className="nav-link">Contacto</Link></li>
        </ul>

        <div className="nav-actions">
          <button
            type="button"
            className="nav-icon-btn"
            onClick={() => setSearchOpen(true)}
            aria-label="Buscar"
          >
            <SearchIcon />
          </button>
          <Link href="/productos" className="nav-icon-btn" aria-label="Cuenta">
            <AccountIcon />
          </Link>
          <button
            type="button"
            className="nav-icon-btn nav-cart-btn"
            aria-label={`Carrito (${cartCount} productos)`}
          >
            <CartIcon />
            {cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
          </button>
          <button
            type="button"
            className="nav-icon-btn nav-hamburger"
            onClick={() => setDrawerOpen(true)}
            aria-label="Men\u00fa"
          >
            <MenuIcon />
          </button>
        </div>
      </nav>

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div className="search-modal" onClick={() => setSearchOpen(false)}>
          <div className="search-modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="search-modal-head">
              <div className="search-modal-input-wrap">
                <SearchIcon />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar en Nautic Talk\u2026"
                  className="search-modal-input"
                />
              </div>
              <button
                type="button"
                className="search-modal-close"
                onClick={() => setSearchOpen(false)}
                aria-label="Cerrar b\u00fasqueda"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="search-modal-body">
              <div className="search-modal-label">Sugerencias</div>
              <ul className="search-modal-suggestions">
                <li><Link href="/productos/nautic-talk-trio">Nautic Talk Trio</Link></li>
                <li><Link href="/productos/nautic-talk-duo">Nautic Talk Duo</Link></li>
                <li><Link href="/productos">Soportes</Link></li>
                <li><Link href="/productos">Cascos y kits</Link></li>
                <li><Link href="/productos">Auriculares</Link></li>
              </ul>
              <div className="search-modal-hint">
                Pulsa <kbd>Esc</kbd> para cerrar &middot; <kbd>Enter</kbd> para buscar
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE DRAWER */}
      {drawerOpen && (
        <div className="drawer-backdrop" onClick={() => setDrawerOpen(false)}>
          <aside
            className="drawer"
            onClick={(e) => e.stopPropagation()}
            aria-label="Men\u00fa principal"
          >
            <div className="drawer-head">
              <div className="drawer-brand">
                <div className="nav-mark"><CompassMark /></div>
                <span className="nav-wordmark-name">Nautic Talk</span>
              </div>
              <button
                type="button"
                className="nav-icon-btn"
                onClick={() => setDrawerOpen(false)}
                aria-label="Cerrar men\u00fa"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="drawer-body">
              <details className="drawer-group">
                <summary>
                  <span>Productos</span>
                  <ChevronDown />
                </summary>
                <ul className="drawer-sublist">
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <li key={cat.label}>
                      <Link href={cat.handle ? `/productos/${cat.handle}` : cat.href ?? "/productos"}>
                        {cat.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>

              <details className="drawer-group">
                <summary>
                  <span>Sectores</span>
                  <ChevronDown />
                </summary>
                <ul className="drawer-sublist">
                  {SECTORS.map((s) => (
                    <li key={s.label}><Link href={s.href}>{s.label}</Link></li>
                  ))}
                </ul>
              </details>

              <Link href="/sistema" className="drawer-link">El sistema</Link>
              <Link href="/sistema#tecnologia" className="drawer-link">Tecnolog&iacute;a</Link>
              <Link href="/productos" className="drawer-link">Contacto</Link>
            </div>

            <div className="drawer-foot">
              <Link href="/productos" className="drawer-cta">
                <span>Ver el cat&aacute;logo</span>
                <ArrowIcon />
              </Link>
              <div className="drawer-sub">
                Env&iacute;o gratis desde &euro;120 &middot; Garant&iacute;a 2 a&ntilde;os
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
