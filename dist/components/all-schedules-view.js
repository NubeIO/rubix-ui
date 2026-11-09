import { jsxs as l, jsx as a } from "react/jsx-runtime";
import { Search as C } from "lucide-react";
import { Button as v } from "./button.js";
import { Input as w } from "./input.js";
import { cn as o } from "../lib/cn.js";
import { Tabs as S, TabsList as T, TabsTrigger as c } from "./tabs.js";
import { nameColour as I } from "../lib/colour/nameColour.js";
import { scheduleColourClass as y } from "../lib/colour/scheduleColour.js";
import { MONTHS as $, weekText as z } from "./schedule-calendar-words.js";
import { ScheduleCalendarNav as L } from "./schedule-calendar-nav.js";
import { ScheduleDatedList as M } from "./schedule-dated-list.js";
import { ScheduleLegendKeys as j } from "./schedule-legend-keys.js";
const H = 12;
function G({
  view: t,
  onViewChange: d,
  start: n,
  schedules: i,
  search: r,
  onSearch: h,
  hidden: u,
  onToggle: p,
  legend: f,
  entries: x,
  today: g,
  children: N,
  ...k
}) {
  const m = $[Number(n.slice(5, 7)) - 1], b = t === "week" ? z(n) : `${m} ${n.slice(0, 4)}`;
  return /* @__PURE__ */ l("section", { className: "grid gap-4", children: [
    /* @__PURE__ */ l("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ a(S, { value: t, onValueChange: (e) => d(e), className: "gap-0", children: /* @__PURE__ */ l(T, { "aria-label": "Calendar view", children: [
        /* @__PURE__ */ a(c, { value: "week", children: "Week" }),
        /* @__PURE__ */ a(c, { value: "month", children: "Month" })
      ] }) }),
      /* @__PURE__ */ a(L, { unit: t, label: b, ...k }),
      /* @__PURE__ */ l("label", { className: "relative ml-auto", children: [
        /* @__PURE__ */ a(
          C,
          {
            size: 14,
            "aria-hidden": !0,
            className: "pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-muted"
          }
        ),
        /* @__PURE__ */ a(
          w,
          {
            "aria-label": "Search schedules",
            className: "h-8 w-56 pl-8 text-xs",
            placeholder: "Search schedules…",
            value: r,
            onChange: (e) => h(e.target.value)
          }
        )
      ] })
    ] }),
    i.length > H ? /* @__PURE__ */ l("p", { className: "text-caption text-ink-muted", children: [
      "Showing all ",
      i.length,
      " ",
      r.trim() ? "matching schedules" : "schedules",
      ". Search to pick fewer."
    ] }) : i.length === 0 ? /* @__PURE__ */ l("p", { className: "text-caption text-ink-muted", children: [
      "No schedule matches “",
      r.trim(),
      "”."
    ] }) : /* @__PURE__ */ a("div", { className: "flex flex-wrap gap-1.5", children: i.map((e) => {
      const s = !u.includes(e.id);
      return /* @__PURE__ */ l(
        v,
        {
          variant: "outline",
          size: "sm",
          "aria-pressed": s,
          className: o("rounded-full", !s && "text-ink-faint"),
          onClick: () => p(e.id),
          children: [
            /* @__PURE__ */ a(
              "span",
              {
                "aria-hidden": !0,
                className: o("size-2 rounded-full", s ? y(e.colour) : "bg-ink-faint")
              }
            ),
            e.name
          ]
        },
        e.id
      );
    }) }),
    N,
    /* @__PURE__ */ l("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-1.5 text-caption text-ink-muted", children: [
      f.map((e) => /* @__PURE__ */ l("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ a("span", { "aria-hidden": !0, className: o("size-2.5 rounded-xs", I(e.nameIndex).bg) }),
        /* @__PURE__ */ a("span", { className: "text-ink", children: e.label }),
        e.detail
      ] }, `${e.nameIndex}|${e.label}`)),
      /* @__PURE__ */ a(j, {})
    ] }),
    /* @__PURE__ */ a(
      M,
      {
        title: t === "week" ? "Closures & holidays this week" : `Closures & holidays in ${m}`,
        entries: x,
        today: g
      }
    )
  ] });
}
export {
  G as AllSchedulesView,
  H as CHIP_LIMIT
};
