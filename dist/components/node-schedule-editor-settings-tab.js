import { jsxs as n, jsx as a } from "react/jsx-runtime";
import { Trash2 as b } from "lucide-react";
import { Button as g } from "./button.js";
import { cn as x } from "../lib/cn.js";
import { Input as u } from "./input.js";
import { Select as f } from "./select.js";
import { Switch as c } from "./switch.js";
import { Textarea as v } from "./textarea.js";
import { setNameValue as N } from "../lib/schedule/editNodeSchedule.js";
import { SCHEDULE_COLOURS as k } from "../lib/schedule/scheduleColour.js";
import { nameValue as w } from "./node-schedule-editor-words.js";
function C(t) {
  var r;
  const l = ((r = Intl.supportedValuesOf) == null ? void 0 : r.call(Intl, "timeZone")) ?? [];
  return [...new Set([t, "UTC", ...l].filter(Boolean))];
}
function U({ doc: t, canEdit: l, onChange: r, onDelete: p }) {
  const s = !l, i = (e) => r({ ...t, ...e }), d = (e, h) => e === "" || !Number.isFinite(Number(e)) ? h : Number(e), m = s || !t.output.used;
  return /* @__PURE__ */ n("section", { className: "grid max-w-2xl gap-5", children: [
    /* @__PURE__ */ n("div", { className: "grid gap-4", children: [
      /* @__PURE__ */ a(o, { label: "Name", children: /* @__PURE__ */ a(u, { "aria-label": "Name", value: t.name, disabled: s, onChange: (e) => i({ name: e.target.value }) }) }),
      /* @__PURE__ */ a(o, { label: "Description", children: /* @__PURE__ */ a(
        v,
        {
          "aria-label": "Description",
          rows: 2,
          value: t.description,
          disabled: s,
          onChange: (e) => i({ description: e.target.value })
        }
      ) }),
      /* @__PURE__ */ a(
        o,
        {
          label: "Colour",
          hint: "Marks this schedule in lists, pickers and legends. Names keep their own colours, set under Weekly hours → Names.",
          children: /* @__PURE__ */ a("div", { className: "flex flex-wrap gap-2", children: k.map((e) => /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              "aria-label": `Colour ${e.label}`,
              "aria-pressed": t.color === e.value,
              disabled: s,
              className: x(
                "size-6 rounded-full border-2 border-surface-card ring-2",
                e.bg,
                t.color === e.value ? "ring-ink-strong" : "ring-transparent"
              ),
              onClick: () => i({ color: e.value })
            },
            e.value
          )) })
        }
      ),
      /* @__PURE__ */ a(
        o,
        {
          label: "Time zone",
          hint: "Every time in this schedule is in this zone, on every box and dashboard, wherever the viewer is.",
          children: /* @__PURE__ */ a(
            f,
            {
              "aria-label": "Time zone",
              value: t.timezone,
              disabled: s,
              onChange: (e) => i({ timezone: e.target.value }),
              children: C(t.timezone).map((e) => /* @__PURE__ */ a("option", { value: e, children: e.replace(/_/g, " ") }, e))
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ n("div", { className: "flex items-start gap-4 border-t border-line pt-4", children: [
      /* @__PURE__ */ n("div", { className: "grid flex-1 gap-1", children: [
        /* @__PURE__ */ a("span", { className: "text-sm font-semibold text-ink-strong", children: "Schedule on" }),
        /* @__PURE__ */ n("span", { className: "text-xs text-ink-muted", children: [
          "Switching it off affects dashboards and flows only: they read ",
          w(t.names[0]),
          " until it's back on. Boxes keep running the hours they already have."
        ] })
      ] }),
      /* @__PURE__ */ a(
        c,
        {
          "aria-label": "Schedule on",
          checked: t.enabled,
          disabled: s,
          onCheckedChange: (e) => i({ enabled: e })
        }
      )
    ] }),
    /* @__PURE__ */ n("div", { className: "grid gap-3 border-t border-line pt-4", children: [
      /* @__PURE__ */ n("div", { className: "grid gap-1", children: [
        /* @__PURE__ */ a("span", { className: "text-sm font-semibold text-ink-strong", children: "Box output" }),
        /* @__PURE__ */ a("span", { className: "text-xs text-ink-muted", children: "What boxes running this schedule write to their output." })
      ] }),
      /* @__PURE__ */ n("label", { className: "flex items-center justify-between gap-3 text-xs text-ink", children: [
        "Output used",
        /* @__PURE__ */ a(
          c,
          {
            "aria-label": "Output used",
            checked: t.output.used,
            disabled: s,
            onCheckedChange: (e) => i({ output: { ...t.output, used: e } })
          }
        )
      ] }),
      /* @__PURE__ */ n("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ a(o, { label: "Min", children: /* @__PURE__ */ a(
          u,
          {
            type: "number",
            "aria-label": "Min",
            value: t.output.min,
            disabled: m,
            onChange: (e) => i({ output: { ...t.output, min: d(e.target.value, t.output.min) } })
          }
        ) }),
        /* @__PURE__ */ a(o, { label: "Max", children: /* @__PURE__ */ a(
          u,
          {
            type: "number",
            "aria-label": "Max",
            value: t.output.max,
            disabled: m,
            onChange: (e) => i({ output: { ...t.output, max: d(e.target.value, t.output.max) } })
          }
        ) }),
        /* @__PURE__ */ a(o, { label: "Default value", children: /* @__PURE__ */ a(
          u,
          {
            type: "number",
            "aria-label": "Default value",
            value: t.names[0].value,
            disabled: m,
            onChange: (e) => r(N(t, 0, d(e.target.value, t.names[0].value)))
          }
        ) })
      ] }),
      /* @__PURE__ */ a("span", { className: "text-caption text-ink-faint", children: "Default value is written when nothing runs. Every name's value must sit between min and max." })
    ] }),
    /* @__PURE__ */ n("div", { className: "grid gap-1 border-t border-line pt-4", children: [
      /* @__PURE__ */ a("span", { className: "text-xs font-medium text-ink", children: "Id" }),
      /* @__PURE__ */ a("code", { className: "justify-self-start rounded-md bg-surface-inset px-2 py-1 font-mono text-xs text-ink-strong", children: t.id }),
      /* @__PURE__ */ a("span", { className: "text-caption text-ink-faint", children: "The permanent id dashboards, flows and boxes use. It never changes." })
    ] }),
    l && p && /* @__PURE__ */ a("div", { children: /* @__PURE__ */ n(g, { variant: "destructive", size: "sm", onClick: p, children: [
      /* @__PURE__ */ a(b, {}),
      "Delete schedule"
    ] }) })
  ] });
}
function o({ label: t, hint: l, children: r }) {
  return /* @__PURE__ */ n("div", { className: "grid gap-1.5", children: [
    /* @__PURE__ */ a("span", { className: "text-xs font-medium text-ink", children: t }),
    r,
    l && /* @__PURE__ */ a("span", { className: "text-caption text-ink-faint", children: l })
  ] });
}
export {
  U as SettingsTab
};
