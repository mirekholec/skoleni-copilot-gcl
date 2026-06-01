# Markdown to PDF Skill

Jednoduchý skill pro převod Markdown souborů na PDF pomocí pandoc.

## Instalace závislostí

### macOS

```bash
brew install pandoc
brew install --cask mactex-no-gui
```

### Ubuntu / Debian

```bash
sudo apt install pandoc texlive-latex-base texlive-lang-czechslovak
```

### Windows

```bash
choco install pandoc miktex
```

## Použití

```bash
bash markdown-to-pdf-skill/scripts/md2pdf.sh soubor.md
```

### Vlastní název výstupního souboru

```bash
bash markdown-to-pdf-skill/scripts/md2pdf.sh soubor.md -o vystup.pdf
```

### Nápověda

```bash
bash markdown-to-pdf-skill/scripts/md2pdf.sh --help
```

## Požadavky

- pandoc
- pdflatex (LaTeX distribuce: TinyTeX, MacTeX, TeX Live nebo MiKTeX)
