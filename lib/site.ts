// The main (canonical) domain. All five country domains (.nl/.be/.de/.es/.eu)
// serve the same Dutch site for now, so search engines are told this one is
// the original. When a language gets its own domain (German on .de etc.),
// map that language to its domain in middleware.ts.
export const SITE_URL = "https://www.nautictalk.nl";

// Where website form submissions are delivered. Sent straight to the Shipstore
// inbox instead of via the info@nautictalk.nl forwarder, so forwarding can't
// break SPF/DMARC on the way.
export const CONTACT_INBOX = "info@shipstore.nl";

// Sender for form emails. nautictalk.nl has to be verified in Resend for this.
export const MAIL_FROM = "Nautic Talk <website@nautictalk.nl>";
