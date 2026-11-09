import { splitDays as w } from "./datedWindows.js";
import { weeklyOn as v } from "./datedWrite.js";
import { DAY_MINUTES as k } from "./nodeSchedule.js";
import { addDays as D } from "../date.js";
const O = (o) => o.replace(/-(x|e)$/, ""), g = (o) => o.endsWith("T00:00") ? D(o.slice(0, 10), -1) : o.slice(0, 10);
function E(o, r, c) {
  var i;
  const n = [], e = /* @__PURE__ */ new Map(), l = [
    ...Object.entries(o).map(([s, a]) => ({ map: "events", key: s, e: a })),
    ...Object.entries(r).map(([s, a]) => ({ map: "exception", key: s, e: a }))
  ];
  for (const s of l) {
    const a = s.e.kind;
    if (a === "holiday" && s.map === "exception") {
      const d = (i = s.e.dates) == null ? void 0 : i[0];
      d ? n.push({ id: s.key, kind: "holiday", label: s.e.label ?? "", date: d.start.slice(0, 10), ...b(s.e) }) : n.push(h(s));
    } else if (a === "closed" || a === "changed" || a === "extra") {
      const d = O(s.key);
      e.set(d, [...e.get(d) ?? [], s]);
    } else n.push(h(s));
  }
  for (const [s, a] of e) n.push(...$(s, a, c));
  return n;
}
function $(o, r, c) {
  var m;
  const n = r.find((t) => t.map === "exception" && t.key === `${o}-x`), e = r.find((t) => t.map === "events" && t.key === `${o}-e` && t.e.kind === "extra"), l = r.every((t) => t === n || t === e), i = r.flatMap((t) => t.e.dates ?? []);
  if (!l || i.length === 0) return r.map(h);
  const s = ((m = n ?? e) == null ? void 0 : m.e.label) ?? "", a = i.map((t) => t.start.slice(0, 10)).sort()[0], d = i.map((t) => g(t.end)).sort().reverse()[0], f = d > a ? { to: d } : {};
  if ((n == null ? void 0 : n.e.kind) === "closed" && !e) return [{ id: o, kind: "closed", label: s, date: a, ...f, ...b(n.e) }];
  if ((n == null ? void 0 : n.e.kind) === "changed") {
    const t = v({ week: c }, a);
    for (const p of [n, ...e ? [e] : []])
      for (const y of p.e.dates ?? [])
        for (const u of w(y).filter((x) => x.date === a))
          t.fill(p.map === "events", u.from, u.to);
    return [{ id: o, kind: "changed", label: s, date: a, ...f, hours: M(t) }];
  }
  if (!n && e) {
    const t = w(e.e.dates[0]);
    if (e.e.dates.length === 1 && t.length === 1)
      return [{ id: o, kind: "extra", label: s, date: a, start: t[0].from, end: t[0].to - 1 }];
  }
  return r.map(h);
}
function M(o) {
  const r = [];
  for (let c = 0; c < k; ) {
    if (!o[c]) {
      c++;
      continue;
    }
    const n = c;
    for (; c < k && o[c]; ) c++;
    r.push({ start: n, end: c - 1 });
  }
  return r;
}
const b = (o) => o.yearly ? { yearly: !0 } : {};
function h({ map: o, key: r, e: c }) {
  var p;
  const n = ((p = c.dates) == null ? void 0 : p[0]) ?? { start: "", end: "" }, e = w(n)[0], l = (c.dates ?? []).map(({ start: y, end: u }) => ({ start: y, end: u })), i = { id: `kept:${o}:${r}`, label: c.label ?? "", kept: { map: o, key: r }, windows: l, ...b(c) }, s = e && (e.from > 0 || e.to < k), a = (e == null ? void 0 : e.date) ?? n.start.slice(0, 10), d = (e == null ? void 0 : e.from) ?? 0, f = ((e == null ? void 0 : e.to) ?? k) - 1;
  if (o === "events") return { ...i, kind: "extra", date: a, start: d, end: f, name: c.name };
  const m = g(n.end), t = c.kind === "holiday" ? "holiday" : "closed";
  return { ...i, kind: t, date: a, ...s ? { start: d, end: f } : m > a ? { to: m } : {} };
}
export {
  E as readDated
};
