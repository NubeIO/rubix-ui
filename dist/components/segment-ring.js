import { jsxs as s, jsx as n } from "react/jsx-runtime";
import { tone as u } from "../lib/tone.js";
const g = 2;
function y({ segments: x, total: o, value: f, caption: d, size: t = 148, thickness: c = 14 }) {
  const a = (t - c) / 2, h = 2 * Math.PI * a;
  let m = 0;
  const i = x.filter((e) => e.value > 0 && o > 0).map((e) => {
    const r = e.value / o * h, k = { key: e.key, label: e.label, color: u(e.tone, e.alpha), len: r > 2 * g ? r - g : r, at: m };
    return m += r, k;
  }), l = t / 2;
  return /* @__PURE__ */ s("div", { className: "relative flex-none", style: { width: t, height: t }, children: [
    /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: `0 0 ${t} ${t}`, "aria-hidden": !0, className: "-rotate-90", children: [
      /* @__PURE__ */ n("circle", { cx: l, cy: l, r: a, fill: "none", strokeWidth: c, style: { stroke: u("surface-inset") } }),
      i.map((e) => /* @__PURE__ */ n(
        "circle",
        {
          "data-arc": e.key,
          cx: l,
          cy: l,
          r: a,
          fill: "none",
          strokeWidth: c,
          strokeDasharray: i.length === 1 ? void 0 : `${e.len} ${h - e.len}`,
          strokeDashoffset: i.length === 1 ? void 0 : -e.at,
          style: { stroke: e.color },
          children: e.label ? /* @__PURE__ */ n("title", { children: e.label }) : null
        },
        e.key
      ))
    ] }),
    /* @__PURE__ */ s("div", { className: "pointer-events-none absolute inset-0 grid place-content-center text-center", children: [
      /* @__PURE__ */ n("span", { className: "text-value-lg leading-none font-semibold tracking-tight tabular-nums text-ink-strong", children: o > 0 ? f : "—" }),
      d ? /* @__PURE__ */ n("span", { className: "text-caption text-ink-muted", children: d }) : null
    ] })
  ] });
}
export {
  y as SegmentRing
};
