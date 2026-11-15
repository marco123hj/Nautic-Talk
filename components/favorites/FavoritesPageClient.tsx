"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useFavorites } from "./FavoritesContext";

function priceLocale(locale: string) {
  switch (locale) {
    case "nl":
      return "nl-NL";
    case "en":
      return "en-GB";
    default:
      return "es-ES";
  }
}

function formatMoney(amount: string, currency: string, locale: string) {
  return new Intl.NumberFormat(priceLocale(locale), {
    style: "currency",
    currency,
  }).format(parseFloat(amount));
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 5h14M8 5V3a1 1 0 011-1h2a1 1 0 011 1v2" />
      <path d="M5 5l1 11a2 2 0 002 2h4a2 2 0 002-2l1-11" />
      <path d="M9 9v5M11 9v5" />
    </svg>
  );
}

export default function FavoritesPageClient() {
  const t = useTranslations("favorites");
  const locale = useLocale();
  const { items, count, isReady, remove, clear } = useFavorites();

  if (!isReady) {
    return <div className="cart-page-loading">&nbsp;</div>;
  }

  if (items.length === 0) {
    return (
      <div className="cart-page-empty">
        <div className="cart-empty-icon">
          <HeartIcon />
        </div>
        <h2>{t("emptyTitle")}</h2>
        <p>{t("emptyDesc")}</p>
        <Link href="/productos" className="cart-empty-cta">
          <span>{t("emptyCta")}</span>
          <ArrowRight />
        </Link>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="favorites-page-head">
        <div className="favorites-page-count">
          {count === 1 ? t("itemCount", { count }) : t("itemsCount", { count })}
        </div>
        {count > 0 && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm(t("confirmClear"))) clear();
            }}
            className="favorites-clear-btn"
          >
            {t("clearAll")}
          </button>
        )}
      </div>

      <div className="product-grid product-grid--catalog">
        {items.map((item, index) => {
          return (
            <div key={item.handle} className="product-card favorites-card">
              <button
                type="button"
                onClick={() => remove(item.handle)}
                className="favorites-card-remove"
                aria-label={t("remove")}
                title={t("remove")}
              >
                <TrashIcon />
              </button>
              <Link href={`/productos/${item.handle}`} className="favorites-card-link">
                <div className="product-card-image">
                  {item.image && <img src={item.image} alt={item.title} />}
                </div>
                <div className="product-card-vendor">Nautic Talk</div>
                <div className="product-card-title">{item.title}</div>
                <div className="product-card-bottom">
                  <span className="product-card-price">
                    {formatMoney(item.price, item.currency, locale)}
                  </span>
                  <span className="product-card-arrow">
                    {t("viewProduct")} <ArrowRight />
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
