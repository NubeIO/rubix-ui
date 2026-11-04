const N = 1440;
function m(t) {
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
}
function s(t) {
  const r = t.trim(), e = /^(\d{1,2})[:.hH](\d{2})$/.exec(r), n = /^(\d{1,2})(\d{2})$/.exec(r), o = /^(\d{1,2})$/.exec(r), [c, i] = e ? [Number(e[1]), Number(e[2])] : n ? [Number(n[1]), Number(n[2])] : o ? [Number(o[1]), 0] : [NaN, NaN];
  if (!Number.isFinite(c) || i >= 60) return;
  const u = c * 60 + i;
  return u <= 1440 ? u : void 0;
}
export {
  N as DAY_MINS,
  m as hhmm,
  s as parseTime
};
