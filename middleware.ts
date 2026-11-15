import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { SITE_URL } from "./lib/site";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);

  // Every domain points search engines at the same page on SITE_URL, plus its
  // language twins there, so .be/.de/.es/.eu don't compete with .nl as copies.
  const { pathname } = request.nextUrl;
  const [, first, ...rest] = pathname.split("/");
  const hasLocale = (routing.locales as readonly string[]).includes(first);
  const tail = hasLocale
    ? rest.length
      ? `/${rest.join("/")}`
      : ""
    : pathname === "/"
      ? ""
      : pathname;

  const links = [
    `<${SITE_URL}${pathname}>; rel="canonical"`,
    ...routing.locales.map(
      (locale) => `<${SITE_URL}/${locale}${tail}>; rel="alternate"; hreflang="${locale}"`,
    ),
    `<${SITE_URL}/${routing.defaultLocale}${tail}>; rel="alternate"; hreflang="x-default"`,
  ];
  response.headers.set("Link", links.join(", "));

  return response;
}

export const config = {
  // Skip all Next.js internal paths + static assets
  matcher: "/((?!api|_next|_vercel|favicon.ico|footer-hero.jpg|.*\\..*).*)",
};
