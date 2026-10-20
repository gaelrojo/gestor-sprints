# Descubrir fases y tareas existentes

Objetivo: encontrar **todo** lo que el proyecto ya dice sobre su plan antes de crear algo nuevo. Revisa todas las fuentes aunque la primera ya tenga resultados, y anota cuántos elementos salieron de cada una.

## Carpetas que se ignoran siempre

`.git`, `node_modules`, `vendor`, `dist`, `build`, `out`, `target`, `bin`, `obj`, `.next`, `.nuxt`, `.svelte-kit`, `coverage`, `.venv`, `venv`, `env`, `__pycache__`, `.pytest_cache`, `.gradle`, `Pods`, `.dart_tool`, `.idea`, `.vscode` (salvo `.vscode/*.md`), `tablero-sprints`, `.claude/skills/gestor-sprints` (esta misma skill), archivos minificados (`*.min.js`, `*.min.css`), lockfiles y archivos generados.

Usa las herramientas Glob y Grep (respetan `.gitignore`). No abras archivos binarios.

## Fuente 1. Documentos de planeación

Busca con Glob, sin distinguir mayúsculas:
- `**/{ROADMAP,TODO,TODOS,TASKS,BACKLOG,PLAN,PLANNING,MILESTONES,PENDIENTES,TAREAS}*.{md,txt,org,rst}`
- `**/CHANGELOG*` → solo la sección `Unreleased` / `Sin publicar` / `Próxima versión`.
- `docs/**/*.md`, `doc/**/*.md`, `.github/*.md`, `wiki/**/*.md`.
- `README*` → secciones cuyo título contenga: Roadmap, To do, TODO, Pendientes, Próximos pasos, Next steps, Fases, Etapas, Milestones, Plan, Estado, Status, Features planeadas, Backlog.

Dentro de esos documentos, cada viñeta o casilla bajo un título de plan es una tarea. Los títulos de nivel superior tipo "Fase 1: …", "Etapa …", "Milestone …", "v1.0", "MVP", "Q1" son fases.

## Fuente 2. Casillas en cualquier Markdown

Grep en `*.md` (y `*.mdx`, `*.txt`) por el patrón `^\s*[-*+]\s+\[( |x|X)\]`.
- `[ ]` → `por_hacer`, `[x]` → `hecho`.
- El título más cercano por encima de la casilla indica la fase o el grupo.
- Ignora casillas de plantillas (`.github/PULL_REQUEST_TEMPLATE*`, `.github/ISSUE_TEMPLATE/*`) y de licencias o guías de contribución.

## Fuente 3. Specs y planes de herramientas y agentes

Revisa si existen:
- `specs/*/tasks.md`, `specs/*/plan.md`, `.specify/**` (spec-kit)
- `.kiro/specs/*/tasks.md`
- `.taskmaster/tasks/*.json`, `tasks.json`, `tasks/*.md`
- `PLAN.md`, `IMPLEMENTATION_PLAN.md`, `AGENTS.md`, `CLAUDE.md` (secciones de pendientes o plan)
- `openspec/**`, `.cursor/rules/**` (solo si contienen listas de tareas)
- Exportaciones de gestores de tareas en el repo: `*.csv` o `*.json` con columnas tipo `title/status/sprint` (Jira, Linear, Trello, Notion).

Respeta los estados y fases que esas herramientas ya definen.

## Fuente 4. Comentarios en el código

Grep con el patrón `\b(TODO|FIXME|HACK|XXX|BUG|@todo)\b[:\s(]` en archivos de código, con las exclusiones de arriba.
- `FIXME`, `BUG`, `XXX` → prioridad `alta`; `TODO`, `@todo` → `media`; `HACK` → `media` con nota "deuda técnica".
- Título: el texto del comentario, reescrito como acción ("TODO: validar email" → "Validar el email en el registro").
- `origen`: `ruta:línea`.
- Más de ~30 comentarios: agrupa por carpeta o módulo ("Resolver pendientes del módulo de pagos") y pon cada comentario como un `paso` con su `ruta:línea`.
- Ignora TODO de código de terceros copiado al repo, de archivos generados y de pruebas de ejemplo.

## Fuente 5. GitHub (solo lectura)

Si hay un remoto de GitHub (`git remote -v`) y `gh auth status` funciona:

```bash
gh issue list --state all --limit 300 --json number,title,state,labels,milestone,assignees,createdAt,closedAt,body
gh api "repos/{owner}/{repo}/milestones?state=all&per_page=100"
gh pr list --state open --json number,title,body,headRefName
```

- Milestone → fase (o sprint, si tiene fecha de vencimiento y dura pocas semanas).
- Issue abierto → `por_hacer`; cerrado → `hecho` con `completada` = fecha de cierre; con un PR abierto que lo menciona ("closes #N", "fixes #N") → `en_progreso`.
- Etiquetas: `bug`, `critical`, `urgent`, `priority: high` → `alta`; `enhancement`, `feature` → `media`; `nice-to-have`, `low` → `baja`.
- `responsable`: el primer asignado.
- `origen`: `#número`.

Si `gh` no está instalado o no tiene sesión, dilo en el resumen ("no revisé issues de GitHub porque gh no tiene sesión") y sigue con lo demás. No pidas al usuario que lo instale para continuar.

## Fuente 6. Señales de trabajo en curso (apoyo, no crean tareas solas)

- Ramas locales y remotas sin fusionar (`git branch -a --no-merged`): sugieren tareas `en_progreso` cuando coinciden con una tarea encontrada.
- Commits recientes con "WIP": lo mismo.
Estas señales solo cambian el estado de tareas ya encontradas; por sí solas no cuentan como "encontrar tareas".

## Fases cuando hay tareas pero no fases

Agrupa las tareas en fases que sigan el ciclo real del proyecto, en este orden y solo las que tengan tareas:
1. **Base técnica**: configuración, estructura, dependencias, entorno.
2. **Funcionalidades**: lo que el producto hace (si son muchas, divide por módulo o área: "Pagos", "Usuarios").
3. **Calidad y pruebas**: pruebas, errores, rendimiento, seguridad.
4. **Lanzamiento**: despliegue, CI/CD, documentación para usuarios.
5. **Mejoras**: ideas y deuda técnica no urgente.

La fase actual es la primera que no esté completa y tenga tareas en progreso o pendientes de prioridad alta.

## Resumen para el usuario

Antes de escribir `datos.js`, muestra una tabla corta:

| Fuente | Encontrado |
|---|---|
| Documentos de planeación | 2 archivos, 14 tareas, 3 fases |
| Casillas en Markdown | 6 tareas |
| Comentarios TODO/FIXME | 23 (agrupados en 5 tareas) |
| GitHub | 9 issues, 2 milestones |

Si todas las filas dicen 0 (o "no disponible"), el Paso 2B aplica.
