import { jsxs as l, Fragment as c, jsx as e } from "react/jsx-runtime";
import { ChevronLeft as m, ChevronRight as d } from "lucide-react";
import { Button as i } from "./button.js";
function f({ unit: n, label: r, onPrev: t, onNext: o, onToday: a, atToday: s }) {
  return /* @__PURE__ */ l(c, { children: [
    /* @__PURE__ */ e(i, { variant: "ghost", size: "icon-sm", "aria-label": `Previous ${n}`, onClick: t, children: /* @__PURE__ */ e(m, {}) }),
    /* @__PURE__ */ e("span", { className: "min-w-36 text-center text-sm font-semibold text-ink-strong", children: r }),
    /* @__PURE__ */ e(i, { variant: "ghost", size: "icon-sm", "aria-label": `Next ${n}`, onClick: o, children: /* @__PURE__ */ e(d, {}) }),
    /* @__PURE__ */ e(i, { variant: "outline", size: "sm", disabled: s, onClick: a, children: "Today" })
  ] });
}
export {
  f as ScheduleCalendarNav
};
