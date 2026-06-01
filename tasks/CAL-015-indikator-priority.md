# CAL-015: Indikátor priority na událostech

**Summary:** Vizuální rozlišení priority události pomocí barevného levého okraje
**Priorita:** Low
**Story points:** 1
**Labels:** feature, ux

## Popis

Události v týdenním pohledu nemají žádné vizuální rozlišení priority. Přidat barevný levý okraj na bloky událostí podle jejich priority: nízká = zelený, střední = žlutý, vysoká = červený.

## Požadavky

- [ ] Každý event block v týdenním pohledu má barevný levý okraj podle priority
- [ ] Barvy: low = `#22C55E` (zelená), medium = `#F59E0B` (žlutá), high = `#EF4444` (červená)
- [ ] Okraj je dostatečně viditelný (šířka 3–4px), ale nenarušuje stávající design

## Technické poznámky

- Přidat CSS třídy `.priority-low`, `.priority-medium`, `.priority-high` do `src/styles.css`
- Ve funkci `createEventBlock()` v `src/app.js` přidat odpovídající třídu na element podle `event.priority`
- CSS vlastnost `border-left` přepíše stávající border, takže není potřeba měnit existující styly

## Implementační plán

1. Přidat CSS třídy pro priority do `src/styles.css` v sekci „Bloky událostí"
2. Ve funkci `createEventBlock()` v `src/app.js` přidat `block.classList.add('priority-' + event.priority)`

## Akceptační kritéria

- [ ] Události s nízkou prioritou mají zelený levý okraj
- [ ] Události se střední prioritou mají žlutý levý okraj
- [ ] Události s vysokou prioritou mají červený levý okraj
- [ ] Barvy okraje se správně zobrazují přes různé barvy kategorií
