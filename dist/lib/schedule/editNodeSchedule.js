import { toMinutes as o, fromMinutes as p, OFF as c, MAX_NAMES as h } from "./nodeSchedule.js";
function w(e, n) {
  var u;
  const s = (m) => n(m) ?? m, a = (m) => m && Object.fromEntries(
    Object.entries(m).map(([i, l]) => [i, l.name ? { ...l, name: s(l.name) } : l])
  ), t = (u = e.source.schedule) == null ? void 0 : u.schedules, r = e.defaultName && n(e.defaultName);
  return {
    ...e,
    ...e.defaultName ? { defaultName: r || void 0 } : {},
    week: e.week.map(
      (m) => m.flatMap((i) => {
        const l = n(i.name);
        return l === null ? [] : [{ ...i, name: l }];
      })
    ),
    dated: e.dated.map((m) => m.kept && m.name ? { ...m, name: s(m.name) } : m),
    source: t ? {
      ...e.source,
      schedule: {
        ...e.source.schedule,
        schedules: { weekly: a(t.weekly), events: a(t.events), exception: a(t.exception) }
      }
    } : e.source
  };
}
function N(e, n) {
  var m, i;
  const s = (m = e.names[n]) == null ? void 0 : m.name, a = ((i = e.source.schedule) == null ? void 0 : i.schedules) ?? {};
  if (!s) return null;
  const t = Object.values(a.weekly ?? {}).some((l) => l.enable === !1 && l.name === s), r = e.dated.some((l) => {
    var f, k;
    return l.kept && ((k = (f = a[l.kept.map]) == null ? void 0 : f[l.kept.key]) == null ? void 0 : k.name) === s;
  });
  if (!t && !r) return null;
  const u = [r && "a box's own dated entry", t && "a switched-off weekly entry"].filter(Boolean);
  return `${s} can't be removed: ${u.join(" and ")} still ${u.length > 1 ? "use" : "uses"} it.`;
}
function v(e, n, s, a, t) {
  return a <= s ? e : {
    ...e,
    week: e.week.map((r, u) => {
      if (!n.includes(u)) return r;
      const m = o(r);
      return m.fill(t, s, a), p(m);
    })
  };
}
function M(e, n, s) {
  const a = p(o(s.filter((t) => t.name !== c)));
  return { ...e, week: e.week.map((t, r) => r === n ? a : t) };
}
function y(e, n, s) {
  return { ...e, week: e.week.map((a, t) => s.includes(t) ? e.week[n].map((r) => ({ ...r })) : a) };
}
function $(e) {
  return y(e, 0, [1, 2, 3, 4]);
}
function j(e, n, s) {
  var r;
  const a = s.trim(), t = (r = e.names[n]) == null ? void 0 : r.name;
  return n < 1 || !t || !a || a === t || e.names.some((u) => u.name === a) ? e : {
    ...w(e, (u) => u === t ? a : u),
    names: e.names.map((u, m) => m === n ? { ...u, name: a, was: u.was ?? t } : u)
  };
}
function O(e, n, s) {
  return !Number.isFinite(s) || !e.names[n] ? e : { ...e, names: e.names.map((a, t) => t === n ? { ...a, value: s } : a) };
}
function g(e) {
  if (e.names.length >= h) return e;
  let n = e.names.length;
  for (; e.names.some((s) => s.name === `Name ${n}`); ) n++;
  return { ...e, names: [...e.names, { name: `Name ${n}`, value: e.names.length }] };
}
function A(e, n) {
  var a;
  const s = (a = e.names[n]) == null ? void 0 : a.name;
  return n < 2 || !s || N(e, n) ? e : {
    ...w(e, (t) => t === s ? null : t),
    names: e.names.filter((t, r) => r !== n)
  };
}
export {
  g as addName,
  y as copyDay,
  w as mapNames,
  v as paintWeek,
  N as removeBlocker,
  A as removeName,
  j as renameName,
  $ as sameAsMonday,
  M as setDay,
  O as setNameValue
};
