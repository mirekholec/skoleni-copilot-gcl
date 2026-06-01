# CAL-007: Notifikace v prohlížeči

**Summary:** Browser notifikace pro připomínky událostí
**Priorita:** Low
**Story points:** 3
**Labels:** feature, notifications

## Popis

Využít Notification API prohlížeče k zobrazení připomínek před začátkem událostí.

## Požadavky

- Při prvním načtení požádat o povolení notifikací (Notification.requestPermission)
- Pokud uživatel povolí: spustit kontrolu blížících se událostí
- Kontrola každou minutu (setInterval)
- Zobrazit notifikaci X minut před začátkem události (podle pole `reminder`)
- Notifikace obsahuje: název události, čas začátku, lokaci
- Klik na notifikaci přenese focus na záložku s kalendářem
- Nezobrazovat notifikaci opakovaně pro stejnou událost (trackovat zobrazené v Set)
- V nastavení možnost vypnout notifikace globálně
- Ikona notifikace podle kategorie

## Technické poznámky

- Notification API funguje jen na HTTPS nebo localhost
- Kontrola: aktuální čas + reminder minuty >= startTime události
- Sledovat jen události dnešního dne (optimalizace)
- Pozor na opakující se události – rozvinout pro dnešní den
- Po zavření/reloadu stránky se Set vymazává – to je OK (nechceme trackovat permanentně)

## Akceptační kritéria

- [ ] Prohlížeč požádá o povolení notifikací
- [ ] Notifikace se zobrazí správný počet minut před událostí
- [ ] Notifikace obsahuje název, čas a lokaci
- [ ] Stejná notifikace se nezobrazí dvakrát
- [ ] V nastavení lze notifikace vypnout
