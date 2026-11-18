// Homepage copy, Dutch and English. Facts come from the product texts in
// Shopify and the shop's own terms (shipping, returns, warranty).

export interface Panel {
  word: string;
  text: string;
  alt: string;
  photo: string;
  credit: string;
  link: { label: string; href: string };
}

export interface HomeCopy {
  hero: Panel;
  from: string;
  setsTitle: string;
  accessoriesTitle: string;
  accessoriesLink: string;
  categoriesTitle: string;
  productCount: (n: number) => string;
  panels: Panel[];
  help: {
    title: string;
    text: string;
    call: string;
    mail: string;
    facts: string[];
    address: string;
  };
}

const PHOTOS = {
  haven: "/home/lemmer-haven.jpg",
  kraan: "/home/kraan.jpg",
  fietsen: "/home/fietsen.jpg",
  zeilen: "/home/zeilen.jpg",
};

const nl: HomeCopy = {
  hero: {
    word: "Aanleggen.",
    text: "Nautic Talk is een Bluetooth-intercom voor 2 of 3 mensen. Jij aan het roer, je maat op de boeg met de lijn: jullie praten gewoon, ook met de motor aan.",
    alt: "Een Lemsteraak afgemeerd in de haven van Lemmer",
    photo: PHOTOS.haven,
    credit: "Foto: Jan Dijkstra, CC BY-SA 4.0",
    link: { label: "Bekijk de sets", href: "/productos?category=Intercomunicadores" },
  },
  from: "Duo vanaf",
  setsTitle: "De sets",
  accessoriesTitle: "Accessoires voor je set",
  accessoriesLink: "Alle producten",
  categoriesTitle: "Shop per categorie",
  productCount: (n) => (n === 1 ? "1 product" : `${n} producten`),
  panels: [
    {
      word: "Zeilen.",
      text: "Schipper achterin, bemanning bij de fok. Een filter haalt het windgeruis weg, dus je hoort elkaar ook als het hard waait.",
      alt: "Skûtsjes zeilen bij Lemmer",
      photo: PHOTOS.zeilen,
      credit: "Foto: PEP Photo, CC BY 2.0",
      link: { label: "Bekijk de Duo", href: "/productos/nautic-talk-duo" },
    },
    {
      word: "Hijsen.",
      text: "De man in de kraan en de man op de grond horen elkaar tot 1 km ver, allebei met de handen vrij. De module klikt op elke bouwhelm.",
      alt: "Monteurs bovenin een gele bouwkraan",
      photo: PHOTOS.kraan,
      credit: "Foto: Philippe Alès, CC BY-SA 4.0",
      link: { label: "Bouwhelm met houder", href: "/productos/veiligheidshelm-zelfklevende-houder-voor-nautic-talk" },
    },
    {
      word: "Fietsen.",
      text: "Met z'n drieën op de dijk en toch gewoon kletsen. Bellen kan ook: koppel je telefoon via Bluetooth.",
      alt: "Wielrenners op een polderweg",
      photo: PHOTOS.fietsen,
      credit: "Foto: DennisM2, CC0",
      link: { label: "Bekijk de Trio", href: "/productos/nautic-talk-trio" },
    },
  ],
  help: {
    title: "Hulp bij het kiezen?",
    text: "Twijfel je tussen de Duo en de Trio, of welke houder op jouw helm past? Bel of mail ons. We helpen je in het Nederlands, Engels of Duits.",
    call: "Bel",
    mail: "Mail ons",
    facts: ["Gratis verzending vanaf € 120", "30 dagen bedenktijd", "2 jaar garantie"],
    address: "Nautic Talk, Kadijk 2B, Lemmer",
  },
};

const en: HomeCopy = {
  hero: {
    word: "Mooring.",
    text: "Nautic Talk is a Bluetooth intercom for 2 or 3 people. You at the helm, your mate on the bow with the line: you just talk, even with the engine running.",
    alt: "A Lemsteraak moored in the harbour of Lemmer",
    photo: PHOTOS.haven,
    credit: "Photo: Jan Dijkstra, CC BY-SA 4.0",
    link: { label: "See the sets", href: "/productos?category=Intercomunicadores" },
  },
  from: "Duo from",
  setsTitle: "The sets",
  accessoriesTitle: "Accessories for your set",
  accessoriesLink: "All products",
  categoriesTitle: "Shop by category",
  productCount: (n) => (n === 1 ? "1 product" : `${n} products`),
  panels: [
    {
      word: "Sailing.",
      text: "Skipper aft, crew at the jib. A filter takes out the wind noise, so you hear each other even when it blows hard.",
      alt: "Skûtsjes sailing near Lemmer",
      photo: PHOTOS.zeilen,
      credit: "Photo: PEP Photo, CC BY 2.0",
      link: { label: "See the Duo", href: "/productos/nautic-talk-duo" },
    },
    {
      word: "Hoisting.",
      text: "The man up the crane and the man on the ground hear each other up to 1 km apart, both with their hands free. The module clips onto any hard hat.",
      alt: "Fitters at the top of a yellow tower crane",
      photo: PHOTOS.kraan,
      credit: "Photo: Philippe Alès, CC BY-SA 4.0",
      link: { label: "Hard hat with mount", href: "/productos/veiligheidshelm-zelfklevende-houder-voor-nautic-talk" },
    },
    {
      word: "Cycling.",
      text: "Three of you on the dyke and still chatting. Calls work too: pair your phone over Bluetooth.",
      alt: "Cyclists on a polder road",
      photo: PHOTOS.fietsen,
      credit: "Photo: DennisM2, CC0",
      link: { label: "See the Trio", href: "/productos/nautic-talk-trio" },
    },
  ],
  help: {
    title: "Need help choosing?",
    text: "Not sure between the Duo and the Trio, or which mount fits your helmet? Call or email us. We help in Dutch, English or German.",
    call: "Call",
    mail: "Email us",
    facts: ["Free shipping from € 120", "30-day returns", "2-year warranty"],
    address: "Nautic Talk, Kadijk 2B, Lemmer, the Netherlands",
  },
};

export function homeCopy(locale: string): HomeCopy {
  return locale === "en" ? en : nl;
}
