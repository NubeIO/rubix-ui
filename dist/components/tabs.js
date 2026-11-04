import { jsx as n } from "react/jsx-runtime";
import * as l from "react";
import { cn as c } from "../lib/cn.js";
import { useReveal as u } from "../lib/motion.js";
const b = l.createContext(null);
function d(e) {
  const t = l.useContext(b);
  if (!t) throw new Error(`<${e}> must be used inside <Tabs>`);
  return t;
}
function g({ value: e, onValueChange: t, className: o, ...r }) {
  const a = l.useId(), s = l.useMemo(
    () => ({ value: e, setValue: t, baseId: a }),
    [e, t, a]
  );
  return /* @__PURE__ */ n(b.Provider, { value: s, children: /* @__PURE__ */ n("div", { "data-slot": "tabs", className: c("flex flex-col gap-3", o), ...r }) });
}
function p({ className: e, ...t }) {
  return /* @__PURE__ */ n(
    "div",
    {
      role: "tablist",
      "data-slot": "tabs-list",
      className: c(
        // Track + active-pill colors come from the `--tab-*` vars (globals.css) so the look's
        // `data-buttons` axis can swap the house tint for stock shadcn's flat pill on a muted track.
        "flex flex-wrap items-center gap-1 rounded-lg border border-border bg-(--tab-track) p-1",
        e
      ),
      ...t
    }
  );
}
function v({ value: e, className: t, ...o }) {
  const { value: r, setValue: a, baseId: s } = d("TabsTrigger"), i = r === e;
  return /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "tab",
      id: `${s}-tab-${e}`,
      "aria-selected": i,
      "aria-controls": `${s}-panel-${e}`,
      "data-slot": "tabs-trigger",
      tabIndex: i ? 0 : -1,
      onClick: () => a(e),
      className: c(
        "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:pointer-events-none disabled:opacity-50",
        i ? "bg-(--tab-active-bg) text-(--tab-active-fg) shadow-(--tab-active-shadow)" : "text-muted hover:bg-bg hover:text-fg",
        t
      ),
      ...o
    }
  );
}
function T({ value: e, className: t, children: o, ...r }) {
  const { value: a, baseId: s } = d("TabsContent"), i = u();
  return a !== e ? null : /* @__PURE__ */ n(
    "div",
    {
      role: "tabpanel",
      id: `${s}-panel-${e}`,
      "aria-labelledby": `${s}-tab-${e}`,
      "data-slot": "tabs-content",
      className: c("flex min-h-0 flex-col focus-visible:outline-none", t),
      tabIndex: 0,
      ...r,
      children: /* @__PURE__ */ n(i, { className: "flex min-h-0 flex-1 flex-col", children: o }, e)
    }
  );
}
export {
  g as Tabs,
  T as TabsContent,
  p as TabsList,
  v as TabsTrigger
};
