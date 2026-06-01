# CAL-012: Tooltip na událostech v týdenním pohledu

**Summary:** Přidat title atribut na bloky událostí pro zobrazení detailů při hoveru
**Priorita:** Low
**Story points:** 1
**Labels:** feature, ux

## Popis

V týdenním pohledu se při najetí myší na blok události nezobrazí žádný tooltip. Přidat `title` atribut na `.event-block` s názvem, časem a místem události, aby uživatel viděl základní informace bez nutnosti klikat.

## Požadavky

- [ ] Při hoveru nad blokem události v týdenním pohledu se zobrazí nativní tooltip prohlížeče
- [ ] Tooltip obsahuje: název události, čas (od – do) a místo (pokud je vyplněno)
- [ ] Formát tooltipu: `Název\nČas: HH:MM – HH:MM\nMísto: ...`

## Technické poznámky

- Upravit funkci `createEventBlock()` v `src/app.js`
- Nastavit `block.title` s víceřádkovým textem (oddělovač `\n`)
- Místo zobrazit pouze pokud `event.location` existuje

## Implementační plán

1. V `src/app.js` ve funkci `createEventBlock()` přidat nastavení `block.title` s formátovaným textem
2. Sestavit text tooltipu z `event.title`, `event.startTime`, `event.endTime` a volitelně `event.location`

## Akceptační kritéria

- [ ] Při najetí myší na událost v týdenním pohledu se zobrazí tooltip s názvem a časem
- [ ] Pokud má událost vyplněné místo, zobrazí se i to
- [ ] Tooltip se nezobrazuje s prázdnými řádky pro nevyplněná pole
