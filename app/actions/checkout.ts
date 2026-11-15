"use server";

import { headers } from "next/headers";
import { createShopifyCart, type CartCreateLine } from "@/lib/shopify";

export async function createCheckout(
  lines: CartCreateLine[],
  locale?: string,
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  if (!lines.length) {
    return { ok: false, error: "Cart is empty" };
  }

  try {
    const cart = await createShopifyCart(
      lines,
      locale,
      // Visitor's country from Vercel, so checkout opens on the right one.
      headers().get("x-vercel-ip-country"),
    );
    return { ok: true, url: cart.checkoutUrl };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown checkout error";
    return { ok: false, error: msg };
  }
}
