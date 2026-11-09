import { jsxs as i, jsx as t } from "react/jsx-runtime";
import { useRef as u } from "react";
import { CirclePlus as x, X as f } from "lucide-react";
import { Button as p } from "./button.js";
import { Checkbox as g } from "./checkbox.js";
import { Popover as b, PopoverTrigger as N, PopoverContent as y } from "./popover.js";
function $({ label: a, values: s, selected: o, onChange: c, render: n = (r) => r, counts: l }) {
  const r = o.length > 0, m = u(null);
  return (
    // The × is a sibling of the trigger (a button inside a button is invalid); this div carries the
    // chip's one-control look so the two buttons read as one chip.
    /* @__PURE__ */ i(
      "div",
      {
        className: `inline-flex h-8 items-center gap-0.5 rounded-md border pr-1 text-xs text-fg transition-colors ${r ? "border-solid border-accent/45 bg-accent/10 has-[[data-facet]:hover]:bg-accent/15" : "border-dashed border-border bg-bg has-[[data-facet]:hover]:bg-panel"}`,
        children: [
          /* @__PURE__ */ i(b, { children: [
            /* @__PURE__ */ t(N, { asChild: !0, children: /* @__PURE__ */ i(
              p,
              {
                ref: m,
                type: "button",
                variant: "ghost",
                className: "h-full gap-1.5 rounded-md px-2.5 text-xs hover:bg-transparent",
                "aria-label": `filter by ${a.toLowerCase()}`,
                "data-facet": a,
                children: [
                  r ? null : /* @__PURE__ */ t(x, { size: 14, className: "shrink-0 opacity-70" }),
                  a,
                  r ? /* @__PURE__ */ i("span", { className: "max-w-[200px] truncate text-muted", children: [
                    "· ",
                    o.map(n).join(", ")
                  ] }) : null
                ]
              }
            ) }),
            /* @__PURE__ */ t(y, { align: "start", className: "w-56 p-1.5", children: s.length === 0 ? /* @__PURE__ */ t("p", { className: "px-2 py-1.5 text-xs text-muted", children: "Nothing to filter on" }) : /* @__PURE__ */ t("ul", { role: "listbox", "aria-label": `${a} values`, "aria-multiselectable": !0, className: "flex flex-col", children: s.map((e) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ i("label", { className: "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-xs hover:bg-fg/[0.05]", children: [
              /* @__PURE__ */ t(
                g,
                {
                  checked: o.includes(e),
                  onChange: (d) => c(d.target.checked ? [...o, e] : o.filter((h) => h !== e)),
                  "aria-label": n(e)
                }
              ),
              /* @__PURE__ */ t("span", { className: "truncate", children: n(e) }),
              l && e in l ? /* @__PURE__ */ t("span", { className: "ml-auto font-mono text-caption tabular-nums text-muted", children: l[e].toLocaleString() }) : null
            ] }) }, e)) }) })
          ] }),
          r && /* @__PURE__ */ t(
            p,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "size-auto shrink-0 rounded-sm p-0.5 opacity-70 hover:bg-panel hover:opacity-100",
              "aria-label": `clear ${a.toLowerCase()} filter`,
              onClick: () => {
                var e;
                c([]), (e = m.current) == null || e.focus();
              },
              children: /* @__PURE__ */ t(f, { size: 14 })
            }
          )
        ]
      }
    )
  );
}
export {
  $ as FacetChip
};
