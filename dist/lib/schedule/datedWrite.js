import { addDays as x } from "../date.js";
import { defaultName as O, DAY_MINUTES as u, valueOf as g } from "./nodeSchedule.js";
import { weekdayOf as $ } from "./datedWindows.js";
const w = "#6b7280", b = "#2563eb";
function f(t, e) {
  return e >= u ? `${x(t, 1)}T00:00` : `${t}T${String(Math.floor(e / 60)).padStart(2, "0")}:${String(e % 60).padStart(2, "0")}`;
}
function k(t) {
  const e = [];
  for (let n = 0; n < u; ) {
    if (!t(n)) {
      n++;
      continue;
    }
    const o = n;
    for (; n < u && t(n); ) n++;
    e.push([o, n]);
  }
  return e;
}
function v(t, e) {
  const n = [];
  for (const [o, c] of k((r) => t[r] && !e[r])) {
    const r = n[n.length - 1];
    r && !e.slice(r[1], o).includes(!0) ? r[1] = c : n.push([o, c]);
  }
  return { closed: n, extra: k((o) => e[o] && !t[o]) };
}
function S(t, e) {
  const n = new Array(u).fill(!1);
  for (const o of t.week[$(e)] ?? []) n.fill(!0, o.start, o.end + 1);
  return n;
}
function D(t) {
  const e = O(t);
  return t.week.some((n) => n.some((o) => o.name === e)) ? g(t, e) : 1;
}
function y(t, e, n, o, c, r) {
  const a = {
    name: t,
    label: e,
    kind: n,
    value: c,
    color: n === "extra" ? b : w,
    dates: o.map(([d, p]) => ({ start: d, end: p }))
  };
  return r && (a.yearly = !0), a;
}
function E(t) {
  const e = [t.date];
  for (; t.to && e[e.length - 1] < t.to; ) e.push(x(e[e.length - 1], 1));
  return e;
}
function A(t, e, n = E(e)) {
  const o = O(t);
  if (e.kept) return [];
  if (e.kind === "holiday") {
    const s = [[f(e.date, 0), f(e.date, u)]], l = y(o, e.label, "holiday", s, 0, e.yearly);
    return [{ map: "exception", key: `h-${e.date}`, entry: l }];
  }
  if (e.kind === "closed") {
    const s = [[f(e.date, 0), f(e.to ?? e.date, u)]], l = y(o, e.label, "closed", s, 0, e.yearly);
    return [{ map: "exception", key: `${e.id}-x`, entry: l }];
  }
  const c = D(t);
  if (e.kind === "extra" && e.start !== void 0 && e.end !== void 0) {
    const s = [[f(e.date, e.start), f(e.date, e.end + 1)]];
    return [{ map: "events", key: `${e.id}-e`, entry: y(o, e.label, "extra", s, c) }];
  }
  if (e.kind !== "changed") return [];
  const r = new Array(u).fill(!1);
  for (const s of e.hours ?? []) r.fill(!0, s.start, s.end + 1);
  const a = [], d = [];
  for (const s of n) {
    const l = v(S(t, s), r);
    a.push(...l.closed.map(([h, i]) => [f(s, h), f(s, i)])), d.push(...l.extra.map(([h, i]) => [f(s, h), f(s, i)]));
  }
  const p = [];
  return a.length && p.push({ map: "exception", key: `${e.id}-x`, entry: y(o, e.label, "changed", a, 0) }), d.length && p.push({ map: "events", key: `${e.id}-e`, entry: y(o, e.label, "extra", d, c) }), p;
}
function T(t) {
  var o, c;
  const e = { events: {}, exception: {} }, n = ((o = t.source.schedule) == null ? void 0 : o.schedules) ?? {};
  for (const r of t.dated) {
    if (r.kept) {
      const a = (c = n[r.kept.map]) == null ? void 0 : c[r.kept.key];
      a && (e[r.kept.map][r.kept.key] = a);
    }
    for (const a of A(t, r)) e[a.map][a.key] = a.entry;
  }
  return e;
}
export {
  v as diff,
  A as itemEntries,
  D as onValue,
  f as stamp,
  S as weeklyOn,
  T as writeDated
};
