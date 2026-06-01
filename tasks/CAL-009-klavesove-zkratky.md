# CAL-009: Klávesové zkratky

**Summary:** Navigace a ovládání pomocí klávesnice
**Priorita:** Low
**Story points:** 3
**Labels:** feature, a11y, ux

## Popis

Přidat klávesové zkratky pro rychlé ovládání kalendáře bez myši.

## Požadavky

**Zkratky:**
- `←` / `→` – předchozí / další týden
- `T` – přejít na dnešní týden (Today)
- `N` – otevřít formulář nové události (New)
- `Escape` – zavřít otevřený modal / dropdown
- `Delete` nebo `Backspace` – smazat vybranou událost (s potvrzovacím dialogem)
- `E` – editovat vybranou událost (Edit)
- `S` – otevřít vyhledávání (Search, pokud je implementované)
- `?` – zobrazit nápovědu klávesových zkratek (modal s přehledem)
- `1` – týdenní pohled, `2` – měsíční pohled (pokud existuje)

**Chování:**
- Zkratky nefungují když je focus v input/textarea (aby nepsaly znaky do formuláře)
- Vybraná událost = poslední kliknutá (vizuální indikátor – outline)
- Nápověda (?) se zobrazí jako modal s přehlednou tabulkou

## Technické poznámky

- Jeden globální event listener na `keydown`
- Kontrola `event.target.tagName` – ignorovat pokud je INPUT, TEXTAREA, SELECT
- Udržovat stav `selectedEventId` pro Delete/Edit akce
- Nápovědu generovat dynamicky (snadno udržovatelné při přidávání zkratek)

## Akceptační kritéria

- [ ] Šipky navigují mezi týdny
- [ ] T přeskočí na aktuální týden
- [ ] N otevře formulář
- [ ] Escape zavře modaly
- [ ] ? zobrazí přehled zkratek
- [ ] Zkratky nefungují uvnitř formulářových polí
