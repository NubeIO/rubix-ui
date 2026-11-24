import { jsxs as s, jsx as l } from "react/jsx-runtime";
import { tone as u } from "../lib/tone.js";
const g = 2;
function p({ segments: x, total: c, value: f, caption: d, size: t = 148, thickness: a = 14 }) {
  const o = (t - a) / 2, h = 2 * Math.PI * o;
  let m = 0;
  const i = x.filter((e) => e.value > 0 && c > 0).map((e) => {
    const r = e.value / c * h, k = { key: e.key, label: e.label, color: u(e.tone, e.alpha), len: r > 2 * g ? r - g : r, at: m };
    return m += r, k;
  }), n = t / 2;
  return /* @__PURE__ */ s("div", { className: "relative flex-none", style: { width: t, height: t }, children: [
    /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: `0 0 ${t} ${t}`, "aria-hidden": !0, className: "-rotate-90", children: [
      /* @__PURE__ */ l("circle", { cx: n, cy: n, r: o, fill: "none", strokeWidth: a, style: { stroke: u("surface-inset") } }),
      i.map((e) => /* @__PURE__ */ l(
        "circle",
        {
          "data-arc": e.key,
          cx: n,
          cy: n,
          r: o,
          fill: "none",
          strokeWidth: a,
          strokeDasharray: i.length === 1 ? void 0 : `${e.len} ${h - e.len}`,
          strokeDashoffset: i.length === 1 ? void 0 : -e.at,
          style: { stroke: e.color },
          children: e.label ? /* @__PURE__ */ l("title", { children: e.label }) : null
        },
        e.key
      ))
    ] }),
    /* @__PURE__ */ s("div", { className: "absolute inset-0 grid place-content-center text-center", children: [
      /* @__PURE__ */ l("span", { className: "text-value-lg leading-none font-semibold tracking-tight tabular-nums text-ink-strong", children: c > 0 ? f : "—" }),
      d ? /* @__PURE__ */ l("span", { className: "text-caption text-ink-muted", children: d }) : null
    ] })
  ] });
}
export {
  p as SegmentRing
};
