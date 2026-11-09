import { jsxs as t, jsx as i } from "react/jsx-runtime";
import { cn as d } from "../lib/cn.js";
import { scheduleColourClass as l } from "../lib/colour/scheduleColour.js";
import { dateText as m, spanText as o } from "./schedule-calendar-words.js";
import { KindChip as c } from "./schedule-kinds.js";
function g({
  title: r,
  entries: n,
  today: s
}) {
  return /* @__PURE__ */ t("div", { className: "grid gap-2", children: [
    /* @__PURE__ */ i("h3", { className: "text-sm font-semibold text-ink-strong", children: r }),
    /* @__PURE__ */ t(
      "ul",
      {
        "aria-label": "Dated entries in this period",
        className: "divide-y divide-line overflow-hidden rounded-lg border border-line",
        children: [
          n.length === 0 && /* @__PURE__ */ i("li", { className: "p-4 text-center text-xs text-ink-faint", children: "No dated entries." }),
          n.map((e) => /* @__PURE__ */ t(
            "li",
            {
              className: "grid grid-cols-[minmax(0,8rem)_minmax(0,1fr)_minmax(0,1.2fr)_auto] items-center gap-3 px-3.5 py-2.5",
              children: [
                /* @__PURE__ */ i("span", { className: "text-xs font-semibold text-ink-strong", children: m(e.date, s) }),
                /* @__PURE__ */ t("span", { className: "truncate text-xs text-ink", children: [
                  e.label,
                  (e.hours ?? []).map((a) => ` · ${o(a.start, a.end)}`).join("")
                ] }),
                /* @__PURE__ */ i("span", { className: "flex min-w-0 flex-wrap gap-x-3 gap-y-1", children: e.schedules.map((a) => /* @__PURE__ */ t("span", { className: "flex items-center gap-1.5 whitespace-nowrap text-caption text-ink-muted", children: [
                  /* @__PURE__ */ i("span", { "aria-hidden": !0, className: d("size-1.5 rounded-full", l(a.colour)) }),
                  a.name
                ] }, a.id)) }),
                /* @__PURE__ */ i(c, { kind: e.kind, nameIndex: e.nameIndex ?? 1 })
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
  g as ScheduleDatedList
};
