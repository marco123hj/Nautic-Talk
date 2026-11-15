import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip all Next.js internal paths + static assets
  matcher: "/((?!api|_next|_vercel|favicon.ico|footer-hero.jpg|.*\\..*).*)",
};
