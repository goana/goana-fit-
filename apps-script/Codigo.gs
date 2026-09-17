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

  const lista = req.batch || [req];
  const token = ScriptApp.getOAuthToken();
  const peticiones = lista.map(function (r) {
    const p = {
      url: 'https://sheets.googleapis.com/v4/spreadsheets/' + SPREADSHEET_ID
        + (r.path || '') + (r.params ? '?' + r.params : ''),
      method: String(r.method || 'GET').toLowerCase(),
      headers: { Authorization: 'Bearer ' + token },
      contentType: 'application/json',
      muteHttpExceptions: true,
    };
    if (r.body !== null && r.body !== undefined) p.payload = JSON.stringify(r.body);
    return p;
  });

  const respuestas = UrlFetchApp.fetchAll(peticiones).map(function (r) {
    return { status: r.getResponseCode(), text: r.getContentText() };
  });
  return responder(req.batch ? { status: 200, batch: respuestas } : respuestas[0]);
}

function responder(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
