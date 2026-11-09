import { jsx as n } from "react/jsx-runtime";
import { cn as t } from "../lib/cn.js";
import { nameColour as m } from "../lib/colour/nameColour.js";
function d({ index: o, className: e }) {
  const r = m(o);
  return /* @__PURE__ */ n(
    "span",
    {
      "aria-hidden": !0,
      className: t("size-2.5 flex-none rounded-xs border", r.bg, r.border, e)
    }
  );
}
export {
  d as NameSwatch
};
