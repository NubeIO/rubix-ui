import { jsx as o } from "react/jsx-runtime";
import { cva as d } from "class-variance-authority";
import { cn as s } from "../lib/cn.js";
const c = d(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-accent text-accent-foreground",
        secondary: "border-border bg-bg text-muted",
        outline: "border-border bg-bg text-muted",
        destructive: "border-destructive/25 bg-destructive/10 text-destructive",
        // Semantic status tones (theme-appearance widened palette). `success`/`warning` are the
        // fixed semantic hues; `accent2` is the secondary accent — all follow the theme by token.
        success: "border-success/25 bg-success/10 text-success",
        warning: "border-warning/30 bg-warning/10 text-warning",
        info: "border-info/25 bg-info/10 text-info",
        accent2: "border-accent-2/25 bg-accent-2/10 text-accent-2"
      },
      // Square for a status in a row, pill for a fact in chrome (a count, a scope).
      pill: { true: "rounded-full", false: "" },
      // `count` is the number beside a nav row or a lane tab: a 16px mono pill, always neutral.
      size: {
        default: "",
        count: "h-4 rounded-full border-transparent bg-border/60 px-1.5 py-0 font-mono text-micro font-normal leading-4 text-muted tabular-nums"
      }
    },
    defaultVariants: {
      variant: "default",
      pill: !1,
      size: "default"
    }
  }
);
function l({
  className: e,
  variant: t,
  pill: r,
  size: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "badge",
      className: s(c({ variant: t, pill: r, size: n }), e),
      ...a
    }
  );
}
export {
  l as Badge,
  c as badgeVariants
};
