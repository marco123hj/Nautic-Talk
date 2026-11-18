"use client";

import { useState, useEffect, Suspense } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { useCart } from "./cart/CartContext";
import { useFavorites } from "./favorites/FavoritesContext";
import { COMPANY } from "@/lib/site";
import { shopCopy } from "@/lib/catalog";
import h from "./shop/header.module.css";

/* ============ ICONS ============ */

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
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h14l-1.5 8.5a1.5 1.5 0 01-1.5 1.2H7a1.5 1.5 0 01-1.5-1.2L4 6z" />
      <path d="M4 6l-1-3H1" />
      <circle cx="8" cy="18" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="18" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
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
  const tFilters = useTranslations("filters");
  const tScenarios = useTranslations("scenarios");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { count: cartCount, openCart } = useCart();
  const { count: favCount } = useFavorites();
  const c = shopCopy(useLocale());

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
      <header className={h.header}>
        {/* SERVICE BAR */}
        <div className={h.service}>
          <div className={`${h.inner} ${h.serviceInner}`}>
            <ul className={h.usps}>
              {c.usps.map((u) => (
                <li key={u}><CheckIcon /> {u}</li>
              ))}
            </ul>
            <a className={h.phone} href={`tel:${COMPANY.phone.replace(/s/g, "")}`}>
              {c.questions} <span>{COMPANY.phone}</span>
            </a>
          </div>
        </div>

        {/* MAIN ROW */}
        <div className={h.inner}>
          <div className={h.main}>
            <Link href="/" className={h.logo} aria-label="Nautic Talk">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/nautic-talk.svg" alt="Nautic Talk" width={534} height={74} />
            </Link>

            <form className={h.search} onSubmit={handleSearch} role="search">
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

            <div className={h.actions}>
              <Suspense fallback={null}>
                <LanguageSwitcher />
              </Suspense>
              <Link href="/favoritos" className={h.action} aria-label={c.favorites}>
                <span className={h.actionIcon}>
                  <HeartIcon />
                  {favCount > 0 && <span className={h.badge}>{favCount}</span>}
                </span>
                <span className={h.actionLabel}>{c.favorites}</span>
              </Link>
              <button type="button" className={h.action} onClick={openCart} aria-label={t("cartAria")}>
                <span className={h.actionIcon}>
                  <CartIcon />
                  {cartCount > 0 && <span className={h.badge}>{cartCount}</span>}
                </span>
                <span className={h.actionLabel}>{c.cart}</span>
              </button>
              <button
                type="button"
                className={`${h.action} ${h.burger}`}
                onClick={() => setDrawerOpen(true)}
                aria-label={t("menuAria")}
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>

        {/* CATEGORY BAR */}
        <nav className={h.cats} aria-label={t("products")}>
          <div className={`${h.inner} ${h.catsInner}`}>
            <ul className={h.catList}>
              <li>
                <Link href="/productos" className={h.catAll}>
                  <MenuIcon /> {c.allProducts}
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.href}><Link href={cat.href}>{cat.label}</Link></li>
              ))}
            </ul>
            <ul className={`${h.catList} ${h.catSecondary}`}>
              <li><Link href="/sistema">{c.system}</Link></li>
              <li><Link href="/contacto">{c.contact}</Link></li>
            </ul>
          </div>
        </nav>
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="hdr-logo-img" src="/brand/nautic-talk.svg" alt="Nautic Talk" width={534} height={74} />
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
