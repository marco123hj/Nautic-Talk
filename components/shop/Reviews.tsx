// Review section on the product page. With reviews: score, the reviews and a
// button to add one. Without: an invitation to write the first one. Nothing
// here is made up: stars only show once real, approved reviews exist.

import type { ProductReviews } from "@/lib/judgeme";
import { numericId } from "@/lib/judgeme";
import { REVIEW_COPY } from "./reviewCopy";
import Stars from "./Stars";
import WriteReview from "./WriteReview";
import r from "./reviews.module.css";

export default function Reviews({
  data,
  gid,
  productName,
  locale,
}: {
  data: ProductReviews;
  gid: string;
  productName: string;
  locale: string;
}) {
  const c = REVIEW_COPY[locale === "en" ? "en" : "nl"];
  const id = numericId(gid);
  if (!id) return null;
  const has = data.count > 0;
  const fmt = (n: number) => n.toLocaleString(locale === "en" ? "en-GB" : "nl-NL", { maximumFractionDigits: 1 });
  const date = (iso: string) => {
    const d = new Date(iso);
    return isNaN(+d)
      ? ""
      : d.toLocaleDateString(locale === "en" ? "en-GB" : "nl-NL", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <section className={r.section} id="reviews" aria-labelledby="reviews-title" data-buy-bar-end="">
      {has && (
        <>
          <div className={r.head}>
            <h2 className={r.title} id="reviews-title">{c.title}</h2>
            <p className={r.score}>
              <span className={r.avg}>{fmt(data.rating)}</span>
              <Stars rating={data.rating} size={22} label={c.outOf(fmt(data.rating))} />
              <span>{c.count(data.count)}</span>
            </p>
          </div>
          <ul className={r.list}>
            {data.reviews.map((rev) => (
              <li key={rev.id} className={r.item}>
                <Stars rating={rev.rating} label={c.outOf(String(rev.rating))} />
                {rev.title && <h3 className={r.itemTitle}>{rev.title}</h3>}
                <p className={r.itemBody}>{rev.body}</p>
                <p className={r.by}>
                  {rev.name}
                  {rev.createdAt && <> · {date(rev.createdAt)}</>}
                  {rev.verified && <> · {c.verified}</>}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
      <WriteReview productId={id} productName={productName} hasReviews={has} />
    </section>
  );
}
