// Shop helpers shared by the homepage, the catalogue, the product page and
// the cards: Dutch and English product names, short spec lines, category
// labels and price formatting.
//
// The product titles in Shopify are still Spanish. Until they are translated
// in Shopify (Translate & Adapt), the shop shows these names instead. A
// product that is not listed here keeps its Shopify title.

import { getCategory } from "./shopify";

export type ShopLocale = "nl" | "en";

export function shopLocale(locale: string): ShopLocale {
  return locale === "en" ? "en" : "nl";
}

type Pair = { nl: string; en: string };

const NAMES: Record<string, Pair> = {
  "nautic-talk-duo": { nl: "Nautic Talk Duo", en: "Nautic Talk Duo" },
  "nautic-talk-trio": { nl: "Nautic Talk Trio", en: "Nautic Talk Trio" },
  "koptelefoonhalter-haak-met-n-oor": { nl: "Koptelefoonhouder met hoofdbeugel", en: "Headset holder with headband" },
  "oorkappenset-voor-buddy-chat-modules": { nl: "Oorkappenset", en: "Ear cup set" },
  "zelfklevende-houder-voor-nautic-talk": { nl: "Zelfklevende houder", en: "Adhesive mount" },
  "klemhouder-veiligheidshelm": { nl: "Klemhouder voor bouwhelm", en: "Hard hat clip mount" },
  "modulehouder-voor-nautic-talk-modules": { nl: "Modulehouder", en: "Module holder" },
  "windkussen-voor-microfoon-microfoonbescherming": { nl: "Windkapje voor de microfoon", en: "Microphone windscreen" },
  "veiligheidshelm-zelfklevende-houder-voor-nautic-talk": { nl: "Bouwhelm met zelfklevende houder", en: "Hard hat with adhesive mount" },
  "pet-blauwe-zwart": { nl: "Pet blauw en zwart", en: "Cap, blue and black" },
  "pet-zwart": { nl: "Pet zwart", en: "Cap, black" },
};

// One line under the name on a card. Facts from the Shopify product texts.
const SPECS: Record<string, Pair> = {
  "nautic-talk-duo": { nl: "Set voor 2 personen · tot 1 km · full duplex", en: "Set for 2 people · up to 1 km · full duplex" },
  "nautic-talk-trio": { nl: "Set voor 3 personen · tot 1 km · full duplex", en: "Set for 3 people · up to 1 km · full duplex" },
};

// Spec table on the product page. Numbers come from each product's own
// Shopify text (the Duo text says 10 hours of talk time, the Trio text 15).
type SpecRow = { label: Pair; value: Pair };
const row = (nl: string, en: string, vnl: string, ven = vnl): SpecRow => ({
  label: { nl, en },
  value: { nl: vnl, en: ven },
});

const SPEC_TABLES: Record<string, SpecRow[]> = {
  "nautic-talk-duo": [
    row("Personen", "People", "2"),
    row("Bereik", "Range", "Tot 1 km in open veld", "Up to 1 km in open terrain"),
    row("Praten", "Talking", "Full duplex, zonder knop", "Full duplex, no button"),
    row("Gesprekstijd", "Talk time", "Tot 10 uur", "Up to 10 hours"),
    row("Stand-by", "Standby", "Ongeveer 1000 uur", "About 1000 hours"),
    row("Geluid", "Sound", "DSP-ruisonderdrukking, automatisch volume", "DSP noise cancelling, automatic volume"),
    row("Bescherming", "Protection", "Stof- en waterdicht", "Dust and waterproof"),
    row("Gewicht", "Weight", "71 g per module"),
    row("Bluetooth", "Bluetooth", "3.0, werkt met elke smartphone", "3.0, works with any smartphone"),
    row("Draagwijze", "Wearing", "Linker- of rechteroor", "Left or right ear"),
    row(
      "In de doos",
      "In the box",
      "2 modules, 2 klemhouders, 2 zelfklevende houders, 2 laders, 2 laadkabels, 2 koptelefoonhouders, snelstartgids",
      "2 modules, 2 clip mounts, 2 adhesive mounts, 2 chargers, 2 charging cables, 2 headset holders, quick start guide",
    ),
  ],
  "nautic-talk-trio": [
    row("Personen", "People", "3"),
    row("Bereik", "Range", "500 m tot 1 km", "500 m to 1 km"),
    row("Praten", "Talking", "Full duplex, iedereen tegelijk", "Full duplex, everyone at once"),
    row("Gesprekstijd", "Talk time", "Tot 15 uur", "Up to 15 hours"),
    row("Stand-by", "Standby", "Ongeveer 1000 uur", "About 1000 hours"),
    row("Laadtijd", "Charging", "Ongeveer 2 uur", "About 2 hours"),
    row("Geluid", "Sound", "DSP-ruisonderdrukking, automatisch volume", "DSP noise cancelling, automatic volume"),
    row("Bescherming", "Protection", "Water- en stofbestendig", "Water and dust resistant"),
    row("Gewicht", "Weight", "71 g per module"),
    row("Bluetooth", "Bluetooth", "3.0, handsfree bellen met je telefoon", "3.0, hands-free calls with your phone"),
    row("Montage", "Mounting", "Zelfklevende houder en klemhouder inbegrepen", "Adhesive mount and clip mount included"),
  ],
};

