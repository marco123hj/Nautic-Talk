import Link from "next/link";
import { getProducts, type ShopifyProduct } from "@/lib/shopify";

function formatPrice(amount: string, currency: string) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
  }).format(parseFloat(amount));
}

/* ============ INLINE SVG ICONS ============ */

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
      <circle cx="11" cy="33" r="1" fill="currentColor" stroke="none" />
      <circle cx="37" cy="33" r="1" fill="currentColor" stroke="none" />
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

function IconShield() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M16 4l11 4v8c0 7-5 12-11 14-6-2-11-7-11-14V8l11-4z" />
      <path d="M11 16l3.5 3.5L21 13" />
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

function IconStack() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M16 4l12 6-12 6L4 10l12-6z" />
      <path d="M4 16l12 6 12-6" />
      <path d="M4 22l12 6 12-6" />
    </svg>
  );
}

export default async function HomePage() {
  let products: ShopifyProduct[] = [];
  try {
    products = await getProducts(20);
  } catch {
    // Fallback handled in section
  }

  const trio =
    products.find((p) => p.handle === "nautic-talk-trio") ?? products[0];
  const duo = products.find((p) => p.handle === "nautic-talk-duo");

  // Featured: lead with the two flagship intercoms, then top accessories
  const featured = [
    trio,
    duo,
    ...products.filter(
      (p) => p && p.handle !== "nautic-talk-trio" && p.handle !== "nautic-talk-duo",
    ),
  ]
    .filter(Boolean)
    .slice(0, 4) as ShopifyProduct[];

  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-meta">
            <span className="hero-meta-vol">Sistemas Bluetooth</span>
            <span className="hero-meta-bar" />
            <span>N&aacute;utica &middot; Ciclismo &middot; Industria</span>
          </div>

          <h1>
            Comunicaci&oacute;n adaptada <em>a tu mundo</em>
          </h1>

          <p className="hero-description">
            Intercomunicadores Bluetooth profesionales para 2 o 3 personas.
            Audio cristalino, full-duplex y resistencia total al agua, sal y
            polvo. Sin configuraci&oacute;n: encender y hablar.
          </p>

          <div className="hero-actions">
            <Link href="/productos" className="btn-primary">
              <span>Ver productos</span>
              <ArrowRight />
            </Link>
            <Link href="/productos" className="btn-link">
              <span>Hablar con un asesor</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">
                1<em>km</em>
              </div>
              <div className="hero-stat-label">Alcance en campo abierto</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">15h</div>
              <div className="hero-stat-label">Bater&iacute;a en conversaci&oacute;n</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">IPX</div>
              <div className="hero-stat-label">Resistente al agua y polvo</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1500627964684-141351970a7f?w=900&h=1100&fit=crop"
            alt="Tripulaci&oacute;n a bordo de un velero"
          />
          <div className="hero-visual-caption">
            <div className="hero-visual-caption-title">A bordo, en ruta, en obra</div>
            <div>Un sistema, tres mundos</div>
          </div>
        </div>
      </section>

      {/* ==================== STRIP: SECTORS / PRODUCTS ==================== */}
      <div className="coords-strip">
        <div className="coords-strip-inner">
          <span>Trio</span>
          <span>Duo</span>
          <span>Soportes</span>
          <span>Cascos</span>
          <span>Auriculares</span>
          <span>Accesorios</span>
        </div>
      </div>

      {/* ==================== BRAND MANIFESTO ==================== */}
      <section className="editorial">
        <div className="editorial-inner">
          <div className="editorial-mark">
            <IconHeadset />
          </div>
          <p className="editorial-quote">
            <em>&laquo;Encender y hablar&raquo;.</em> Sin emparejamientos,
            sin pulsadores, sin ruido. Comunicaci&oacute;n full-duplex que aguanta
            agua, sal y vibraci&oacute;n &mdash; donde tu trabajo lo necesite.
          </p>
          <div className="editorial-author">Nautic Talk &middot; Filosof&iacute;a de producto</div>
        </div>
      </section>

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section className="section">
        <div className="section-head">
          <div className="section-head-left">
            <div className="section-eyebrow">Cat&aacute;logo Nautic Talk</div>
            <h2 className="section-title">
              Sistemas e <em>intercomunicadores</em> Bluetooth
            </h2>
          </div>
          <div className="section-head-right">
            Trio para 3 personas, Duo para 2. Mismos est&aacute;ndares de audio,
            resistencia y autonom&iacute;a. M&aacute;s soportes, cascos y
            accesorios para cada montaje.
          </div>
        </div>

        {featured.length > 0 ? (
          <>
            <div className="product-grid">
              {featured.map((product, index) => {
                const image = product.images.edges[0]?.node;
                const price = product.priceRange.minVariantPrice;
                const num = String(index + 1).padStart(2, "0");

                return (
                  <Link
                    key={product.id}
                    href={`/productos/${product.handle}`}
                    className="product-card"
                  >
                    <div className="product-card-num">№ {num}</div>
                    <div className="product-card-image">
                      {image && (
                        <img
                          src={image.url}
                          alt={image.altText ?? product.title}
                          loading={index < 4 ? "eager" : "lazy"}
                        />
                      )}
                    </div>
                    <div className="product-card-vendor">{product.vendor || "Nautic Talk"}</div>
                    <div className="product-card-title">{product.title}</div>
                    <div className="product-card-bottom">
                      <span className="product-card-price">
                        {formatPrice(price.amount, price.currencyCode)}
                      </span>
                      <span className="product-card-arrow">
                        Ver <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/productos" className="btn-primary">
                <span>Ver todo el cat&aacute;logo</span>
                <ArrowRight />
              </Link>
            </div>
          </>
        ) : (
          <p className="empty-message">
            Conecta tu tienda Shopify para ver los productos destacados.
          </p>
        )}
      </section>

      {/* ==================== THREE WORLDS (sectors) ==================== */}
      <section className="section section--full">
        <div className="section" style={{ padding: "0 0 3.5rem" }}>
          <div className="section-head">
            <div className="section-head-left">
              <div className="section-eyebrow">Un sistema, tres mundos</div>
              <h2 className="section-title">
                Mismo equipo, <em>cada entorno</em>
              </h2>
            </div>
            <div className="section-head-right">
              Los m&oacute;dulos Trio y Duo se montan sobre cascos n&aacute;uticos,
              de ciclismo o de seguridad laboral. Cambia el soporte, no el sistema.
            </div>
          </div>
        </div>

        <div className="categories-grid">
          <Link href="/productos" className="category-card">
            <div className="category-card-num">01</div>
            <div className="category-card-icon"><IconAnchor /></div>
            <div className="category-card-title">N&aacute;utica</div>
            <div className="category-card-desc">
              Tripulaciones de vela, yates y embarcaciones de trabajo.
              Resiste agua salada, salitre y condiciones extremas.
            </div>
            <span className="category-card-link">
              Ver soluci&oacute;n <ArrowRight size={12} />
            </span>
          </Link>

          <Link href="/productos" className="category-card">
            <div className="category-card-num">02</div>
            <div className="category-card-icon"><IconBike /></div>
            <div className="category-card-title">Ciclismo</div>
            <div className="category-card-desc">
              Grupos en ruta, entrenamientos y carreras. Compatible con
              cascos est&aacute;ndar y ultraligero, audio claro a cualquier
              velocidad.
            </div>
            <span className="category-card-link">
              Ver soluci&oacute;n <ArrowRight size={12} />
            </span>
          </Link>

          <Link href="/productos" className="category-card">
            <div className="category-card-num">03</div>
            <div className="category-card-icon"><IconHardhat /></div>
            <div className="category-card-title">Industria y obra</div>
            <div className="category-card-desc">
              Obra, almacenes, log&iacute;stica y eventos. Integraci&oacute;n
              directa con cascos de seguridad y comunicaci&oacute;n manos
              libres en grupo.
            </div>
            <span className="category-card-link">
              Ver soluci&oacute;n <ArrowRight size={12} />
            </span>
          </Link>
        </div>
      </section>

      {/* ==================== SPEC FEATURE: TRIO ==================== */}
      {trio && (
        <div className="spec">
          <div className="spec-visual">
            <div className="spec-visual-tag">Buque insignia</div>
            {trio.images.edges[0]?.node && (
              <img
                src={trio.images.edges[0].node.url}
                alt={trio.images.edges[0].node.altText ?? trio.title}
                style={{ objectFit: "contain", padding: "3rem", mixBlendMode: "multiply" }}
              />
            )}
          </div>
          <div className="spec-content">
            <div className="section-eyebrow">Ficha t&eacute;cnica &middot; Producto destacado</div>
            <h3 className="spec-title">
              {trio.title}
            </h3>
            <p className="spec-description">
              Hasta 3 personas comunicadas en simult&aacute;neo con audio
              full-duplex. Sin pulsar bot&oacute;n: el sistema regula vol&uacute;men,
              cancela ruido y mantiene la conversaci&oacute;n abierta como si
              estuvi&eacute;rais en la misma cabina.
            </p>

            <div className="spec-list">
              <div className="spec-row">
                <div className="spec-row-label">Personas</div>
                <div className="spec-row-value">Hasta <em>3</em> simult&aacute;neas</div>
              </div>
              <div className="spec-row">
                <div className="spec-row-label">Alcance</div>
                <div className="spec-row-value">500&ndash;1000 <em>m</em> en campo abierto</div>
              </div>
              <div className="spec-row">
                <div className="spec-row-label">Audio</div>
                <div className="spec-row-value">Full-duplex con DSP de cancelaci&oacute;n</div>
              </div>
              <div className="spec-row">
                <div className="spec-row-label">Bater&iacute;a</div>
                <div className="spec-row-value">15h conversaci&oacute;n &middot; 1000h standby</div>
              </div>
              <div className="spec-row">
                <div className="spec-row-label">Resistencia</div>
                <div className="spec-row-value">Agua, salitre, polvo y vibraci&oacute;n</div>
              </div>
              <div className="spec-row">
                <div className="spec-row-label">Precio</div>
                <div className="spec-row-value">
                  {formatPrice(
                    trio.priceRange.minVariantPrice.amount,
                    trio.priceRange.minVariantPrice.currencyCode,
                  )}
                </div>
              </div>
            </div>

            <Link href={`/productos/${trio.handle}`} className="btn-primary">
              <span>Ver ficha completa</span>
              <ArrowRight />
            </Link>
          </div>
        </div>
      )}

      {/* ==================== PRINCIPLES ==================== */}
      <section className="principles">
        <div className="principles-inner">
          <div className="principle">
            <div className="principle-num">№ 01</div>
            <div className="principle-icon"><IconShield /></div>
            <div className="principle-title">Resistencia total</div>
            <div className="principle-desc">
              Resisten agua, salitre, lluvia, polvo y sudor. Pensados para
              cualquier entorno exterior &mdash; sin envoltorios extra.
            </div>
          </div>
          <div className="principle">
            <div className="principle-num">№ 02</div>
            <div className="principle-icon"><IconWaveform /></div>
            <div className="principle-title">Audio cristalino</div>
            <div className="principle-desc">
              Micr&oacute;fono con espuma protectora y DSP de cancelaci&oacute;n
              de ruido. Comunicaci&oacute;n n&iacute;tida con viento o velocidad.
            </div>
          </div>
          <div className="principle">
            <div className="principle-num">№ 03</div>
            <div className="principle-icon"><IconBolt /></div>
            <div className="principle-title">Plug-and-play</div>
            <div className="principle-desc">
              Sin emparejamientos ni configuraci&oacute;n. Encender y hablar.
              As&iacute; de simple para cualquier usuario.
            </div>
          </div>
          <div className="principle">
            <div className="principle-num">№ 04</div>
            <div className="principle-icon"><IconStack /></div>
            <div className="principle-title">Sistema modular</div>
            <div className="principle-desc">
              M&oacute;dulos y accesorios intercambiables. Soportes, cascos y
              auriculares se a&ntilde;aden seg&uacute;n necesites.
            </div>
          </div>
        </div>
      </section>

      {/* ==================== NEWSLETTER ==================== */}
      <section className="newsletter">
        <div className="newsletter-inner">
          <div className="newsletter-eyebrow">Mantente al d&iacute;a</div>
          <h2>
            Novedades, gu&iacute;as y <em>ofertas</em>
          </h2>
          <p className="newsletter-desc">
            Una carta puntual con nuevos productos, gu&iacute;as de instalaci&oacute;n
            y mejoras del sistema. Sin spam.
          </p>
          <div className="newsletter-form">
            <input
              type="email"
              className="newsletter-input"
              placeholder="tu@email.com"
              aria-label="Correo electr&oacute;nico"
            />
            <button type="button" className="newsletter-btn">
              Suscribir <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
