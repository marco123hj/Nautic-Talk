import { Link } from "@/i18n/navigation";
import type { ShopifyProduct } from "@/lib/shopify";
import { displayName, formatPrice, shopCopy, specLine } from "@/lib/catalog";
import QuickAdd from "./QuickAdd";
import s from "./shop.module.css";

// Shopify's CDN resizes on the fly; cards never need the full original.
export function sized(url: string, width: number) {
  return `${url}${url.includes("?") ? "&" : "?"}width=${width}`;
}

interface Props {
  product: ShopifyProduct;
  locale: string;
  large?: boolean;
  row?: boolean;
  eager?: boolean;
  headingLevel?: "h2" | "h3";
}

export default function ProductCard({ product, locale, large = false, row = false, eager = false, headingLevel = "h3" }: Props) {
  const c = shopCopy(locale);
  const name = displayName(product, locale);
  const image = product.images.edges[0]?.node;
  const price = product.priceRange.minVariantPrice;
  const variants = product.variants?.edges.map((e) => e.node) ?? [];
  const available = product.availableForSale ?? variants.some((v) => v.availableForSale);
  const href = `/productos/${product.handle}`;
  const Name = headingLevel;

  return (
    <article className={`${s.card} ${large ? s.cardLarge : ""} ${row ? s.cardRow : ""}`}>
      <Link href={href} className={s.media} tabIndex={-1} aria-hidden="true">
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={sized(image.url, large ? 720 : 560)}
            alt=""
            width={image.width}
            height={image.height}
            loading={eager ? "eager" : "lazy"}
          />
        )}
      </Link>
      <div className={s.body}>
        <Name style={{ margin: 0, font: "inherit" }}>
          <Link href={href} className={s.name}>
            {name}
          </Link>
        </Name>
        <p className={s.spec}>{specLine(product, locale)}</p>
        <div className={s.buy}>
          <div>
            <p className={s.price}>{formatPrice(price.amount, price.currencyCode, locale)}</p>
            <p className={s.vat}>{c.vat}</p>
          </div>
          {variants.length === 1 ? (
            <QuickAdd
              handle={product.handle}
              title={name}
              image={image?.url}
              variant={variants[0]}
              label={c.add}
              doneLabel={c.added}
            />
          ) : (
            <Link href={href} className={`${s.add} ${s.addLink}`} aria-label={`${c.view}: ${name}`}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 10h11M11 5.5L15.5 10 11 14.5" />
              </svg>
            </Link>
          )}
        </div>
        <p className={`${s.stock} ${available ? "" : s.stockOut}`}>{available ? c.available : c.soldOut}</p>
      </div>
    </article>
  );
}
