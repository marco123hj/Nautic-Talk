"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface CartItem {
  /** Shopify variant GID, e.g. "gid://shopify/ProductVariant/1234" */
  variantId: string;
  /** Product handle — for linking back to the product page */
  handle: string;
  /** Product title */
  title: string;
  /** Variant title (e.g. "Default Title" or "Black / Large") */
  variantTitle: string;
  /** First product image URL */
  image?: string;
  /** Variant price amount as string (e.g. "59.29") */
  price: string;
  /** ISO currency code (e.g. "EUR") */
  currency: string;
  /** Quantity in cart */
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  currency: string;
  isOpen: boolean;
  isReady: boolean; // hydrated from localStorage
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "nautictalk-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* ignore bad JSON */
    }
    setIsReady(true);
  }, []);

  // Persist on change (after hydration)
  useEffect(() => {
    if (!isReady) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage quota errors etc. */
    }
  }, [items, isReady]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, qty = 1) => {
      setItems((prev) => {
        const existing = prev.find((p) => p.variantId === item.variantId);
        if (existing) {
          return prev.map((p) =>
            p.variantId === item.variantId
              ? { ...p, quantity: p.quantity + qty }
              : p,
          );
        }
        return [...prev, { ...item, quantity: qty }];
      });
      setIsOpen(true);
    },
    [],
  );

  const removeItem = useCallback((variantId: string) => {
    setItems((prev) => prev.filter((p) => p.variantId !== variantId));
  }, []);

  const updateQuantity = useCallback(
    (variantId: string, qty: number) => {
      if (qty < 1) {
        removeItem(variantId);
        return;
      }
      setItems((prev) =>
        prev.map((p) =>
          p.variantId === variantId ? { ...p, quantity: qty } : p,
        ),
      );
    },
    [removeItem],
  );

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, it) => n + it.quantity, 0);
    const subtotal = items.reduce(
      (n, it) => n + parseFloat(it.price) * it.quantity,
      0,
    );
    const currency = items[0]?.currency ?? "EUR";
    return {
      items,
      count,
      subtotal,
      currency,
      isOpen,
      isReady,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      clear,
    };
  }, [
    items,
    isOpen,
    isReady,
    openCart,
    closeCart,
    toggleCart,
    addItem,
    removeItem,
    updateQuantity,
    clear,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
