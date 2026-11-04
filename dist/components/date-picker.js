import { jsxs as s, jsx as o } from "react/jsx-runtime";
import * as m from "react";
import * as u from "@radix-ui/react-popover";
import { CalendarDays as L, ChevronLeft as M, ChevronRight as U } from "lucide-react";
import { cn as k } from "../lib/cn.js";
import { localToday as W, monthGrid as B, formatDay as P, addMonths as h, monthLabel as G, weekdayOf as H, addDays as c } from "../lib/date.js";
import { useOverlayContainer as Y } from "../lib/overlay.js";
import { Button as p } from "./button.js";
import { useDialogSurface as _ } from "./dialog.js";
const J = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
function oe({
  value: n,
  onChange: w,
  min: d,
  max: l,
  placeholder: z = "Pick a date",
  weekStart: g = 1,
  format: N = P,
  size: A = "md",
  disabled: S = !1,
  "aria-label": b,
  className: O
}) {
  const i = W(), [y, v] = m.useState(!1), [t, f] = m.useState(n || i), x = m.useRef(null), C = (e) => !!d && e < d || !!l && e > l, R = _(), T = Y(), $ = R ?? T, j = (e) => {
    e && f(n || (d && i < d ? d : l && i > l ? l : i)), v(e);
  }, D = (e) => {
    C(e) || (w(e), v(!1));
  };
  m.useLayoutEffect(() => {
    var e, r;
    y && ((r = (e = x.current) == null ? void 0 : e.querySelector(`[data-day="${t}"]`)) == null || r.focus());
  }, [y, t]);
  const E = (e) => {
    const r = (H(t) - g + 7) % 7, a = {
      ArrowLeft: () => c(t, -1),
      ArrowRight: () => c(t, 1),
      ArrowUp: () => c(t, -7),
      ArrowDown: () => c(t, 7),
      PageUp: () => h(t, -1),
      PageDown: () => h(t, 1),
      Home: () => c(t, -r),
      End: () => c(t, 6 - r)
    };
    a[e.key] && (e.preventDefault(), f(a[e.key]()));
  }, F = B(t, g), q = t.slice(0, 7), I = Array.from({ length: 7 }, (e, r) => J[(r + g) % 7]);
  return /* @__PURE__ */ s(u.Root, { open: y, onOpenChange: j, children: [
    /* @__PURE__ */ o(u.Trigger, { asChild: !0, children: /* @__PURE__ */ s(
      "button",
      {
        type: "button",
        disabled: S,
        "aria-label": b ? `${b}${n ? `: ${N(n)}` : ""}` : void 0,
        "data-slot": "date-picker-trigger",
        className: k(
          "inline-flex min-w-[9.5rem] items-center gap-2 rounded-md border border-border bg-bg px-2.5 text-left text-fg transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60 data-[state=open]:border-accent data-[state=open]:ring-2 data-[state=open]:ring-accent/20",
          A === "sm" ? "h-8 text-xs" : "h-9 text-sm",
          O
        ),
        children: [
          /* @__PURE__ */ o(L, { size: 14, className: "shrink-0 text-muted", "aria-hidden": !0 }),
          /* @__PURE__ */ o("span", { className: k("truncate", !n && "text-muted/60"), children: n ? N(n) : z })
        ]
      }
    ) }),
    /* @__PURE__ */ o(u.Portal, { container: $ ?? void 0, children: /* @__PURE__ */ s(
      u.Content,
      {
        "data-slot": "date-picker",
        role: "dialog",
        "aria-label": b ?? "Choose a date",
        align: "start",
        sideOffset: 4,
        collisionPadding: 8,
        onOpenAutoFocus: (e) => {
          var r, a;
          e.preventDefault(), (a = (r = x.current) == null ? void 0 : r.querySelector(`[data-day="${t}"]`)) == null || a.focus();
        },
        onKeyDown: E,
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
                onClick: () => f(h(t, -1)),
                children: /* @__PURE__ */ o(M, { "aria-hidden": !0 })
              }
            ),
            /* @__PURE__ */ o("span", { className: "text-sm font-semibold text-fg", children: G(t) }),
            /* @__PURE__ */ o(
              p,
              {
                variant: "ghost",
                size: "icon-sm",
                "aria-label": "Next month",
                onClick: () => f(h(t, 1)),
                children: /* @__PURE__ */ o(U, { "aria-hidden": !0 })
              }
            )
          ] }),
          /* @__PURE__ */ s("div", { ref: x, role: "grid", className: "grid grid-cols-7 gap-0.5", children: [
            I.map((e) => /* @__PURE__ */ o(
              "span",
              {
                role: "columnheader",
                className: "grid h-7 place-items-center text-caption font-semibold text-muted",
                children: e
              },
              e
            )),
            F.map((e) => {
              const r = e === n, a = C(e), K = e.slice(0, 7) !== q;
              return (
                // eslint-disable-next-line no-restricted-syntax -- a calendar cell, not a Button
                /* @__PURE__ */ o(
                  "button",
                  {
                    type: "button",
                    role: "gridcell",
                    "data-day": e,
                    tabIndex: e === t ? 0 : -1,
                    "aria-selected": r,
                    "aria-disabled": a || void 0,
                    "aria-label": P(e),
                    onClick: () => D(e),
                    className: k(
                      "grid h-8 place-items-center rounded-md tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                      r ? "bg-accent font-semibold text-on-solid" : a ? "cursor-not-allowed text-faint opacity-50" : "hover:bg-(--hover-wash)",
                      !r && !a && (K ? "text-faint" : "text-fg"),
                      !r && e === i && "ring-1 ring-inset ring-accent"
                    ),
                    children: Number(e.slice(8))
                  },
                  e
                )
              );
            })
          ] }),
          /* @__PURE__ */ s("div", { className: "flex justify-between border-t border-border pt-2", children: [
            /* @__PURE__ */ o(p, { variant: "ghost", size: "sm", disabled: C(i), onClick: () => D(i), children: "Today" }),
            n && /* @__PURE__ */ o(
              p,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  w(""), v(!1);
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
  oe as DatePicker
};
