import { jsxs as n, jsx as s } from "react/jsx-runtime";
import { cn as i } from "../lib/cn.js";
import { scheduleColourClass as b } from "../lib/colour/scheduleColour.js";
import { DAY_NAMES as u } from "./schedule-calendar-words.js";
import { HATCH as g, KINDS as x, noteText as f } from "./schedule-kinds.js";
const l = 3;
function A({ days: c, month: h, today: p }) {
  return /* @__PURE__ */ n(
    "div",
    {
      role: "grid",
      "aria-label": "Dated entries this month",
      className: "grid grid-cols-7 overflow-hidden rounded-lg border border-line",
      children: [
        u.map((r) => /* @__PURE__ */ s(
          "span",
          {
            className: "border-b border-line bg-surface-raised px-2 py-1.5 text-caption font-semibold text-ink-muted",
            children: r
          },
          r
        )),
        c.map(({ date: r, chips: o }, d) => {
          const a = r.startsWith(h);
          return /* @__PURE__ */ n(
            "div",
            {
              role: "gridcell",
              className: i(
                "grid min-h-24 content-start gap-1 p-1.5",
                d >= 7 && "border-t border-line",
                d % 7 && "border-l border-line",
                !a && "bg-surface-raised/40"
              ),
              children: [
                /* @__PURE__ */ s(
                  "span",
                  {
                    className: i(
                      "text-xs",
                      r === p ? "font-bold text-accent" : a ? "text-ink" : "text-ink-faint"
                    ),
                    children: Number(r.slice(8))
                  }
                ),
                o.slice(0, l).map((e) => {
                  const m = e.kind === "closed" || e.kind === "holiday";
                  return /* @__PURE__ */ n(
                    "span",
                    {
                      title: `${x[e.kind].label}: ${e.label} · ${e.schedules.map((t) => t.name).join(", ")}`,
                      className: i(
                        "flex min-w-0 items-center gap-1 rounded-sm border px-1.5 py-0.5 text-caption text-ink-strong",
                        m ? "border-line-strong" : "bg-surface-raised",
                        e.kind === "extra" && "border-dashed border-ink-strong",
                        e.kind === "changed" && "border-ink-strong/50"
                      ),
                      style: m ? g : void 0,
                      children: [
                        e.schedules.map((t) => /* @__PURE__ */ s(
                          "span",
                          {
                            "aria-hidden": !0,
                            className: i("size-1.5 flex-none rounded-full", b(t.colour))
                          },
                          t.id
                        )),
                        /* @__PURE__ */ n("span", { className: "truncate", children: [
                          f(e),
                          e.schedules.length > 1 ? ` · ${e.schedules.length}` : ""
                        ] })
                      ]
                    },
                    `${e.kind}|${e.label}`
                  );
                }),
                o.length > l && /* @__PURE__ */ n("span", { className: "text-caption text-ink-faint", children: [
                  "+",
                  o.length - l,
                  " more"
                ] })
              ]
            },
            r
          );
        })
      ]
    }
  );
}
export {
  A as ScheduleMonthGrid
};
