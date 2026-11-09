import { jsxs as m, jsx as n } from "react/jsx-runtime";
import { Power as g, X as N } from "lucide-react";
import { Badge as w } from "./badge.js";
import { Button as v } from "./button.js";
import { cn as x } from "../lib/cn.js";
import { nameIndex as u } from "../lib/schedule/nodeSchedule.js";
import { scheduleColourClass as b } from "../lib/schedule/scheduleColour.js";
import { nameValue as $, nowLabel as c, momentText as l } from "./node-schedule-editor-words.js";
import { NameSwatch as C } from "./name-swatch.js";
function H({ doc: e, fallback: t, state: i, title: r, subtitle: a, onClose: s }) {
  const h = r ?? (e == null ? void 0 : e.name) ?? (t == null ? void 0 : t.name) ?? "", p = a ?? (e ? `${e.id} · ${e.timezone || "UTC"} · ${e.names.length} names` : (t == null ? void 0 : t.id) ?? ""), f = !!e && !e.enabled;
  return /* @__PURE__ */ m("header", { className: "grid gap-3 border-b border-line px-4 pb-4 pt-4", children: [
    /* @__PURE__ */ m("div", { className: "flex items-start gap-2.5", children: [
      /* @__PURE__ */ n(
        "span",
        {
          "aria-hidden": !0,
          className: x("mt-1.5 size-2.5 flex-none rounded-full", b(e == null ? void 0 : e.color))
        }
      ),
      /* @__PURE__ */ m("div", { className: "grid min-w-0 flex-1 gap-0.5", children: [
        /* @__PURE__ */ m("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ n("h2", { className: "truncate text-xl font-semibold text-ink-strong", children: h }),
          f && /* @__PURE__ */ m(w, { variant: "outline", children: [
            /* @__PURE__ */ n(g, { className: "size-3" }),
            "Switched off"
          ] })
        ] }),
        /* @__PURE__ */ n("span", { className: "truncate text-xs text-ink-muted", children: p })
      ] }),
      s && /* @__PURE__ */ n(v, { variant: "ghost", size: "icon-sm", "aria-label": "Close", onClick: s, children: /* @__PURE__ */ n(N, {}) })
    ] }),
    /* @__PURE__ */ n(z, { doc: e, state: i })
  ] });
}
function z({ doc: e, state: t }) {
  if (!e || !t)
    return /* @__PURE__ */ n(
      d,
      {
        now: /* @__PURE__ */ n(o, { over: "Now", name: "Unknown", sub: "The saved hours can't be read" }),
        next: /* @__PURE__ */ n(o, { over: "Next change", name: "Unknown", sub: "Recreate the schedule to see it" })
      }
    );
  const i = t.at.date;
  if (!t.enabled)
    return /* @__PURE__ */ n(
      d,
      {
        now: /* @__PURE__ */ n(
          o,
          {
            over: c(t.at),
            name: "Switched off",
            value: `reads ${e.names[0].value}`,
            sub: `Dashboards and flows read ${$(e.names[0])}. Boxes keep running.`
          }
        ),
        next: /* @__PURE__ */ n(o, { over: "Next change", name: "None while off", sub: "Switch it on in Settings" })
      }
    );
  const { now: r, next: a } = t, s = r.until ? `until ${l(r.until, i)}` : "No change in the next week";
  return /* @__PURE__ */ n(
    d,
    {
      now: /* @__PURE__ */ n(
        o,
        {
          over: c(t.at),
          swatch: u(e, r.name),
          name: r.name,
          value: `= ${r.value}`,
          sub: r.closed ? `${s} · ${r.closed.label}` : s,
          large: !0
        }
      ),
      next: a ? /* @__PURE__ */ n(
        o,
        {
          over: "Next change",
          swatch: u(e, a.name),
          name: a.name,
          value: `= ${a.value}`,
          sub: `from ${l(a.from, i)}${a.until ? ` until ${l(a.until, i)}` : ""}`
        }
      ) : /* @__PURE__ */ n(o, { over: "Next change", name: "None", sub: "Nothing changes in the next week" })
    }
  );
}
function d({ now: e, next: t }) {
  return /* @__PURE__ */ m(
    "div",
    {
      "aria-label": "Now",
      className: "grid gap-4 rounded-lg border border-line bg-surface-card p-3.5 sm:grid-cols-2",
      children: [
        e,
        t
      ]
    }
  );
}
function o({ over: e, name: t, value: i, sub: r, swatch: a, large: s }) {
  return /* @__PURE__ */ m("div", { className: "grid min-w-0 content-start gap-1", children: [
    /* @__PURE__ */ n("span", { className: "text-caption font-semibold uppercase tracking-wide text-ink-faint", children: e }),
    /* @__PURE__ */ m("div", { className: "flex items-center gap-2", children: [
      a !== void 0 && /* @__PURE__ */ n(C, { index: a, className: s ? "size-3.5" : "size-3" }),
      /* @__PURE__ */ n("span", { className: x("truncate font-semibold text-ink-strong", s ? "text-xl" : "text-sm"), children: t }),
      i && /* @__PURE__ */ n("span", { className: "text-xs text-ink-muted", children: i })
    ] }),
    /* @__PURE__ */ n("span", { className: "text-xs text-ink-muted", children: r })
  ] });
}
export {
  H as EditorHeader
};
