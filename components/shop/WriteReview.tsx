"use client";

// Review form on the product page. Opens in place, sends to /api/reviews,
// which passes it on to Judge.me.

import { useState } from "react";
import { useLocale } from "next-intl";
import { REVIEW_COPY } from "./reviewCopy";
import r from "./reviews.module.css";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STAR =
  "M12 2.6l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z";

type Status = "idle" | "sending" | "done" | "error" | "invalid" | "invalidEmail";

export default function WriteReview({
  productId,
  productName,
  hasReviews,
}: {
  productId: string;
  productName: string;
  hasReviews: boolean;
}) {
  const c = REVIEW_COPY[useLocale() === "en" ? "en" : "nl"];
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    if (!rating || !name.trim() || !email.trim() || !review.trim()) return setStatus("invalid");
    if (!EMAIL.test(email.trim())) return setStatus("invalidEmail");
    setStatus("sending");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, name, email, rating, title, review, website }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  const intro = !hasReviews && (
    <div className={r.introText}>
      <h2 className={r.firstTitle} id="reviews-title">{c.firstTitle}</h2>
      <p className={r.firstLead}>{c.firstText(productName)}</p>
    </div>
  );

  if (status === "done") {
    return (
      <div className={hasReviews ? r.writeBlock : r.empty}>
        {intro}
        <p className={r.success} role="status">{c.success}</p>
      </div>
    );
  }

  const shown = hover || rating;
  const message =
    status === "invalid" ? c.invalid : status === "invalidEmail" ? c.invalidEmail : status === "error" ? c.error : "";

  return (
    <div className={hasReviews ? r.writeBlock : r.empty}>
      {intro}
      {!open ? (
        <button type="button" className={r.writeButton} onClick={() => setOpen(true)} aria-expanded={false}>
          {c.write}
        </button>
      ) : (
        <form className={r.form} onSubmit={submit} noValidate>
          <fieldset className={r.starsField} onMouseLeave={() => setHover(0)}>
            <legend className={r.label}>{c.ratingLabel}</legend>
            <div className={r.starPick}>
              {[1, 2, 3, 4, 5].map((i) => (
                <label key={i} className={r.starOption} onMouseEnter={() => setHover(i)}>
                  <input
                    type="radio"
                    name="rating"
                    value={i}
                    checked={rating === i}
                    onChange={() => setRating(i)}
                    className={r.visuallyHidden}
                  />
                  <span className={r.visuallyHidden}>{c.star(i)}</span>
                  <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={STAR} fill={i <= shown ? "#ffae19" : "#d5d8dc"} />
                  </svg>
                </label>
              ))}
            </div>
          </fieldset>

          <div className={r.row}>
            <label className={r.field}>
              <span className={r.label}>{c.name} <span className={r.hint}>{c.nameHint}</span></span>
              <input value={name} onChange={(e) => setName(e.target.value)} maxLength={100} autoComplete="name" required />
            </label>
            <label className={r.field}>
              <span className={r.label}>{c.email} <span className={r.hint}>{c.emailHint}</span></span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={320} autoComplete="email" required />
            </label>
          </div>
          <label className={r.field}>
            <span className={r.label}>{c.reviewTitle} <span className={r.hint}>{c.optional}</span></span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={140} />
          </label>
          <label className={r.field}>
            <span className={r.label}>{c.review}</span>
            <textarea value={review} onChange={(e) => setReview(e.target.value)} rows={5} maxLength={5000} required />
          </label>
          <input
            className={r.honeypot}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />

          {message && <p className={r.error} role="alert">{message}</p>}

          <div className={r.actions}>
            <button type="submit" className={r.submit} disabled={status === "sending"}>
              {status === "sending" ? c.sending : c.submit}
            </button>
            <button type="button" className={r.cancel} onClick={() => setOpen(false)}>
              {c.cancel}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
