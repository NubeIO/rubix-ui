import { coverOn as y } from "./datedWindows.js";
import { DAY_MINUTES as i, defaultName as w } from "./nodeSchedule.js";
function D(r) {
  const [s, m, o] = r.split("-").map(Number);
  return (new Date(Date.UTC(s, m - 1, o)).getUTCDay() + 6) % 7;
}
function N(r, s) {
  var h, k;
  const m = D(s), o = new Array(i).fill(null);
  for (const e of r.week[m] ?? []) for (let n = e.start; n <= e.end; n++) o[n] = { name: e.name };
  const f = [], d = (e, n) => {
    const t = y(e, s);
    if (!t) return !1;
    for (let u = t.from; u < t.to; u++) o[u] = n;
    return f.push(e), t.from === 0 && t.to === i;
  }, p = w(r), a = r.dated.find((e) => e.kind === "changed" && y(e, s));
  if (a) {
    o.fill(null);
    for (const e of a.hours ?? [])
      for (let n = e.start; n <= e.end; n++) o[n] = { name: p, item: a };
    f.push(a);
  }
  for (const e of r.dated) e.kind === "extra" && d(e, { name: e.name ?? p, item: e });
  let l;
  for (const e of r.dated)
    (e.kind === "closed" || e.kind === "holiday") && d(e, null) && (l ?? (l = e));
  const c = [];
  for (let e = 0; e < i; ) {
    const n = o[e];
    let t = e;
    for (; t < i && ((h = o[t]) == null ? void 0 : h.name) === (n == null ? void 0 : n.name) && ((k = o[t]) == null ? void 0 : k.item) === (n == null ? void 0 : n.item); ) t++;
    n && c.push({ start: e, end: t - 1, name: n.name, ...n.item ? { item: n.item } : {} }), e = t;
  }
  return l ? { date: s, weekday: m, spans: c, closed: l, items: f } : { date: s, weekday: m, spans: c, items: f };
}
export {
  N as resolveDay,
  D as weekdayOf
};
