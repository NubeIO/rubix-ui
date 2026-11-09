import { jsxs as n, jsx as e } from "react/jsx-runtime";
import { Trash2 as h, Plus as p } from "lucide-react";
import { Button as o } from "./button.js";
import { Input as d } from "./input.js";
import { renameName as f, setNameValue as v, removeName as N, addName as x } from "../lib/schedule/editNodeSchedule.js";
import { MAX_NAMES as g } from "../lib/schedule/nodeSchedule.js";
import { EditorSheet as b } from "./node-schedule-editor-sheet.js";
import { NameSwatch as k } from "./name-swatch.js";
function A({ open: c, doc: t, canEdit: m, onClose: u, onChange: i }) {
  return /* @__PURE__ */ n(
    b,
    {
      open: c,
      onClose: u,
      scheduleName: t.name,
      title: "Names and values",
      description: "Each name sends its value to the boxes and dashboards, and has its own colour by position: the same in every schedule, calendar and chart.",
      footer: /* @__PURE__ */ e(o, { variant: "ghost", size: "sm", onClick: u, children: "Done" }),
      children: [
        /* @__PURE__ */ n("div", { className: "grid grid-cols-[0.75rem_minmax(0,1fr)_5rem_4.5rem] items-center gap-2 text-caption text-ink-faint", children: [
          /* @__PURE__ */ e("span", {}),
          /* @__PURE__ */ e("span", { children: "Name" }),
          /* @__PURE__ */ e("span", { children: "Value" }),
          /* @__PURE__ */ e("span", {})
        ] }),
        t.names.map((s, a) => (
          // Keyed by name so a rename re-mounts the field with the committed text.
          /* @__PURE__ */ n("div", { className: "grid grid-cols-[0.75rem_minmax(0,1fr)_5rem_4.5rem] items-center gap-2", children: [
            /* @__PURE__ */ e(k, { index: a }),
            /* @__PURE__ */ e(
              d,
              {
                "aria-label": `Name ${a + 1}`,
                defaultValue: s.name,
                disabled: !m || a === 0,
                className: "h-8 text-xs",
                onBlur: (r) => {
                  const l = f(t, a, r.target.value);
                  l === t ? r.target.value = s.name : i(l);
                }
              }
            ),
            /* @__PURE__ */ e(
              d,
              {
                type: "number",
                "aria-label": `${s.name} value`,
                defaultValue: s.value,
                disabled: !m,
                className: "h-8 text-xs",
                onBlur: (r) => {
                  const l = Number(r.target.value);
                  r.target.value === "" || !Number.isFinite(l) ? r.target.value = String(s.value) : l !== s.value && i(v(t, a, l));
                }
              }
            ),
            a === 0 ? /* @__PURE__ */ e("span", { title: "Default: runs when nothing else does", className: "text-caption text-ink-muted", children: "Default" }) : m && a > 1 ? /* @__PURE__ */ e(
              o,
              {
                variant: "ghost",
                size: "icon-sm",
                "aria-label": `Remove ${s.name}`,
                onClick: () => i(N(t, a)),
                children: /* @__PURE__ */ e(h, {})
              }
            ) : /* @__PURE__ */ e("span", {})
          ] }, `${a}-${s.name}`)
        )),
        m && /* @__PURE__ */ n(
          o,
          {
            variant: "ghost",
            size: "sm",
            className: "justify-self-start",
            disabled: t.names.length >= g,
            onClick: () => i(x(t)),
            children: [
              /* @__PURE__ */ e(p, {}),
              "Add a name"
            ]
          }
        ),
        /* @__PURE__ */ e("p", { className: "text-caption text-ink-muted", children: "Up to six names, the default included. Colours go by position: blue, amber, teal, violet, pink. The default runs whenever nothing else does and has no colour. Removing a name clears its blocks to the default." })
      ]
    }
  );
}
export {
  A as NamesSheet
};
