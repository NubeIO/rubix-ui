import { addDays as c } from "../lib/date.js";
import { valueOf as s } from "../lib/schedule/nodeSchedule.js";
import { hhmm as a } from "../lib/time.js";
const r = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], T = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], g = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], l = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], o = (t) => /* @__PURE__ */ new Date(`${t}T00:00:00Z`);
function $(t, e, n = !0) {
  const u = o(t), i = t.slice(0, 4) !== e.slice(0, 4) ? ` ${u.getUTCFullYear()}` : "";
  return `${n ? `${T[u.getUTCDay()]} ` : ""}${u.getUTCDate()} ${r[u.getUTCMonth()]}${i}`;
}
function C(t, e) {
  const n = o(t), u = e || n.getUTCDate() === 1 ? ` ${r[n.getUTCMonth()]}` : "";
  return `${T[n.getUTCDay()]} ${n.getUTCDate()}${u}`;
}
function D(t) {
  const e = o(t), n = o(c(t, 6));
  return `${e.getUTCDate()} ${r[e.getUTCMonth()]} – ${n.getUTCDate()} ${r[n.getUTCMonth()]} ${n.getUTCFullYear()}`;
}
function U(t, e) {
  const n = t.date === e ? "today" : t.date === c(e, 1) ? "tomorrow" : $(t.date, e);
  return `${a(t.minute)} ${n}`;
}
function y(t) {
  return `Now · ${$(t.date, t.date)}, ${a(t.minute)}`;
}
function M(t) {
  return `${t.name} = ${t.value}`;
}
function h(t, e) {
  var n;
  return `${e ?? ((n = t.names[0]) == null ? void 0 : n.name)} = ${s(t, e)}`;
}
function S(t) {
  return t >= 1439 ? "24:00" : a(t + 1);
}
function p(t) {
  return t >= 1439 ? "00:00" : a(t + 1);
}
function x(t) {
  const e = (o(t).getUTCDay() + 6) % 7;
  return c(t, -e);
}
export {
  l as DAY_LONG,
  g as DAY_NAMES,
  C as columnText,
  $ as dateText,
  U as momentText,
  x as mondayOf,
  h as nameText,
  M as nameValue,
  y as nowLabel,
  p as untilInput,
  S as untilText,
  D as weekText
};
