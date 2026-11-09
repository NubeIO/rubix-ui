import { addDays as c } from "../lib/date.js";
import { hhmm as u } from "../lib/time.js";
const r = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], a = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], s = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], T = (t) => /* @__PURE__ */ new Date(`${t}T00:00:00Z`);
function C(t, n) {
  const e = T(t), o = t.slice(0, 4) !== n.slice(0, 4) ? ` ${e.getUTCFullYear()}` : "";
  return `${a[e.getUTCDay()]} ${e.getUTCDate()} ${r[e.getUTCMonth()]}${o}`;
}
function U(t, n) {
  const e = T(t), o = n || e.getUTCDate() === 1 ? ` ${r[e.getUTCMonth()]}` : "";
  return `${a[e.getUTCDay()]} ${e.getUTCDate()}${o}`;
}
function D(t) {
  const n = T(t), e = T(c(t, 6));
  return `${n.getUTCDate()} ${r[n.getUTCMonth()]} – ${e.getUTCDate()} ${r[e.getUTCMonth()]} ${e.getUTCFullYear()}`;
}
function $(t) {
  return t >= 1439 ? "24:00" : u(t + 1);
}
function l(t, n) {
  return `${u(t)}–${$(n)}`;
}
function m(t, n = 10) {
  const e = t.slice(0, n).map((o) => o.name).join(", ");
  return t.length > n ? `${e} and ${t.length - n} more` : e;
}
export {
  s as DAY_NAMES,
  r as MONTHS,
  U as columnText,
  C as dateText,
  m as namesText,
  l as spanText,
  $ as untilText,
  D as weekText
};
