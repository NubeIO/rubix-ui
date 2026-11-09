import { DAY_MINUTES as T } from "./nodeSchedule.js";
import { addDays as s } from "../date.js";
import { hhmm as p } from "../time.js";
function C(t) {
  const [n, r, e] = t.split("-").map(Number);
  return (new Date(Date.UTC(n, r - 1, e)).getUTCDay() + 6) % 7;
}
const c = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, $ = (t) => Number(t.slice(11, 13)) * 60 + Number(t.slice(14, 16)), m = (t) => t % 4 === 0 && t % 100 !== 0 || t % 400 === 0;
function l(t, n) {
  return t.slice(5, 10) === "02-29" && !m(n) ? null : `${String(n).padStart(4, "0")}${t.slice(4)}`;
}
function d(t) {
  return t.start === void 0 || t.end === void 0 ? { start: `${t.date}T00:00`, end: `${s(t.to ?? t.date, 1)}T00:00` } : {
    start: `${t.date}T${p(t.start)}`,
    end: t.end >= T - 1 ? `${s(t.date, 1)}T00:00` : `${t.date}T${p(t.end + 1)}`
  };
}
function N(t, n) {
  return h([d(t)], t.yearly, n);
}
function h(t, n, r) {
  const e = [];
  for (const o of t) {
    if (!c.test(o.start) || !c.test(o.end)) continue;
    if (!n) {
      e.push(o);
      continue;
    }
    const y = Number(o.start.slice(0, 4));
    for (const u of r) {
      const i = u - y;
      if (i < 0) continue;
      const a = l(o.start, u);
      if (!a) continue;
      const f = Number(o.end.slice(0, 4)) + i, b = l(o.end, f) ?? `${String(f).padStart(4, "0")}-03-01T00:00`;
      e.push({ start: a, end: b });
    }
  }
  return e;
}
function D(t, n) {
  const r = `${n}T00:00`, e = `${s(n, 1)}T00:00`;
  return t.end <= r || t.start >= e ? null : {
    date: n,
    from: t.start <= r ? 0 : $(t.start),
    to: t.end >= e ? T : $(t.end)
  };
}
function L(t) {
  if (!c.test(t.start) || !c.test(t.end) || t.end <= t.start) return [];
  const n = [];
  for (let r = t.start.slice(0, 10); `${r}T00:00` < t.end; r = s(r, 1)) {
    const e = D(t, r);
    e && e.to > e.from && n.push(e);
  }
  return n;
}
function O(t, n) {
  const r = Number(n.slice(0, 4));
  return N(t, [r - 1, r, r + 1, r + 2]).find((o) => o.end > `${n}T00:00`) ?? d(t);
}
function U(t, n) {
  return !t.yearly && d(t).end <= `${n}T00:00`;
}
export {
  U as isPast,
  d as itemWindow,
  O as nextWindow,
  N as occurrences,
  D as pieceOn,
  L as splitDays,
  C as weekdayOf,
  h as windowCopies
};
