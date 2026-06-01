# CAL-011: Favicon pro aplikaci

**Summary:** Přidat SVG favicon s ikonou kalendáře do hlavičky stránky
**Priorita:** Low
**Story points:** 1
**Labels:** feature

## Popis

Aplikace nemá žádný favicon – v záložce prohlížeče se zobrazuje výchozí ikona. Přidat inline SVG favicon s emoji kalendáře 📅 přímo do `<head>` v `index.html`.

## Požadavky

- [ ] Přidat `<link rel="icon">` s inline SVG data URI do `<head>` v `index.html`
- [ ] Ikona by měla vizuálně odpovídat tématu kalendáře (emoji 📅 nebo jednoduchý SVG kalendář)
- [ ] Favicon musí fungovat ve všech moderních prohlížečích

## Technické poznámky

- Použít formát `data:image/svg+xml` pro inline SVG – není potřeba externí soubor
- SVG favicon je podporován ve všech moderních prohlížečích
- Umístit za existující `<meta>` tagy a před `<link rel="stylesheet">`

## Implementační plán

1. Vytvořit SVG ikonu kalendáře (jednoduchý tvar nebo text emoji)
2. Přidat `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,...">` do `<head>` v `src/index.html`

## Akceptační kritéria

- [ ] V záložce prohlížeče se zobrazuje ikona kalendáře místo výchozí ikony
- [ ] Favicon se správně zobrazuje v Chrome, Firefox a Safari
