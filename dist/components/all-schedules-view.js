import { jsxs as l, jsx as a } from "react/jsx-runtime";
import { Search as S } from "lucide-react";
import { Button as v } from "./button.js";
import { Input as w } from "./input.js";
import { cn as o } from "../lib/cn.js";
import { Tabs as y, TabsList as $, TabsTrigger as d } from "./tabs.js";
import { nameColour as T } from "../lib/colour/nameColour.js";
import { scheduleColourClass as I } from "../lib/colour/scheduleColour.js";
import { MONTHS as L, weekText as z } from "./schedule-calendar-words.js";
import { ScheduleCalendarNav as M } from "./schedule-calendar-nav.js";
import { ScheduleDatedList as j } from "./schedule-dated-list.js";
import { ScheduleLegendKeys as H } from "./schedule-legend-keys.js";
const V = 12;
function J({
  view: i,
  onViewChange: h,
  start: m,
  schedules: n,
  search: r,
  onSearch: p,
  noun: t = { one: "schedule", many: "schedules" },
  hidden: u,
  onToggle: f,
  legend: x,
  entries: g,
  today: N,
  children: k,
  ...b
}) {
  const c = L[Number(m.slice(5, 7)) - 1], C = i === "week" ? z(m) : `${c} ${m.slice(0, 4)}`;
  return /* @__PURE__ */ l("section", { className: "grid gap-4", children: [
    /* @__PURE__ */ l("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ a(y, { value: i, onValueChange: (e) => h(e), className: "gap-0", children: /* @__PURE__ */ l($, { "aria-label": "Calendar view", children: [
        /* @__PURE__ */ a(d, { value: "week", children: "Week" }),
        /* @__PURE__ */ a(d, { value: "month", children: "Month" })
      ] }) }),
      /* @__PURE__ */ a(M, { unit: i, label: C, ...b }),
      /* @__PURE__ */ l("label", { className: "relative ml-auto", children: [
        /* @__PURE__ */ a(
          S,
          {
            size: 14,
            "aria-hidden": !0,
            className: "pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-muted"
          }
        ),
        /* @__PURE__ */ a(
          w,
          {
            "aria-label": `Search ${t.many}`,
            className: "h-8 w-56 pl-8 text-xs",
            placeholder: `Search ${t.many}…`,
            value: r,
            onChange: (e) => p(e.target.value)
          }
        )
      ] })
    ] }),
    n.length > V ? /* @__PURE__ */ l("p", { className: "text-caption text-ink-muted", children: [
      "Showing all ",
      n.length.toLocaleString(),
      " ",
      r.trim() ? `matching ${t.many}` : t.many,
      ". Search to pick fewer."
    ] }) : n.length === 0 ? r.trim() && /* @__PURE__ */ l("p", { className: "text-caption text-ink-muted", children: [
      "No ",
      t.one,
      " matches “",
      r.trim(),
      "”."
    ] }) : /* @__PURE__ */ a("div", { className: "flex flex-wrap gap-1.5", children: n.map((e) => {
      const s = !u.includes(e.id);
      return /* @__PURE__ */ l(
        v,
        {
          variant: "outline",
          size: "sm",
          "aria-pressed": s,
          className: o("rounded-full", !s && "text-ink-faint"),
          onClick: () => f(e.id),
          children: [
            /* @__PURE__ */ a(
              "span",
              {
                "aria-hidden": !0,
                className: o("size-2 rounded-full", s ? I(e.colour) : "bg-ink-faint")
              }
            ),
            e.name
          ]
        },
        e.id
      );
    }) }),
    k,
    /* @__PURE__ */ l("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-1.5 text-caption text-ink-muted", children: [
      x.map((e) => /* @__PURE__ */ l("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ a("span", { "aria-hidden": !0, className: o("size-2.5 rounded-xs", T(e.nameIndex).bg) }),
        /* @__PURE__ */ a("span", { className: "text-ink", children: e.label }),
        e.detail
      ] }, `${e.nameIndex}|${e.label}`)),
      /* @__PURE__ */ a(H, {})
    ] }),
    /* @__PURE__ */ a(
      j,
      {
        title: i === "week" ? "Closures & holidays this week" : `Closures & holidays in ${c}`,
        entries: g,
        today: N
      }
    )
  ] });
}
export {
  J as AllSchedulesView,
  V as CHIP_LIMIT
};
