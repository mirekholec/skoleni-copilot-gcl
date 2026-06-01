# Registrace skillu v Copilot CLI

## Automatická registrace (Project Skill)

Skill se automaticky zaregistruje, pokud je umístěn ve správné struktuře:

```
.github/skills/
└── markdown-to-pdf-skill/
    ├── SKILL.md
    ├── scripts/
    │   └── md2pdf.sh
    └── references/
        └── EXAMPLES.md
```

## Použití skillu

Skill je automaticky dostupný pro AI agenty. Agent ho použije, když uživatel požaduje:

- Převod Markdown souboru na PDF
- Export MD dokumentace do PDF

### Příklady dotazů, které aktivují skill:

- "Převeď README.md na PDF"
- "Vytvoř PDF z tohoto markdown souboru"
- "Exportuj docs/navod.md do PDF"

## Manuální spuštění

```bash
bash markdown-to-pdf-skill/scripts/md2pdf.sh soubor.md
```

## Ověření registrace

```bash
@workspace jaké skills jsou dostupné?
```
