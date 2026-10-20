# Instala la skill gestor-sprints en un proyecto (.claude\skills\) o para todos tus proyectos (-Global).
#
# Uso, desde la carpeta del proyecto (PowerShell):
#   & ([scriptblock]::Create((irm https://raw.githubusercontent.com/gaelrojo/gestor-sprints/main/install.ps1)))
# Con el repositorio clonado:
#   .\install.ps1 -Proyecto C:\ruta\al\proyecto
#   .\install.ps1 -Global
param(
  [string]$Proyecto = (Get-Location).Path,
  [switch]$Global
)
$ErrorActionPreference = 'Stop'
$Repo = 'gaelrojo/gestor-sprints'
$SkillRel = 'plugins/sprints/skills/gestor-sprints'
$tmp = $null

try {
  # 1. Buscar la skill junto a este script; si se ejecutó desde internet, descargar el repositorio.
  $src = $null
  if ($PSScriptRoot) {
    $candidato = Join-Path $PSScriptRoot $SkillRel
    if (Test-Path (Join-Path $candidato 'SKILL.md')) { $src = $candidato }
  }
  if (-not $src) {
    $tmp = Join-Path ([IO.Path]::GetTempPath()) ('gestor-sprints-' + [guid]::NewGuid())
    New-Item -ItemType Directory -Path $tmp | Out-Null
    $zip = Join-Path $tmp 'repo.zip'
    Write-Host "Descargando $Repo..."
    Invoke-WebRequest -Uri "https://codeload.github.com/$Repo/zip/refs/heads/main" -OutFile $zip -UseBasicParsing
    Expand-Archive -Path $zip -DestinationPath $tmp
    $raiz = Get-ChildItem -Path $tmp -Directory | Select-Object -First 1
    $src = Join-Path $raiz.FullName $SkillRel
    if (-not (Test-Path (Join-Path $src 'SKILL.md'))) { throw 'No encontré la skill en el repositorio descargado.' }
  }

  # 2. Elegir el destino.
  if ($Global) {
    $dest = Join-Path $HOME '.claude\skills\gestor-sprints'
  } else {
    if (-not (Test-Path -Path $Proyecto -PathType Container)) { throw "No existe la carpeta: $Proyecto" }
    $dest = Join-Path (Resolve-Path $Proyecto).Path '.claude\skills\gestor-sprints'
  }

  # 3. Copiar (reemplaza una versión anterior de la skill, nada más).
  New-Item -ItemType Directory -Force -Path (Split-Path $dest) | Out-Null
  if (Test-Path $dest) { Remove-Item -Path $dest -Recurse -Force }
  Copy-Item -Path $src -Destination $dest -Recurse

  Write-Host "Skill instalada en: $dest"
  Write-Host 'Abre Claude Code en tu proyecto y escribe: /gestor-sprints'
}
finally {
  if ($tmp -and (Test-Path $tmp)) { Remove-Item -Path $tmp -Recurse -Force }
}
