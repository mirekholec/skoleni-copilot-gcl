# CAL-008: Tisk týdenního rozvrhu

**Summary:** Print-friendly verze týdenního pohledu
**Priorita:** Low
**Story points:** 2
**Labels:** feature, print

## Popis

Umožnit vytisknout aktuální týdenní pohled v optimalizovaném formátu.

## Požadavky

- Tlačítko "Tisk" (🖨️) v headeru
- Otevře nativní print dialog prohlížeče (window.print)
- Print-friendly layout:
  - Skrýt navigaci, header, sidebar, filtry, modaly
  - Zobrazit pouze kalendářní mřížku
  - Nad mřížkou: název "Týdenní rozvrh" + rozsah dat
  - Optimalizovaná typografie pro tisk (serif font, menší velikost)
  - Černobílé rozlišení kategorií: místo barev použít vzory (šrafování, tečky, plné) nebo alespoň silnější okraj
  - Každá událost: název, čas, lokace (jednořádkově pokud se vejde)
- Orientace: na šířku (landscape) – nastavit přes @page

## Technické poznámky

- Vše řešit přes @media print v CSS
- @page { size: landscape; margin: 1cm; }
- Schovat nepotřebné prvky: display: none
- Barvy kategorií: buď ponechat (moderní tiskárny to zvládnou) nebo přidat print-variantu

## Akceptační kritéria

- [ ] Tlačítko tisk otevře print dialog
- [ ] V náhledu je vidět pouze kalendář bez UI prvků
- [ ] Nad kalendářem je nadpis s rozsahem dat
- [ ] Události jsou čitelné v tištěné podobě
- [ ] Layout je na šířku
