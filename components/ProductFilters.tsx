"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { getCategory, type ShopifyProduct } from "@/lib/shopify";

export { getCategory };

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

type CategoryKey =
  | "Intercomunicadores"
  | "Soportes"
  | "Cascos"
  | "Auriculares"
  | "Accesorios"
  | "Merchandising";

const CATEGORIES: { key: CategoryKey; tkey: string }[] = [
  { key: "Intercomunicadores", tkey: "catIntercoms" },
  { key: "Soportes", tkey: "catMounts" },
  { key: "Cascos", tkey: "catHelmets" },
  { key: "Auriculares", tkey: "catHeadsets" },
  { key: "Accesorios", tkey: "catAccessories" },
  { key: "Merchandising", tkey: "catMerch" },
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
  const t = useTranslations("filters");

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
          <div className="filters-head-label">{t("title")}</div>
          <div className="filters-head-count">
            {totalCount === 1
              ? t("countProduct", { filtered: resultCount, total: totalCount })
              : t("countProducts", { filtered: resultCount, total: totalCount })}
          </div>
        </div>
        {activeFilterCount > 0 && (
          <button type="button" onClick={clearAll} className="filters-clear-btn">
            {t("clear")} ({activeFilterCount})
          </button>
        )}
        {isMobileOpen && onMobileClose && (
          <button type="button" onClick={onMobileClose} className="filters-close-btn" aria-label={t("close")}>
            <CloseIcon />
          </button>
        )}
      </div>

      {/* SEARCH */}
      <div className="filters-section">
        <input
          type="search"
          placeholder={t("searchPlaceholder")}
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="filters-search"
          aria-label={t("searchAria")}
        />
      </div>

      {/* CATEGORY */}
      <details className="filters-section" open>
        <summary className="filters-section-title">
          <span>{t("sectionCategory")}</span>
          <ChevronDown />
        </summary>
        <ul className="filters-list">
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.key] ?? 0;
            const checked = filters.categories.includes(cat.key);
            const disabled = count === 0;
            return (
              <li key={cat.key}>
                <label className={`filters-check${disabled ? " filters-check--disabled" : ""}`}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCategory(cat.key)}
                    disabled={disabled}
                  />
                  <span className="filters-check-box" aria-hidden />
                  <span className="filters-check-label">{t(cat.tkey)}</span>
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
          <span>{t("sectionPrice")}</span>
          <ChevronDown />
        </summary>
        <div className="filters-price-row">
          <div className="filters-price-field">
            <label htmlFor="priceMin">{t("priceMin")}</label>
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
            <label htmlFor="priceMax">{t("priceMax")}</label>
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
          {t("priceRange", { min: priceRange.min, max: priceRange.max })}
        </div>
      </details>

      {isMobileOpen && onMobileClose && (
        <div className="filters-mobile-foot">
          <button type="button" onClick={onMobileClose} className="filters-apply-btn">
            {resultCount === 1
              ? t("applyOne", { count: resultCount })
              : t("apply", { count: resultCount })}
          </button>
        </div>
      )}
    </div>
  );

  if (isMobileOpen !== undefined) {
    return (
      <>
        {isMobileOpen && (
          <div className="filters-drawer-backdrop" onClick={onMobileClose}>
            <aside
              className="filters-drawer"
              onClick={(e) => e.stopPropagation()}
              aria-label={t("title")}
            >
              {content}
            </aside>
          </div>
        )}
      </>
    );
  }

  return <div className="filters-sidebar">{content}</div>;
}
