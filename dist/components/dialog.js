import { jsx as o, jsxs as f } from "react/jsx-runtime";
import * as n from "react";
import * as a from "@radix-ui/react-dialog";
import { X as p } from "lucide-react";
import { cn as l } from "../lib/cn.js";
import { useOverlayContainer as D } from "../lib/overlay.js";
const u = n.createContext(null);
function N() {
  return n.useContext(u);
}
function R({ ...e }) {
  return /* @__PURE__ */ o(a.Root, { ...e });
}
function S({ ...e }) {
  return /* @__PURE__ */ o(a.Trigger, { ...e });
}
function v({
  container: e,
  ...t
}) {
  const r = D();
  return /* @__PURE__ */ o(a.Portal, { container: e ?? r, ...t });
}
function T({ ...e }) {
  return /* @__PURE__ */ o(a.Close, { ...e });
}
const y = n.forwardRef(function({ className: t, ...r }, i) {
  return /* @__PURE__ */ o(
    a.Overlay,
    {
      ref: i,
      className: l("fixed inset-0 z-50 bg-overlay/60 animate-in fade-in-0", t),
      ...r
    }
  );
}), O = n.forwardRef(function({ className: t, children: r, showClose: i = !0, ...m }, s) {
  const [g, d] = n.useState(null), x = n.useCallback(
    (c) => {
      d(c), typeof s == "function" ? s(c) : s && (s.current = c);
    },
    [s]
  );
  return /* @__PURE__ */ f(v, { children: [
    /* @__PURE__ */ o(y, {}),
    /* @__PURE__ */ f(
      a.Content,
      {
        ref: x,
        "data-panel": "",
        className: l(
          "fixed left-1/2 top-1/2 z-50 flex max-h-[85vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-y-auto rounded-lg border border-border bg-panel p-4 text-fg shadow-(--elev-dialog) duration-200 animate-in fade-in-0 zoom-in-95",
          t
        ),
        ...m,
        children: [
          /* @__PURE__ */ o(u.Provider, { value: g, children: r }),
          i && /* @__PURE__ */ f(a.Close, { className: "absolute right-4 top-4 rounded-sm text-muted opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25", children: [
            /* @__PURE__ */ o(p, { className: "h-4 w-4" }),
            /* @__PURE__ */ o("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
});
function P({ className: e, ...t }) {
  return /* @__PURE__ */ o("div", { className: l("flex flex-col gap-1.5", e), ...t });
}
function j({ className: e, ...t }) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: l("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", e),
      ...t
    }
  );
}
const z = n.forwardRef(function({ className: t, ...r }, i) {
  return /* @__PURE__ */ o(
    a.Title,
    {
      ref: i,
      className: l("text-sm font-semibold text-fg", t),
      ...r
    }
  );
}), k = n.forwardRef(function({ className: t, ...r }, i) {
  return /* @__PURE__ */ o(
    a.Description,
    {
      ref: i,
      className: l("text-xs text-muted", t),
      ...r
    }
  );
});
export {
  R as Dialog,
  T as DialogClose,
  O as DialogContent,
  k as DialogDescription,
  j as DialogFooter,
  P as DialogHeader,
  y as DialogOverlay,
  v as DialogPortal,
  u as DialogSurfaceContext,
  z as DialogTitle,
  S as DialogTrigger,
  N as useDialogSurface
};
