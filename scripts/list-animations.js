// List the Webflow (IX2) interactions stored in an exported webflow.js.
// Usage: node scripts/list-animations.js path/to/webflow.js
const fs = require('fs');
const s = fs.readFileSync(process.argv[2], 'utf8');
const k = s.lastIndexOf('actionLists:{"a-');
let i = s.lastIndexOf('{events:', k);
let d = 0, j = i;
for (; j < s.length; j++) { if (s[j] === '{') d++; else if (s[j] === '}') { d--; if (!d) break; } }
const data = new Function('return ' + s.slice(i, j + 1))();
const ev = Object.values(data.events), al = data.actionLists;
console.log('events', ev.length, 'actionLists', Object.keys(al).length);
const rows = {};
for (const e of ev) {
  const a = e.action && e.action.config && e.action.config.actionListId;
  const key = `${e.eventTypeId} -> ${a ? (al[a] || {}).title : e.action.actionTypeId}`;
  rows[key] = (rows[key] || 0) + 1;
}
for (const [k2, n] of Object.entries(rows).sort((x, y) => y[1] - x[1])) console.log(String(n).padStart(3), k2);
console.log('--- action lists');
for (const a of Object.values(al)) {
  const items = (a.actionItemGroups || []).flatMap(g => g.actionItems);
  const cont = (a.continuousParameterGroups || []).flatMap(c => c.continuousActionGroups.flatMap(g => g.actionItems));
  const types = [...new Set([...items, ...cont].map(x => x.actionTypeId))].join(',');
  const durs = [...new Set(items.map(x => x.config.duration))].join('/');
  const eases = [...new Set(items.map(x => x.config.easing).filter(Boolean))].join('/');
  console.log(`- ${a.title}${cont.length ? ' [scroll-linked]' : ''}: ${types} | ms ${durs} | ${eases}`);
}
