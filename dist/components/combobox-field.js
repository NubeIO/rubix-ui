import { jsxs as r, jsx as t } from "react/jsx-runtime";
import * as u from "@radix-ui/react-popover";
import { ChevronDown as x, X as f } from "lucide-react";
import { cn as i } from "../lib/cn.js";
function w({
  ariaLabel: s,
  open: a,
  listId: n,
  disabled: c,
  size: o,
  current: e,
  label: d,
  showClear: l,
  onClear: b,
  className: m,
  children: p
}) {
  return /* @__PURE__ */ r("div", { className: i("relative", m), children: [
    /* @__PURE__ */ t(u.Trigger, { asChild: !0, children: /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        role: "combobox",
        "aria-haspopup": "listbox",
        "aria-expanded": a,
        "aria-controls": a ? n : void 0,
        "aria-label": s,
        disabled: c,
        "data-slot": "combobox-trigger",
        className: i(
          // `pr-[9px]` plus the 1px border puts the chevron 10px from the field's OUTER right edge at
          // both heights (Rubix Chart Shading sheet §10, the combobox rule).
          "flex w-full items-center justify-between gap-1 rounded-md border border-border bg-bg py-0 pr-[9px] pl-2.5 text-left text-fg transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60",
          o === "sm" ? "h-8 text-xs" : "h-9 text-sm"
        ),
        children: [
          /* @__PURE__ */ r(
            "span",
            {
              className: i(
                "flex min-w-0 items-center gap-1.5 truncate",
                !e && "text-muted",
                // Room for the clear button, which sits between the label and the chevron. Reserved on
                // the LABEL rather than as trigger padding, so the chevron stays at the right edge
                // whether or not there is a value to clear. The text stops 8px before the clear button's
                // hit area: that area starts 43px (sm) or 45px (md) from the outer edge and this box
                // ends 26px from it.
                l && (o === "sm" ? "pr-[25px]" : "pr-[27px]")
              ),
              children: [
                (e == null ? void 0 : e.swatch) && /* @__PURE__ */ t(
                  "span",
                  {
                    className: "inline-block h-3 w-3 shrink-0 rounded-full",
                    style: { background: e.swatch },
                    "aria-hidden": !0
                  }
                ),
                d
              ]
            }
          ),
          /* @__PURE__ */ t(x, { size: 12, strokeWidth: 3, className: "shrink-0 text-faint", "aria-hidden": !0 })
        ]
      }
    ) }),
    l && // A sibling (not nested, the trigger is a <button>), absolutely positioned over the label's
    // reserved right pad, LEFT of the chevron. From the field's outer right edge: the chevron is at
    // 10 to 22px, this 12px icon is 5px left of it at 27 to 39px, and the hit area is centred on the
    // icon: 20 by 20 at 32px tall, 24 by 24 at 36px (Rubix Chart Shading sheet §10). Clears to ""
    // (none) without opening the list.
    // eslint-disable-next-line no-restricted-syntax -- a tiny inline affordance, not a Button
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        "aria-label": `clear ${s}`,
        className: i(
          "absolute top-1/2 flex -translate-y-1/2 items-center justify-center rounded-[4px] text-faint hover:bg-[hsl(var(--fg)/0.06)] hover:text-fg-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30",
          o === "sm" ? "right-[23px] h-5 w-5" : "right-[21px] h-6 w-6"
        ),
        onClick: b,
        children: /* @__PURE__ */ t(f, { size: 12, "aria-hidden": !0 })
      }
    ),
    p
  ] });
}
export {
  w as ComboboxField
};
