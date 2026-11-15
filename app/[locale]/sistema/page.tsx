import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getProducts, type ShopifyProduct } from "@/lib/shopify";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sistema" });
  return {
    title: `${t("title1")} ${t("titleEm")}`,
    description: t("subtitle"),
  };
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

function formatPrice(amount: string, currency: string, locale: string = "es-ES") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(parseFloat(amount));
}

/* ============ ICONS ============ */

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" />
    </svg>
  );
}

function IconHeadset() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M10 28v-4c0-7.7 6.3-14 14-14s14 6.3 14 14v4" />
      <rect x="6" y="28" width="8" height="12" rx="2" />
      <rect x="34" y="28" width="8" height="12" rx="2" />
      <path d="M38 40v2c0 2-1.5 4-4 4h-4" />
    </svg>
  );
}

function IconMic() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <rect x="12" y="4" width="8" height="16" rx="4" />
      <path d="M7 16c0 5 4 9 9 9s9-4 9-9" />
      <path d="M16 25v4M12 29h8" />
    </svg>
  );
}

function IconWaveform() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M3 16h3M9 12v8M13 8v16M17 12v8M21 6v20M25 12v8M29 16h-2" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M18 4L6 18h8l-2 10 12-14h-8l2-10z" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M16 4l11 4v8c0 7-5 12-11 14-6-2-11-7-11-14V8l11-4z" />
      <path d="M11 16l3.5 3.5L21 13" />
    </svg>
  );
}

function IconAnchor() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <circle cx="24" cy="9" r="3.5" />
      <path d="M24 12.5V38" />
      <path d="M16 18h16" />
      <path d="M8 28c0 8.5 7 14 16 14s16-5.5 16-14" />
      <path d="M8 28l-3 2.5M40 28l3 2.5" />
    </svg>
  );
}

function IconBike() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <circle cx="11" cy="33" r="7" />
      <circle cx="37" cy="33" r="7" />
      <path d="M11 33l8-15h11l7 15" />
      <path d="M19 18h-4" />
      <path d="M30 18l-3-6h-4" />
    </svg>
  );
}

function IconHardhat() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M8 32c0-9 7-16 16-16s16 7 16 16" />
      <path d="M5 36h38" />
      <path d="M5 36v3h38v-3" />
      <path d="M19 16v-4h10v4" />
      <path d="M14 28l2-6M34 28l-2-6" />
    </svg>
  );
}

