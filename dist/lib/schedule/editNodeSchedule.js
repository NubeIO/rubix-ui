import { toMinutes as i, fromMinutes as f, OFF as l, MAX_NAMES as p } from "./nodeSchedule.js";
function N(e, n, a, m, t) {
  return m <= a ? e : {
    ...e,
    week: e.week.map((r, u) => {
      if (!n.includes(u)) return r;
      const s = i(r);
      return s.fill(t, a, m), f(s);
    })
  };
}
function M(e, n, a) {
  const m = f(i(a.filter((t) => t.name !== l)));
  return { ...e, week: e.week.map((t, r) => r === n ? m : t) };
}
function k(e, n, a) {
  return { ...e, week: e.week.map((m, t) => a.includes(t) ? e.week[n].map((r) => ({ ...r })) : m) };
}
function h(e) {
  return k(e, 0, [1, 2, 3, 4]);
}
function y(e, n, a) {
  var r;
  const m = a.trim(), t = (r = e.names[n]) == null ? void 0 : r.name;
  return n < 1 || !t || !m || m === t || e.names.some((u) => u.name === m) ? e : {
    ...e,
    names: e.names.map((u, s) => s === n ? { ...u, name: m } : u),
    week: e.week.map((u) => u.map((s) => s.name === t ? { ...s, name: m } : s))
  };
}
function A(e, n, a) {
  return !Number.isFinite(a) || !e.names[n] ? e : { ...e, names: e.names.map((m, t) => t === n ? { ...m, value: a } : m) };
}
function F(e) {
  if (e.names.length >= p) return e;
  let n = e.names.length;
  for (; e.names.some((a) => a.name === `Name ${n}`); ) n++;
  return { ...e, names: [...e.names, { name: `Name ${n}`, value: e.names.length }] };
}
function g(e, n) {
  var m;
  const a = (m = e.names[n]) == null ? void 0 : m.name;
  return n < 2 || !a ? e : {
    ...e,
    names: e.names.filter((t, r) => r !== n),
    week: e.week.map((t) => t.filter((r) => r.name !== a))
  };
}
export {
  F as addName,
  k as copyDay,
  N as paintWeek,
  g as removeName,
  y as renameName,
  h as sameAsMonday,
  M as setDay,
  A as setNameValue
};
