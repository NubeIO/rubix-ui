import { splitDays as k } from "./datedWindows.js";
import { weeklyOn as v } from "./datedWrite.js";
import { DAY_MINUTES as p } from "./nodeSchedule.js";
import { addDays as D } from "../date.js";
const O = (s) => s.replace(/-(x|e)$/, ""), w = (s) => s.endsWith("T00:00") ? D(s.slice(0, 10), -1) : s.slice(0, 10);
function E(s, r, c) {
  var d;
  const o = [], e = /* @__PURE__ */ new Map(), l = [
    ...Object.entries(s).map(([n, a]) => ({ map: "events", key: n, e: a })),
    ...Object.entries(r).map(([n, a]) => ({ map: "exception", key: n, e: a }))
  ];
  for (const n of l) {
    const a = n.e.kind;
    if (a === "holiday" && n.map === "exception") {
      const i = (d = n.e.dates) == null ? void 0 : d[0];
      i ? o.push({ id: n.key, kind: "holiday", label: n.e.label ?? "", date: i.start.slice(0, 10), ...h(n.e) }) : o.push(u(n));
    } else if (a === "closed" || a === "changed" || a === "extra") {
      const i = O(n.key);
      e.set(i, [...e.get(i) ?? [], n]);
    } else o.push(u(n));
  }
  for (const [n, a] of e) o.push(...$(n, a, c));
  return o;
}
function $(s, r, c) {
  var m;
  const o = r.find((t) => t.map === "exception" && t.key === `${s}-x`), e = r.find((t) => t.map === "events" && t.key === `${s}-e` && t.e.kind === "extra"), l = r.every((t) => t === o || t === e), d = r.flatMap((t) => t.e.dates ?? []);
  if (!l || d.length === 0) return r.map(u);
  const n = ((m = o ?? e) == null ? void 0 : m.e.label) ?? "", a = d.map((t) => t.start.slice(0, 10)).sort()[0], i = d.map((t) => w(t.end)).sort().reverse()[0], f = i > a ? { to: i } : {};
  if ((o == null ? void 0 : o.e.kind) === "closed" && !e) return [{ id: s, kind: "closed", label: n, date: a, ...f, ...h(o.e) }];
  if ((o == null ? void 0 : o.e.kind) === "changed") {
    const t = v({ week: c }, a);
    for (const y of [o, ...e ? [e] : []])
      for (const g of y.e.dates ?? [])
        for (const b of k(g).filter((x) => x.date === a))
          t.fill(y.map === "events", b.from, b.to);
    return [{ id: s, kind: "changed", label: n, date: a, ...f, hours: M(t) }];
  }
  if (!o && e) {
    const t = k(e.e.dates[0]);
    if (e.e.dates.length === 1 && t.length === 1)
      return [{ id: s, kind: "extra", label: n, date: a, start: t[0].from, end: t[0].to - 1 }];
  }
  return r.map(u);
}
function M(s) {
  const r = [];
  for (let c = 0; c < p; ) {
    if (!s[c]) {
      c++;
      continue;
    }
    const o = c;
    for (; c < p && s[c]; ) c++;
    r.push({ start: o, end: c - 1 });
  }
  return r;
}
const h = (s) => s.yearly ? { yearly: !0 } : {};
function u({ map: s, key: r, e: c }) {
  var t;
  const o = ((t = c.dates) == null ? void 0 : t[0]) ?? { start: "", end: "" }, e = k(o)[0], l = { id: `kept:${s}:${r}`, label: c.label ?? "", kept: { map: s, key: r }, ...h(c) }, d = e && (e.from > 0 || e.to < p), n = (e == null ? void 0 : e.date) ?? o.start.slice(0, 10), a = (e == null ? void 0 : e.from) ?? 0, i = ((e == null ? void 0 : e.to) ?? p) - 1;
  if (s === "events") return { ...l, kind: "extra", date: n, start: a, end: i, name: c.name };
  const f = w(o.end), m = c.kind === "holiday" ? "holiday" : "closed";
  return { ...l, kind: m, date: n, ...d ? { start: a, end: i } : f > n ? { to: f } : {} };
}
export {
  E as readDated
};
