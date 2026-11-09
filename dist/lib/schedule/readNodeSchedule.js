import { readDated as v } from "./datedRead.js";
import { OFF as k, WIRE_DAYS as x, parseHHMM as h, DAY_MINUTES as M, fromMinutes as O } from "./nodeSchedule.js";
const i = (n, s) => n.localeCompare(s, void 0, { numeric: !0 });
function D(n) {
  var r, u, d, p, y;
  const s = n.schedule ?? { schedules: {} }, m = (u = (r = s.config) == null ? void 0 : r.names) != null && u.length ? s.config.names : ["Default"], l = Object.entries(((d = s.schedules) == null ? void 0 : d.weekly) ?? {}).sort(([a], [o]) => i(a, o)), e = Object.entries(((p = s.schedules) == null ? void 0 : p.events) ?? {}).sort(([a], [o]) => i(a, o)), t = Object.entries(((y = s.schedules) == null ? void 0 : y.exception) ?? {}).sort(([a], [o]) => i(a, o)), f = /* @__PURE__ */ new Map();
  for (const [, a] of [...l, ...e.filter(([, o]) => !o.kind)])
    a.name && !f.has(a.name) && f.set(a.name, a.value ?? 0);
  const b = [
    { name: k, value: n.default_payload ?? 0 },
    ...m.map((a, o) => ({ name: a, value: f.get(a) ?? o + 1 }))
  ], c = x.map((a) => _(l, a));
  return {
    id: n.id,
    name: n.name,
    description: n.description ?? "",
    color: n.color ?? "",
    timezone: n.timezone,
    enabled: n.enabled,
    names: b,
    week: c,
    dated: v(Object.fromEntries(e), Object.fromEntries(t), c),
    output: {
      used: n.enable_payload ?? !1,
      min: n.min_payload ?? 0,
      max: n.max_payload ?? Math.max(1, m.length)
    },
    rev: n.rev,
    source: n
  };
}
function _(n, s) {
  const m = n.filter(([, e]) => {
    var t;
    return e.enable !== !1 && ((t = e.days) == null ? void 0 : t.includes(s));
  }).map(([e, t]) => ({ key: e, name: t.name ?? "", from: h(t.start), last: h(t.end) })).filter(
    (e) => e.from !== null && e.last !== null && e.last >= e.from
  ).sort((e, t) => e.from - t.from || i(e.key, t.key)), l = new Array(M).fill(null);
  for (const e of m) for (let t = e.from; t <= e.last; t++) l[t] ?? (l[t] = e.name);
  return O(l);
}
export {
  D as readNodeSchedule
};
