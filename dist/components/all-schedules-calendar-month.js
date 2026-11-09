import { jsxs as n, jsx as s } from "react/jsx-runtime";
import { cn as l } from "../lib/cn.js";
import { scheduleColourClass as u } from "../lib/schedule/scheduleColour.js";
import { HATCH as k, KINDS as b } from "./node-schedule-editor-dated-kinds.js";
import { DAY_NAMES as N } from "./node-schedule-editor-words.js";
import { entriesOn as $ } from "./all-schedules-calendar-entries.js";
const i = 3;
function D({ schedules: m, days: h, month: f, table: g, today: x }) {
  return /* @__PURE__ */ n(
    "div",
    {
      role: "grid",
      "aria-label": "Dated entries this month",
      className: "grid grid-cols-7 overflow-hidden rounded-lg border border-line",
      children: [
        N.map((r) => /* @__PURE__ */ s(
          "span",
          {
            className: "border-b border-line bg-surface-raised px-2 py-1.5 text-caption font-semibold text-ink-muted",
            children: r
          },
          r
        )),
        h.map((r, d) => {
          const o = $(m, g, r), c = r.startsWith(f);
          return /* @__PURE__ */ n(
            "div",
            {
              role: "gridcell",
              className: l(
                "grid min-h-24 content-start gap-1 p-1.5",
                d >= 7 && "border-t border-line",
                d % 7 && "border-l border-line",
                !c && "bg-surface-raised/40"
              ),
              children: [
                /* @__PURE__ */ s(
                  "span",
                  {
                    className: l(
                      "text-xs",
                      r === x ? "font-bold text-accent" : c ? "text-ink" : "text-ink-faint"
                    ),
                    children: Number(r.slice(8))
                  }
                ),
                o.slice(0, i).map(({ item: e, schedules: t }) => {
                  const p = e.kind === "closed" || e.kind === "holiday";
                  return /* @__PURE__ */ n(
                    "span",
                    {
                      title: `${b[e.kind].label}: ${e.label} · ${t.map((a) => a.name).join(", ")}`,
                      className: l(
                        "flex min-w-0 items-center gap-1 rounded-sm border px-1.5 py-0.5 text-caption text-ink-strong",
                        p ? "border-line-strong" : "bg-surface-raised",
                        e.kind === "extra" && "border-dashed border-ink-strong",
                        e.kind === "changed" && "border-ink-strong/50"
                      ),
                      style: p ? k : void 0,
                      children: [
                        t.map((a) => /* @__PURE__ */ s(
                          "span",
                          {
                            "aria-hidden": !0,
                            className: l("size-1.5 flex-none rounded-full", u(a.color))
                          },
                          a.id
                        )),
                        /* @__PURE__ */ n("span", { className: "truncate", children: [
                          e.label || b[e.kind].label,
                          t.length > 1 ? ` · ${t.length}` : ""
                        ] })
                      ]
                    },
                    `${e.kind}|${e.label}`
                  );
                }),
                o.length > i && /* @__PURE__ */ n("span", { className: "text-caption text-ink-faint", children: [
                  "+",
                  o.length - i,
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
  D as CalendarMonth
};
