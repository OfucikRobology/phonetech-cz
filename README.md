# PhoneTech.cz

Custom redesign webu PhoneTech — servis mobilních telefonů, notebooků a elektroniky (Jindřichův Hradec & Praha).

## Stack

Statický site bez build-toolu — čisté HTML / CSS / vanilla JS s ES modules.

- **HTML** — 7 stránek + 3 blog články
- **CSS** — design tokens, base, components, sections, pages, animations (5 souborů přes `@import`)
- **JS** — vanilla ES modules (navbar, hero, animace, scroll reveal, parallax, magnetic, tilt, modal pro ceník)
- **Externí knihovny** přes CDN: GSAP, Swiper, Phosphor Icons
- **Fonty**: Google Fonts (Syne pro display, Inter pro body)

## Struktura

```
.
├── index.html              # Domů
├── sluzby.html             # Služby
├── cenik.html              # Ceník iPhone (modal popup s detaily)
├── blog.html               # Blog index
├── blog/                   # Articles
│   ├── jak-poznat-kvalitni-displej.html
│   ├── kdy-vymenit-baterii.html
│   └── telefon-spadl-do-vody.html
├── o-nas.html              # O nás
├── recenze.html            # Recenze
├── kontakt.html            # Kontakt + mapy
├── images/                 # Logo + Unsplash fotky
├── logos/                  # Brand logos (Apple, Samsung, ...)
├── favicon.svg
└── src/
    ├── data/               # pricing.js, devices.js
    ├── scripts/            # ES modules
    └── styles/             # CSS
```

## Lokální spuštění

```bash
python3 -m http.server 8000
# nebo
npx serve .
```

Otevři `http://localhost:8000`.

## Klíčové features

- 🎯 32 iPhone modelů s detailem oprav v modálu (15 typů oprav, 8-tier cenová matice)
- 🔍 Real-time search v hero sekci → otevře modal v ceníku
- 📱 Plně responzivní (mobile-first breakpointy)
- ✨ Sofistikované animace: scroll reveal, magnetic buttons, 3D tilt, parallax, text reveals
- 🎨 Auto-hide navigace při scrollu dolů
- 📨 Kontaktní formulář s URL prefill (klik na zařízení → předvyplněný kontakt)
- ♿ Accessibility: ARIA, focus management, keyboard navigation
- 🚀 Lighthouse-friendly: žádný build, lazy images, semantic HTML
