import { COMPANY } from "./site";

// Legal pages content (Dutch consumer law + GDPR). A block is a paragraph, a
// bullet list, or a fill-in form. Inline links use [text](href); hrefs that
// start with "/" are internal and get the visitor's locale prefix.

export type LegalDocKey = "terms" | "returns" | "privacy" | "cookies";
export type LegalBlock = string | string[] | { form: string[] };
export type LegalSection = { id?: string; heading: string; blocks: LegalBlock[] };
export type LegalDoc = { title: string; intro: string; sections: LegalSection[] };
export type LegalCopy = {
  home: string;
  updatedLabel: string;
  updated: string;
  docs: Record<LegalDocKey, LegalDoc>;
};

const C = COMPANY;
const ADDRESS = `${C.street}, ${C.postcode} ${C.city}`;

const nl: LegalCopy = {
  home: "Home",
  updatedLabel: "Laatst bijgewerkt",
  updated: "15 november 2026",
  docs: {
    terms: {
      title: "Algemene voorwaarden",
      intro: `Deze voorwaarden gelden voor elke bestelling bij ${C.tradeName}, op nautictalk.nl en op onze andere landendomeinen.`,
      sections: [
        {
          id: "wie-wij-zijn",
          heading: "1. Wie wij zijn",
          blocks: [
            `${C.tradeName} is een handelsnaam van ${C.legalName}`,
            [
              `${C.legalName}, ${ADDRESS}, Nederland`,
              `KvK-nummer: ${C.kvk}`,
              `Btw-nummer: ${C.vat}`,
              `E-mail: ${C.email}`,
              `Telefoon en WhatsApp: ${C.phone} (ma t/m vr, 9:00 tot 18:00)`,
            ],
          ],
        },
        {
          heading: "2. Wanneer deze voorwaarden gelden",
          blocks: [
            "Deze voorwaarden gelden voor elk aanbod van ons en voor elke koop die je op afstand bij ons doet. Je kunt ze lezen en opslaan voordat je bestelt.",
            "Gelden er voor een product aanvullende voorwaarden en spreken die elkaar tegen, dan mag je altijd een beroep doen op de bepaling die voor jou het gunstigst is.",
          ],
        },
        {
          heading: "3. Ons aanbod",
          blocks: [
            "We beschrijven onze producten zo volledig en nauwkeurig mogelijk. Afbeeldingen geven het product getrouw weer, maar kleine verschillen in kleur of uitvoering zijn mogelijk. Kennelijke vergissingen of fouten in het aanbod binden ons niet.",
          ],
        },
        {
          heading: "4. Hoe de koop tot stand komt",
          blocks: [
            "De koop komt tot stand zodra je je bestelling afrondt bij het afrekenen. Je krijgt direct een bevestiging per e-mail.",
            "We mogen een bestelling weigeren of annuleren als daar een goede reden voor is, bijvoorbeeld een duidelijke prijsfout of een product dat niet meer leverbaar is. Je krijgt dan je geld volledig terug.",
          ],
        },
        {
          id: "prijzen",
          heading: "5. Prijzen en verzendkosten",
          blocks: [
            [
              "Alle prijzen zijn in euro's en inclusief btw.",
              "De verzendkosten zie je bij het afrekenen, voordat je bestelt. Bestellingen vanaf €120 versturen we gratis.",
              "De prijs die je ziet op het moment van bestellen, is de prijs die je betaalt.",
            ],
          ],
        },
        {
          heading: "6. Betalen",
          blocks: [
            "Je betaalt bij het afrekenen met een van de betaalmethoden die daar worden getoond. De betaling wordt veilig verwerkt via ons webwinkelplatform Shopify en de betrokken betaalpartijen. We versturen je bestelling zodra de betaling binnen is.",
          ],
        },
        {
          id: "levering",
          heading: "7. Levering",
          blocks: [
            "We leveren in de landen die je bij het afrekenen kunt kiezen. Producten die op voorraad zijn, versturen we meestal binnen 1 tot 3 werkdagen.",
            "Lukt het niet om binnen 30 dagen na je bestelling te leveren, dan laten we dat weten en mag je de bestelling kosteloos annuleren. Je krijgt dan binnen 14 dagen je geld terug.",
            "Tot het pakket bij jou (of bij iemand die jij aanwijst) is bezorgd, ligt het risico van verlies of beschadiging bij ons.",
          ],
        },
        {
          id: "retourneren",
          heading: "8. Retourneren en herroepingsrecht",
          blocks: [
            "Je mag je bestelling binnen 30 dagen na ontvangst zonder opgave van redenen terugsturen. Dat is ruimer dan de wettelijke 14 dagen. Hoe het werkt, en het modelformulier voor herroeping, vind je op de pagina [Retourneren](/retourneren).",
          ],
        },
        {
          id: "garantie",
          heading: "9. Garantie",
          blocks: [
            "Je hebt altijd recht op een product dat werkt zoals je mag verwachten (de wettelijke garantie). Is dat niet zo, dan repareren of vervangen we het, of krijg je (een deel van) je geld terug.",
            `Daarnaast geeft ${C.legalName} 2 jaar garantie op materiaal- en fabricagefouten, vanaf de aankoopdatum en in alle landen waar we leveren. Deze garantie komt bovenop je wettelijke rechten en beperkt ze niet.`,
            "Buiten deze garantie vallen schade door verkeerd gebruik, ongelukken of eigen reparaties, en normale slijtage van onderdelen zoals oorkussens en windkappen.",
            `Een defect meld je met je bestelnummer en een korte omschrijving via ${C.email}, bij voorkeur binnen 2 maanden nadat je het hebt ontdekt.`,
          ],
        },
        {
          heading: "10. Klachten",
          blocks: [
            `Ben je ergens niet tevreden over? Laat het ons weten via ${C.email} of WhatsApp. We bevestigen je klacht binnen 3 werkdagen en reageren binnen 14 dagen inhoudelijk, of laten weten wanneer je een antwoord kunt verwachten.`,
            "Komen we er samen niet uit, dan kun je het geschil voorleggen aan de bevoegde rechter.",
          ],
        },
        {
          heading: "11. Aansprakelijkheid",
          blocks: [
            "We zijn aansprakelijk voor schade die het gevolg is van een tekortkoming die aan ons is toe te rekenen, binnen de grenzen van de wet. We zijn niet aansprakelijk voor schade die ontstaat doordat een product verkeerd wordt gebruikt of de gebruiksaanwijzing niet wordt gevolgd.",
            "Gebruik een intercom altijd volgens de gebruiksaanwijzing en de regels die gelden waar je hem gebruikt, bijvoorbeeld in het verkeer of op het water.",
          ],
        },
        {
          heading: "12. Persoonsgegevens",
          blocks: ["Hoe we met je gegevens omgaan, lees je in onze [privacyverklaring](/privacy)."],
        },
        {
          heading: "13. Toepasselijk recht",
          blocks: [
            "Op deze voorwaarden en op elke koop bij ons is Nederlands recht van toepassing. Woon je in een ander land van de EU, dan behoud je de bescherming die de dwingende regels van dat land je geven. Het Weens Koopverdrag is niet van toepassing.",
          ],
        },
        {
          heading: "14. Wijzigingen",
          blocks: [
            "We kunnen deze voorwaarden aanpassen. Voor jouw bestelling gelden de voorwaarden zoals ze waren op het moment dat je bestelde.",
          ],
        },
      ],
    },

    returns: {
      title: "Retourneren",
      intro: "Toch niet wat je zocht? Je mag je bestelling binnen 30 dagen zonder opgave van redenen terugsturen.",
      sections: [
        {
          heading: "30 dagen bedenktijd",
          blocks: [
            "De wet geeft je 14 dagen om van een online aankoop af te zien. Wij geven je er 30. De termijn begint op de dag nadat jij, of iemand die jij aanwijst, het product hebt ontvangen. Komt je bestelling in meerdere zendingen, dan begint de termijn na ontvangst van de laatste.",
          ],
        },
        {
          heading: "Zo meld je een retour",
          blocks: [
            `Laat ons binnen de 30 dagen weten dat je wilt retourneren. Dat kan met een duidelijke e-mail aan ${C.email}, of met het modelformulier hieronder. Vermeld je naam, je bestelnummer en welke producten je terugstuurt. Je krijgt dan van ons het retouradres.`,
            "Stuur het product daarna binnen 14 dagen na je melding terug.",
          ],
        },
        {
          heading: "In welke staat",
          blocks: [
            "Je mag het product uitpakken en bekijken zoals je dat in een winkel zou doen. Stuur het compleet terug, met alle onderdelen en accessoires en zo mogelijk in de originele verpakking. Heb je het product meer gebruikt dan nodig was om het te beoordelen, dan mogen we de waardevermindering verrekenen met je terugbetaling.",
          ],
        },
        {
          heading: "Kosten van terugsturen",
          blocks: [
            "De kosten van het terugsturen zijn voor jou, tenzij het product defect is of we iets verkeerds hebben geleverd. Verstuur je pakket bij voorkeur met track and trace en bewaar het verzendbewijs.",
          ],
        },
        {
          heading: "Je geld terug",
          blocks: [
            "We betalen het volledige aankoopbedrag terug, inclusief de standaard verzendkosten van je bestelling, uiterlijk 14 dagen nadat je de retour hebt gemeld. We mogen wachten met terugbetalen tot we het product hebben ontvangen of tot je aantoont dat je het hebt teruggestuurd. We betalen terug via dezelfde betaalmethode, tenzij je met iets anders instemt.",
          ],
        },
        {
          heading: "Defect of verkeerd geleverd?",
          blocks: [
            "Dat valt onder je [garantie](/voorwaarden#garantie), niet onder retourneren. Neem contact met ons op, dan lossen we het op en betalen wij de verzendkosten.",
          ],
        },
        {
          id: "modelformulier",
          heading: "Modelformulier voor herroeping",
          blocks: [
            "Dit formulier vul je alleen in als je de koop wilt herroepen. Je kunt de tekst kopiëren in een e-mail of uitprinten.",
            {
              form: [
                `Aan: ${C.legalName} (${C.tradeName}), ${ADDRESS}, Nederland, ${C.email}`,
                "Ik/Wij* deel/delen* u hierbij mede dat ik/wij* onze overeenkomst betreffende de verkoop van de volgende producten herroep/herroepen*:",
                "Besteld op* / Ontvangen op*:",
                "Naam/Namen consument(en):",
                "Adres consument(en):",
                "Handtekening van consument(en) (alleen wanneer dit formulier op papier wordt ingediend):",
                "Datum:",
                "* Doorhalen wat niet van toepassing is.",
              ],
            },
          ],
        },
      ],
    },

    privacy: {
      title: "Privacyverklaring",
      intro: `${C.legalName} (handelsnaam ${C.tradeName}) gaat zorgvuldig om met je persoonsgegevens. Hier lees je welke gegevens we gebruiken, waarom, en welke rechten je hebt.`,
      sections: [
        {
          heading: "Wie verantwoordelijk is",
          blocks: [
            [
              `${C.legalName}, ${ADDRESS}, Nederland`,
              `KvK-nummer: ${C.kvk}`,
              `E-mail: ${C.email}`,
            ],
          ],
        },
        {
          heading: "Welke gegevens we gebruiken",
          blocks: [
            [
              "Bestelgegevens: naam, adres, e-mailadres, telefoonnummer, bestelde producten en de betaalstatus.",
              "Berichten die je ons stuurt via het contactformulier, e-mail of WhatsApp, met je naam en contactgegevens.",
              "Je e-mailadres als je je inschrijft voor de nieuwsbrief.",
              "Technische gegevens: je IP-adres in de serverlogs van onze hostingpartij, kort bewaard voor de beveiliging, en je winkelwagen, verlanglijst en taalkeuze, die op je eigen apparaat worden opgeslagen.",
            ],
            "We volgen je niet en tonen geen advertenties op basis van je gedrag. De website gebruikt geen analyse- of trackingcookies.",
          ],
        },
        {
          heading: "Waarom we die gegevens gebruiken",
          blocks: [
            [
              "Om je bestelling te verwerken, te versturen en je daarbij te helpen. Dit is nodig voor de koop.",
              "Om je vraag te beantwoorden als je contact met ons opneemt. Dit doen we op basis van ons gerechtvaardigd belang, of omdat het om je bestelling gaat.",
              "Om je de nieuwsbrief te sturen. Dit doen we alleen met je toestemming, en die kun je altijd intrekken.",
              "Om te voldoen aan de wet, zoals de fiscale plicht om facturen te bewaren.",
            ],
          ],
        },
        {
          heading: "Met wie we gegevens delen",
          blocks: [
            "We verkopen je gegevens nooit. We delen ze alleen met partijen die nodig zijn om onze dienst te leveren en die ze uitsluitend in onze opdracht gebruiken:",
            [
              "Shopify, ons webwinkelplatform, voor bestellingen en het afrekenen.",
              "Betaalpartijen, voor het verwerken van je betaling.",
              "Vervoerders, voor het bezorgen van je pakket.",
              "Vercel, voor het hosten van de website.",
              "Resend, voor het versturen van e-mails vanuit de website (servers in de EU).",
              "WhatsApp (Meta), als je ons via WhatsApp een bericht stuurt.",
            ],
            "Sommige van deze partijen kunnen gegevens buiten de Europese Economische Ruimte verwerken, bijvoorbeeld in de Verenigde Staten. Dat gebeurt alleen met passende waarborgen, zoals het EU-VS-gegevensprivacykader of de standaardcontractbepalingen van de Europese Commissie.",
          ],
        },
        {
          heading: "Hoe lang we gegevens bewaren",
          blocks: [
            [
              "Bestel- en factuurgegevens: 7 jaar, vanwege de fiscale bewaarplicht.",
              "Berichten aan onze klantenservice: tot 2 jaar na het laatste contact.",
              `Je inschrijving voor de nieuwsbrief: tot je je uitschrijft. Uitschrijven kan altijd met een mailtje naar ${C.email}.`,
            ],
          ],
        },
        {
          heading: "Beveiliging",
          blocks: [
            "We beveiligen je gegevens met passende maatregelen, zoals een versleutelde verbinding (https) en beperkte toegang tot gegevens.",
          ],
        },
        {
          heading: "Jouw rechten",
          blocks: [
            `Je mag je gegevens inzien, laten corrigeren of verwijderen, de verwerking laten beperken, bezwaar maken en je gegevens laten overdragen. Heb je toestemming gegeven, dan kun je die altijd intrekken. Stuur je verzoek naar ${C.email}; we reageren binnen een maand.`,
            "Ben je niet tevreden over hoe we met je gegevens omgaan, dan kun je een klacht indienen bij de [Autoriteit Persoonsgegevens](https://autoriteitpersoonsgegevens.nl).",
          ],
        },
        {
          heading: "Wijzigingen",
          blocks: ["We kunnen deze verklaring aanpassen. De nieuwste versie staat altijd op deze pagina."],
        },
      ],
    },

    cookies: {
      title: "Cookies",
      intro: "Kort gezegd: we gebruiken alleen wat nodig is om de webwinkel te laten werken.",
      sections: [
        {
          heading: "Wat we opslaan",
          blocks: [
            "De website gebruikt geen analyse-, marketing- of trackingcookies. Daarom vragen we je ook niet om toestemming met een cookiemelding.",
            [
              "Een taalcookie (NEXT_LOCALE), die onthoudt in welke taal je de website bekijkt.",
              "Je winkelwagen en verlanglijst, die in je browser worden bewaard, zodat ze er nog zijn als je later terugkomt.",
            ],
            "Deze gegevens blijven op je eigen apparaat en gebruiken we niet om je te volgen.",
          ],
        },
        {
          heading: "Afrekenen via Shopify",
          blocks: [
            "Bij het afrekenen ga je naar een beveiligde betaalpagina van Shopify. Shopify gebruikt daar eigen, noodzakelijke cookies om je betaling veilig af te handelen. Daarvoor geldt het cookiebeleid van Shopify.",
          ],
        },
        {
          heading: "Zelf verwijderen",
          blocks: [
            "Je kunt opgeslagen gegevens altijd verwijderen via de instellingen van je browser. Je winkelwagen en verlanglijst worden dan leeggemaakt.",
          ],
        },
        {
          heading: "Vragen",
          blocks: [`Mail ons gerust via ${C.email}. Meer over je gegevens lees je in onze [privacyverklaring](/privacy).`],
        },
      ],
    },
  },
};

