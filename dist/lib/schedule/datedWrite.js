import { addDays as g } from "../date.js";
import { defaultName as $, DAY_MINUTES as c, valueOf as w } from "./nodeSchedule.js";
import { weekdayOf as b } from "./resolveDay.js";
const S = "#6b7280", v = "#2563eb";
function f(n, t) {
  return t >= c ? `${g(n, 1)}T00:00` : `${n}T${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
}
function O(n) {
  const t = [];
  for (let o = 0; o < c; ) {
    if (!n(o)) {
      o++;
      continue;
    }
    const s = o;
    for (; o < c && n(o); ) o++;
    t.push([s, o]);
  }
  return t;
}
function D(n, t) {
  const o = [];
  for (const [s, a] of O((l) => n[l] && !t[l])) {
    const l = o[o.length - 1];
    l && !t.slice(l[1], s).includes(!0) ? l[1] = a : o.push([s, a]);
  }
  return { closed: o, extra: O((s) => t[s] && !n[s]) };
}
function A(n, t) {
  const o = new Array(c).fill(!1);
  for (const s of n.week[b(t)] ?? []) o.fill(!0, s.start, s.end + 1);
  return o;
}
function C(n) {
  const t = $(n);
  return n.week.some((o) => o.some((s) => s.name === t)) ? w(n, t) : 1;
}
function u(n, t, o, s, a, l) {
  const d = {
    name: n,
    label: t,
    kind: o,
    value: a,
    color: o === "extra" ? v : S,
    dates: s.map(([h, e]) => ({ start: h, end: e }))
  };
  return l && (d.yearly = !0), d;
}
function E(n) {
  const t = [n.date];
  for (; n.to && t[t.length - 1] < n.to; ) t.push(g(t[t.length - 1], 1));
  return t;
}
function _(n) {
  var d, h;
  const t = $(n), o = C(n), s = {}, a = {}, l = ((d = n.source.schedule) == null ? void 0 : d.schedules) ?? {};
  for (const e of n.dated) {
    if (e.kept) {
      const r = (h = l[e.kept.map]) == null ? void 0 : h[e.kept.key];
      r && ((e.kept.map === "events" ? s : a)[e.kept.key] = r);
      continue;
    }
    if (e.kind === "holiday") {
      const r = [[f(e.date, 0), f(e.date, c)]];
      a[`h-${e.date}`] = u(t, e.label, "holiday", r, 0, e.yearly);
    } else if (e.kind === "closed") {
      const r = [[f(e.date, 0), f(e.to ?? e.date, c)]];
      a[`${e.id}-x`] = u(t, e.label, "closed", r, 0, e.yearly);
    } else if (e.kind === "extra" && e.start !== void 0 && e.end !== void 0) {
      const r = [[f(e.date, e.start), f(e.date, e.end + 1)]];
      s[`${e.id}-e`] = u(t, e.label, "extra", r, o);
    } else if (e.kind === "changed") {
      const r = new Array(c).fill(!1);
      for (const i of e.hours ?? []) r.fill(!0, i.start, i.end + 1);
      const p = [], y = [];
      for (const i of E(e)) {
        const x = D(A(n, i), r);
        p.push(...x.closed.map(([m, k]) => [f(i, m), f(i, k)])), y.push(...x.extra.map(([m, k]) => [f(i, m), f(i, k)]));
      }
      p.length && (a[`${e.id}-x`] = u(t, e.label, "changed", p, 0)), y.length && (s[`${e.id}-e`] = u(t, e.label, "extra", y, o));
    }
  }
  return { events: s, exception: a };
}
export {
  D as diff,
  C as onValue,
  f as stamp,
  A as weeklyOn,
  _ as writeDated
};
