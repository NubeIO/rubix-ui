import { jsxs as s, jsx as i } from "react/jsx-runtime";
import { cn as l } from "../lib/cn.js";
import { nameColour as S } from "../lib/schedule/nameColour.js";
import { nameIndex as T, DAY_MINUTES as z } from "../lib/schedule/nodeSchedule.js";
import { scheduleColourClass as A } from "../lib/schedule/scheduleColour.js";
import { KINDS as k, HATCH as D } from "./node-schedule-editor-dated-kinds.js";
import { columnText as w, untilText as H } from "./node-schedule-editor-words.js";
import { hhmm as _ } from "../lib/time.js";
const m = (c) => `${c / z * 100}%`;
function B({ schedules: c, days: p, table: v, today: d, now: $, onOpen: b }) {
  return /* @__PURE__ */ s(
    "div",
    {
      role: "table",
      "aria-label": "Schedules this week",
      className: "grid grid-cols-[minmax(9rem,13rem)_repeat(7,minmax(0,1fr))] overflow-hidden rounded-lg border border-line",
      children: [
        /* @__PURE__ */ i("span", { className: "border-b border-line bg-surface-raised" }),
        p.map((t, n) => /* @__PURE__ */ s(
          "div",
          {
            className: l(
              "grid gap-0.5 border-b border-l border-line px-2 py-1.5",
              t === d ? "bg-accent/8" : "bg-surface-raised"
            ),
            children: [
              /* @__PURE__ */ i("span", { className: l("truncate text-xs font-semibold", t === d ? "text-accent" : "text-ink"), children: w(t, n === 0) }),
              /* @__PURE__ */ s("span", { className: "flex justify-between font-mono text-caption text-ink-faint", children: [
                /* @__PURE__ */ i("span", { children: "00" }),
                /* @__PURE__ */ i("span", { children: "12" }),
                /* @__PURE__ */ i("span", { children: "24" })
              ] })
            ]
          },
          t
        )),
        c.map((t) => {
          const n = $.get(t.id), C = n != null && n.enabled ? `Now: ${n.now.name} = ${n.now.value}` : "Switched off";
          return /* @__PURE__ */ s("div", { role: "row", className: "contents", children: [
            /* @__PURE__ */ s("div", { className: "grid content-center gap-0.5 border-b border-line px-3 py-2.5", children: [
              /* @__PURE__ */ s("span", { className: "flex min-w-0 items-center gap-2", children: [
                /* @__PURE__ */ i("span", { "aria-hidden": !0, className: l("size-2 flex-none rounded-full", A(t.color)) }),
                b ? /* @__PURE__ */ i(
                  "button",
                  {
                    type: "button",
                    className: "truncate text-left text-xs font-semibold text-ink-strong hover:text-accent",
                    onClick: () => b(t.id),
                    children: t.name
                  }
                ) : /* @__PURE__ */ i("span", { className: "truncate text-xs font-semibold text-ink-strong", children: t.name })
              ] }),
              /* @__PURE__ */ i("span", { className: "truncate text-caption text-ink-muted", children: C })
            ] }),
            p.map((o) => {
              var f;
              const e = (f = v.get(t.id)) == null ? void 0 : f.get(o), u = (n == null ? void 0 : n.at.date) === o, a = (e == null ? void 0 : e.closed) ?? (e == null ? void 0 : e.items[0]), g = a ? k[a.kind].icon : null, j = e != null && e.closed ? `${e.closed.label || "Closed"}, closed all day` : e != null && e.spans.length ? e.spans.map((r) => `${r.name} ${_(r.start)}–${H(r.end)}`).join(", ") : "Off all day";
              return /* @__PURE__ */ s(
                "div",
                {
                  title: `${t.name}, ${w(o, !0)}: ${j}`,
                  className: l(
                    "grid content-center gap-1 border-b border-l border-line px-2 py-2.5",
                    o === d && "bg-accent/3"
                  ),
                  children: [
                    /* @__PURE__ */ s("div", { className: "relative h-6 rounded-sm bg-surface-inset", style: e != null && e.closed ? D : void 0, children: [
                      !(e != null && e.closed) && (e == null ? void 0 : e.spans.map((r) => {
                        var x, N;
                        const I = S(T(t, r.name)), h = u && r.start <= ((n == null ? void 0 : n.at.minute) ?? -1) && ((n == null ? void 0 : n.at.minute) ?? -1) <= r.end;
                        return /* @__PURE__ */ i(
                          "span",
                          {
                            "data-running": h || void 0,
                            className: l(
                              "absolute inset-y-0 rounded-xs",
                              I.bg,
                              ((x = r.item) == null ? void 0 : x.kind) === "extra" && "border-[1.5px] border-dashed border-ink-strong",
                              ((N = r.item) == null ? void 0 : N.kind) === "changed" && "border border-ink-strong/50",
                              h && "ring-2 ring-inset ring-ink-strong"
                            ),
                            style: { left: m(r.start), width: m(r.end + 1 - r.start) }
                          },
                          r.start
                        );
                      })),
                      u && (n == null ? void 0 : n.enabled) && /* @__PURE__ */ i(
                        "span",
                        {
                          className: "absolute inset-y-0 z-10 w-0.5 bg-destructive",
                          style: { left: m(n.at.minute) }
                        }
                      )
                    ] }),
                    a && g && /* @__PURE__ */ s("span", { className: "flex min-w-0 items-center gap-1 text-caption text-ink-muted", children: [
                      /* @__PURE__ */ i(g, { className: "size-3 flex-none" }),
                      /* @__PURE__ */ i("span", { className: "truncate", children: a.label || k[a.kind].label })
                    ] })
                  ]
                },
                o
              );
            })
          ] }, t.id);
        })
      ]
    }
  );
}
export {
  B as CalendarWeekRows
};
