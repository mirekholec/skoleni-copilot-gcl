# CAL-003: Vizuální detekce konfliktů

**Summary:** Vizuální varování při překrývajících se událostech
**Priorita:** Medium
**Story points:** 3
**Labels:** feature, ux

## Popis

Automaticky detekovat události, které se časově překrývají, a vizuálně na to upozornit uživatele.

## Požadavky

- Automatická detekce překryvu: dvě události ve stejný den, jejichž časy se překrývají
- Překrývající se události zobrazit vedle sebe (rozdělit šířku sloupce dne)
  - 2 konflikty = každý 50% šířky
  - 3 konflikty = každý 33% šířky
- Na překrývajících se událostech zobrazit červený indikátor (ikona ⚠️ nebo červený okraj)
- Tooltip při hoveru: "Konflikt s: [název druhé události]"
- Volitelně: v headeru zobrazit badge s počtem konfliktů v aktuálním týdnu

## Technické poznámky

- Detekce překryvu: událost A a B se překrývají pokud A.startTime < B.endTime AND A.endTime > B.startTime
- Řešit v rámci jednoho dne (multi-day události nejsou v scope)
- Výpočet pozice: left offset a width podle počtu konfliktů v dané časové oblasti

## Akceptační kritéria

- [ ] Překrývající se události se zobrazují vedle sebe
- [ ] Červený indikátor je viditelný na konfliktních událostech
- [ ] Tooltip ukazuje název kolidující události
- [ ] Události bez konfliktu zabírají plnou šířku sloupce
