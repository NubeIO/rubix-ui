import { jsxs as c, jsx as o } from "react/jsx-runtime";
import { useRef as p } from "react";
import { cn as t } from "../lib/cn.js";
import { useElementWidth as f } from "../lib/element-width.js";
import { tone as d } from "../lib/tone.js";
const u = 776 + 2 * 20 + 2;
function w({ label: s, left: l, right: n, stackBelow: a = u, className: m }) {
  const i = p(null), e = f(i), r = e === null || e >= a;
  return /* @__PURE__ */ c(
    "section",
    {
      ref: i,
      "aria-label": s,
      "data-split": r ? "side" : "stack",
      className: t(
        "grid gap-7 rounded-[var(--radius-card,12px)] border border-line bg-surface-card p-5",
        r && "grid-cols-[minmax(0,3fr)_minmax(0,2fr)]",
        m
      ),
      children: [
        /* @__PURE__ */ o("div", { className: "min-w-0", children: l }),
        /* @__PURE__ */ o(
          "div",
          {
            "data-split-divider": r ? "left" : "top",
            className: t("min-w-0", r ? "pl-7" : "pt-5"),
            style: r ? { borderLeft: `1px solid ${d("line")}` } : { borderTop: `1px solid ${d("line")}` },
            children: n
          }
        )
      ]
    }
  );
}
export {
  u as SPLIT_STACK_BELOW,
  w as SplitCard
};
