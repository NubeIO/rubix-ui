import { jsx as s } from "react/jsx-runtime";
import * as a from "react";
import { Slot as b } from "@radix-ui/react-slot";
import { cva as c } from "class-variance-authority";
import { cn as d } from "../lib/cn.js";
const v = c(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // The default chrome reads the `--btn-*` vars (globals.css) so a look can swap the house
        // tinted wash for stock shadcn's solid primary via `data-buttons` — no variant branch here.
        default: "border border-(--btn-border) bg-(--btn-bg) text-(--btn-fg) hover:bg-(--btn-bg-hover) active:bg-(--btn-bg-active)",
        solid: "bg-accent text-bg hover:bg-accent/90",
        outline: "border border-border bg-bg text-fg hover:bg-panel",
        ghost: "hover:bg-(--hover-wash) hover:text-fg",
        destructive: "border border-destructive/25 bg-destructive/10 text-destructive hover:bg-destructive/15 active:bg-destructive/20"
      },
      size: {
        default: "h-9 px-3 py-2",
        sm: "h-8 gap-1.5 px-3 text-xs",
        lg: "h-10 px-4",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), h = a.forwardRef(function({ className: e, variant: r, size: t, asChild: o = !1, ...n }, i) {
  return /* @__PURE__ */ s(
    o ? b : "button",
    {
      ref: i,
      "data-btn": t ?? "default",
      className: d(v({ variant: r, size: t, className: e })),
      ...n
    }
  );
});
export {
  h as Button,
  v as buttonVariants
};
