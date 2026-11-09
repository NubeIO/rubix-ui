const g = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], o = (n, t) => JSON.stringify(n) === JSON.stringify(t), r = ["name", "description", "color", "timezone", "enabled", "output"];
function u(n, t) {
  return t.week.map((a, d) => d).filter((a) => !o(n.week[a], t.week[a]));
}
function w(n, t) {
  const a = u(n, t);
  return [
    ...a.length ? [a.map((d) => g[d]).join(", ")] : [],
    ...o(n.dated, t.dated) ? [] : ["dated entries"],
    ...o(n.names, t.names) ? [] : ["names"],
    ...r.some((d) => !o(n[d], t[d])) ? ["settings"] : []
  ];
}
function y(n, t, a) {
  const d = new Set(u(n, t)), c = {
    ...a,
    names: o(n.names, t.names) ? a.names : t.names,
    week: a.week.map((s, i) => d.has(i) ? t.week[i] : s),
    dated: l(n, t, a)
  };
  for (const s of r) o(n[s], t[s]) || Object.assign(c, { [s]: t[s] });
  return { doc: c, applied: w(n, t) };
}
function l(n, t, a) {
  const d = new Map(n.dated.map((e) => [e.id, e])), c = new Map(t.dated.map((e) => [e.id, e])), s = a.dated.filter((e) => !(d.has(e.id) && !c.has(e.id))).map((e) => {
    const p = c.get(e.id);
    return p && !o(p, d.get(e.id)) ? p : e;
  }), i = new Set(s.map((e) => e.id)), m = t.dated.filter((e) => !i.has(e.id) && !o(e, d.get(e.id)));
  return [...s, ...m];
}
export {
  g as DAY_SHORT,
  u as changedDays,
  w as changedParts,
  y as reapplyEdits
};
