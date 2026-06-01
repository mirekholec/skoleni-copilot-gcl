# CAL-013: Počítadlo událostí v headeru

**Summary:** Zobrazit badge s počtem událostí aktuálního týdne/měsíce v hlavičce aplikace
**Priorita:** Low
**Story points:** 1
**Labels:** feature, ux

## Popis

Přidat do hlavičky aplikace malý badge (odznak) zobrazující celkový počet událostí v aktuálně zobrazeném týdnu nebo měsíci. Uživatel tak na první pohled vidí, kolik má naplánovaných událostí.

## Požadavky

- [ ] Vedle čísla týdne (nebo názvu měsíce) zobrazit badge s počtem událostí
- [ ] Počet se aktualizuje při navigaci, přepnutí pohledu a změně filtrů kategorií
- [ ] Badge se zobrazí pouze pokud je počet > 0
- [ ] Respektovat filtr aktivních kategorií (počítat pouze viditelné události)

## Technické poznámky

- Přidat nový `<span>` element s třídou `.event-count` do `.header-left` v `src/index.html` za `#weekRange`
- Přidat CSS styl pro `.event-count` badge (malý, kulatý, primární barva)
- Cachovat element v `dom.eventCount` v `cacheDomReferences()`
- Vytvořit pomocnou funkci `renderEventCount()` v `src/app.js`, volat ji z `renderCalendar()`, `renderMonthView()` a `handleCategoryToggle()`

## Implementační plán

1. Přidat `<span class="event-count" id="eventCount"></span>` do `.header-left` v `src/index.html`
2. Přidat CSS styl pro `.event-count` do `src/styles.css`
3. Cachovat `dom.eventCount` v `cacheDomReferences()` v `src/app.js`
4. Implementovat funkci `renderEventCount()` a zavolat ji na správných místech

## Akceptační kritéria

- [ ] V hlavičce se zobrazuje badge s počtem událostí aktuálního týdne
- [ ] V měsíčním pohledu badge ukazuje počet událostí aktuálního měsíce
- [ ] Počet respektuje filtr aktivních kategorií
- [ ] Badge se skryje, pokud je počet událostí 0
