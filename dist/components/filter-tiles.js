import { jsx as n, jsxs as t } from "react/jsx-runtime";
import { cn as i } from "../lib/cn.js";
function b({ tiles: a, active: c, onPick: d, label: x, height: p = 120 }) {
  var o;
  const l = (o = a[0]) == null ? void 0 : o.key;
  return /* @__PURE__ */ n(
    "div",
    {
      role: "group",
      "aria-label": x,
      className: "grid flex-none auto-cols-[minmax(148px,1fr)] grid-flow-col gap-[var(--grid-gutter,10px)] overflow-x-auto [scrollbar-width:none] border-b border-line bg-surface-card px-4 py-3",
      children: a.map((e) => {
        const r = e.key === c, s = `hsl(var(--${e.tone}))`, u = e.tone.startsWith("ink") ? "hsl(var(--accent))" : s;
        return /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            "aria-pressed": r,
            onClick: () => d(r || e.key === l ? l : e.key),
            style: {
              height: p,
              boxShadow: r ? "0 0 0 1px hsl(var(--accent) / .4), var(--elev-panel)" : "var(--elev-panel)"
            },
            className: i(
              // Focus as an outline: the shadow is inline (above), so a ring utility would be overridden.
              "flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-panel border bg-surface-card p-0 text-left text-inherit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              r ? "border-accent/60" : "border-line"
            ),
            children: [
              /* @__PURE__ */ t("span", { className: "flex h-8 flex-none items-center gap-[7px] px-2.5", children: [
                /* @__PURE__ */ n("span", { "aria-hidden": !0, className: "flex size-4 [&_svg]:size-4", style: { color: s }, children: e.icon }),
                /* @__PURE__ */ n("span", { className: "min-w-0 truncate text-sm font-semibold text-ink-strong", children: e.label })
              ] }),
              /* @__PURE__ */ n(
                "span",
                {
                  className: i(
                    "flex flex-1 items-center justify-center text-value-lg leading-none font-semibold tabular-nums",
                    e.alarm && e.count > 0 ? "text-destructive" : "text-ink-strong"
                  ),
                  children: e.count.toLocaleString()
                }
              ),
              /* @__PURE__ */ t("span", { className: "flex h-7 flex-none items-center gap-2 border-t border-line px-2.5 text-caption", children: [
                /* @__PURE__ */ n("span", { className: "min-w-0 flex-1 truncate text-ink-muted", title: e.note, children: e.note }),
                e.key !== l && /* @__PURE__ */ n("span", { "aria-hidden": !0, className: "flex-none whitespace-nowrap", style: { color: u }, children: "Filter →" })
              ] })
            ]
          },
          e.key
        );
      })
    }
  );
}
export {
  b as FilterTiles
};
