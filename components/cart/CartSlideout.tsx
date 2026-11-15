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

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M4 4l12 12M16 4L4 16" />
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

function ArrowIcon() {
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

function CartBagIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 10h18l-2 16a2 2 0 01-2 2H11a2 2 0 01-2-2L7 10z" />
      <path d="M11 10a5 5 0 0110 0" />
    </svg>
  );
}

export default function CartSlideout() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const {
    items,
    count,
    subtotal,
    currency,
    isOpen,
    closeCart,
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

  if (!isOpen) return null;

  return (
    <div className="cart-backdrop" onClick={closeCart} role="presentation">
      <aside
        className="cart-slideout"
        onClick={(e) => e.stopPropagation()}
        aria-label={t("title")}
      >
        <div className="cart-head">
          <div className="cart-head-title">
            <h2>{t("title")}</h2>
            {count > 0 && (
              <span className="cart-head-count">
                {count === 1
                  ? t("itemCount", { count })
                  : t("itemsCount", { count })}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="cart-close-btn"
            aria-label={t("close")}
          >
            <CloseIcon />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">
              <CartBagIcon />
            </div>
            <h3 className="cart-empty-title">{t("emptyTitle")}</h3>
            <p className="cart-empty-desc">{t("emptyDesc")}</p>
            <Link href="/productos" onClick={closeCart} className="cart-empty-cta">
              <span>{t("emptyCta")}</span>
              <ArrowIcon />
            </Link>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {items.map((it) => (
                <li key={it.variantId} className="cart-item">
                  <Link
                    href={`/productos/${it.handle}`}
                    onClick={closeCart}
                    className="cart-item-image"
                  >
                    {it.image && <img src={it.image} alt={it.title} />}
                  </Link>

                  <div className="cart-item-body">
                    <Link
                      href={`/productos/${it.handle}`}
                      onClick={closeCart}
                      className="cart-item-title"
                    >
                      {it.title}
                    </Link>
                    {it.variantTitle && it.variantTitle !== "Default Title" && (
                      <div className="cart-item-variant">{it.variantTitle}</div>
                    )}
                    <div className="cart-item-price">
                      {formatMoney(parseFloat(it.price), it.currency, locale)}
                    </div>

                    <div className="cart-item-footer">
                      <div className="cart-qty">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(it.variantId, it.quantity - 1)
                          }
                          aria-label={t("decrease")}
                          className="cart-qty-btn"
                        >
                          <MinusIcon />
                        </button>
                        <span className="cart-qty-value">{it.quantity}</span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(it.variantId, it.quantity + 1)
                          }
                          aria-label={t("increase")}
                          className="cart-qty-btn"
                        >
                          <PlusIcon />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(it.variantId)}
                        className="cart-item-remove"
                        aria-label={t("remove")}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-foot">
              <div className="cart-subtotal">
                <span className="cart-subtotal-label">{t("subtotal")}</span>
                <span className="cart-subtotal-amount">
                  {formatMoney(subtotal, currency, locale)}
                </span>
              </div>
              <div className="cart-shipping-note">{t("shippingNote")}</div>
              {checkoutError && (
                <div className="cart-error">
                  {t("checkoutError")}: {checkoutError}
                </div>
              )}
              <button
                type="button"
                onClick={handleCheckout}
                disabled={checkoutLoading || items.length === 0}
                className="cart-checkout-btn"
              >
                {checkoutLoading ? (
                  <span>{t("checkoutLoading")}</span>
                ) : (
                  <>
                    <span>{t("checkout")}</span>
                    <ArrowIcon />
                  </>
                )}
              </button>
              <div className="cart-secondary-actions">
                <Link
                  href="/carrito"
                  onClick={closeCart}
                  className="cart-view-cart-btn"
                >
                  {t("viewCart")}
                </Link>
                <button
                  type="button"
                  onClick={closeCart}
                  className="cart-continue-btn"
                >
                  {t("continueShopping")}
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
