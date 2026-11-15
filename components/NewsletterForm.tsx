"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { subscribeNewsletter } from "@/app/actions/newsletter";

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" />
    </svg>
  );
}

// Off-screen field that only bots fill in.
const HONEYPOT: React.CSSProperties = { position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 };

// Newsletter signup for the homepage band and the footer. The variant only
// switches between the two existing designs (class names and button content).
export default function NewsletterForm({ variant }: { variant: "home" | "footer" }) {
  const t = useTranslations("newsletter");
  const tFooter = useTranslations("footer");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const home = variant === "home";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    const res = await subscribeNewsletter(new FormData(form));
    if (res.ok) {
      form.reset();
      setStatus("done");
    } else {
      setStatus("error");
    }
  }

  return (
    <>
      <form className={home ? "newsletter-form" : "footer-newsletter-form"} onSubmit={handleSubmit}>
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={HONEYPOT} />
        <input
          type="email"
          name="email"
          required
          className={home ? "newsletter-input" : "footer-newsletter-input"}
          placeholder={home ? t("placeholder") : tFooter("newsletterPlaceholder")}
          aria-label={t("emailAria")}
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className={home ? "newsletter-btn" : "footer-newsletter-btn"}
          aria-label={home ? undefined : t("submit")}
        >
          {home ? (
            <>
              {t("submit")} <ArrowIcon />
            </>
          ) : (
            <ArrowIcon />
          )}
        </button>
      </form>
      {status === "done" && (
        <p className="newsletter-status" role="status">{t("subscribed")}</p>
      )}
      {status === "error" && (
        <p className="newsletter-status" role="alert">{t("subscribeError")}</p>
      )}
    </>
  );
}
