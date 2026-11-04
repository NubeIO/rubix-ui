import { jsx as a } from "react/jsx-runtime";
import { cn as r } from "../lib/cn.js";
function n({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card",
      "data-panel": "",
      className: r("flex flex-col rounded-lg border border-border bg-card text-fg", t),
      ...e
    }
  );
}
function c({ className: t, ...e }) {
  return /* @__PURE__ */ a("div", { "data-slot": "card-header", className: r("flex flex-col gap-1 p-4", t), ...e });
}
function l({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-title",
      className: r("text-sm font-semibold leading-none", t),
      ...e
    }
  );
}
function s({ className: t, ...e }) {
  return /* @__PURE__ */ a("div", { "data-slot": "card-description", className: r("text-xs text-muted", t), ...e });
}
function i({ className: t, ...e }) {
  return /* @__PURE__ */ a("div", { "data-slot": "card-content", className: r("p-4 pt-0", t), ...e });
}
function f({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-footer",
      className: r("flex items-center p-4 pt-0", t),
      ...e
    }
  );
}
export {
  n as Card,
  i as CardContent,
  s as CardDescription,
  f as CardFooter,
  c as CardHeader,
  l as CardTitle
};
