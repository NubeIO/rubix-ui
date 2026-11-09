const a = "Off", o = 6, s = 1440;
function f(e) {
  var n;
  return ((n = e.names[1]) == null ? void 0 : n.name) ?? "Default";
}
const m = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
function i(e) {
  const n = new Array(1440).fill(null);
  for (const t of e)
    for (let u = Math.max(0, t.start); u <= Math.min(t.end, 1439); u++) n[u] = t.name;
  return n;
}
function l(e) {
  const n = [];
  let t = 0;
  for (; t < 1440; ) {
    const u = e[t];
    let r = t;
    for (; r < 1440 && e[r] === u; ) r++;
    u !== null && n.push({ start: t, end: r - 1, name: u }), t = r;
  }
  return n;
}
function c(e, n) {
  var t, u;
  return ((t = e.names.find((r) => r.name === n)) == null ? void 0 : t.value) ?? ((u = e.names[0]) == null ? void 0 : u.value) ?? 0;
}
function d(e, n) {
  const t = n === null ? 0 : e.names.findIndex((u) => u.name === n);
  return t < 0 ? 0 : t;
}
function M(e) {
  const n = /^(\d{1,2}):(\d{2})$/.exec(e.trim());
  return !n || Number(n[1]) > 23 || Number(n[2]) > 59 ? null : Number(n[1]) * 60 + Number(n[2]);
}
function N(e) {
  return e.source.use_utc ? "UTC" : e.timezone || "UTC";
}
export {
  s as DAY_MINUTES,
  o as MAX_NAMES,
  a as OFF,
  m as WIRE_DAYS,
  f as defaultName,
  l as fromMinutes,
  d as nameIndex,
  M as parseHHMM,
  i as toMinutes,
  c as valueOf,
  N as zoneOf
};
