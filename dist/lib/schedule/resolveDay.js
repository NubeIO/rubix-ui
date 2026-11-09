import { addDays as N } from "../date.js";
import { itemEntries as b } from "./datedWrite.js";
import { weekdayOf as x, itemWindow as C, windowCopies as O } from "./datedWindows.js";
import { DAY_MINUTES as l } from "./nodeSchedule.js";
import { hhmm as E } from "../time.js";
const R = (a, s) => a.localeCompare(s, void 0, { numeric: !0 }), M = { changed: 0, extra: 1, closed: 2, holiday: 2 };
function j(a, s) {
  const f = Number(s.slice(0, 4)), g = [f - 1, f, f + 1], [v, u] = [`${s}T00:00`, `${N(s, 1)}T00:00`], y = [], m = [], c = /* @__PURE__ */ new Set();
  for (const n of a.dated) {
    const d = n.date <= s && s <= (n.to ?? n.date);
    if (n.kind === "changed" && !n.kept && !d) continue;
    n.kind === "changed" && !n.kept && c.add(n);
    const p = { name: n.name, dates: n.windows ?? [C(n)], yearly: n.yearly }, k = n.kept ? [{ ...n.kept, entry: p }] : b(a, n, [s]);
    for (const { map: h, key: w, entry: t } of k)
      for (const e of O(t.dates, t.yearly, g)) {
        if (e.start >= u || e.end <= v) continue;
        c.add(n);
        const i = { at: e.start, until: e.end, key: w, name: t.name ?? "", item: n };
        (h === "events" ? y : m).push(i);
      }
  }
  return { events: y, offs: m, touched: c };
}
function Y(a, s) {
  var k, h, w;
  const f = x(s), { events: g, offs: v, touched: u } = j(a, s), y = [...u].filter((t) => t.kind === "changed" && !t.kept), m = /* @__PURE__ */ new Map(), c = new Array(l).fill(null);
  for (let t = 0; t < l; t++) {
    const e = `${s}T${E(t)}`, i = (o) => o.at <= e && e < o.until, T = new Set(v.filter(i).map((o) => o.item));
    for (const o of T) o && m.set(o, (m.get(o) ?? 0) + 1);
    if (T.size) continue;
    const $ = (k = a.week[f]) == null ? void 0 : k.find((o) => o.start <= t && t <= o.end);
    let r = $ && { at: `${s}T${E($.start)}`, key: "", name: $.name };
    for (const o of g.filter(i))
      (!r || o.at < r.at || o.at === r.at && r.item && R(o.key, r.key) < 0) && (r = o);
    if (!r) continue;
    const S = r.item ?? y.find((o) => {
      var A;
      return (A = o.hours) == null ? void 0 : A.some((D) => D.start <= t && t <= D.end);
    });
    c[t] = { name: r.name, ...S ? { item: S } : {} };
  }
  const n = [];
  for (let t = 0; t < l; ) {
    const e = c[t];
    let i = t;
    for (; i < l && ((h = c[i]) == null ? void 0 : h.name) === (e == null ? void 0 : e.name) && ((w = c[i]) == null ? void 0 : w.item) === (e == null ? void 0 : e.item); ) i++;
    e && n.push({ start: t, end: i - 1, ...e }), t = i;
  }
  const d = a.dated.filter((t) => u.has(t)).sort((t, e) => M[t.kind] - M[e.kind]), p = d.find(
    (t) => (t.kind === "closed" || t.kind === "holiday") && m.get(t) === l
  );
  return p ? { date: s, weekday: f, spans: n, closed: p, items: d } : { date: s, weekday: f, spans: n, items: d };
}
export {
  Y as resolveDay,
  x as weekdayOf
};
