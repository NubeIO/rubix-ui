import { jsx as r } from "react/jsx-runtime";
import { cva as i } from "class-variance-authority";
import { cn as s } from "../lib/cn.js";
const n = i(
  "relative flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-sm [&>svg]:mt-0.5 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-border bg-card/60 text-fg [&>svg]:text-muted",
        destructive: "border-destructive/25 bg-destructive/10 text-destructive [&>svg]:text-destructive",
        // A message, not an error: a tinted card in the tone's hue with the text in the normal ink, so a
        // line of actions beside it still reads as the page's own controls.
        info: "border-info/30 bg-info/10 text-fg [&>svg]:text-info",
        success: "border-success/30 bg-success/10 text-fg [&>svg]:text-success",
        warning: "border-warning/50 bg-warning/10 text-fg [&>svg]:text-warning"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function g({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      role: "alert",
      "data-slot": "alert",
      className: s(n({ variant: e }), t),
      ...a
    }
  );
}
function c({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "alert-title",
      className: s("font-medium leading-relaxed tracking-tight", t),
      ...e
    }
  );
}
function u({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "alert-description",
      className: s("text-sm leading-relaxed [&_p]:leading-relaxed", t),
      ...e
    }
  );
}
export {
  g as Alert,
  u as AlertDescription,
  c as AlertTitle,
  n as alertVariants
};
