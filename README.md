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

## Stellar (testnet)
Los cochapuntos son el activo **COCHA**. CochaSabe los emite y los paga desde su cuenta
distribuidora, con un memo por cada acción.

```bash
npm install
npm run stellar:setup   # crea la emisora y la distribuidora de COCHA y guarda las claves en .env
npm run stellar:e2e     # prueba: cuenta nueva, +5 COCHA, −1 COCHA y saldo leído de la cadena
npm run typecheck
```
Requiere Node 22.18 o superior. Las claves quedan solo en `.env`, que está ignorado por git.
