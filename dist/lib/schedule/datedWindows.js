import { DAY_MINUTES as T } from "./nodeSchedule.js";
import { addDays as s } from "../date.js";
import { hhmm as f } from "../time.js";
const l = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, p = (t) => Number(t.slice(11, 13)) * 60 + Number(t.slice(14, 16)), b = (t) => t % 4 === 0 && t % 100 !== 0 || t % 400 === 0;
function $(t, r) {
  return t.slice(5, 10) === "02-29" && !b(r) ? null : `${String(r).padStart(4, "0")}${t.slice(4)}`;
}
function c(t) {
  return t.start === void 0 || t.end === void 0 ? { start: `${t.date}T00:00`, end: `${s(t.to ?? t.date, 1)}T00:00` } : {
    start: `${t.date}T${f(t.start)}`,
    end: t.end >= T - 1 ? `${s(t.date, 1)}T00:00` : `${t.date}T${f(t.end + 1)}`
  };
}
function m(t, r) {
  const n = c(t);
  if (!t.yearly) return [n];
  const e = Number(n.start.slice(0, 4)), o = [];
  for (const u of r) {
    const i = u - e;
    if (i < 0) continue;
    const d = $(n.start, u);
    if (!d) continue;
    const a = Number(n.end.slice(0, 4)) + i, y = $(n.end, a) ?? `${String(a).padStart(4, "0")}-03-01T00:00`;
    o.push({ start: d, end: y });
  }
  return o;
}
function h(t, r) {
  const n = `${r}T00:00`, e = `${s(r, 1)}T00:00`;
  return t.end <= n || t.start >= e ? null : {
    date: r,
    from: t.start <= n ? 0 : p(t.start),
    to: t.end >= e ? T : p(t.end)
  };
}
function g(t, r) {
  const n = Number(r.slice(0, 4)), e = m(t, [n - 1, n]).map((o) => h(o, r)).filter((o) => o !== null);
  return e.length === 0 ? null : { date: r, from: Math.min(...e.map((o) => o.from)), to: Math.max(...e.map((o) => o.to)) };
}
function x(t) {
  if (!l.test(t.start) || !l.test(t.end) || t.end <= t.start) return [];
  const r = [];
  for (let n = t.start.slice(0, 10); `${n}T00:00` < t.end; n = s(n, 1)) {
    const e = h(t, n);
    e && e.to > e.from && r.push(e);
  }
  return r;
}
function D(t, r) {
  const n = Number(r.slice(0, 4));
  return m(t, [n - 1, n, n + 1, n + 2]).find((o) => o.end > `${r}T00:00`) ?? c(t);
}
function L(t, r) {
  return !t.yearly && c(t).end <= `${r}T00:00`;
}
export {
  g as coverOn,
  L as isPast,
  c as itemWindow,
  D as nextWindow,
  m as occurrences,
  h as pieceOn,
  x as splitDays
};
