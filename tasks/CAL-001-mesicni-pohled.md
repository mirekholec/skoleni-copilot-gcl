# CAL-001: Měsíční pohled

**Summary:** Měsíční pohled kalendáře
**Priorita:** High
**Story points:** 5
**Labels:** feature, view

## Popis

Přidat do kalendáře měsíční pohled jako alternativu k týdennímu zobrazení.

## Požadavky

- V headeru přidat přepínač zobrazení: "Týden" / "Měsíc"
- Měsíční pohled zobrazí klasickou mřížku 7 sloupců × 5 (nebo 6) řádků
- Každá buňka = jeden den, v záhlaví den v týdnu (Po, Út, St, ...)
- V buňce zobrazit číslo dne a max 3 události jako barevné proužky s názvem
- Pokud je událostí více než 3, zobrazit "+N dalších" s možností rozkliknout
- Dny mimo aktuální měsíc zobrazit šedě (předchozí/následující měsíc)
- Zvýraznit dnešní den
- Navigace: předchozí/další měsíc, tlačítko "Dnes"
- Kliknutí na den přepne do týdenního pohledu na odpovídající týden

## Technické poznámky

- Využít CSS Grid pro mřížku (grid-template-columns: repeat(7, 1fr))
- Generování dní měsíce: pozor na první den měsíce (může být kterýkoli den v týdnu)
- Měsíční pohled čte stejná data z localStorage jako týdenní
- Aktuální view ("week"/"month") uložit do localStorage settings

## Akceptační kritéria

- [ ] Přepínač Týden/Měsíc je viditelný v headeru
- [ ] Měsíční grid zobrazuje správný počet dní
- [ ] Události se zobrazují jako barevné proužky podle kategorie
- [ ] Klik na den přepne do týdenního pohledu
- [ ] Navigace mezi měsíci funguje
- [ ] Dnešní den je vizuálně zvýrazněný
