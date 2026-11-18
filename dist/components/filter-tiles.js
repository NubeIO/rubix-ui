import { jsx as l, jsxs as a } from "react/jsx-runtime";
import { cn as u } from "../lib/cn.js";
function g({ tiles: n, active: o, onPick: s, label: t, height: d = 120 }) {
  var f;
  const i = (f = n[0]) == null ? void 0 : f.key, m = n.some((e) => e.bar);
  return /* @__PURE__ */ l(
    "div",
    {
      role: "group",
      "aria-label": t,
      className: "grid flex-none auto-cols-[minmax(148px,1fr)] grid-flow-col gap-[var(--grid-gutter,10px)] overflow-x-auto [scrollbar-width:none] border-b border-line bg-surface-card px-4 py-3",
      children: n.map((e) => {
        const r = e.key === o, c = `hsl(var(--${e.tone}))`, p = e.tone.startsWith("ink") ? "hsl(var(--accent))" : c;
        return /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            "aria-pressed": r,
            onClick: () => s(r || e.key === i ? i : e.key),
            style: {
              height: d,
              boxShadow: r ? "0 0 0 1px hsl(var(--accent) / .4), var(--elev-panel)" : "var(--elev-panel)"
            },
            className: u(
              // Focus as an outline: the shadow is inline (above), so a ring utility would be overridden.
              "flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-panel border bg-surface-card p-0 text-left text-inherit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              r ? "border-accent/60" : "border-line"
            ),
            children: [
              /* @__PURE__ */ a("span", { className: "flex h-8 flex-none items-center gap-[7px] px-2.5", children: [
                /* @__PURE__ */ l("span", { "aria-hidden": !0, className: "flex size-4 [&_svg]:size-4", style: { color: c }, children: e.icon }),
                /* @__PURE__ */ l("span", { className: "min-w-0 truncate text-sm font-semibold text-ink-strong", children: e.label })
              ] }),
              /* @__PURE__ */ l("span", { className: "flex flex-1 items-center justify-center text-value-lg leading-none font-semibold tabular-nums", children: /* @__PURE__ */ a("span", { className: "inline-flex items-baseline gap-1.5", children: [
                /* @__PURE__ */ l("span", { className: e.alarm && e.count > 0 ? "text-destructive" : "text-ink-strong", children: e.count.toLocaleString() }),
                e.of !== void 0 && /* @__PURE__ */ a("span", { className: "text-sm leading-none font-normal text-ink-muted", children: [
                  /* @__PURE__ */ a("span", { "aria-hidden": !0, children: [
                    "/ ",
                    e.of.toLocaleString()
                  ] }),
                  /* @__PURE__ */ a("span", { className: "sr-only", children: [
                    " of ",
                    e.of.toLocaleString()
                  ] })
                ] })
              ] }) }),
              m && /* @__PURE__ */ l(x, { bar: e.bar, tone: c, tight: d < 120 }),
              /* @__PURE__ */ a("span", { className: "flex h-7 flex-none items-center gap-2 border-t border-line px-2.5 text-caption", children: [
                /* @__PURE__ */ l("span", { className: "min-w-0 flex-1 truncate text-ink-muted", title: e.note, children: e.note }),
                e.key !== i && /* @__PURE__ */ l("span", { "aria-hidden": !0, className: "flex-none whitespace-nowrap", style: { color: p }, children: "Filter →" })
              ] })
            ]
          },
          e.key
        );
      })
    }
  );
}
function x({ bar: n, tone: o, tight: s }) {
  const t = n && n.of > 0 ? Math.min(1, Math.max(0, n.value / n.of)) : 0;
  return /* @__PURE__ */ l("span", { "data-bar": !0, "aria-hidden": !0, className: u("mx-2.5 flex h-1 flex-none overflow-hidden rounded-full", s ? "mb-1.5" : "mb-2", n && "bg-surface-inset"), children: t > 0 && /* @__PURE__ */ l("span", { "data-bar-fill": !0, title: n == null ? void 0 : n.title, className: "h-full rounded-full", style: { width: `${t * 100}%`, minWidth: "4px", background: o } }) });
}
export {
  g as FilterTiles
};
