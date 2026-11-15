"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { routing } from "@/i18n/routing";

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="7" />
      <path d="M3 10h14M10 3c2 2.5 3 5 3 7s-1 4.5-3 7c-2-2.5-3-5-3-7s1-4.5 3-7z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 6.5l2.5 2.5 4.5-5" />
    </svg>
  );
}

export default function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [open]);

  function switchTo(newLocale: string) {
    const qs = searchParams.toString();
    const target = qs ? `${pathname}?${qs}` : pathname;
    router.replace(target, { locale: newLocale });
    setOpen(false);
  }

  return (
    <div className="lang-switcher" ref={wrapRef}>
      <button
        type="button"
        className="lang-switcher-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("label")}
        aria-expanded={open}
      >
        <GlobeIcon />
        <span className="lang-switcher-current">
          {t(`${locale}Short` as "esShort" | "nlShort" | "enShort")}
        </span>
      </button>
      {open && (
        <ul className="lang-switcher-menu" role="listbox">
          {routing.locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                onClick={() => switchTo(l)}
                className={`lang-switcher-item${
                  l === locale ? " lang-switcher-item--active" : ""
                }`}
                role="option"
                aria-selected={l === locale}
              >
                <span className="lang-switcher-item-short">
                  {t(`${l}Short` as "esShort" | "nlShort" | "enShort")}
                </span>
                <span className="lang-switcher-item-label">
                  {t(l as "es" | "nl" | "en")}
                </span>
                {l === locale && (
                  <span className="lang-switcher-item-check">
                    <CheckIcon />
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
