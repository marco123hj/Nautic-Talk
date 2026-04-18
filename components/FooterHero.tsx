import Link from "next/link";

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" />
    </svg>
  );
}

export default function FooterHero() {
  return (
    <section className="footer-hero" aria-label="Nautic Talk">
      <div className="footer-hero-image">
        {/* Replace public/footer-hero.jpg with your own image to change this */}
        <img
          src="/footer-hero.jpg"
          alt="Atardecer sobre el Mediterr\u00e1neo"
          loading="lazy"
        />
      </div>

      <div className="footer-hero-content">
        <span className="footer-hero-eyebrow">Nautic Talk</span>
        <h2 className="footer-hero-title">
          Donde el mar <em>encuentra la se&ntilde;al</em>
        </h2>
        <p className="footer-hero-desc">
          Intercomunicadores que resisten sal, viento y horas de traves&iacute;a.
          Para los que hacen del mar su sitio de trabajo.
        </p>
        <Link href="/productos" className="footer-hero-cta">
          <span>Descubrir el sistema</span>
          <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
