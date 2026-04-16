import Link from "next/link";
import { getProducts, type ShopifyProduct } from "@/lib/shopify";

function formatPrice(amount: string, currency: string) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
  }).format(parseFloat(amount));
}

export default async function HomePage() {
  let products: ShopifyProduct[] = [];
  try {
    products = await getProducts(4);
  } catch {
    // Products will be empty, sections will handle gracefully
  }

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">Comunicaci&oacute;n Mar&iacute;tima Profesional</span>
          <h1>
            Equipos de comunicaci&oacute;n marina de <em>confianza</em>
          </h1>
          <p className="hero-description">
            Radios VHF, transpondedores AIS, antenas marinas e intercomunicadores
            &mdash; todo lo que necesitas para una navegaci&oacute;n segura y conectada.
          </p>
          <div className="hero-buttons">
            <Link href="/productos" className="btn-primary">
              Ver productos &rarr;
            </Link>
            <Link href="/productos" className="btn-secondary">
              Contactar
            </Link>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-value">50+</div>
              <div className="hero-stat-label">Productos</div>
            </div>
            <div>
              <div className="hero-stat-value">24h</div>
              <div className="hero-stat-label">Env&iacute;o</div>
            </div>
            <div>
              <div className="hero-stat-value">2 a&ntilde;os</div>
              <div className="hero-stat-label">Garant&iacute;a</div>
            </div>
          </div>
        </div>
        <div className="hero-images">
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&h=750&fit=crop" alt="Navegaci&oacute;n" />
            <div className="hero-image-label">Navegaci&oacute;n</div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=750&fit=crop" alt="Comunicaci&oacute;n" />
            <div className="hero-image-label">Comunicaci&oacute;n</div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="trust-bar">
        <div className="trust-bar-inner">
          <div className="trust-item">
            <div className="trust-icon">&#9881;</div>
            <div className="trust-title">Marcas L&iacute;deres</div>
            <div className="trust-desc">Equipos homologados y certificados</div>
          </div>
          <div className="trust-item">
            <div className="trust-icon">&#128666;</div>
            <div className="trust-title">Env&iacute;o R&aacute;pido</div>
            <div className="trust-desc">24-72h en toda Europa</div>
          </div>
          <div className="trust-item">
            <div className="trust-icon">&#128737;</div>
            <div className="trust-title">Garant&iacute;a 2 A&ntilde;os</div>
            <div className="trust-desc">En todos nuestros productos</div>
          </div>
          <div className="trust-item">
            <div className="trust-icon">&#128172;</div>
            <div className="trust-title">Asesoramiento Experto</div>
            <div className="trust-desc">Te ayudamos a elegir</div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section">
        <div className="section-label">Cat&aacute;logo</div>
        <div className="section-title">Productos destacados</div>
        <div className="section-subtitle">
          Equipos de comunicaci&oacute;n marina seleccionados para profesionales y aficionados.
        </div>

        {products.length > 0 ? (
          <>
            <div className="product-grid product-grid--4">
              {products.map((product, index) => {
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
                          loading={index < 4 ? "eager" : "lazy"}
                        />
                      )}
                    </div>
                    <div className="product-card-info">
                      <div className="product-card-vendor">{product.vendor || "NAUTIC TALK"}</div>
                      <div className="product-card-title">{product.title}</div>
                      <div className="product-card-bottom">
                        <span className="product-card-price">
                          {formatPrice(price.amount, price.currencyCode)}
                        </span>
                        <span className="product-card-buy">Comprar</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="view-all-btn">
              <Link href="/productos">
                Ver todo el cat&aacute;logo &rarr;
              </Link>
            </div>
          </>
        ) : (
          <p className="empty-message">
            Conecta tu tienda Shopify para ver los productos.
          </p>
        )}
      </section>

      {/* WHY NAUTIC TALK */}
      <section className="section section--alt">
        <div className="section-label">&iquest;Por qu&eacute; Nautic Talk?</div>
        <div className="section-title">Comunicaci&oacute;n marina de confianza</div>
        <div className="section-subtitle">
          Equipos que funcionan cuando m&aacute;s los necesitas.
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">&#128225;</div>
            <div className="feature-title">Equipos Homologados</div>
            <div className="feature-desc">
              Todos nuestros equipos cumplen con las normativas mar&iacute;timas
              internacionales y certificaciones requeridas.
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#127754;</div>
            <div className="feature-title">Resistentes al Mar</div>
            <div className="feature-desc">
              Equipos dise&ntilde;ados para condiciones marinas extremas.
              Resistentes al agua, sal y vibraciones.
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#128295;</div>
            <div className="feature-title">Instalaci&oacute;n F&aacute;cil</div>
            <div className="feature-desc">
              Gu&iacute;as de instalaci&oacute;n incluidas y soporte t&eacute;cnico
              para que configures tu equipo sin complicaciones.
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#127758;</div>
            <div className="feature-title">Env&iacute;o Internacional</div>
            <div className="feature-desc">
              Espa&ntilde;a, Pa&iacute;ses Bajos y toda Europa en 24-72h con
              seguimiento completo.
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <h2>
          Navega <em>conectado</em>, siempre
        </h2>
        <p>
          Novedades, ofertas y gu&iacute;as t&eacute;cnicas de comunicaci&oacute;n marina.
        </p>
        <div className="newsletter-form">
          <input
            type="email"
            className="newsletter-input"
            placeholder="tu@email.com"
          />
          <button className="newsletter-btn">Suscribirme</button>
        </div>
      </section>
    </>
  );
}
