import { clsx as h } from "clsx";
import { extendTailwindMerge as w } from "tailwind-merge";
import { jsx as r } from "react/jsx-runtime";
import { cva as u } from "class-variance-authority";
import * as i from "react";
import { Slot as N } from "@radix-ui/react-slot";
import { Loader2 as y } from "lucide-react";
const T = w({
  extend: {
    theme: {
      text: ["micro", "caption", "detail", "value-lg", "value-xl"],
      radius: ["panel"]
    }
  }
});
function a(...t) {
  return T(h(t));
}
const k = u(
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
function L({
  className: t,
  variant: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      role: "alert",
      "data-slot": "alert",
      className: a(k({ variant: e }), t),
      ...n
    }
  );
}
function j({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "alert-title",
      className: a("font-medium leading-relaxed tracking-tight", t),
      ...e
    }
  );
}
function D({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "alert-description",
      className: a("text-sm leading-relaxed [&_p]:leading-relaxed", t),
      ...e
    }
  );
}
const R = u(
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
function M({
  className: t,
  variant: e,
  pill: n,
  size: o,
  ...s
}) {
  return /* @__PURE__ */ r(
    "span",
    {
      "data-slot": "badge",
      className: a(R({ variant: e, pill: n, size: o }), t),
      ...s
    }
  );
}
const S = u(
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
), C = i.forwardRef(function({ className: e, variant: n, size: o, asChild: s = !1, ...d }, l) {
  return /* @__PURE__ */ r(
    s ? N : "button",
    {
      ref: l,
      "data-btn": o ?? "default",
      className: a(S({ variant: n, size: o, className: e })),
      ...d
    }
  );
});
function F({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "card",
      "data-panel": "",
      className: a("flex flex-col rounded-lg border border-border bg-card text-fg", t),
      ...e
    }
  );
}
function q({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { "data-slot": "card-header", className: a("flex flex-col gap-1 p-4", t), ...e });
}
function E({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "card-title",
      className: a("text-sm font-semibold leading-none", t),
      ...e
    }
  );
}
function G({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { "data-slot": "card-description", className: a("text-xs text-muted", t), ...e });
}
function J({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { "data-slot": "card-content", className: a("p-4 pt-0", t), ...e });
}
function K({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "card-footer",
      className: a("flex items-center p-4 pt-0", t),
      ...e
    }
  );
}
function O({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "input",
    {
      type: "checkbox",
      "data-slot": "checkbox",
      className: a(
        "h-4 w-4 shrink-0 cursor-pointer rounded-md border-border accent-[hsl(var(--accent))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50",
        t
      ),
      ...e
    }
  );
}
const _ = i.forwardRef(
  ({ className: t, type: e, ...n }, o) => /* @__PURE__ */ r(
    "input",
    {
      ref: o,
      type: e,
      "data-slot": "input",
      className: a(
        "flex h-9 w-full min-w-0 rounded-md border border-border bg-bg px-2.5 py-1.5 text-sm text-fg transition-colors placeholder:text-muted/60 selection:bg-accent/20 selection:text-fg focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60",
        t
      ),
      ...n
    }
  )
);
_.displayName = "Input";
const P = i.forwardRef(function({ className: e, ...n }, o) {
  return /* @__PURE__ */ r(
    "label",
    {
      ref: o,
      "data-slot": "label",
      className: a(
        "text-sm font-medium leading-none text-fg peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        e
      ),
      ...n
    }
  );
}), Q = i.forwardRef(function({ className: e, orientation: n = "horizontal", decorative: o = !0, ...s }, d) {
  return /* @__PURE__ */ r(
    "div",
    {
      ref: d,
      "data-slot": "separator",
      role: o ? "none" : "separator",
      "aria-orientation": o ? void 0 : n,
      className: a(
        "shrink-0 bg-border",
        n === "horizontal" ? "h-px w-full" : "h-full w-px",
        e
      ),
      ...s
    }
  );
});
function U({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: a("animate-pulse rounded-md bg-panel-3", t), ...e });
}
function W({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    y,
    {
      "data-slot": "spinner",
      "aria-hidden": e["aria-label"] ? void 0 : !0,
      className: a("size-3.5 shrink-0 animate-spin", t),
      ...e
    }
  );
}
const X = i.forwardRef(function({ className: e, checked: n, defaultChecked: o, onCheckedChange: s, disabled: d, onClick: l, ...b }, m) {
  const f = n !== void 0, [p, x] = i.useState(o ?? !1), c = f ? n : p;
  return /* @__PURE__ */ r(
    "button",
    {
      ref: m,
      type: "button",
      role: "switch",
      "aria-checked": c,
      "data-slot": "switch",
      "data-state": c ? "checked" : "unchecked",
      disabled: d,
      onClick: (v) => {
        l == null || l(v);
        const g = !c;
        f || x(g), s == null || s(g);
      },
      className: a(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50",
        c ? "bg-accent" : "bg-border",
        e
      ),
      ...b,
      children: /* @__PURE__ */ r(
        "span",
        {
          "aria-hidden": !0,
          className: a(
            "pointer-events-none block h-4 w-4 rounded-full bg-bg shadow-sm ring-0 transition-transform",
            c ? "translate-x-4" : "translate-x-0.5"
          )
        }
      )
    }
  );
});
function Y({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { "data-slot": "table-container", className: "relative w-full overflow-x-auto", children: /* @__PURE__ */ r(
    "table",
    {
      "data-slot": "table",
      className: a("w-full caption-bottom border-collapse text-sm text-fg", t),
      ...e
    }
  ) });
}
function Z({
  className: t,
  sticky: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "thead",
    {
      "data-slot": "table-header",
      className: a(
        "border-b border-border bg-card/40 [&_tr]:border-b",
        e && "sticky top-0 z-10 bg-panel shadow-[0_1px_0_hsl(var(--border))]",
        t
      ),
      ...n
    }
  );
}
function $({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "tbody",
    {
      "data-slot": "table-body",
      className: a("[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function ee({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "tr",
    {
      "data-slot": "table-row",
      className: a(
        "border-b border-border transition-colors hover:bg-bg/60 data-[state=selected]:bg-accent/10",
        t
      ),
      ...e
    }
  );
}
function te({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "th",
    {
      "data-slot": "table-head",
      className: a(
        "h-9 px-3 text-left align-middle text-caption font-semibold uppercase tracking-[0.06em] text-muted",
        t
      ),
      ...e
    }
  );
}
function re({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "td",
    {
      "data-slot": "table-cell",
      className: a("px-3 py-2 align-middle text-xs text-fg", t),
      ...e
    }
  );
}
const ae = i.forwardRef(
  function({ className: e, ...n }, o) {
    return /* @__PURE__ */ r(
      "textarea",
      {
        ref: o,
        "data-slot": "textarea",
        className: a(
          "flex w-full min-w-0 rounded-md border border-border bg-bg px-2.5 py-2 text-sm leading-5 font-mono text-fg transition-colors placeholder:text-muted/60 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60",
          e
        ),
        ...n
      }
    );
  }
);
export {
  L as Alert,
  D as AlertDescription,
  j as AlertTitle,
  M as Badge,
  C as Button,
  F as Card,
  J as CardContent,
  G as CardDescription,
  K as CardFooter,
  q as CardHeader,
  E as CardTitle,
  O as Checkbox,
  _ as Input,
  P as Label,
  Q as Separator,
  U as Skeleton,
  W as Spinner,
  X as Switch,
  Y as Table,
  $ as TableBody,
  re as TableCell,
  te as TableHead,
  Z as TableHeader,
  ee as TableRow,
  ae as Textarea,
  k as alertVariants,
  R as badgeVariants,
  S as buttonVariants,
  a as cn
};
