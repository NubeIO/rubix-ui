import { jsxs as r, jsx as e, Fragment as s } from "react/jsx-runtime";
import * as u from "@radix-ui/react-popover";
import { CirclePlus as h, X as p } from "lucide-react";
import { cn as x } from "../lib/cn.js";
function C({
  chip: o,
  ariaLabel: t,
  open: a,
  listId: c,
  disabled: n,
  on: i,
  label: l,
  onClear: d,
  className: b,
  children: m
}) {
  return /* @__PURE__ */ r(
    "span",
    {
      "data-slot": "combobox-chip",
      className: x(
        "inline-flex h-8 items-center rounded-md border text-xs transition-colors",
        i ? "border-accent/45 bg-accent/10" : "border-dashed border-border bg-bg hover:bg-(--hover-wash)",
        b
      ),
      children: [
        /* @__PURE__ */ e(u.Trigger, { asChild: !0, children: /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            role: "combobox",
            "aria-haspopup": "listbox",
            "aria-expanded": a,
            "aria-controls": a ? c : void 0,
            "aria-label": t,
            disabled: n,
            "data-slot": "combobox-trigger",
            className: "inline-flex h-full items-center gap-1.5 rounded-md px-2.5 text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25 disabled:opacity-50",
            children: i ? /* @__PURE__ */ r(s, { children: [
              o,
              /* @__PURE__ */ r("span", { className: "max-w-[180px] truncate font-medium text-accent", children: [
                "· ",
                l
              ] })
            ] }) : /* @__PURE__ */ r(s, { children: [
              /* @__PURE__ */ e(h, { size: 14, className: "shrink-0 opacity-70", "aria-hidden": !0 }),
              o
            ] })
          }
        ) }),
        i && !n && // eslint-disable-next-line no-restricted-syntax -- a tiny inline affordance, not a Button
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            "aria-label": `clear ${t}`,
            className: "mr-1 grid size-5 place-items-center rounded-[4px] text-muted hover:bg-(--hover-wash) hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30",
            onClick: d,
            children: /* @__PURE__ */ e(p, { size: 12, "aria-hidden": !0 })
          }
        ),
        m
      ]
    }
  );
}
export {
  C as ComboboxChip
};
