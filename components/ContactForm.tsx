"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { sendContactMessage } from "@/app/actions/contact";

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" />
    </svg>
  );
}

// Off-screen field that only bots fill in.
const HONEYPOT: React.CSSProperties = { position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 };

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const SUBJECTS = [
    { value: "consulta", label: t("subjectInquiry") },
    { value: "asesoramiento", label: t("subjectAdvice") },
    { value: "pedido", label: t("subjectOrder") },
    { value: "garantia", label: t("subjectWarranty") },
    { value: "distribucion", label: t("subjectB2B") },
    { value: "otro", label: t("subjectOther") },
  ];

  const emailAddress = t("emailAddress");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Send the readable subject label rather than the internal option value.
    const subjectKey = String(fd.get("subject") ?? "consulta");
    fd.set(
      "subject",
      SUBJECTS.find((s) => s.value === subjectKey)?.label ?? t("subjectInquiry"),
    );

    setStatus("sending");
    const res = await sendContactMessage(fd);
    if (res.ok) {
      form.reset();
      setStatus("sent");
    } else {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={HONEYPOT} />
      <div className="contact-form-grid">
        <div className="contact-form-field">
          <label htmlFor="cf-name">{t("formName")}</label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            placeholder={t("formNamePlaceholder")}
            autoComplete="name"
          />
        </div>
        <div className="contact-form-field">
          <label htmlFor="cf-email">{t("formEmail")}</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            placeholder={t("formEmailPlaceholder")}
            autoComplete="email"
          />
        </div>
        <div className="contact-form-field">
          <label htmlFor="cf-phone">
            {t("formPhone")} <span className="contact-form-optional">{t("formPhoneOptional")}</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            placeholder={t("formPhonePlaceholder")}
            autoComplete="tel"
          />
        </div>
        <div className="contact-form-field">
          <label htmlFor="cf-subject">{t("formSubject")}</label>
          <select id="cf-subject" name="subject" defaultValue="consulta">
            {SUBJECTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="contact-form-field contact-form-field--full">
        <label htmlFor="cf-message">{t("formMessage")}</label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={6}
          placeholder={t("formMessagePlaceholder")}
        />
      </div>

      <div className="contact-form-bottom">
        <button type="submit" className="contact-form-submit" disabled={status === "sending"}>
          <span>{status === "sending" ? t("formSending") : t("formSubmit")}</span>
          <ArrowRight />
        </button>
        <p className="contact-form-disclaimer">{t("formDisclaimer")}</p>
      </div>

      {status === "sent" && (
        <div className="contact-form-sent" role="status">
          &#x2713; {t("formSent")}
        </div>
      )}
      {status === "error" && (
        <div className="contact-form-sent contact-form-error" role="alert">
          {t("formError")} <a href={`mailto:${emailAddress}`}>{emailAddress}</a>.
        </div>
      )}
    </form>
  );
}
