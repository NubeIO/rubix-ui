import { mapNames as k } from "./editNodeSchedule.js";
const S = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], p = (t, n) => JSON.stringify(t) === JSON.stringify(n), w = ["name", "description", "color", "timezone", "enabled", "output"];
function h(t, n) {
  return n.week.map((o, s) => s).filter((o) => !p(t.week[o], n.week[o]));
}
function y(t, n) {
  const o = h(t, n);
  return [
    ...o.length ? [o.map((s) => S[s]).join(", ")] : [],
    ...p(t.dated, n.dated) ? [] : ["dated entries"],
    ...p(t.names, n.names) ? [] : ["names"],
    ...w.some((s) => !p(t[s], n[s])) ? ["settings"] : []
  ];
}
function T(t, n, o) {
  const s = new Set(h(t, n)), m = p(t.names, n.names) ? o : M(t, n, o), r = {
    ...m,
    week: m.week.map((d, c) => s.has(c) ? n.week[c] : d),
    dated: N(t, n, m)
  };
  for (const d of w) p(t[d], n[d]) || Object.assign(r, { [d]: n[d] });
  return { doc: r, applied: y(t, n) };
}
function M(t, n, o) {
  var l;
  const s = new Set(t.names.map((e) => e.name)), m = new Map(
    n.names.filter((e) => e.was && e.was !== e.name && s.has(e.was)).map((e) => [e.was, e.name])
  ), r = new Set(n.names.map((e) => e.was ?? e.name)), d = new Set([...s].filter((e) => !r.has(e))), c = k(o, (e) => d.has(e) ? null : m.get(e) ?? e), a = [...n.names], i = (e) => a.some((u) => u.name === e);
  for (const e of o.names) !s.has(e.name) && !i(e.name) && a.push(e);
  const f = ((l = c.source.schedule) == null ? void 0 : l.schedules) ?? {}, g = [
    ...Object.values(f.weekly ?? {}).filter((e) => e.enable === !1),
    ...c.dated.flatMap((e) => {
      var u;
      return e.kept ? [(u = f[e.kept.map]) == null ? void 0 : u[e.kept.key]] : [];
    })
  ];
  for (const e of g)
    e != null && e.name && !i(e.name) && a.push(o.names.find((u) => u.name === e.name) ?? { name: e.name, value: 0 });
  return { ...c, names: a };
}
function N(t, n, o) {
  const s = new Map(t.dated.map((a) => [a.id, a])), m = new Map(n.dated.map((a) => [a.id, a])), r = o.dated.filter((a) => !(s.has(a.id) && !m.has(a.id))).map((a) => {
    const i = m.get(a.id);
    return i && !p(i, s.get(a.id)) ? i : a;
  }), d = new Set(r.map((a) => a.id)), c = n.dated.filter((a) => !d.has(a.id) && !p(a, s.get(a.id)));
  return [...r, ...c];
}
export {
  S as DAY_SHORT,
  h as changedDays,
  y as changedParts,
  T as reapplyEdits
};
