import { jsx as o, jsxs as f } from "react/jsx-runtime";
import * as i from "react";
import * as a from "@radix-ui/react-dialog";
import { X as d } from "lucide-react";
import { cn as l } from "../lib/cn.js";
import { useOverlayContainer as x } from "../lib/overlay.js";
import { DialogSurfaceContext as b } from "./dialog.js";
function R({ ...r }) {
  return /* @__PURE__ */ o(a.Root, { ...r });
}
function S({ container: r, ...e }) {
  const n = x();
  return /* @__PURE__ */ o(a.Portal, { container: r ?? n, ...e });
}
const g = i.forwardRef(function({ className: e, ...n }, t) {
  return /* @__PURE__ */ o(
    a.Overlay,
    {
      ref: t,
      className: l("fixed inset-0 z-50 bg-overlay/60 animate-in fade-in-0", e),
      ...n
    }
  );
}), D = i.forwardRef(function({ className: e, children: n, side: t = "right", ...m }, s) {
  const [u, h] = i.useState(null), p = i.useCallback(
    (c) => {
      h(c), typeof s == "function" ? s(c) : s && (s.current = c);
    },
    [s]
  );
  return /* @__PURE__ */ f(S, { children: [
    /* @__PURE__ */ o(g, {}),
    /* @__PURE__ */ f(
      a.Content,
      {
        ref: p,
        "data-panel": "",
        className: l(
          "fixed z-50 flex flex-col gap-4 bg-panel shadow-(--elev-dialog) transition ease-in-out animate-in",
          t === "right" && "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          t === "left" && "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          t === "top" && "inset-x-0 top-0 h-auto border-b",
          t === "bottom" && "inset-x-0 bottom-0 h-auto border-t",
          e
        ),
        ...m,
        children: [
          /* @__PURE__ */ o(b.Provider, { value: u, children: n }),
          /* @__PURE__ */ f(a.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25", children: [
            /* @__PURE__ */ o(d, { className: "h-4 w-4" }),
            /* @__PURE__ */ o("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
});
function O({ className: r, ...e }) {
  return /* @__PURE__ */ o("div", { className: l("flex flex-col gap-1.5 p-4", r), ...e });
}
const P = i.forwardRef(function({ className: e, ...n }, t) {
  return /* @__PURE__ */ o(a.Title, { ref: t, className: l("font-semibold text-fg", e), ...n });
}), T = i.forwardRef(function({ className: e, ...n }, t) {
  return /* @__PURE__ */ o(
    a.Description,
    {
      ref: t,
      className: l("text-sm text-muted", e),
      ...n
    }
  );
});
export {
  R as Sheet,
  D as SheetContent,
  T as SheetDescription,
  O as SheetHeader,
  P as SheetTitle
};
