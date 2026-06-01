# CAL-014: Chybějící kategorie Zábava ve formuláři

**Summary:** Doplnit kategorii „Zábava" do select dropdownu ve formuláři události
**Priorita:** Medium
**Story points:** 1
**Labels:** bug

## Popis

Kategorie „Zábava" (entertainment 🎬) je definována v konstantě `DEFAULT_CATEGORIES` v `app.js` a zobrazuje se v sidebaru, ale chybí v `<select>` dropdownu formuláře pro vytvoření/editaci události. Uživatel tedy nemůže vytvořit událost s kategorií Zábava.

## Požadavky

- [ ] Přidat `<option value="entertainment">🎬 Zábava</option>` do selectu `#inputCategory` v `index.html`
- [ ] Zajistit, že pořadí odpovídá pořadí v `DEFAULT_CATEGORIES`

## Technické poznámky

- Oprava se týká pouze souboru `src/index.html`
- Kategorie `entertainment` je poslední v `DEFAULT_CATEGORIES`, takže option přidat na konec selectu
- Barva kategorie je `#06B6D4` (cyan) a je již namapovaná na CSS proměnnou

## Implementační plán

1. V `src/index.html` najít `<select id="inputCategory">` a přidat nový `<option>` na konec seznamu

## Akceptační kritéria

- [ ] V dropdownu formuláře je dostupná kategorie „🎬 Zábava"
- [ ] Nově vytvořená událost s kategorií Zábava se správně zobrazí v kalendáři s cyan barvou
- [ ] Pořadí kategorií v dropdownu odpovídá pořadí v `DEFAULT_CATEGORIES`
