import { jsxs as c, jsx as t } from "react/jsx-runtime";
import * as b from "react";
import { cn as u } from "../lib/cn.js";
import { Input as p } from "./input.js";
function v({
  palette: a,
  value: r,
  onChange: l,
  "aria-label": o,
  allowCustom: m = !0,
  className: f
}) {
  const n = !!r && !a.some((e) => e.value === r), [i, d] = b.useState(n ? r : ""), s = () => {
    const e = i.trim();
    /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e) && l(e);
  };
  return /* @__PURE__ */ c(
    "div",
    {
      className: u("flex flex-wrap items-center gap-1", f),
      role: "group",
      "aria-label": o,
      children: [
        a.map((e) => /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            "aria-label": `${o} ${e.value}`,
            "aria-pressed": e.value === r,
            title: e.label ?? e.value,
            className: u(
              "h-5 w-5 rounded-full border transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
              e.value === r ? "border-fg ring-2 ring-accent/40" : "border-border"
            ),
            style: { background: e.css },
            onClick: () => l(e.value)
          },
          e.value
        )),
        m && /* @__PURE__ */ c("span", { className: "flex items-center gap-1", children: [
          n && /* @__PURE__ */ t(
            "span",
            {
              className: "inline-block h-5 w-5 rounded-full border border-fg",
              style: { background: r },
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ t(
            p,
            {
              "aria-label": `${o} custom hex`,
              className: "h-6 w-20 px-1.5 text-[11px]",
              placeholder: "#22c55e",
              value: i,
              onChange: (e) => d(e.target.value),
              onBlur: s,
              onKeyDown: (e) => {
                e.key === "Enter" && s();
              }
            }
          )
        ] })
      ]
    }
  );
}
export {
  v as ColorSwatchPicker
};
