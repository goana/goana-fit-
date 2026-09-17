const SPREADSHEET_ID = '1ydSag5qwNyg32PWrsZFFNMI6oRs1HwH_rMOFCZ4U2Mc';

// Ejecutar una vez desde el editor, cambiando antes la clave.
function configurar() {
  PropertiesService.getScriptProperties().setProperty('CLAVE', 'CAMBIA-ESTA-CLAVE');
  SpreadsheetApp.openById(SPREADSHEET_ID).getName();
}

function doPost(e) {
  const req = JSON.parse(e.postData.contents);
  const clave = PropertiesService.getScriptProperties().getProperty('CLAVE');
  if (!clave || req.key !== clave) return responder({ status: 401, text: '' });

  const url = 'https://sheets.googleapis.com/v4/spreadsheets/' + SPREADSHEET_ID
    + (req.path || '') + (req.params ? '?' + req.params : '');
  const opciones = {
    method: String(req.method || 'GET').toLowerCase(),
    headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() },
    contentType: 'application/json',
    muteHttpExceptions: true,
  };
  if (req.body !== null && req.body !== undefined) opciones.payload = JSON.stringify(req.body);

  const r = UrlFetchApp.fetch(url, opciones);
  return responder({ status: r.getResponseCode(), text: r.getContentText() });
}

function responder(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
