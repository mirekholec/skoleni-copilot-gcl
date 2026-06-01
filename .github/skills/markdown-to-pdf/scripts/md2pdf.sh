#!/usr/bin/env bash
# Převod Markdown souboru na PDF pomocí pandoc

set -euo pipefail

VERSION="1.0.0"

usage() {
    echo "Použití: md2pdf.sh <vstupní_soubor.md> [-o výstupní_soubor.pdf]"
    echo ""
    echo "Převede Markdown soubor na PDF pomocí pandoc."
    echo ""
    echo "Argumenty:"
    echo "  <vstupní_soubor.md>   Cesta k Markdown souboru (povinný)"
    echo "  -o, --output          Cesta k výstupnímu PDF (volitelný)"
    echo "  -h, --help            Zobrazí tuto nápovědu"
    echo "  -v, --version         Zobrazí verzi"
    echo ""
    echo "Pokud není zadán výstupní soubor, použije se název vstupního souboru s příponou .pdf"
}

# Kontrola pandoc
if ! command -v pandoc &> /dev/null; then
    echo "CHYBA: pandoc není nainstalován." >&2
    echo "Instalace:" >&2
    echo "  macOS:   brew install pandoc" >&2
    echo "  Ubuntu:  sudo apt install pandoc" >&2
    echo "  Windows: choco install pandoc" >&2
    exit 1
fi

# Detekce dostupného PDF engine
detect_pdf_engine() {
    # Preferujeme LaTeX varianty, pak alternativy
    for engine in pdflatex xelatex lualatex weasyprint wkhtmltopdf typst; do
        if command -v "$engine" &> /dev/null; then
            echo "$engine"
            return 0
        fi
    done
    return 1
}

PDF_ENGINE=$(detect_pdf_engine) || {
    echo "CHYBA: Žádný PDF engine není dostupný." >&2
    echo "Nainstaluj alespoň jeden z: pdflatex, weasyprint, wkhtmltopdf" >&2
    echo "  macOS:   brew install --cask mactex-no-gui  NEBO  pip3 install weasyprint" >&2
    echo "  Ubuntu:  sudo apt install texlive-latex-base  NEBO  pip3 install weasyprint" >&2
    exit 1
}

# Zpracování argumentů
INPUT_FILE=""
OUTPUT_FILE=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        -h|--help)
            usage
            exit 0
            ;;
        -v|--version)
            echo "md2pdf $VERSION"
            exit 0
            ;;
        -o|--output)
            if [[ -z "${2:-}" ]]; then
                echo "CHYBA: Parametr -o vyžaduje hodnotu." >&2
                exit 1
            fi
            OUTPUT_FILE="$2"
            shift 2
            ;;
        -*)
            echo "CHYBA: Neznámý parametr: $1" >&2
            usage >&2
            exit 1
            ;;
        *)
            if [[ -z "$INPUT_FILE" ]]; then
                INPUT_FILE="$1"
            else
                echo "CHYBA: Lze zadat pouze jeden vstupní soubor." >&2
                exit 1
            fi
            shift
            ;;
    esac
done

# Kontrola vstupního souboru
if [[ -z "$INPUT_FILE" ]]; then
    echo "CHYBA: Nebyl zadán vstupní soubor." >&2
    usage >&2
    exit 1
fi

if [[ ! -f "$INPUT_FILE" ]]; then
    echo "CHYBA: Soubor '$INPUT_FILE' neexistuje." >&2
    exit 1
fi

# Výchozí název výstupního souboru
if [[ -z "$OUTPUT_FILE" ]]; then
    OUTPUT_FILE="${INPUT_FILE%.md}.pdf"
fi

# Sestavení pandoc argumentů podle engine
build_pandoc_args() {
    local engine="$1"
    local args=("--pdf-engine=$engine")

    case "$engine" in
        pdflatex|xelatex|lualatex)
            args+=("-V" "geometry:margin=2.5cm" "-V" "documentclass=article" "-V" "lang=cs")
            ;;
        weasyprint|wkhtmltopdf)
            ;;

    esac

    echo "${args[@]}"
}

# Konverze MD → PDF
echo "Převádím: $INPUT_FILE → $OUTPUT_FILE (engine: $PDF_ENGINE)"

PANDOC_ARGS=$(build_pandoc_args "$PDF_ENGINE")

pandoc "$INPUT_FILE" \
    -o "$OUTPUT_FILE" \
    $PANDOC_ARGS

echo "✓ PDF vygenerováno: $OUTPUT_FILE"
