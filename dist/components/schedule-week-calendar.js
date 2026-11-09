import { jsxs as n, jsx as a } from "react/jsx-runtime";
import { cn as m } from "../lib/cn.js";
import { hhmm as b } from "../lib/time.js";
import { nameColour as v } from "../lib/colour/nameColour.js";
import { weekText as y, columnText as $, untilText as u } from "./schedule-calendar-words.js";
import { KINDS as g, HATCH as S, noteText as I } from "./schedule-kinds.js";
import { NameSwatch as T } from "./name-swatch.js";
import { ScheduleCalendarNav as C } from "./schedule-calendar-nav.js";
import { ScheduleLegendKeys as P } from "./schedule-legend-keys.js";
const d = (r) => `${r / 1440 * 100}%`, f = [0, 3, 6, 9, 12, 15, 18, 21], _ = 480 / 1440, z = 11 * 1.25, H = 8, X = (r) => Math.floor(((r.end + 1 - r.start) * _ - H) / z);
function O({ days: r, now: l, actions: p, legend: h, ...N }) {
  return /* @__PURE__ */ n("section", { className: "grid gap-3", children: [
    /* @__PURE__ */ n("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ a(C, { unit: "week", label: r[0] ? y(r[0].date) : "", ...N }),
      p && /* @__PURE__ */ a("div", { className: "ml-auto flex items-center gap-2", children: p })
    ] }),
    /* @__PURE__ */ n("div", { className: "grid grid-cols-[2.5rem_repeat(7,minmax(0,1fr))] overflow-hidden rounded-lg border border-line", children: [
      /* @__PURE__ */ a("span", { className: "border-b border-line" }),
      r.map((e, i) => {
        var c;
        const s = e.date === (l == null ? void 0 : l.date), t = e.closed ?? ((c = e.entries) == null ? void 0 : c[0]), o = t ? g[t.kind].label : "";
        return /* @__PURE__ */ n(
          "div",
          {
            className: m("grid min-w-0 gap-0.5 border-b border-l border-line px-2 py-1.5", s && "bg-accent/8"),
            children: [
              /* @__PURE__ */ a("span", { className: m("truncate text-xs font-semibold", s ? "text-accent" : "text-ink"), children: $(e.date, i === 0) }),
              /* @__PURE__ */ a("span", { className: "truncate text-caption text-ink-muted", title: o, children: o || " " })
            ]
          },
          e.date
        );
      }),
      /* @__PURE__ */ a("div", { className: "relative h-120", children: f.map(
        (e) => e ? /* @__PURE__ */ a(
          "span",
          {
            className: "absolute right-1.5 -translate-y-1/2 font-mono text-caption text-ink-faint",
            style: { top: d(e * 60) },
            children: String(e).padStart(2, "0")
          },
          e
        ) : null
      ) }),
      r.map((e) => {
        const i = !!l && e.date === l.date, s = e.closed ? g[e.closed.kind].icon : null;
        return /* @__PURE__ */ n(
          "div",
          {
            "data-testid": `cal-${e.date}`,
            className: m("relative h-120 border-l border-line", i && "bg-accent/3"),
            style: e.closed ? S : void 0,
            children: [
              f.map((t) => /* @__PURE__ */ a("span", { className: "absolute inset-x-0 h-px bg-line/60", style: { top: d(t * 60) } }, t)),
              e.spans.map((t) => {
                const o = v(t.nameIndex), c = i && t.start <= l.minute && l.minute <= t.end, k = t.label || t.name, x = X(t);
                return /* @__PURE__ */ n(
                  "div",
                  {
                    "data-running": c || void 0,
                    title: t.title ?? `${t.label ? `${t.label} · ` : ""}${t.name} · ${b(t.start)} until ${u(t.end)}`,
                    className: m(
                      "absolute inset-x-1 min-h-3.5 overflow-hidden rounded-sm px-1.5 py-1 font-mono text-caption leading-tight",
                      o.bg,
                      o.text,
                      t.kind === "extra" && "border-[1.5px] border-dashed border-ink-strong",
                      t.kind === "changed" && "border-[1.5px] border-ink-strong/50",
                      c && "ring-2 ring-ink-strong ring-offset-2 ring-offset-surface-card"
                    ),
                    style: { top: d(t.start), height: d(t.end + 1 - t.start) },
                    children: [
                      x >= 1 && /* @__PURE__ */ a("span", { className: "block truncate font-sans font-semibold", children: k }),
                      x >= 2 && /* @__PURE__ */ n("span", { className: "block truncate", children: [
                        b(t.start),
                        "–",
                        u(t.end)
                      ] })
                    ]
                  },
                  t.start
                );
              }),
              e.closed && s && /* @__PURE__ */ n("span", { className: "absolute inset-x-1 top-2 flex items-center gap-1 truncate rounded-md border border-line-strong bg-surface-card px-1.5 py-0.5 text-caption text-ink-strong", children: [
                /* @__PURE__ */ a(s, { className: "size-3 flex-none" }),
                I(e.closed)
              ] }),
              i && /* @__PURE__ */ a(
                "span",
                {
                  "aria-label": "Now",
                  className: "absolute inset-x-0 z-10 h-0.5 bg-destructive",
                  style: { top: d(l.minute) },
                  children: /* @__PURE__ */ a("span", { className: "absolute -left-1 -top-1 size-2 rounded-full bg-destructive" })
                }
              )
            ]
          },
          e.date
        );
      })
    ] }),
    /* @__PURE__ */ n("div", { className: "flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-caption text-ink-muted", children: [
      h.map((e) => /* @__PURE__ */ n("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ a(T, { index: e.nameIndex }),
        e.label,
        e.detail && /* @__PURE__ */ a("span", { children: e.detail })
      ] }, `${e.nameIndex}|${e.label}`)),
      /* @__PURE__ */ a(P, {})
    ] })
  ] });
}
export {
  O as ScheduleWeekCalendar
};
