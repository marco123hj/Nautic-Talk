import { CONTACT_INBOX, MAIL_FROM } from "./site";

export type FormResult = { ok: true } | { ok: false; error: "invalid" | "send" };

type Mail = { subject: string; text: string; replyTo?: string };

// Sends a plain-text email through the Resend API.
export async function sendEmail({ to, subject, text, replyTo }: Mail & { to: string }): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: MAIL_FROM,
      to: [to],
      subject: subject.replace(/[\r\n]+/g, " "),
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
}

// Sends a plain-text email to CONTACT_INBOX (website forms).
export async function sendToInbox(mail: Mail): Promise<void> {
  await sendEmail({ ...mail, to: CONTACT_INBOX });
}

export function isEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
