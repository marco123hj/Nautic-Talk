"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";

function ArrowRight({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

type CrewItem = {
  key: "duo" | "trio";
  label: string; // "Duo", "Trio"
  count: string; // "2 personen"
  price: string; // formatted, e.g. "Vanaf €312,50"
  href: string;
  img?: string;
  alt: string;
};

export default function CrewHero({
  headline,
  lead,
  meta,
  ctaPrefix,
  duo,
  trio,
}: {
  headline: string;
  lead: string;
  meta: string;
  ctaPrefix: string;
  duo: CrewItem;
  trio: CrewItem;
}) {
  const [sel, setSel] = useState<"duo" | "trio">("trio");
  const items: Record<"duo" | "trio", CrewItem> = { duo, trio };
  const active = items[sel];

  return (
    <section className="crew-hero" aria-label={headline}>
      <div className="crew-hero-text">
        <h1 className="crew-hero-head">{headline}</h1>
        <p className="crew-hero-lead">{lead}</p>

        <div
          className="crew-switch"
          role="group"
          aria-label="Kies je crew"
        >
          {(["duo", "trio"] as const).map((k) => (
            <button
              key={k}
              type="button"
              className="crew-switch-btn"
              aria-pressed={sel === k}
              onClick={() => setSel(k)}
            >
              <span className="crew-switch-name">{items[k].label}</span>
              <span className="crew-switch-count">{items[k].count}</span>
            </button>
          ))}
        </div>

        <div className="crew-hero-actions">
          <Link href={active.href} className="crew-hero-cta">
            {ctaPrefix} {active.label} <ArrowRight size={18} />
          </Link>
          <span className="crew-hero-price">{active.price}</span>
        </div>

        <p className="crew-hero-meta">{meta}</p>
      </div>

      <div className="crew-hero-media">
        {/* keyed so the swap re-triggers the fade */}
        {active.img ? (
          <img
            key={active.key}
            className="crew-hero-img"
            src={active.img}
            alt={active.alt}
          />
        ) : (
          <div key={active.key} className="crew-hero-img crew-hero-img-empty" />
        )}
      </div>
    </section>
  );
}