export default async function SistemaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "sistema" });
  const priceLoc = priceLocale(locale);

  let products: ShopifyProduct[] = [];
  try {
    products = await getProducts(20);
  } catch {
    /* empty state below */
  }

  const trio = products.find((p) => p.handle === "nautic-talk-trio");
  const duo = products.find((p) => p.handle === "nautic-talk-duo");

  return (
    <>
      <div className="page-header">
        <div className="page-header-breadcrumb">
          <Link href="/">{t("breadcrumbHome")}</Link>
          <span>/</span>
          {t("breadcrumb")}
        </div>
        <div className="page-header-title">
          <h1>
            {t("title1")} <em>{t("titleEm")}</em>
          </h1>
          <p>{t("subtitle")}</p>
        </div>
      </div>

      {/* TWO SYSTEMS */}
      <section className="section">
        <div className="section-head">
          <div className="section-head-left">
            <div className="section-eyebrow">{t("modelsEyebrow")}</div>
            <h2 className="section-title">
              {t("modelsTitle1")} <em>{t("modelsTitleEm")}</em>
            </h2>
          </div>
          <div className="section-head-right">{t("modelsDesc")}</div>
        </div>

        <div className="system-compare">
          {[trio, duo].filter(Boolean).map((product) => {
            if (!product) return null;
            const image = product.images.edges[0]?.node;
            const isTrio = product.handle === "nautic-talk-trio";
            return (
              <div key={product.id} className="system-card">
                <div className="system-card-image">
                  {image && <img src={image.url} alt={image.altText ?? product.title} />}
                  <div className="system-card-tag">{isTrio ? t("tagTrio") : t("tagDuo")}</div>
                </div>
                <div className="system-card-body">
                  <div className="product-card-vendor">Nautic Talk</div>
                  <h3 className="system-card-title">{product.title}</h3>
                  <ul className="system-card-specs">
                    <li><span>{t("specPeople")}</span><strong>{isTrio ? t("trioPeople") : t("duoPeople")}</strong></li>
                    <li><span>{t("specRange")}</span><strong>{t("rangeValue")}</strong></li>
                    <li><span>{t("specBattery")}</span><strong>{t("batteryValue")}</strong></li>
                    <li><span>{t("specIdeal")}</span><strong>{isTrio ? t("trioIdeal") : t("duoIdeal")}</strong></li>
                  </ul>
                  <div className="system-card-bottom">
                    <span className="product-card-price">
                      {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode, priceLoc)}
                    </span>
                    <Link href={`/productos/${product.handle}`} className="btn-link">
                      {t("viewSpec")} <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
          {!trio && !duo && (
            <p className="empty-message" style={{ gridColumn: "1 / -1" }}>
              {t("emptyModels")}
            </p>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section section--full">
        <div className="section" style={{ padding: "0 0 3rem" }}>
          <div className="section-head">
            <div className="section-head-left">
              <div className="section-eyebrow">{t("stepsEyebrow")}</div>
              <h2 className="section-title">
                {t("stepsTitle1")} <em>{t("stepsTitleEm")}</em>
              </h2>
            </div>
            <div className="section-head-right">{t("stepsDesc")}</div>
          </div>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-num">01</div>
            <h3 className="step-title">{t("step1Title")}</h3>
            <p className="step-desc">{t("step1Desc")}</p>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <h3 className="step-title">{t("step2Title")}</h3>
            <p className="step-desc">{t("step2Desc")}</p>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <h3 className="step-title">{t("step3Title")}</h3>
            <p className="step-desc">{t("step3Desc")}</p>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="section" id="tecnologia">
        <div className="section-head">
          <div className="section-head-left">
            <div className="section-eyebrow">{t("techEyebrow")}</div>
            <h2 className="section-title">
              {t("techTitle1")} <em>{t("techTitleEm")}</em>
            </h2>
          </div>
          <div className="section-head-right">{t("techDesc")}</div>
        </div>

        <div className="tech-grid">
          <div className="tech-block">
            <div className="tech-block-icon"><IconMic /></div>
            <h3 className="tech-block-title">{t("techAudioTitle")}</h3>
            <ul className="tech-block-list">
              <li><strong>{t("techAudioL1Em")}</strong> {t("techAudioL1")}</li>
              <li><strong>{t("techAudioL2Em")}</strong> {t("techAudioL2")}</li>
              <li><strong>{t("techAudioL3Em")}</strong> {t("techAudioL3")}</li>
              <li>{t("techAudioL4")}</li>
            </ul>
          </div>

          <div className="tech-block">
            <div className="tech-block-icon"><IconWaveform /></div>
            <h3 className="tech-block-title">{t("techConnTitle")}</h3>
            <ul className="tech-block-list">
              <li>{t("techConnL1a")} <strong>{t("techConnL1b")}</strong> {t("techConnL1c")}</li>
              <li>{t("techConnL2a")} <strong>{t("techConnL2b")}</strong> {t("techConnL2c")}</li>
              <li>{t("techConnL3")}</li>
              <li>{t("techConnL4")}</li>
            </ul>
          </div>

          <div className="tech-block">
            <div className="tech-block-icon"><IconBolt /></div>
            <h3 className="tech-block-title">{t("techBatTitle")}</h3>
            <ul className="tech-block-list">
              <li><strong>{t("techBatL1a")}</strong> {t("techBatL1b")}</li>
              <li><strong>{t("techBatL2a")}</strong> {t("techBatL2b")}</li>
              <li>{t("techBatL3a")} <strong>{t("techBatL3b")}</strong></li>
              <li>{t("techBatL4")}</li>
            </ul>
          </div>

          <div className="tech-block">
            <div className="tech-block-icon"><IconShield /></div>
            <h3 className="tech-block-title">{t("techBuildTitle")}</h3>
            <ul className="tech-block-list">
              <li>{t("techBuildL1a")} <strong>{t("techBuildL1b")}</strong> {t("techBuildL1c")}</li>
              <li>{t("techBuildL2a")} <strong>{t("techBuildL2b")}</strong> {t("techBuildL2c")}</li>
              <li>{t("techBuildL3")}</li>
              <li>{t("techBuildL4")}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* THREE WORLDS */}
      <section className="section section--full" id="sectores">
        <div className="section" style={{ padding: "0 0 3.5rem" }}>
          <div className="section-head">
            <div className="section-head-left">
              <div className="section-eyebrow">{t("sectorsEyebrow")}</div>
              <h2 className="section-title">
                {t("sectorsTitle1")} <em>{t("sectorsTitleEm")}</em>
              </h2>
            </div>
            <div className="section-head-right">{t("sectorsDesc")}</div>
          </div>
        </div>

        <div className="categories-grid">
          <div className="category-card">
            <div className="category-card-num">01</div>
            <div className="category-card-icon"><IconAnchor /></div>
            <div className="category-card-title">{t("marineTitle")}</div>
            <div className="category-card-desc">{t("marineDesc")}</div>
            <div className="category-card-meta">{t("marineMount")}</div>
          </div>

          <div className="category-card">
            <div className="category-card-num">02</div>
            <div className="category-card-icon"><IconBike /></div>
            <div className="category-card-title">{t("cyclingTitle")}</div>
            <div className="category-card-desc">{t("cyclingDesc")}</div>
            <div className="category-card-meta">{t("cyclingMount")}</div>
          </div>

          <div className="category-card">
            <div className="category-card-num">03</div>
            <div className="category-card-icon"><IconHardhat /></div>
            <div className="category-card-title">{t("industrialTitle")}</div>
            <div className="category-card-desc">{t("industrialDesc")}</div>
            <div className="category-card-meta">{t("industrialMount")}</div>
          </div>
        </div>
      </section>

      {/* MODULAR */}
      <section className="section">
        <div className="section-head">
          <div className="section-head-left">
            <div className="section-eyebrow">{t("modularEyebrow")}</div>
            <h2 className="section-title">
              {t("modularTitle1")} <em>{t("modularTitleEm")}</em>
            </h2>
          </div>
          <div className="section-head-right">{t("modularDesc")}</div>
        </div>

        <div className="modular-grid">
          <div className="modular-item">
            <div className="modular-item-num">A</div>
            <h4>{t("modularATitle")}</h4>
            <p>{t("modularADesc")}</p>
          </div>
          <div className="modular-item">
            <div className="modular-item-num">B</div>
            <h4>{t("modularBTitle")}</h4>
            <p>{t("modularBDesc")}</p>
          </div>
          <div className="modular-item">
            <div className="modular-item-num">C</div>
            <h4>{t("modularCTitle")}</h4>
            <p>{t("modularCDesc")}</p>
          </div>
          <div className="modular-item">
            <div className="modular-item-num">D</div>
            <h4>{t("modularDTitle")}</h4>
            <p>{t("modularDDesc")}</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-strip">
        <div className="cta-strip-inner">
          <h2 className="cta-strip-title">
            {t("ctaTitle1")} <em>{t("ctaTitleEm")}</em>
          </h2>
          <p className="cta-strip-desc">{t("ctaDesc")}</p>
          <div className="cta-strip-actions">
            <Link href="/productos" className="btn-primary">
              <span>{t("ctaPrimary")}</span>
              <ArrowRight />
            </Link>
            <Link href="/contacto" className="btn-link" style={{ borderColor: "var(--cream)", color: "var(--cream)" }}>
              <span>{t("ctaSecondary")}</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
