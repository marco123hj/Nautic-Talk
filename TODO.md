# Nautic Talk agenda

Laatst bijgewerkt: 18 november 2026

## Eerst (zonder dit kan niemand kopen)

- [ ] Verzendkosten instellen in Shopify: Markten > NL, DE, BE > Verzending. Nu staat er "Geen verzending", daardoor ziet Shopify alles als uitverkocht en lukt afrekenen niet. Marco beslist: prijs per land (NL, BE, DE) en vanaf welk bedrag gratis.
- [ ] Btw aanzetten in Shopify: Markten > NL, DE, BE > Belastingen staat op "Niet innen".
- [ ] Een echte testbestelling doen van begin tot eind (betalen, bevestigingsmail, pakbon).
- [ ] Betaalmethoden checken in Shopify (iDEAL, PayPal, kaart).

## Daarna

- [ ] Producttitels in Shopify staan in het Spaans (bijv. "Casco de Seguridad", "Gorra Náutica"). Vertalen naar Nederlands en Engels.
- [ ] Spanje toevoegen als markt in Shopify? Nu verkoopt de winkel alleen aan NL, BE en DE, terwijl nautictalk.es wel bestaat.
- [ ] Orderbevestigingsmails van Shopify nalopen (taal, logo, afzender).
- [ ] Instagram- en Facebook-links in de footer gaan nu naar instagram.com en facebook.com. Echte accounts invullen.
- [ ] Prijs van de petten checken: beide staan op € 59,29, net als de koptelefoonhouder.
- [ ] Tikfout in het contactformulier: "booglengte" moet "bootlengte" zijn.

## Loopt nu

- [ ] Webshop opnieuw ontwerpen: hij voelt nog te veel als AI-template.
  - [x] Logo: het golf-en-balken-logo uit oktober staat in header, footer en als tab-icoon (16 november, nog niet live).
  - [x] Winkel in webshop-stijl (zoals svb24): nieuwe kop met zoekbalk en categorieën, productkaarten met prijs, voorraad en winkelwagenknop, winkel-homepage, nieuwe productpagina (17 november, nog niet live).
  - [x] Productnamen tonen nu in het Nederlands en Engels (vaste lijst in lib/catalog.ts) tot ze in Shopify vertaald zijn.
  - [ ] Marco: foto's maken van Nautic Talk in gebruik op een boot (iemand aan het roer, iemand op de boeg). Die vervangen de twee kantoorfoto's.
  - [x] Productpagina zoals Hooked Japan: uitklapblokken (beschrijving, specificaties, verzending en retour) en een koopbalk die meeschuift (18 november, nog niet live).
  - [x] Reviewblok op de productpagina gebouwd, gekoppeld aan Judge.me zoals bij Hooked Japan (18 november, nog niet live).
  - [x] Judge.me (gratis plan) geïnstalleerd op de Nautic Talk-winkel, reviews via de website staan aan (18 november).
  - [x] Private token staat in .env.local, koppeling getest (18 november).
  - [ ] Bij deploy: Marco zet NAUTICTALK_JUDGEME_PRIVATE_TOKEN ook in Vercel, anders blijft het reviewblok weg op de live site.
  - [ ] Marco beslist: reviews direct online (nu zo ingesteld in Judge.me) of eerst zelf goedkeuren.
  - [ ] Checken: gesprekstijd Duo 10 uur en Trio 15 uur (zo staat het in Shopify).
  - [ ] Marco zegt "deploy" als het live mag.
  - [ ] Productbeschrijvingen staan nog in het Spaans. Vertalen (in Shopify of in de code).

## Klaar (15 november 2026)

- [x] Domeinen nautictalk.nl/.be/.de/.es/.eu gekoppeld, .nl is het hoofddomein.
- [x] Contact- en nieuwsbriefformulier versturen echt (via Resend).
- [x] Bedrijfsgegevens en juridische pagina's (voorwaarden, retourneren, privacy, cookies).
- [x] Afrekenen op checkout.nautictalk.nl in plaats van het myshopify-adres.
- [x] Checkout opent in de taal van de site (Nederlands of Engels).
- [x] Oude Spaanse Shopify-site stuurt door naar www.nautictalk.nl.

## Bewuste keuzes (geparkeerd)

- Herroepingsknop: weggelaten. Staat klaar op git-branch `herroepingsknop` als je hem later wilt.
- Fabrikantgegevens (GPSR): niet toegevoegd.
