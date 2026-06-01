# CAL-002: Vyhledávání událostí

**Summary:** Vyhledávání událostí v kalendáři
**Priorita:** Medium
**Story points:** 3
**Labels:** feature, ux

## Popis

Přidat vyhledávací pole, které umožní rychle najít událost podle textu.

## Požadavky

- Vyhledávací pole v headeru (ikona lupy + input)
- Hledání v reálném čase při psaní (debounce 300ms)
- Prohledávat pole: title, description, location
- Výsledky zobrazit jako dropdown seznam pod vyhledávacím polem
- Každý výsledek: název události, datum, čas, kategorie (barevná tečka)
- Maximálně 10 výsledků, seřazených chronologicky
- Kliknutí na výsledek: otevře detail události a přeskočí na odpovídající týden
- Escape nebo klik mimo zavře dropdown
- Prázdný stav: "Žádné výsledky" pokud nic neodpovídá

## Technické poznámky

- Hledání je case-insensitive
- Prohledávat všechny události v localStorage, nejen aktuální týden
- Debounce implementovat vlastní funkcí (žádná knihovna)

## Akceptační kritéria

- [ ] Vyhledávací pole je v headeru
- [ ] Výsledky se zobrazují při psaní
- [ ] Hledání prohledává název, popis a lokaci
- [ ] Klik na výsledek naviguje na správný týden a otevře detail
- [ ] Escape zavře výsledky
