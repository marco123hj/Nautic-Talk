"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCart } from "./CartContext";
import { useFavorites } from "../favorites/FavoritesContext";

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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h2l1.3 11.3a1.5 1.5 0 0 0 1.5 1.3h8.1a1.5 1.5 0 0 0 1.5-1.2L21 8.5H7.1" />
      <circle cx="9.5" cy="20.5" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="20.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4 4L19 6.5" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 8h10" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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

      <div className="product-actions">
        <div className="qty-stepper">
          <button
            type="button"
            aria-label={tCart("decrease")}
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
          >
            <MinusIcon />
          </button>
          <span className="qty-stepper-value">{qty}</span>
          <button
            type="button"
            aria-label={tCart("increase")}
            onClick={() => setQty((q) => Math.min(99, q + 1))}
          >
            <PlusIcon />
          </button>
        </div>
        <button
          type="button"
          className="add-to-cart-btn"
          onClick={handleAdd}
          disabled={!selected?.availableForSale}
        >
          {feedback === "ok" ? <CheckIcon /> : <CartIcon />}
          <span>
            {feedback === "ok"
              ? tCart("addedToCart")
              : !selected?.availableForSale
                ? tCart("soldOut")
                : t("addToCart")}
          </span>
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
    </>
  );
}
