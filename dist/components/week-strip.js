import { jsx as t } from "react/jsx-runtime";
import { cn as a } from "../lib/cn.js";
import { nameColour as s } from "../lib/colour/nameColour.js";
const n = (r) => `${r / 1440 * 100}%`;
function c({ week: r, className: o }) {
  return /* @__PURE__ */ t("span", { "aria-hidden": !0, className: a("grid w-full gap-0.5", o), children: r.map((i, l) => /* @__PURE__ */ t("span", { className: "relative block h-[3px] overflow-hidden rounded-xs bg-line", children: i.map((e) => /* @__PURE__ */ t(
    "span",
    {
      className: a("absolute inset-y-0", s(e.nameIndex).bg),
      style: { left: n(e.start), width: n(e.end + 1 - e.start) }
    },
    e.start
  )) }, l)) });
}
export {
  c as WeekStrip
};
