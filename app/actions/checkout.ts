"use server";

import { createShopifyCart, type CartCreateLine } from "@/lib/shopify";

export async function createCheckout(
  lines: CartCreateLine[],
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  if (!lines.length) {
    return { ok: false, error: "Cart is empty" };
  }

  try {
    const cart = await createShopifyCart(lines);
    return { ok: true, url: cart.checkoutUrl };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown checkout error";
    return { ok: false, error: msg };
  }
}
