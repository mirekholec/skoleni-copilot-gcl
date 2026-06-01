# CopilotCal – Product Requirements Document

## Vize

CopilotCal je osobní týdenní kalendář běžící v prohlížeči. Aplikace je postavená čistě na HTML, CSS a vanilla JavaScriptu bez frameworků. Data se ukládají do localStorage prohlížeče. Při prvním spuštění se načtou ukázková data z JSON souboru.

## Cílová skupina

Kdokoliv, kdo chce jednoduchý osobní kalendář bez nutnosti registrace a cloudových služeb – vše běží lokálně v prohlížeči.

## Základní verze (MVP)

### Týdenní pohled

- Zobrazení jednoho týdne (pondělí–neděle)
- Časová osa po hodinách (vertikální, 00:00–23:59)
- Zvýrazněné pracovní hodiny (08:00–18:00)
- Zvýraznění dnešního dne
- Navigace: tlačítka "předchozí týden" / "další týden" / "dnes"
- Zobrazení čísla týdne a rozsahu dat (např. "Týden 10: 3. – 9. března 2025")

### Události

- Události se zobrazují jako barevné bloky v časové ose
- Výška bloku odpovídá délce události
- Barva podle kategorie
- Na bloku viditelné: název, čas, lokace (zkráceně)
- Po kliknutí na událost se otevře detail

### Detail události

- Zobrazení všech informací: název, popis, datum, čas, kategorie, lokace, priorita, připomínka
- Indikátor opakování (pokud je recurring)
- Tlačítka: Upravit / Smazat

### Vytvoření a editace události

- Kliknutím na prázdný slot v kalendáři se otevře formulář pro novou událost
- Formulář obsahuje: název, popis, datum, čas od/do, kategorie (dropdown), lokace, priorita (low/medium/high), připomínka (minuty), opakování
- Validace: název je povinný, čas konce musí být po čase začátku
- Při editaci se formulář předvyplní stávajícími hodnotami

### Kategorie a filtrování

- Sidebar nebo horní lišta s kategoriemi (Práce, Osobní, Zdraví, Rodina, Vzdělávání)
- Kliknutím na kategorii se zapne/vypne její zobrazení
- Každá kategorie má svou barvu a ikonu

### Persistence dat

- Všechna data (události, nastavení) se ukládají do localStorage
- Při prvním spuštění (prázdný localStorage) se načtou ukázková data z `data/events.json`
- Změny se ukládají okamžitě (není potřeba tlačítko "Uložit")

### Design a UX

- Responzivní layout (na mobilu se zobrazí zjednodušená verze – denní pohled nebo seznam)
- Čistý, moderní design inspirovaný Google Calendar
- Barevné rozlišení kategorií s dostatečným kontrastem
- Smooth přechody při navigaci mezi týdny
- Drag & drop není součástí MVP

### Technické požadavky

- Žádný framework – čistý HTML, CSS, JavaScript
- Seed data se načítají z `data/events.json` pomocí `fetch()`
- Veškerá data uložena v localStorage pod klíčem `copilotcal_events` a `copilotcal_settings`
- Kód je čistý, komentovaný a dobře strukturovaný
- CSS využívá custom properties pro konzistentní theming
- Čas a data se formátují podle české lokalizace

## Datový model

Viz `data/events.json`. Každá událost obsahuje:

| Pole | Typ | Popis |
|------|-----|-------|
| id | string | Unikátní identifikátor |
| title | string | Název události |
| description | string | Popis / poznámky |
| date | string | Datum (YYYY-MM-DD) |
| startTime | string | Čas začátku (HH:MM) |
| endTime | string | Čas konce (HH:MM) |
| category | string | Kategorie (work, personal, health, family, education) |
| location | string | Místo konání |
| recurring | object/null | Opakování (type + days) nebo null |
| reminder | number/null | Připomínka v minutách před začátkem |
| priority | string | low / medium / high |
| color | string | HEX barva (odvozená z kategorie) |

Nastavení:

| Pole | Typ | Popis |
|------|-----|-------|
| weekStartsOn | string | "monday" / "sunday" |
| workingHours | object | start a end pracovní doby |
| defaultView | string | "week" |
| defaultReminderMinutes | number | Výchozí připomínka |
| timeFormat | string | "24h" / "12h" |
| locale | string | Lokalizace (cs-CZ) |

## Struktura projektu

```
copilot-calendar/
├── index.html
├── style.css
├── app.js
├── data/
│   └── events.json
├── PRD.md
└── README.md
```

## Mimo scope MVP

Následující funkce nejsou součástí základní verze a **nebudou nyní implementovány**.

- Měsíční pohled
- Denní pohled
- Drag & drop přesouvání událostí
- Drag na spodním okraji události pro změnu délky
- Tmavý režim (dark mode)
- Export/import dat (JSON, iCal)
- Sdílení události (generování odkazu)
- Konflikty událostí (vizuální varování při překryvu)
- Vyhledávání v událostech
- Statistiky (kolik času trávím v které kategorii)
- Notifikace v prohlížeči (Notification API)
- Tisk týdenního pohledu
- Klávesové zkratky
- Multi-day události (přes více dní)
