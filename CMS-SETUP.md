# PhoneTech CMS — Setup návod

Tento dokument popisuje **jednorázový setup** abys mohl pustit Decap CMS pro klienta.
Po dokončení se klient přihlašuje na `https://phonetech.cz/admin` a sám si edituje články.

---

## Krok 1 — Vytvoř GitHub OAuth App (5 min)

1. Otevři https://github.com/settings/developers
2. Klikni **New OAuth App**
3. Vyplň:
   - **Application name:** `PhoneTech CMS`
   - **Homepage URL:** `https://phonetech.cz`
   - **Authorization callback URL:** `https://phonetech.cz/api/callback`
4. Klikni **Register application**
5. Na další stránce klikni **Generate a new client secret**
6. **Zkopíruj si** dvě hodnoty (potřebuješ je v Kroku 2):
   - `Client ID` (např. `Iv1.abc123…`)
   - `Client secret` (dlouhý random string — **GitHub ho ukáže jen jednou!**)

⚠️ Pokud si secret zapomeneš zkopírovat, musíš vygenerovat nový.

---

## Krok 2 — Přidej env vars do Vercelu (3 min)

1. Otevři https://vercel.com/dashboard
2. Klikni na projekt **phonetech-cz**
3. **Settings** → **Environment Variables**
4. Přidej dvě proměnné:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `GITHUB_CLIENT_ID` | hodnota z Kroku 1 | Production, Preview, Development |
   | `GITHUB_CLIENT_SECRET` | hodnota z Kroku 1 | Production, Preview, Development |

5. Klikni **Save** u každé
6. **Deployments** → najdi poslední deploy → tři tečky → **Redeploy** (aby se env vars načetly)

---

## Krok 3 — Pozvi klienta jako collaboratora (2 min)

Klient potřebuje přístup k repu, aby Decap mohl jeho jménem commitovat.

1. Otevři https://github.com/OfucikRobology/phonetech-cz/settings/access
2. **Add people** → zadej GitHub username klienta nebo jeho email
3. Vyber roli **Write** (může commitovat, ale ne mazat repo / měnit nastavení)
4. Klient dostane email s pozvánkou — musí ji přijmout

⚠️ Pokud klient nemá GitHub účet:
- Pošli mu odkaz https://github.com/signup
- Username klient zvolí libovolný (např. `tomas-stoklasa`)
- Po vytvoření účtu mu pošli pozvánku

---

## Krok 4 — Otestuj CMS (3 min)

1. Otevři https://phonetech.cz/admin
2. Klikni **Login with GitHub**
3. Autorizuj aplikaci PhoneTech CMS
4. Měl bys vidět seznam 3 existujících článků
5. Zkus vytvořit testovací článek → **Publish**
6. Za ~30s by se měl objevit na https://phonetech.cz/blog.html
7. Smaž testovací článek

---

## Co posíláš klientovi

Po dokončení setupu pošli klientovi:

### 1) Přístupové údaje
- URL: `https://phonetech.cz/admin`
- Klient se přihlašuje **svým GitHub účtem** (po přijetí pozvánky z Kroku 3)

### 2) Krátký návod (zkopíruj klientovi):

> **Jak přidat nový článek na blog:**
>
> 1. Otevřete https://phonetech.cz/admin
> 2. Klikněte **Login with GitHub** a přihlaste se
> 3. Klikněte **Blog články** v levém menu
> 4. **+ New Blog články** (vpravo nahoře)
> 5. Vyplňte:
>    - **Titulek** — hlavní nadpis
>    - **Datum publikace** — kdy se článek objeví
>    - **Kategorie** — vyberte ze seznamu
>    - **Doba čtení** — odhad v minutách
>    - **Náhledový obrázek** — přetáhněte obrázek z plochy (1200×800 px optimální)
>    - **Perex** — 2-3 věty, zobrazí se v náhledu
>    - **Doporučený článek** — pokud zapnete, článek se zobrazí jako hlavní
>    - **Obsah** — hlavní text s formátováním
> 6. Vpravo nahoře **Save** (uloží jako rozpracovaný) nebo **Publish** (publikuje)
> 7. Za ~30s je článek živý na webu
>
> **Editace existujícího článku:**
> 1. Klikněte na článek v seznamu
> 2. Upravte a klikněte **Publish**
>
> **Smazání článku:**
> 1. Otevřete článek
> 2. Vpravo dole tlačítko **Delete**

---

## Troubleshooting

**„Login with GitHub" nefunguje**
- Zkontroluj, že callback URL v GitHub OAuth App je přesně `https://phonetech.cz/api/callback`
- Zkontroluj, že env vars na Vercelu jsou nastavené (Settings → Env Vars)
- Po přidání env vars musíš redeployovat (deploy je cached jinak)

**„This site cannot be loaded due to a configuration error"**
- Pravděpodobně chybí `GITHUB_CLIENT_ID` env var — viz Krok 2

**Klient vidí 404 při uložení článku**
- Klient nemá Write přístup do repa — viz Krok 3

**Článek se uložil, ale nezobrazuje se na webu**
- Vercel build pravděpodobně failuje. Otevři Vercel dashboard → Deployments → poslední → klikni na něj a podívej se na build log.
- Časté: chybí povinné pole (titulek, datum, obrázek)

**Klient chce smazat článek ale nevidí Delete tlačítko**
- Smazání je povolené v `admin/config.yml` (parametr `delete: true`) - mělo by fungovat. Pokud ne, znovu publish editovaný článek.

---

## Architektura — jak to funguje pod kapotou

```
Klient (browser)
   ↓ phonetech.cz/admin
Decap CMS UI (statický HTML v /admin/)
   ↓ "Login with GitHub"
/api/auth → redirect na GitHub OAuth
   ↓ klient autorizuje
GitHub → /api/callback s authorization code
   ↓ výměna code za access token
Decap má token → může commitovat do GitHubu
   ↓ klient klikne Publish
GitHub API: commit MD do /content/blog/<slug>.md
   ↓ webhook
Vercel build:
   1. npm install
   2. npm run build → node scripts/build-blog.mjs
      - načte všechny /content/blog/*.md
      - vygeneruje /blog/<slug>.html z _template.html
      - aktualizuje featured + grid v blog.html
   3. deploy
   ↓ ~30s
phonetech.cz aktualizován
```

## Údržba

- Build script: `/scripts/build-blog.mjs` — pokud chceš upravit jak vypadá karta článku, edituj zde
- Šablona detailu: `/blog/_template.html` — vzhled samotné stránky článku
- CMS konfigurace: `/admin/config.yml` — přidání nového pole, kategorie apod.
- OAuth proxy: `/api/auth.js` + `/api/callback.js` — řeší přihlášení, neměň zbytečně

## Náklady

- **Vercel:** zdarma (hobby tier) — Decap nepřidává žádný traffic navíc
- **GitHub:** zdarma — soukromý repo s neomezeným provozem
- **Decap CMS:** open-source zdarma, navždy
- **Klient GitHub účet:** zdarma

**Celkem: 0 Kč / měsíc**
