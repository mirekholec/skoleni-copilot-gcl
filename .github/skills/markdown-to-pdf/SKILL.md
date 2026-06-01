---
name: markdown-to-pdf
description: Převádí Markdown soubor na PDF pomocí pandoc. Použij, když uživatel požaduje konverzi .md souboru do PDF formátu.
license: MIT
metadata:
  author: skoleni-copilot
  version: "1.0"
compatibility: Vyžaduje pandoc a LaTeX (pdflatex) nainstalované v systému
---

# Markdown to PDF Skill

Tento skill převádí Markdown soubor na PDF dokument pomocí pandoc.

## Co skill dělá

1. Přijme cestu k jednomu Markdown souboru
2. Spustí shell skript, který zavolá pandoc
3. Vygeneruje PDF dokument

## Jak použít

Spusť skript s cestou k MD souboru:

```bash
bash markdown-to-pdf-skill/scripts/md2pdf.sh cesta/k/souboru.md
```

S volitelným výstupním souborem:

```bash
bash markdown-to-pdf-skill/scripts/md2pdf.sh cesta/k/souboru.md -o vystup.pdf
```

## Výstup

Skript vytvoří PDF soubor ve stejné složce jako vstupní MD soubor (nebo na zadané cestě přes `-o`).

## Závislosti

- `pandoc` – nástroj pro konverzi dokumentů
- `pdflatex` – PDF engine (součást LaTeX distribuce: TinyTeX, MacTeX, TeX Live)

## Poznámky

- Podporuje UTF-8 včetně češtiny
- Zachovává Markdown formátování (nadpisy, seznamy, kódové bloky, tabulky)
- Zpracovává vždy jeden soubor; pro více souborů volej opakovaně
