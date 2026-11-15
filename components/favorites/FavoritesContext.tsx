"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface FavoriteItem {
  /** Product handle — used as the unique key and for linking back */
  handle: string;
  title: string;
  image?: string;
  /** Lowest variant price amount as string */
  price: string;
  currency: string;
  /** ISO timestamp — when it was added (for sort-by-recent) */
  addedAt: string;
}

interface FavoritesContextValue {
  items: FavoriteItem[];
  count: number;
  isReady: boolean;
  isFavorited: (handle: string) => boolean;
  toggle: (item: Omit<FavoriteItem, "addedAt">) => void;
  add: (item: Omit<FavoriteItem, "addedAt">) => void;
  remove: (handle: string) => void;
  clear: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const STORAGE_KEY = "nautictalk-favorites-v1";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<FavoriteItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as FavoriteItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* ignore bad JSON */
    }
    setIsReady(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!isReady) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage quota etc. */
    }
  }, [items, isReady]);

  const isFavorited = useCallback(
    (handle: string) => items.some((p) => p.handle === handle),
    [items],
  );

  const add = useCallback((item: Omit<FavoriteItem, "addedAt">) => {
    setItems((prev) => {
      if (prev.some((p) => p.handle === item.handle)) return prev;
      return [{ ...item, addedAt: new Date().toISOString() }, ...prev];
    });
  }, []);

  const remove = useCallback((handle: string) => {
    setItems((prev) => prev.filter((p) => p.handle !== handle));
  }, []);

  const toggle = useCallback(
    (item: Omit<FavoriteItem, "addedAt">) => {
      setItems((prev) => {
        if (prev.some((p) => p.handle === item.handle)) {
          return prev.filter((p) => p.handle !== item.handle);
        }
        return [{ ...item, addedAt: new Date().toISOString() }, ...prev];
      });
    },
    [],
  );

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      items,
      count: items.length,
      isReady,
      isFavorited,
      toggle,
      add,
      remove,
      clear,
    }),
    [items, isReady, isFavorited, toggle, add, remove, clear],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within a FavoritesProvider");
  return ctx;
}
