"use client";

import { useState, useEffect, Suspense } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { useCart } from "./cart/CartContext";

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
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="6" />
      <path d="M17 17l-3.5-3.5" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h14l-1.5 8.5a1.5 1.5 0 01-1.5 1.2H7a1.5 1.5 0 01-1.5-1.2L4 6z" />
      <path d="M4 6l-1-3H1" />
      <circle cx="8" cy="18" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="18" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
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

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5l3.5 3.5L13 4.5" />
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

/* ============ COMPONENT ============ */

export default function Header() {
  const t = useTranslations("nav");
  const tAnn = useTranslations("announce");
  const tFilters = useTranslations("filters");
  const tScenarios = useTranslations("scenarios");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { count: cartCount, openCart } = useCart();

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const categories = [
    { label: tFilters("catIntercoms"), href: "/productos?category=Intercomunicadores" },
    { label: tFilters("catMounts"), href: "/productos?category=Soportes" },
    { label: tFilters("catHelmets"), href: "/productos?category=Cascos" },
    { label: tFilters("catHeadsets"), href: "/productos?category=Auriculares" },
    { label: tFilters("catAccessories"), href: "/productos?category=Accesorios" },
  ];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const term = query.trim();
    router.push(term ? `/productos?q=${encodeURIComponent(term)}` : "/productos");
  }

  return (
    <>
      <header className="site-header">
        {/* MAIN ROW */}
        <div className="hdr-main">
          <Link href="/" className="hdr-logo" aria-label="Nautic Talk">
            <span className="hdr-logo-mark"><CompassMark /></span>
            <span className="hdr-logo-text">
              <span className="hdr-logo-name">Nautic Talk</span>
              <span className="hdr-logo-sub">{t("wordmarkSub")}</span>
            </span>
          </Link>

          <form className="hdr-search" onSubmit={handleSearch} role="search">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              aria-label={t("searchAria")}
            />
            <button type="submit" aria-label={t("searchAria")}>
              <SearchIcon />
            </button>
          </form>

          <div className="hdr-actions">
            <Suspense fallback={null}>
              <LanguageSwitcher />
            </Suspense>
            <button
              type="button"
              className="hdr-action hdr-cart"
              onClick={openCart}
              aria-label={t("cartAria")}
            >
              <span className="hdr-action-icon">
                <CartIcon />
                {cartCount > 0 && <span className="hdr-cart-badge">{cartCount}</span>}
              </span>
              <span className="hdr-action-label">{t("cartAria")}</span>
            </button>
            <button
              type="button"
              className="hdr-action hdr-hamburger"
              onClick={() => setDrawerOpen(true)}
              aria-label={t("menuAria")}
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {/* ORANGE CATEGORY NAV */}
        <nav className="hdr-nav" aria-label={t("products")}>
          <ul className="hdr-nav-list">
            <li><Link href="/productos">{t("products")}</Link></li>
            {categories.map((c) => (
              <li key={c.href}><Link href={c.href}>{c.label}</Link></li>
            ))}
            <li><Link href="/sistema">{t("system")}</Link></li>
            <li><Link href="/contacto">{t("contact")}</Link></li>
          </ul>
        </nav>

        {/* USP STRIP */}
        <div className="hdr-usp">
          <span><CheckIcon /> {tAnn("shipping")}</span>
          <span><CheckIcon /> {tAnn("warranty")}</span>
          <span><CheckIcon /> {tAnn("support")}</span>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {drawerOpen && (
        <div className="drawer-backdrop" onClick={() => setDrawerOpen(false)}>
          <aside
            className="drawer"
            onClick={(e) => e.stopPropagation()}
            aria-label={t("menuAria")}
          >
            <div className="drawer-head">
              <div className="drawer-brand">
                <div className="hdr-logo-mark"><CompassMark /></div>
                <span className="hdr-logo-name">Nautic Talk</span>
              </div>
              <button
                type="button"
                className="hdr-action"
                onClick={() => setDrawerOpen(false)}
                aria-label={t("closeAria")}
              >
                <CloseIcon />
              </button>
            </div>

            <form className="hdr-search drawer-search" onSubmit={handleSearch} role="search">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("search.placeholder")}
                aria-label={t("searchAria")}
              />
              <button type="submit" aria-label={t("searchAria")}>
                <SearchIcon />
              </button>
            </form>

            <div className="drawer-body">
              <Link href="/productos" className="drawer-link">{t("products")}</Link>
              {categories.map((c) => (
                <Link key={c.href} href={c.href} className="drawer-link">{c.label}</Link>
              ))}
              <Link href="/sistema" className="drawer-link">{t("system")}</Link>
              <Link href="/escenarios" className="drawer-link">{tScenarios("navLabel")}</Link>
              <Link href="/sistema#tecnologia" className="drawer-link">{t("technology")}</Link>
              <Link href="/contacto" className="drawer-link">{t("contact")}</Link>
            </div>

            <div className="drawer-foot">
              <Link href="/productos" className="drawer-cta">
                <span>{t("drawer.ctaCatalog")}</span>
                <ArrowIcon />
              </Link>
              <div className="drawer-sub">{t("drawer.sub")}</div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
