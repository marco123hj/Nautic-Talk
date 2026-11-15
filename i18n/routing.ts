import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["nl", "en"],
  defaultLocale: "nl",
  localePrefix: "always",
  // Dutch is the primary language: everyone lands on NL unless they switch.
  localeDetection: false,
  // middleware.ts writes the hreflang links itself, pointing at the main
  // domain; next-intl's default would point at whichever domain was visited.
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];
