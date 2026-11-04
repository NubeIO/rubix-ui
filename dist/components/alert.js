import { jsx as r } from "react/jsx-runtime";
import { cva as s } from "class-variance-authority";
import { cn as a } from "../lib/cn.js";
const l = s(
  "relative flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-sm [&>svg]:mt-0.5 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-border bg-card/60 text-fg [&>svg]:text-muted",
        destructive: "border-destructive/25 bg-destructive/10 text-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function v({
  className: t,
  variant: e,
  ...i
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      role: "alert",
      "data-slot": "alert",
      className: a(l({ variant: e }), t),
      ...i
    }
  );
}
function c({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "alert-title",
      className: a("font-medium leading-relaxed tracking-tight", t),
      ...e
    }
  );
}
function u({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "alert-description",
      className: a("text-sm leading-relaxed [&_p]:leading-relaxed", t),
      ...e
    }
  );
}
export {
  v as Alert,
  u as AlertDescription,
  c as AlertTitle,
  l as alertVariants
};
