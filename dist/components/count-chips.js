import { jsx as t, jsxs as i } from "react/jsx-runtime";
import { cn as s } from "../lib/cn.js";
function d({ chips: n, value: o, onChange: a, label: l }) {
  return /* @__PURE__ */ t("div", { role: "group", "aria-label": l, className: "flex flex-wrap gap-1", children: n.filter((e, r) => r === 0 || e.count > 0).map((e) => {
    const r = o === e.key;
    return /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        "aria-pressed": r,
        onClick: () => a(e.key),
        className: s(
          "flex h-7 cursor-pointer items-center gap-1 rounded-full border border-solid px-2 text-caption leading-[1.4]",
          r ? "border-accent/45 bg-accent/10 text-ink-strong" : "border-line bg-transparent text-ink-muted hover:text-ink-strong"
        ),
        children: [
          /* @__PURE__ */ t("span", { className: "font-semibold", children: e.label }),
          /* @__PURE__ */ t("span", { className: "tabular-nums opacity-75", children: e.count.toLocaleString() })
        ]
      },
      e.key
    );
  }) });
}
export {
  d as CountChips
};
