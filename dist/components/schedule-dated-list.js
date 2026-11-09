import { jsxs as t, jsx as n } from "react/jsx-runtime";
import { cn as d } from "../lib/cn.js";
import { scheduleColourClass as o } from "../lib/colour/scheduleColour.js";
import { dateText as m, spanText as c, namesText as x } from "./schedule-calendar-words.js";
import { KindChip as p } from "./schedule-kinds.js";
const a = 3;
function k({
  title: l,
  entries: s,
  today: r
}) {
  return /* @__PURE__ */ t("div", { className: "grid gap-2", children: [
    /* @__PURE__ */ n("h3", { className: "text-sm font-semibold text-ink-strong", children: l }),
    /* @__PURE__ */ t(
      "ul",
      {
        "aria-label": "Closures & holidays in this period",
        className: "divide-y divide-line overflow-hidden rounded-lg border border-line",
        children: [
          s.length === 0 && /* @__PURE__ */ n("li", { className: "p-4 text-center text-xs text-ink-faint", children: "No closures or holidays." }),
          s.map((e) => /* @__PURE__ */ t(
            "li",
            {
              className: "grid grid-cols-[minmax(0,8rem)_minmax(0,1fr)_minmax(0,1.2fr)_auto] items-center gap-3 px-3.5 py-2.5",
              children: [
                /* @__PURE__ */ n("span", { className: "text-xs font-semibold text-ink-strong", children: m(e.date, r) }),
                /* @__PURE__ */ t("span", { className: "truncate text-xs text-ink", children: [
                  e.label,
                  (e.hours ?? []).map((i) => ` · ${c(i.start, i.end)}`).join("")
                ] }),
                /* @__PURE__ */ t("span", { className: "flex min-w-0 flex-wrap gap-x-3 gap-y-1", children: [
                  e.schedules.slice(0, a).map((i) => /* @__PURE__ */ t("span", { className: "flex items-center gap-1.5 whitespace-nowrap text-caption text-ink-muted", children: [
                    /* @__PURE__ */ n("span", { "aria-hidden": !0, className: d("size-1.5 rounded-full", o(i.colour)) }),
                    i.name
                  ] }, i.id)),
                  e.schedules.length > a && /* @__PURE__ */ t("span", { className: "text-caption text-ink-faint", title: x(e.schedules, 1 / 0), children: [
                    "+",
                    e.schedules.length - a,
                    " more"
                  ] })
                ] }),
                /* @__PURE__ */ n(p, { kind: e.kind, nameIndex: e.nameIndex ?? 1 })
              ]
            },
            `${e.kind}|${e.label}`
          ))
        ]
      }
    )
  ] });
}
export {
  k as ScheduleDatedList
};
