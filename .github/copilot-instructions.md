## Klíčové instrukce

Základní informace o projektu, struktuře a funkcí poskytuje soubor `README.md`. 

- webová aplikace je napsaná v HTML, CSS a JS (JavaScript)
- aplikace musí být spustitelná vždy pouhým otevřením souboru `index.html` bez serveru
- data se uchovávají výhradně v localstorage webového prohlížeče
- navržené změny musí splňovat všechny požadavky, jinak musíš reportovat a žádat zásah uživatele
- čistota, udržitelnost a srozumitelnost kódu má prioritu i před výkonností



**Jazyková nastavení a komunikace**

- komunikace probíhá v českém jazyce (cs-cz)
- zdrojový kód je psán výhradně v anglickém jazyce (en-us)
- komentáře v kódu jsou česky



## Kód (HTML, CSS, JS)

- Respektuj formátování definované v  `.editorconfig`, pokud existuje
- CSS styly piš výhradně do CSS souborů, nikdy nepoužívej inline CSS v HTML
- Uchovávej všechny CSS styly v jednom souboru styles.css



## Task Management

- pokud implementuješ task z `tasks` a úkol dokončíš, vždy automaticky přesuneš tento task do podsložky `tasks/completed` 
- k dokončenému taskz připojíš soubor, do kterého vložíš informace o implementaci. Název souboru bude vycházet z původního, například pokud implementuješ: `X-01-nazev-feature.md` tak název komplementárního souboru bude `X-01-nazev-feature-IMPL.md`. 