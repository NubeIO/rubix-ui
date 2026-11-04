import { jsx as r, jsxs as o, Fragment as _ } from "react/jsx-runtime";
import * as l from "react";
import * as x from "@radix-ui/react-popover";
import { Check as W, CirclePlus as Q, X as $, ChevronDown as X } from "lucide-react";
import { cn as c } from "../lib/cn.js";
import { useOverlayContainer as q } from "../lib/overlay.js";
import { useDialogSurface as B } from "./dialog.js";
function G(d, i) {
  if (!i) return !0;
  const s = i.toLowerCase();
  return d.value.toLowerCase().includes(s) || (d.label ?? "").toLowerCase().includes(s) || (d.description ?? "").toLowerCase().includes(s);
}
function V({
  options: d,
  value: i,
  onChange: s,
  placeholder: F = "— select —",
  "aria-label": m,
  allowCustom: g = !1,
  clearable: I = !1,
  disabled: v = !1,
  size: C = "md",
  renderValue: u,
  searchable: w = !0,
  chip: f,
  className: z
}) {
  const [p, h] = l.useState(!1), [a, R] = l.useState(""), [O, y] = l.useState(0), P = l.useRef(null), S = l.useRef(null), K = B(), M = q(), T = K ?? M, b = d.filter((e) => G(e, a)), n = d.find((e) => e.value === i);
  l.useEffect(() => {
    p && (R(""), y(0));
  }, [p]);
  const k = (e) => {
    s(e), h(!1);
  }, j = (e) => {
    if (e.key === "Escape") {
      h(!1);
      return;
    }
    if (e.key === "ArrowDown")
      e.preventDefault(), y((t) => Math.min(t + 1, b.length - 1));
    else if (e.key === "ArrowUp")
      e.preventDefault(), y((t) => Math.max(t - 1, 0));
    else if (e.key === "Enter") {
      e.preventDefault();
      const t = b[O];
      t ? k(t.value) : g && a.trim() && k(a.trim());
    }
  }, D = [];
  b.forEach((e, t) => {
    const N = D.find((U) => U.name === e.group);
    N ? N.items.push({ o: e, idx: t }) : D.push({ name: e.group, items: [{ o: e, idx: t }] });
  });
  const A = I && !v && i !== "", E = /* @__PURE__ */ r(x.Portal, { container: T, children: /* @__PURE__ */ o(
    x.Content,
    {
      "data-slot": "combobox-list",
      side: "bottom",
      align: "start",
      sideOffset: 4,
      collisionPadding: 8,
      style: {
        width: f !== void 0 ? "max-content" : "var(--radix-popover-trigger-width)",
        minWidth: f !== void 0 ? "var(--radix-popover-trigger-width)" : void 0,
        zIndex: "var(--z-popover)"
      },
      onOpenAutoFocus: (e) => {
        var t;
        e.preventDefault(), (t = w ? P.current : S.current) == null || t.focus();
      },
      className: c(
        "max-h-64 min-w-48 overflow-y-auto rounded-md border border-border bg-panel p-1 shadow-(--elev-popover)",
        f !== void 0 && "max-w-[min(40rem,calc(100vw-16px))]"
      ),
      children: [
        w && /* @__PURE__ */ r(
          "input",
          {
            ref: P,
            "aria-label": `${m} search`,
            className: "mb-1 h-7 w-full rounded-md border border-border bg-bg px-2 text-xs text-fg focus-visible:outline-none",
            placeholder: g ? "search or type…" : "search…",
            value: a,
            onChange: (e) => {
              R(e.target.value), y(0);
            },
            onKeyDown: j
          }
        ),
        /* @__PURE__ */ o(
          "ul",
          {
            ref: S,
            role: "listbox",
            "aria-label": `${m} options`,
            tabIndex: w ? void 0 : -1,
            onKeyDown: w ? void 0 : j,
            className: "focus-visible:outline-none",
            children: [
              b.length === 0 && !g && /* @__PURE__ */ r("li", { className: "px-2 py-1.5 text-sm text-muted", children: "no matches" }),
              b.length === 0 && g && a.trim() && /* @__PURE__ */ r("li", { children: /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  className: "min-h-8 w-full rounded-md px-2 py-1.5 text-left text-sm text-fg hover:bg-(--hover-wash)",
                  onClick: () => k(a.trim()),
                  children: [
                    "Use “",
                    a.trim(),
                    "”"
                  ]
                }
              ) }),
              D.map((e) => /* @__PURE__ */ o(l.Fragment, { children: [
                e.name && /* @__PURE__ */ r(
                  "li",
                  {
                    className: "px-2 pb-0.5 pt-1.5 text-caption font-semibold uppercase tracking-[0.08em] text-faint",
                    "aria-hidden": !0,
                    children: e.name
                  }
                ),
                e.items.map(({ o: t, idx: N }) => /* @__PURE__ */ r("li", { children: /* @__PURE__ */ o(
                  "button",
                  {
                    type: "button",
                    role: "option",
                    "aria-selected": t.value === i,
                    className: c(
                      "flex min-h-8 w-full items-start gap-1.5 rounded-md px-2 py-1.5 text-left text-sm text-fg hover:bg-(--hover-wash)",
                      N === O && "bg-bg"
                    ),
                    onClick: () => k(t.value),
                    children: [
                      t.swatch && /* @__PURE__ */ r(
                        "span",
                        {
                          className: "mt-0.5 inline-block h-3 w-3 shrink-0 rounded-full",
                          style: { background: t.swatch },
                          "aria-hidden": !0
                        }
                      ),
                      /* @__PURE__ */ o("span", { className: "min-w-0 flex-1", children: [
                        /* @__PURE__ */ r("span", { className: "block truncate", children: t.label ?? t.value }),
                        t.description && /* @__PURE__ */ r("span", { className: "block truncate text-caption text-muted", children: t.description })
                      ] }),
                      t.value === i && /* @__PURE__ */ r(W, { size: 12, className: "mt-0.5 shrink-0 text-accent", "aria-hidden": !0 })
                    ]
                  }
                ) }, t.value))
              ] }, e.name ?? "__ungrouped__"))
            ]
          }
        )
      ]
    }
  ) });
  return /* @__PURE__ */ r(x.Root, { open: p, onOpenChange: h, children: f !== void 0 ? /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "combobox-chip",
      className: c(
        "inline-flex h-8 items-center rounded-md border text-xs transition-colors",
        i !== "" ? "border-accent/45 bg-accent/10" : "border-dashed border-border bg-bg hover:bg-(--hover-wash)",
        z
      ),
      children: [
        /* @__PURE__ */ r(x.Trigger, { asChild: !0, children: /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            role: "combobox",
            "aria-expanded": p,
            "aria-label": m,
            disabled: v,
            "data-slot": "combobox-trigger",
            className: "inline-flex h-full items-center gap-1.5 rounded-md px-2.5 text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25 disabled:opacity-50",
            children: i !== "" ? /* @__PURE__ */ o(_, { children: [
              f,
              /* @__PURE__ */ o("span", { className: "max-w-[180px] truncate font-medium text-accent", children: [
                "·",
                " ",
                (u == null ? void 0 : u(i, n)) || (n ? n.label ?? n.value : i)
              ] })
            ] }) : /* @__PURE__ */ o(_, { children: [
              /* @__PURE__ */ r(Q, { size: 14, className: "shrink-0 opacity-70", "aria-hidden": !0 }),
              f
            ] })
          }
        ) }),
        i !== "" && !v && // eslint-disable-next-line no-restricted-syntax -- a tiny inline affordance, not a Button
        /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            "aria-label": `clear ${m}`,
            className: "mr-1 grid size-5 place-items-center rounded-[4px] text-muted hover:bg-(--hover-wash) hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30",
            onClick: () => {
              s(""), h(!1);
            },
            children: /* @__PURE__ */ r($, { size: 12, "aria-hidden": !0 })
          }
        ),
        E
      ]
    }
  ) : /* @__PURE__ */ o("div", { className: c("relative", z), children: [
    /* @__PURE__ */ r(x.Trigger, { asChild: !0, children: /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        role: "combobox",
        "aria-expanded": p,
        "aria-label": m,
        disabled: v,
        "data-slot": "combobox-trigger",
        className: c(
          // `pr-[9px]` plus the 1px border puts the chevron 10px from the field's OUTER right edge
          // at both heights (Rubix Chart Shading sheet §10, the combobox rule).
          // The field look Input and Select share (focus border + ring, disabled fade, the
          // `--pad-field-x` inset at both heights) so a Combobox and a Select line up in one form.
          "flex w-full items-center justify-between gap-1 rounded-md border border-border bg-bg py-0 pr-[9px] pl-2.5 text-left text-fg transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60",
          C === "sm" ? "h-8 text-xs" : "h-9 text-sm"
        ),
        children: [
          /* @__PURE__ */ o(
            "span",
            {
              className: c(
                "flex min-w-0 items-center gap-1.5 truncate",
                !n && "text-muted",
                // Room for the clear button, which sits between the label and the chevron. Reserved on
                // the LABEL rather than as trigger padding, so the chevron stays at the right edge
                // whether or not there is a value to clear. The text stops 8px before the clear
                // button's hit area: that area starts 43px (sm) or 45px (md) from the outer edge and
                // this box ends 26px from it.
                A && (C === "sm" ? "pr-[25px]" : "pr-[27px]")
              ),
              children: [
                (n == null ? void 0 : n.swatch) && /* @__PURE__ */ r(
                  "span",
                  {
                    className: "inline-block h-3 w-3 shrink-0 rounded-full",
                    style: { background: n.swatch },
                    "aria-hidden": !0
                  }
                ),
                i !== "" && (u == null ? void 0 : u(i, n)) || (n ? n.label ?? n.value : i || F)
              ]
            }
          ),
          /* @__PURE__ */ r(X, { size: 12, strokeWidth: 3, className: "shrink-0 text-faint", "aria-hidden": !0 })
        ]
      }
    ) }),
    A && // A sibling (not nested, the trigger is a <button>), absolutely positioned over the label's
    // reserved right pad, LEFT of the chevron. From the field's outer right edge: the chevron is
    // at 10 to 22px, this 12px icon is 5px left of it at 27 to 39px, and the hit area is centred
    // on the icon: 20 by 20 at 32px tall, 24 by 24 at 36px (Rubix Chart Shading sheet §10). It
    // reaches into the 5px gap and wins there; anywhere outside it opens the list.
    // Clears to "" (none) without opening the list.
    // eslint-disable-next-line no-restricted-syntax -- a tiny inline affordance, not a Button
    /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        "aria-label": `clear ${m}`,
        className: c(
          "absolute top-1/2 flex -translate-y-1/2 items-center justify-center rounded-[4px] text-faint hover:bg-[hsl(var(--fg)/0.06)] hover:text-fg-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30",
          C === "sm" ? "right-[23px] h-5 w-5" : "right-[21px] h-6 w-6"
        ),
        onClick: () => {
          s(""), h(!1);
        },
        children: /* @__PURE__ */ r($, { size: 12, "aria-hidden": !0 })
      }
    ),
    E
  ] }) });
}
export {
  V as Combobox
};
