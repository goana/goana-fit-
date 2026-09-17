// =============================================================
// CONFIGURACIÓN — Edita estos valores antes de usar la app
// Lee README.md para instrucciones paso a paso
// =============================================================

// 1. ID de cliente OAuth 2.0 de Google Cloud Console
//    Formato: 123456789-xxxx.apps.googleusercontent.com
const CLIENT_ID = '612809897673-ajl5njc448c70e3t7vvh52jdkptt5blc.apps.googleusercontent.com';

// 3. API Key de Anthropic (para importar datos desde foto de báscula)
//    Obtén la tuya en: platform.anthropic.com/api-keys
const ANTHROPIC_API_KEY = '';

// 2. ID de tu Google Spreadsheet
//    Lo encuentras en la URL: docs.google.com/spreadsheets/d/AQUI/edit
const SPREADSHEET_ID = '1ydSag5qwNyg32PWrsZFFNMI6oRs1HwH_rMOFCZ4U2Mc';

// URLs de vídeos técnicos (opcional — pega la URL o deja null)
const VIDEO_URLS = {
  'Sentadilla Goblet':     'https://www.youtube.com/shorts/SpMrPG3RiCQ',
  'Remo a una mano':       'https://youtube.com/shorts/DnQytXQMqcw?si=C-mEoTpM49Vh4W70',
  'Zancadas / Lunges':     'https://youtu.be/-iGRWD09Jn8?si=B5pFsnJl0cqnnUoZ',
  'Press Militar': 'https://www.youtube.com/shorts/7R0P0dVbKWk',
  'Curl de Bíceps':        'https://www.youtube.com/watch?v=HU2lghjU29Y',
  'Extensión de Tríceps':  'https://youtube.com/shorts/FpSPAppMbds?si=gDb8ZfO-WOfXdlzS',
  'Bird-Dog':              'https://youtu.be/O1HWwhYmQGE?si=INuIIJ71pUzbhEC5',
  'Plancha Frontal':       'https://youtube.com/shorts/WRS7srxj0QM?si=4TnvU9R5NnWlRNjN',
  'Deadbug':               'https://youtube.com/shorts/fzVzaIWOZUQ?si=wCoYZ8mrev_XOkt3',
  // Tren inferior (pega la URL del vídeo cuando quieras)
  'Peso muerto rumano':    'https://musclewiki.com/es-es/exercise/dumbbell-romanian-deadlift?model=f',
  'Puente de glúteo':      'https://musclewiki.com/es-es/exercise/dumbbell-glute-bridge?model=f',
  'Elevación de gemelo':   'https://musclewiki.com/es-es/exercise/dumbbell-calf-raise?model=f',
  // Tren superior y core (nuevos)
  'Elevación lateral':     'https://musclewiki.com/es-es/exercise/dumbbell-lateral-raise?model=f',
  'Curl martillo':         'https://musclewiki.com/es-es/exercise/dumbbell-hammer-curl?model=f',
  'Patada de tríceps':     'https://musclewiki.com/es-es/exercise/dumbbell-tricep-kickback?model=f',
  'Plancha lateral (izq)': 'https://musclewiki.com/es-es/exercise/dumbbell-hand-side-plank?model=f',
  'Plancha lateral (der)': 'https://musclewiki.com/es-es/exercise/dumbbell-hand-side-plank?model=f',
};

// Biblioteca de RUTINAS EN CASA guiadas por vídeo.
// Cada una la sigues en el vídeo y luego la registras (fecha, duración, nota).
// Para añadir una nueva: copia una línea y cambia id, nombre, url, dur (min) y tipo.
const CASA_RUTINAS = [
  {
    id:     'fuerza-full-pesas',
    nombre: 'Fuerza cuerpo completo (pesas)',
    url:    'https://youtu.be/EJN-KhQXZ5o?si=04IJDl6GtsdMSKeG',
    dur:    35,
    tipo:   'Fuerza',
  },
];
