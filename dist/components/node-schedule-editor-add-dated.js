import { jsxs as i, jsx as a, Fragment as T } from "react/jsx-runtime";
import { useState as v, useEffect as w } from "react";
import { Button as p } from "./button.js";
import { Checkbox as D } from "./checkbox.js";
import { Input as c } from "./input.js";
import { Tabs as E, TabsList as F, TabsTrigger as K } from "./tabs.js";
import { parseHHMM as h } from "../lib/schedule/nodeSchedule.js";
import { nameValue as L } from "./node-schedule-editor-words.js";
import { EditorSheet as I } from "./node-schedule-editor-sheet.js";
import { KINDS as C } from "./node-schedule-editor-dated-kinds.js";
const R = [
  ["Closed all day", { kind: "closed", label: "Closed" }],
  ["Late start", { kind: "changed", label: "Late start", from: "10:00", until: "18:00" }],
  ["Close early", { kind: "changed", label: "Close early", from: "07:00", until: "15:00" }],
  ["Open late", { kind: "extra", label: "Open late", from: "18:00", until: "21:00" }],
  ["Staff training", { kind: "changed", label: "Staff training", from: "12:00", until: "18:00" }],
  ["Community event", { kind: "extra", label: "Community event", from: "18:00", until: "22:00" }],
  ["Storm closure", { kind: "closed", label: "Storm closure" }]
], z = ["extra", "changed", "closed", "holiday"];
function A(l, n = []) {
  if (!l.label.trim()) return "Give it a label people will recognise.";
  if (!l.date) return "Pick a date.";
  if (l.kind === "holiday" && n.some((d) => d.kind === "holiday" && d.date === l.date))
    return "That date already has a holiday in this schedule. Remove it first.";
  if (l.kind === "extra" || l.kind === "changed") {
    const d = h(l.from), o = h(l.until);
    if (d === null || o === null || o !== 0 && o <= d) return "Until must be after From.";
  } else if (l.to && l.to < l.date) return "To must be on or after the date.";
  return "";
}
let O = 0;
const P = () => `c${Date.now()}${String(++O % 1e4).padStart(4, "0")}`;
function q({ open: l, doc: n, today: d, onClose: o, onAdd: u }) {
  const g = () => ({
    kind: "closed",
    label: "",
    date: d,
    to: "",
    from: "09:00",
    until: "17:00",
    yearly: !1,
    pick: null
  }), [t, k] = v(g), [N, b] = v(!1);
  w(() => {
    l && (k(g()), b(!1));
  }, [l]);
  const r = (e) => k((s) => ({ ...s, ...e })), y = t.kind === "extra" || t.kind === "changed", f = A(t, n.dated), S = () => {
    if (f) return b(!0);
    const e = { id: P(), kind: t.kind, label: t.label.trim(), date: t.date }, s = h(t.from) ?? 0, x = (h(t.until) || 1440) - 1;
    t.kind === "extra" ? u({ ...e, start: s, end: x }) : t.kind === "changed" ? u({ ...e, hours: [{ start: s, end: x }] }) : u({
      ...e,
      ...t.kind === "closed" && t.to && t.to > t.date ? { to: t.to } : {},
      ...t.yearly ? { yearly: !0 } : {}
    }), o();
  };
  return /* @__PURE__ */ i(
    I,
    {
      open: l,
      onClose: o,
      scheduleName: n.name,
      title: "Add dated entry",
      description: "A date that differs from the week. After the date, the normal week carries on by itself.",
      footer: /* @__PURE__ */ i(T, { children: [
        /* @__PURE__ */ a(p, { variant: "ghost", size: "sm", onClick: o, children: "Cancel" }),
        /* @__PURE__ */ a(p, { variant: "solid", size: "sm", onClick: S, children: "Add" })
      ] }),
      children: [
        /* @__PURE__ */ i("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ a("span", { className: "text-caption text-ink-muted", children: "Quick picks" }),
          /* @__PURE__ */ a("div", { className: "flex flex-wrap gap-1.5", children: R.map(([e, s]) => /* @__PURE__ */ a(
            p,
            {
              variant: t.pick === e ? "solid" : "outline",
              size: "sm",
              onClick: () => r({ ...s, pick: e }),
              children: e
            },
            e
          )) })
        ] }),
        /* @__PURE__ */ i("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ a("span", { className: "text-caption text-ink-muted", children: "Kind" }),
          /* @__PURE__ */ a(E, { value: t.kind, onValueChange: (e) => r({ kind: e, pick: null }), className: "gap-0", children: /* @__PURE__ */ a(F, { "aria-label": "Kind of entry", children: z.map((e) => /* @__PURE__ */ a(K, { value: e, children: C[e].label }, e)) }) }),
          /* @__PURE__ */ a("span", { className: "text-caption text-ink-faint", children: C[t.kind].hint })
        ] }),
        /* @__PURE__ */ a(m, { label: "Label", children: /* @__PURE__ */ a(
          c,
          {
            "aria-label": "Label",
            value: t.label,
            placeholder: "e.g. Staff training",
            onChange: (e) => r({ label: e.target.value })
          }
        ) }),
        /* @__PURE__ */ i("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ a(m, { label: "Date", children: /* @__PURE__ */ a(c, { type: "date", "aria-label": "Date", value: t.date, onChange: (e) => r({ date: e.target.value }) }) }),
          t.kind === "closed" && /* @__PURE__ */ a(m, { label: "To (optional)", children: /* @__PURE__ */ a(c, { type: "date", "aria-label": "To", value: t.to, onChange: (e) => r({ to: e.target.value }) }) })
        ] }),
        y && /* @__PURE__ */ i("div", { className: "grid grid-cols-[6.5rem_6.5rem_minmax(0,1fr)] items-end gap-2", children: [
          /* @__PURE__ */ a(m, { label: "From", children: /* @__PURE__ */ a(c, { type: "time", "aria-label": "From", value: t.from, onChange: (e) => r({ from: e.target.value }) }) }),
          /* @__PURE__ */ a(m, { label: "Until", children: /* @__PURE__ */ a(c, { type: "time", "aria-label": "Until", value: t.until, onChange: (e) => r({ until: e.target.value }) }) }),
          /* @__PURE__ */ i("span", { className: "pb-2 text-caption text-ink-muted", children: [
            "Runs ",
            L(n.names[1] ?? n.names[0])
          ] })
        ] }),
        !y && /* @__PURE__ */ i("label", { className: "flex items-center gap-2 text-xs text-ink", children: [
          /* @__PURE__ */ a(D, { checked: t.yearly, onChange: (e) => r({ yearly: e.target.checked }) }),
          "Every year on this date"
        ] }),
        N && f && /* @__PURE__ */ a("span", { role: "alert", className: "text-xs text-destructive", children: f })
      ]
    }
  );
}
function m({ label: l, children: n }) {
  return /* @__PURE__ */ i("div", { className: "grid min-w-0 content-start gap-1", children: [
    /* @__PURE__ */ a("span", { className: "text-caption text-ink-muted", children: l }),
    n
  ] });
}
export {
  q as AddDatedSheet,
  A as entryProblem
};
