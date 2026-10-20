// Self-check for sort specs and the edit trigger: node test.js
const vm = require('vm'), fs = require('fs'), assert = require('assert');
const ctx = {}; vm.runInNewContext(fs.readFileSync(__dirname + '/Code.gs', 'utf8'), ctx);
const plain = x => JSON.parse(JSON.stringify(x));
assert.deepEqual(plain(ctx.parseSort_('C')), [{ column: 3, ascending: true }]);
assert.deepEqual(plain(ctx.parseSort_('b, AA DESC')), [{ column: 2, ascending: true }, { column: 27, ascending: false }]);
assert.throws(() => ctx.parseSort_('C down'), /Can't read sort/);
assert.throws(() => ctx.parseSort_('Status'), /Can't read sort/);
// onEdit sorts only listed tabs, below the header.
let sorted = null;
const sheet = name => ({ getName: () => name, getLastRow: () => 5, getLastColumn: () => 4,
  getRange: (r, c, h, w) => ({ sort: spec => { sorted = { r, c, h, w, spec: plain(spec) }; } }) });
ctx.onEdit({ range: { getSheet: () => sheet('Other'), getLastRow: () => 3 } });
assert.equal(sorted, null);
ctx.onEdit({ range: { getSheet: () => sheet('Tasks'), getLastRow: () => 3 } });
assert.deepEqual(sorted, { r: 2, c: 1, h: 4, w: 4, spec: [{ column: 3, ascending: true }, { column: 1, ascending: false }] });
console.log('ok');
