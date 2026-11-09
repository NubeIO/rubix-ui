import { jsxs as l, jsx as a } from "react/jsx-runtime";
import { Button as k } from "./button.js";
import { cn as t } from "../lib/cn.js";
import { Tabs as b, TabsList as w, TabsTrigger as d } from "./tabs.js";
import { nameColour as C } from "../lib/colour/nameColour.js";
import { scheduleColourClass as v } from "../lib/colour/scheduleColour.js";
import { MONTHS as T, weekText as S } from "./schedule-calendar-words.js";
import { ScheduleCalendarNav as $ } from "./schedule-calendar-nav.js";
import { ScheduleDatedList as z } from "./schedule-dated-list.js";
import { ScheduleLegendKeys as D } from "./schedule-legend-keys.js";
function O({
  view: i,
  onViewChange: m,
  start: n,
  schedules: o,
  hidden: c,
  onToggle: u,
  legend: p,
  entries: f,
  today: h,
  children: x,
  ...g
}) {
  const s = T[Number(n.slice(5, 7)) - 1], N = i === "week" ? S(n) : `${s} ${n.slice(0, 4)}`;
  return /* @__PURE__ */ l("section", { className: "grid gap-4", children: [
    /* @__PURE__ */ l("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ a(b, { value: i, onValueChange: (e) => m(e), className: "gap-0", children: /* @__PURE__ */ l(w, { "aria-label": "Calendar view", children: [
        /* @__PURE__ */ a(d, { value: "week", children: "Week" }),
        /* @__PURE__ */ a(d, { value: "month", children: "Month" })
      ] }) }),
      /* @__PURE__ */ a($, { unit: i, label: N, ...g }),
      /* @__PURE__ */ a("div", { className: "ml-auto flex flex-wrap gap-1.5", children: o.map((e) => {
        const r = !c.includes(e.id);
        return /* @__PURE__ */ l(
          k,
          {
            variant: "outline",
            size: "sm",
            "aria-pressed": r,
            className: t("rounded-full", !r && "text-ink-faint"),
            onClick: () => u(e.id),
            children: [
              /* @__PURE__ */ a(
                "span",
                {
                  "aria-hidden": !0,
                  className: t("size-2 rounded-full", r ? v(e.colour) : "bg-ink-faint")
                }
              ),
              e.name
            ]
          },
          e.id
        );
      }) })
    ] }),
    x,
    /* @__PURE__ */ l("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-1.5 text-caption text-ink-muted", children: [
      p.map((e) => /* @__PURE__ */ l("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ a("span", { "aria-hidden": !0, className: t("size-2.5 rounded-xs", C(e.nameIndex).bg) }),
        /* @__PURE__ */ a("span", { className: "text-ink", children: e.label }),
        e.detail
      ] }, `${e.nameIndex}|${e.label}`)),
      /* @__PURE__ */ a(D, {})
    ] }),
    /* @__PURE__ */ a(
      z,
      {
        title: i === "week" ? "Dated entries this week" : `Dated entries in ${s}`,
        entries: f,
        today: h
      }
    )
  ] });
}
export {
  O as AllSchedulesView
};
