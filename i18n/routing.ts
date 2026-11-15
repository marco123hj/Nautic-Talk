import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["nl", "en"],
  defaultLocale: "nl",
  localePrefix: "always",
  // Dutch is the primary language: everyone lands on NL unless they switch.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
