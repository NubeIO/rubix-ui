import { zoneOf as D, valueOf as A, OFF as m } from "./nodeSchedule.js";
import { addDays as O } from "../date.js";
import { resolveDay as N } from "./resolveDay.js";
const F = 8;
function M(o, c) {
  const t = new Intl.DateTimeFormat("en-US", {
    timeZone: c,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).formatToParts(o), e = (s) => {
    var r;
    return ((r = t.find((i) => i.type === s)) == null ? void 0 : r.value) ?? "";
  }, a = Number(e("hour")) % 24;
  return { date: `${e("year")}-${e("month")}-${e("day")}`, minute: a * 60 + Number(e("minute")) };
}
function T(o, c) {
  const t = M(c, D(o)), e = { name: m, value: A(o, null) };
  if (!o.enabled) return { at: t, enabled: !1, now: { ...e, until: null }, next: null };
  const a = /* @__PURE__ */ new Map(), s = (n) => {
    let l = a.get(n);
    return l || a.set(n, l = N(o, O(t.date, n))), l;
  }, r = (n) => {
    var b;
    const l = s(Math.floor(n / 1440)), w = n % 1440;
    return ((b = l.spans.find((x) => x.start <= w && w <= x.end)) == null ? void 0 : b.name) ?? m;
  }, i = F * 1440, f = (n) => {
    const l = r(n);
    for (; n < i && r(n) === l; ) n++;
    return n < i ? n : null;
  }, d = (n) => ({ date: O(t.date, Math.floor(n / 1440)), minute: n % 1440 }), h = (n) => ({ name: n, value: n === m ? e.value : A(o, n) }), y = r(t.minute), u = f(t.minute), p = y === m ? s(0).closed : void 0, g = { ...h(y), until: u === null ? null : d(u), ...p ? { closed: p } : {} };
  if (u === null) return { at: t, enabled: !0, now: g, next: null };
  const v = f(u);
  return {
    at: t,
    enabled: !0,
    now: g,
    next: { ...h(r(u)), from: d(u), until: v === null ? null : d(v) }
  };
}
export {
  T as nowAndNext,
  M as wallAt
};
