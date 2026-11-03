import { clsx as J } from "clsx";
import { extendTailwindMerge as Y } from "tailwind-merge";
import { jsx as a, jsxs as c } from "react/jsx-runtime";
import * as s from "react";
import { cva as A } from "class-variance-authority";
import { Slot as Z } from "@radix-ui/react-slot";
import { Loader2 as ee, X as O, ChevronDown as te, Check as ae, CheckIcon as E, CircleIcon as F, ChevronRightIcon as U } from "lucide-react";
import * as j from "@radix-ui/react-collapsible";
import * as N from "@radix-ui/react-popover";
import * as p from "@radix-ui/react-dialog";
import * as m from "@radix-ui/react-dropdown-menu";
import * as f from "@radix-ui/react-menubar";
import * as z from "@radix-ui/react-scroll-area";
import * as R from "@radix-ui/react-tooltip";
const re = Y({
  extend: {
    theme: {
      text: ["micro", "caption", "detail", "value-lg", "value-xl"],
      radius: ["panel"]
    }
  }
});
function n(...e) {
  return re(J(e));
}
const V = s.createContext(null);
function Ce({ portalContainer: e = null, children: t }) {
  return /* @__PURE__ */ a(V.Provider, { value: e, children: t });
}
function C() {
  return s.useContext(V) ?? void 0;
}
const ne = A(
  "relative flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-sm [&>svg]:mt-0.5 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-border bg-card/60 text-fg [&>svg]:text-muted",
        destructive: "border-destructive/25 bg-destructive/10 text-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function ze({
  className: e,
  variant: t,
  ...r
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      role: "alert",
      "data-slot": "alert",
      className: n(ne({ variant: t }), e),
      ...r
    }
  );
}
function Se({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "alert-title",
      className: n("font-medium leading-relaxed tracking-tight", e),
      ...t
    }
  );
}
function ke({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "alert-description",
      className: n("text-sm leading-relaxed [&_p]:leading-relaxed", e),
      ...t
    }
  );
}
const oe = A(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-accent text-accent-foreground",
        secondary: "border-border bg-bg text-muted",
        outline: "border-border bg-bg text-muted",
        destructive: "border-destructive/25 bg-destructive/10 text-destructive",
        // Semantic status tones (theme-appearance widened palette). `success`/`warning` are the
        // fixed semantic hues; `accent2` is the secondary accent — all follow the theme by token.
        success: "border-success/25 bg-success/10 text-success",
        warning: "border-warning/30 bg-warning/10 text-warning",
        info: "border-info/25 bg-info/10 text-info",
        accent2: "border-accent-2/25 bg-accent-2/10 text-accent-2"
      },
      // Square for a status in a row, pill for a fact in chrome (a count, a scope).
      pill: { true: "rounded-full", false: "" },
      // `count` is the number beside a nav row or a lane tab: a 16px mono pill, always neutral.
      size: {
        default: "",
        count: "h-4 rounded-full border-transparent bg-border/60 px-1.5 py-0 font-mono text-micro font-normal leading-4 text-muted tabular-nums"
      }
    },
    defaultVariants: {
      variant: "default",
      pill: !1,
      size: "default"
    }
  }
);
function De({
  className: e,
  variant: t,
  pill: r,
  size: o,
  ...u
}) {
  return /* @__PURE__ */ a(
    "span",
    {
      "data-slot": "badge",
      className: n(oe({ variant: t, pill: r, size: o }), e),
      ...u
    }
  );
}
const se = A(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // The default chrome reads the `--btn-*` vars (globals.css) so a look can swap the house
        // tinted wash for stock shadcn's solid primary via `data-buttons` — no variant branch here.
        default: "border border-(--btn-border) bg-(--btn-bg) text-(--btn-fg) hover:bg-(--btn-bg-hover) active:bg-(--btn-bg-active)",
        solid: "bg-accent text-bg hover:bg-accent/90",
        outline: "border border-border bg-bg text-fg hover:bg-panel",
        ghost: "hover:bg-(--hover-wash) hover:text-fg",
        destructive: "border border-destructive/25 bg-destructive/10 text-destructive hover:bg-destructive/15 active:bg-destructive/20"
      },
      size: {
        default: "h-9 px-3 py-2",
        sm: "h-8 gap-1.5 px-3 text-xs",
        lg: "h-10 px-4",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Re = s.forwardRef(function({ className: t, variant: r, size: o, asChild: u = !1, ...d }, g) {
  return /* @__PURE__ */ a(
    u ? Z : "button",
    {
      ref: g,
      "data-btn": o ?? "default",
      className: n(se({ variant: r, size: o, className: t })),
      ...d
    }
  );
});
function Te({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card",
      "data-panel": "",
      className: n("flex flex-col rounded-lg border border-border bg-card text-fg", e),
      ...t
    }
  );
}
function Me({ className: e, ...t }) {
  return /* @__PURE__ */ a("div", { "data-slot": "card-header", className: n("flex flex-col gap-1 p-4", e), ...t });
}
function Pe({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-title",
      className: n("text-sm font-semibold leading-none", e),
      ...t
    }
  );
}
function Ie({ className: e, ...t }) {
  return /* @__PURE__ */ a("div", { "data-slot": "card-description", className: n("text-xs text-muted", e), ...t });
}
function _e({ className: e, ...t }) {
  return /* @__PURE__ */ a("div", { "data-slot": "card-content", className: n("p-4 pt-0", e), ...t });
}
function Ae({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-footer",
      className: n("flex items-center p-4 pt-0", e),
      ...t
    }
  );
}
function Oe({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "input",
    {
      type: "checkbox",
      "data-slot": "checkbox",
      className: n(
        "h-4 w-4 shrink-0 cursor-pointer rounded-md border-border accent-[hsl(var(--accent))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ...t
    }
  );
}
const ie = s.forwardRef(
  ({ className: e, type: t, ...r }, o) => /* @__PURE__ */ a(
    "input",
    {
      ref: o,
      type: t,
      "data-slot": "input",
      className: n(
        "flex h-9 w-full min-w-0 rounded-md border border-border bg-bg px-2.5 py-1.5 text-sm text-fg transition-colors placeholder:text-muted/60 selection:bg-accent/20 selection:text-fg focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60",
        e
      ),
      ...r
    }
  )
);
ie.displayName = "Input";
const je = s.forwardRef(function({ className: t, ...r }, o) {
  return /* @__PURE__ */ a(
    "label",
    {
      ref: o,
      "data-slot": "label",
      className: n(
        "text-sm font-medium leading-none text-fg peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        t
      ),
      ...r
    }
  );
}), Ge = s.forwardRef(function({ className: t, orientation: r = "horizontal", decorative: o = !0, ...u }, d) {
  return /* @__PURE__ */ a(
    "div",
    {
      ref: d,
      "data-slot": "separator",
      role: o ? "none" : "separator",
      "aria-orientation": o ? void 0 : r,
      className: n(
        "shrink-0 bg-border",
        r === "horizontal" ? "h-px w-full" : "h-full w-px",
        t
      ),
      ...u
    }
  );
});
function Le({ className: e, ...t }) {
  return /* @__PURE__ */ a("div", { className: n("animate-pulse rounded-md bg-panel-3", e), ...t });
}
function Be({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    ee,
    {
      "data-slot": "spinner",
      "aria-hidden": t["aria-label"] ? void 0 : !0,
      className: n("size-3.5 shrink-0 animate-spin", e),
      ...t
    }
  );
}
const He = s.forwardRef(function({ className: t, checked: r, defaultChecked: o, onCheckedChange: u, disabled: d, onClick: g, ...v }, x) {
  const b = r !== void 0, [I, S] = s.useState(o ?? !1), h = b ? r : I;
  return /* @__PURE__ */ a(
    "button",
    {
      ref: x,
      type: "button",
      role: "switch",
      "aria-checked": h,
      "data-slot": "switch",
      "data-state": h ? "checked" : "unchecked",
      disabled: d,
      onClick: (w) => {
        g == null || g(w);
        const k = !h;
        b || S(k), u == null || u(k);
      },
      className: n(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50",
        h ? "bg-accent" : "bg-border",
        t
      ),
      ...v,
      children: /* @__PURE__ */ a(
        "span",
        {
          "aria-hidden": !0,
          className: n(
            "pointer-events-none block h-4 w-4 rounded-full bg-bg shadow-sm ring-0 transition-transform",
            h ? "translate-x-4" : "translate-x-0.5"
          )
        }
      )
    }
  );
});
function Ee({ className: e, ...t }) {
  return /* @__PURE__ */ a("div", { "data-slot": "table-container", className: "relative w-full overflow-x-auto", children: /* @__PURE__ */ a(
    "table",
    {
      "data-slot": "table",
      className: n("w-full caption-bottom border-collapse text-sm text-fg", e),
      ...t
    }
  ) });
}
function Fe({
  className: e,
  sticky: t,
  ...r
}) {
  return /* @__PURE__ */ a(
    "thead",
    {
      "data-slot": "table-header",
      className: n(
        "border-b border-border bg-card/40 [&_tr]:border-b",
        t && "sticky top-0 z-10 bg-panel shadow-[0_1px_0_hsl(var(--border))]",
        e
      ),
      ...r
    }
  );
}
function Ue({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "tbody",
    {
      "data-slot": "table-body",
      className: n("[&_tr:last-child]:border-0", e),
      ...t
    }
  );
}
function Ve({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "tr",
    {
      "data-slot": "table-row",
      className: n(
        "border-b border-border transition-colors hover:bg-bg/60 data-[state=selected]:bg-accent/10",
        e
      ),
      ...t
    }
  );
}
function $e({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "th",
    {
      "data-slot": "table-head",
      className: n(
        "h-9 px-3 text-left align-middle text-caption font-semibold uppercase tracking-[0.06em] text-muted",
        e
      ),
      ...t
    }
  );
}
function Ke({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "td",
    {
      "data-slot": "table-cell",
      className: n("px-3 py-2 align-middle text-xs text-fg", e),
      ...t
    }
  );
}
const Qe = s.forwardRef(
  function({ className: t, ...r }, o) {
    return /* @__PURE__ */ a(
      "textarea",
      {
        ref: o,
        "data-slot": "textarea",
        className: n(
          "flex w-full min-w-0 rounded-md border border-border bg-bg px-2.5 py-2 text-sm leading-5 font-mono text-fg transition-colors placeholder:text-muted/60 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60",
          t
        ),
        ...r
      }
    );
  }
), We = j.Root, Xe = j.CollapsibleTrigger, qe = j.CollapsibleContent, G = s.createContext(null);
function le() {
  return s.useContext(G);
}
function Je({ ...e }) {
  return /* @__PURE__ */ a(p.Root, { ...e });
}
function Ye({ ...e }) {
  return /* @__PURE__ */ a(p.Trigger, { ...e });
}
function de({
  container: e,
  ...t
}) {
  const r = C();
  return /* @__PURE__ */ a(p.Portal, { container: e ?? r, ...t });
}
function Ze({ ...e }) {
  return /* @__PURE__ */ a(p.Close, { ...e });
}
const ce = s.forwardRef(function({ className: t, ...r }, o) {
  return /* @__PURE__ */ a(
    p.Overlay,
    {
      ref: o,
      className: n("fixed inset-0 z-50 bg-overlay/60 animate-in fade-in-0", t),
      ...r
    }
  );
}), et = s.forwardRef(function({ className: t, children: r, showClose: o = !0, ...u }, d) {
  const [g, v] = s.useState(null), x = s.useCallback(
    (b) => {
      v(b), typeof d == "function" ? d(b) : d && (d.current = b);
    },
    [d]
  );
  return /* @__PURE__ */ c(de, { children: [
    /* @__PURE__ */ a(ce, {}),
    /* @__PURE__ */ c(
      p.Content,
      {
        ref: x,
        "data-panel": "",
        className: n(
          "fixed left-1/2 top-1/2 z-50 flex max-h-[85vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-y-auto rounded-lg border border-border bg-panel p-4 text-fg shadow-(--elev-dialog) duration-200 animate-in fade-in-0 zoom-in-95",
          t
        ),
        ...u,
        children: [
          /* @__PURE__ */ a(G.Provider, { value: g, children: r }),
          o && /* @__PURE__ */ c(p.Close, { className: "absolute right-4 top-4 rounded-sm text-muted opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25", children: [
            /* @__PURE__ */ a(O, { className: "h-4 w-4" }),
            /* @__PURE__ */ a("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
});
function tt({ className: e, ...t }) {
  return /* @__PURE__ */ a("div", { className: n("flex flex-col gap-1.5", e), ...t });
}
function at({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: n("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", e),
      ...t
    }
  );
}
const rt = s.forwardRef(function({ className: t, ...r }, o) {
  return /* @__PURE__ */ a(
    p.Title,
    {
      ref: o,
      className: n("text-sm font-semibold text-fg", t),
      ...r
    }
  );
}), nt = s.forwardRef(function({ className: t, ...r }, o) {
  return /* @__PURE__ */ a(
    p.Description,
    {
      ref: o,
      className: n("text-xs text-muted", t),
      ...r
    }
  );
});
function ue(e, t) {
  if (!t) return !0;
  const r = t.toLowerCase();
  return e.value.toLowerCase().includes(r) || (e.label ?? "").toLowerCase().includes(r) || (e.description ?? "").toLowerCase().includes(r);
}
function ot({
  options: e,
  value: t,
  onChange: r,
  placeholder: o = "— select —",
  "aria-label": u,
  allowCustom: d = !1,
  clearable: g = !1,
  disabled: v = !1,
  size: x = "md",
  renderValue: b,
  className: I
}) {
  const [S, h] = s.useState(!1), [w, k] = s.useState(""), [L, T] = s.useState(0), B = s.useRef(null), K = le(), Q = C(), W = K ?? Q, D = e.filter((i) => ue(i, w)), y = e.find((i) => i.value === t);
  s.useEffect(() => {
    S && (k(""), T(0));
  }, [S]);
  const M = (i) => {
    r(i), h(!1);
  }, X = (i) => {
    if (i.key === "Escape") {
      h(!1);
      return;
    }
    if (i.key === "ArrowDown")
      i.preventDefault(), T((l) => Math.min(l + 1, D.length - 1));
    else if (i.key === "ArrowUp")
      i.preventDefault(), T((l) => Math.max(l - 1, 0));
    else if (i.key === "Enter") {
      i.preventDefault();
      const l = D[L];
      l ? M(l.value) : d && w.trim() && M(w.trim());
    }
  }, _ = [];
  D.forEach((i, l) => {
    const P = _.find((q) => q.name === i.group);
    P ? P.items.push({ o: i, idx: l }) : _.push({ name: i.group, items: [{ o: i, idx: l }] });
  });
  const H = g && !v && t !== "";
  return /* @__PURE__ */ a(N.Root, { open: S, onOpenChange: h, children: /* @__PURE__ */ c("div", { className: n("relative", I), children: [
    /* @__PURE__ */ a(N.Trigger, { asChild: !0, children: /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        role: "combobox",
        "aria-expanded": S,
        "aria-label": u,
        disabled: v,
        "data-slot": "combobox-trigger",
        className: n(
          // `pr-[9px]` plus the 1px border puts the chevron 10px from the field's OUTER right edge
          // at both heights (Rubix Chart Shading sheet §10, the combobox rule).
          // The field look Input and Select share (focus border + ring, disabled fade, the
          // `--pad-field-x` inset at both heights) so a Combobox and a Select line up in one form.
          "flex w-full items-center justify-between gap-1 rounded-md border border-border bg-bg py-0 pr-[9px] pl-2.5 text-left text-fg transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60",
          x === "sm" ? "h-8 text-xs" : "h-9 text-sm"
        ),
        children: [
          /* @__PURE__ */ c(
            "span",
            {
              className: n(
                "flex min-w-0 items-center gap-1.5 truncate",
                !y && "text-muted",
                // Room for the clear button, which sits between the label and the chevron. Reserved on
                // the LABEL rather than as trigger padding, so the chevron stays at the right edge
                // whether or not there is a value to clear. The text stops 8px before the clear
                // button's hit area: that area starts 43px (sm) or 45px (md) from the outer edge and
                // this box ends 26px from it.
                H && (x === "sm" ? "pr-[25px]" : "pr-[27px]")
              ),
              children: [
                (y == null ? void 0 : y.swatch) && /* @__PURE__ */ a(
                  "span",
                  {
                    className: "inline-block h-3 w-3 shrink-0 rounded-full",
                    style: { background: y.swatch },
                    "aria-hidden": !0
                  }
                ),
                t !== "" && (b == null ? void 0 : b(t, y)) || (y ? y.label ?? y.value : t || o)
              ]
            }
          ),
          /* @__PURE__ */ a(te, { size: 12, strokeWidth: 3, className: "shrink-0 text-faint", "aria-hidden": !0 })
        ]
      }
    ) }),
    H && // A sibling (not nested, the trigger is a <button>), absolutely positioned over the label's
    // reserved right pad, LEFT of the chevron. From the field's outer right edge: the chevron is
    // at 10 to 22px, this 12px icon is 5px left of it at 27 to 39px, and the hit area is centred
    // on the icon: 20 by 20 at 32px tall, 24 by 24 at 36px (Rubix Chart Shading sheet §10). It
    // reaches into the 5px gap and wins there; anywhere outside it opens the list.
    // Clears to "" (none) without opening the list.
    // eslint-disable-next-line no-restricted-syntax -- a tiny inline affordance, not a Button
    /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        "aria-label": `clear ${u}`,
        className: n(
          "absolute top-1/2 flex -translate-y-1/2 items-center justify-center rounded-[4px] text-faint hover:bg-[hsl(var(--fg)/0.06)] hover:text-fg-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30",
          x === "sm" ? "right-[23px] h-5 w-5" : "right-[21px] h-6 w-6"
        ),
        onClick: () => {
          r(""), h(!1);
        },
        children: /* @__PURE__ */ a(O, { size: 12, "aria-hidden": !0 })
      }
    ),
    /* @__PURE__ */ a(N.Portal, { container: W, children: /* @__PURE__ */ c(
      N.Content,
      {
        "data-slot": "combobox-list",
        side: "bottom",
        align: "start",
        sideOffset: 4,
        collisionPadding: 8,
        style: { width: "var(--radix-popover-trigger-width)", zIndex: "var(--z-popover)" },
        onOpenAutoFocus: (i) => {
          var l;
          i.preventDefault(), (l = B.current) == null || l.focus();
        },
        className: "max-h-64 min-w-48 overflow-y-auto rounded-md border border-border bg-panel p-1 shadow-(--elev-popover)",
        children: [
          /* @__PURE__ */ a(
            "input",
            {
              ref: B,
              "aria-label": `${u} search`,
              className: "mb-1 h-7 w-full rounded-md border border-border bg-bg px-2 text-xs text-fg focus-visible:outline-none",
              placeholder: d ? "search or type…" : "search…",
              value: w,
              onChange: (i) => {
                k(i.target.value), T(0);
              },
              onKeyDown: X
            }
          ),
          /* @__PURE__ */ c("ul", { role: "listbox", "aria-label": `${u} options`, children: [
            D.length === 0 && !d && /* @__PURE__ */ a("li", { className: "px-2 py-1.5 text-sm text-muted", children: "no matches" }),
            D.length === 0 && d && w.trim() && /* @__PURE__ */ a("li", { children: /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                className: "min-h-8 w-full rounded-md px-2 py-1.5 text-left text-sm text-fg hover:bg-(--hover-wash)",
                onClick: () => M(w.trim()),
                children: [
                  "Use “",
                  w.trim(),
                  "”"
                ]
              }
            ) }),
            _.map((i) => /* @__PURE__ */ c(s.Fragment, { children: [
              i.name && /* @__PURE__ */ a(
                "li",
                {
                  className: "px-2 pb-0.5 pt-1.5 text-caption font-semibold uppercase tracking-[0.08em] text-faint",
                  "aria-hidden": !0,
                  children: i.name
                }
              ),
              i.items.map(({ o: l, idx: P }) => /* @__PURE__ */ a("li", { children: /* @__PURE__ */ c(
                "button",
                {
                  type: "button",
                  role: "option",
                  "aria-selected": l.value === t,
                  className: n(
                    "flex min-h-8 w-full items-start gap-1.5 rounded-md px-2 py-1.5 text-left text-sm text-fg hover:bg-(--hover-wash)",
                    P === L && "bg-bg"
                  ),
                  onClick: () => M(l.value),
                  children: [
                    l.swatch && /* @__PURE__ */ a(
                      "span",
                      {
                        className: "mt-0.5 inline-block h-3 w-3 shrink-0 rounded-full",
                        style: { background: l.swatch },
                        "aria-hidden": !0
                      }
                    ),
                    /* @__PURE__ */ c("span", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ a("span", { className: "block truncate", children: l.label ?? l.value }),
                      l.description && /* @__PURE__ */ a("span", { className: "block truncate text-caption text-muted", children: l.description })
                    ] }),
                    l.value === t && /* @__PURE__ */ a(ae, { size: 12, className: "mt-0.5 shrink-0 text-accent", "aria-hidden": !0 })
                  ]
                }
              ) }, l.value))
            ] }, i.name ?? "__ungrouped__"))
          ] })
        ]
      }
    ) })
  ] }) });
}
function st({ ...e }) {
  return /* @__PURE__ */ a(m.Root, { "data-slot": "dropdown-menu", ...e });
}
function it({
  ...e
}) {
  return /* @__PURE__ */ a(m.Trigger, { "data-slot": "dropdown-menu-trigger", ...e });
}
function lt({
  container: e,
  ...t
}) {
  const r = C();
  return /* @__PURE__ */ a(m.Portal, { container: e ?? r, ...t });
}
function dt({
  className: e,
  sideOffset: t = 4,
  ...r
}) {
  return /* @__PURE__ */ a(m.Portal, { container: C(), children: /* @__PURE__ */ a(
    m.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: n(
        "bg-panel text-fg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-(--z-popover) max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border border-border p-1 shadow-(--elev-popover)",
        e
      ),
      ...r
    }
  ) });
}
function ct({ ...e }) {
  return /* @__PURE__ */ a(m.Group, { "data-slot": "dropdown-menu-group", ...e });
}
function ut({
  className: e,
  inset: t,
  variant: r = "default",
  ...o
}) {
  return /* @__PURE__ */ a(
    m.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": r,
      className: n(
        "focus:bg-(--hover-wash) data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[inset]:pl-8 relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:inline-flex",
        e
      ),
      ...o
    }
  );
}
function ft({
  className: e,
  children: t,
  checked: r,
  ...o
}) {
  return /* @__PURE__ */ c(
    m.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      className: n(
        "focus:bg-(--hover-wash) relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:inline-flex",
        e
      ),
      checked: r,
      ...o,
      children: [
        /* @__PURE__ */ a("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ a(m.ItemIndicator, { children: /* @__PURE__ */ a(E, { className: "size-4" }) }) }),
        t
      ]
    }
  );
}
function mt({
  ...e
}) {
  return /* @__PURE__ */ a(m.RadioGroup, { ...e });
}
function pt({
  className: e,
  children: t,
  ...r
}) {
  return /* @__PURE__ */ c(
    m.RadioItem,
    {
      className: n(
        "focus:bg-(--hover-wash) relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:inline-flex",
        e
      ),
      ...r,
      children: [
        /* @__PURE__ */ a("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ a(m.ItemIndicator, { children: /* @__PURE__ */ a(F, { className: "size-2 fill-current" }) }) }),
        t
      ]
    }
  );
}
function bt({
  className: e,
  inset: t,
  ...r
}) {
  return /* @__PURE__ */ a(
    m.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": t,
      className: n("px-2 py-1.5 text-xs text-muted data-[inset]:pl-8", e),
      ...r
    }
  );
}
function gt({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ a(
    m.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: n("bg-border -mx-1 my-1 h-px", e),
      ...t
    }
  );
}
function ht({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: n("text-muted ml-auto text-xs tracking-widest", e),
      ...t
    }
  );
}
function vt({ ...e }) {
  return /* @__PURE__ */ a(m.Sub, { ...e });
}
function xt({
  className: e,
  inset: t,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ c(
    m.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": t,
      className: n(
        "focus:bg-(--hover-wash) data-[inset]:pl-8 data-[state=open]:bg-(--hover-wash) flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none",
        e
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(U, { className: "ml-auto size-3.5" })
      ]
    }
  );
}
function wt({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ a(
    m.SubContent,
    {
      className: n(
        "bg-panel text-fg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-(--z-popover) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border border-border p-1 shadow-(--elev-popover)",
        e
      ),
      ...t
    }
  );
}
function yt({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    f.Root,
    {
      "data-slot": "menubar",
      className: n(
        "bg-panel flex h-9 items-center gap-1 rounded-md border border-border p-1 shadow-sm",
        e
      ),
      ...t
    }
  );
}
function Nt({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ a(
    f.Trigger,
    {
      "data-slot": "menubar-trigger",
      className: n(
        "focus:bg-(--hover-wash) data-[state=open]:bg-(--hover-wash) hover:bg-(--hover-wash) flex cursor-default items-center rounded-sm px-2 py-1 text-sm outline-hidden select-none",
        e
      ),
      ...t
    }
  );
}
function Ct({ ...e }) {
  return /* @__PURE__ */ a(f.Menu, { "data-slot": "menubar-menu", ...e });
}
function zt({
  container: e,
  ...t
}) {
  const r = C();
  return /* @__PURE__ */ a(f.Portal, { container: e ?? r, ...t });
}
function St({
  className: e,
  align: t = "start",
  alignOffset: r = -4,
  sideOffset: o = 8,
  ...u
}) {
  return /* @__PURE__ */ a(f.Portal, { container: C(), children: /* @__PURE__ */ a(
    f.Content,
    {
      "data-slot": "menubar-content",
      align: t,
      alignOffset: r,
      sideOffset: o,
      className: n(
        "bg-panel text-fg data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-(--z-popover) max-h-(--radix-menubar-content-available-height) min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border border-border p-1 shadow-(--elev-popover)",
        e
      ),
      ...u
    }
  ) });
}
function kt({ ...e }) {
  return /* @__PURE__ */ a(f.Group, { "data-slot": "menubar-group", ...e });
}
function Dt({
  className: e,
  inset: t,
  variant: r = "default",
  ...o
}) {
  return /* @__PURE__ */ a(
    f.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": t,
      "data-variant": r,
      className: n(
        "focus:bg-(--hover-wash) data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[inset]:pl-8 relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...o
    }
  );
}
function Rt({
  className: e,
  children: t,
  checked: r,
  ...o
}) {
  return /* @__PURE__ */ c(
    f.CheckboxItem,
    {
      "data-slot": "menubar-checkbox-item",
      className: n(
        "focus:bg-(--hover-wash) relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        e
      ),
      checked: r,
      ...o,
      children: [
        /* @__PURE__ */ a("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ a(f.ItemIndicator, { children: /* @__PURE__ */ a(E, { className: "size-4" }) }) }),
        t
      ]
    }
  );
}
function Tt({ ...e }) {
  return /* @__PURE__ */ a(f.RadioGroup, { ...e });
}
function Mt({
  className: e,
  children: t,
  ...r
}) {
  return /* @__PURE__ */ c(
    f.RadioItem,
    {
      className: n(
        "focus:bg-(--hover-wash) relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        e
      ),
      ...r,
      children: [
        /* @__PURE__ */ a("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ a(f.ItemIndicator, { children: /* @__PURE__ */ a(F, { className: "size-2 fill-current" }) }) }),
        t
      ]
    }
  );
}
function Pt({
  className: e,
  inset: t,
  ...r
}) {
  return /* @__PURE__ */ a(
    f.Label,
    {
      "data-slot": "menubar-label",
      "data-inset": t,
      className: n("px-2 py-1.5 text-xs text-muted data-[inset]:pl-8", e),
      ...r
    }
  );
}
function It({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ a(
    f.Separator,
    {
      "data-slot": "menubar-separator",
      className: n("bg-border -mx-1 my-1 h-px", e),
      ...t
    }
  );
}
function _t({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "span",
    {
      "data-slot": "menubar-shortcut",
      className: n("text-muted ml-auto text-xs tracking-widest", e),
      ...t
    }
  );
}
function At({ ...e }) {
  return /* @__PURE__ */ a(f.Sub, { "data-slot": "menubar-sub", ...e });
}
function Ot({
  className: e,
  inset: t,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ c(
    f.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": t,
      className: n(
        "focus:bg-(--hover-wash) data-[inset]:pl-8 data-[state=open]:bg-(--hover-wash) flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none",
        e
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(U, { className: "ml-auto size-3.5" })
      ]
    }
  );
}
function jt({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ a(
    f.SubContent,
    {
      "data-slot": "menubar-sub-content",
      className: n(
        "bg-panel text-fg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-(--z-popover) min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border border-border p-1 shadow-(--elev-popover)",
        e
      ),
      ...t
    }
  );
}
function Gt({ ...e }) {
  return /* @__PURE__ */ a(N.Root, { "data-slot": "popover", ...e });
}
const fe = s.forwardRef((e, t) => /* @__PURE__ */ a(N.Trigger, { ref: t, "data-slot": "popover-trigger", ...e }));
fe.displayName = "PopoverTrigger";
function Lt({ ...e }) {
  return /* @__PURE__ */ a(N.Anchor, { "data-slot": "popover-anchor", ...e });
}
function Bt({
  className: e,
  align: t = "center",
  sideOffset: r = 4,
  ...o
}) {
  return (
    // Portalled to the body: `z-50` only orders WITHIN the nearest stacking context, so an ancestor
    // pairing `overflow-hidden` with a radius would clip an in-flow panel no matter its z-index.
    // Leaving the subtree is the only thing that wins — the same reasoning `combobox.tsx` documents.
    /* @__PURE__ */ a(N.Portal, { container: C(), children: /* @__PURE__ */ a(
      N.Content,
      {
        "data-slot": "popover-content",
        align: t,
        sideOffset: r,
        className: n(
          "z-(--z-popover) w-72 rounded-md border border-border bg-panel p-1 text-fg shadow-(--elev-popover) outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          e
        ),
        ...o
      }
    ) })
  );
}
const me = s.forwardRef(({ className: e, children: t, ...r }, o) => /* @__PURE__ */ c(
  z.Root,
  {
    ref: o,
    className: n("relative overflow-hidden", e),
    ...r,
    children: [
      /* @__PURE__ */ a(z.Viewport, { className: "size-full rounded-[inherit] [&>div]:block! [&>div]:h-full", children: t }),
      /* @__PURE__ */ a($, {}),
      /* @__PURE__ */ a(z.Corner, {})
    ]
  }
));
me.displayName = z.Root.displayName;
const $ = s.forwardRef(({ className: e, orientation: t = "vertical", ...r }, o) => /* @__PURE__ */ a(
  z.ScrollAreaScrollbar,
  {
    ref: o,
    orientation: t,
    className: n(
      "z-20 flex touch-none select-none p-px transition-colors",
      t === "vertical" && "h-full w-2 border-l border-l-transparent",
      t === "horizontal" && "h-2 flex-col border-t border-t-transparent",
      e
    ),
    ...r,
    children: /* @__PURE__ */ a(z.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
$.displayName = z.ScrollAreaScrollbar.displayName;
function Ht({ ...e }) {
  return /* @__PURE__ */ a(p.Root, { ...e });
}
function pe({ container: e, ...t }) {
  const r = C();
  return /* @__PURE__ */ a(p.Portal, { container: e ?? r, ...t });
}
const be = s.forwardRef(function({ className: t, ...r }, o) {
  return /* @__PURE__ */ a(
    p.Overlay,
    {
      ref: o,
      className: n("fixed inset-0 z-50 bg-overlay/60 animate-in fade-in-0", t),
      ...r
    }
  );
}), Et = s.forwardRef(function({ className: t, children: r, side: o = "right", ...u }, d) {
  const [g, v] = s.useState(null), x = s.useCallback(
    (b) => {
      v(b), typeof d == "function" ? d(b) : d && (d.current = b);
    },
    [d]
  );
  return /* @__PURE__ */ c(pe, { children: [
    /* @__PURE__ */ a(be, {}),
    /* @__PURE__ */ c(
      p.Content,
      {
        ref: x,
        "data-panel": "",
        className: n(
          "fixed z-50 flex flex-col gap-4 bg-panel shadow-(--elev-dialog) transition ease-in-out animate-in",
          o === "right" && "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          o === "left" && "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          o === "top" && "inset-x-0 top-0 h-auto border-b",
          o === "bottom" && "inset-x-0 bottom-0 h-auto border-t",
          t
        ),
        ...u,
        children: [
          /* @__PURE__ */ a(G.Provider, { value: g, children: r }),
          /* @__PURE__ */ c(p.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25", children: [
            /* @__PURE__ */ a(O, { className: "h-4 w-4" }),
            /* @__PURE__ */ a("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
});
function Ft({ className: e, ...t }) {
  return /* @__PURE__ */ a("div", { className: n("flex flex-col gap-1.5 p-4", e), ...t });
}
const Ut = s.forwardRef(function({ className: t, ...r }, o) {
  return /* @__PURE__ */ a(p.Title, { ref: o, className: n("font-semibold text-fg", t), ...r });
}), Vt = s.forwardRef(function({ className: t, ...r }, o) {
  return /* @__PURE__ */ a(
    p.Description,
    {
      ref: o,
      className: n("text-sm text-muted", t),
      ...r
    }
  );
});
function $t({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ a(R.Provider, { delayDuration: e, ...t });
}
function Kt({ ...e }) {
  return /* @__PURE__ */ a(R.Root, { ...e });
}
const ge = s.forwardRef((e, t) => /* @__PURE__ */ a(R.Trigger, { ref: t, ...e }));
ge.displayName = "TooltipTrigger";
function Qt({
  className: e,
  sideOffset: t = 6,
  ...r
}) {
  return /* @__PURE__ */ a(R.Portal, { container: C(), children: /* @__PURE__ */ a(
    R.Content,
    {
      sideOffset: t,
      className: n(
        "z-(--z-tooltip) overflow-hidden rounded-md border border-border bg-panel px-2.5 py-1.5 text-xs text-fg shadow-(--elev-popover) animate-in fade-in-0 zoom-in-95",
        e
      ),
      ...r
    }
  ) });
}
export {
  ze as Alert,
  ke as AlertDescription,
  Se as AlertTitle,
  De as Badge,
  Re as Button,
  Te as Card,
  _e as CardContent,
  Ie as CardDescription,
  Ae as CardFooter,
  Me as CardHeader,
  Pe as CardTitle,
  Oe as Checkbox,
  We as Collapsible,
  qe as CollapsibleContent,
  Xe as CollapsibleTrigger,
  ot as Combobox,
  Je as Dialog,
  Ze as DialogClose,
  et as DialogContent,
  nt as DialogDescription,
  at as DialogFooter,
  tt as DialogHeader,
  ce as DialogOverlay,
  de as DialogPortal,
  G as DialogSurfaceContext,
  rt as DialogTitle,
  Ye as DialogTrigger,
  st as DropdownMenu,
  ft as DropdownMenuCheckboxItem,
  dt as DropdownMenuContent,
  ct as DropdownMenuGroup,
  ut as DropdownMenuItem,
  bt as DropdownMenuLabel,
  lt as DropdownMenuPortal,
  mt as DropdownMenuRadioGroup,
  pt as DropdownMenuRadioItem,
  gt as DropdownMenuSeparator,
  ht as DropdownMenuShortcut,
  vt as DropdownMenuSub,
  wt as DropdownMenuSubContent,
  xt as DropdownMenuSubTrigger,
  it as DropdownMenuTrigger,
  ie as Input,
  je as Label,
  yt as Menubar,
  Rt as MenubarCheckboxItem,
  St as MenubarContent,
  kt as MenubarGroup,
  Dt as MenubarItem,
  Pt as MenubarLabel,
  Ct as MenubarMenu,
  zt as MenubarPortal,
  Tt as MenubarRadioGroup,
  Mt as MenubarRadioItem,
  It as MenubarSeparator,
  _t as MenubarShortcut,
  At as MenubarSub,
  jt as MenubarSubContent,
  Ot as MenubarSubTrigger,
  Nt as MenubarTrigger,
  Gt as Popover,
  Lt as PopoverAnchor,
  Bt as PopoverContent,
  fe as PopoverTrigger,
  Ce as RubixUiProvider,
  me as ScrollArea,
  $ as ScrollBar,
  Ge as Separator,
  Ht as Sheet,
  Et as SheetContent,
  Vt as SheetDescription,
  Ft as SheetHeader,
  Ut as SheetTitle,
  Le as Skeleton,
  Be as Spinner,
  He as Switch,
  Ee as Table,
  Ue as TableBody,
  Ke as TableCell,
  $e as TableHead,
  Fe as TableHeader,
  Ve as TableRow,
  Qe as Textarea,
  Kt as Tooltip,
  Qt as TooltipContent,
  $t as TooltipProvider,
  ge as TooltipTrigger,
  ne as alertVariants,
  oe as badgeVariants,
  se as buttonVariants,
  n as cn,
  le as useDialogSurface,
  C as useOverlayContainer
};
