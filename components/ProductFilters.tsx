"use client";

import { useMemo } from "react";
import type { ShopifyProduct } from "@/lib/shopify";

export interface FilterState {
  categories: string[];
  priceMin: number | null;
  priceMax: number | null;
  search: string;
}

export const EMPTY_FILTERS: FilterState = {
  categories: [],
  priceMin: null,
  priceMax: null,
  search: "",
};

/* Assign a category to each product based on title/handle.
   Order matters — more specific matches first. */
export function getCategory(product: ShopifyProduct): string {
  const t = product.title.toLowerCase();
  const h = product.handle.toLowerCase();

  if (h === "nautic-talk-trio" || h === "nautic-talk-duo") return "Intercomunicadores";

  // Gorras first — unambiguous merch
  if (t.includes("gorra") || h.startsWith("pet-")) return "Merchandising";

  // If title *starts* with "Casco", it's a casco even if bundled with a soporte
  if (t.startsWith("casco")) return "Cascos";

  // Anything starting with "Soporte" is a mount
  if (t.startsWith("soporte") || h.includes("houder") || h.includes("klemhouder") || h.includes("modulehouder")) return "Soportes";

  // Auriculares
  if (t.includes("auricular") || t.includes("oorkappen") || h.includes("oorkappen") || h.includes("koptelefoon")) return "Auriculares";

  // Accessories (wind cover, etc.)
  if (t.includes("protector") || t.includes("viento") || h.includes("windkussen")) return "Accesorios";

  return "Accesorios";
}

const CATEGORIES = [
  "Intercomunicadores",
  "Soportes",
  "Cascos",
  "Auriculares",
  "Accesorios",
  "Merchandising",
];

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4.5l3 3 3-3" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M4 4l12 12M16 4L4 16" />
    </svg>
  );
}

interface Props {
  products: ShopifyProduct[];
  filters: FilterState;
  onChange: (next: FilterState) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
  resultCount: number;
  totalCount: number;
}

export default function ProductFilters({
  products,
  filters,
  onChange,
  isMobileOpen,
  onMobileClose,
  resultCount,
  totalCount,
}: Props) {
  /* Derive available counts per category from current product set */
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of products) {
      const cat = getCategory(p);
      counts[cat] = (counts[cat] ?? 0) + 1;
    }
    return counts;
  }, [products]);

  const priceRange = useMemo(() => {
    if (!products.length) return { min: 0, max: 500 };
    const prices = products.map((p) =>
      parseFloat(p.priceRange.minVariantPrice.amount),
    );
    return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
  }, [products]);

  const toggleCategory = (cat: string) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: next });
  };

  const clearAll = () => onChange(EMPTY_FILTERS);

  const activeFilterCount =
    filters.categories.length +
    (filters.priceMin !== null ? 1 : 0) +
    (filters.priceMax !== null ? 1 : 0) +
    (filters.search ? 1 : 0);

  const content = (
    <div className="filters">
      <div className="filters-head">
        <div className="filters-head-left">
          <div className="filters-head-label">Filtros</div>
          <div className="filters-head-count">
            {resultCount} de {totalCount} producto{totalCount === 1 ? "" : "s"}
          </div>
        </div>
        {activeFilterCount > 0 && (
          <button type="button" onClick={clearAll} className="filters-clear-btn">
            Limpiar {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        )}
        {isMobileOpen && onMobileClose && (
          <button type="button" onClick={onMobileClose} className="filters-close-btn" aria-label="Cerrar filtros">
            <CloseIcon />
          </button>
        )}
      </div>

      {/* SEARCH */}
      <div className="filters-section">
        <input
          type="search"
          placeholder="Buscar producto\u2026"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="filters-search"
          aria-label="Buscar producto"
        />
      </div>

      {/* CATEGORY */}
      <details className="filters-section" open>
        <summary className="filters-section-title">
          <span>Categor&iacute;a</span>
          <ChevronDown />
        </summary>
        <ul className="filters-list">
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat] ?? 0;
            const checked = filters.categories.includes(cat);
            const disabled = count === 0;
            return (
              <li key={cat}>
                <label className={`filters-check${disabled ? " filters-check--disabled" : ""}`}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCategory(cat)}
                    disabled={disabled}
                  />
                  <span className="filters-check-box" aria-hidden />
                  <span className="filters-check-label">{cat}</span>
                  <span className="filters-check-count">{count}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </details>

      {/* PRICE */}
      <details className="filters-section" open>
        <summary className="filters-section-title">
          <span>Precio</span>
          <ChevronDown />
        </summary>
        <div className="filters-price-row">
          <div className="filters-price-field">
            <label htmlFor="priceMin">M&iacute;n</label>
            <input
              id="priceMin"
              type="number"
              min={priceRange.min}
              max={priceRange.max}
              placeholder={`${priceRange.min}`}
              value={filters.priceMin ?? ""}
              onChange={(e) =>
                onChange({
                  ...filters,
                  priceMin: e.target.value === "" ? null : Number(e.target.value),
                })
              }
            />
            <span className="filters-price-currency">&euro;</span>
          </div>
          <div className="filters-price-sep" />
          <div className="filters-price-field">
            <label htmlFor="priceMax">M&aacute;x</label>
            <input
              id="priceMax"
              type="number"
              min={priceRange.min}
              max={priceRange.max}
              placeholder={`${priceRange.max}`}
              value={filters.priceMax ?? ""}
              onChange={(e) =>
                onChange({
                  ...filters,
                  priceMax: e.target.value === "" ? null : Number(e.target.value),
                })
              }
            />
            <span className="filters-price-currency">&euro;</span>
          </div>
        </div>
        <div className="filters-price-range">
          Rango: &euro;{priceRange.min} &ndash; &euro;{priceRange.max}
        </div>
      </details>

      {isMobileOpen && onMobileClose && (
        <div className="filters-mobile-foot">
          <button type="button" onClick={onMobileClose} className="filters-apply-btn">
            Ver {resultCount} resultado{resultCount === 1 ? "" : "s"}
          </button>
        </div>
      )}
    </div>
  );

  if (isMobileOpen !== undefined) {
    // Mobile drawer variant
    return (
      <>
        {isMobileOpen && (
          <div className="filters-drawer-backdrop" onClick={onMobileClose}>
            <aside
              className="filters-drawer"
              onClick={(e) => e.stopPropagation()}
              aria-label="Filtros"
            >
              {content}
            </aside>
          </div>
        )}
      </>
    );
  }

  // Desktop sidebar
  return <div className="filters-sidebar">{content}</div>;
}
