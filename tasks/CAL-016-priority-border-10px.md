# CAL-016: Priority Border 10px

**Summary:** Zvýšení šířky levého okraje pro indikátor priority na 10px pro lepší viditelnost
**Priorita:** Medium
**Story points:** 2
**Labels:** feature, ux

## Popis

Rozšíření indikátoru priority přidaného v CAL-015 na větší šířku 10px pro lepší vizuální odlišení a čitelnost. Odsunuta současně prioritní indikátor nalevo od obsahu bloku.

## Požadavky

- [ ] Každý event block v týdenním pohledu má barevný levý okraj podle priority
- [ ] Barvy: low = `#22C55E` (zelená), medium = `#F59E0B` (žlutá), high = `#EF4444` (červená)
- [ ] Okraj má šířku 10px
- [ ] Obsah bloku má dostatečný offset, aby nebyl překryt okrajem

## Technické poznámky

- Přidat CSS třídy `.priority-low`, `.priority-medium`, `.priority-high` do `src/styles.css`
- Ve funkci `createEventBlock()` v `src/app.js` přidat odpovídající třídu na element podle `event.priority`
- CSS vlastnost `border-left` přepíše stávající border, takže není potřeba měnit existující styly
- Zajistit, aby padding levého obsahu bloku vyhovoval 10px okraji

## Implementační plán

1. Přidat CSS třídy pro priority do `src/styles.css` v sekci „Bloky událostí" s 10px levým okrajem
2. Ve funkci `createEventBlock()` v `src/app.js` přidat `block.classList.add('priority-' + event.priority)`

## Akceptační kritéria

- [ ] Události s nízkou prioritou mají zelený levý okraj (10px)
- [ ] Události se střední prioritou mají žlutý levý okraj (10px)
- [ ] Události s vysokou prioritou mají červený levý okraj (10px)
- [ ] Okraj je dostatečně viditelný a nenarušuje čitelnost obsahu
- [ ] Barvy okraje se správně zobrazují přes různé barvy kategorií
