import { jsxs as n, jsx as i } from "react/jsx-runtime";
import { cn as t } from "../lib/cn.js";
import { scheduleColourClass as p } from "../lib/colour/scheduleColour.js";
import { DAY_NAMES as u, namesText as x } from "./schedule-calendar-words.js";
import { HATCH as g, KINDS as f, noteText as k } from "./schedule-kinds.js";
const o = 3, N = 3;
function y({ days: m, month: h, today: b }) {
  return /* @__PURE__ */ n(
    "div",
    {
      role: "grid",
      "aria-label": "Dated entries this month",
      className: "grid grid-cols-7 overflow-hidden rounded-lg border border-line",
      children: [
        u.map((r) => /* @__PURE__ */ i(
          "span",
          {
            className: "border-b border-line bg-surface-raised px-2 py-1.5 text-caption font-semibold text-ink-muted",
            children: r
          },
          r
        )),
        m.map(({ date: r, chips: s }, l) => {
          const d = r.startsWith(h);
          return /* @__PURE__ */ n(
            "div",
            {
              role: "gridcell",
              className: t(
                "grid min-h-24 content-start gap-1 p-1.5",
                l >= 7 && "border-t border-line",
                l % 7 && "border-l border-line",
                !d && "bg-surface-raised/40"
              ),
              children: [
                /* @__PURE__ */ i(
                  "span",
                  {
                    className: t(
                      "text-xs",
                      r === b ? "font-bold text-accent" : d ? "text-ink" : "text-ink-faint"
                    ),
                    children: Number(r.slice(8))
                  }
                ),
                s.slice(0, o).map((e) => {
                  const a = e.kind === "closed" || e.kind === "holiday";
                  return /* @__PURE__ */ n(
                    "span",
                    {
                      title: `${f[e.kind].label}: ${e.label} · ${x(e.schedules)}`,
                      className: t(
                        "flex min-w-0 items-center gap-1 rounded-sm border px-1.5 py-0.5 text-caption text-ink-strong",
                        a ? "border-line-strong" : "bg-surface-raised",
                        e.kind === "extra" && "border-dashed border-ink-strong",
                        e.kind === "changed" && "border-ink-strong/50"
                      ),
                      style: a ? g : void 0,
                      children: [
                        e.schedules.slice(0, N).map((c) => /* @__PURE__ */ i(
                          "span",
                          {
                            "aria-hidden": !0,
                            className: t("size-1.5 flex-none rounded-full", p(c.colour))
                          },
                          c.id
                        )),
                        /* @__PURE__ */ n("span", { className: "truncate", children: [
                          k(e),
                          e.schedules.length > 1 ? ` · ${e.schedules.length}` : ""
                        ] })
                      ]
                    },
                    `${e.kind}|${e.label}`
                  );
                }),
                s.length > o && /* @__PURE__ */ n("span", { className: "text-caption text-ink-faint", children: [
                  "+",
                  s.length - o,
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
  y as ScheduleMonthGrid
};
