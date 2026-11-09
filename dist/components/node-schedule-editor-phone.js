import { jsxs as a, jsx as t } from "react/jsx-runtime";
import { useState as b } from "react";
import { ChevronLeft as y, ChevronRight as k } from "lucide-react";
import { Button as f } from "./button.js";
import { cn as x } from "../lib/cn.js";
import { nameColour as w } from "../lib/schedule/nameColour.js";
import { nameIndex as h, DAY_MINUTES as C } from "../lib/schedule/nodeSchedule.js";
import { addDays as u } from "../lib/date.js";
import { resolveDay as T } from "../lib/schedule/resolveDay.js";
import { HATCH as $ } from "./node-schedule-editor-dated-kinds.js";
import { mondayOf as O, momentText as g, weekText as S, untilText as j, columnText as z } from "./node-schedule-editor-words.js";
import { NameSwatch as A } from "./name-swatch.js";
import { hhmm as D } from "../lib/time.js";
const c = (s) => `${s / C * 100}%`;
function F({ doc: s, state: i }) {
  const [N, d] = b(0), p = u(O(i.at.date), N * 7), o = i.at.date, { now: r, next: l } = i;
  return /* @__PURE__ */ a("div", { className: "grid gap-3 p-4", children: [
    /* @__PURE__ */ a("div", { className: "grid gap-1 rounded-lg border border-line bg-surface-card p-3", children: [
      /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t(A, { index: h(s, r.name), className: "size-3" }),
        /* @__PURE__ */ t("span", { className: "text-base font-semibold text-ink-strong", children: i.enabled ? r.name : "Switched off" }),
        /* @__PURE__ */ a("span", { className: "text-xs text-ink-muted", children: [
          "= ",
          r.value
        ] })
      ] }),
      r.until && /* @__PURE__ */ a("span", { className: "text-xs text-ink-muted", children: [
        "until ",
        g(r.until, o)
      ] }),
      l && /* @__PURE__ */ a("span", { className: "text-xs text-ink-muted", children: [
        "Then ",
        l.name,
        " = ",
        l.value,
        " · from ",
        g(l.from, o)
      ] })
    ] }),
    /* @__PURE__ */ a("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ t(f, { variant: "ghost", size: "icon-sm", "aria-label": "Previous week", onClick: () => d((e) => e - 1), children: /* @__PURE__ */ t(y, {}) }),
      /* @__PURE__ */ t("span", { className: "flex-1 text-center text-xs font-semibold text-ink-strong", children: S(p) }),
      /* @__PURE__ */ t(f, { variant: "ghost", size: "icon-sm", "aria-label": "Next week", onClick: () => d((e) => e + 1), children: /* @__PURE__ */ t(k, {}) })
    ] }),
    Array.from({ length: 7 }, (e, m) => T(s, u(p, m))).map((e, m) => {
      const v = e.closed ? `${e.closed.label || "Closed"}: closed all day` : e.spans.length ? e.spans.map((n) => `${n.name} ${D(n.start)}–${j(n.end)}`).join(", ") : "Off all day";
      return /* @__PURE__ */ a("div", { className: "grid gap-1", children: [
        /* @__PURE__ */ a("div", { className: "flex items-baseline gap-2", children: [
          /* @__PURE__ */ t("span", { className: x("text-xs font-semibold", e.date === o ? "text-accent" : "text-ink"), children: z(e.date, m === 0) }),
          /* @__PURE__ */ t("span", { className: "truncate text-caption text-ink-muted", children: v })
        ] }),
        /* @__PURE__ */ a("div", { className: "relative h-2.5 overflow-hidden rounded-sm bg-surface-inset", style: e.closed ? $ : void 0, children: [
          e.spans.map((n) => /* @__PURE__ */ t(
            "span",
            {
              className: x("absolute inset-y-0", w(h(s, n.name)).bg),
              style: { left: c(n.start), width: c(n.end + 1 - n.start) }
            },
            n.start
          )),
          e.date === o && /* @__PURE__ */ t("span", { className: "absolute inset-y-0 w-0.5 bg-destructive", style: { left: c(i.at.minute) } })
        ] })
      ] }, e.date);
    }),
    /* @__PURE__ */ t("span", { className: "text-caption text-ink-faint", children: "View only on a phone. Open on a larger screen to edit." })
  ] });
}
export {
  F as PhoneView
};
