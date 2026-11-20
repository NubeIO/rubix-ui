import { jsx as b } from "react/jsx-runtime";
import { cn as c } from "../lib/cn.js";
function u({ pressed: t, count: e, onToggle: o, title: r = "Show only these", pressedTitle: n = "Show all", className: a, style: i, children: l }) {
  return /* @__PURE__ */ b(
    "button",
    {
      type: "button",
      "aria-pressed": t,
      disabled: !t && e === 0,
      title: t ? n : r,
      onClick: () => o(!t),
      style: i,
      className: c(
        "cursor-pointer select-none rounded-md border border-solid bg-transparent text-left text-inherit [font:inherit] disabled:cursor-default disabled:opacity-60",
        t ? "border-accent/45 bg-accent/10 hover:bg-accent/15" : "border-transparent enabled:hover:bg-(--hover-wash)",
        a
      ),
      children: l
    }
  );
}
export {
  u as CountToggle
};
