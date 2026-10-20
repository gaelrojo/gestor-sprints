# Analizar el proyecto y crear el plan

Se usa **solo** cuando el Paso 1 no encontró fases ni tareas en ninguna fuente. El resultado son fases y tareas basadas en evidencia del código, más un `ANALISIS.md` que explica cada decisión.

No modifiques ningún archivo del proyecto. Lee, ejecuta solo comandos de lectura (listar, buscar, `git log`, `--version`) y escribe únicamente en `tablero-sprints/`. No instales dependencias ni corras el proyecto salvo que el usuario lo pida.

## 1. Entender qué es el proyecto

- **Manifiestos** (identifican stack y scripts): `package.json`, `pyproject.toml`, `requirements*.txt`, `setup.py`, `go.mod`, `Cargo.toml`, `pom.xml`, `build.gradle*`, `*.csproj`, `*.sln`, `composer.json`, `Gemfile`, `pubspec.yaml`, `Package.swift`, `CMakeLists.txt`, `Makefile`, `deno.json`.
- **Tipo de proyecto**: web front, API/backend, full-stack, app móvil, escritorio, CLI, librería/paquete, ciencia de datos / notebooks, juego, infraestructura, sitio estático.
- **Estructura**: árbol de carpetas a 2–3 niveles, puntos de entrada (`main`, `index`, `app`, `server`, rutas, pantallas).
- **README y docs**: qué promete el proyecto. Compara lo prometido con lo que hay en el código.
- **Historia**: `git log --oneline -30`, fecha del primer y último commit, número de contribuidores (`git shortlog -sn | head`). Indica si el proyecto está empezando, activo o detenido.

## 2. Evaluar qué está hecho y qué falta

Revisa cada área y anota hallazgos con su archivo. Cada hueco relevante se vuelve una tarea.

| Área | Qué revisar | Tareas típicas si falta |
|---|---|---|
| Funcionalidades | Rutas, pantallas, endpoints, comandos, modelos. Busca funciones vacías, `NotImplementedError`, `pass`, `throw new Error("not implemented")`, `return null // stub`, datos de prueba fijos, texto de relleno, botones sin acción | Completar cada funcionalidad incompleta (una tarea por funcionalidad) |
| Pruebas | Carpetas `test/`, `tests/`, `__tests__`, `*_test.*`, `*.spec.*`; configuración (jest, vitest, pytest, go test…); cuántos módulos tienen pruebas | Configurar pruebas, pruebas de los módulos críticos sin cobertura |
| Calidad de código | Linter y formateador (eslint, prettier, ruff, black, golangci, rustfmt), tipado (tsconfig `strict`, mypy) | Configurar linter / formateo, activar tipado estricto |
| Errores y registros | Manejo de errores en entradas externas (red, BD, archivos), logs | Manejo de errores en X, registro de eventos |
| Configuración y secretos | `.env.example`, variables de entorno documentadas, secretos escritos en el código (claves, tokens, contraseñas) | Sacar secretos del código (prioridad alta), documentar variables |
| Dependencias | Versiones muy viejas o sin fijar, lockfile presente | Actualizar dependencias, agregar lockfile |
| CI/CD | `.github/workflows/`, `.gitlab-ci.yml`, `azure-pipelines.yml`, `Jenkinsfile` | Pipeline de pruebas y build |
| Despliegue | `Dockerfile`, `docker-compose*`, `vercel.json`, `netlify.toml`, `fly.toml`, `app.yaml`, manifiestos k8s, `Procfile` | Preparar despliegue, ambiente de producción |
| Documentación | README con instalación, uso y configuración; docs de API | Completar README, documentar API |
| Seguridad | Validación de entradas, autenticación, CORS, dependencias con vulnerabilidades conocidas (si hay `npm audit`/`pip-audit` disponible, solo léelos) | Validar entradas, revisar autenticación |
| Accesibilidad / UX (si hay interfaz) | `alt` en imágenes, etiquetas en formularios, diseño adaptable | Correcciones de accesibilidad |

Lo que exista y funcione también se registra: como tareas `hecho` (por ejemplo "Configurar el proyecto con Vite", origen `vite.config.ts`). Así la línea de fases muestra el avance real. Marca `hecho` solo con evidencia directa; si dudas, déjalo `por_hacer` y anótalo en el análisis.

## 3. Definir las fases

Elige de 4 a 6 fases según el tipo de proyecto y nómbralas con términos del propio proyecto cuando sea posible. Puntos de partida:

| Tipo | Fases sugeridas |
|---|---|
| Web / full-stack / móvil | Base técnica → Funcionalidades núcleo → Funcionalidades secundarias → Calidad y pruebas → Lanzamiento |
| API / backend | Base técnica → Modelo de datos y endpoints → Seguridad y validación → Pruebas → Despliegue y monitoreo |
| Librería / paquete / CLI | Diseño de la API → Implementación → Pruebas y ejemplos → Documentación → Publicación |
| Datos / ML / notebooks | Datos y limpieza → Exploración → Modelado → Evaluación → Entrega |
| Proyecto recién iniciado (casi sin código) | Descubrimiento → Diseño → Base técnica → Desarrollo → Pruebas → Lanzamiento |

`proyecto.faseActual`: la primera fase que no está completa. Si una fase posterior ya tiene trabajo hecho, se refleja con su porcentaje, pero la fase actual sigue siendo la primera incompleta.

## 4. Crear las tareas

- Concretas y verificables: "Agregar pruebas al servicio de pagos (`src/services/pagos.ts`)", no "Mejorar la calidad".
- Una tarea por resultado; si tiene varias partes, usa `pasos`.
- `origen`: los archivos que motivaron la tarea (o `"análisis"` si es un hueco general, como "no hay CI").
- `descripcion`: una o dos frases con el porqué.
- Prioridad: `alta` para lo que bloquea usar o lanzar el producto, seguridad y errores graves; `media` para funcionalidades y pruebas importantes; `baja` para mejoras.
- Entre 10 y 40 tareas en total. Si salen más, agrupa.

### Estimar puntos

| Puntos | Tamaño |
|---|---|
| 1 | Cambio trivial, menos de una hora |
| 2 | Pequeño, unas horas |
| 3 | Un día aproximadamente |
| 5 | Dos o tres días, varias partes |
| 8 | Una semana o con incertidumbre; considera dividirla |

## 5. Escribir `tablero-sprints/ANALISIS.md`

Estructura:

```markdown
# Análisis del proyecto — <nombre>
Fecha: YYYY-MM-DD

## Qué es
Tipo, stack, estructura y estado general en 3–5 líneas.

## Fuentes revisadas sin resultados
Lista de lo que se buscó en el Paso 1 (documentos, casillas, specs, TODO/FIXME, GitHub) y por qué se hizo este análisis.

## Hallazgos por área
### Funcionalidades
- Hecho: … (`ruta`)
- Falta: … (`ruta`)
### Pruebas
…

## Fases propuestas
1. <Fase> — por qué y qué la completa.
…
Fase actual: <fase>, porque …

## Sprint 1 propuesto
Tareas y razón de la prioridad.

## Dudas para el equipo
Cosas que el código no deja claras (alcance, fechas, prioridades de negocio).
```

## 6. Cerrar el análisis con el usuario

En la respuesta, resume en pocas líneas: tipo de proyecto, fase actual, las 3–5 tareas más importantes y las dudas abiertas. Invita a ajustar el plan ("¿cambio alguna fase o prioridad?"), porque el análisis es una propuesta y el usuario conoce el negocio.
