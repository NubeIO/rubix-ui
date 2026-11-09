import { jsx as t } from "react/jsx-runtime";
import { cn as a } from "../lib/cn.js";
import { nameColour as s } from "../lib/schedule/nameColour.js";
import { nameIndex as l, DAY_MINUTES as p } from "../lib/schedule/nodeSchedule.js";
const n = (r) => `${r / p * 100}%`;
function h({ doc: r, className: o }) {
  return /* @__PURE__ */ t("span", { "aria-hidden": !0, className: a("grid w-full gap-0.5", o), children: r.week.map((i, m) => /* @__PURE__ */ t("span", { className: "relative block h-[3px] overflow-hidden rounded-xs bg-surface-inset", children: i.map((e) => /* @__PURE__ */ t(
    "span",
    {
      className: a("absolute inset-y-0", s(l(r, e.name)).bg),
      style: { left: n(e.start), width: n(e.end + 1 - e.start) }
    },
    e.start
  )) }, m)) });
}
export {
  h as WeekStrip
};
