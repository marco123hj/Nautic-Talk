"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "@/i18n/navigation";

export interface SpecimenItem {
  handle: string;
  title: string;
  image?: string;
  fact: string;
  field: string;
}

interface Props {
  items: SpecimenItem[];
  headline: string;
  sub: string;
  cta: string;
  ctaHref: string;
  dragHint: string;
}

export default function SpecimenHero({
  items,
  headline,
  sub,
  cta,
  ctaHref,
  dragHint,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Scale / lift each card by its distance from the viewport centre.
  const paint = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const mid = window.innerWidth / 2;
    const cards = Array.from(
      track.querySelectorAll<HTMLElement>(".sp-card"),
    );
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const dist = Math.abs(cx - mid);
      const t = Math.max(0, 1 - dist / (window.innerWidth * 0.46));
      const scale = 0.58 + 0.42 * t;
      const lift = (i % 2 === 0 ? -1 : 1) * (1 - t) * 26;
      card.style.setProperty("--t", t.toFixed(3));
      card.style.transform = `translateY(${lift}px) scale(${scale})`;
      card.style.zIndex = String(Math.round(t * 100));
      card.style.opacity = String(0.4 + 0.6 * t);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  }, []);

  const centre = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelectorAll<HTMLElement>(".sp-card")[i];
    if (!card) return;
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // start in the middle of the line-up
    const start = Math.floor(items.length / 2);
    const card = track.querySelectorAll<HTMLElement>(".sp-card")[start];
    if (card) {
      track.scrollLeft =
        card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    }
    paint();
    const onScroll = () => paint();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", paint);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", paint);
    };
  }, [items.length, paint]);

  const current = items[active];

  return (
    <section
      className="sp-hero"
      style={{ ["--field" as string]: current?.field ?? "#1e4bd7" }}
    >
      <div className="sp-hero-head">
        <div className="sp-hero-head-left">
          <h1 className="sp-hero-title">{headline}</h1>
          <p className="sp-hero-sub">{sub}</p>
        </div>
        <Link href={ctaHref} className="sp-hero-cta">
          {cta}
        </Link>
      </div>

      <div className="sp-stage">
        <div className="sp-track" ref={trackRef}>
          {items.map((it, i) => (
            <button
              key={it.handle}
              type="button"
              className="sp-card"
              aria-label={it.title}
              onClick={() => centre(i)}
            >
              <span className="sp-card-tile">
                {it.image && (
                  <img src={it.image} alt={it.title} draggable={false} />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="sp-hero-foot">
        <div className="sp-hero-caption" aria-live="polite">
          <span className="sp-hero-name">{current?.title}</span>
          <span className="sp-hero-fact">{current?.fact}</span>
        </div>
        <span className="sp-hero-hint">{dragHint}</span>
      </div>
    </section>
  );
}
