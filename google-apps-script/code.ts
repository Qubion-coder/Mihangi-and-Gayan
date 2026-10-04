const SPREADSHEET_ID = '1I2cNDGqdtNa4xsxmAU4OqqxTQVQyvSe3bsQoRF8_S-Y';

function doPost(e: GoogleAppsScript.Events.DoPost) {
  try {
    const payload = parsePayload_(e);
    const sheetKey = String(payload.sheet || '').toUpperCase();

    if (sheetKey !== 'RSVP' && sheetKey !== 'WISH') {
      return jsonResponse_({ ok: false, error: 'Invalid sheet. Use RSVP or WISH.' });
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getOrCreateSheet_(ss, sheetKey);

    if (sheetKey === 'RSVP') {
      ensureHeaders_(sheet, ['Timestamp', 'Full Name', 'Guests', 'Event', 'Dietary Notes']);
      sheet.appendRow([
        new Date(),
        payload.fullName || '',
        payload.guests || '',
        payload.event || '',
        payload.dietaryNotes || '',
      ]);
    } else {
      ensureHeaders_(sheet, ['Timestamp', 'Name', 'Event', 'Message']);
      sheet.appendRow([
        new Date(),
        payload.name || '',
        payload.event || '',
        payload.message || '',
      ]);
    }

    return jsonResponse_({ ok: true });
  } catch (error: any) {
    return jsonResponse_({
      ok: false,
      error: String(error && error.message ? error.message : error),
    });
  }
}

function doGet() {
  return jsonResponse_({
    ok: true,
    message: 'Wedding form endpoint is running.',
  });
}

function parsePayload_(e: GoogleAppsScript.Events.DoPost): Record<string, string> {
  const params = e && e.parameter ? e.parameter : {} as Record<string, string>;

  if (Object.keys(params).length > 0) {
    return params as Record<string, string>;
  }

  const contents = e && e.postData && e.postData.contents ? e.postData.contents : '';
  if (!contents) {
    return {};
  }

  if (contents.indexOf('=') !== -1 && contents.indexOf('{') !== 0) {
    return parseQueryString_(contents);
  }

  try {
    return JSON.parse(contents);
  } catch (_error) {
    return {};
  }
}

function parseQueryString_(query: string): Record<string, string> {
  const out: Record<string, string> = {};
  const pairs = String(query).split('&');

  for (let i = 0; i < pairs.length; i++) {
    const part = pairs[i];
    if (!part) continue;

    const idx = part.indexOf('=');
    const rawKey = idx >= 0 ? part.slice(0, idx) : part;
    const rawValue = idx >= 0 ? part.slice(idx + 1) : '';
    const key = decodeURIComponent(rawKey.replace(/\+/g, ' '));
    const value = decodeURIComponent(rawValue.replace(/\+/g, ' '));

    out[key] = value;
  }

  return out;
}

function getOrCreateSheet_(ss: GoogleAppsScript.Spreadsheet.Spreadsheet, name: string): GoogleAppsScript.Spreadsheet.Sheet {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

function ensureHeaders_(sheet: GoogleAppsScript.Spreadsheet.Sheet, headers: string[]) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }
}

function jsonResponse_(data: any): GoogleAppsScript.Content.TextOutput {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
