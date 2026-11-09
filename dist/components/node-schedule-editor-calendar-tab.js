import { jsxs as a, jsx as n } from "react/jsx-runtime";
import { useState as $ } from "react";
import { ChevronLeft as A, ChevronRight as D, Plus as I } from "lucide-react";
import { Button as d } from "./button.js";
import { cn as c } from "../lib/cn.js";
import { nameColour as H } from "../lib/schedule/nameColour.js";
import { nameIndex as O, DAY_MINUTES as _ } from "../lib/schedule/nodeSchedule.js";
import { addDays as k } from "../lib/date.js";
import { resolveDay as j } from "../lib/schedule/resolveDay.js";
import { mondayOf as E, weekText as P, columnText as R, untilText as v, nameText as U } from "./node-schedule-editor-words.js";
import { NameSwatch as B } from "./name-swatch.js";
import { KINDS as m, HATCH as y } from "./node-schedule-editor-dated-kinds.js";
import { hhmm as w } from "../lib/time.js";
const l = (s) => `${s / _ * 100}%`, C = [0, 3, 6, 9, 12, 15, 18, 21];
function ee({ doc: s, at: i, canEdit: T, onAdd: z }) {
  const [b, p] = $(0), x = k(E(i.date), b * 7), u = Array.from({ length: 7 }, (e, r) => j(s, k(x, r)));
  return /* @__PURE__ */ a("section", { className: "grid gap-3", children: [
    /* @__PURE__ */ a("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ n(d, { variant: "ghost", size: "icon-sm", "aria-label": "Previous week", onClick: () => p((e) => e - 1), children: /* @__PURE__ */ n(A, {}) }),
      /* @__PURE__ */ n("span", { className: "min-w-36 text-center text-sm font-semibold text-ink-strong", children: P(x) }),
      /* @__PURE__ */ n(d, { variant: "ghost", size: "icon-sm", "aria-label": "Next week", onClick: () => p((e) => e + 1), children: /* @__PURE__ */ n(D, {}) }),
      /* @__PURE__ */ n(d, { variant: "outline", size: "sm", disabled: b === 0, onClick: () => p(0), children: "Today" }),
      T && /* @__PURE__ */ a(d, { variant: "outline", size: "sm", className: "ml-auto", onClick: z, children: [
        /* @__PURE__ */ n(I, {}),
        "Add dated entry"
      ] })
    ] }),
    /* @__PURE__ */ a("div", { className: "grid grid-cols-[2.5rem_repeat(7,minmax(0,1fr))] overflow-hidden rounded-lg border border-line", children: [
      /* @__PURE__ */ n("span", { className: "border-b border-line" }),
      u.map((e, r) => {
        const t = e.date === i.date, o = e.closed ? m[e.closed.kind].label : e.items.length ? m[e.items[0].kind].label : "";
        return /* @__PURE__ */ a(
          "div",
          {
            className: c("grid min-w-0 gap-0.5 border-b border-l border-line px-2 py-1.5", t && "bg-accent/8"),
            children: [
              /* @__PURE__ */ n("span", { className: c("truncate text-xs font-semibold", t ? "text-accent" : "text-ink"), children: R(e.date, r === 0) }),
              /* @__PURE__ */ n("span", { className: "truncate text-caption text-ink-muted", title: o, children: o || " " })
            ]
          },
          e.date
        );
      }),
      /* @__PURE__ */ n("div", { className: "relative h-120", children: C.map(
        (e) => e ? /* @__PURE__ */ n(
          "span",
          {
            className: "absolute right-1.5 -translate-y-1/2 font-mono text-caption text-ink-faint",
            style: { top: l(e * 60) },
            children: String(e).padStart(2, "0")
          },
          e
        ) : null
      ) }),
      u.map((e) => {
        const r = e.date === i.date;
        return /* @__PURE__ */ a(
          "div",
          {
            "data-testid": `cal-${e.date}`,
            className: c("relative h-120 border-l border-line", r && "bg-accent/3"),
            style: e.closed ? y : void 0,
            children: [
              C.map((t) => /* @__PURE__ */ n("span", { className: "absolute inset-x-0 h-px bg-line/60", style: { top: l(t * 60) } }, t)),
              e.spans.map((t) => {
                var f, g, N;
                const o = H(O(s, t.name)), h = r && t.start <= i.minute && i.minute <= t.end, S = ((f = t.item) == null ? void 0 : f.label) || t.name;
                return /* @__PURE__ */ a(
                  "div",
                  {
                    "data-running": h || void 0,
                    title: `${t.item ? `${t.item.label} · ` : ""}${U(s, t.name)} · ${w(t.start)} until ${v(t.end)}`,
                    className: c(
                      "absolute inset-x-1 min-h-3.5 overflow-hidden rounded-sm px-1.5 py-1 font-mono text-caption leading-tight",
                      o.bg,
                      o.text,
                      ((g = t.item) == null ? void 0 : g.kind) === "extra" && "border-[1.5px] border-dashed border-ink-strong",
                      ((N = t.item) == null ? void 0 : N.kind) === "changed" && "border-[1.5px] border-ink-strong/50",
                      h && "ring-2 ring-ink-strong ring-offset-2 ring-offset-surface-card"
                    ),
                    style: { top: l(t.start), height: l(t.end + 1 - t.start) },
                    children: [
                      /* @__PURE__ */ n("span", { className: "block truncate font-sans font-semibold", children: S }),
                      /* @__PURE__ */ a("span", { className: "block truncate", children: [
                        w(t.start),
                        "–",
                        v(t.end)
                      ] })
                    ]
                  },
                  t.start
                );
              }),
              e.closed && /* @__PURE__ */ a("span", { className: "absolute inset-x-1 top-2 flex items-center gap-1 truncate rounded-md border border-line-strong bg-surface-card px-1.5 py-0.5 text-caption text-ink-strong", children: [
                (() => {
                  const t = m[e.closed.kind].icon;
                  return /* @__PURE__ */ n(t, { className: "size-3 flex-none" });
                })(),
                e.closed.label || m[e.closed.kind].label
              ] }),
              r && /* @__PURE__ */ n(
                "span",
                {
                  "aria-label": "Now",
                  className: "absolute inset-x-0 z-10 h-0.5 bg-destructive",
                  style: { top: l(i.minute) },
                  children: /* @__PURE__ */ n("span", { className: "absolute -left-1 -top-1 size-2 rounded-full bg-destructive" })
                }
              )
            ]
          },
          e.date
        );
      })
    ] }),
    /* @__PURE__ */ a("div", { className: "flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-caption text-ink-muted", children: [
      s.names.slice(1).map((e, r) => /* @__PURE__ */ a("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ n(B, { index: r + 1 }),
        e.name
      ] }, e.name)),
      /* @__PURE__ */ a("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ n("span", { "aria-hidden": !0, className: "size-2.5 rounded-xs border border-dashed border-ink-strong" }),
        "Extra hours"
      ] }),
      /* @__PURE__ */ a("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ n("span", { "aria-hidden": !0, className: "size-2.5 rounded-xs border border-line-strong", style: y }),
        "Closed or holiday"
      ] }),
      /* @__PURE__ */ a("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ n("span", { "aria-hidden": !0, className: "h-2.5 w-0.5 bg-destructive" }),
        "Now"
      ] })
    ] })
  ] });
}
export {
  ee as CalendarTab
};
