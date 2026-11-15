"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "./CartContext";
import { createCheckout } from "@/app/actions/checkout";

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

function formatMoney(amount: number, currency: string, locale: string) {
  return new Intl.NumberFormat(priceLocale(locale), {
    style: "currency",
    currency,
  }).format(amount);
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" />
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

function MinusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M3 6h6" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M3 6h6M6 3v6" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 10h18l-2 16a2 2 0 01-2 2H11a2 2 0 01-2-2L7 10z" />
      <path d="M11 10a5 5 0 0110 0" />
    </svg>
  );
}

export default function CartPageClient() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const {
    items,
    count,
    subtotal,
    currency,
    isReady,
    updateQuantity,
    removeItem,
  } = useCart();

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  async function handleCheckout() {
    setCheckoutError(null);
    setCheckoutLoading(true);
    try {
      const res = await createCheckout(
        items.map((it) => ({
          merchandiseId: it.variantId,
          quantity: it.quantity,
        })),
        locale,
      );
      if (res.ok) {
        window.location.href = res.url;
      } else {
        setCheckoutError(res.error);
        setCheckoutLoading(false);
      }
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Error");
      setCheckoutLoading(false);
    }
  }

  // Before hydration, render a minimal placeholder to avoid mismatch
  if (!isReady) {
    return <div className="cart-page-loading">&nbsp;</div>;
  }

  if (items.length === 0) {
    return (
      <div className="cart-page-empty">
        <div className="cart-empty-icon">
          <BagIcon />
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
    <div className="cart-page">
      <div className="cart-page-main">
        <div className="cart-page-head">
          <h2 className="cart-page-heading">
            {count === 1 ? t("itemCount", { count }) : t("itemsCount", { count })}
          </h2>
          <Link href="/productos" className="cart-page-continue">
            {t("continueShopping")} &rarr;
          </Link>
        </div>

        <ul className="cart-page-items">
          {items.map((it) => {
            const lineTotal = parseFloat(it.price) * it.quantity;
            return (
              <li key={it.variantId} className="cart-page-item">
                <Link
                  href={`/productos/${it.handle}`}
                  className="cart-page-item-image"
                >
                  {it.image && <img src={it.image} alt={it.title} />}
                </Link>

                <div className="cart-page-item-body">
                  <Link
                    href={`/productos/${it.handle}`}
                    className="cart-page-item-title"
                  >
                    {it.title}
                  </Link>
                  {it.variantTitle && it.variantTitle !== "Default Title" && (
                    <div className="cart-page-item-variant">{it.variantTitle}</div>
                  )}
                  <div className="cart-page-item-unit">
                    {formatMoney(parseFloat(it.price), it.currency, locale)}{" "}
                    <span className="cart-page-item-unit-each">{t("eachAbbrev")}</span>
                  </div>
                </div>

                <div className="cart-page-item-qty">
                  <div className="cart-qty">
                    <button
                      type="button"
                      onClick={() => updateQuantity(it.variantId, it.quantity - 1)}
                      aria-label={t("decrease")}
                      className="cart-qty-btn"
                    >
                      <MinusIcon />
                    </button>
                    <span className="cart-qty-value">{it.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(it.variantId, it.quantity + 1)}
                      aria-label={t("increase")}
                      className="cart-qty-btn"
                    >
                      <PlusIcon />
                    </button>
                  </div>
                </div>

                <div className="cart-page-item-total">
                  {formatMoney(lineTotal, it.currency, locale)}
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(it.variantId)}
                  className="cart-page-item-remove"
                  aria-label={t("remove")}
                >
                  <TrashIcon />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <aside className="cart-page-summary">
        <h3 className="cart-page-summary-title">{t("summaryTitle")}</h3>

        <dl className="cart-page-summary-rows">
          <div>
            <dt>{t("subtotal")}</dt>
            <dd>{formatMoney(subtotal, currency, locale)}</dd>
          </div>
          <div>
            <dt>{t("shippingRow")}</dt>
            <dd className="cart-page-summary-muted">{t("shippingRowValue")}</dd>
          </div>
          <div>
            <dt>{t("taxesRow")}</dt>
            <dd className="cart-page-summary-muted">{t("taxesRowValue")}</dd>
          </div>
        </dl>

        <div className="cart-page-summary-total">
          <span>{t("estimatedTotal")}</span>
          <strong>{formatMoney(subtotal, currency, locale)}</strong>
        </div>

        {checkoutError && (
          <div className="cart-error">
            {t("checkoutError")}: {checkoutError}
          </div>
        )}

        <button
          type="button"
          onClick={handleCheckout}
          disabled={checkoutLoading}
          className="cart-checkout-btn"
        >
          {checkoutLoading ? (
            <span>{t("checkoutLoading")}</span>
          ) : (
            <>
              <span>{t("checkout")}</span>
              <ArrowRight />
            </>
          )}
        </button>

        <p className="cart-page-summary-note">{t("shippingNote")}</p>
      </aside>
    </div>
  );
}
