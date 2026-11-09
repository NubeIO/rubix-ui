import { jsxs as s, jsx as r } from "react/jsx-runtime";
import { cn as i } from "../lib/cn.js";
import { nameColour as N } from "../lib/colour/nameColour.js";
import { scheduleColourClass as k } from "../lib/colour/scheduleColour.js";
import { columnText as h, spanText as v } from "./schedule-calendar-words.js";
import { KINDS as w, HATCH as $, noteText as C } from "./schedule-kinds.js";
const d = (o) => `${o / 1440 * 100}%`;
function A({ dates: o, rows: f, today: c, onOpen: m }) {
  return /* @__PURE__ */ s(
    "div",
    {
      role: "table",
      "aria-label": "Schedules this week",
      className: "grid grid-cols-[minmax(9rem,13rem)_repeat(7,minmax(0,1fr))] overflow-hidden rounded-lg border border-line",
      children: [
        /* @__PURE__ */ r("span", { className: "border-b border-line bg-surface-raised" }),
        o.map((e, n) => /* @__PURE__ */ s(
          "div",
          {
            className: i(
              "grid gap-0.5 border-b border-l border-line px-2 py-1.5",
              e === c ? "bg-accent/8" : "bg-surface-raised"
            ),
            children: [
              /* @__PURE__ */ r("span", { className: i("truncate text-xs font-semibold", e === c ? "text-accent" : "text-ink"), children: h(e, n === 0) }),
              /* @__PURE__ */ s("span", { className: "flex justify-between tabular-nums text-caption text-ink-faint", children: [
                /* @__PURE__ */ r("span", { children: "00" }),
                /* @__PURE__ */ r("span", { children: "12" }),
                /* @__PURE__ */ r("span", { children: "24" })
              ] })
            ]
          },
          e
        )),
        f.map((e) => /* @__PURE__ */ s("div", { role: "row", className: "contents", children: [
          /* @__PURE__ */ s("div", { className: "grid content-center gap-0.5 border-b border-line px-3 py-2.5", children: [
            /* @__PURE__ */ s("span", { className: "flex min-w-0 items-center gap-2", children: [
              /* @__PURE__ */ r("span", { "aria-hidden": !0, className: i("size-2 flex-none rounded-full", k(e.colour)) }),
              m ? /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  className: "truncate text-left text-xs font-semibold text-ink-strong hover:text-accent",
                  onClick: () => m(e.id),
                  children: e.name
                }
              ) : /* @__PURE__ */ r("span", { className: "truncate text-xs font-semibold text-ink-strong", children: e.name })
            ] }),
            /* @__PURE__ */ r("span", { className: "truncate text-caption text-ink-muted", children: e.status })
          ] }),
          e.days.map((n) => {
            var b, u;
            const a = ((b = e.now) == null ? void 0 : b.date) === n.date ? e.now.minute : void 0, l = n.closed ?? ((u = n.entries) == null ? void 0 : u[0]), p = l ? w[l.kind].icon : null, x = n.closed ? `${n.closed.label || "Closed"}, closed all day` : n.spans.length ? n.spans.map((t) => `${t.name} ${v(t.start, t.end)}`).join(", ") : "Off all day";
            return /* @__PURE__ */ s(
              "div",
              {
                title: `${e.name}, ${h(n.date, !0)}: ${x}`,
                className: i(
                  "grid content-center gap-1 border-b border-l border-line px-2 py-2.5",
                  n.date === c && "bg-accent/3"
                ),
                children: [
                  /* @__PURE__ */ s("div", { className: "relative h-6 rounded-sm bg-surface-inset", style: n.closed ? $ : void 0, children: [
                    !n.closed && n.spans.map((t) => {
                      const g = a !== void 0 && t.start <= a && a <= t.end;
                      return /* @__PURE__ */ r(
                        "span",
                        {
                          "data-running": g || void 0,
                          className: i(
                            "absolute inset-y-0 rounded-xs",
                            N(t.nameIndex).bg,
                            t.kind === "extra" && "border-[1.5px] border-dashed border-ink-strong",
                            t.kind === "changed" && "border border-ink-strong/50",
                            g && "ring-2 ring-inset ring-ink-strong"
                          ),
                          style: { left: d(t.start), width: d(t.end + 1 - t.start) }
                        },
                        t.start
                      );
                    }),
                    a !== void 0 && /* @__PURE__ */ r("span", { className: "absolute inset-y-0 z-10 w-0.5 bg-destructive", style: { left: d(a) } })
                  ] }),
                  l && p && /* @__PURE__ */ s("span", { className: "flex min-w-0 items-center gap-1 text-caption text-ink-muted", children: [
                    /* @__PURE__ */ r(p, { className: "size-3 flex-none" }),
                    /* @__PURE__ */ r("span", { className: "truncate", children: C(l) })
                  ] })
                ]
              },
              n.date
            );
          })
        ] }, e.id))
      ]
    }
  );
}
export {
  A as ScheduleWeekRows
};
