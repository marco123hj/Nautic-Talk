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

// Legal identity shown in the footer, on the contact page and in the legal
// pages. Nautic Talk is a trade name of Shipstore B.V. Change details here only.
export const COMPANY = {
  legalName: "Shipstore B.V.",
  tradeName: "Nautic Talk",
  street: "Kadijk 2B",
  postcode: "8531 XD",
  city: "Lemmer",
  kvk: "71395318",
  vat: "NL858698900B01",
  email: "info@nautictalk.nl",
  phone: "+31 6 21100079",
} as const;
