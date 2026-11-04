import { jsx as e, jsxs as i } from "react/jsx-runtime";
import { cn as r } from "../lib/cn.js";
function d({ icon: m, title: l, description: t, action: s, className: a }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "empty-state",
      className: r("flex flex-1 items-center justify-center p-6", a),
      children: /* @__PURE__ */ i("div", { className: "flex max-w-sm flex-col items-center text-center", children: [
        /* @__PURE__ */ e("div", { className: "mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-fg/5 text-muted shadow-[inset_0_0_0_1px_hsl(var(--fg)/0.07)]", children: /* @__PURE__ */ e(m, { size: 20, "aria-hidden": !0 }) }),
        /* @__PURE__ */ e("p", { className: "text-sm font-medium text-fg", children: l }),
        t && /* @__PURE__ */ e("p", { className: "mt-1.5 max-w-[36ch] text-xs leading-5 text-muted", children: t }),
        s ? /* @__PURE__ */ e("div", { className: "mt-4", children: s }) : null
      ] })
    }
  );
}
export {
  d as EmptyState
};
