"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import s from "./shop.module.css";

interface Props {
  handle: string;
  title: string;
  image?: string;
  variant: {
    id: string;
    title: string;
    availableForSale: boolean;
    price: { amount: string; currencyCode: string };
  };
  label: string;
  doneLabel: string;
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 4.5h2.2l1.6 11a1.6 1.6 0 0 0 1.6 1.4h8.3a1.6 1.6 0 0 0 1.6-1.2l1.7-7.2H6.6" />
      <circle cx="9.5" cy="20.3" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="17" cy="20.3" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4 4L19 6.5" />
    </svg>
  );
}

// Adds one piece of a single-variant product to the cart and opens the cart.
export default function QuickAdd({ handle, title, image, variant, label, doneLabel }: Props) {
  const { addItem, openCart } = useCart();
  const [done, setDone] = useState(false);

  function add() {
    addItem({
      variantId: variant.id,
      handle,
      title,
      variantTitle: variant.title,
      image,
      price: variant.price.amount,
      currency: variant.price.currencyCode,
    });
    setDone(true);
    openCart();
    setTimeout(() => setDone(false), 1600);
  }

  return (
    <button
      type="button"
      className={`${s.add} ${done ? s.addDone : ""}`}
      onClick={add}
      disabled={!variant.availableForSale}
      aria-label={done ? doneLabel : `${label}: ${title}`}
      title={label}
    >
      {done ? <CheckIcon /> : <CartIcon />}
    </button>
  );
}
