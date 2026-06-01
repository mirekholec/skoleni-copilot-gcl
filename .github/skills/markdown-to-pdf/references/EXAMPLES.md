# Příklady použití

## Základní převod

```bash
bash markdown-to-pdf-skill/scripts/md2pdf.sh README.md
```

Výstup:
```
Převádím: README.md → README.pdf
✓ PDF vygenerováno: README.pdf
```

## Vlastní název výstupu

```bash
bash markdown-to-pdf-skill/scripts/md2pdf.sh docs/navod.md -o docs/navod-export.pdf
```

## Převod více souborů

```bash
for file in docs/*.md; do
    bash markdown-to-pdf-skill/scripts/md2pdf.sh "$file"
done
```

## Automatizace v GitHub Actions

```yaml
- name: Install pandoc
  run: sudo apt install pandoc texlive-latex-base

- name: Generate PDF
  run: bash markdown-to-pdf-skill/scripts/md2pdf.sh README.md -o docs/readme.pdf

- name: Upload PDF artifact
  uses: actions/upload-artifact@v4
  with:
    name: readme-pdf
    path: docs/readme.pdf
```

## Troubleshooting

### Chyba: pandoc není nainstalován

```bash
brew install pandoc        # macOS
sudo apt install pandoc    # Ubuntu
```

### Chyba: pdflatex not found

Nainstaluj LaTeX distribuci:
```bash
brew install --cask mactex-no-gui   # macOS
sudo apt install texlive-latex-base  # Ubuntu
```
