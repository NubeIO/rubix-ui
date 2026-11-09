import { jsx as t } from "react/jsx-runtime";
import { cn as a } from "../lib/cn.js";
import { nameColour as l } from "../lib/colour/nameColour.js";
const n = (r) => `${r / 1440 * 100}%`;
function c({ week: r, className: o }) {
  return /* @__PURE__ */ t("span", { "aria-hidden": !0, className: a("grid w-full gap-0.5", o), children: r.map((s, i) => /* @__PURE__ */ t("span", { className: "relative block h-[3px] overflow-hidden rounded-xs bg-surface-inset", children: s.map((e) => /* @__PURE__ */ t(
    "span",
    {
      className: a("absolute inset-y-0", l(e.nameIndex).bg),
      style: { left: n(e.start), width: n(e.end + 1 - e.start) }
    },
    e.start
  )) }, i)) });
}
export {
  c as WeekStrip
};
