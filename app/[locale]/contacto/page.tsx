import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("breadcrumb"),
    description: t("infoDesc"),
  };
}

/* ============ ICONS ============ */

function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
function IconWhatsapp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20l1.4-4.1A8 8 0 1 1 8.1 18.6L4 20z" />
      <path d="M9 9c0 2.8 2.2 5 5 5" />
      <path d="M14 14l-1.5-1.2a1 1 0 0 0-1.1-.1l-.6.4a1 1 0 0 1-1.2-.1L8 11.6a1 1 0 0 1-.1-1.2l.4-.6a1 1 0 0 0-.1-1.1L7 7.2" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
function IconMapPin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
function IconTruck() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="12" height="10" rx="1" />
      <path d="M14 10h4l3 3v4h-7" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <div className="page-header">
        <div className="page-header-breadcrumb">
          <Link href="/">{t("breadcrumbHome")}</Link>
          <span>/</span>
          {t("breadcrumb")}
        </div>
        <div className="page-header-title">
          <h1>
            {t("title1")} <em>{t("titleEm")}</em> {t("title2")}
          </h1>
          <p>{t("subtitle")}</p>
        </div>
      </div>

      <section className="contact-section">
        <div className="contact-layout">
          {/* LEFT — info */}
          <aside className="contact-info">
            <div className="contact-info-head">
              <div className="section-eyebrow">{t("infoEyebrow")}</div>
              <h2 className="contact-info-title">{t("infoTitle")}</h2>
              <p className="contact-info-desc">{t("infoDesc")}</p>
            </div>

            <ul className="contact-channels">
              <li>
                <IconMail />
                <div>
                  <strong>{t("channelEmail")}</strong>
                  <a href={`mailto:${t("emailAddress")}`}>{t("emailAddress")}</a>
                </div>
              </li>
              <li>
                <IconWhatsapp />
                <div>
                  <strong>{t("channelWhatsapp")}</strong>
                  <a
                    href={`https://wa.me/${t("phoneNumber").replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("phoneNumber")}
                  </a>
                </div>
              </li>
              <li>
                <IconClock />
                <div>
                  <strong>{t("channelHours")}</strong>
                  <span>{t("channelHoursValue")}</span>
                </div>
              </li>
              <li>
                <IconMapPin />
                <div>
                  <strong>{t("channelLocation")}</strong>
                  <span>{t("channelLocationValue")}</span>
                </div>
              </li>
            </ul>

            <div className="contact-trust">
              <div className="contact-trust-item">
                <IconTruck />
                <div>
                  <strong>{t("trustShippingTitle")}</strong>
                  <span>{t("trustShippingDesc")}</span>
                </div>
              </div>
              <div className="contact-trust-item">
                <IconShield />
                <div>
                  <strong>{t("trustWarrantyTitle")}</strong>
                  <span>{t("trustWarrantyDesc")}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT — form */}
          <div className="contact-form-wrap">
            <div className="contact-form-head">
              <div className="section-eyebrow">{t("formEyebrow")}</div>
              <h2 className="contact-form-title">
                {t("formTitle1")} <em>{t("formTitleEm")}</em>
              </h2>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
