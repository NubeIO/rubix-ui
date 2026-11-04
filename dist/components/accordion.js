import { jsx as r, jsxs as x } from "react/jsx-runtime";
import * as c from "react";
import { ChevronDown as C } from "lucide-react";
import { cn as d } from "../lib/cn.js";
import { useCollapse as g } from "../lib/motion.js";
const f = c.createContext(null);
function w({ className: o, defaultValue: t, children: n, ...e }) {
  const [a, i] = c.useState(t ?? null), s = c.useCallback((u) => {
    i((p) => p === u ? null : u);
  }, []);
  return /* @__PURE__ */ r(f.Provider, { value: { openValue: a, toggle: s }, children: /* @__PURE__ */ r("div", { "data-slot": "accordion", className: o, ...e, children: n }) });
}
const l = c.createContext("");
function V({
  value: o,
  className: t,
  children: n,
  ...e
}) {
  return /* @__PURE__ */ r(l.Provider, { value: o, children: /* @__PURE__ */ r("div", { "data-slot": "accordion-item", className: t, ...e, children: n }) });
}
function m() {
  const o = c.useContext(f);
  if (!o) throw new Error("Accordion parts must be used within <Accordion>.");
  return o;
}
function j({ className: o, children: t, ...n }) {
  const { openValue: e, toggle: a } = m(), i = c.useContext(l), s = e === i;
  return /* @__PURE__ */ x(
    "button",
    {
      type: "button",
      "data-slot": "accordion-trigger",
      "aria-expanded": s,
      onClick: () => a(i),
      className: d(
        "flex w-full items-center justify-between gap-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25",
        o
      ),
      ...n,
      children: [
        t,
        /* @__PURE__ */ r(
          C,
          {
            "aria-hidden": !0,
            className: d("h-4 w-4 shrink-0 text-muted transition-transform", s && "rotate-180")
          }
        )
      ]
    }
  );
}
function k({ className: o, children: t, ...n }) {
  const { openValue: e } = m(), a = c.useContext(l), i = e === a, s = g();
  return /* @__PURE__ */ r(s, { open: i, children: /* @__PURE__ */ r("div", { "data-slot": "accordion-content", role: "region", className: o, ...n, children: t }) });
}
export {
  w as Accordion,
  k as AccordionContent,
  V as AccordionItem,
  j as AccordionTrigger
};
