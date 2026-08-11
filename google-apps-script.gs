/*
 * Web App di Google Apps Script per raccogliere i report dell'app
 * "I numeri naturali" in un Foglio Google.
 *
 * COME USARLO
 *  1. Apri il Foglio Google che deve raccogliere i report.
 *  2. Menu Estensioni > Apps Script: incolla questo file e salva.
 *  3. Distribuisci > Nuova distribuzione > App web:
 *       - Esegui come:      Me stesso
 *       - Chi ha accesso:   Chiunque      (indispensabile)
 *  4. Copia l'URL della Web App (finisce con /exec) e incollalo nella
 *     costante REPORT_ENDPOINT dentro index.html.
 *  5. Dopo ogni modifica a questo script: Distribuisci > Gestisci
 *     distribuzioni > Modifica > Nuova versione, altrimenti l'URL
 *     continua a usare la versione precedente.
 *
 * Il payload inviato dall'app è JSON (Content-Type text/plain, mode no-cors)
 * con i campi: app, nome, area, areaId, corrette, totale, percentuale,
 * risposteDate, tempoSessioneSecondi, sottoschede[], domande[], report.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Report') || ss.insertSheet('Report');
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Data e ora', 'App', 'Studente', 'Quiz',
        'Corrette', 'Totale', 'Percentuale', 'Risposte date',
        'Tempo sessione (s)', 'Dettaglio risposte', 'Report completo'
      ]);
    }
    var dettaglio = (data.domande || []).map(function (d) {
      return d.n + ') ' + d.esito +
        (d.tempoSecondi != null ? ' [' + d.tempoSecondi + 's]' : '') +
        ': ' + d.domanda + ' → ' + (d.rispostaData || '—');
    }).join('\n');
    sheet.appendRow([
      new Date(),
      data.app || '', data.nome || '', data.area || '',
      data.corrette, data.totale, data.percentuale, data.risposteDate,
      data.tempoSessioneSecondi, dettaglio, data.report || ''
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Serve solo per un test rapido dal browser (apre l'URL /exec con GET).
function doGet() {
  return ContentService.createTextOutput('Endpoint attivo per "I numeri naturali".');
}
