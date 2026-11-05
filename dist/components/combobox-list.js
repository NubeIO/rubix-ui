import { jsx as r, jsxs as a } from "react/jsx-runtime";
import * as l from "react";
import * as N from "@radix-ui/react-popover";
import { Check as _ } from "lucide-react";
import { cn as k } from "../lib/cn.js";
function E({
  container: y,
  listId: m,
  optionId: p,
  ariaLabel: u,
  value: h,
  groups: R,
  count: s,
  active: x,
  setActive: I,
  query: o,
  setQuery: P,
  searchable: n,
  allowCustom: d,
  fitContent: c,
  onKeyDown: b,
  commit: f
}) {
  const v = l.useRef(null), g = l.useRef(null), i = s > 0 ? p(x) : void 0;
  return l.useEffect(() => {
    var t, e;
    i && ((e = (t = document.getElementById(i)) == null ? void 0 : t.scrollIntoView) == null || e.call(t, { block: "nearest" }));
  }, [i]), /* @__PURE__ */ r(N.Portal, { container: y, children: /* @__PURE__ */ a(
    N.Content,
    {
      "data-slot": "combobox-list",
      side: "bottom",
      align: "start",
      sideOffset: 4,
      collisionPadding: 8,
      style: {
        width: c ? "max-content" : "var(--radix-popover-trigger-width)",
        minWidth: c ? "var(--radix-popover-trigger-width)" : void 0,
        zIndex: "var(--z-popover)"
      },
      onOpenAutoFocus: (t) => {
        var e;
        t.preventDefault(), (e = n ? v.current : g.current) == null || e.focus();
      },
      className: k(
        "max-h-64 min-w-48 overflow-y-auto rounded-md border border-border bg-panel p-1 shadow-(--elev-popover)",
        c && "max-w-[min(40rem,calc(100vw-16px))]"
      ),
      children: [
        n && /* @__PURE__ */ r(
          "input",
          {
            ref: v,
            "aria-label": `${u} search`,
            "aria-controls": m,
            "aria-activedescendant": i,
            "aria-autocomplete": "list",
            className: "mb-1 h-7 w-full rounded-md border border-border bg-bg px-2 text-xs text-fg focus-visible:outline-none",
            placeholder: d ? "search or type…" : "search…",
            value: o,
            onChange: (t) => {
              P(t.target.value), I(0);
            },
            onKeyDown: b
          }
        ),
        /* @__PURE__ */ a(
          "ul",
          {
            ref: g,
            id: m,
            role: "listbox",
            "aria-label": `${u} options`,
            tabIndex: n ? void 0 : -1,
            "aria-activedescendant": n ? void 0 : i,
            onKeyDown: n ? void 0 : b,
            className: "focus-visible:outline-none",
            children: [
              s === 0 && !d && /* @__PURE__ */ r("li", { role: "presentation", className: "px-2 py-1.5 text-sm text-muted", children: "no matches" }),
              s === 0 && d && o.trim() && /* @__PURE__ */ r("li", { role: "presentation", children: /* @__PURE__ */ a(
                "button",
                {
                  type: "button",
                  className: "min-h-8 w-full rounded-md px-2 py-1.5 text-left text-sm text-fg hover:bg-(--hover-wash)",
                  onClick: () => f(o.trim()),
                  children: [
                    "Use “",
                    o.trim(),
                    "”"
                  ]
                }
              ) }),
              R.map((t) => /* @__PURE__ */ a(l.Fragment, { children: [
                t.name && /* @__PURE__ */ r(
                  "li",
                  {
                    role: "presentation",
                    className: "px-2 pb-0.5 pt-1.5 text-caption font-semibold uppercase tracking-[0.08em] text-faint",
                    "aria-hidden": !0,
                    children: t.name
                  }
                ),
                t.items.map(({ o: e, idx: w }) => /* @__PURE__ */ r("li", { role: "presentation", children: /* @__PURE__ */ a(
                  "button",
                  {
                    type: "button",
                    id: p(w),
                    role: "option",
                    "aria-selected": e.value === h,
                    tabIndex: -1,
                    className: k(
                      "flex min-h-8 w-full items-start gap-1.5 rounded-md px-2 py-1.5 text-left text-sm text-fg hover:bg-(--hover-wash)",
                      w === x && "bg-bg"
                    ),
                    onClick: () => f(e.value),
                    children: [
                      e.swatch && /* @__PURE__ */ r(
                        "span",
                        {
                          className: "mt-0.5 inline-block h-3 w-3 shrink-0 rounded-full",
                          style: { background: e.swatch },
                          "aria-hidden": !0
                        }
                      ),
                      /* @__PURE__ */ a("span", { className: "min-w-0 flex-1", children: [
                        /* @__PURE__ */ r("span", { className: "block truncate", children: e.label ?? e.value }),
                        e.description && /* @__PURE__ */ r("span", { className: "block truncate text-caption text-muted", children: e.description })
                      ] }),
                      e.value === h && /* @__PURE__ */ r(_, { size: 12, className: "mt-0.5 shrink-0 text-accent", "aria-hidden": !0 })
                    ]
                  }
                ) }, e.value))
              ] }, t.name ?? "__ungrouped__"))
            ]
          }
        )
      ]
    }
  ) });
}
export {
  E as ComboboxList
};
