import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getProducts, getCategory, type ShopifyProduct } from "@/lib/shopify";
import { CATEGORY_ORDER, categoryLabel, formatPrice } from "@/lib/catalog";
import { COMPANY } from "@/lib/site";
import { homeCopy } from "@/components/home/copy";
import RevealObserver from "@/components/home/RevealObserver";
import ProductCard, { sized } from "@/components/shop/ProductCard";
import shop from "@/components/shop/shop.module.css";
import s from "@/components/home/home.module.css";

// Accessories shown under the hero, in this order.
const ACCESSORIES = [
  "koptelefoonhalter-haak-met-n-oor",
  "veiligheidshelm-zelfklevende-houder-voor-nautic-talk",
  "oorkappenset-voor-buddy-chat-modules",
  "klemhouder-veiligheidshelm",
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = homeCopy(locale);

  let products: ShopifyProduct[] = [];
  try {
    products = await getProducts(40);
  } catch {
    // Without Shopify the photo sections and the help block still show.
  }

  const byHandle = (h: string) => products.find((p) => p.handle === h);
  const duo = byHandle("nautic-talk-duo");
  const trio = byHandle("nautic-talk-trio");
  const accessories = ACCESSORIES.map(byHandle).filter(Boolean) as ShopifyProduct[];
  const duoPrice = duo
    ? formatPrice(duo.priceRange.minVariantPrice.amount, duo.priceRange.minVariantPrice.currencyCode, locale)
    : "";

  const categories = CATEGORY_ORDER.map((cat) => {
    const inCat = products.filter((p) => getCategory(p) === cat);
    return { cat, count: inCat.length, image: inCat[0]?.images.edges[0]?.node };
  }).filter((x) => x.count > 0);

  const tel = COMPANY.phone.replace(/\s/g, "");

  return (
    <div className={s.page}>
      {/* HERO: the photo the shop is about, the two sets beside it */}
      <section className={s.hero} aria-labelledby="hero-title">
        <div className={s.heroPhoto}>
          <Image src={c.hero.photo} alt={c.hero.alt} fill sizes="(max-width: 980px) 100vw, 66vw" quality={74} priority />
          <div className={s.heroText}>
            <h1 className={s.heroWord} id="hero-title">{c.hero.word}</h1>
            <p className={s.heroLead}>{c.hero.text}</p>
            <div className={s.heroActions}>
              <Link href={c.hero.link.href} className={s.button}>{c.hero.link.label}</Link>
              {duoPrice && <span className={s.from}>{c.from} {duoPrice}</span>}
            </div>
          </div>
          <p className={s.credit}>{c.hero.credit}</p>
        </div>
        {(duo || trio) && (
          <div className={s.heroSets}>
            <h2 className={s.heroSetsTitle}>{c.setsTitle}</h2>
            {[duo, trio].filter(Boolean).map((p) => (
              <ProductCard key={p!.id} product={p!} locale={locale} large row eager />
            ))}
          </div>
        )}
      </section>

      {/* ACCESSORIES */}
      {accessories.length > 0 && (
        <section className={s.band} aria-labelledby="acc-title">
          <div className={s.bandHead}>
            <h2 className={s.h2} id="acc-title">{c.accessoriesTitle}</h2>
            <Link href="/productos" className={s.more}>{c.accessoriesLink}</Link>
          </div>
          <div className={s.grid4}>
            {accessories.map((p) => (
              <ProductCard key={p.id} product={p} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {/* CATEGORIES */}
      {categories.length > 0 && (
        <section className={s.band} aria-labelledby="cat-title">
          <div className={s.bandHead}>
            <h2 className={s.h2} id="cat-title">{c.categoriesTitle}</h2>
          </div>
          <div className={s.grid6}>
            {categories.map(({ cat, count, image }) => (
              <Link key={cat} href={`/productos?category=${cat}`} className={shop.cat}>
                <div className={shop.catMedia}>
                  {image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={sized(image.url, 400)} alt="" loading="lazy" />
                  )}
                </div>
                <p className={shop.catName}>{categoryLabel(cat, locale)}</p>
                <p className={shop.catCount}>{c.productCount(count)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* WHERE IT WORKS: full-screen photos, one word each */}
      {c.panels.map((panel, i) => (
        <section key={panel.word} className={s.panel} aria-labelledby={`panel-${i}`}>
          <div className={s.panelPhoto}>
            <Image src={panel.photo} alt={panel.alt} fill sizes="100vw" quality={72} />
          </div>
          <div className={s.panelWord}>
            <h2 className={s.word} id={`panel-${i}`} data-reveal>{panel.word}</h2>
          </div>
          <div className={s.note} data-reveal style={{ ["--d" as string]: "120ms" }}>
            <p className={s.noteText}>{panel.text}</p>
            <Link href={panel.link.href} className={s.noteLink}>{panel.link.label}</Link>
          </div>
          <p className={s.credit}>{panel.credit}</p>
        </section>
      ))}

      {/* HELP */}
      <section className={s.help} aria-labelledby="help-title">
        <div className={s.helpInner}>
          <div className={s.helpMain}>
            <h2 className={s.helpTitle} id="help-title">{c.help.title}</h2>
            <p className={s.helpText}>{c.help.text}</p>
            <div className={s.helpActions}>
              <a href={`tel:${tel}`} className={s.helpCall}>{c.help.call} {COMPANY.phone}</a>
              <a href={`mailto:${COMPANY.email}`} className={s.helpMail}>{c.help.mail}</a>
            </div>
          </div>
          <ul className={s.helpFacts}>
            {c.help.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
            <li className={s.helpAddress}>{c.help.address}</li>
          </ul>
        </div>
      </section>

      <RevealObserver />
    </div>
  );
}
