import { jsxs as i, jsx as a } from "react/jsx-runtime";
import { Trash2 as p, Plus as f } from "lucide-react";
import { Button as u } from "./button.js";
import { Input as c } from "./input.js";
import { removeBlocker as v, renameName as x, setNameValue as N, removeName as b, addName as g } from "../lib/schedule/editNodeSchedule.js";
import { MAX_NAMES as k } from "../lib/schedule/nodeSchedule.js";
import { EditorSheet as _ } from "./node-schedule-editor-sheet.js";
import { NameSwatch as y } from "./name-swatch.js";
function D({ open: h, doc: s, canEdit: m, onClose: d, onChange: n }) {
  const o = s.names.map((t, e) => m && e > 1 ? v(s, e) : null);
  return /* @__PURE__ */ i(
    _,
    {
      open: h,
      onClose: d,
      scheduleName: s.name,
      title: "Names and values",
      description: "Each name sends its value to the boxes and dashboards, and has its own colour by position: the same in every schedule, calendar and chart.",
      footer: /* @__PURE__ */ a(u, { variant: "ghost", size: "sm", onClick: d, children: "Done" }),
      children: [
        /* @__PURE__ */ i("div", { className: "grid grid-cols-[0.75rem_minmax(0,1fr)_5rem_4.5rem] items-center gap-2 text-caption text-ink-faint", children: [
          /* @__PURE__ */ a("span", {}),
          /* @__PURE__ */ a("span", { children: "Name" }),
          /* @__PURE__ */ a("span", { children: "Value" }),
          /* @__PURE__ */ a("span", {})
        ] }),
        s.names.map((t, e) => (
          // Keyed by name so a rename re-mounts the field with the committed text.
          /* @__PURE__ */ i("div", { className: "grid grid-cols-[0.75rem_minmax(0,1fr)_5rem_4.5rem] items-center gap-2", children: [
            /* @__PURE__ */ a(y, { index: e }),
            /* @__PURE__ */ a(
              c,
              {
                "aria-label": `Name ${e + 1}`,
                defaultValue: t.name,
                disabled: !m || e === 0,
                className: "h-8 text-xs",
                onBlur: (l) => {
                  const r = x(s, e, l.target.value);
                  r === s ? l.target.value = t.name : n(r);
                }
              }
            ),
            /* @__PURE__ */ a(
              c,
              {
                type: "number",
                "aria-label": `${t.name} value`,
                defaultValue: t.value,
                disabled: !m,
                className: "h-8 text-xs",
                onBlur: (l) => {
                  const r = Number(l.target.value);
                  l.target.value === "" || !Number.isFinite(r) ? l.target.value = String(t.value) : r !== t.value && n(N(s, e, r));
                }
              }
            ),
            e === 0 ? /* @__PURE__ */ a("span", { title: "Default: runs when nothing else does", className: "text-caption text-ink-muted", children: "Default" }) : m && e > 1 ? /* @__PURE__ */ a(
              u,
              {
                variant: "ghost",
                size: "icon-sm",
                "aria-label": `Remove ${t.name}`,
                disabled: o[e] !== null,
                title: o[e] ?? void 0,
                onClick: () => n(b(s, e)),
                children: /* @__PURE__ */ a(p, {})
              }
            ) : /* @__PURE__ */ a("span", {})
          ] }, `${e}-${t.name}`)
        )),
        m && /* @__PURE__ */ i(
          u,
          {
            variant: "ghost",
            size: "sm",
            className: "justify-self-start",
            disabled: s.names.length >= k,
            onClick: () => n(g(s)),
            children: [
              /* @__PURE__ */ a(f, {}),
              "Add a name"
            ]
          }
        ),
        o.map(
          (t, e) => t ? /* @__PURE__ */ a("p", { className: "text-caption text-ink-muted", children: t }, s.names[e].name) : null
        ),
        /* @__PURE__ */ a("p", { className: "text-caption text-ink-muted", children: "Up to six names, the default included. Colours go by position: blue, amber, teal, violet, pink. The default runs whenever nothing else does and has no colour. Removing a name clears its blocks to the default." })
      ]
    }
  );
}
export {
  D as NamesSheet
};
