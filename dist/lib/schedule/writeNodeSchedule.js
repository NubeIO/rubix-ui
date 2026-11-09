import { writeDated as p } from "./datedWrite.js";
import { WIRE_DAYS as i, valueOf as c } from "./nodeSchedule.js";
import { hhmm as f } from "../time.js";
function k(e) {
  var t;
  const s = e.names.slice(1).map((n) => n.name), l = s[0] ?? "Default", r = { ...e.source };
  delete r.weekly, delete r.exceptions;
  const { events: o, exception: a } = p(e);
  return {
    ...r,
    id: e.id,
    name: e.name,
    description: e.description,
    color: e.color,
    timezone: e.timezone,
    enabled: e.enabled,
    enable_payload: e.output.used,
    min_payload: e.output.min,
    max_payload: e.output.max,
    default_payload: ((t = e.names[0]) == null ? void 0 : t.value) ?? 0,
    rev: e.rev,
    schedule: {
      config: { names: s, default_name: l },
      schedules: { weekly: d(e), events: o, exception: a }
    }
  };
}
function d(e) {
  var r, o;
  const s = /* @__PURE__ */ new Map();
  e.week.forEach((a, t) => {
    for (const n of a) {
      const u = `${n.start}|${n.end}|${n.name}`, m = s.get(u);
      m ? m.days.push(i[t]) : s.set(u, {
        name: n.name,
        days: [i[t]],
        start: f(n.start),
        end: f(n.end),
        value: c(e, n.name)
      });
    }
  });
  const l = {};
  [...s.values()].forEach((a, t) => l[`w${t + 1}`] = a);
  for (const [a, t] of Object.entries(((o = (r = e.source.schedule) == null ? void 0 : r.schedules) == null ? void 0 : o.weekly) ?? {}))
    t.enable === !1 && (l[`kept-${a}`] = t);
  return l;
}
export {
  k as writeNodeSchedule
};
