---
name: gestor-sprints
description: Gestiona las fases, sprints y tareas de este proyecto con un tablero visual (línea de fases, Kanban, burndown y bitácora). Primero busca en todo el repositorio las fases y tareas que ya existen; solo si no encuentra ninguna, analiza el proyecto y las crea. Úsala para planear, actualizar o revisar el avance del proyecto.
---

# Gestor de sprints

Esta skill mantiene el plan del proyecto en la carpeta `tablero-sprints/`, en la raíz del repositorio:

| Archivo | Para qué sirve |
|---|---|
| `tablero-sprints/datos.js` | Única fuente de verdad: fases, sprints, tareas y bitácora. |
| `tablero-sprints/tablero.html` | Tablero visual. Se abre en el navegador y lee `datos.js`. No se edita a mano. |
| `tablero-sprints/ANALISIS.md` | Solo cuando el plan salió de un análisis del proyecto: hallazgos y justificación. |

Reglas que no cambian:
- **No modifiques el código del proyecto.** Esta skill solo escribe dentro de `tablero-sprints/`.
- No hagas commits ni push salvo que el usuario lo pida.
- No inventes avance: algo está `hecho` solo si el usuario lo dijo o el código lo demuestra.
- Responde en el idioma del usuario (español por defecto).

## Paso 0. ¿Ya hay tablero?

- Existe `tablero-sprints/datos.js` → léelo y ve a **Uso diario** (sección 4). Si el usuario pide "sincroniza" o "busca tareas nuevas", ve a la sección 5.
- No existe → **Paso 1**.

## Paso 1. Buscar las fases y tareas que ya existen (siempre primero)

Revisa el proyecto **completo** siguiendo [references/descubrir.md](references/descubrir.md). Las fuentes, en orden:

1. Documentos de planeación: ROADMAP, TODO, TASKS, BACKLOG, PLAN, CHANGELOG (sección sin publicar), `docs/`, secciones "Roadmap / Pendientes / Fases / Próximos pasos" del README.
2. Listas con casillas `- [ ]` / `- [x]` en cualquier `.md`.
3. Specs y planes de agentes: `specs/*/tasks.md`, `.kiro/specs/`, `.taskmaster/`, `tasks.json`, `PLAN.md`, `AGENTS.md`, `CLAUDE.md`.
4. Comentarios en el código: `TODO`, `FIXME`, `HACK`, `XXX`, `BUG`, `@todo` (sin carpetas de dependencias ni de compilación).
5. GitHub, si el comando `gh` funciona: issues abiertos y cerrados, milestones y pull requests abiertos.

Al terminar, cuenta lo que encontraste por fuente y decide:

- **Encontraste fases o tareas** → **Paso 2A** (importarlas).
- **No encontraste nada en ninguna fuente** → di en una línea qué revisaste y que no hubo resultados, y pasa al **Paso 2B**.

"Nada" significa: ninguna lista de tareas, ningún roadmap ni fases, ningún TODO/FIXME, ningún issue ni milestone. Un README sin pendientes no cuenta como tareas.

## Paso 2A. Importar lo encontrado

- Cada pendiente encontrado es una tarea con `origen` (por ejemplo `README.md:42`, `src/api/pagos.ts:118`, `#12`).
- Estado: `[x]`, issue cerrado o "hecho" → `hecho`; `[ ]`, TODO o issue abierto → `por_hacer`; "WIP", "en progreso" o un PR abierto que la resuelve → `en_progreso`.
- Prioridad: FIXME, BUG, etiqueta `bug`, "urgente" o "crítico" → `alta`; TODO normal → `media`; "algún día", "nice to have" → `baja`.
- Fases: usa las que el proyecto ya nombra (Fase, Etapa, Milestone, Phase, versiones como v0.1 o v1.0). Si hay tareas pero no fases, agrúpalas como indica descubrir.md § Fases.
- Una misma tarea encontrada en dos fuentes es una sola, con los dos orígenes.
- Si hay muchos TODO (más de ~30), agrúpalos por módulo o carpeta en una tarea con `pasos`.
- No agregues tareas que no estén en el proyecto. Si notas huecos importantes, menciónalos al final y ofrece agregarlos.
- Marca `proyecto.origen = "descubierto"`.

## Paso 2B. Analizar el proyecto y crear el plan (solo si el Paso 1 no encontró nada)

Sigue [references/analizar.md](references/analizar.md). En resumen:

1. Entiende qué es el proyecto: stack, tipo (web, API, móvil, CLI, librería, datos…), estructura, puntos de entrada y lo que dice el README.
2. Evalúa qué está hecho y qué falta, siempre con evidencia del código: funcionalidades, pruebas, CI, despliegue, documentación, configuración y seguridad.
3. Define de 4 a 6 fases adecuadas a este tipo de proyecto y ubica la fase actual.
4. Crea tareas concretas y verificables. Marca `hecho` solo lo que existe y funciona, citando el archivo en `origen`.
5. Escribe `tablero-sprints/ANALISIS.md` con los hallazgos y el porqué de cada fase y tarea.
6. Marca `proyecto.origen = "analisis"`.

