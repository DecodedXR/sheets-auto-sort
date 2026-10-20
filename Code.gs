/** @OnlyCurrentDoc */ // asks Google for access to this spreadsheet only, not all your sheets

/**
 * Auto Sort for Google Sheets: keep tabs sorted automatically. Whenever someone edits a tab
 * listed below, its rows are re-sorted (the header row stays put). No setup beyond pasting this.
 *
 *   sortBy: 'C'               by column C, A→Z / smallest first / oldest first
 *   sortBy: 'C desc'          by column C, Z→A / largest first / newest first
 *   sortBy: 'B, D desc'       by B, then by D (newest first) where B is the same
 */

const SORTS = [
  // tab           sort by
  { tab: 'Tasks', sortBy: 'C, A desc' },
];
const HEADER_ROWS = 1;   // rows at the top that never move

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('↕️ Auto Sort')
    .addItem('Sort All Now', 'sortAll')
    .addToUi();
}

function onEdit(e) {
  const sheet = e.range.getSheet();
  const rule = SORTS.find(s => s.tab === sheet.getName());
  if (rule && e.range.getLastRow() > HEADER_ROWS) sort_(sheet, rule);
}

function sortAll() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const missing = [];
  SORTS.forEach(rule => {
    const sheet = ss.getSheetByName(rule.tab);
    if (sheet) sort_(sheet, rule); else missing.push(rule.tab);
  });
  ss.toast(missing.length ? 'Tab(s) not found: ' + missing.join(', ') : 'Sorted.');
}

function sort_(sheet, rule) {
  const rows = sheet.getLastRow() - HEADER_ROWS;
  if (rows < 2) return;
  sheet.getRange(HEADER_ROWS + 1, 1, rows, sheet.getLastColumn()).sort(parseSort_(rule.sortBy));
}

/** 'B, D desc' → [{column: 2, ascending: true}, {column: 4, ascending: false}] */
function parseSort_(spec) {
  return String(spec).split(',').map(part => {
    const [col, dir = 'asc'] = part.trim().split(/\s+/);
    if (!/^[A-Za-z]{1,3}$/.test(col) || !/^(asc|desc)$/i.test(dir)) throw new Error('Can\'t read sort "' + part.trim() + '". Use a column letter, optionally followed by asc or desc.');
    return { column: colNumber_(col), ascending: dir.toLowerCase() === 'asc' };
  });
}

/** 'C' → 3, 'AA' → 27. */
function colNumber_(letters) {
  return String(letters).toUpperCase().split('').reduce((n, ch) => n * 26 + ch.charCodeAt(0) - 64, 0);
}
