import { jsxs as n, jsx as t } from "react/jsx-runtime";
import { cn as s } from "../lib/cn.js";
import { scheduleColourClass as b } from "../lib/colour/scheduleColour.js";
import { DAY_NAMES as p, namesText as x } from "./schedule-calendar-words.js";
import { HATCH as g, KINDS as f, noteText as k } from "./schedule-kinds.js";
const o = 3, N = 3;
function $({ days: m, month: h, today: u }) {
  return /* @__PURE__ */ n(
    "div",
    {
      role: "grid",
      "aria-label": "Closures & holidays this month",
      className: "grid grid-cols-7 overflow-hidden rounded-lg border border-line",
      children: [
        p.map((r) => /* @__PURE__ */ t(
          "span",
          {
            className: "border-b border-line bg-surface-raised px-2 py-1.5 text-caption font-semibold text-ink-muted",
            children: r
          },
          r
        )),
        m.map(({ date: r, chips: l }, i) => {
          const a = r.startsWith(h);
          return /* @__PURE__ */ n(
            "div",
            {
              role: "gridcell",
              className: s(
                "grid min-h-24 content-start gap-1 p-1.5",
                i >= 7 && "border-t border-line",
                i % 7 && "border-l border-line",
                !a && "bg-surface-raised/40"
              ),
              children: [
                /* @__PURE__ */ t(
                  "span",
                  {
                    className: s(
                      "text-xs",
                      r === u ? "font-bold text-accent" : a ? "text-ink" : "text-ink-faint"
                    ),
                    children: Number(r.slice(8))
                  }
                ),
                l.slice(0, o).map((e) => {
                  const d = e.kind === "closed" || e.kind === "holiday";
                  return /* @__PURE__ */ n(
                    "span",
                    {
                      title: `${f[e.kind].label}: ${e.label} · ${x(e.schedules)}`,
                      className: s(
                        "flex min-w-0 items-center gap-1 rounded-sm border px-1.5 py-0.5 text-caption text-ink-strong",
                        d ? "border-line-strong" : "bg-surface-raised",
                        e.kind === "extra" && "border-dashed border-ink-strong",
                        e.kind === "changed" && "border-ink-strong/50"
                      ),
                      style: d ? g : void 0,
                      children: [
                        e.schedules.slice(0, N).map((c) => /* @__PURE__ */ t(
                          "span",
                          {
                            "aria-hidden": !0,
                            className: s("size-1.5 flex-none rounded-full", b(c.colour))
                          },
                          c.id
                        )),
                        /* @__PURE__ */ t("span", { className: "min-w-0 truncate", children: k(e) }),
                        e.schedules.length > 1 && /* @__PURE__ */ n("span", { className: "flex-none tabular-nums", children: [
                          "· ",
                          e.schedules.length.toLocaleString()
                        ] })
                      ]
                    },
                    `${e.kind}|${e.label}`
                  );
                }),
                l.length > o && /* @__PURE__ */ n("span", { className: "text-caption text-ink-faint", children: [
                  "+",
                  l.length - o,
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
  $ as ScheduleMonthGrid
};
