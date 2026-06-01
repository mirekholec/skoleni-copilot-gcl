# CAL-004: Export a import dat

**Summary:** Export a import kalendářních dat
**Priorita:** Medium
**Story points:** 5
**Labels:** feature, data

## Popis

Umožnit uživateli exportovat a importovat kalendářní data pro zálohování nebo přenos mezi zařízeními.

## Požadavky

**Export:**
- Tlačítko "Export" v nastavení nebo headeru
- Stáhne všechny události jako JSON soubor
- Název souboru: `copilotcal-export-YYYY-MM-DD.json`
- Formát: stejný jako events.json (pole events + settings)
- Bonus: export do iCal formátu (.ics) pro import do Google Calendar / Outlook

**Import:**
- Tlačítko "Import" vedle exportu
- Otevře dialog pro výběr JSON souboru
- Po nahrání zobrazit preview: kolik událostí bude importováno
- Možnost volby: "Sloučit s existujícími" vs "Nahradit vše"
- Validace: zkontrolovat strukturu JSON před importem
- Po importu aktualizovat localStorage a překreslit kalendář

## Technické poznámky

- Export: vytvořit Blob z JSON.stringify, stáhnout přes dynamický `<a>` element
- Import: použít `<input type="file">` a FileReader API
- Validace importu: zkontrolovat přítomnost pole events, validní formát data a času
- Při sloučení: pokud existuje událost se stejným id, přepsat ji

## Akceptační kritéria

- [ ] Export stáhne validní JSON soubor
- [ ] Import načte soubor a zobrazí preview
- [ ] Sloučení i nahrazení funguje správně
- [ ] Nevalidní soubor zobrazí chybovou hlášku
- [ ] Po importu se kalendář překreslí s novými daty
