import Link from "next/link";
import { getProducts, type ShopifyProduct } from "@/lib/shopify";

export const metadata = {
  title: "El sistema | Nautic Talk",
  description:
    "Qu\u00e9 es Nautic Talk: una plataforma de intercomunicaci\u00f3n Bluetooth profesional con dos modelos (Trio y Duo) para n\u00e1utica, ciclismo e industria.",
};

function formatPrice(amount: string, currency: string) {
  return new Intl.NumberFormat("es-ES", {
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

export default async function SistemaPage() {
  let products: ShopifyProduct[] = [];
  try {
    products = await getProducts(20);
  } catch {
    // Empty state handled below
  }

  const trio = products.find((p) => p.handle === "nautic-talk-trio");
  const duo = products.find((p) => p.handle === "nautic-talk-duo");

  return (
    <>
      {/* PAGE HEADER */}
      <div className="page-header">
        <div className="page-header-breadcrumb">
          <Link href="/">Inicio</Link>
          <span>&loz;</span>
          El sistema
        </div>
        <div className="page-header-title">
          <h1>
            El sistema <em>Nautic Talk</em>
          </h1>
          <p>Intercomunicaci&oacute;n Bluetooth profesional</p>
        </div>
      </div>

      {/* BRAND STATEMENT */}
      <section className="editorial">
        <div className="editorial-inner">
          <div className="editorial-mark">
            <IconHeadset />
          </div>
          <p className="editorial-quote">
            Una plataforma. <em>Dos modelos.</em> Tres mundos. Nautic Talk
            es el sistema de comunicaci&oacute;n que funciona donde otros
            se complican &mdash; encender, hablar, seguir trabajando.
          </p>
          <div className="editorial-author">C&oacute;mo entendemos la comunicaci&oacute;n profesional</div>
        </div>
      </section>

      {/* THE TWO SYSTEMS */}
      <section className="section">
        <div className="section-head">
          <div className="section-head-left">
            <div className="section-eyebrow">El sistema</div>
            <h2 className="section-title">
              Dos modelos, <em>una plataforma</em>
            </h2>
          </div>
          <div className="section-head-right">
            Trio para grupos de hasta 3 personas. Duo para parejas de trabajo.
            Mismo audio, misma resistencia, misma autonom&iacute;a &mdash;
            elige seg&uacute;n el tama&ntilde;o de tu equipo.
          </div>
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
                  <div className="system-card-tag">{isTrio ? "Hasta 3 personas" : "2 personas"}</div>
                </div>
                <div className="system-card-body">
                  <div className="product-card-vendor">Nautic Talk</div>
                  <h3 className="system-card-title">{product.title}</h3>
                  <ul className="system-card-specs">
                    <li><span>Personas</span><strong>{isTrio ? "3 simult\u00e1neas" : "2 simult\u00e1neas"}</strong></li>
                    <li><span>Alcance</span><strong>{isTrio ? "500\u20131000 m" : "Hasta 1000 m"}</strong></li>
                    <li><span>Bater&iacute;a</span><strong>{isTrio ? "15 h conversaci\u00f3n" : "10 h conversaci\u00f3n"}</strong></li>
                    <li><span>Audio</span><strong>Full-duplex DSP</strong></li>
                  </ul>
                  <div className="system-card-bottom">
                    <span className="product-card-price">
                      {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
                    </span>
                    <Link href={`/productos/${product.handle}`} className="btn-link">
                      Ver ficha <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
          {!trio && !duo && (
            <p className="empty-message" style={{ gridColumn: "1 / -1" }}>
              Conecta tu tienda Shopify para ver los modelos Trio y Duo.
            </p>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section section--full">
        <div className="section" style={{ padding: "0 0 3rem" }}>
          <div className="section-head">
            <div className="section-head-left">
              <div className="section-eyebrow">C&oacute;mo funciona</div>
              <h2 className="section-title">
                Tres pasos, <em>ning&uacute;n manual</em>
              </h2>
            </div>
            <div className="section-head-right">
              Sin emparejamientos por cable, sin c&oacute;digos PIN, sin apps.
              El sistema viene preconfigurado de f&aacute;brica para tu equipo.
            </div>
          </div>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-num">01</div>
            <h3 className="step-title">Encender</h3>
            <p className="step-desc">
              Pulsa el bot&oacute;n de encendido en cada m&oacute;dulo. Los
              dispositivos se reconocen autom&aacute;ticamente entre s&iacute;
              al estar preprogramados de f&aacute;brica.
            </p>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <h3 className="step-title">Conectarse</h3>
            <p className="step-desc">
              La conexi&oacute;n Bluetooth se establece sola. Sin
              emparejamientos manuales, sin tocar el m&oacute;vil, sin
              configurar nada en pantalla.
            </p>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <h3 className="step-title">Hablar</h3>
            <p className="step-desc">
              Audio full-duplex: todos hablan y escuchan a la vez, como en una
              conversaci&oacute;n real. Sin pulsadores, sin turnos, sin
              interrupciones.
            </p>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="section" id="tecnologia">
        <div className="section-head">
          <div className="section-head-left">
            <div className="section-eyebrow">Tecnolog&iacute;a</div>
            <h2 className="section-title">
              Lo que hace que <em>funcione</em>
            </h2>
          </div>
          <div className="section-head-right">
            Especificaciones t&eacute;cnicas comunes a todos los m&oacute;dulos
            Nautic Talk. Trio y Duo comparten la misma plataforma de hardware.
          </div>
        </div>

        <div className="tech-grid">
          <div className="tech-block">
            <div className="tech-block-icon"><IconMic /></div>
            <h3 className="tech-block-title">Audio</h3>
            <ul className="tech-block-list">
              <li><strong>Full-duplex</strong> &mdash; todos hablan y escuchan a la vez</li>
              <li><strong>DSP</strong> de cancelaci&oacute;n de ruido y viento</li>
              <li><strong>Autoajuste</strong> de vol&uacute;men seg&uacute;n entorno</li>
              <li>Micr&oacute;fono con espuma protectora antiviento</li>
            </ul>
          </div>

          <div className="tech-block">
            <div className="tech-block-icon"><IconWaveform /></div>
            <h3 className="tech-block-title">Conectividad</h3>
            <ul className="tech-block-list">
              <li>Bluetooth <strong>3.0</strong> con conexi&oacute;n autom&aacute;tica</li>
              <li>Alcance <strong>500&ndash;1000 m</strong> en campo abierto</li>
              <li>Compatible con todos los smartphones Bluetooth</li>
              <li>Llamadas manos libres integradas</li>
            </ul>
          </div>

          <div className="tech-block">
            <div className="tech-block-icon"><IconBolt /></div>
            <h3 className="tech-block-title">Autonom&iacute;a</h3>
            <ul className="tech-block-list">
              <li><strong>15 h</strong> de conversaci&oacute;n continua (Trio)</li>
              <li><strong>1000 h</strong> en modo standby</li>
              <li>Carga completa en <strong>2 h</strong></li>
              <li>Cargador de red y cable incluidos</li>
            </ul>
          </div>

          <div className="tech-block">
            <div className="tech-block-icon"><IconShield /></div>
            <h3 className="tech-block-title">Construcci&oacute;n</h3>
            <ul className="tech-block-list">
              <li>Resistente a <strong>agua, sal, polvo</strong> y vibraci&oacute;n</li>
              <li>Solo <strong>71 g</strong> por m&oacute;dulo</li>
              <li>Adaptable a oreja izquierda o derecha</li>
              <li>Compatible con cualquier casco</li>
            </ul>
          </div>
        </div>
      </section>

      {/* THREE WORLDS */}
      <section className="section section--full" id="sectores">
        <div className="section" style={{ padding: "0 0 3.5rem" }}>
          <div className="section-head">
            <div className="section-head-left">
              <div className="section-eyebrow">Un sistema, tres mundos</div>
              <h2 className="section-title">
                D&oacute;nde <em>funciona</em>
              </h2>
            </div>
            <div className="section-head-right">
              El mismo m&oacute;dulo se monta sobre cascos n&aacute;uticos,
              de ciclismo o de seguridad laboral. Cambia el soporte, no el
              sistema.
            </div>
          </div>
        </div>

        <div className="categories-grid">
          <div className="category-card">
            <div className="category-card-num">01</div>
            <div className="category-card-icon"><IconAnchor /></div>
            <div className="category-card-title">N&aacute;utica</div>
            <div className="category-card-desc">
              Tripulaciones de vela, yates y embarcaciones de trabajo.
              Coordinaci&oacute;n entre puente, proa y popa durante maniobras
              de fondeo, atraque y navegaci&oacute;n. Resiste agua salada,
              salitre y condiciones extremas.
            </div>
            <div className="category-card-meta">Soporte recomendado: clip + adhesivo marino</div>
          </div>

          <div className="category-card">
            <div className="category-card-num">02</div>
            <div className="category-card-icon"><IconBike /></div>
            <div className="category-card-title">Ciclismo</div>
            <div className="category-card-desc">
              Grupos en ruta, entrenamientos, MTB y pelotones de carrera.
              Compatible con cascos est&aacute;ndar de ciclismo. Audio claro
              a cualquier velocidad gracias al filtro antiviento.
            </div>
            <div className="category-card-meta">Soporte recomendado: clip universal para casco</div>
          </div>

          <div className="category-card">
            <div className="category-card-num">03</div>
            <div className="category-card-icon"><IconHardhat /></div>
            <div className="category-card-title">Industria y obra</div>
            <div className="category-card-desc">
              Obra, almacenes, log&iacute;stica, gr&uacute;as y eventos.
              Integraci&oacute;n directa con cascos de seguridad EPI.
              Comunicaci&oacute;n manos libres para coordinaci&oacute;n de
              equipos en entornos ruidosos.
            </div>
            <div className="category-card-meta">Soporte recomendado: kit casco de seguridad</div>
          </div>
        </div>
      </section>

      {/* MODULAR */}
      <section className="section">
        <div className="section-head">
          <div className="section-head-left">
            <div className="section-eyebrow">Sistema modular</div>
            <h2 className="section-title">
              Crece <em>contigo</em>
            </h2>
          </div>
          <div className="section-head-right">
            Los m&oacute;dulos Trio y Duo son la base. Soportes, cascos,
            auriculares y accesorios se a&ntilde;aden seg&uacute;n c&oacute;mo
            y d&oacute;nde uses el sistema.
          </div>
        </div>

        <div className="modular-grid">
          <div className="modular-item">
            <div className="modular-item-num">A</div>
            <h4>Soportes</h4>
            <p>Adhesivos marinos, clips universales, soportes para casco de seguridad y soportes magn&eacute;ticos.</p>
          </div>
          <div className="modular-item">
            <div className="modular-item-num">B</div>
            <h4>Auriculares</h4>
            <p>Set de auriculares con altavoz, ganchos de oreja y juntas suaves para uso prolongado sin rozaduras.</p>
          </div>
          <div className="modular-item">
            <div className="modular-item-num">C</div>
            <h4>Cascos</h4>
            <p>Cascos de seguridad ABS con protecci&oacute;n UV, ranuras de 30 mm para protecci&oacute;n facial y auditiva.</p>
          </div>
          <div className="modular-item">
            <div className="modular-item-num">D</div>
            <h4>Protecci&oacute;n</h4>
            <p>Espumas antiviento para micr&oacute;fono, soportes de repuesto y kits de fijaci&oacute;n para cualquier casco.</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-strip">
        <div className="cta-strip-inner">
          <h2 className="cta-strip-title">
            &iquest;Listo para <em>encender y hablar</em>?
          </h2>
          <p className="cta-strip-desc">
            Elige Trio o Duo seg&uacute;n el tama&ntilde;o de tu equipo, o
            habla con un asesor para configurar el sistema exacto que
            necesitas.
          </p>
          <div className="cta-strip-actions">
            <Link href="/productos" className="btn-primary">
              <span>Ver el cat&aacute;logo</span>
              <ArrowRight />
            </Link>
            <Link href="/productos" className="btn-link" style={{ borderColor: "var(--cream)", color: "var(--cream)" }}>
              <span>Hablar con un asesor</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
