import { addDays as a } from "../lib/date.js";
import { hhmm as r } from "../lib/time.js";
const o = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], c = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], C = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], u = (t) => /* @__PURE__ */ new Date(`${t}T00:00:00Z`);
function U(t, n) {
  const e = u(t), T = t.slice(0, 4) !== n.slice(0, 4) ? ` ${e.getUTCFullYear()}` : "";
  return `${c[e.getUTCDay()]} ${e.getUTCDate()} ${o[e.getUTCMonth()]}${T}`;
}
function i(t, n) {
  const e = u(t), T = n || e.getUTCDate() === 1 ? ` ${o[e.getUTCMonth()]}` : "";
  return `${c[e.getUTCDay()]} ${e.getUTCDate()}${T}`;
}
function D(t) {
  const n = u(t), e = u(a(t, 6));
  return `${n.getUTCDate()} ${o[n.getUTCMonth()]} – ${e.getUTCDate()} ${o[e.getUTCMonth()]} ${e.getUTCFullYear()}`;
}
function $(t) {
  return t >= 1439 ? "24:00" : r(t + 1);
}
function M(t, n) {
  return `${r(t)}–${$(n)}`;
}
export {
  C as DAY_NAMES,
  o as MONTHS,
  i as columnText,
  U as dateText,
  M as spanText,
  $ as untilText,
  D as weekText
};
