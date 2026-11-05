import { jsxs as s, jsx as o } from "react/jsx-runtime";
import * as f from "react";
import * as u from "@radix-ui/react-popover";
import { CalendarDays as W, ChevronLeft as _, ChevronRight as B } from "lucide-react";
import { cn as N } from "../lib/cn.js";
import { localToday as G, monthGrid as H, formatDay as A, addMonths as h, monthLabel as z, weekdayOf as Y, addDays as c } from "../lib/date.js";
import { useOverlayContainer as J } from "../lib/overlay.js";
import { Button as p } from "./button.js";
import { useDialogSurface as Q } from "./dialog.js";
const V = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
function ae({
  value: a,
  onChange: k,
  min: d,
  max: l,
  placeholder: S = "Pick a date",
  weekStart: g = 1,
  format: D = A,
  size: O = "md",
  disabled: R = !1,
  "aria-label": b,
  className: T
}) {
  const i = G(), [y, v] = f.useState(!1), [r, m] = f.useState(a || i), x = f.useRef(null), w = (e) => !!d && e < d || !!l && e > l, $ = Q(), j = J(), E = $ ?? j, F = (e) => {
    e && m(a || (d && i < d ? d : l && i > l ? l : i)), v(e);
  }, P = (e) => {
    w(e) || (k(e), v(!1));
  };
  f.useLayoutEffect(() => {
    var e, t;
    y && ((t = (e = x.current) == null ? void 0 : e.querySelector(`[data-day="${r}"]`)) == null || t.focus());
  }, [y, r]);
  const q = (e) => {
    const t = (Y(r) - g + 7) % 7, n = {
      ArrowLeft: () => c(r, -1),
      ArrowRight: () => c(r, 1),
      ArrowUp: () => c(r, -7),
      ArrowDown: () => c(r, 7),
      PageUp: () => h(r, -1),
      PageDown: () => h(r, 1),
      Home: () => c(r, -t),
      End: () => c(r, 6 - t)
    };
    n[e.key] && (e.preventDefault(), m(n[e.key]()));
  }, I = H(r, g), K = Array.from({ length: 6 }, (e, t) => I.slice(t * 7, t * 7 + 7)), L = r.slice(0, 7), M = Array.from({ length: 7 }, (e, t) => V[(t + g) % 7]);
  return /* @__PURE__ */ s(u.Root, { open: y, onOpenChange: F, children: [
    /* @__PURE__ */ o(u.Trigger, { asChild: !0, children: /* @__PURE__ */ s(
      "button",
      {
        type: "button",
        disabled: R,
        "aria-label": b ? `${b}${a ? `: ${D(a)}` : ""}` : void 0,
        "data-slot": "date-picker-trigger",
        className: N(
          "inline-flex min-w-[9.5rem] items-center gap-2 rounded-md border border-border bg-bg px-2.5 text-left text-fg transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60 data-[state=open]:border-accent data-[state=open]:ring-2 data-[state=open]:ring-accent/20",
          O === "sm" ? "h-8 text-xs" : "h-9 text-sm",
          T
        ),
        children: [
          /* @__PURE__ */ o(W, { size: 14, className: "shrink-0 text-muted", "aria-hidden": !0 }),
          /* @__PURE__ */ o("span", { className: N("truncate", !a && "text-muted/60"), children: a ? D(a) : S })
        ]
      }
    ) }),
    /* @__PURE__ */ o(u.Portal, { container: E ?? void 0, children: /* @__PURE__ */ s(
      u.Content,
      {
        "data-slot": "date-picker",
        role: "dialog",
        "aria-label": b ?? "Choose a date",
        align: "start",
        sideOffset: 4,
        collisionPadding: 8,
        onOpenAutoFocus: (e) => {
          var t, n;
          e.preventDefault(), (n = (t = x.current) == null ? void 0 : t.querySelector(`[data-day="${r}"]`)) == null || n.focus();
        },
        onKeyDown: q,
        style: { zIndex: "var(--z-popover)" },
        className: "grid w-[264px] gap-2 rounded-md border border-border bg-panel p-3 text-xs shadow-(--elev-popover)",
        children: [
          /* @__PURE__ */ s("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ o(
              p,
              {
                variant: "ghost",
                size: "icon-sm",
                "aria-label": "Previous month",
                onClick: () => m(h(r, -1)),
                children: /* @__PURE__ */ o(_, { "aria-hidden": !0 })
              }
            ),
            /* @__PURE__ */ o("span", { className: "text-sm font-semibold text-fg", children: z(r) }),
            /* @__PURE__ */ o(
              p,
              {
                variant: "ghost",
                size: "icon-sm",
                "aria-label": "Next month",
                onClick: () => m(h(r, 1)),
                children: /* @__PURE__ */ o(B, { "aria-hidden": !0 })
              }
            )
          ] }),
          /* @__PURE__ */ s(
            "div",
            {
              ref: x,
              role: "grid",
              "aria-label": z(r),
              className: "grid grid-cols-7 gap-0.5",
              children: [
                /* @__PURE__ */ o("div", { role: "row", className: "contents", children: M.map((e) => /* @__PURE__ */ o(
                  "span",
                  {
                    role: "columnheader",
                    className: "grid h-7 place-items-center text-caption font-semibold text-muted",
                    children: e
                  },
                  e
                )) }),
                K.map((e) => /* @__PURE__ */ o("div", { role: "row", className: "contents", children: e.map((t) => {
                  const n = t === a, C = w(t), U = t.slice(0, 7) !== L;
                  return (
                    // eslint-disable-next-line no-restricted-syntax -- a calendar cell, not a Button
                    /* @__PURE__ */ o(
                      "button",
                      {
                        type: "button",
                        role: "gridcell",
                        "data-day": t,
                        tabIndex: t === r ? 0 : -1,
                        "aria-selected": n,
                        "aria-disabled": C || void 0,
                        "aria-label": A(t),
                        onClick: () => P(t),
                        className: N(
                          "grid h-8 place-items-center rounded-md tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                          n ? "bg-accent font-semibold text-on-solid" : C ? "cursor-not-allowed text-faint opacity-50" : "hover:bg-(--hover-wash)",
                          !n && !C && (U ? "text-faint" : "text-fg"),
                          !n && t === i && "ring-1 ring-inset ring-accent"
                        ),
                        children: Number(t.slice(8))
                      },
                      t
                    )
                  );
                }) }, e[0]))
              ]
            }
          ),
          /* @__PURE__ */ s("div", { className: "flex justify-between border-t border-border pt-2", children: [
            /* @__PURE__ */ o(p, { variant: "ghost", size: "sm", disabled: w(i), onClick: () => P(i), children: "Today" }),
            a && /* @__PURE__ */ o(
              p,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  k(""), v(!1);
                },
                children: "Clear"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
export {
  ae as DatePicker
};
