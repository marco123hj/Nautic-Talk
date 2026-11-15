"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import type { ShopifyProduct } from "@/lib/shopify";
import ProductFilters, {
  EMPTY_FILTERS,
  type FilterState,
  getCategory,
} from "./ProductFilters";

function formatPrice(amount: string, currency: string, locale: string = "es-ES") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(parseFloat(amount));
}

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

function ArrowRight({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M2 4h12M4 8h8M6 12h4" />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4.5l3 3 3-3" />
    </svg>
  );
}

type SortKey = "relevance" | "price-asc" | "price-desc" | "name";

interface Props {
  products: ShopifyProduct[];
}

export default function CatalogClient({ products }: Props) {
  const t = useTranslations("catalog");
  const locale = useLocale();
  const priceLoc = priceLocale(locale);

  const sortOptions: { value: SortKey; label: string }[] = [
    { value: "relevance", label: t("sortRelevance") },
    { value: "price-asc", label: t("sortPriceAsc") },
    { value: "price-desc", label: t("sortPriceDesc") },
    { value: "name", label: t("sortName") },
  ];

  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  const urlQuery = searchParams.get("q");

  const [filters, setFilters] = useState<FilterState>(() => ({
    ...EMPTY_FILTERS,
    categories: urlCategory ? [urlCategory] : [],
    search: urlQuery ?? "",
  }));
  const [sort, setSort] = useState<SortKey>("relevance");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Re-sync filters when the URL changes (e.g. user clicks a different nav category)
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      categories: urlCategory ? [urlCategory] : [],
      search: urlQuery ?? prev.search,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlCategory, urlQuery]);

  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase();

    let result = products.filter((p) => {
      // Category filter
      if (filters.categories.length) {
        const cat = getCategory(p);
        if (!filters.categories.includes(cat)) return false;
      }
      // Price filter
      const price = parseFloat(p.priceRange.minVariantPrice.amount);
      if (filters.priceMin !== null && price < filters.priceMin) return false;
      if (filters.priceMax !== null && price > filters.priceMax) return false;
      // Search filter
      if (q) {
        const hay = `${p.title} ${p.description ?? ""} ${p.vendor ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    // Sort
    if (sort === "price-asc") {
      result = [...result].sort(
        (a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) -
          parseFloat(b.priceRange.minVariantPrice.amount),
      );
    } else if (sort === "price-desc") {
      result = [...result].sort(
        (a, b) =>
          parseFloat(b.priceRange.minVariantPrice.amount) -
          parseFloat(a.priceRange.minVariantPrice.amount),
      );
    } else if (sort === "name") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title, locale));
    } else if (sort === "relevance") {
      // Promote Trio and Duo to top
      const weight = (p: ShopifyProduct) => {
        if (p.handle === "nautic-talk-trio") return 0;
        if (p.handle === "nautic-talk-duo") return 1;
        return 2;
      };
      result = [...result].sort((a, b) => weight(a) - weight(b));
    }

    return result;
  }, [products, filters, sort]);

  const activeFilterCount =
    filters.categories.length +
    (filters.priceMin !== null ? 1 : 0) +
    (filters.priceMax !== null ? 1 : 0) +
    (filters.search ? 1 : 0);

  return (
    <div className="catalog-layout">
      {/* Desktop sidebar */}
      <aside className="catalog-aside">
        <ProductFilters
          products={products}
          filters={filters}
          onChange={setFilters}
          resultCount={filtered.length}
          totalCount={products.length}
        />
      </aside>

      <main className="catalog-main">
        {/* Toolbar */}
        <div className="catalog-toolbar">
          <button
            type="button"
            className="catalog-filter-btn"
            onClick={() => setMobileFiltersOpen(true)}
            aria-label={t("toolbarFilters")}
          >
            <FilterIcon />
            <span>{t("toolbarFilters")}</span>
            {activeFilterCount > 0 && (
              <span className="catalog-filter-btn-badge">{activeFilterCount}</span>
            )}
          </button>
          <div className="catalog-toolbar-info">
            {products.length === 1
              ? t("toolbarCountProduct", { filtered: filtered.length, total: products.length })
              : t("toolbarCountProducts", { filtered: filtered.length, total: products.length })}
          </div>
          <label className="catalog-sort">
            <span className="catalog-sort-label">{t("toolbarSort")}</span>
            <div className="catalog-sort-select-wrap">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="catalog-sort-select"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <SortIcon />
            </div>
          </label>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="catalog-empty">
            <p className="empty-message">{t("emptyFiltered")}</p>
            <button
              type="button"
              onClick={() => setFilters(EMPTY_FILTERS)}
              className="btn-link"
              style={{ marginTop: "1.5rem" }}
            >
              <span>{t("clearFilters")}</span>
              <ArrowRight />
            </button>
          </div>
        ) : (
          <div className="product-grid product-grid--catalog">
            {filtered.map((product, index) => {
              const image = product.images.edges[0]?.node;
              const price = product.priceRange.minVariantPrice;

              return (
                <Link
                  key={product.id}
                  href={`/productos/${product.handle}`}
                  className="product-card"
                >
                  <div className="product-card-image">
                    {image && (
                      <img
                        src={image.url}
                        alt={image.altText ?? product.title}
                        loading={index < 8 ? "eager" : "lazy"}
                      />
                    )}
                  </div>
                  <div className="product-card-vendor">{product.vendor || "Nautic Talk"}</div>
                  <div className="product-card-title">{product.title}</div>
                  <div className="product-card-bottom">
                    <span className="product-card-price">
                      {formatPrice(price.amount, price.currencyCode, priceLoc)}
                    </span>
                    <span className="product-card-arrow">
                      {t("viewShort")} <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      {/* Mobile drawer */}
      <ProductFilters
        products={products}
        filters={filters}
        onChange={setFilters}
        isMobileOpen={mobileFiltersOpen}
        onMobileClose={() => setMobileFiltersOpen(false)}
        resultCount={filtered.length}
        totalCount={products.length}
      />
    </div>
  );
}
