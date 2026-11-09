import { jsxs as n, jsx as a } from "react/jsx-runtime";
import { useState as m } from "react";
import { Pencil as O, Copy as V } from "lucide-react";
import { Button as y } from "./button.js";
import { Tabs as v, TabsList as k, TabsTrigger as d } from "./tabs.js";
import { sameAsMonday as $, paintWeek as j, copyDay as z, setDay as L } from "../lib/schedule/editNodeSchedule.js";
import { MAX_NAMES as W } from "../lib/schedule/nodeSchedule.js";
import { nameValue as u } from "./node-schedule-editor-words.js";
import { NameSwatch as p } from "./name-swatch.js";
import { DaySheet as F } from "./node-schedule-editor-day-sheet.js";
import { NamesSheet as G } from "./node-schedule-editor-names-sheet.js";
import { PaintGrid as H } from "./node-schedule-editor-paint-grid.js";
const R = [
  [1, "1 min"],
  [5, "5 min"],
  [15, "15 min"],
  [30, "30 min"],
  [60, "1 h"]
], c = "\0clear";
function ae({ doc: s, canEdit: l, namesFixed: b = !1, changed: S, today: w, onChange: i }) {
  var f, g;
  const [o, C] = m(((f = s.names[1]) == null ? void 0 : f.name) ?? c), [r, P] = m(15), [D, x] = m(null), [T, N] = m(!1), A = s.names.some((e, t) => t > 0 && e.name === o), h = o === c ? null : A ? o : ((g = s.names[1]) == null ? void 0 : g.name) ?? null, M = s.week.every((e) => e.length === 0);
  return /* @__PURE__ */ n("section", { className: "grid gap-3", children: [
    l && /* @__PURE__ */ n("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-2", children: [
      /* @__PURE__ */ n("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ a("span", { className: "text-xs text-ink-muted", children: "Brush" }),
        /* @__PURE__ */ a(v, { value: h ?? c, onValueChange: C, className: "gap-0", children: /* @__PURE__ */ n(k, { "aria-label": "Brush", children: [
          s.names.slice(1).map((e, t) => /* @__PURE__ */ n(d, { value: e.name, title: `Paint ${u(e)}`, className: "gap-1.5", children: [
            /* @__PURE__ */ a(p, { index: t + 1 }),
            e.name,
            /* @__PURE__ */ a("span", { className: "text-ink-faint", children: e.value })
          ] }, e.name)),
          /* @__PURE__ */ n(d, { value: c, title: `Paint the default, ${u(s.names[0])}`, className: "gap-1.5", children: [
            /* @__PURE__ */ a(p, { index: 0, className: "bg-transparent" }),
            "Clear"
          ] })
        ] }) }),
        !b && /* @__PURE__ */ n(y, { variant: "ghost", size: "sm", onClick: () => N(!0), children: [
          /* @__PURE__ */ a(O, {}),
          "Names ",
          s.names.length,
          "/",
          W
        ] })
      ] }),
      /* @__PURE__ */ n("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ a("span", { className: "text-xs text-ink-muted", children: "Snap" }),
        /* @__PURE__ */ a(v, { value: String(r), onValueChange: (e) => P(Number(e)), className: "gap-0", children: /* @__PURE__ */ a(k, { "aria-label": "Snap", children: R.map(([e, t]) => /* @__PURE__ */ a(d, { value: String(e), children: t }, e)) }) })
      ] }),
      /* @__PURE__ */ n(y, { variant: "outline", size: "sm", className: "ml-auto", onClick: () => i($(s)), children: [
        /* @__PURE__ */ a(V, {}),
        "Make Tue–Fri the same as Monday"
      ] })
    ] }),
    /* @__PURE__ */ n("div", { className: "relative", children: [
      /* @__PURE__ */ a(
        H,
        {
          doc: s,
          snap: r,
          brush: h,
          canEdit: l,
          changed: S,
          today: w,
          onPaint: (e, t, B) => i(j(s, e, t, B, h)),
          onOpenDay: x
        }
      ),
      M && /* @__PURE__ */ a("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 top-6 ml-14 grid place-items-center", children: /* @__PURE__ */ n("div", { className: "grid gap-1 rounded-lg border border-line bg-surface-card px-4 py-3 text-center", children: [
        /* @__PURE__ */ a("span", { className: "text-sm font-semibold text-ink-strong", children: "No weekly hours yet" }),
        /* @__PURE__ */ n("span", { className: "text-xs text-ink-muted", children: [
          "Pick a name above and drag across the days. Until then it runs ",
          u(s.names[0]),
          " all week."
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ n("div", { className: "flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-caption text-ink-muted", children: [
      s.names.slice(1).map((e, t) => /* @__PURE__ */ n("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ a(p, { index: t + 1 }),
        /* @__PURE__ */ a("span", { className: "text-ink", children: e.name }),
        "= ",
        e.value
      ] }, e.name)),
      /* @__PURE__ */ n("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ a(p, { index: 0 }),
        /* @__PURE__ */ n("span", { className: "text-ink", children: [
          s.names[0].name,
          " (default)"
        ] }),
        "= ",
        s.names[0].value
      ] })
    ] }),
    l && /* @__PURE__ */ n("span", { className: "text-caption text-ink-faint", children: [
      "Drag to paint in ",
      r === 60 ? "1-hour" : `${r}-minute`,
      " steps; drag down to paint several days. Hover for exact times. Click a day's name to type exact minutes or copy that day to others."
    ] }),
    /* @__PURE__ */ a(
      F,
      {
        day: D,
        doc: s,
        canEdit: l,
        onClose: () => x(null),
        onChange: (e, t) => i(L(s, e, t)),
        onCopy: (e, t) => i(z(s, e, t))
      }
    ),
    /* @__PURE__ */ a(G, { open: T, doc: s, canEdit: l, onClose: () => N(!1), onChange: i })
  ] });
}
export {
  ae as WeekTab
};
