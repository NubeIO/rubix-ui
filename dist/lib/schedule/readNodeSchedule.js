import { readDated as _ } from "./datedRead.js";
import { OFF as g, WIRE_DAYS as k, parseHHMM as b, DAY_MINUTES as x, fromMinutes as M } from "./nodeSchedule.js";
const f = (n, s) => n.localeCompare(s, void 0, { numeric: !0 });
function E(n) {
  var c, r, d, p, y, h;
  const s = n.schedule ?? { schedules: {} }, m = (r = (c = s.config) == null ? void 0 : c.names) != null && r.length ? s.config.names : ["Default"], o = Object.entries(((d = s.schedules) == null ? void 0 : d.weekly) ?? {}).sort(([a], [l]) => f(a, l)), e = Object.entries(((p = s.schedules) == null ? void 0 : p.events) ?? {}).sort(([a], [l]) => f(a, l)), t = Object.entries(((y = s.schedules) == null ? void 0 : y.exception) ?? {}).sort(([a], [l]) => f(a, l)), i = /* @__PURE__ */ new Map();
  for (const [, a] of [...o.filter(([, l]) => l.enable !== !1), ...e.filter(([, l]) => !l.kind)])
    a.name && !i.has(a.name) && i.set(a.name, a.value ?? 0);
  const v = [
    { name: g, value: n.default_payload ?? 0 },
    ...m.map((a, l) => ({ name: a, value: i.get(a) ?? l + 1 }))
  ], u = k.map((a) => O(o, a));
  return {
    id: n.id,
    name: n.name,
    description: n.description ?? "",
    color: n.color ?? "",
    timezone: n.timezone,
    enabled: n.enabled,
    names: v,
    ...(h = s.config) != null && h.default_name ? { defaultName: s.config.default_name } : {},
    week: u,
    dated: _(Object.fromEntries(e), Object.fromEntries(t), u),
    output: {
      used: n.enable_payload ?? !1,
      min: n.min_payload ?? 0,
      max: n.max_payload ?? Math.max(1, m.length)
    },
    rev: n.rev,
    source: n
  };
}
function O(n, s) {
  const m = n.filter(([, e]) => {
    var t;
    return e.enable !== !1 && ((t = e.days) == null ? void 0 : t.includes(s));
  }).map(([e, t]) => ({ key: e, name: t.name ?? "", from: b(t.start), last: b(t.end) })).filter(
    (e) => e.from !== null && e.last !== null && e.last >= e.from
  ).sort((e, t) => e.from - t.from || f(e.key, t.key)), o = new Array(x).fill(null);
  for (const e of m) for (let t = e.from; t <= e.last; t++) o[t] ?? (o[t] = e.name);
  return M(o);
}
export {
  E as readNodeSchedule
};
