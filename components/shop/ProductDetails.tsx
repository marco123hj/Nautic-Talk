"use client";

// Fold-out blocks in the buy column: description (open, clipped with
// "Lees meer"), specifications and shipping & returns.

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import p from "./product.module.css";

type Copy = {
  description: string;
  specs: string;
  shipping: string;
  more: string;
  less: string;
  shippingLines: readonly string[];
  returnsLink: string;
};

type Props = {
  html?: string;
  specs: { label: string; value: string }[];
  copy: Copy;
};

const CLAMP = 240; // px of description shown before "Lees meer"

function Chevron() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function Fold({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <div className={`${p.fold} ${open ? p.foldOpen : ""}`}>
      <h2 className={p.foldHeading}>
        <button
          type="button"
          className={p.foldButton}
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
        >
          <span>{title}</span>
          <Chevron />
        </button>
      </h2>
      <div className={p.foldPanel} id={id} role="region" aria-label={title}>
        <div className={p.foldInner}>{children}</div>
      </div>
    </div>
  );
}

export default function ProductDetails({ html, specs, copy }: Props) {
  const [open, setOpen] = useState<Record<string, boolean>>({ description: true });
  const [expanded, setExpanded] = useState(false);
  const [long, setLong] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) setLong(el.scrollHeight > CLAMP + 40);
  }, [html]);

  // While clipped, the lines below the cut are hidden for real, so screen
  // readers and keyboard users do not land on text nobody can see.
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const blocks = el.querySelectorAll<HTMLElement>("p, li, h1, h2, h3, h4, h5, h6, a");
    const mark = () => {
      const top = el.getBoundingClientRect().top;
      blocks.forEach((b) => {
        const beyond = long && !expanded && b.getBoundingClientRect().top - top >= CLAMP;
        if (beyond) b.setAttribute("data-beyond", "");
        else b.removeAttribute("data-beyond");
      });
    };
    mark();
    const ro = new ResizeObserver(mark);
    ro.observe(el);
    return () => ro.disconnect();
  }, [long, expanded, html]);

  const toggle = (key: string) => setOpen((o) => ({ ...o, [key]: !o[key] }));

  return (
    <div className={p.folds}>
      {html && (
        <Fold title={copy.description} open={!!open.description} onToggle={() => toggle("description")}>
          <div
            ref={bodyRef}
            className={`${p.richText} ${long && !expanded ? p.clamped : ""}`}
            style={long && !expanded ? { maxHeight: CLAMP } : undefined}
            dangerouslySetInnerHTML={{ __html: html }}
          />
          {long && (
            <button type="button" className={p.readMore} aria-expanded={expanded} onClick={() => setExpanded((v) => !v)}>
              {expanded ? copy.less : copy.more}
            </button>
          )}
        </Fold>
      )}

      {specs.length > 0 && (
        <Fold title={copy.specs} open={!!open.specs} onToggle={() => toggle("specs")}>
          <dl className={p.specList}>
            {specs.map((s) => (
              <div key={s.label} className={p.specRow}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </Fold>
      )}

      <Fold title={copy.shipping} open={!!open.shipping} onToggle={() => toggle("shipping")}>
        <ul className={p.shipList}>
          {copy.shippingLines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <Link href="/retourneren" className={p.readMore}>
          {copy.returnsLink}
        </Link>
      </Fold>
    </div>
  );
}
