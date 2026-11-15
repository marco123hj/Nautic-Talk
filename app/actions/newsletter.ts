"use server";

import { isEmail, sendToInbox, type FormResult } from "@/lib/email";

// No mailing-list tool yet, so each signup is emailed to the inbox to collect.
export async function subscribeNewsletter(fd: FormData): Promise<FormResult> {
  if (String(fd.get("company") ?? "")) return { ok: true }; // honeypot

  const email = String(fd.get("email") ?? "").trim().slice(0, 254);
  if (!isEmail(email)) return { ok: false, error: "invalid" };

  try {
    await sendToInbox({
      subject: `[Nautic Talk] Nieuwe nieuwsbrief-inschrijving: ${email}`,
      replyTo: email,
      text: `Nieuwe inschrijving voor de nieuwsbrief via de website:\n\n${email}`,
    });
    return { ok: true };
  } catch (err) {
    console.error("Newsletter signup failed:", err);
    return { ok: false, error: "send" };
  }
}
