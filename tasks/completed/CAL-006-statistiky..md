# CAL-006: Statistiky – jak trávím čas

**Summary:** Dashboard se statistikami využití času
**Priorita:** Medium
**Story points:** 5
**Labels:** feature, analytics

## Popis

Nová stránka nebo panel, který vizualizuje, jak uživatel tráví svůj čas na základě kalendářních dat.

## Požadavky

- Přístup přes tlačítko/ikonu "Statistiky" (📊) v headeru
- Přepínač období: tento týden / tento měsíc

**Vizualizace:**
- Koláčový/donut graf: poměr kategorií (v hodinách)
- Sloupcový graf: hodiny v kategoriích po dnech (stacked bar chart)
- Čísla v kartičkách:
  - Celkem událostí
  - Celkem hodin naplánovaných
  - Volný čas (v rámci pracovní doby)
  - Nejzaneprázdněnější den
  - Nejčastější kategorie
  - Průměrný počet událostí na den

**Design:**
- Čistý dashboard layout s kartičkami a grafy
- Barvy grafů odpovídají barvám kategorií

## Technické poznámky

- Grafy implementovat pomocí SVG (žádná knihovna) nebo Canvas API
- Výpočet volného času: pracovní hodiny (settings.workingHours) minus události v kategorii work
- Správně počítat opakující se události (rozvinout pro dané období)
- Data agregovat z localStorage

## Akceptační kritéria

- [ ] Dashboard se otevře z headeru
- [ ] Koláčový graf zobrazuje správný poměr kategorií
- [ ] Sloupcový graf ukazuje rozložení po dnech
- [ ] Kartičky zobrazují správná čísla
- [ ] Přepínač týden/měsíc funguje
- [ ] Barvy odpovídají kategoriím
