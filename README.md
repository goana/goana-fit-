# Mi Entrenamiento — Guía de configuración

App web ligera para registrar entrenamientos de hipertrofia 3 días/semana,
con persistencia en Google Sheets y funcionamiento offline.

---

## Requisitos previos

- Cuenta de Google
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Python 3, Node.js o VS Code con Live Server (para el servidor local)

---

## Paso 1 — Crear proyecto en Google Cloud Console

1. Ve a [console.cloud.google.com](https://console.cloud.google.com) e inicia sesión.
2. En el selector de proyectos (parte superior), haz clic en **Nuevo proyecto**.
   - Nombre: `mi-entrenamiento` (o cualquiera)
   - Haz clic en **Crear**.
3. Con el proyecto seleccionado, ve al menú lateral → **APIs y servicios** → **Biblioteca**.
4. Busca `Google Sheets API` → selecciónala → clic en **Habilitar**.
5. Ve a **APIs y servicios** → **Credenciales** → **Crear credenciales** → **ID de cliente de OAuth 2.0**.
6. Si se te pide configurar la pantalla de consentimiento:
   - Tipo de usuario: **Externo** → Crear
   - Nombre de la app: `Mi Entrenamiento`
   - Correo de asistencia y desarrollador: tu email
   - Guardar y continuar (puedes dejar el resto vacío por ahora)
   - En la sección **Usuarios de prueba**, añade tu dirección de Gmail → Guardar
7. Vuelve a **Credenciales** → **Crear credenciales** → **ID de cliente de OAuth 2.0**:
   - Tipo de aplicación: **Aplicación web**
   - Nombre: `Mi Entrenamiento Web`
   - **Orígenes de JavaScript autorizados** — añade:
     ```
     http://localhost:8000
     http://127.0.0.1:8000
     ```
     *(Ajusta el puerto si usas otro)*
   - Haz clic en **Crear**.
8. Copia el **ID de cliente** que aparece (formato: `xxxxx.apps.googleusercontent.com`).

---

## Paso 2 — Crear la hoja de Google Sheets

1. Ve a [sheets.google.com](https://sheets.google.com) y crea una **hoja en blanco**.
2. Dale un nombre descriptivo, ej. `Entrenamiento Hipertrofia`.
3. Copia el **ID del spreadsheet** desde la URL del navegador:

   ```
   https://docs.google.com/spreadsheets/d/ ← ESTE_ID_AQUÍ → /edit
   ```

   El ID es la cadena larga entre `/d/` y `/edit`.

---

## Paso 3 — Configurar la app

Abre `config.js` con cualquier editor de texto y pega tus valores:

```javascript
const CLIENT_ID      = 'TU_ID_AQUI.apps.googleusercontent.com';
const SPREADSHEET_ID = 'TU_SPREADSHEET_ID_AQUI';
```

**Opcional:** si quieres añadir vídeos técnicos a los ejercicios, rellena también `VIDEO_URLS`:

```javascript
const VIDEO_URLS = {
  'Sentadilla Goblet':     'https://youtu.be/...',
  'Remo a una mano':       'https://youtu.be/...',
  // ...
};
```

---

## Paso 4 — Lanzar la app con un servidor local

> **¿Por qué necesito un servidor local?**
> Google OAuth requiere que el origen (`http://localhost`) esté registrado.
> El protocolo `file://` no está permitido por Google.

Elige una opción:

### Opción A: Python (más sencillo, sin instalar nada extra)
```bash
# Desde la carpeta que contiene index.html y config.js:
python3 -m http.server 8000
```
Abre en el navegador: **http://localhost:8000**

### Opción B: Node.js (con npx)
```bash
npx serve .
```

### Opción C: VS Code con Live Server
- Instala la extensión **Live Server** en VS Code.
- Abre la carpeta del proyecto en VS Code.
- Clic derecho sobre `index.html` → **Open with Live Server**.
- Añade el origen que Live Server use (ej. `http://127.0.0.1:5500`) en Google Cloud Console.

---

## Primer uso

1. Abre la app en el navegador → aparece la pantalla de **Conectar con Google**.
2. Haz clic en el botón → se abre una ventana emergente de Google.
3. Selecciona tu cuenta y autoriza el acceso a Google Sheets.
4. La app crea automáticamente las hojas `sesiones` y `config` en tu spreadsheet.
5. ¡Listo! Ya puedes registrar tu primer entrenamiento.

---

## Estructura de datos en Google Sheets

La app gestiona automáticamente dos pestañas:

### Hoja `sesiones`
| fecha | ejercicio | serie | peso_kg | reps | completada |
|-------|-----------|-------|---------|------|------------|
| 2025-04-05 | Sentadilla Goblet | 1 | 15 | 12 | true |

### Hoja `config`
| clave | valor |
|-------|-------|
| streak_actual | 5 |
| streak_record | 12 |
| ultimo_entrenamiento | 2025-04-05 |

---

## Solución de problemas

| Problema | Solución |
|----------|----------|
| `Error: El origen no está autorizado` | Añade `http://localhost:8000` en los orígenes autorizados de tus credenciales OAuth en Google Cloud Console |
| `Error 403` | Verifica que la **Google Sheets API** esté habilitada en tu proyecto de Google Cloud |
| `Error 404` (hoja no encontrada) | Comprueba que `SPREADSHEET_ID` en `config.js` sea el correcto |
| Ventana emergente bloqueada | Permite popups para `localhost` en la configuración del navegador |
| Token expirado | La app intenta renovarlo automáticamente; si falla, pulsa "Salir" y vuelve a conectar |
| Quiero limpiar la sesión | Abre DevTools (F12) → Application → Local Storage → borra las entradas `gfit_*` |
