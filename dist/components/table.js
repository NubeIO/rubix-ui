import { jsx as a } from "react/jsx-runtime";
import { cn as r } from "../lib/cn.js";
function b({ className: t, ...e }) {
  return /* @__PURE__ */ a("div", { "data-slot": "table-container", className: "relative w-full overflow-x-auto", children: /* @__PURE__ */ a(
    "table",
    {
      "data-slot": "table",
      className: r("w-full caption-bottom border-collapse text-sm text-fg", t),
      ...e
    }
  ) });
}
function s({
  className: t,
  sticky: e,
  ...l
}) {
  return /* @__PURE__ */ a(
    "thead",
    {
      "data-slot": "table-header",
      className: r(
        "border-b border-border bg-card/40 [&_tr]:border-b",
        e && "sticky top-0 z-10 bg-panel shadow-[0_1px_0_hsl(var(--border))]",
        t
      ),
      ...l
    }
  );
}
function n({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "tbody",
    {
      "data-slot": "table-body",
      className: r("[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function c({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "tr",
    {
      "data-slot": "table-row",
      className: r(
        "border-b border-border transition-colors hover:bg-bg/60 data-[state=selected]:bg-accent/10",
        t
      ),
      ...e
    }
  );
}
function i({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "th",
    {
      "data-slot": "table-head",
      className: r(
        "h-9 px-3 text-left align-middle text-caption font-semibold uppercase tracking-[0.06em] text-muted",
        t
      ),
      ...e
    }
  );
}
function m({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "td",
    {
      "data-slot": "table-cell",
      className: r("px-3 py-2 align-middle text-xs text-fg", t),
      ...e
    }
  );
}
export {
  b as Table,
  n as TableBody,
  m as TableCell,
  i as TableHead,
  s as TableHeader,
  c as TableRow
};
