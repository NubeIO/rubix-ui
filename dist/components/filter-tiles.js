import { jsx as r, jsxs as l } from "react/jsx-runtime";
import { cn as c } from "../lib/cn.js";
function f({ tiles: t, active: i, onPick: d, label: p }) {
  var o;
  const n = (o = t[0]) == null ? void 0 : o.key;
  return /* @__PURE__ */ r(
    "div",
    {
      role: "group",
      "aria-label": p,
      className: "grid flex-none auto-cols-[minmax(148px,1fr)] grid-flow-col gap-[var(--grid-gutter,10px)] overflow-x-auto border-b border-line bg-surface-card px-4 py-3",
      children: t.map((e) => {
        const a = e.key === i, s = `hsl(var(--${e.tone}))`;
        return /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            "aria-pressed": a,
            onClick: () => d(a || e.key === n ? n : e.key),
            style: { height: 120 },
            className: c(
              "flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-panel border bg-surface-card p-0 text-left text-inherit",
              a ? "border-accent/60 shadow-[0_0_0_1px_hsl(var(--accent)/.4),var(--elev-panel)]" : "border-line shadow-[var(--elev-panel)]"
            ),
            children: [
              /* @__PURE__ */ l("span", { className: "flex h-8 flex-none items-center gap-[7px] px-2.5", children: [
                /* @__PURE__ */ r("span", { "aria-hidden": !0, className: "flex size-4 [&_svg]:size-4", style: { color: s }, children: e.icon }),
                /* @__PURE__ */ r("span", { className: "min-w-0 truncate text-sm font-semibold text-ink-strong", children: e.label })
              ] }),
              /* @__PURE__ */ r(
                "span",
                {
                  className: c(
                    "flex flex-1 items-center justify-center text-value-lg tabular-nums",
                    e.alarm && e.count > 0 ? "text-destructive" : "text-ink-strong"
                  ),
                  children: e.count.toLocaleString()
                }
              ),
              /* @__PURE__ */ l("span", { className: "flex h-7 flex-none items-center gap-2 border-t border-line px-2.5 text-caption", children: [
                /* @__PURE__ */ r("span", { className: "min-w-0 flex-1 truncate text-ink-muted", children: e.note }),
                e.key !== n && /* @__PURE__ */ r("span", { className: "flex-none whitespace-nowrap", style: { color: s }, children: "Filter →" })
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
  f as FilterTiles
};
