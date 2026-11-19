# CochaSabe

La guía viva de Cochabamba: pregunta, encuentra y resuelve. Es una página web para celular y
computador, hecha por el equipo **CodeBambinos** para la hackathon National Startups by
Stellar.

## Cómo correrla
No hay que compilar nada. Basta con servir la carpeta:

```bash
python3 -m http.server 5180
# abre http://localhost:5180
```

## Supabase
Pon la URL del proyecto y la clave pública (*publishable* o *anon*) en `js/config.js`.
- Si los dos valores quedan vacíos, la app corre en **modo demo**, sin servidor, con los datos
  de ejemplo.
- Nunca pongas en el repositorio la clave `service_role` ni la secreta.

## Estructura
| Archivo | Contenido |
|---|---|
| `index.html` | Contenedor `#app` y carga de los scripts |
| `css/estilos.css` | Variables de color, tema claro y oscuro, vista de celular y de computador |
| `js/config.js` | Configuración pública de Supabase |
| `js/auth.js` | Inicio de sesión, registro y sesión con Supabase |
| `js/datos.js` | Datos de ejemplo: letreros, preguntas, avisos, etiquetas y zonas |
| `js/estado.js` | Estado global `S` y utilidades |
| `js/pantallas.js` | HTML de cada pantalla y `draw()` |
| `js/acciones.js` | Clics globales (`data-a`) y arranque |
| `js/mascota.js` | Tilcho, la mascota |

## Estado
- ✅ Intro, inicio de sesión y registro con Supabase (correo y contraseña), tutorial y las
  pantallas Hoy, ¿Alguien sabe? y Yo (del prototipo v9).
- ⏳ Entrar con celular, cuenta para invitados, datos compartidos en Supabase.
- ⏳ Stellar testnet: cuenta al crear el perfil (nivel 1) y pago al calificar «Me sirvió»
  (nivel 2).
