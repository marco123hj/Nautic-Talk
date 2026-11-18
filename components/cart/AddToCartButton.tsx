"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "./CartContext";
import { useFavorites } from "../favorites/FavoritesContext";
import { formatPrice } from "@/lib/catalog";
import { sized } from "../shop/ProductCard";
import s from "../shop/sticky.module.css";

interface Variant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
}

interface Props {
  handle: string;
  title: string;
  image?: string;
  variants: Variant[];
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 5h2l1.3 11.3a1.5 1.5 0 0 0 1.5 1.3h8.1a1.5 1.5 0 0 0 1.5-1.2L21 8.5H7.1" />
      <circle cx="9.5" cy="20.5" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="20.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4 4L19 6.5" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M3 8h10" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export default function AddToCartButton({
  handle,
  title,
  image,
  variants,
}: Props) {
  const t = useTranslations("product");
  const tCart = useTranslations("cart");
  const tFav = useTranslations("favorites");
  const locale = useLocale();
  const { addItem } = useCart();
  const { isFavorited, toggle: toggleFavorite } = useFavorites();

  const favorited = isFavorited(handle);

  const initial =
    variants.find((v) => v.availableForSale) ?? variants[0] ?? null;
  const [selectedId, setSelectedId] = useState<string | null>(
    initial?.id ?? null,
  );
  const [feedback, setFeedback] = useState<"ok" | "soldout" | null>(null);
  const [qty, setQty] = useState(1);

  const selected = variants.find((v) => v.id === selectedId) ?? initial;
  const showVariants = variants.length > 1;
  const available = !!selected?.availableForSale;

  // The bar at the bottom slides up once the main buttons have scrolled out
  // at the top, and steps aside again when the footer comes in.
  const actionsRef = useRef<HTMLDivElement>(null);
  const [pastBuy, setPastBuy] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  // The bar is rendered into <body>: the buy column animates in with a
  // transform, which would otherwise pin a fixed bar to the column.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const anchor = actionsRef.current;
    if (!anchor || typeof IntersectionObserver === "undefined") return;
    // The top margin leaves out the sticky header, so the bar shows as soon
    // as the buttons slide in under it.
    const header = document.querySelector("header");
    const headerH = header ? Math.round(header.getBoundingClientRect().bottom) : 0;
    const buy = new IntersectionObserver(
      ([e]) => setPastBuy(!e.isIntersecting && e.boundingClientRect.top < headerH),
      { rootMargin: `-${Math.max(0, headerH)}px 0px 0px 0px` },
    );
    buy.observe(anchor);
    // The bar is done once the reviews (or the footer) come into view, and
    // stays away below that: the related products have their own buttons.
    const end = document.querySelector("[data-buy-bar-end]") ?? document.querySelector("footer");
    const foot = new IntersectionObserver(([e]) =>
      setAtFooter(e.isIntersecting || e.boundingClientRect.top < 0),
    );
    if (end) foot.observe(end);
    return () => {
      buy.disconnect();
      foot.disconnect();
    };
  }, []);
  // Step aside while someone types in a form (the review form), so the bar
  // never sits over the text field or above a phone keyboard.
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    const check = () => {
      const el = document.activeElement;
      setTyping(!!el && (el.tagName === "TEXTAREA" || (el.tagName === "INPUT" && (el as HTMLInputElement).type !== "radio")) && !el.closest("[data-buy-bar]"));
    };
    const later = () => setTimeout(check, 0);
    document.addEventListener("focusin", check);
    document.addEventListener("focusout", later);
    return () => {
      document.removeEventListener("focusin", check);
      document.removeEventListener("focusout", later);
    };
  }, []);
  const barVisible = pastBuy && !atFooter && !typing;

  function handleAdd() {
    if (!selected) return;
    if (!selected.availableForSale) {
      setFeedback("soldout");
      return;
    }
    addItem(
      {
        variantId: selected.id,
        handle,
        title,
        variantTitle: selected.title,
        image,
        price: selected.price.amount,
        currency: selected.price.currencyCode,
      },
      qty,
    );
    setQty(1);
    setFeedback("ok");
    setTimeout(() => setFeedback(null), 1500);
  }

  function handleFavorite() {
    if (!selected) return;
    toggleFavorite({
      handle,
      title,
      image,
      price: selected.price.amount,
      currency: selected.price.currencyCode,
    });
  }

  const addLabel =
    feedback === "ok" ? tCart("addedToCart") : !available ? tCart("soldOut") : t("addToCart");

  const stepper = (className: string) => (
    <div className={className}>
      <button
        type="button"
        aria-label={tCart("decrease")}
        onClick={() => setQty((q) => Math.max(1, q - 1))}
        disabled={qty <= 1}
      >
        <MinusIcon />
      </button>
      <span className="qty-stepper-value" aria-live="polite">{qty}</span>
      <button
        type="button"
        aria-label={tCart("increase")}
        onClick={() => setQty((q) => Math.min(99, q + 1))}
      >
        <PlusIcon />
      </button>
    </div>
  );

  return (
    <>
      {showVariants && (
        <div className="product-variants-wrap">
          <div className="product-variants-label">{t("variantsLabel")}</div>
          <div className="product-variants">
            {variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => v.availableForSale && setSelectedId(v.id)}
                disabled={!v.availableForSale}
                className={`variant-chip${
                  !v.availableForSale ? " variant-chip--soldout" : ""
                }${v.id === selectedId ? " variant-chip--active" : ""}`}
              >
                {v.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="product-actions" ref={actionsRef}>
        {stepper("qty-stepper")}
        <button
          type="button"
          className="add-to-cart-btn"
          onClick={handleAdd}
          disabled={!available}
        >
          {feedback === "ok" ? <CheckIcon /> : <CartIcon />}
          <span>{addLabel}</span>
        </button>
        <button
          type="button"
          className={`product-wishlist-btn${favorited ? " product-wishlist-btn--active" : ""}`}
          aria-label={favorited ? tFav("removeAria") : tFav("addAria")}
          aria-pressed={favorited}
          onClick={handleFavorite}
          title={favorited ? tFav("savedTitle") : tFav("saveTitle")}
        >
          <HeartIcon filled={favorited} />
        </button>
      </div>

      {feedback === "soldout" && (
        <div className="cart-error" style={{ marginTop: "0.75rem" }}>
          {tCart("soldOutMessage")}
        </div>
      )}

      {selected && mounted && createPortal(
        <div className={s.bar} data-buy-bar="" data-visible={barVisible} aria-hidden={!barVisible}>
          <div className={s.thumb}>
            {image && <img src={sized(image, 160)} alt="" width={64} height={64} />}
          </div>
          <div className={s.text}>
            <p className={s.name}>{title}</p>
            <p className={s.meta}>
              {showVariants && <span className={s.variant}>{selected.title} · </span>}
              <strong>{formatPrice(selected.price.amount, selected.price.currencyCode, locale)}</strong>
            </p>
          </div>
          {showVariants && (
            <select
              className={s.select}
              value={selected.id}
              onChange={(e) => setSelectedId(e.target.value)}
              aria-label={t("variantsLabel")}
              tabIndex={barVisible ? 0 : -1}
            >
              {variants.map((v) => (
                <option key={v.id} value={v.id} disabled={!v.availableForSale}>
                  {v.title}
                </option>
              ))}
            </select>
          )}
          {stepper(s.qty)}
          <button
            type="button"
            className={s.add}
            onClick={handleAdd}
            disabled={!available}
            tabIndex={barVisible ? 0 : -1}
          >
            {feedback === "ok" ? <CheckIcon /> : <CartIcon />}
            <span>{addLabel}</span>
          </button>
        </div>,
        document.body,
      )}
    </>
  );
}
