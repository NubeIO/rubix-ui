import { jsx as a, jsxs as i } from "react/jsx-runtime";
import * as n from "@radix-ui/react-menubar";
import { CheckIcon as l, CircleIcon as c, ChevronRightIcon as m } from "lucide-react";
import { cn as o } from "../lib/cn.js";
import { useOverlayContainer as d } from "../lib/overlay.js";
function g({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    n.Root,
    {
      "data-slot": "menubar",
      className: o(
        "bg-panel flex h-9 items-center gap-1 rounded-md border border-border p-1 shadow-sm",
        e
      ),
      ...t
    }
  );
}
function v({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ a(
    n.Trigger,
    {
      "data-slot": "menubar-trigger",
      className: o(
        "focus:bg-(--hover-wash) data-[state=open]:bg-(--hover-wash) hover:bg-(--hover-wash) flex cursor-default items-center rounded-sm px-2 py-1 text-sm outline-hidden select-none",
        e
      ),
      ...t
    }
  );
}
function x({ ...e }) {
  return /* @__PURE__ */ a(n.Menu, { "data-slot": "menubar-menu", ...e });
}
function M({
  container: e,
  ...t
}) {
  const r = d();
  return /* @__PURE__ */ a(n.Portal, { container: e ?? r, ...t });
}
function w({
  className: e,
  align: t = "start",
  alignOffset: r = -4,
  sideOffset: s = 8,
  ...u
}) {
  return /* @__PURE__ */ a(n.Portal, { container: d(), children: /* @__PURE__ */ a(
    n.Content,
    {
      "data-slot": "menubar-content",
      align: t,
      alignOffset: r,
      sideOffset: s,
      className: o(
        "bg-panel text-fg data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-(--z-popover) max-h-(--radix-menubar-content-available-height) min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border border-border p-1 shadow-(--elev-popover)",
        e
      ),
      ...u
    }
  ) });
}
function N({ ...e }) {
  return /* @__PURE__ */ a(n.Group, { "data-slot": "menubar-group", ...e });
}
function z({
  className: e,
  inset: t,
  variant: r = "default",
  ...s
}) {
  return /* @__PURE__ */ a(
    n.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": t,
      "data-variant": r,
      className: o(
        "focus:bg-(--hover-wash) data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[inset]:pl-8 relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...s
    }
  );
}
function y({
  className: e,
  children: t,
  checked: r,
  ...s
}) {
  return /* @__PURE__ */ i(
    n.CheckboxItem,
    {
      "data-slot": "menubar-checkbox-item",
      className: o(
        "focus:bg-(--hover-wash) relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        e
      ),
      checked: r,
      ...s,
      children: [
        /* @__PURE__ */ a("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ a(n.ItemIndicator, { children: /* @__PURE__ */ a(l, { className: "size-4" }) }) }),
        t
      ]
    }
  );
}
function I({ ...e }) {
  return /* @__PURE__ */ a(n.RadioGroup, { ...e });
}
function C({
  className: e,
  children: t,
  ...r
}) {
  return /* @__PURE__ */ i(
    n.RadioItem,
    {
      className: o(
        "focus:bg-(--hover-wash) relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        e
      ),
      ...r,
      children: [
        /* @__PURE__ */ a("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ a(n.ItemIndicator, { children: /* @__PURE__ */ a(c, { className: "size-2 fill-current" }) }) }),
        t
      ]
    }
  );
}
function S({
  className: e,
  inset: t,
  ...r
}) {
  return /* @__PURE__ */ a(
    n.Label,
    {
      "data-slot": "menubar-label",
      "data-inset": t,
      className: o("px-2 py-1.5 text-xs text-muted data-[inset]:pl-8", e),
      ...r
    }
  );
}
function k({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ a(
    n.Separator,
    {
      "data-slot": "menubar-separator",
      className: o("bg-border -mx-1 my-1 h-px", e),
      ...t
    }
  );
}
function R({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "span",
    {
      "data-slot": "menubar-shortcut",
      className: o("text-muted ml-auto text-xs tracking-widest", e),
      ...t
    }
  );
}
function j({ ...e }) {
  return /* @__PURE__ */ a(n.Sub, { "data-slot": "menubar-sub", ...e });
}
function G({
  className: e,
  inset: t,
  children: r,
  ...s
}) {
  return /* @__PURE__ */ i(
    n.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": t,
      className: o(
        "focus:bg-(--hover-wash) data-[inset]:pl-8 data-[state=open]:bg-(--hover-wash) flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none",
        e
      ),
      ...s,
      children: [
        r,
        /* @__PURE__ */ a(m, { className: "ml-auto size-3.5" })
      ]
    }
  );
}
function P({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ a(
    n.SubContent,
    {
      "data-slot": "menubar-sub-content",
      className: o(
        "bg-panel text-fg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-(--z-popover) min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border border-border p-1 shadow-(--elev-popover)",
        e
      ),
      ...t
    }
  );
}
export {
  g as Menubar,
  y as MenubarCheckboxItem,
  w as MenubarContent,
  N as MenubarGroup,
  z as MenubarItem,
  S as MenubarLabel,
  x as MenubarMenu,
  M as MenubarPortal,
  I as MenubarRadioGroup,
  C as MenubarRadioItem,
  k as MenubarSeparator,
  R as MenubarShortcut,
  j as MenubarSub,
  P as MenubarSubContent,
  G as MenubarSubTrigger,
  v as MenubarTrigger
};
