import { clsx as fe } from "clsx";
import { extendTailwindMerge as be } from "tailwind-merge";
import { jsx as n, jsxs as u } from "react/jsx-runtime";
import * as s from "react";
import { useState as V, useRef as F, useEffect as me, useCallback as pe } from "react";
import { cva as A } from "class-variance-authority";
import { Slot as W } from "@radix-ui/react-slot";
import { Loader2 as ge, X as O, ChevronDown as K, Check as Q, CheckIcon as X, CircleIcon as q, ChevronRightIcon as J, MoreHorizontal as xe, ChevronRight as he, Copy as ve } from "lucide-react";
import * as $ from "@radix-ui/react-collapsible";
import * as C from "@radix-ui/react-popover";
import * as v from "@radix-ui/react-dialog";
import * as h from "@radix-ui/react-dropdown-menu";
import * as g from "@radix-ui/react-menubar";
import * as k from "@radix-ui/react-scroll-area";
import * as D from "@radix-ui/react-tooltip";
const we = be({
  extend: {
    theme: {
      text: ["micro", "caption", "detail", "value-lg", "value-xl"],
      radius: ["panel"]
    }
  }
});
function a(...e) {
  return we(fe(e));
}
function ye({ children: e, className: t }) {
  return /* @__PURE__ */ n("div", { className: t, children: e });
}
function Ne({ open: e, children: t, className: r }) {
  return e ? /* @__PURE__ */ n("div", { className: r, children: t }) : null;
}
const B = s.createContext({});
function Ce({
  motion: e,
  children: t
}) {
  return /* @__PURE__ */ n(B.Provider, { value: e, children: t });
}
function Se() {
  return s.useContext(B).Reveal ?? ye;
}
function ke() {
  return s.useContext(B).Collapse ?? Ne;
}
const Y = s.createContext(null);
function ze({
  container: e,
  children: t
}) {
  return /* @__PURE__ */ n(Y.Provider, { value: e, children: t });
}
function S() {
  return s.useContext(Y) ?? void 0;
}
const Te = {};
function qe({
  portalContainer: e = null,
  motion: t = Te,
  children: r
}) {
  return /* @__PURE__ */ n(ze, { container: e, children: /* @__PURE__ */ n(Ce, { motion: t, children: r }) });
}
function Z() {
  var e;
  return typeof navigator < "u" && typeof ((e = navigator.clipboard) == null ? void 0 : e.writeText) == "function" && // `isSecureContext` is the spec's own gate. Some engines expose a `clipboard` object that throws
  // on use in an insecure context rather than omitting it, so trust the flag over the shape.
  (typeof isSecureContext > "u" || isSecureContext);
}
function ee() {
  return typeof document < "u" && !!document.body && typeof document.createElement == "function";
}
function U(e) {
  if (!ee()) return !1;
  const t = document.getSelection(), r = [];
  if (t)
    for (let i = 0; i < t.rangeCount; i += 1)
      r.push(t.getRangeAt(i).cloneRange());
  const o = document.createElement("textarea");
  o.value = e, o.setAttribute("readonly", ""), o.setAttribute("aria-hidden", "true"), o.tabIndex = -1, o.style.position = "fixed", o.style.top = "0", o.style.left = "0", o.style.width = "1px", o.style.height = "1px", o.style.padding = "0", o.style.border = "none", o.style.outline = "none", o.style.boxShadow = "none", o.style.background = "transparent", o.style.opacity = "0", document.body.appendChild(o);
  let l = !1;
  try {
    o.focus({ preventScroll: !0 }), o.select(), o.setSelectionRange(0, e.length), l = document.execCommand("copy");
  } catch {
    l = !1;
  } finally {
    if (document.body.removeChild(o), r.length > 0) {
      const i = document.getSelection();
      if (i) {
        i.removeAllRanges();
        for (const c of r) i.addRange(c);
      }
    }
  }
  return l;
}
async function Re(e) {
  if (Z())
    try {
      return await navigator.clipboard.writeText(e), !0;
    } catch {
      return U(e);
    }
  return U(e);
}
function Je() {
  return Z() || ee();
}
function De(e = 1500) {
  const [t, r] = V(!1), [o, l] = V(null), i = F(null), c = F(!0);
  me(() => (c.current = !0, () => {
    c.current = !1, i.current && clearTimeout(i.current);
  }), []);
  const p = pe(
    async (x) => {
      const b = await Re(x);
      return c.current ? b ? (l(null), r(!0), i.current && clearTimeout(i.current), i.current = setTimeout(() => r(!1), e), !0) : (r(!1), l("Copy failed"), !1) : b;
    },
    [e]
  );
  return { copied: t, error: o, copy: p };
}
const Me = A(
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
function Ye({
  className: e,
  variant: t,
  ...r
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      role: "alert",
      "data-slot": "alert",
      className: a(Me({ variant: t }), e),
      ...r
    }
  );
}
function Ze({ className: e, ...t }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "alert-title",
      className: a("font-medium leading-relaxed tracking-tight", e),
      ...t
    }
  );
}
function et({ className: e, ...t }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "alert-description",
      className: a("text-sm leading-relaxed [&_p]:leading-relaxed", e),
      ...t
    }
  );
}
const Pe = A(
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
function tt({
  className: e,
  variant: t,
  pill: r,
  size: o,
  ...l
}) {
  return /* @__PURE__ */ n(
    "span",
    {
      "data-slot": "badge",
      className: a(Pe({ variant: t, pill: r, size: o }), e),
      ...l
    }
  );
}
const Ie = A(
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
), _e = s.forwardRef(function({ className: t, variant: r, size: o, asChild: l = !1, ...i }, c) {
  return /* @__PURE__ */ n(
    l ? W : "button",
    {
      ref: c,
      "data-btn": o ?? "default",
      className: a(Ie({ variant: r, size: o, className: t })),
      ...i
    }
  );
});
function nt({ className: e, ...t }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "card",
      "data-panel": "",
      className: a("flex flex-col rounded-lg border border-border bg-card text-fg", e),
      ...t
    }
  );
}
function rt({ className: e, ...t }) {
  return /* @__PURE__ */ n("div", { "data-slot": "card-header", className: a("flex flex-col gap-1 p-4", e), ...t });
}
function ot({ className: e, ...t }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "card-title",
      className: a("text-sm font-semibold leading-none", e),
      ...t
    }
  );
}
function at({ className: e, ...t }) {
  return /* @__PURE__ */ n("div", { "data-slot": "card-description", className: a("text-xs text-muted", e), ...t });
}
function it({ className: e, ...t }) {
  return /* @__PURE__ */ n("div", { "data-slot": "card-content", className: a("p-4 pt-0", e), ...t });
}
function st({ className: e, ...t }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "card-footer",
      className: a("flex items-center p-4 pt-0", e),
      ...t
    }
  );
}
function lt({ className: e, ...t }) {
  return /* @__PURE__ */ n(
    "input",
    {
      type: "checkbox",
      "data-slot": "checkbox",
      className: a(
        "h-4 w-4 shrink-0 cursor-pointer rounded-md border-border accent-[hsl(var(--accent))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ...t
    }
  );
}
const te = s.forwardRef(
  ({ className: e, type: t, ...r }, o) => /* @__PURE__ */ n(
    "input",
    {
      ref: o,
      type: t,
      "data-slot": "input",
      className: a(
        "flex h-9 w-full min-w-0 rounded-md border border-border bg-bg px-2.5 py-1.5 text-sm text-fg transition-colors placeholder:text-muted/60 selection:bg-accent/20 selection:text-fg focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60",
        e
      ),
      ...r
    }
  )
);
te.displayName = "Input";
const ct = s.forwardRef(function({ className: t, ...r }, o) {
  return /* @__PURE__ */ n(
    "label",
    {
      ref: o,
      "data-slot": "label",
      className: a(
        "text-sm font-medium leading-none text-fg peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        t
      ),
      ...r
    }
  );
}), dt = s.forwardRef(function({ className: t, orientation: r = "horizontal", decorative: o = !0, ...l }, i) {
  return /* @__PURE__ */ n(
    "div",
    {
      ref: i,
      "data-slot": "separator",
      role: o ? "none" : "separator",
      "aria-orientation": o ? void 0 : r,
      className: a(
        "shrink-0 bg-border",
        r === "horizontal" ? "h-px w-full" : "h-full w-px",
        t
      ),
      ...l
    }
  );
});
function ut({ className: e, ...t }) {
  return /* @__PURE__ */ n("div", { className: a("animate-pulse rounded-md bg-panel-3", e), ...t });
}
function ft({ className: e, ...t }) {
  return /* @__PURE__ */ n(
    ge,
    {
      "data-slot": "spinner",
      "aria-hidden": t["aria-label"] ? void 0 : !0,
      className: a("size-3.5 shrink-0 animate-spin", e),
      ...t
    }
  );
}
const bt = s.forwardRef(function({ className: t, checked: r, defaultChecked: o, onCheckedChange: l, disabled: i, onClick: c, ...p }, x) {
  const b = r !== void 0, [m, z] = s.useState(o ?? !1), w = b ? r : m;
  return /* @__PURE__ */ n(
    "button",
    {
      ref: x,
      type: "button",
      role: "switch",
      "aria-checked": w,
      "data-slot": "switch",
      "data-state": w ? "checked" : "unchecked",
      disabled: i,
      onClick: (y) => {
        c == null || c(y);
        const T = !w;
        b || z(T), l == null || l(T);
      },
      className: a(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50",
        w ? "bg-accent" : "bg-border",
        t
      ),
      ...p,
      children: /* @__PURE__ */ n(
        "span",
        {
          "aria-hidden": !0,
          className: a(
            "pointer-events-none block h-4 w-4 rounded-full bg-bg shadow-sm ring-0 transition-transform",
            w ? "translate-x-4" : "translate-x-0.5"
          )
        }
      )
    }
  );
});
function mt({ className: e, ...t }) {
  return /* @__PURE__ */ n("div", { "data-slot": "table-container", className: "relative w-full overflow-x-auto", children: /* @__PURE__ */ n(
    "table",
    {
      "data-slot": "table",
      className: a("w-full caption-bottom border-collapse text-sm text-fg", e),
      ...t
    }
  ) });
}
function pt({
  className: e,
  sticky: t,
  ...r
}) {
  return /* @__PURE__ */ n(
    "thead",
    {
      "data-slot": "table-header",
      className: a(
        "border-b border-border bg-card/40 [&_tr]:border-b",
        t && "sticky top-0 z-10 bg-panel shadow-[0_1px_0_hsl(var(--border))]",
        e
      ),
      ...r
    }
  );
}
function gt({ className: e, ...t }) {
  return /* @__PURE__ */ n(
    "tbody",
    {
      "data-slot": "table-body",
      className: a("[&_tr:last-child]:border-0", e),
      ...t
    }
  );
}
function xt({ className: e, ...t }) {
  return /* @__PURE__ */ n(
    "tr",
    {
      "data-slot": "table-row",
      className: a(
        "border-b border-border transition-colors hover:bg-bg/60 data-[state=selected]:bg-accent/10",
        e
      ),
      ...t
    }
  );
}
function ht({ className: e, ...t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      "data-slot": "table-head",
      className: a(
        "h-9 px-3 text-left align-middle text-caption font-semibold uppercase tracking-[0.06em] text-muted",
        e
      ),
      ...t
    }
  );
}
function vt({ className: e, ...t }) {
  return /* @__PURE__ */ n(
    "td",
    {
      "data-slot": "table-cell",
      className: a("px-3 py-2 align-middle text-xs text-fg", e),
      ...t
    }
  );
}
const wt = s.forwardRef(
  function({ className: t, ...r }, o) {
    return /* @__PURE__ */ n(
      "textarea",
      {
        ref: o,
        "data-slot": "textarea",
        className: a(
          "flex w-full min-w-0 rounded-md border border-border bg-bg px-2.5 py-2 text-sm leading-5 font-mono text-fg transition-colors placeholder:text-muted/60 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60",
          t
        ),
        ...r
      }
    );
  }
), yt = $.Root, Nt = $.CollapsibleTrigger, Ct = $.CollapsibleContent, j = s.createContext(null);
function Ae() {
  return s.useContext(j);
}
function St({ ...e }) {
  return /* @__PURE__ */ n(v.Root, { ...e });
}
function kt({ ...e }) {
  return /* @__PURE__ */ n(v.Trigger, { ...e });
}
function Oe({
  container: e,
  ...t
}) {
  const r = S();
  return /* @__PURE__ */ n(v.Portal, { container: e ?? r, ...t });
}
function zt({ ...e }) {
  return /* @__PURE__ */ n(v.Close, { ...e });
}
const $e = s.forwardRef(function({ className: t, ...r }, o) {
  return /* @__PURE__ */ n(
    v.Overlay,
    {
      ref: o,
      className: a("fixed inset-0 z-50 bg-overlay/60 animate-in fade-in-0", t),
      ...r
    }
  );
}), Tt = s.forwardRef(function({ className: t, children: r, showClose: o = !0, ...l }, i) {
  const [c, p] = s.useState(null), x = s.useCallback(
    (b) => {
      p(b), typeof i == "function" ? i(b) : i && (i.current = b);
    },
    [i]
  );
  return /* @__PURE__ */ u(Oe, { children: [
    /* @__PURE__ */ n($e, {}),
    /* @__PURE__ */ u(
      v.Content,
      {
        ref: x,
        "data-panel": "",
        className: a(
          "fixed left-1/2 top-1/2 z-50 flex max-h-[85vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-y-auto rounded-lg border border-border bg-panel p-4 text-fg shadow-(--elev-dialog) duration-200 animate-in fade-in-0 zoom-in-95",
          t
        ),
        ...l,
        children: [
          /* @__PURE__ */ n(j.Provider, { value: c, children: r }),
          o && /* @__PURE__ */ u(v.Close, { className: "absolute right-4 top-4 rounded-sm text-muted opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25", children: [
            /* @__PURE__ */ n(O, { className: "h-4 w-4" }),
            /* @__PURE__ */ n("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
});
function Rt({ className: e, ...t }) {
  return /* @__PURE__ */ n("div", { className: a("flex flex-col gap-1.5", e), ...t });
}
function Dt({ className: e, ...t }) {
  return /* @__PURE__ */ n(
    "div",
    {
      className: a("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", e),
      ...t
    }
  );
}
const Mt = s.forwardRef(function({ className: t, ...r }, o) {
  return /* @__PURE__ */ n(
    v.Title,
    {
      ref: o,
      className: a("text-sm font-semibold text-fg", t),
      ...r
    }
  );
}), Pt = s.forwardRef(function({ className: t, ...r }, o) {
  return /* @__PURE__ */ n(
    v.Description,
    {
      ref: o,
      className: a("text-xs text-muted", t),
      ...r
    }
  );
});
function Be(e, t) {
  if (!t) return !0;
  const r = t.toLowerCase();
  return e.value.toLowerCase().includes(r) || (e.label ?? "").toLowerCase().includes(r) || (e.description ?? "").toLowerCase().includes(r);
}
function It({
  options: e,
  value: t,
  onChange: r,
  placeholder: o = "— select —",
  "aria-label": l,
  allowCustom: i = !1,
  clearable: c = !1,
  disabled: p = !1,
  size: x = "md",
  renderValue: b,
  className: m
}) {
  const [z, w] = s.useState(!1), [y, T] = s.useState(""), [L, M] = s.useState(0), G = s.useRef(null), se = Ae(), le = S(), ce = se ?? le, R = e.filter((d) => Be(d, y)), N = e.find((d) => d.value === t);
  s.useEffect(() => {
    z && (T(""), M(0));
  }, [z]);
  const P = (d) => {
    r(d), w(!1);
  }, de = (d) => {
    if (d.key === "Escape") {
      w(!1);
      return;
    }
    if (d.key === "ArrowDown")
      d.preventDefault(), M((f) => Math.min(f + 1, R.length - 1));
    else if (d.key === "ArrowUp")
      d.preventDefault(), M((f) => Math.max(f - 1, 0));
    else if (d.key === "Enter") {
      d.preventDefault();
      const f = R[L];
      f ? P(f.value) : i && y.trim() && P(y.trim());
    }
  }, _ = [];
  R.forEach((d, f) => {
    const I = _.find((ue) => ue.name === d.group);
    I ? I.items.push({ o: d, idx: f }) : _.push({ name: d.group, items: [{ o: d, idx: f }] });
  });
  const H = c && !p && t !== "";
  return /* @__PURE__ */ n(C.Root, { open: z, onOpenChange: w, children: /* @__PURE__ */ u("div", { className: a("relative", m), children: [
    /* @__PURE__ */ n(C.Trigger, { asChild: !0, children: /* @__PURE__ */ u(
      "button",
      {
        type: "button",
        role: "combobox",
        "aria-expanded": z,
        "aria-label": l,
        disabled: p,
        "data-slot": "combobox-trigger",
        className: a(
          // `pr-[9px]` plus the 1px border puts the chevron 10px from the field's OUTER right edge
          // at both heights (Rubix Chart Shading sheet §10, the combobox rule).
          // The field look Input and Select share (focus border + ring, disabled fade, the
          // `--pad-field-x` inset at both heights) so a Combobox and a Select line up in one form.
          "flex w-full items-center justify-between gap-1 rounded-md border border-border bg-bg py-0 pr-[9px] pl-2.5 text-left text-fg transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60",
          x === "sm" ? "h-8 text-xs" : "h-9 text-sm"
        ),
        children: [
          /* @__PURE__ */ u(
            "span",
            {
              className: a(
                "flex min-w-0 items-center gap-1.5 truncate",
                !N && "text-muted",
                // Room for the clear button, which sits between the label and the chevron. Reserved on
                // the LABEL rather than as trigger padding, so the chevron stays at the right edge
                // whether or not there is a value to clear. The text stops 8px before the clear
                // button's hit area: that area starts 43px (sm) or 45px (md) from the outer edge and
                // this box ends 26px from it.
                H && (x === "sm" ? "pr-[25px]" : "pr-[27px]")
              ),
              children: [
                (N == null ? void 0 : N.swatch) && /* @__PURE__ */ n(
                  "span",
                  {
                    className: "inline-block h-3 w-3 shrink-0 rounded-full",
                    style: { background: N.swatch },
                    "aria-hidden": !0
                  }
                ),
                t !== "" && (b == null ? void 0 : b(t, N)) || (N ? N.label ?? N.value : t || o)
              ]
            }
          ),
          /* @__PURE__ */ n(K, { size: 12, strokeWidth: 3, className: "shrink-0 text-faint", "aria-hidden": !0 })
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
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        "aria-label": `clear ${l}`,
        className: a(
          "absolute top-1/2 flex -translate-y-1/2 items-center justify-center rounded-[4px] text-faint hover:bg-[hsl(var(--fg)/0.06)] hover:text-fg-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30",
          x === "sm" ? "right-[23px] h-5 w-5" : "right-[21px] h-6 w-6"
        ),
        onClick: () => {
          r(""), w(!1);
        },
        children: /* @__PURE__ */ n(O, { size: 12, "aria-hidden": !0 })
      }
    ),
    /* @__PURE__ */ n(C.Portal, { container: ce, children: /* @__PURE__ */ u(
      C.Content,
      {
        "data-slot": "combobox-list",
        side: "bottom",
        align: "start",
        sideOffset: 4,
        collisionPadding: 8,
        style: { width: "var(--radix-popover-trigger-width)", zIndex: "var(--z-popover)" },
        onOpenAutoFocus: (d) => {
          var f;
          d.preventDefault(), (f = G.current) == null || f.focus();
        },
        className: "max-h-64 min-w-48 overflow-y-auto rounded-md border border-border bg-panel p-1 shadow-(--elev-popover)",
        children: [
          /* @__PURE__ */ n(
            "input",
            {
              ref: G,
              "aria-label": `${l} search`,
              className: "mb-1 h-7 w-full rounded-md border border-border bg-bg px-2 text-xs text-fg focus-visible:outline-none",
              placeholder: i ? "search or type…" : "search…",
              value: y,
              onChange: (d) => {
                T(d.target.value), M(0);
              },
              onKeyDown: de
            }
          ),
          /* @__PURE__ */ u("ul", { role: "listbox", "aria-label": `${l} options`, children: [
            R.length === 0 && !i && /* @__PURE__ */ n("li", { className: "px-2 py-1.5 text-sm text-muted", children: "no matches" }),
            R.length === 0 && i && y.trim() && /* @__PURE__ */ n("li", { children: /* @__PURE__ */ u(
              "button",
              {
                type: "button",
                className: "min-h-8 w-full rounded-md px-2 py-1.5 text-left text-sm text-fg hover:bg-(--hover-wash)",
                onClick: () => P(y.trim()),
                children: [
                  "Use “",
                  y.trim(),
                  "”"
                ]
              }
            ) }),
            _.map((d) => /* @__PURE__ */ u(s.Fragment, { children: [
              d.name && /* @__PURE__ */ n(
                "li",
                {
                  className: "px-2 pb-0.5 pt-1.5 text-caption font-semibold uppercase tracking-[0.08em] text-faint",
                  "aria-hidden": !0,
                  children: d.name
                }
              ),
              d.items.map(({ o: f, idx: I }) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ u(
                "button",
                {
                  type: "button",
                  role: "option",
                  "aria-selected": f.value === t,
                  className: a(
                    "flex min-h-8 w-full items-start gap-1.5 rounded-md px-2 py-1.5 text-left text-sm text-fg hover:bg-(--hover-wash)",
                    I === L && "bg-bg"
                  ),
                  onClick: () => P(f.value),
                  children: [
                    f.swatch && /* @__PURE__ */ n(
                      "span",
                      {
                        className: "mt-0.5 inline-block h-3 w-3 shrink-0 rounded-full",
                        style: { background: f.swatch },
                        "aria-hidden": !0
                      }
                    ),
                    /* @__PURE__ */ u("span", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ n("span", { className: "block truncate", children: f.label ?? f.value }),
                      f.description && /* @__PURE__ */ n("span", { className: "block truncate text-caption text-muted", children: f.description })
                    ] }),
                    f.value === t && /* @__PURE__ */ n(Q, { size: 12, className: "mt-0.5 shrink-0 text-accent", "aria-hidden": !0 })
                  ]
                }
              ) }, f.value))
            ] }, d.name ?? "__ungrouped__"))
          ] })
        ]
      }
    ) })
  ] }) });
}
function _t({ ...e }) {
  return /* @__PURE__ */ n(h.Root, { "data-slot": "dropdown-menu", ...e });
}
function At({
  ...e
}) {
  return /* @__PURE__ */ n(h.Trigger, { "data-slot": "dropdown-menu-trigger", ...e });
}
function Ot({
  container: e,
  ...t
}) {
  const r = S();
  return /* @__PURE__ */ n(h.Portal, { container: e ?? r, ...t });
}
function $t({
  className: e,
  sideOffset: t = 4,
  ...r
}) {
  return /* @__PURE__ */ n(h.Portal, { container: S(), children: /* @__PURE__ */ n(
    h.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: a(
        "bg-panel text-fg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-(--z-popover) max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border border-border p-1 shadow-(--elev-popover)",
        e
      ),
      ...r
    }
  ) });
}
function Bt({ ...e }) {
  return /* @__PURE__ */ n(h.Group, { "data-slot": "dropdown-menu-group", ...e });
}
function jt({
  className: e,
  inset: t,
  variant: r = "default",
  ...o
}) {
  return /* @__PURE__ */ n(
    h.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": r,
      className: a(
        "focus:bg-(--hover-wash) data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[inset]:pl-8 relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:inline-flex",
        e
      ),
      ...o
    }
  );
}
function Et({
  className: e,
  children: t,
  checked: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    h.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      className: a(
        "focus:bg-(--hover-wash) relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:inline-flex",
        e
      ),
      checked: r,
      ...o,
      children: [
        /* @__PURE__ */ n("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ n(h.ItemIndicator, { children: /* @__PURE__ */ n(X, { className: "size-4" }) }) }),
        t
      ]
    }
  );
}
function Lt({
  ...e
}) {
  return /* @__PURE__ */ n(h.RadioGroup, { ...e });
}
function Gt({
  className: e,
  children: t,
  ...r
}) {
  return /* @__PURE__ */ u(
    h.RadioItem,
    {
      className: a(
        "focus:bg-(--hover-wash) relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:inline-flex",
        e
      ),
      ...r,
      children: [
        /* @__PURE__ */ n("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ n(h.ItemIndicator, { children: /* @__PURE__ */ n(q, { className: "size-2 fill-current" }) }) }),
        t
      ]
    }
  );
}
function Ht({
  className: e,
  inset: t,
  ...r
}) {
  return /* @__PURE__ */ n(
    h.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": t,
      className: a("px-2 py-1.5 text-xs text-muted data-[inset]:pl-8", e),
      ...r
    }
  );
}
function Vt({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ n(
    h.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: a("bg-border -mx-1 my-1 h-px", e),
      ...t
    }
  );
}
function Ft({ className: e, ...t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: a("text-muted ml-auto text-xs tracking-widest", e),
      ...t
    }
  );
}
function Ut({ ...e }) {
  return /* @__PURE__ */ n(h.Sub, { ...e });
}
function Wt({
  className: e,
  inset: t,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    h.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": t,
      className: a(
        "focus:bg-(--hover-wash) data-[inset]:pl-8 data-[state=open]:bg-(--hover-wash) flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none",
        e
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ n(J, { className: "ml-auto size-3.5" })
      ]
    }
  );
}
function Kt({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ n(
    h.SubContent,
    {
      className: a(
        "bg-panel text-fg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-(--z-popover) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border border-border p-1 shadow-(--elev-popover)",
        e
      ),
      ...t
    }
  );
}
function Qt({ className: e, ...t }) {
  return /* @__PURE__ */ n(
    g.Root,
    {
      "data-slot": "menubar",
      className: a(
        "bg-panel flex h-9 items-center gap-1 rounded-md border border-border p-1 shadow-sm",
        e
      ),
      ...t
    }
  );
}
function Xt({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ n(
    g.Trigger,
    {
      "data-slot": "menubar-trigger",
      className: a(
        "focus:bg-(--hover-wash) data-[state=open]:bg-(--hover-wash) hover:bg-(--hover-wash) flex cursor-default items-center rounded-sm px-2 py-1 text-sm outline-hidden select-none",
        e
      ),
      ...t
    }
  );
}
function qt({ ...e }) {
  return /* @__PURE__ */ n(g.Menu, { "data-slot": "menubar-menu", ...e });
}
function Jt({
  container: e,
  ...t
}) {
  const r = S();
  return /* @__PURE__ */ n(g.Portal, { container: e ?? r, ...t });
}
function Yt({
  className: e,
  align: t = "start",
  alignOffset: r = -4,
  sideOffset: o = 8,
  ...l
}) {
  return /* @__PURE__ */ n(g.Portal, { container: S(), children: /* @__PURE__ */ n(
    g.Content,
    {
      "data-slot": "menubar-content",
      align: t,
      alignOffset: r,
      sideOffset: o,
      className: a(
        "bg-panel text-fg data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-(--z-popover) max-h-(--radix-menubar-content-available-height) min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border border-border p-1 shadow-(--elev-popover)",
        e
      ),
      ...l
    }
  ) });
}
function Zt({ ...e }) {
  return /* @__PURE__ */ n(g.Group, { "data-slot": "menubar-group", ...e });
}
function en({
  className: e,
  inset: t,
  variant: r = "default",
  ...o
}) {
  return /* @__PURE__ */ n(
    g.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": t,
      "data-variant": r,
      className: a(
        "focus:bg-(--hover-wash) data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[inset]:pl-8 relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...o
    }
  );
}
function tn({
  className: e,
  children: t,
  checked: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    g.CheckboxItem,
    {
      "data-slot": "menubar-checkbox-item",
      className: a(
        "focus:bg-(--hover-wash) relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        e
      ),
      checked: r,
      ...o,
      children: [
        /* @__PURE__ */ n("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ n(g.ItemIndicator, { children: /* @__PURE__ */ n(X, { className: "size-4" }) }) }),
        t
      ]
    }
  );
}
function nn({ ...e }) {
  return /* @__PURE__ */ n(g.RadioGroup, { ...e });
}
function rn({
  className: e,
  children: t,
  ...r
}) {
  return /* @__PURE__ */ u(
    g.RadioItem,
    {
      className: a(
        "focus:bg-(--hover-wash) relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        e
      ),
      ...r,
      children: [
        /* @__PURE__ */ n("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ n(g.ItemIndicator, { children: /* @__PURE__ */ n(q, { className: "size-2 fill-current" }) }) }),
        t
      ]
    }
  );
}
function on({
  className: e,
  inset: t,
  ...r
}) {
  return /* @__PURE__ */ n(
    g.Label,
    {
      "data-slot": "menubar-label",
      "data-inset": t,
      className: a("px-2 py-1.5 text-xs text-muted data-[inset]:pl-8", e),
      ...r
    }
  );
}
function an({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ n(
    g.Separator,
    {
      "data-slot": "menubar-separator",
      className: a("bg-border -mx-1 my-1 h-px", e),
      ...t
    }
  );
}
function sn({ className: e, ...t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      "data-slot": "menubar-shortcut",
      className: a("text-muted ml-auto text-xs tracking-widest", e),
      ...t
    }
  );
}
function ln({ ...e }) {
  return /* @__PURE__ */ n(g.Sub, { "data-slot": "menubar-sub", ...e });
}
function cn({
  className: e,
  inset: t,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    g.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": t,
      className: a(
        "focus:bg-(--hover-wash) data-[inset]:pl-8 data-[state=open]:bg-(--hover-wash) flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none",
        e
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ n(J, { className: "ml-auto size-3.5" })
      ]
    }
  );
}
function dn({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ n(
    g.SubContent,
    {
      "data-slot": "menubar-sub-content",
      className: a(
        "bg-panel text-fg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-(--z-popover) min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border border-border p-1 shadow-(--elev-popover)",
        e
      ),
      ...t
    }
  );
}
function un({ ...e }) {
  return /* @__PURE__ */ n(C.Root, { "data-slot": "popover", ...e });
}
const je = s.forwardRef((e, t) => /* @__PURE__ */ n(C.Trigger, { ref: t, "data-slot": "popover-trigger", ...e }));
je.displayName = "PopoverTrigger";
function fn({ ...e }) {
  return /* @__PURE__ */ n(C.Anchor, { "data-slot": "popover-anchor", ...e });
}
function bn({
  className: e,
  align: t = "center",
  sideOffset: r = 4,
  ...o
}) {
  return (
    // Portalled to the body: `z-50` only orders WITHIN the nearest stacking context, so an ancestor
    // pairing `overflow-hidden` with a radius would clip an in-flow panel no matter its z-index.
    // Leaving the subtree is the only thing that wins — the same reasoning `combobox.tsx` documents.
    /* @__PURE__ */ n(C.Portal, { container: S(), children: /* @__PURE__ */ n(
      C.Content,
      {
        "data-slot": "popover-content",
        align: t,
        sideOffset: r,
        className: a(
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
const Ee = s.forwardRef(({ className: e, children: t, ...r }, o) => /* @__PURE__ */ u(
  k.Root,
  {
    ref: o,
    className: a("relative overflow-hidden", e),
    ...r,
    children: [
      /* @__PURE__ */ n(k.Viewport, { className: "size-full rounded-[inherit] [&>div]:block! [&>div]:h-full", children: t }),
      /* @__PURE__ */ n(ne, {}),
      /* @__PURE__ */ n(k.Corner, {})
    ]
  }
));
Ee.displayName = k.Root.displayName;
const ne = s.forwardRef(({ className: e, orientation: t = "vertical", ...r }, o) => /* @__PURE__ */ n(
  k.ScrollAreaScrollbar,
  {
    ref: o,
    orientation: t,
    className: a(
      "z-20 flex touch-none select-none p-px transition-colors",
      t === "vertical" && "h-full w-2 border-l border-l-transparent",
      t === "horizontal" && "h-2 flex-col border-t border-t-transparent",
      e
    ),
    ...r,
    children: /* @__PURE__ */ n(k.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ne.displayName = k.ScrollAreaScrollbar.displayName;
function mn({ ...e }) {
  return /* @__PURE__ */ n(v.Root, { ...e });
}
function Le({ container: e, ...t }) {
  const r = S();
  return /* @__PURE__ */ n(v.Portal, { container: e ?? r, ...t });
}
const Ge = s.forwardRef(function({ className: t, ...r }, o) {
  return /* @__PURE__ */ n(
    v.Overlay,
    {
      ref: o,
      className: a("fixed inset-0 z-50 bg-overlay/60 animate-in fade-in-0", t),
      ...r
    }
  );
}), pn = s.forwardRef(function({ className: t, children: r, side: o = "right", ...l }, i) {
  const [c, p] = s.useState(null), x = s.useCallback(
    (b) => {
      p(b), typeof i == "function" ? i(b) : i && (i.current = b);
    },
    [i]
  );
  return /* @__PURE__ */ u(Le, { children: [
    /* @__PURE__ */ n(Ge, {}),
    /* @__PURE__ */ u(
      v.Content,
      {
        ref: x,
        "data-panel": "",
        className: a(
          "fixed z-50 flex flex-col gap-4 bg-panel shadow-(--elev-dialog) transition ease-in-out animate-in",
          o === "right" && "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          o === "left" && "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          o === "top" && "inset-x-0 top-0 h-auto border-b",
          o === "bottom" && "inset-x-0 bottom-0 h-auto border-t",
          t
        ),
        ...l,
        children: [
          /* @__PURE__ */ n(j.Provider, { value: c, children: r }),
          /* @__PURE__ */ u(v.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25", children: [
            /* @__PURE__ */ n(O, { className: "h-4 w-4" }),
            /* @__PURE__ */ n("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
});
function gn({ className: e, ...t }) {
  return /* @__PURE__ */ n("div", { className: a("flex flex-col gap-1.5 p-4", e), ...t });
}
const xn = s.forwardRef(function({ className: t, ...r }, o) {
  return /* @__PURE__ */ n(v.Title, { ref: o, className: a("font-semibold text-fg", t), ...r });
}), hn = s.forwardRef(function({ className: t, ...r }, o) {
  return /* @__PURE__ */ n(
    v.Description,
    {
      ref: o,
      className: a("text-sm text-muted", t),
      ...r
    }
  );
});
function vn({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ n(D.Provider, { delayDuration: e, ...t });
}
function wn({ ...e }) {
  return /* @__PURE__ */ n(D.Root, { ...e });
}
const He = s.forwardRef((e, t) => /* @__PURE__ */ n(D.Trigger, { ref: t, ...e }));
He.displayName = "TooltipTrigger";
function yn({
  className: e,
  sideOffset: t = 6,
  ...r
}) {
  return /* @__PURE__ */ n(D.Portal, { container: S(), children: /* @__PURE__ */ n(
    D.Content,
    {
      sideOffset: t,
      className: a(
        "z-(--z-tooltip) overflow-hidden rounded-md border border-border bg-panel px-2.5 py-1.5 text-xs text-fg shadow-(--elev-popover) animate-in fade-in-0 zoom-in-95",
        e
      ),
      ...r
    }
  ) });
}
const re = s.createContext(null);
function Nn({ className: e, defaultValue: t, children: r, ...o }) {
  const [l, i] = s.useState(t ?? null), c = s.useCallback((p) => {
    i((x) => x === p ? null : p);
  }, []);
  return /* @__PURE__ */ n(re.Provider, { value: { openValue: l, toggle: c }, children: /* @__PURE__ */ n("div", { "data-slot": "accordion", className: e, ...o, children: r }) });
}
const E = s.createContext("");
function Cn({
  value: e,
  className: t,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ n(E.Provider, { value: e, children: /* @__PURE__ */ n("div", { "data-slot": "accordion-item", className: t, ...o, children: r }) });
}
function oe() {
  const e = s.useContext(re);
  if (!e) throw new Error("Accordion parts must be used within <Accordion>.");
  return e;
}
function Sn({ className: e, children: t, ...r }) {
  const { openValue: o, toggle: l } = oe(), i = s.useContext(E), c = o === i;
  return /* @__PURE__ */ u(
    "button",
    {
      type: "button",
      "data-slot": "accordion-trigger",
      "aria-expanded": c,
      onClick: () => l(i),
      className: a(
        "flex w-full items-center justify-between gap-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25",
        e
      ),
      ...r,
      children: [
        t,
        /* @__PURE__ */ n(
          K,
          {
            "aria-hidden": !0,
            className: a("h-4 w-4 shrink-0 text-muted transition-transform", c && "rotate-180")
          }
        )
      ]
    }
  );
}
function kn({ className: e, children: t, ...r }) {
  const { openValue: o } = oe(), l = s.useContext(E), i = o === l, c = ke();
  return /* @__PURE__ */ n(c, { open: i, children: /* @__PURE__ */ n("div", { "data-slot": "accordion-content", role: "region", className: e, ...r, children: t }) });
}
function zn({ ...e }) {
  return /* @__PURE__ */ n("nav", { "aria-label": "breadcrumb", "data-slot": "breadcrumb", ...e });
}
function Tn({ className: e, ...t }) {
  return /* @__PURE__ */ n(
    "ol",
    {
      "data-slot": "breadcrumb-list",
      className: a(
        "text-muted flex flex-wrap items-center gap-1.5 text-sm break-words",
        e
      ),
      ...t
    }
  );
}
function Rn({ className: e, ...t }) {
  return /* @__PURE__ */ n(
    "li",
    {
      "data-slot": "breadcrumb-item",
      className: a("inline-flex items-center gap-1.5", e),
      ...t
    }
  );
}
function Dn({
  asChild: e,
  className: t,
  ...r
}) {
  return /* @__PURE__ */ n(
    e ? W : "a",
    {
      "data-slot": "breadcrumb-link",
      className: a("hover:text-fg transition-colors", t),
      ...r
    }
  );
}
function Mn({ className: e, ...t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      "data-slot": "breadcrumb-page",
      role: "link",
      "aria-current": "page",
      className: a("text-fg font-medium", e),
      ...t
    }
  );
}
function Pn({ children: e, className: t, ...r }) {
  return /* @__PURE__ */ n(
    "li",
    {
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      "aria-hidden": "true",
      className: a("text-muted inline-flex items-center", t),
      ...r,
      children: e ?? /* @__PURE__ */ n(he, { className: "size-3.5" })
    }
  );
}
function In({ className: e, ...t }) {
  return /* @__PURE__ */ u(
    "span",
    {
      "data-slot": "breadcrumb-ellipsis",
      role: "presentation",
      "aria-hidden": "true",
      className: a("text-muted flex size-9 items-center justify-center", e),
      ...t,
      children: [
        /* @__PURE__ */ n(xe, { className: "size-4" }),
        /* @__PURE__ */ n("span", { className: "sr-only", children: "More" })
      ]
    }
  );
}
function _n({
  palette: e,
  value: t,
  onChange: r,
  "aria-label": o,
  allowCustom: l = !0,
  className: i
}) {
  const c = !!t && !e.some((m) => m.value === t), [p, x] = s.useState(c ? t : ""), b = () => {
    const m = p.trim();
    /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(m) && r(m);
  };
  return /* @__PURE__ */ u(
    "div",
    {
      className: a("flex flex-wrap items-center gap-1", i),
      role: "group",
      "aria-label": o,
      children: [
        e.map((m) => /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            "aria-label": `${o} ${m.value}`,
            "aria-pressed": m.value === t,
            title: m.label ?? m.value,
            className: a(
              "h-5 w-5 rounded-full border transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
              m.value === t ? "border-fg ring-2 ring-accent/40" : "border-border"
            ),
            style: { background: m.css },
            onClick: () => r(m.value)
          },
          m.value
        )),
        l && /* @__PURE__ */ u("span", { className: "flex items-center gap-1", children: [
          c && /* @__PURE__ */ n(
            "span",
            {
              className: "inline-block h-5 w-5 rounded-full border border-fg",
              style: { background: t },
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ n(
            te,
            {
              "aria-label": `${o} custom hex`,
              className: "h-6 w-20 px-1.5 text-[11px]",
              placeholder: "#22c55e",
              value: p,
              onChange: (m) => x(m.target.value),
              onBlur: b,
              onKeyDown: (m) => {
                m.key === "Enter" && b();
              }
            }
          )
        ] })
      ]
    }
  );
}
function An({
  text: e,
  label: t,
  copiedLabel: r = "Copied",
  variant: o = "ghost",
  size: l = "sm",
  className: i,
  ariaLabel: c = "copy to clipboard"
}) {
  const { copied: p, copy: x } = De(), b = !t && l === "icon";
  return /* @__PURE__ */ u(
    _e,
    {
      type: "button",
      variant: o,
      size: l,
      "aria-label": t ? void 0 : c,
      title: "Copy to the clipboard",
      disabled: e.length === 0,
      onClick: () => void x(e),
      className: a(!b && "gap-1 text-xs", i),
      children: [
        p ? /* @__PURE__ */ n(Q, { size: 13, className: "text-accent" }) : /* @__PURE__ */ n(ve, { size: 13 }),
        t ? p ? r : t : null
      ]
    }
  );
}
function On({
  className: e,
  size: t = "md",
  ...r
}) {
  return /* @__PURE__ */ n(
    "select",
    {
      "data-slot": "select",
      "data-size": t,
      className: a(
        // The field look Input and Textarea share: same inset, focus border + ring, disabled fade. The
        // browser's own arrow is turned off (it brings its own inner padding, so the text sat further in
        // than an Input's); the chevron is the `--field-chevron` token, placed as the Combobox's is: 12px,
        // 10px from the outer right edge at both heights (Rubix Chart Shading §10).
        "w-full appearance-none rounded-md border border-border bg-bg bg-(image:--field-chevron) bg-no-repeat pl-2.5 text-fg transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60",
        t === "sm" ? "h-8 bg-size-[12px] bg-position-[right_9px_center] pr-7 text-xs" : "h-9 bg-size-[12px] bg-position-[right_9px_center] pr-8 text-sm",
        e
      ),
      ...r
    }
  );
}
const ae = s.createContext(null);
function ie(e) {
  const t = s.useContext(ae);
  if (!t) throw new Error(`<${e}> must be used inside <Tabs>`);
  return t;
}
function $n({ value: e, onValueChange: t, className: r, ...o }) {
  const l = s.useId(), i = s.useMemo(
    () => ({ value: e, setValue: t, baseId: l }),
    [e, t, l]
  );
  return /* @__PURE__ */ n(ae.Provider, { value: i, children: /* @__PURE__ */ n("div", { "data-slot": "tabs", className: a("flex flex-col gap-3", r), ...o }) });
}
function Bn({ className: e, ...t }) {
  return /* @__PURE__ */ n(
    "div",
    {
      role: "tablist",
      "data-slot": "tabs-list",
      className: a(
        // Track + active-pill colors come from the `--tab-*` vars (globals.css) so the look's
        // `data-buttons` axis can swap the house tint for stock shadcn's flat pill on a muted track.
        "flex flex-wrap items-center gap-1 rounded-lg border border-border bg-(--tab-track) p-1",
        e
      ),
      ...t
    }
  );
}
function jn({ value: e, className: t, ...r }) {
  const { value: o, setValue: l, baseId: i } = ie("TabsTrigger"), c = o === e;
  return /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "tab",
      id: `${i}-tab-${e}`,
      "aria-selected": c,
      "aria-controls": `${i}-panel-${e}`,
      "data-slot": "tabs-trigger",
      tabIndex: c ? 0 : -1,
      onClick: () => l(e),
      className: a(
        "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:pointer-events-none disabled:opacity-50",
        c ? "bg-(--tab-active-bg) text-(--tab-active-fg) shadow-(--tab-active-shadow)" : "text-muted hover:bg-bg hover:text-fg",
        t
      ),
      ...r
    }
  );
}
function En({ value: e, className: t, children: r, ...o }) {
  const { value: l, baseId: i } = ie("TabsContent"), c = Se();
  return l !== e ? null : /* @__PURE__ */ n(
    "div",
    {
      role: "tabpanel",
      id: `${i}-panel-${e}`,
      "aria-labelledby": `${i}-tab-${e}`,
      "data-slot": "tabs-content",
      className: a("flex min-h-0 flex-col focus-visible:outline-none", t),
      tabIndex: 0,
      ...o,
      children: /* @__PURE__ */ n(c, { className: "flex min-h-0 flex-1 flex-col", children: r }, e)
    }
  );
}
export {
  Nn as Accordion,
  kn as AccordionContent,
  Cn as AccordionItem,
  Sn as AccordionTrigger,
  Ye as Alert,
  et as AlertDescription,
  Ze as AlertTitle,
  tt as Badge,
  zn as Breadcrumb,
  In as BreadcrumbEllipsis,
  Rn as BreadcrumbItem,
  Dn as BreadcrumbLink,
  Tn as BreadcrumbList,
  Mn as BreadcrumbPage,
  Pn as BreadcrumbSeparator,
  _e as Button,
  nt as Card,
  it as CardContent,
  at as CardDescription,
  st as CardFooter,
  rt as CardHeader,
  ot as CardTitle,
  lt as Checkbox,
  yt as Collapsible,
  Ct as CollapsibleContent,
  Nt as CollapsibleTrigger,
  _n as ColorSwatchPicker,
  It as Combobox,
  An as CopyButton,
  St as Dialog,
  zt as DialogClose,
  Tt as DialogContent,
  Pt as DialogDescription,
  Dt as DialogFooter,
  Rt as DialogHeader,
  $e as DialogOverlay,
  Oe as DialogPortal,
  j as DialogSurfaceContext,
  Mt as DialogTitle,
  kt as DialogTrigger,
  _t as DropdownMenu,
  Et as DropdownMenuCheckboxItem,
  $t as DropdownMenuContent,
  Bt as DropdownMenuGroup,
  jt as DropdownMenuItem,
  Ht as DropdownMenuLabel,
  Ot as DropdownMenuPortal,
  Lt as DropdownMenuRadioGroup,
  Gt as DropdownMenuRadioItem,
  Vt as DropdownMenuSeparator,
  Ft as DropdownMenuShortcut,
  Ut as DropdownMenuSub,
  Kt as DropdownMenuSubContent,
  Wt as DropdownMenuSubTrigger,
  At as DropdownMenuTrigger,
  te as Input,
  ct as Label,
  Qt as Menubar,
  tn as MenubarCheckboxItem,
  Yt as MenubarContent,
  Zt as MenubarGroup,
  en as MenubarItem,
  on as MenubarLabel,
  qt as MenubarMenu,
  Jt as MenubarPortal,
  nn as MenubarRadioGroup,
  rn as MenubarRadioItem,
  an as MenubarSeparator,
  sn as MenubarShortcut,
  ln as MenubarSub,
  dn as MenubarSubContent,
  cn as MenubarSubTrigger,
  Xt as MenubarTrigger,
  un as Popover,
  fn as PopoverAnchor,
  bn as PopoverContent,
  je as PopoverTrigger,
  qe as RubixUiProvider,
  Ee as ScrollArea,
  ne as ScrollBar,
  On as Select,
  dt as Separator,
  mn as Sheet,
  pn as SheetContent,
  hn as SheetDescription,
  gn as SheetHeader,
  xn as SheetTitle,
  ut as Skeleton,
  ft as Spinner,
  bt as Switch,
  mt as Table,
  gt as TableBody,
  vt as TableCell,
  ht as TableHead,
  pt as TableHeader,
  xt as TableRow,
  $n as Tabs,
  En as TabsContent,
  Bn as TabsList,
  jn as TabsTrigger,
  wt as Textarea,
  wn as Tooltip,
  yn as TooltipContent,
  vn as TooltipProvider,
  He as TooltipTrigger,
  Me as alertVariants,
  Pe as badgeVariants,
  Ie as buttonVariants,
  Je as canWriteText,
  a as cn,
  De as useClipboard,
  Ae as useDialogSurface,
  S as useOverlayContainer,
  Re as writeText
};
