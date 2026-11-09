import { jsxs as i, jsx as c } from "react/jsx-runtime";
import { Flag as d, Ban as m, Clock as p, Plus as x } from "lucide-react";
import { cn as t } from "../lib/cn.js";
import { nameColour as b } from "../lib/colour/nameColour.js";
const a = {
  extra: { label: "Extra hours", icon: x },
  changed: { label: "Changed hours", icon: p },
  closed: { label: "Closed", icon: m },
  holiday: { label: "Holiday", icon: d }
}, y = (e) => e.label || a[e.kind].label, g = {
  backgroundImage: "repeating-linear-gradient(135deg, hsl(var(--ink-muted) / 0.3) 0 3px, transparent 3px 7px)"
};
function H({ kind: e, nameIndex: l }) {
  const n = a[e], s = n.icon, r = e === "closed" || e === "holiday", o = b(l);
  return /* @__PURE__ */ i(
    "span",
    {
      className: t(
        "inline-flex h-6 items-center gap-1 whitespace-nowrap rounded-md border px-2 text-caption font-medium",
        r ? "border-line-strong text-ink-strong" : t(o.bg, o.text),
        e === "extra" && "border-dashed border-ink-strong",
        e === "changed" && o.border
      ),
      style: r ? g : void 0,
      children: [
        /* @__PURE__ */ c(s, { className: "size-3" }),
        n.label
      ]
    }
  );
}
export {
  g as HATCH,
  a as KINDS,
  H as KindChip,
  y as noteText
};
