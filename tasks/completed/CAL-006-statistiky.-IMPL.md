# CAL-006: Statistiky – implementace

## Změněné soubory

- `src/index.html` – přidáno tlačítko 📊 do headeru, přidán modal `#statsModal`
- `src/app.js` – přidán statistický modul (konstanty, výpočty, renderování grafů)
- `src/styles.css` – přidány styly pro statistický modal, karty, donut a sloupcový graf

## Co bylo implementováno

### Tlačítko v headeru
Ikona `📊` přidána do `header-right` před tisk.

### Modal statistik
- Overlay `.modal-stats` (max 900 px, 95vw)
- Přepínač období: **Tento týden** / **Tento měsíc** (class `.is-active`)
- 6 statistických karet
- Sekce s donut grafem + stacked bar grafem

### Statistické karty
1. Celkem událostí
2. Celkem hodin
3. Volný čas (pracovní doba minus kategorie work)
4. Nejzaneprázdněnější den
5. Nejčastější kategorie
6. Průměr událostí / den

### Donut graf (SVG)
- Vykreslen čistým SVG (bez knihovny)
- Segmenty odpovídají kategorii, barvy z `CATEGORY_CHART_COLORS`
- Hover tooltip s názvem a počtem hodin
- Středový popisek s celkovou hodinou
- Legenda vpravo

### Stacked bar chart (SVG)
- X osa: dny v období, Y osa: hodiny
- Sloupce skládané po kategoriích (barvy z `CATEGORY_CHART_COLORS`)
- Mřížka a popisky os
- Scroll při překročení šířky

### Barvy kategorií
```
work:          #4A90D9
personal:      #F48FB1
health:        #66BB6A
family:        #E8913A
education:     #AB47BC
entertainment: #26C6DA
```

### Opakující se události
Funkce `getEventsForDate()` je volána pro každý den v období – správně rozvinuje i opakující se události.

### Klávesové zkratky
Escape zavírá i statistický modal (přidáno do existujícího listeneru).