## Paso 3. Crear el tablero

1. Escribe `tablero-sprints/datos.js` con el formato exacto de [references/formato.md](references/formato.md).
2. Sprint 1: empieza hoy (o en la fecha que diga el usuario), dura `duracionDias` (14 por defecto) y lleva las tareas pendientes más prioritarias de la fase actual hasta unos 20 puntos. El resto de lo pendiente queda en `"backlog"`. Si importaste sprints o milestones con fechas, respétalos.
   Las tareas que ya estaban hechas antes de crear el tablero llevan `"sprint": "previo"`: cuentan para el avance de las fases, pero no entran al Sprint 1 ni al backlog.
3. Agrega a la bitácora la entrada "Tablero creado a partir de …" (las tareas encontradas o el análisis).
4. Valida `datos.js` (formato.md § Validar). Si falla, corrígelo antes de seguir.
5. Copia la plantilla del tablero:
   - macOS / Linux: `cp "${CLAUDE_SKILL_DIR}/assets/tablero.html" tablero-sprints/tablero.html`
   - Windows (PowerShell): `Copy-Item "${CLAUDE_SKILL_DIR}/assets/tablero.html" tablero-sprints/tablero.html`
   Si ya existe, reemplázala solo cuando la plantilla tenga un número de versión mayor (comentario `gestor-sprints tablero vN` en la segunda línea).
6. Responde con un resumen corto: de dónde salió el plan, cada fase con su %, qué lleva el Sprint 1 y cuántas tareas quedaron en backlog. Explica cómo abrir el tablero: doble clic en `tablero-sprints/tablero.html`, o en VS Code con la extensión Live Preview ("Show Preview"). Ofrece abrirlo tú con `open` (macOS), `start ""` (Windows) o `xdg-open` (Linux).

## 4. Uso diario

Lee `datos.js`, aplica el cambio, actualiza `proyecto.actualizado`, valida y responde en 1 a 3 líneas con el estado del sprint, por ejemplo: "Sprint 2: 18/30 pts (60 %), 1 bloqueada, faltan 4 días." El tablero abierto se actualiza solo en unos segundos (o al recargar la página).

| Lo que dice el usuario | Qué cambias |
|---|---|
| "Terminé X" | `estado: "hecho"`, `completada: hoy`, entrada en la bitácora |
| "Empecé X" / "estoy con X" | `en_progreso` |
| "X está listo para revisar" | `en_revision` |
| "X está bloqueado por Y" | `bloqueado`, `bloqueo: "Y"` |
| "Agrega …" | Tareas nuevas en el sprint activo (o en backlog si lo pide), con la fase actual salvo que diga otra |
| "Hice el paso … de X" | Marca el paso; si ya están todos, pregunta si la tarea quedó terminada |
| "Pasamos a la fase …" | `proyecto.faseActual` y la `fase` del sprint activo |
| "Actualiza con lo que hice" | Lee `git log` desde `proyecto.actualizado`, propone qué tareas parecen hechas y pregunta antes de marcarlas |
| "¿Cómo vamos?" | Calcula desde `datos.js` y responde en el chat |

Busca la tarea por coincidencia de título; si hay varias candidatas, pregunta mostrando las opciones.

**Iniciar sprint:** si ya hay uno activo, primero ciérralo (pregunta). Crea `sNN` con `inicio`, `fin` = inicio + `duracionDias` − 1, `estado: "activo"` y objetivo; actualiza `proyecto.sprintActivo`; mueve las tareas elegidas del backlog. Sugiere cuáles meter según prioridad y la velocidad promedio.

**Cerrar sprint:** calcula `velocidad` (puntos hechos); pregunta si las tareas sin terminar pasan al siguiente sprint o al backlog (por defecto, al siguiente); marca `estado: "cerrado"`; haz la retro con tres preguntas (qué salió bien, qué mejorar, acciones) o deja saltarla; guarda `retro`. Resume: velocidad contra el promedio, % cumplido y pendientes movidas.

## 5. Sincronizar con el proyecto

Cuando el usuario pida "sincroniza" o "busca tareas nuevas", repite las fuentes del Paso 1 y:
- Agrega lo nuevo que no esté ya en el tablero (compara por `origen` y por título).
- Si el TODO de una tarea ya no existe o su issue se cerró, lista esas tareas y pregunta si las marcas como hechas.
- Nunca borres tareas por tu cuenta.

## Reglas de datos

- Fechas `YYYY-MM-DD` en la zona horaria local: `date +%F` (macOS / Linux) o `Get-Date -Format yyyy-MM-dd` (PowerShell).
- IDs: tareas `t001`, `t002`…; sprints `s01`, `s02`… Usa el siguiente número libre.
- Títulos cortos en infinitivo: "Agregar pruebas al carrito".
- Puntos en escala 1, 2, 3, 5, 8 (ver analizar.md § Estimar).
- Conserva el historial: sprints cerrados, retros y bitácora no se borran.
