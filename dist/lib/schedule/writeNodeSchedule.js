import { writeDated as c } from "./datedWrite.js";
import { defaultName as w, WIRE_DAYS as f, valueOf as d } from "./nodeSchedule.js";
import { hhmm as p } from "../time.js";
function _(e) {
  var l;
  const s = e.names.slice(1).map((n) => n.name), t = { ...e.source };
  delete t.weekly, delete t.exceptions;
  const { events: r, exception: u } = c(e);
  return {
    ...t,
    id: e.id,
    name: e.name,
    description: e.description,
    color: e.color,
    timezone: e.timezone,
    enabled: e.enabled,
    enable_payload: e.output.used,
    min_payload: e.output.min,
    max_payload: e.output.max,
    default_payload: ((l = e.names[0]) == null ? void 0 : l.value) ?? 0,
    rev: e.rev,
    schedule: {
      config: { names: s, default_name: w(e) },
      schedules: { weekly: h(e), events: r, exception: u }
    }
  };
}
function h(e) {
  var u, l;
  const s = /* @__PURE__ */ new Map();
  e.week.forEach((n, o) => {
    for (const a of n) {
      const i = `${a.start}|${a.end}|${a.name}`, m = s.get(i);
      m ? m.days.push(f[o]) : s.set(i, {
        name: a.name,
        days: [f[o]],
        start: p(a.start),
        end: p(a.end),
        value: d(e, a.name)
      });
    }
  });
  const t = {};
  for (const [n, o] of Object.entries(((l = (u = e.source.schedule) == null ? void 0 : u.schedules) == null ? void 0 : l.weekly) ?? {}))
    o.enable === !1 && (t[n] = o);
  let r = 1;
  for (const n of s.values()) {
    for (; `w${r}` in t; ) r++;
    t[`w${r}`] = n;
  }
  return t;
}
export {
  _ as writeNodeSchedule
};
