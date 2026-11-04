import { jsx as i } from "react/jsx-runtime";
import { cn as e } from "../lib/cn.js";
function t({ className: o, ...r }) {
  return /* @__PURE__ */ i(
    "input",
    {
      type: "radio",
      "data-slot": "radio",
      className: e(
        "h-4 w-4 shrink-0 cursor-pointer border-border accent-[hsl(var(--accent))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50",
        o
      ),
      ...r
    }
  );
}
export {
  t as Radio
};
