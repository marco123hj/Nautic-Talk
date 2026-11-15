"use server";

import { isEmail, sendToInbox, type FormResult } from "@/lib/email";

const field = (fd: FormData, name: string, max: number) =>
  String(fd.get(name) ?? "").trim().slice(0, max);

export async function sendContactMessage(fd: FormData): Promise<FormResult> {
  // Honeypot: real visitors never see or fill this field, bots do.
  if (field(fd, "company", 200)) return { ok: true };

  const name = field(fd, "name", 200);
  const email = field(fd, "email", 254);
  const phone = field(fd, "phone", 50);
  const subject = field(fd, "subject", 120);
  const message = field(fd, "message", 5000);

  if (!name || !message || !isEmail(email)) {
    return { ok: false, error: "invalid" };
  }

  try {
    await sendToInbox({
      subject: `[Nautic Talk] ${subject || "Contact"}: ${name}`,
      replyTo: email,
      text: [
        message,
        "",
        "---",
        `Naam: ${name}`,
        `E-mail: ${email}`,
        phone ? `Telefoon: ${phone}` : null,
        `Onderwerp: ${subject}`,
      ]
        .filter((line) => line !== null)
        .join("\n"),
    });
    return { ok: true };
  } catch (err) {
    console.error("Contact form send failed:", err);
    return { ok: false, error: "send" };
  }
}