const en: LegalCopy = {
  home: "Home",
  updatedLabel: "Last updated",
  updated: "15 November 2026",
  docs: {
    terms: {
      title: "Terms and conditions",
      intro: `These terms apply to every order from ${C.tradeName}, on nautictalk.nl and on our other country domains.`,
      sections: [
        {
          id: "wie-wij-zijn",
          heading: "1. Who we are",
          blocks: [
            `${C.tradeName} is a trade name of ${C.legalName}`,
            [
              `${C.legalName}, ${ADDRESS}, the Netherlands`,
              `Chamber of Commerce (KvK) number: ${C.kvk}`,
              `VAT number: ${C.vat}`,
              `Email: ${C.email}`,
              `Phone and WhatsApp: ${C.phone} (Mon to Fri, 9:00 to 18:00 CET)`,
            ],
          ],
        },
        {
          heading: "2. When these terms apply",
          blocks: [
            "These terms apply to every offer we make and to every distance purchase you make from us. You can read and save them before you order.",
            "If a product has additional terms that conflict with these, you can always rely on the provision that is most favourable to you.",
          ],
        },
        {
          heading: "3. Our offer",
          blocks: [
            "We describe our products as completely and accurately as we can. Images show the product faithfully, but small differences in colour or finish are possible. Obvious mistakes or errors in the offer do not bind us.",
          ],
        },
        {
          heading: "4. How the purchase is made",
          blocks: [
            "The purchase is made as soon as you complete your order at checkout. You receive a confirmation by email straight away.",
            "We may refuse or cancel an order if there is a good reason, for example an obvious pricing error or a product that is no longer available. You then get your money back in full.",
          ],
        },
        {
          id: "prijzen",
          heading: "5. Prices and shipping costs",
          blocks: [
            [
              "All prices are in euros and include VAT.",
              "You see the shipping costs at checkout, before you order. Orders from €120 ship for free.",
              "The price you see when you order is the price you pay.",
            ],
          ],
        },
        {
          heading: "6. Payment",
          blocks: [
            "You pay at checkout with one of the payment methods shown there. Payment is processed securely through our shop platform Shopify and the payment providers involved. We ship your order as soon as the payment has been received.",
          ],
        },
        {
          id: "levering",
          heading: "7. Delivery",
          blocks: [
            "We deliver to the countries you can choose at checkout. Products in stock usually ship within 1 to 3 working days.",
            "If we cannot deliver within 30 days of your order, we will tell you and you may cancel the order free of charge. You then get your money back within 14 days.",
            "Until the parcel has been delivered to you (or to someone you appoint), the risk of loss or damage lies with us.",
          ],
        },
        {
          id: "retourneren",
          heading: "8. Returns and right of withdrawal",
          blocks: [
            "You may return your order within 30 days of receiving it, without giving a reason. That is longer than the legal 14 days. How this works, and the model withdrawal form, can be found on the [Returns](/retourneren) page.",
          ],
        },
        {
          id: "garantie",
          heading: "9. Warranty",
          blocks: [
            "You are always entitled to a product that works as you may reasonably expect (the legal guarantee). If it does not, we repair or replace it, or you get (part of) your money back.",
            `In addition, ${C.legalName} gives a 2-year warranty on defects in materials and workmanship, from the date of purchase and in every country we deliver to. This warranty comes on top of your legal rights and does not limit them.`,
            "Not covered by this warranty: damage from incorrect use, accidents or your own repairs, and normal wear of parts such as ear cushions and wind covers.",
            `Report a defect with your order number and a short description via ${C.email}, preferably within 2 months of discovering it.`,
          ],
        },
        {
          heading: "10. Complaints",
          blocks: [
            `Not happy with something? Let us know via ${C.email} or WhatsApp. We confirm your complaint within 3 working days and give a full response within 14 days, or tell you when you can expect one.`,
            "If we cannot resolve it together, you can take the dispute to the competent court.",
          ],
        },
        {
          heading: "11. Liability",
          blocks: [
            "We are liable for damage caused by a failure that can be attributed to us, within the limits of the law. We are not liable for damage caused by incorrect use of a product or by not following the instructions.",
            "Always use an intercom according to the instructions and the rules that apply where you use it, for example in traffic or on the water.",
          ],
        },
        {
          heading: "12. Personal data",
          blocks: ["How we handle your data is explained in our [privacy policy](/privacy)."],
        },
        {
          heading: "13. Applicable law",
          blocks: [
            "Dutch law applies to these terms and to every purchase from us. If you live in another EU country, you keep the protection that the mandatory rules of that country give you. The UN Convention on Contracts for the International Sale of Goods (CISG) does not apply.",
          ],
        },
        {
          heading: "14. Changes",
          blocks: [
            "We may change these terms. Your order is covered by the terms as they were at the moment you ordered.",
          ],
        },
      ],
    },

    returns: {
      title: "Returns",
      intro: "Not quite what you were looking for? You may return your order within 30 days, without giving a reason.",
      sections: [
        {
          heading: "30 days to change your mind",
          blocks: [
            "The law gives you 14 days to withdraw from an online purchase. We give you 30. The period starts on the day after you, or someone you appoint, receive the product. If your order arrives in several parcels, it starts after the last one arrives.",
          ],
        },
        {
          heading: "How to report a return",
          blocks: [
            `Let us know within the 30 days that you want to return. You can do this with a clear email to ${C.email}, or with the model form below. Include your name, your order number and which products you are returning. We will then send you the return address.`,
            "Then send the product back within 14 days of letting us know.",
          ],
        },
        {
          heading: "Condition",
          blocks: [
            "You may unpack and inspect the product as you would in a shop. Return it complete, with all parts and accessories, and in the original packaging where possible. If you have used the product more than was needed to judge it, we may deduct the loss in value from your refund.",
          ],
        },
        {
          heading: "Return shipping costs",
          blocks: [
            "The cost of sending the product back is yours, unless the product is defective or we sent the wrong item. Preferably use a tracked service and keep your proof of postage.",
          ],
        },
        {
          heading: "Your refund",
          blocks: [
            "We refund the full purchase amount, including the standard shipping costs of your order, no later than 14 days after you report the return. We may wait to refund until we have received the product or until you show that you have sent it back. We refund via the same payment method, unless you agree to something else.",
          ],
        },
        {
          heading: "Defective or wrong item?",
          blocks: [
            "That falls under your [warranty](/voorwaarden#garantie), not under returns. Contact us and we will sort it out and pay the shipping costs.",
          ],
        },
        {
          id: "modelformulier",
          heading: "Model withdrawal form",
          blocks: [
            "Only complete this form if you want to withdraw from the purchase. You can copy the text into an email or print it.",
            {
              form: [
                `To: ${C.legalName} (${C.tradeName}), ${ADDRESS}, the Netherlands, ${C.email}`,
                "I/We* hereby give notice that I/We* withdraw from my/our* contract of sale of the following goods:",
                "Ordered on* / received on*:",
                "Name of consumer(s):",
                "Address of consumer(s):",
                "Signature of consumer(s) (only if this form is notified on paper):",
                "Date:",
                "* Delete as appropriate.",
              ],
            },
          ],
        },
      ],
    },

    privacy: {
      title: "Privacy policy",
      intro: `${C.legalName} (trade name ${C.tradeName}) handles your personal data with care. Here you can read which data we use, why, and what your rights are.`,
      sections: [
        {
          heading: "Who is responsible",
          blocks: [
            [
              `${C.legalName}, ${ADDRESS}, the Netherlands`,
              `Chamber of Commerce (KvK) number: ${C.kvk}`,
              `Email: ${C.email}`,
            ],
          ],
        },
        {
          heading: "Which data we use",
          blocks: [
            [
              "Order details: name, address, email address, phone number, the products you ordered and the payment status.",
              "Messages you send us via the contact form, email or WhatsApp, with your name and contact details.",
              "Your email address if you sign up for the newsletter.",
              "Technical data: your IP address in our hosting provider's server logs, kept briefly for security, and your cart, wishlist and language choice, which are stored on your own device.",
            ],
            "We do not track you or show ads based on your behaviour. The website uses no analytics or tracking cookies.",
          ],
        },
        {
          heading: "Why we use this data",
          blocks: [
            [
              "To process and ship your order and help you with it. This is needed for the purchase.",
              "To answer your question when you contact us. We do this based on our legitimate interest, or because it concerns your order.",
              "To send you the newsletter. We only do this with your consent, which you can withdraw at any time.",
              "To comply with the law, such as the tax obligation to keep invoices.",
            ],
          ],
        },
        {
          heading: "Who we share data with",
          blocks: [
            "We never sell your data. We only share it with parties we need to provide our service, who use it solely on our behalf:",
            [
              "Shopify, our shop platform, for orders and checkout.",
              "Payment providers, to process your payment.",
              "Carriers, to deliver your parcel.",
              "Vercel, to host the website.",
              "Resend, to send emails from the website (servers in the EU).",
              "WhatsApp (Meta), if you message us on WhatsApp.",
            ],
            "Some of these parties may process data outside the European Economic Area, for example in the United States. This only happens with appropriate safeguards, such as the EU-US Data Privacy Framework or the European Commission's standard contractual clauses.",
          ],
        },
        {
          heading: "How long we keep data",
          blocks: [
            [
              "Order and invoice details: 7 years, because of the legal tax retention period.",
              "Messages to our customer service: up to 2 years after the last contact.",
              `Your newsletter signup: until you unsubscribe. You can unsubscribe at any time by emailing ${C.email}.`,
            ],
          ],
        },
        {
          heading: "Security",
          blocks: [
            "We protect your data with appropriate measures, such as an encrypted connection (https) and limited access to data.",
          ],
        },
        {
          heading: "Your rights",
          blocks: [
            `You may access, correct or delete your data, restrict its processing, object to it, and have your data transferred. If you gave consent, you can withdraw it at any time. Send your request to ${C.email}; we respond within one month.`,
            "If you are not satisfied with how we handle your data, you can file a complaint with the Dutch Data Protection Authority, the [Autoriteit Persoonsgegevens](https://autoriteitpersoonsgegevens.nl).",
          ],
        },
        {
          heading: "Changes",
          blocks: ["We may update this policy. The latest version is always on this page."],
        },
      ],
    },

    cookies: {
      title: "Cookies",
      intro: "In short: we only use what is needed to make the shop work.",
      sections: [
        {
          heading: "What we store",
          blocks: [
            "The website uses no analytics, marketing or tracking cookies. That is why we do not ask for your consent with a cookie banner.",
            [
              "A language cookie (NEXT_LOCALE) that remembers which language you view the site in.",
              "Your cart and wishlist, kept in your browser so they are still there when you come back.",
            ],
            "This data stays on your own device and we do not use it to track you.",
          ],
        },
        {
          heading: "Checkout via Shopify",
          blocks: [
            "At checkout you go to a secure payment page run by Shopify. Shopify uses its own necessary cookies there to handle your payment safely. Shopify's cookie policy applies to those.",
          ],
        },
        {
          heading: "Deleting it yourself",
          blocks: [
            "You can delete stored data at any time in your browser settings. Your cart and wishlist will then be emptied.",
          ],
        },
        {
          heading: "Questions",
          blocks: [`Feel free to email us at ${C.email}. More about your data is in our [privacy policy](/privacy).`],
        },
      ],
    },
  },
};

export function getLegalCopy(locale: string): LegalCopy {
  return locale === "en" ? en : nl;
}
