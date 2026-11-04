const c = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function u() {
  const t = /* @__PURE__ */ new Date();
  return new Date(t.getTime() - t.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
}
function i(t, n) {
  return new Date(Date.parse(`${t}T00:00:00Z`) + n * 864e5).toISOString().slice(0, 10);
}
function D(t, n) {
  const e = /* @__PURE__ */ new Date(`${t}T00:00:00Z`), o = e.getUTCDate();
  e.setUTCDate(1), e.setUTCMonth(e.getUTCMonth() + n);
  const a = new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth() + 1, 0)).getUTCDate();
  return e.setUTCDate(Math.min(o, a)), e.toISOString().slice(0, 10);
}
function s(t) {
  return (/* @__PURE__ */ new Date(`${t}T00:00:00Z`)).getUTCDay();
}
function T(t, n = 1) {
  const e = `${t.slice(0, 7)}-01`, o = (s(e) - n + 7) % 7;
  return Array.from({ length: 42 }, (a, r) => i(e, r - o));
}
function l(t) {
  return (/* @__PURE__ */ new Date(`${t.slice(0, 7)}-01T00:00:00Z`)).toLocaleDateString(void 0, {
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  });
}
function g(t) {
  const n = /^(\d{4})-(\d{2})-(\d{2})/.exec(t);
  return n ? `${Number(n[3])} ${c[Number(n[2]) - 1]} ${n[1]}` : t;
}
export {
  i as addDays,
  D as addMonths,
  g as formatDay,
  u as localToday,
  T as monthGrid,
  l as monthLabel,
  s as weekdayOf
};
