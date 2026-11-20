import { jsx as n, jsxs as s } from "react/jsx-runtime";
import { tone as i } from "../lib/tone.js";
function o({ value: e, of: t, tone: r = "success", noun: a }) {
  if (e === null || !t) return /* @__PURE__ */ n("span", { className: "text-ink-muted", children: "—" });
  const l = Math.round(e / t * 100);
  return /* @__PURE__ */ s("span", { className: "grid gap-1.5", title: `${e} of ${t}${a ? ` ${a}` : ""} (${l}%)`, children: [
    /* @__PURE__ */ s("span", { className: "text-xs tabular-nums", style: { lineHeight: 1.45 }, children: [
      /* @__PURE__ */ n("span", { className: "font-semibold text-ink-strong", children: e.toLocaleString() }),
      /* @__PURE__ */ s("span", { className: "text-ink-faint", children: [
        " of ",
        t.toLocaleString()
      ] })
    ] }),
    /* @__PURE__ */ n("span", { "aria-hidden": !0, className: "h-[5px] w-full overflow-hidden rounded-full bg-surface-inset", children: /* @__PURE__ */ n("span", { "data-bar-fill": !0, className: "block h-full rounded-full", style: { width: `${Math.min(100, l)}%`, background: i(r) } }) })
  ] });
}
export {
  o as ShareBar
};
