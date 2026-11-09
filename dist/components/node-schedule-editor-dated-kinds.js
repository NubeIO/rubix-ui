import { jsxs as i, jsx as d } from "react/jsx-runtime";
import { Flag as h, Ban as c, Clock as p, Plus as m } from "lucide-react";
import { cn as r } from "../lib/cn.js";
import { nameColour as f } from "../lib/schedule/nameColour.js";
const g = {
  extra: {
    label: "Extra hours",
    filter: "Extra hours",
    icon: m,
    hint: "Open on this date at these hours, on top of the week (for example a late flight)."
  },
  changed: {
    label: "Changed hours",
    filter: "Changed",
    icon: p,
    hint: "Open only at these hours on this date; the week's hours for that day are replaced."
  },
  closed: {
    label: "Closed",
    filter: "Closed",
    icon: c,
    hint: "Closed all day. Wins over the week, extra hours and changed hours."
  },
  holiday: {
    label: "Holiday",
    filter: "Holidays",
    icon: h,
    hint: "A public holiday. Closed all day, like Closed, and listed as a holiday."
  }
}, u = {
  backgroundImage: "repeating-linear-gradient(135deg, hsl(var(--ink-muted) / 0.3) 0 3px, transparent 3px 7px)"
};
function k({ kind: e, nameIndex: n, className: l }) {
  const t = g[e], s = t.icon, a = e === "closed" || e === "holiday", o = f(n);
  return /* @__PURE__ */ i(
    "span",
    {
      className: r(
        "inline-flex h-6 items-center gap-1 whitespace-nowrap rounded-md border px-2 text-caption font-medium",
        a ? "border-line-strong text-ink-strong" : r(o.bg, o.text),
        e === "extra" && "border-dashed border-ink-strong",
        e === "changed" && o.border,
        l
      ),
      style: a ? u : void 0,
      children: [
        /* @__PURE__ */ d(s, { className: "size-3" }),
        t.label
      ]
    }
  );
}
export {
  u as HATCH,
  g as KINDS,
  k as KindChip
};
