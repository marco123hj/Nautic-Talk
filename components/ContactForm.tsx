"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" />
    </svg>
  );
}

export default function ContactForm() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);

  const SUBJECTS = [
    { value: "consulta", label: t("subjectInquiry") },
    { value: "asesoramiento", label: t("subjectAdvice") },
    { value: "pedido", label: t("subjectOrder") },
    { value: "garantia", label: t("subjectWarranty") },
    { value: "distribucion", label: t("subjectB2B") },
    { value: "otro", label: t("subjectOther") },
  ];

  const emailAddress = t("emailAddress");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const subjectKey = String(fd.get("subject") ?? "consulta");
    const phone = String(fd.get("phone") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    const subjectLabel =
      SUBJECTS.find((s) => s.value === subjectKey)?.label ?? t("subjectInquiry");

    const body = [
      message,
      "",
      "---",
      `${t("formName")}: ${name}`,
      `${t("formEmail")}: ${email}`,
      phone ? `${t("formPhone")}: ${phone}` : null,
      `${t("formSubject")}: ${subjectLabel}`,
    ]
      .filter(Boolean)
      .join("\n");

    const href =
      `mailto:${emailAddress}` +
      `?subject=${encodeURIComponent(`[Web] ${subjectLabel}`)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setSubmitted(true);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="contact-form-submit">
          <span>{t("formSubmit")}</span>
          <ArrowRight />
        </button>
        <p className="contact-form-disclaimer">{t("formDisclaimer")}</p>
      </div>

      {submitted && (
        <div className="contact-form-sent" role="status">
          &#x2713; {t("formSent")}
          <a href={`mailto:${emailAddress}`}>{emailAddress}</a>.
        </div>
      )}
    </form>
  );
}
