import { jsxs as t, jsx as a } from "react/jsx-runtime";
import { Search as v } from "lucide-react";
import { Button as w } from "./button.js";
import { Input as S } from "./input.js";
import { cn as m } from "../lib/cn.js";
import { Tabs as C, TabsList as T, TabsTrigger as c } from "./tabs.js";
import { nameColour as I } from "../lib/colour/nameColour.js";
import { scheduleColourClass as $ } from "../lib/colour/scheduleColour.js";
import { MONTHS as z, weekText as L } from "./schedule-calendar-words.js";
import { ScheduleCalendarNav as y } from "./schedule-calendar-nav.js";
import { ScheduleDatedList as D } from "./schedule-dated-list.js";
import { ScheduleLegendKeys as M } from "./schedule-legend-keys.js";
const j = 12;
function G({
  view: l,
  onViewChange: d,
  start: i,
  schedules: n,
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
  const o = z[Number(i.slice(5, 7)) - 1], b = l === "week" ? L(i) : `${o} ${i.slice(0, 4)}`;
  return /* @__PURE__ */ t("section", { className: "grid gap-4", children: [
    /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ a(C, { value: l, onValueChange: (e) => d(e), className: "gap-0", children: /* @__PURE__ */ t(T, { "aria-label": "Calendar view", children: [
        /* @__PURE__ */ a(c, { value: "week", children: "Week" }),
        /* @__PURE__ */ a(c, { value: "month", children: "Month" })
      ] }) }),
      /* @__PURE__ */ a(y, { unit: l, label: b, ...k }),
      /* @__PURE__ */ t("label", { className: "relative ml-auto", children: [
        /* @__PURE__ */ a(
          v,
          {
            size: 14,
            "aria-hidden": !0,
            className: "pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-muted"
          }
        ),
        /* @__PURE__ */ a(
          S,
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
    n.length > j ? /* @__PURE__ */ t("p", { className: "text-caption text-ink-muted", children: [
      "Showing all ",
      n.length,
      " ",
      r.trim() ? "matching schedules" : "schedules",
      ". Search to pick fewer."
    ] }) : n.length === 0 ? /* @__PURE__ */ t("p", { className: "text-caption text-ink-muted", children: [
      "No schedule matches “",
      r.trim(),
      "”."
    ] }) : /* @__PURE__ */ a("div", { className: "flex flex-wrap gap-1.5", children: n.map((e) => {
      const s = !u.includes(e.id);
      return /* @__PURE__ */ t(
        w,
        {
          variant: "outline",
          size: "sm",
          "aria-pressed": s,
          className: m("rounded-full", !s && "text-ink-faint"),
          onClick: () => p(e.id),
          children: [
            /* @__PURE__ */ a(
              "span",
              {
                "aria-hidden": !0,
                className: m("size-2 rounded-full", s ? $(e.colour) : "bg-ink-faint")
              }
            ),
            e.name
          ]
        },
        e.id
      );
    }) }),
    N,
    /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-1.5 text-caption text-ink-muted", children: [
      f.map((e) => /* @__PURE__ */ t("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ a("span", { "aria-hidden": !0, className: m("size-2.5 rounded-xs", I(e.nameIndex).bg) }),
        /* @__PURE__ */ a("span", { className: "text-ink", children: e.label }),
        e.detail
      ] }, `${e.nameIndex}|${e.label}`)),
      /* @__PURE__ */ a(M, {})
    ] }),
    /* @__PURE__ */ a(
      D,
      {
        title: l === "week" ? "Dated entries this week" : `Dated entries in ${o}`,
        entries: x,
        today: g
      }
    )
  ] });
}
export {
  G as AllSchedulesView,
  j as CHIP_LIMIT
};
