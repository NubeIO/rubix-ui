import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { Sheet as d, SheetContent as p, SheetHeader as h, SheetTitle as m, SheetDescription as x } from "./sheet.js";
function N({ open: n, onClose: r, scheduleName: a, title: i, description: s, children: l, footer: o }) {
  return /* @__PURE__ */ e(d, { open: n, onOpenChange: (c) => !c && r(), children: /* @__PURE__ */ t(p, { className: "w-full gap-0 p-0 sm:max-w-(--sheet-w-md)", children: [
    /* @__PURE__ */ t(h, { className: "gap-1 border-b border-line pb-3.5 pr-12", children: [
      /* @__PURE__ */ e("span", { className: "text-caption text-ink-faint", children: a }),
      /* @__PURE__ */ e(m, { className: "text-base", children: i }),
      /* @__PURE__ */ e(x, { className: "text-caption", children: s })
    ] }),
    /* @__PURE__ */ e("div", { className: "grid min-h-0 flex-1 content-start gap-3 overflow-y-auto p-4", children: l }),
    /* @__PURE__ */ e("div", { className: "flex flex-none justify-end gap-2 border-t border-line px-4 py-3", children: o })
  ] }) });
}
export {
  N as EditorSheet
};
