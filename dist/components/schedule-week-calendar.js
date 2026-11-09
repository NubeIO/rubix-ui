import { jsxs as n, jsx as a } from "react/jsx-runtime";
import { cn as m } from "../lib/cn.js";
import { hhmm as x } from "../lib/time.js";
import { nameColour as k } from "../lib/colour/nameColour.js";
import { weekText as v, columnText as y, untilText as b } from "./schedule-calendar-words.js";
import { KINDS as u, HATCH as $, noteText as S } from "./schedule-kinds.js";
import { NameSwatch as T } from "./name-swatch.js";
import { ScheduleCalendarNav as C } from "./schedule-calendar-nav.js";
import { ScheduleLegendKeys as I } from "./schedule-legend-keys.js";
const c = (l) => `${l / 1440 * 100}%`, g = [0, 3, 6, 9, 12, 15, 18, 21];
function U({ days: l, now: r, actions: p, legend: f, ...h }) {
  return /* @__PURE__ */ n("section", { className: "grid gap-3", children: [
    /* @__PURE__ */ n("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ a(C, { unit: "week", label: l[0] ? v(l[0].date) : "", ...h }),
      p && /* @__PURE__ */ a("div", { className: "ml-auto flex items-center gap-2", children: p })
    ] }),
    /* @__PURE__ */ n("div", { className: "grid grid-cols-[2.5rem_repeat(7,minmax(0,1fr))] overflow-hidden rounded-lg border border-line", children: [
      /* @__PURE__ */ a("span", { className: "border-b border-line" }),
      l.map((e, i) => {
        var d;
        const s = e.date === (r == null ? void 0 : r.date), t = e.closed ?? ((d = e.entries) == null ? void 0 : d[0]), o = t ? u[t.kind].label : "";
        return /* @__PURE__ */ n(
          "div",
          {
            className: m("grid min-w-0 gap-0.5 border-b border-l border-line px-2 py-1.5", s && "bg-accent/8"),
            children: [
              /* @__PURE__ */ a("span", { className: m("truncate text-xs font-semibold", s ? "text-accent" : "text-ink"), children: y(e.date, i === 0) }),
              /* @__PURE__ */ a("span", { className: "truncate text-caption text-ink-muted", title: o, children: o || " " })
            ]
          },
          e.date
        );
      }),
      /* @__PURE__ */ a("div", { className: "relative h-120", children: g.map(
        (e) => e ? /* @__PURE__ */ a(
          "span",
          {
            className: "absolute right-1.5 -translate-y-1/2 font-mono text-caption text-ink-faint",
            style: { top: c(e * 60) },
            children: String(e).padStart(2, "0")
          },
          e
        ) : null
      ) }),
      l.map((e) => {
        const i = !!r && e.date === r.date, s = e.closed ? u[e.closed.kind].icon : null;
        return /* @__PURE__ */ n(
          "div",
          {
            "data-testid": `cal-${e.date}`,
            className: m("relative h-120 border-l border-line", i && "bg-accent/3"),
            style: e.closed ? $ : void 0,
            children: [
              g.map((t) => /* @__PURE__ */ a("span", { className: "absolute inset-x-0 h-px bg-line/60", style: { top: c(t * 60) } }, t)),
              e.spans.map((t) => {
                const o = k(t.nameIndex), d = i && t.start <= r.minute && r.minute <= t.end, N = t.label || t.name;
                return /* @__PURE__ */ n(
                  "div",
                  {
                    "data-running": d || void 0,
                    title: t.title ?? `${t.label ? `${t.label} · ` : ""}${t.name} · ${x(t.start)} until ${b(t.end)}`,
                    className: m(
                      "absolute inset-x-1 min-h-3.5 overflow-hidden rounded-sm px-1.5 py-1 font-mono text-caption leading-tight",
                      o.bg,
                      o.text,
                      t.kind === "extra" && "border-[1.5px] border-dashed border-ink-strong",
                      t.kind === "changed" && "border-[1.5px] border-ink-strong/50",
                      d && "ring-2 ring-ink-strong ring-offset-2 ring-offset-surface-card"
                    ),
                    style: { top: c(t.start), height: c(t.end + 1 - t.start) },
                    children: [
                      /* @__PURE__ */ a("span", { className: "block truncate font-sans font-semibold", children: N }),
                      /* @__PURE__ */ n("span", { className: "block truncate", children: [
                        x(t.start),
                        "–",
                        b(t.end)
                      ] })
                    ]
                  },
                  t.start
                );
              }),
              e.closed && s && /* @__PURE__ */ n("span", { className: "absolute inset-x-1 top-2 flex items-center gap-1 truncate rounded-md border border-line-strong bg-surface-card px-1.5 py-0.5 text-caption text-ink-strong", children: [
                /* @__PURE__ */ a(s, { className: "size-3 flex-none" }),
                S(e.closed)
              ] }),
              i && /* @__PURE__ */ a(
                "span",
                {
                  "aria-label": "Now",
                  className: "absolute inset-x-0 z-10 h-0.5 bg-destructive",
                  style: { top: c(r.minute) },
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
      f.map((e) => /* @__PURE__ */ n("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ a(T, { index: e.nameIndex }),
        e.label,
        e.detail && /* @__PURE__ */ a("span", { children: e.detail })
      ] }, `${e.nameIndex}|${e.label}`)),
      /* @__PURE__ */ a(I, {})
    ] })
  ] });
}
export {
  U as ScheduleWeekCalendar
};
