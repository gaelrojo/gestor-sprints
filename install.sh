#!/usr/bin/env bash
# Instala la skill gestor-sprints en un proyecto (.claude/skills/) o para todos tus proyectos (--global).
#
# Uso, desde la carpeta del proyecto:
#   curl -fsSL https://raw.githubusercontent.com/gaelrojo/gestor-sprints/main/install.sh | bash
# Con el repositorio clonado:
#   ./install.sh /ruta/al/proyecto
#   ./install.sh --global
set -euo pipefail

REPO="gaelrojo/gestor-sprints"
SKILL_REL="plugins/sprints/skills/gestor-sprints"

DESTINO_ARG="${1:-}"
SRC=""
TMP=""
limpiar() { if [[ -n "$TMP" ]]; then rm -rf "$TMP"; fi; }
trap limpiar EXIT

# 1. Buscar la skill junto a este script; si se ejecutó con curl | bash, descargar el repositorio.
if [[ -n "${BASH_SOURCE[0]:-}" && -f "${BASH_SOURCE[0]}" ]]; then
  AQUI="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  if [[ -f "$AQUI/$SKILL_REL/SKILL.md" ]]; then SRC="$AQUI/$SKILL_REL"; fi
fi
if [[ -z "$SRC" ]]; then
  TMP="$(mktemp -d)"
  echo "Descargando $REPO…"
  curl -fsSL "https://codeload.github.com/$REPO/tar.gz/refs/heads/main" | tar -xz -C "$TMP"
  SRC="$(find "$TMP" -type d -path "*/$SKILL_REL" | head -n 1)"
  if [[ -z "$SRC" || ! -f "$SRC/SKILL.md" ]]; then
    echo "No encontré la skill en el repositorio descargado." >&2
    exit 1
  fi
fi

# 2. Elegir el destino.
if [[ "$DESTINO_ARG" == "--global" ]]; then
  DEST="$HOME/.claude/skills/gestor-sprints"
else
  PROYECTO="${DESTINO_ARG:-$PWD}"
  if [[ ! -d "$PROYECTO" ]]; then
    echo "No existe la carpeta: $PROYECTO" >&2
    exit 1
  fi
  DEST="$(cd "$PROYECTO" && pwd)/.claude/skills/gestor-sprints"
fi

# 3. Copiar (reemplaza una versión anterior de la skill, nada más).
mkdir -p "$(dirname "$DEST")"
rm -rf "$DEST"
cp -R "$SRC" "$DEST"

echo "Skill instalada en: $DEST"
echo "Abre Claude Code en tu proyecto y escribe: /gestor-sprints"
