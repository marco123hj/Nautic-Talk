"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4.5l4 4 4-4" />
    </svg>
  );
}

export default function ProductDescription({ html }: { html: string }) {
  const t = useTranslations("product");
  const [open, setOpen] = useState(false);

  return (
    <div className="product-desc">
      <div className="product-desc-head">
        <div className="product-description-eyebrow">{t("descEyebrow")}</div>
        <h2>{t("descTitle")}</h2>
      </div>

      <div className={`product-desc-body${open ? "" : " is-collapsed"}`}>
        <article
          className="product-description"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      <button
        type="button"
        className={`product-desc-toggle${open ? " is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{open ? t("descLess") : t("descMore")}</span>
        <Chevron />
      </button>
    </div>
  );
}
