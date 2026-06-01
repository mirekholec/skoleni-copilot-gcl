# CAL-010: Události přes více dní

**Summary:** Podpora multi-day událostí (dovolená, konference)
**Priorita:** High
**Story points:** 8
**Labels:** feature, data-model

## Popis

Přidat podporu pro události, které trvají více než jeden den – typicky dovolená, konference, služební cesty.

## Požadavky

- Nové pole v datovém modelu: `endDate` (string, YYYY-MM-DD, volitelné)
  - Pokud endDate chybí nebo je stejný jako date → jednodenní událost (současné chování)
  - Pokud endDate > date → multi-day událost
- **Zobrazení v týdenním pohledu:**
  - Multi-day událost se zobrazí jako průběžný pruh v horní části kalendáře (nad časovou osou)
  - Pruh se táhne přes všechny dny od date do endDate
  - Pokud událost přesahuje zobrazený týden, zobrazit jen viditelnou část (se šipkou naznačující pokračování)
- **Formulář:**
  - Přidat pole "Datum konce" (date input)
  - Checkbox "Celodenní událost" – pokud zaškrtnuto, skrýt časy
  - Validace: endDate >= date
- **Příklady multi-day událostí pro testování:**
  - Dovolená (5 dní, celodenní)
  - Konference (3 dny, 09:00–18:00 každý den)
  - Služební cesta (2 dny, celodenní)

## Technické poznámky

- Multi-day události jsou celodenní nebo mají čas (oba případy řešit)
- V týdenním pohledu: vyhradit prostor nad časovou osou pro multi-day pruhy
- Pokud se více multi-day událostí překrývá, naskládat je pod sebe
- Při generování pohledu na konkrétní týden: zjistit které multi-day události zasahují do zobrazeného týdne
- localStorage: uložit endDate jako volitelné pole

## Akceptační kritéria

- [ ] Formulář umožňuje zadat datum konce
- [ ] Multi-day události se zobrazují jako průběžné pruhy
- [ ] Pruhy se správně ořezávají na hranici týdne
- [ ] Překrývající se multi-day události se zobrazí pod sebou
- [ ] Jednodenní události fungují beze změn
- [ ] Data se správně ukládají a načítají z localStorage
