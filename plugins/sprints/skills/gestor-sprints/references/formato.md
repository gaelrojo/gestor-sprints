# Formato de `tablero-sprints/datos.js`

El archivo es JSON envuelto en una asignación de JavaScript, para que `tablero.html` lo lea al abrirse con doble clic (sin servidor). Debe tener exactamente esta forma:

```js
// gestor-sprints: datos del tablero. Pídele los cambios a Claude con /gestor-sprints.
window.TABLERO = {
  "version": 1,
  "proyecto": { ... },
  "sprints": [ ... ],
  "tareas": [ ... ],
  "bitacora": [ ... ]
};
```

Todo lo que va después de `window.TABLERO = ` y antes del `;` final es **JSON estricto**: comillas dobles, sin comas finales, sin comentarios.

## `proyecto`

| Campo | Tipo | Notas |
|---|---|---|
| `nombre` | texto | Nombre del proyecto (del README o el manifiesto) |
| `objetivo` | texto | Una frase: qué se quiere lograr |
| `fases` | lista | En orden: `[{"id": "base-tecnica", "nombre": "Base técnica", "descripcion": "…"}]`. `id` en minúsculas, sin acentos ni espacios |
| `faseActual` | texto | `id` de la fase actual |
| `sprintActivo` | texto o null | `id` del sprint activo |
| `duracionDias` | número | 14 por defecto |
| `origen` | texto | `"descubierto"`, `"analisis"` o `"manual"` |
| `creado` | fecha | Cuándo se creó el tablero |
| `actualizado` | fecha | Última modificación |

## `sprints[]`

| Campo | Tipo | Notas |
|---|---|---|
| `id` | texto | `s01`, `s02`… |
| `nombre` | texto | "Sprint 1" |
| `objetivo` | texto | Una frase |
| `inicio`, `fin` | fecha | `fin` incluido: un sprint de 14 días que empieza el 2026-10-19 termina el 2026-11-01 |
| `estado` | texto | `planeado`, `activo` o `cerrado` |
| `fase` | texto | `id` de la fase principal del sprint |
| `velocidad` | número | Puntos hechos; se llena al cerrar |
| `retro` | objeto | `{"bien": "…", "mejorar": "…", "acciones": "…"}`; al cerrar |

## `tareas[]`

| Campo | Tipo | Notas |
|---|---|---|
| `id` | texto | `t001`, `t002`… |
| `titulo` | texto | Corto, en infinitivo |
| `descripcion` | texto | Opcional |
| `sprint` | texto | `id` del sprint, `"backlog"` (pendiente sin sprint) o `"previo"` (ya estaba hecha cuando se creó el tablero) |
| `fase` | texto | `id` de la fase |
| `estado` | texto | `por_hacer`, `en_progreso`, `en_revision`, `hecho` o `bloqueado` |
| `prioridad` | texto | `alta`, `media` o `baja` |
| `puntos` | número o null | 1, 2, 3, 5, 8 |
| `responsable` | texto | Nombre o usuario; vacío si no hay |
| `pasos` | lista | `[{"texto": "…", "hecho": false}]` |
| `bloqueo` | texto | Motivo, si está bloqueada |
| `origen` | lista de textos | `["README.md:42", "src/app.ts:118", "#12"]` o `["análisis"]` |
| `creada` | fecha | |
| `completada` | fecha o null | Se llena al pasar a `hecho`; se pone en null si sale de `hecho` |
| `orden` | número | Para ordenar dentro de una columna |

## `bitacora[]`

Lista de pasos realizados, del más viejo al más nuevo:

```json
{"fecha": "2026-10-19", "hora": "17:45", "sprint": "s01", "texto": "Carrito: ya se guarda al cerrar sesión.", "tarea": "t013"}
```

`sprint` es obligatorio (usa `"general"` si no aplica); `tarea` es opcional. Si la bitácora pasa de 1,000 entradas, mueve las de sprints cerrados a `tablero-sprints/bitacora-archivo.json`.

## Ejemplo mínimo

```js
// gestor-sprints: datos del tablero. Pídele los cambios a Claude con /gestor-sprints.
window.TABLERO = {
  "version": 1,
  "proyecto": {
    "nombre": "Mi app",
    "objetivo": "Publicar la primera versión en diciembre.",
    "fases": [
      {"id": "base-tecnica", "nombre": "Base técnica"},
      {"id": "funcionalidades", "nombre": "Funcionalidades"},
      {"id": "pruebas", "nombre": "Pruebas"},
      {"id": "lanzamiento", "nombre": "Lanzamiento"}
    ],
    "faseActual": "funcionalidades",
    "sprintActivo": "s01",
    "duracionDias": 14,
    "origen": "descubierto",
    "creado": "2026-10-19",
    "actualizado": "2026-10-19"
  },
  "sprints": [
    {"id": "s01", "nombre": "Sprint 1", "objetivo": "Login y catálogo", "inicio": "2026-10-19", "fin": "2026-11-01", "estado": "activo", "fase": "funcionalidades"}
  ],
  "tareas": [
    {"id": "t001", "titulo": "Configurar el proyecto", "sprint": "previo", "fase": "base-tecnica", "estado": "hecho", "prioridad": "alta", "puntos": 2, "responsable": "", "pasos": [], "bloqueo": "", "origen": ["package.json"], "creada": "2026-10-19", "completada": "2026-10-19", "orden": 1},
    {"id": "t002", "titulo": "Validar el email en el registro", "sprint": "s01", "fase": "funcionalidades", "estado": "por_hacer", "prioridad": "media", "puntos": 2, "responsable": "", "pasos": [], "bloqueo": "", "origen": ["src/auth/registro.ts:31"], "creada": "2026-10-19", "completada": null, "orden": 2}
  ],
  "bitacora": [
    {"fecha": "2026-10-19", "hora": "10:00", "sprint": "s01", "texto": "Tablero creado a partir de 2 tareas encontradas en el proyecto."}
  ]
};
```

## Validar

Después de cada cambio, valida con lo que haya disponible:

```bash
node -e "const s=require('fs').readFileSync('tablero-sprints/datos.js','utf8');const k='window.TABLERO =';const i=s.indexOf(k);JSON.parse(s.slice(i+k.length,s.lastIndexOf(';')));console.log('datos.js válido')"
```

```bash
python3 -c "s=open('tablero-sprints/datos.js',encoding='utf-8').read();k='window.TABLERO =';import json;json.loads(s[s.index(k)+len(k):s.rindex(';')]);print('datos.js válido')"
```

(En Windows usa `python` en lugar de `python3`.) Si no hay Node ni Python, revisa a mano que el JSON esté bien formado. Comprueba también que cada `sprint` (salvo `backlog` y `previo`) y cada `fase` de las tareas exista, y que `sprintActivo` y `faseActual` apunten a ids válidos.
