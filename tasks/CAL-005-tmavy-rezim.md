# CAL-005: Tmavý režim

**Summary:** Dark mode pro celou aplikaci
**Priorita:** Low
**Story points:** 3
**Labels:** feature, design

## Popis

Přidat přepínač tmavého režimu pro pohodlné používání v noci nebo při slabém osvětlení.

## Požadavky

- Toggle přepínač v headeru (ikona slunce/měsíc)
- Tři stavy: světlý / tmavý / systémový (respektuje prefers-color-scheme)
- Všechny barvy se změní: pozadí, text, okraje, modaly, formuláře
- Barvy kategorií zůstanou rozpoznatelné (případně lehce upravit sytost pro tmavé pozadí)
- Plynulý přechod mezi režimy (CSS transition na background-color a color, cca 200ms)
- Preference se ukládá do localStorage (klíč copilotcal_settings.theme)
- Při načtení stránky aplikovat uloženou preferenci PŘED renderem (zabránit flashnutí)

## Technické poznámky

- Implementovat přes CSS custom properties a atribut `data-theme` na `<html>`
- Definovat dvě sady proměnných: :root (light) a [data-theme="dark"]
- Pro systémový režim: @media (prefers-color-scheme: dark) + matchMedia listener
- Flash prevention: přidat malý inline `<script>` v `<head>` který nastaví data-theme z localStorage ještě před načtením CSS

## Akceptační kritéria

- [ ] Přepínač je v headeru a cykluje světlý → tmavý → systémový
- [ ] Všechny UI prvky jsou čitelné v obou režimech
- [ ] Barvy kategorií jsou rozlišitelné v dark mode
- [ ] Přechod je plynulý (bez skokové změny)
- [ ] Preference přežije reload stránky
- [ ] Žádný "flash" světlého režimu při načtení v dark mode
