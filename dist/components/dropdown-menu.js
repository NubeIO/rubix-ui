import { jsx as t, jsxs as s } from "react/jsx-runtime";
import * as o from "@radix-ui/react-dropdown-menu";
import { CheckIcon as u, CircleIcon as l, ChevronRightIcon as c } from "lucide-react";
import { cn as r } from "../lib/cn.js";
import { useOverlayContainer as i } from "../lib/overlay.js";
function v({ ...e }) {
  return /* @__PURE__ */ t(o.Root, { "data-slot": "dropdown-menu", ...e });
}
function h({
  ...e
}) {
  return /* @__PURE__ */ t(o.Trigger, { "data-slot": "dropdown-menu-trigger", ...e });
}
function w({
  container: e,
  ...n
}) {
  const a = i();
  return /* @__PURE__ */ t(o.Portal, { container: e ?? a, ...n });
}
function b({
  className: e,
  sideOffset: n = 4,
  ...a
}) {
  return /* @__PURE__ */ t(o.Portal, { container: i(), children: /* @__PURE__ */ t(
    o.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: n,
      className: r(
        "bg-panel text-fg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-(--z-popover) max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border border-border p-1 shadow-(--elev-popover)",
        e
      ),
      ...a
    }
  ) });
}
function x({ ...e }) {
  return /* @__PURE__ */ t(o.Group, { "data-slot": "dropdown-menu-group", ...e });
}
function z({
  className: e,
  inset: n,
  variant: a = "default",
  ...d
}) {
  return /* @__PURE__ */ t(
    o.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": n,
      "data-variant": a,
      className: r(
        "focus:bg-(--hover-wash) data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[inset]:pl-8 relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:inline-flex",
        e
      ),
      ...d
    }
  );
}
function D({
  className: e,
  children: n,
  checked: a,
  ...d
}) {
  return /* @__PURE__ */ s(
    o.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      className: r(
        "focus:bg-(--hover-wash) relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:inline-flex",
        e
      ),
      checked: a,
      ...d,
      children: [
        /* @__PURE__ */ t("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ t(o.ItemIndicator, { children: /* @__PURE__ */ t(u, { className: "size-4" }) }) }),
        n
      ]
    }
  );
}
function M({
  ...e
}) {
  return /* @__PURE__ */ t(o.RadioGroup, { ...e });
}
function N({
  className: e,
  children: n,
  ...a
}) {
  return /* @__PURE__ */ s(
    o.RadioItem,
    {
      className: r(
        "focus:bg-(--hover-wash) relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:inline-flex",
        e
      ),
      ...a,
      children: [
        /* @__PURE__ */ t("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ t(o.ItemIndicator, { children: /* @__PURE__ */ t(l, { className: "size-2 fill-current" }) }) }),
        n
      ]
    }
  );
}
function y({
  className: e,
  inset: n,
  ...a
}) {
  return /* @__PURE__ */ t(
    o.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": n,
      className: r("px-2 py-1.5 text-xs text-muted data-[inset]:pl-8", e),
      ...a
    }
  );
}
function I({
  className: e,
  ...n
}) {
  return /* @__PURE__ */ t(
    o.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: r("bg-border -mx-1 my-1 h-px", e),
      ...n
    }
  );
}
function _({ className: e, ...n }) {
  return /* @__PURE__ */ t(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: r("text-muted ml-auto text-xs tracking-widest", e),
      ...n
    }
  );
}
function C({ ...e }) {
  return /* @__PURE__ */ t(o.Sub, { ...e });
}
function k({
  className: e,
  inset: n,
  children: a,
  ...d
}) {
  return /* @__PURE__ */ s(
    o.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": n,
      className: r(
        "focus:bg-(--hover-wash) data-[inset]:pl-8 data-[state=open]:bg-(--hover-wash) flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none",
        e
      ),
      ...d,
      children: [
        a,
        /* @__PURE__ */ t(c, { className: "ml-auto size-3.5" })
      ]
    }
  );
}
function S({
  className: e,
  ...n
}) {
  return /* @__PURE__ */ t(
    o.SubContent,
    {
      className: r(
        "bg-panel text-fg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-(--z-popover) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border border-border p-1 shadow-(--elev-popover)",
        e
      ),
      ...n
    }
  );
}
export {
  v as DropdownMenu,
  D as DropdownMenuCheckboxItem,
  b as DropdownMenuContent,
  x as DropdownMenuGroup,
  z as DropdownMenuItem,
  y as DropdownMenuLabel,
  w as DropdownMenuPortal,
  M as DropdownMenuRadioGroup,
  N as DropdownMenuRadioItem,
  I as DropdownMenuSeparator,
  _ as DropdownMenuShortcut,
  C as DropdownMenuSub,
  S as DropdownMenuSubContent,
  k as DropdownMenuSubTrigger,
  h as DropdownMenuTrigger
};
