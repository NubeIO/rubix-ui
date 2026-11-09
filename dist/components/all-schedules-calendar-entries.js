import { resolveDay as l } from "../lib/schedule/resolveDay.js";
function a(s, i) {
  return new Map(s.map((t) => [t.id, new Map(i.map((e) => [e, l(t, e)]))]));
}
const f = (s) => `${s.kind}|${s.label}`;
function d(s, i, t) {
  var u, n;
  const e = /* @__PURE__ */ new Map();
  for (const o of s)
    for (const c of ((n = (u = i.get(o.id)) == null ? void 0 : u.get(t)) == null ? void 0 : n.items) ?? []) {
      const r = e.get(f(c));
      r ? r.schedules.includes(o) || r.schedules.push(o) : e.set(f(c), { date: t, item: c, schedules: [o] });
    }
  return [...e.values()];
}
function h(s, i, t) {
  const e = /* @__PURE__ */ new Map();
  for (const u of t)
    for (const n of d(s, i, u)) {
      const o = e.get(f(n.item));
      if (!o) e.set(f(n.item), n);
      else for (const c of n.schedules) o.schedules.includes(c) || o.schedules.push(c);
    }
  return [...e.values()];
}
export {
  a as dayTable,
  d as entriesOn,
  h as periodEntries
};
