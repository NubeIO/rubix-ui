import { jsxs as d, jsx as p } from "react/jsx-runtime";
import { Check as l, Copy as u } from "lucide-react";
import { Button as y } from "./button.js";
import { cn as C } from "../lib/cn.js";
import { useClipboard as f } from "../lib/clipboard/useClipboard.js";
function k({
  text: t,
  label: o,
  copiedLabel: r = "Copied",
  variant: n = "ghost",
  size: i = "sm",
  className: e,
  ariaLabel: s = "copy to clipboard"
}) {
  const { copied: c, copy: m } = f(), a = !o && i === "icon";
  return /* @__PURE__ */ d(
    y,
    {
      type: "button",
      variant: n,
      size: i,
      "aria-label": o ? void 0 : s,
      title: "Copy to the clipboard",
      disabled: t.length === 0,
      onClick: () => void m(t),
      className: C(!a && "gap-1 text-xs", e),
      children: [
        c ? /* @__PURE__ */ p(l, { size: 13, className: "text-accent" }) : /* @__PURE__ */ p(u, { size: 13 }),
        o ? c ? r : o : null
      ]
    }
  );
}
export {
  k as CopyButton
};
