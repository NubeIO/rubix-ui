import { jsx as a, jsxs as l } from "react/jsx-runtime";
import { cn as n } from "../lib/cn.js";
const s = "grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(clamp(calc((100%-42px)/4),calc((642px-100%)*1000),calc((100%-14px)/2)),1fr))]";
function o({ tiles: r, label: i }) {
  return /* @__PURE__ */ a("div", { role: "group", "aria-label": i, className: s, children: r.map((e) => {
    const t = e.alarm && e.value > 0;
    return /* @__PURE__ */ l(
      "section",
      {
        className: n(
          "flex min-w-0 flex-col gap-2.5 rounded-[var(--radius-card,12px)] border p-4",
          t ? "border-destructive/35 bg-destructive/[0.06]" : "border-line bg-surface-card"
        ),
        children: [
          /* @__PURE__ */ l("h2", { className: n("m-0 flex items-center gap-2 text-caption leading-[1.4] font-normal", t ? "text-destructive" : "text-ink-muted"), children: [
            e.dot ? /* @__PURE__ */ a("span", { "aria-hidden": !0, className: "size-2 flex-none rounded-full", style: { background: `hsl(var(--${e.dot}))` } }) : null,
            e.label
          ] }),
          /* @__PURE__ */ l("div", { className: "flex items-baseline gap-1.5", children: [
            /* @__PURE__ */ a("span", { className: "text-value-xl leading-none font-semibold tracking-tight tabular-nums text-ink-strong", children: e.value.toLocaleString() }),
            e.suffix ? /* @__PURE__ */ a("span", { className: "text-ink-faint", children: e.suffix }) : null
          ] }),
          e.bar !== void 0 ? /* @__PURE__ */ a("div", { className: "h-1.5 overflow-hidden rounded-full bg-surface-inset", "aria-hidden": !0, children: /* @__PURE__ */ a("div", { "data-bar-fill": !0, className: "h-full rounded-full bg-accent", style: { width: `${Math.max(0, Math.min(100, e.bar))}%` } }) }) : null,
          /* @__PURE__ */ a("p", { className: "mt-auto mb-0 text-caption leading-[1.4] text-ink-muted", title: e.noteTitle, children: e.note })
        ]
      },
      e.key
    );
  }) });
}
export {
  o as StatTiles
};
