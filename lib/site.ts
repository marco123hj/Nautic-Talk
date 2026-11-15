// The main (canonical) domain. All five country domains (.nl/.be/.de/.es/.eu)
// serve the same Dutch site for now, so search engines are told this one is
// the original. When a language gets its own domain (German on .de etc.),
// map that language to its domain in middleware.ts.
export const SITE_URL = "https://www.nautictalk.nl";
