#!/bin/bash

# Skript pro vytvoření nového GitHub repository pro firmu
set -e

# Cesty k odstranění před deployem (relativní k root složce)
EXCLUDE_PATHS=(
    "docs/research"
)

# Zeptej se na název firmy
read -p "Zadej název firmy (napiš gc): " COMPANY_NAME

# Ověř, že byl zadán název
if [ -z "$COMPANY_NAME" ]; then
    echo "Chyba: Název firmy nebyl zadán!"
    exit 1
fi

# Převeď název na malá písmena a nahraď mezery pomlčkami
COMPANY_NAME=$(echo "$COMPANY_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
REPO_NAME="skoleni-copilot-${COMPANY_NAME}"

echo "Vytváření repository: $REPO_NAME"

# Odstraň vyloučené cesty
for path in "${EXCLUDE_PATHS[@]}"; do
    if [ -e "$path" ]; then
        echo "Odstraňuji: $path"
        rm -rf "$path"
    fi
done

# Smaž .git složku
if [ -d ".git" ]; then
    echo "Mažu existující .git složku..."
    rm -rf .git
fi

# Inicializuj nový git repository
echo "Inicializuji nový git repository..."
git init

# Přidej všechny soubory
git add .

# Vytvoř první commit
git commit -m "Initial commit for $COMPANY_NAME training"

# Zjisti GitHub uživatelské jméno
OWNER=$(gh api user --jq .login)
FULL_REPO="$OWNER/$REPO_NAME"

# Vytvoř nové GitHub repository (veřejné)
echo "Vytvářím GitHub repository..."
gh repo create "$REPO_NAME" --public --source=. --push

echo "Hotovo! Repository $FULL_REPO bylo vytvořeno a obsah nahrán."
echo "URL: https://github.com/$FULL_REPO"

# Vytvoř GitHub issues z tasků v tasks/
if [ -d "tasks" ] && ls tasks/*.md &>/dev/null; then
    echo ""
    echo "Vytvářím GitHub issues z tasks/..."

    # Zjisti všechny unikátní labely a vytvoř je
    ALL_LABELS=$(grep '^\*\*Labels:\*\*' tasks/*.md | sed 's/.*\*\*Labels:\*\* //' | tr ',' '\n' | xargs -I{} echo "{}" | sort -u)
    for label in $ALL_LABELS; do
        gh label create "$label" --repo "$FULL_REPO" --color "0075ca" 2>/dev/null || true
    done

    # Vytvoř issue pro každý task
    for f in tasks/*.md; do
        TITLE=$(head -1 "$f" | sed 's/^# //')
        RAW_LABELS=$(grep '^\*\*Labels:\*\*' "$f" | sed 's/\*\*Labels:\*\* //')

        LABEL_ARGS=""
        IFS=',' read -ra LABELS <<< "$RAW_LABELS"
        for lbl in "${LABELS[@]}"; do
            lbl=$(echo "$lbl" | xargs)
            LABEL_ARGS="$LABEL_ARGS --label \"$lbl\""
        done

        CMD="gh issue create --repo \"$FULL_REPO\" --title \"$TITLE\" --body-file \"$f\" $LABEL_ARGS"
        URL=$(eval "$CMD" 2>&1)
        echo "  ✓ $TITLE → $URL"
    done

    echo "Issues vytvořeny."
fi
