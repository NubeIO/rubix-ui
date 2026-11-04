import { jsx as t, jsxs as s } from "react/jsx-runtime";
import { Slot as i } from "@radix-ui/react-slot";
import { MoreHorizontal as o, ChevronRight as m } from "lucide-react";
import { cn as a } from "../lib/cn.js";
function p({ ...e }) {
  return /* @__PURE__ */ t("nav", { "aria-label": "breadcrumb", "data-slot": "breadcrumb", ...e });
}
function f({ className: e, ...r }) {
  return /* @__PURE__ */ t(
    "ol",
    {
      "data-slot": "breadcrumb-list",
      className: a(
        "text-muted flex flex-wrap items-center gap-1.5 text-sm break-words",
        e
      ),
      ...r
    }
  );
}
function x({ className: e, ...r }) {
  return /* @__PURE__ */ t(
    "li",
    {
      "data-slot": "breadcrumb-item",
      className: a("inline-flex items-center gap-1.5", e),
      ...r
    }
  );
}
function N({
  asChild: e,
  className: r,
  ...n
}) {
  return /* @__PURE__ */ t(
    e ? i : "a",
    {
      "data-slot": "breadcrumb-link",
      className: a("hover:text-fg transition-colors", r),
      ...n
    }
  );
}
function g({ className: e, ...r }) {
  return /* @__PURE__ */ t(
    "span",
    {
      "data-slot": "breadcrumb-page",
      role: "link",
      "aria-current": "page",
      className: a("text-fg font-medium", e),
      ...r
    }
  );
}
function h({ children: e, className: r, ...n }) {
  return /* @__PURE__ */ t(
    "li",
    {
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      "aria-hidden": "true",
      className: a("text-muted inline-flex items-center", r),
      ...n,
      children: e ?? /* @__PURE__ */ t(m, { className: "size-3.5" })
    }
  );
}
function B({ className: e, ...r }) {
  return /* @__PURE__ */ s(
    "span",
    {
      "data-slot": "breadcrumb-ellipsis",
      role: "presentation",
      "aria-hidden": "true",
      className: a("text-muted flex size-9 items-center justify-center", e),
      ...r,
      children: [
        /* @__PURE__ */ t(o, { className: "size-4" }),
        /* @__PURE__ */ t("span", { className: "sr-only", children: "More" })
      ]
    }
  );
}
export {
  p as Breadcrumb,
  B as BreadcrumbEllipsis,
  x as BreadcrumbItem,
  N as BreadcrumbLink,
  f as BreadcrumbList,
  g as BreadcrumbPage,
  h as BreadcrumbSeparator
};
