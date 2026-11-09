import { jsx as e, jsxs as a } from "react/jsx-runtime";
import { FileX as d, Trash2 as c, RefreshCw as m } from "lucide-react";
import { Button as l } from "./button.js";
import { Skeleton as s } from "./skeleton.js";
function p() {
  return /* @__PURE__ */ a("div", { "aria-busy": "true", "aria-label": "Loading schedule", className: "grid gap-3 p-4", children: [
    /* @__PURE__ */ a("div", { className: "grid gap-2", children: [
      /* @__PURE__ */ e(s, { className: "h-6 w-48" }),
      /* @__PURE__ */ e(s, { className: "h-4 w-72" })
    ] }),
    /* @__PURE__ */ e(s, { className: "h-24 w-full" }),
    /* @__PURE__ */ e(s, { className: "h-8 w-96 max-w-full" }),
    Array.from({ length: 7 }, (i, t) => /* @__PURE__ */ e(s, { className: "h-7 w-full" }, t))
  ] });
}
function x({ id: i, canEdit: t, onRecreate: r, onDelete: n }) {
  return /* @__PURE__ */ e("div", { className: "grid place-items-center p-8", children: /* @__PURE__ */ a("div", { className: "grid max-w-md justify-items-center gap-2 text-center", children: [
    /* @__PURE__ */ e(d, { className: "size-8 text-ink-faint" }),
    /* @__PURE__ */ e("span", { className: "text-sm font-semibold text-ink-strong", children: "This schedule can't be read" }),
    /* @__PURE__ */ e("span", { className: "text-xs text-ink-muted", children: "It was saved in an older format that this editor doesn't understand, so its hours can't be shown or changed. Recreate it with the same name and id: dashboards and flows that use it keep working." }),
    /* @__PURE__ */ e("code", { className: "rounded-md bg-surface-inset px-2 py-1 font-mono text-xs text-ink-strong", children: i }),
    t && /* @__PURE__ */ a("div", { className: "mt-2 flex gap-2", children: [
      n && /* @__PURE__ */ a(l, { variant: "ghost", size: "sm", onClick: n, children: [
        /* @__PURE__ */ e(c, {}),
        "Delete"
      ] }),
      r && /* @__PURE__ */ a(l, { variant: "solid", size: "sm", onClick: r, children: [
        /* @__PURE__ */ e(m, {}),
        "Recreate schedule"
      ] })
    ] })
  ] }) });
}
export {
  p as EditorSkeleton,
  x as UnreadableState
};
