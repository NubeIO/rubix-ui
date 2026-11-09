import { jsxs as s, jsx as a } from "react/jsx-runtime";
import { useState as m } from "react";
import { Pencil as B, Copy as O } from "lucide-react";
import { Button as y } from "./button.js";
import { Tabs as v, TabsList as k, TabsTrigger as d } from "./tabs.js";
import { sameAsMonday as V, paintWeek as $, copyDay as j, setDay as z } from "../lib/schedule/editNodeSchedule.js";
import { MAX_NAMES as L } from "../lib/schedule/nodeSchedule.js";
import { nameValue as u } from "./node-schedule-editor-words.js";
import { NameSwatch as p } from "./name-swatch.js";
import { DaySheet as W } from "./node-schedule-editor-day-sheet.js";
import { NamesSheet as F } from "./node-schedule-editor-names-sheet.js";
import { PaintGrid as G } from "./node-schedule-editor-paint-grid.js";
const H = [
  [1, "1 min"],
  [5, "5 min"],
  [15, "15 min"],
  [30, "30 min"],
  [60, "1 h"]
], c = "\0clear";
function ee({ doc: n, canEdit: i, changed: b, today: S, onChange: l }) {
  var f, g;
  const [o, w] = m(((f = n.names[1]) == null ? void 0 : f.name) ?? c), [r, C] = m(15), [P, x] = m(null), [D, N] = m(!1), T = n.names.some((e, t) => t > 0 && e.name === o), h = o === c ? null : T ? o : ((g = n.names[1]) == null ? void 0 : g.name) ?? null, A = n.week.every((e) => e.length === 0);
  return /* @__PURE__ */ s("section", { className: "grid gap-3", children: [
    i && /* @__PURE__ */ s("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-2", children: [
      /* @__PURE__ */ s("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ a("span", { className: "text-xs text-ink-muted", children: "Brush" }),
        /* @__PURE__ */ a(v, { value: h ?? c, onValueChange: w, className: "gap-0", children: /* @__PURE__ */ s(k, { "aria-label": "Brush", children: [
          n.names.slice(1).map((e, t) => /* @__PURE__ */ s(d, { value: e.name, title: `Paint ${u(e)}`, className: "gap-1.5", children: [
            /* @__PURE__ */ a(p, { index: t + 1 }),
            e.name,
            /* @__PURE__ */ a("span", { className: "text-ink-faint", children: e.value })
          ] }, e.name)),
          /* @__PURE__ */ s(d, { value: c, title: `Paint the default, ${u(n.names[0])}`, className: "gap-1.5", children: [
            /* @__PURE__ */ a(p, { index: 0, className: "bg-transparent" }),
            "Clear"
          ] })
        ] }) }),
        /* @__PURE__ */ s(y, { variant: "ghost", size: "sm", onClick: () => N(!0), children: [
          /* @__PURE__ */ a(B, {}),
          "Names ",
          n.names.length,
          "/",
          L
        ] })
      ] }),
      /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ a("span", { className: "text-xs text-ink-muted", children: "Snap" }),
        /* @__PURE__ */ a(v, { value: String(r), onValueChange: (e) => C(Number(e)), className: "gap-0", children: /* @__PURE__ */ a(k, { "aria-label": "Snap", children: H.map(([e, t]) => /* @__PURE__ */ a(d, { value: String(e), children: t }, e)) }) })
      ] }),
      /* @__PURE__ */ s(y, { variant: "outline", size: "sm", className: "ml-auto", onClick: () => l(V(n)), children: [
        /* @__PURE__ */ a(O, {}),
        "Make Tue–Fri the same as Monday"
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: "relative", children: [
      /* @__PURE__ */ a(
        G,
        {
          doc: n,
          snap: r,
          brush: h,
          canEdit: i,
          changed: b,
          today: S,
          onPaint: (e, t, M) => l($(n, e, t, M, h)),
          onOpenDay: x
        }
      ),
      A && /* @__PURE__ */ a("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 top-6 ml-14 grid place-items-center", children: /* @__PURE__ */ s("div", { className: "grid gap-1 rounded-lg border border-line bg-surface-card px-4 py-3 text-center", children: [
        /* @__PURE__ */ a("span", { className: "text-sm font-semibold text-ink-strong", children: "No weekly hours yet" }),
        /* @__PURE__ */ s("span", { className: "text-xs text-ink-muted", children: [
          "Pick a name above and drag across the days. Until then it runs ",
          u(n.names[0]),
          " all week."
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ s("div", { className: "flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-caption text-ink-muted", children: [
      n.names.slice(1).map((e, t) => /* @__PURE__ */ s("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ a(p, { index: t + 1 }),
        /* @__PURE__ */ a("span", { className: "text-ink", children: e.name }),
        "= ",
        e.value
      ] }, e.name)),
      /* @__PURE__ */ s("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ a(p, { index: 0 }),
        /* @__PURE__ */ s("span", { className: "text-ink", children: [
          n.names[0].name,
          " (default)"
        ] }),
        "= ",
        n.names[0].value
      ] })
    ] }),
    i && /* @__PURE__ */ s("span", { className: "text-caption text-ink-faint", children: [
      "Drag to paint in ",
      r === 60 ? "1-hour" : `${r}-minute`,
      " steps; drag down to paint several days. Hover for exact times. Click a day's name to type exact minutes or copy that day to others."
    ] }),
    /* @__PURE__ */ a(
      W,
      {
        day: P,
        doc: n,
        canEdit: i,
        onClose: () => x(null),
        onChange: (e, t) => l(z(n, e, t)),
        onCopy: (e, t) => l(j(n, e, t))
      }
    ),
    /* @__PURE__ */ a(F, { open: D, doc: n, canEdit: i, onClose: () => N(!1), onChange: l })
  ] });
}
export {
  ee as WeekTab
};