export function specRows(handle: string, locale: string) {
  const l = shopLocale(locale);
  return (SPEC_TABLES[handle] ?? []).map((r) => ({ label: r.label[l], value: r.value[l] }));
}

const CATEGORY_LABELS: Record<string, Pair> = {
  Intercomunicadores: { nl: "Intercoms", en: "Intercoms" },
  Soportes: { nl: "Houders", en: "Mounts" },
  Cascos: { nl: "Helmen", en: "Helmets" },
  Auriculares: { nl: "Koptelefoons", en: "Headsets" },
  Accesorios: { nl: "Accessoires", en: "Accessories" },
  Merchandising: { nl: "Petten", en: "Caps" },
};

export const CATEGORY_ORDER = [
  "Intercomunicadores",
  "Auriculares",
  "Soportes",
  "Cascos",
  "Accesorios",
  "Merchandising",
];

export function displayName(p: { handle: string; title: string }, locale: string) {
  return NAMES[p.handle]?.[shopLocale(locale)] ?? p.title;
}

export function specLine(p: { handle: string; title: string }, locale: string) {
  const l = shopLocale(locale);
  return SPECS[p.handle]?.[l] ?? categoryLabel(getCategory(p), locale);
}

export function categoryLabel(category: string, locale: string) {
  return CATEGORY_LABELS[category]?.[shopLocale(locale)] ?? category;
}

export function formatPrice(amount: string | number, currency: string, locale: string) {
  return new Intl.NumberFormat(locale === "en" ? "en-GB" : "nl-NL", {
    style: "currency",
    currency,
  }).format(typeof amount === "number" ? amount : parseFloat(amount));
}

// Flagships first, then the rest in Shopify order.
export function featuredOrder<T extends { handle: string }>(list: T[]): T[] {
  const w = (h: string) => (h === "nautic-talk-trio" ? 0 : h === "nautic-talk-duo" ? 1 : 2);
  return [...list].sort((a, b) => w(a.handle) - w(b.handle));
}

// Words used by the cards, the header and the shop pages.
export const SHOP_COPY = {
  nl: {
    available: "Leverbaar",
    soldOut: "Tijdelijk uitverkocht",
    add: "In winkelwagen",
    added: "Toegevoegd",
    vat: "incl. btw",
    view: "Bekijk",
    viewAll: "Alle producten",
    favorites: "Favorieten",
    cart: "Winkelwagen",
    questions: "Vragen? Bel",
    usps: ["Gratis verzending vanaf € 120", "30 dagen retour", "2 jaar garantie"],
    allProducts: "Alle producten",
    system: "Het systeem",
    contact: "Contact",
    home: "Home",
    products: "Producten",
  },
  en: {
    available: "Available",
    soldOut: "Temporarily sold out",
    add: "Add to cart",
    added: "Added",
    vat: "incl. VAT",
    view: "View",
    viewAll: "All products",
    favorites: "Favourites",
    cart: "Cart",
    questions: "Questions? Call",
    usps: ["Free shipping from € 120", "30-day returns", "2-year warranty"],
    allProducts: "All products",
    system: "The system",
    contact: "Contact",
    home: "Home",
    products: "Products",
  },
} as const;

export function shopCopy(locale: string) {
  return SHOP_COPY[shopLocale(locale)];
}
