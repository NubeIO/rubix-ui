import { jsx as a } from "react/jsx-runtime";
import { Loader2 as n } from "lucide-react";
import { cn as e } from "../lib/cn.js";
function s({ className: i, ...r }) {
  return /* @__PURE__ */ a(
    n,
    {
      "data-slot": "spinner",
      "aria-hidden": r["aria-label"] ? void 0 : !0,
      className: e("size-3.5 shrink-0 animate-spin", i),
      ...r
    }
  );
}
export {
  s as Spinner
};
