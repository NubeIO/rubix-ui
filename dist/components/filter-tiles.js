import { jsx as r, jsxs as a } from "react/jsx-runtime";
import { cn as c } from "../lib/cn.js";
function f({ tiles: t, active: i, onPick: x, label: d }) {
  var o;
  const l = (o = t[0]) == null ? void 0 : o.key;
  return /* @__PURE__ */ r(
    "div",
    {
      role: "group",
      "aria-label": d,
      className: "grid flex-none auto-cols-[minmax(148px,1fr)] grid-flow-col gap-[var(--grid-gutter,10px)] overflow-x-auto border-b border-line bg-surface-card px-4 py-3",
      children: t.map((e) => {
        const n = e.key === i, s = `hsl(var(--${e.tone}))`;
        return /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            "aria-pressed": n,
            onClick: () => x(n || e.key === l ? l : e.key),
            style: {
              height: 120,
              boxShadow: n ? "0 0 0 1px hsl(var(--accent) / .4), var(--elev-panel)" : "var(--elev-panel)"
            },
            className: c(
              "flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-panel border bg-surface-card p-0 text-left text-inherit",
              n ? "border-accent/60" : "border-line"
            ),
            children: [
              /* @__PURE__ */ a("span", { className: "flex h-8 flex-none items-center gap-[7px] px-2.5", children: [
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
              /* @__PURE__ */ a("span", { className: "flex h-7 flex-none items-center gap-2 border-t border-line px-2.5 text-caption", children: [
                /* @__PURE__ */ r("span", { className: "min-w-0 flex-1 truncate text-ink-muted", children: e.note }),
                e.key !== l && /* @__PURE__ */ r("span", { className: "flex-none whitespace-nowrap", style: { color: s }, children: "Filter →" })
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
