import { jsx as e, jsxs as n } from "react/jsx-runtime";
import { tone as r } from "../lib/tone.js";
function d({ children: t }) {
  return /* @__PURE__ */ e("div", { className: "grid min-w-0 [&>*+*]:border-0 [&>*+*]:border-t [&>*+*]:border-solid [&>*+*]:border-line", children: t });
}
function c({ value: t, tone: i, title: a, share: s, children: l }) {
  return /* @__PURE__ */ n("div", { className: "grid grid-cols-[44px_minmax(0,1fr)] items-center gap-3 px-3 py-3", children: [
    /* @__PURE__ */ e("span", { className: "text-xl font-semibold tabular-nums", style: { color: r(i) }, children: t.toLocaleString() }),
    /* @__PURE__ */ n("span", { className: "grid min-w-0 gap-1", children: [
      /* @__PURE__ */ n("span", { className: "flex items-baseline justify-between gap-3", children: [
        /* @__PURE__ */ e("span", { className: "text-sm font-semibold text-ink-strong", style: { lineHeight: 1.25 }, children: a }),
        s ? /* @__PURE__ */ e("span", { className: "text-sm tabular-nums text-ink-muted", style: { lineHeight: 1.5 }, children: s }) : null
      ] }),
      /* @__PURE__ */ e("span", { className: "flex flex-wrap items-center gap-x-1 text-detail leading-[1.45] text-ink-muted", children: l })
    ] })
  ] });
}
export {
  d as BreakdownList,
  c as BreakdownRow
};
