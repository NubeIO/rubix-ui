import { jsx as t, jsxs as o, Fragment as g } from "react/jsx-runtime";
import { tone as c } from "../lib/tone.js";
import { CountToggle as f } from "./count-toggle.js";
const d = { lineHeight: 1.5 };
function N({ rows: l, picked: m, onPick: n, labelWidth: r = 88, pressedTitle: u }) {
  const p = Math.max(1, ...l.map((e) => e.value)), s = "grid w-full items-center gap-3 px-2 py-0.5", a = { gridTemplateColumns: `${r}px minmax(0,1fr) 28px` }, i = (e) => /* @__PURE__ */ o(g, { children: [
    /* @__PURE__ */ o("span", { className: "flex min-w-0 items-center gap-1.5 text-sm text-ink", style: d, children: [
      e.icon ? /* @__PURE__ */ t("span", { "aria-hidden": !0, className: "flex flex-none [&_svg]:size-3.5", style: { color: c(e.tone) }, children: e.icon }) : null,
      /* @__PURE__ */ t("span", { className: "truncate", children: e.label })
    ] }),
    /* @__PURE__ */ t("span", { className: "h-2 overflow-hidden rounded-full bg-surface-inset", "aria-hidden": !0, children: /* @__PURE__ */ t("span", { "data-bar-fill": !0, className: "block h-full rounded-full", style: { width: `${e.value / p * 100}%`, background: c(e.tone) } }) }),
    /* @__PURE__ */ t("span", { className: "text-right text-sm font-semibold tabular-nums text-ink-strong", style: d, children: e.value.toLocaleString() })
  ] });
  return /* @__PURE__ */ t("div", { className: "grid gap-0.5", children: l.map(
    (e) => n ? /* @__PURE__ */ t(
      f,
      {
        pressed: m === e.key,
        count: e.value,
        onToggle: (h) => n(h ? e.key : void 0),
        title: e.title ? `${e.title} Show only these` : void 0,
        pressedTitle: u,
        className: s,
        style: a,
        children: i(e)
      },
      e.key
    ) : /* @__PURE__ */ t("div", { className: s, style: a, title: e.title, children: i(e) }, e.key)
  ) });
}
export {
  N as BarList
};
