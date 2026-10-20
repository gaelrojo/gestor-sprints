// gestor-sprints: datos del tablero. Pídele los cambios a Claude con /gestor-sprints.
window.TABLERO = {
  "version": 1,
  "proyecto": {
    "nombre": "Tienda en línea (ejemplo)",
    "objetivo": "Lanzar la primera versión de la tienda con catálogo, carrito y pagos antes de diciembre.",
    "fases": [
      {
        "id": "descubrimiento",
        "nombre": "Descubrimiento"
      },
      {
        "id": "diseno",
        "nombre": "Diseño"
      },
      {
        "id": "desarrollo",
        "nombre": "Desarrollo"
      },
      {
        "id": "pruebas",
        "nombre": "Pruebas"
      },
      {
        "id": "lanzamiento",
        "nombre": "Lanzamiento"
      }
    ],
    "faseActual": "desarrollo",
    "sprintActivo": "s03",
    "duracionDias": 14,
    "origen": "descubierto",
    "creado": "2026-09-14",
    "actualizado": "2026-10-19"
  },
  "sprints": [
    {
      "id": "s01",
      "nombre": "Sprint 1",
      "objetivo": "Entender a los clientes y definir el MVP",
      "inicio": "2026-09-14",
      "fin": "2026-09-27",
      "estado": "cerrado",
      "fase": "descubrimiento",
      "velocidad": 18,
      "retro": {
        "bien": "Las entrevistas dieron requisitos claros.",
        "mejorar": "Subestimamos el tiempo de los wireframes.",
        "acciones": "Partir las tareas de diseño en piezas de 3 puntos o menos."
      }
    },
    {
      "id": "s02",
      "nombre": "Sprint 2",
      "objetivo": "Cerrar el diseño y preparar la base técnica",
      "inicio": "2026-09-28",
      "fin": "2026-10-11",
      "estado": "cerrado",
      "fase": "diseno",
      "velocidad": 23,
      "retro": {
        "bien": "El prototipo se validó sin cambios grandes.",
        "mejorar": "Las revisiones de diseño se juntaron al final.",
        "acciones": "Revisar diseño dos veces por semana."
      }
    },
    {
      "id": "s03",
      "nombre": "Sprint 3",
      "objetivo": "Catálogo, carrito e inicio de sesión funcionando",
      "inicio": "2026-10-12",
      "fin": "2026-10-25",
      "estado": "activo",
      "fase": "desarrollo"
    },
    {
      "id": "s04",
      "nombre": "Sprint 4",
      "objetivo": "Pagos, correos y primeras pruebas",
      "inicio": "2026-10-26",
      "fin": "2026-11-08",
      "estado": "planeado",
      "fase": "desarrollo"
    }
  ],
  "tareas": [
    {
      "id": "t001",
      "titulo": "Entrevistar a 5 clientes",
      "descripcion": "",
      "sprint": "s01",
      "fase": "descubrimiento",
      "estado": "hecho",
      "prioridad": "alta",
      "puntos": 3,
      "responsable": "Ana",
      "pasos": [],
      "bloqueo": "",
      "creada": "2026-09-14",
      "completada": "2026-09-17",
      "orden": 1,
      "origen": [
        "ROADMAP.md:8"
      ]
    },
    {
      "id": "t002",
      "titulo": "Analizar 4 tiendas de la competencia",
      "descripcion": "",
      "sprint": "s01",
      "fase": "descubrimiento",
      "estado": "hecho",
      "prioridad": "media",
      "puntos": 2,
      "responsable": "Luis",
      "pasos": [],
      "bloqueo": "",
      "creada": "2026-09-14",
      "completada": "2026-09-16",
      "orden": 2,
      "origen": [
        "ROADMAP.md:9"
      ]
    },
    {
      "id": "t003",
      "titulo": "Definir el alcance del MVP",
      "descripcion": "",
      "sprint": "s01",
      "fase": "descubrimiento",
      "estado": "hecho",
      "prioridad": "alta",
      "puntos": 3,
      "responsable": "Ana",
      "pasos": [],
      "bloqueo": "",
      "creada": "2026-09-14",
      "completada": "2026-09-21",
      "orden": 3,
      "origen": [
        "ROADMAP.md:10"
      ]
    },
    {
      "id": "t004",
      "titulo": "Mapa de navegación",
      "descripcion": "",
      "sprint": "s01",
      "fase": "diseno",
      "estado": "hecho",
      "prioridad": "alta",
      "puntos": 5,
      "responsable": "Marta",
      "pasos": [],
      "bloqueo": "",
      "creada": "2026-09-14",
      "completada": "2026-09-24",
      "orden": 4,
      "origen": [
        "ROADMAP.md:14"
      ]
    },
    {
      "id": "t005",
      "titulo": "Wireframes del catálogo",
      "descripcion": "",
      "sprint": "s01",
      "fase": "diseno",
      "estado": "hecho",
      "prioridad": "media",
      "puntos": 5,
      "responsable": "Marta",
      "pasos": [],
      "bloqueo": "",
      "creada": "2026-09-14",
      "completada": "2026-09-26",
      "orden": 5,
      "origen": [
        "ROADMAP.md:15"
      ]
    },
    {
      "id": "t006",
      "titulo": "Guía de estilos",
      "descripcion": "",
      "sprint": "s02",
      "fase": "diseno",
      "estado": "hecho",
      "prioridad": "media",
      "puntos": 3,
      "responsable": "Marta",
      "pasos": [],
      "bloqueo": "",
      "creada": "2026-09-28",
      "completada": "2026-10-01",
      "orden": 6,
      "origen": [
        "ROADMAP.md:16"
      ]
    },
    {
      "id": "t007",
      "titulo": "Diseño visual del checkout",
      "descripcion": "",
      "sprint": "s02",
      "fase": "diseno",
      "estado": "hecho",
      "prioridad": "alta",
      "puntos": 5,
      "responsable": "Marta",
      "pasos": [],
      "bloqueo": "",
      "creada": "2026-09-28",
      "completada": "2026-10-05",
      "orden": 7,
      "origen": [
        "ROADMAP.md:17",
        "#4"
      ]
    },
    {
      "id": "t008",
      "titulo": "Configurar repositorio e integración continua",
      "descripcion": "",
      "sprint": "s02",
      "fase": "desarrollo",
      "estado": "hecho",
      "prioridad": "alta",
      "puntos": 3,
      "responsable": "Diego",
      "pasos": [],
      "bloqueo": "",
      "creada": "2026-09-28",
      "completada": "2026-09-30",
      "orden": 8,
      "origen": [
        "#2"
      ]
    },
    {
      "id": "t009",
      "titulo": "Modelo de datos de productos",
      "descripcion": "",
      "sprint": "s02",
      "fase": "desarrollo",
      "estado": "hecho",
      "prioridad": "alta",
      "puntos": 5,
      "responsable": "Diego",
      "pasos": [],
      "bloqueo": "",
      "creada": "2026-09-28",
      "completada": "2026-10-07",
      "orden": 9,
      "origen": [
        "#3"
      ]
    },
    {
      "id": "t010",
      "titulo": "Prototipo navegable",
      "descripcion": "",
      "sprint": "s02",
      "fase": "diseno",
      "estado": "hecho",
      "prioridad": "media",
      "puntos": 5,
      "responsable": "Marta",
      "pasos": [],
      "bloqueo": "",
      "creada": "2026-09-28",
      "completada": "2026-10-09",
      "orden": 10,
      "origen": [
        "ROADMAP.md:18"
      ]
    },
    {
      "id": "t011",
      "titulo": "Validar el prototipo con 3 usuarios",
      "descripcion": "",
      "sprint": "s02",
      "fase": "diseno",
      "estado": "hecho",
      "prioridad": "media",
      "puntos": 2,
      "responsable": "Ana",
      "pasos": [],
      "bloqueo": "",
      "creada": "2026-09-28",
      "completada": "2026-10-10",
      "orden": 11,
      "origen": [
        "ROADMAP.md:19"
      ]
    },
    {
      "id": "t012",
      "titulo": "Catálogo con filtros",
      "descripcion": "",
      "sprint": "s03",
      "fase": "desarrollo",
      "estado": "hecho",
      "prioridad": "alta",
      "puntos": 5,
      "responsable": "Diego",
      "pasos": [
        {
          "texto": "Listado de productos",
          "hecho": true
        },
        {
          "texto": "Filtro por categoría",
          "hecho": true
        },
        {
          "texto": "Filtro por precio",
          "hecho": true
        },
        {
          "texto": "Paginación",
          "hecho": true
        }
      ],
      "bloqueo": "",
      "creada": "2026-10-12",
      "completada": "2026-10-16",
      "orden": 12,
      "origen": [
        "#6"
      ]
    },
    {
      "id": "t013",
      "titulo": "Carrito de compras",
      "descripcion": "",
      "sprint": "s03",
      "fase": "desarrollo",
      "estado": "en_progreso",
      "prioridad": "alta",
      "puntos": 5,
      "responsable": "Luis",
      "pasos": [
        {
          "texto": "Agregar y quitar productos",
          "hecho": true
        },
        {
          "texto": "Calcular subtotal",
          "hecho": true
        },
        {
          "texto": "Guardar el carrito al cerrar sesión",
          "hecho": true
        },
        {
          "texto": "Aplicar cupones",
          "hecho": false
        },
        {
          "texto": "Pruebas manuales",
          "hecho": false
        }
      ],
      "bloqueo": "",
      "creada": "2026-10-12",
      "completada": null,
      "orden": 13,
      "origen": [
        "#7",
        "src/carrito/cupones.ts:12"
      ]
    },
    {
      "id": "t014",
      "titulo": "Inicio de sesión con correo y Google",
      "descripcion": "",
      "sprint": "s03",
      "fase": "desarrollo",
      "estado": "hecho",
      "prioridad": "alta",
      "puntos": 3,
      "responsable": "Diego",
      "pasos": [],
      "bloqueo": "",
      "creada": "2026-10-12",
      "completada": "2026-10-14",
      "orden": 14,
      "origen": [
        "#8"
      ]
    },
    {
      "id": "t015",
      "titulo": "Integrar pasarela de pagos",
      "descripcion": "",
      "sprint": "s03",
      "fase": "desarrollo",
      "estado": "bloqueado",
      "prioridad": "alta",
      "puntos": 5,
      "responsable": "Luis",
      "pasos": [
        {
          "texto": "Elegir proveedor",
          "hecho": true
        },
        {
          "texto": "Configurar credenciales de prueba",
          "hecho": false
        },
        {
          "texto": "Flujo de pago",
          "hecho": false
        },
        {
          "texto": "Manejo de errores",
          "hecho": false
        }
      ],
      "bloqueo": "Esperamos las credenciales de prueba del proveedor de pagos.",
      "creada": "2026-10-12",
      "completada": null,
      "orden": 15,
      "origen": [
        "#9",
        "src/pagos/pasarela.ts:41"
      ]
    },
    {
      "id": "t016",
      "titulo": "Página de detalle de producto",
      "descripcion": "",
      "sprint": "s03",
      "fase": "desarrollo",
      "estado": "en_revision",
      "prioridad": "media",
      "puntos": 3,
      "responsable": "Diego",
      "pasos": [
        {
          "texto": "Galería de fotos",
          "hecho": true
        },
        {
          "texto": "Variantes de talla y color",
          "hecho": true
        },
        {
          "texto": "Botón de agregar al carrito",
          "hecho": true
        }
      ],
      "bloqueo": "",
      "creada": "2026-10-12",
      "completada": null,
      "orden": 16,
      "origen": [
        "#10"
      ]
    },
    {
      "id": "t017",
      "titulo": "Correo de confirmación de pedido",
      "descripcion": "",
      "sprint": "s03",
      "fase": "desarrollo",
      "estado": "por_hacer",
      "prioridad": "baja",
      "puntos": 2,
      "responsable": "Ana",
      "pasos": [],
      "bloqueo": "",
      "creada": "2026-10-12",
      "completada": null,
      "orden": 17,
      "origen": [
        "src/pedidos/notificar.ts:27"
      ]
    },
    {
      "id": "t018",
      "titulo": "Pruebas unitarias del carrito",
      "descripcion": "",
      "sprint": "s03",
      "fase": "pruebas",
      "estado": "por_hacer",
      "prioridad": "media",
      "puntos": 2,
      "responsable": "Luis",
      "pasos": [],
      "bloqueo": "",
      "creada": "2026-10-12",
      "completada": null,
      "orden": 18,
      "origen": [
        "src/carrito/carrito.test.ts:3"
      ]
    },
    {
      "id": "t019",
      "titulo": "Panel de inventario",
      "descripcion": "",
      "sprint": "s03",
      "fase": "desarrollo",
      "estado": "hecho",
      "prioridad": "media",
      "puntos": 3,
      "responsable": "Diego",
      "pasos": [],
      "bloqueo": "",
      "creada": "2026-10-12",
      "completada": "2026-10-17",
      "orden": 19,
      "origen": [
        "#11"
      ]
    },
    {
      "id": "t020",
      "titulo": "Búsqueda de productos",
      "descripcion": "",
      "sprint": "s03",
      "fase": "desarrollo",
      "estado": "hecho",
      "prioridad": "media",
      "puntos": 2,
      "responsable": "Diego",
      "pasos": [],
      "bloqueo": "",
      "creada": "2026-10-12",
      "completada": "2026-10-13",
      "orden": 20,
      "origen": [
        "#5"
      ]
    },
    {
      "id": "t021",
      "titulo": "Reseñas de productos",
      "descripcion": "",
      "sprint": "backlog",
      "fase": "desarrollo",
      "estado": "por_hacer",
      "prioridad": "baja",
      "puntos": 3,
      "responsable": "",
      "pasos": [],
      "bloqueo": "",
      "creada": "2026-10-02",
      "completada": null,
      "orden": 21,
      "origen": [
        "ROADMAP.md:31"
      ]
    },
    {
      "id": "t022",
      "titulo": "Pruebas de carga",
      "descripcion": "",
      "sprint": "backlog",
      "fase": "pruebas",
      "estado": "por_hacer",
      "prioridad": "media",
      "puntos": 5,
      "responsable": "",
      "pasos": [],
      "bloqueo": "",
      "creada": "2026-10-02",
      "completada": null,
      "orden": 22,
      "origen": [
        "ROADMAP.md:36"
      ]
    },
    {
      "id": "t023",
      "titulo": "Prueba beta con 20 clientes",
      "descripcion": "",
      "sprint": "backlog",
      "fase": "pruebas",
      "estado": "por_hacer",
      "prioridad": "alta",
      "puntos": 3,
      "responsable": "Ana",
      "pasos": [],
      "bloqueo": "",
      "creada": "2026-10-02",
      "completada": null,
      "orden": 23,
      "origen": [
        "ROADMAP.md:37"
      ]
    },
    {
      "id": "t024",
      "titulo": "Plan de lanzamiento y comunicación",
      "descripcion": "",
      "sprint": "backlog",
      "fase": "lanzamiento",
      "estado": "por_hacer",
      "prioridad": "media",
      "puntos": 3,
      "responsable": "Ana",
      "pasos": [],
      "bloqueo": "",
      "creada": "2026-10-02",
      "completada": null,
      "orden": 24,
      "origen": [
        "ROADMAP.md:41"
      ]
    },
    {
      "id": "t025",
      "titulo": "Publicar en producción",
      "descripcion": "",
      "sprint": "backlog",
      "fase": "lanzamiento",
      "estado": "por_hacer",
      "prioridad": "alta",
      "puntos": 2,
      "responsable": "Diego",
      "pasos": [],
      "bloqueo": "",
      "creada": "2026-10-02",
      "completada": null,
      "orden": 25,
      "origen": [
        "ROADMAP.md:42"
      ]
    }
  ],
  "bitacora": [
    {
      "fecha": "2026-09-14",
      "hora": "09:10",
      "sprint": "s01",
      "texto": "Sprint 1 iniciado: entender a los clientes y definir el MVP."
    },
    {
      "fecha": "2026-09-17",
      "hora": "18:20",
      "sprint": "s01",
      "texto": "Terminadas las 5 entrevistas con clientes.",
      "tarea": "t001"
    },
    {
      "fecha": "2026-09-21",
      "hora": "13:00",
      "sprint": "s01",
      "texto": "Alcance del MVP aprobado.",
      "tarea": "t003"
    },
    {
      "fecha": "2026-09-27",
      "hora": "17:00",
      "sprint": "s01",
      "texto": "Sprint 1 cerrado con 18 puntos."
    },
    {
      "fecha": "2026-09-28",
      "hora": "09:00",
      "sprint": "s02",
      "texto": "Sprint 2 iniciado: cerrar el diseño y preparar la base técnica."
    },
    {
      "fecha": "2026-10-05",
      "hora": "16:30",
      "sprint": "s02",
      "texto": "Diseño del checkout terminado.",
      "tarea": "t007"
    },
    {
      "fecha": "2026-10-10",
      "hora": "12:45",
      "sprint": "s02",
      "texto": "Prototipo validado con 3 usuarios.",
      "tarea": "t011"
    },
    {
      "fecha": "2026-10-11",
      "hora": "17:15",
      "sprint": "s02",
      "texto": "Sprint 2 cerrado con 23 puntos."
    },
    {
      "fecha": "2026-10-12",
      "hora": "09:05",
      "sprint": "s03",
      "texto": "Sprint 3 iniciado: catálogo, carrito e inicio de sesión."
    },
    {
      "fecha": "2026-10-13",
      "hora": "16:40",
      "sprint": "s03",
      "texto": "Búsqueda de productos terminada.",
      "tarea": "t020"
    },
    {
      "fecha": "2026-10-14",
      "hora": "12:15",
      "sprint": "s03",
      "texto": "Inicio de sesión con correo y Google terminado.",
      "tarea": "t014"
    },
    {
      "fecha": "2026-10-15",
      "hora": "10:30",
      "sprint": "s03",
      "texto": "Pagos bloqueado: faltan las credenciales de prueba del proveedor.",
      "tarea": "t015"
    },
    {
      "fecha": "2026-10-16",
      "hora": "18:05",
      "sprint": "s03",
      "texto": "Catálogo con filtros terminado.",
      "tarea": "t012"
    },
    {
      "fecha": "2026-10-17",
      "hora": "13:50",
      "sprint": "s03",
      "texto": "Panel de inventario terminado.",
      "tarea": "t019"
    },
    {
      "fecha": "2026-10-19",
      "hora": "11:20",
      "sprint": "s03",
      "texto": "Página de detalle enviada a revisión.",
      "tarea": "t016"
    },
    {
      "fecha": "2026-10-19",
      "hora": "17:45",
      "sprint": "s03",
      "texto": "Carrito: ya se guarda al cerrar sesión (3 de 5 pasos).",
      "tarea": "t013"
    }
  ]
};
