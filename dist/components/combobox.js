import { jsx as r, jsxs as a } from "react/jsx-runtime";
import * as c from "react";
import * as v from "@radix-ui/react-popover";
import { ChevronDown as F, X as M, Check as U } from "lucide-react";
import { cn as u } from "../lib/cn.js";
import { useOverlayContainer as I } from "../lib/overlay.js";
import { useDialogSurface as K } from "./dialog.js";
function L(o, n) {
  if (!n) return !0;
  const l = n.toLowerCase();
  return o.value.toLowerCase().includes(l) || (o.label ?? "").toLowerCase().includes(l) || (o.description ?? "").toLowerCase().includes(l);
}
function B({
  options: o,
  value: n,
  onChange: l,
  placeholder: j = "— select —",
  "aria-label": m,
  allowCustom: p = !1,
  clearable: A = !1,
  disabled: N = !1,
  size: w = "md",
  renderValue: y,
  className: E
}) {
  const [f, h] = c.useState(!1), [i, C] = c.useState(""), [D, b] = c.useState(0), O = c.useRef(null), P = K(), R = I(), _ = P ?? R, d = o.filter((e) => L(e, i)), s = o.find((e) => e.value === n);
  c.useEffect(() => {
    f && (C(""), b(0));
  }, [f]);
  const x = (e) => {
    l(e), h(!1);
  }, z = (e) => {
    if (e.key === "Escape") {
      h(!1);
      return;
    }
    if (e.key === "ArrowDown")
      e.preventDefault(), b((t) => Math.min(t + 1, d.length - 1));
    else if (e.key === "ArrowUp")
      e.preventDefault(), b((t) => Math.max(t - 1, 0));
    else if (e.key === "Enter") {
      e.preventDefault();
      const t = d[D];
      t ? x(t.value) : p && i.trim() && x(i.trim());
    }
  }, k = [];
  d.forEach((e, t) => {
    const g = k.find(($) => $.name === e.group);
    g ? g.items.push({ o: e, idx: t }) : k.push({ name: e.group, items: [{ o: e, idx: t }] });
  });
  const S = A && !N && n !== "";
  return /* @__PURE__ */ r(v.Root, { open: f, onOpenChange: h, children: /* @__PURE__ */ a("div", { className: u("relative", E), children: [
    /* @__PURE__ */ r(v.Trigger, { asChild: !0, children: /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        role: "combobox",
        "aria-expanded": f,
        "aria-label": m,
        disabled: N,
        "data-slot": "combobox-trigger",
        className: u(
          // `pr-[9px]` plus the 1px border puts the chevron 10px from the field's OUTER right edge
          // at both heights (Rubix Chart Shading sheet §10, the combobox rule).
          // The field look Input and Select share (focus border + ring, disabled fade, the
          // `--pad-field-x` inset at both heights) so a Combobox and a Select line up in one form.
          "flex w-full items-center justify-between gap-1 rounded-md border border-border bg-bg py-0 pr-[9px] pl-2.5 text-left text-fg transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60",
          w === "sm" ? "h-8 text-xs" : "h-9 text-sm"
        ),
        children: [
          /* @__PURE__ */ a(
            "span",
            {
              className: u(
                "flex min-w-0 items-center gap-1.5 truncate",
                !s && "text-muted",
                // Room for the clear button, which sits between the label and the chevron. Reserved on
                // the LABEL rather than as trigger padding, so the chevron stays at the right edge
                // whether or not there is a value to clear. The text stops 8px before the clear
                // button's hit area: that area starts 43px (sm) or 45px (md) from the outer edge and
                // this box ends 26px from it.
                S && (w === "sm" ? "pr-[25px]" : "pr-[27px]")
              ),
              children: [
                (s == null ? void 0 : s.swatch) && /* @__PURE__ */ r(
                  "span",
                  {
                    className: "inline-block h-3 w-3 shrink-0 rounded-full",
                    style: { background: s.swatch },
                    "aria-hidden": !0
                  }
                ),
                n !== "" && (y == null ? void 0 : y(n, s)) || (s ? s.label ?? s.value : n || j)
              ]
            }
          ),
          /* @__PURE__ */ r(F, { size: 12, strokeWidth: 3, className: "shrink-0 text-faint", "aria-hidden": !0 })
        ]
      }
    ) }),
    S && // A sibling (not nested, the trigger is a <button>), absolutely positioned over the label's
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
        className: u(
          "absolute top-1/2 flex -translate-y-1/2 items-center justify-center rounded-[4px] text-faint hover:bg-[hsl(var(--fg)/0.06)] hover:text-fg-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30",
          w === "sm" ? "right-[23px] h-5 w-5" : "right-[21px] h-6 w-6"
        ),
        onClick: () => {
          l(""), h(!1);
        },
        children: /* @__PURE__ */ r(M, { size: 12, "aria-hidden": !0 })
      }
    ),
    /* @__PURE__ */ r(v.Portal, { container: _, children: /* @__PURE__ */ a(
      v.Content,
      {
        "data-slot": "combobox-list",
        side: "bottom",
        align: "start",
        sideOffset: 4,
        collisionPadding: 8,
        style: { width: "var(--radix-popover-trigger-width)", zIndex: "var(--z-popover)" },
        onOpenAutoFocus: (e) => {
          var t;
          e.preventDefault(), (t = O.current) == null || t.focus();
        },
        className: "max-h-64 min-w-48 overflow-y-auto rounded-md border border-border bg-panel p-1 shadow-(--elev-popover)",
        children: [
          /* @__PURE__ */ r(
            "input",
            {
              ref: O,
              "aria-label": `${m} search`,
              className: "mb-1 h-7 w-full rounded-md border border-border bg-bg px-2 text-xs text-fg focus-visible:outline-none",
              placeholder: p ? "search or type…" : "search…",
              value: i,
              onChange: (e) => {
                C(e.target.value), b(0);
              },
              onKeyDown: z
            }
          ),
          /* @__PURE__ */ a("ul", { role: "listbox", "aria-label": `${m} options`, children: [
            d.length === 0 && !p && /* @__PURE__ */ r("li", { className: "px-2 py-1.5 text-sm text-muted", children: "no matches" }),
            d.length === 0 && p && i.trim() && /* @__PURE__ */ r("li", { children: /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                className: "min-h-8 w-full rounded-md px-2 py-1.5 text-left text-sm text-fg hover:bg-(--hover-wash)",
                onClick: () => x(i.trim()),
                children: [
                  "Use “",
                  i.trim(),
                  "”"
                ]
              }
            ) }),
            k.map((e) => /* @__PURE__ */ a(c.Fragment, { children: [
              e.name && /* @__PURE__ */ r(
                "li",
                {
                  className: "px-2 pb-0.5 pt-1.5 text-caption font-semibold uppercase tracking-[0.08em] text-faint",
                  "aria-hidden": !0,
                  children: e.name
                }
              ),
              e.items.map(({ o: t, idx: g }) => /* @__PURE__ */ r("li", { children: /* @__PURE__ */ a(
                "button",
                {
                  type: "button",
                  role: "option",
                  "aria-selected": t.value === n,
                  className: u(
                    "flex min-h-8 w-full items-start gap-1.5 rounded-md px-2 py-1.5 text-left text-sm text-fg hover:bg-(--hover-wash)",
                    g === D && "bg-bg"
                  ),
                  onClick: () => x(t.value),
                  children: [
                    t.swatch && /* @__PURE__ */ r(
                      "span",
                      {
                        className: "mt-0.5 inline-block h-3 w-3 shrink-0 rounded-full",
                        style: { background: t.swatch },
                        "aria-hidden": !0
                      }
                    ),
                    /* @__PURE__ */ a("span", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ r("span", { className: "block truncate", children: t.label ?? t.value }),
                      t.description && /* @__PURE__ */ r("span", { className: "block truncate text-caption text-muted", children: t.description })
                    ] }),
                    t.value === n && /* @__PURE__ */ r(U, { size: 12, className: "mt-0.5 shrink-0 text-accent", "aria-hidden": !0 })
                  ]
                }
              ) }, t.value))
            ] }, e.name ?? "__ungrouped__"))
          ] })
        ]
      }
    ) })
  ] }) });
}
export {
  B as Combobox
};
