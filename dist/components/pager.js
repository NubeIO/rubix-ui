import { jsxs as t, jsx as e } from "react/jsx-runtime";
import { ChevronLeft as f, ChevronRight as b } from "lucide-react";
import { cn as u } from "../lib/cn.js";
import { Button as c } from "./button.js";
import { Combobox as x } from "./combobox.js";
const g = [10, 25, 50, 100], P = 25;
function S({ page: r, size: a, total: i, onPage: s, onSize: d, sizes: h = g, className: p }) {
  if (i === 0) return null;
  const l = Math.max(1, Math.ceil(i / a)), o = r * a + 1, m = Math.min(i, (r + 1) * a);
  return /* @__PURE__ */ t(
    "nav",
    {
      "aria-label": "Pages",
      "data-slot": "pager",
      className: u(
        "flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3 text-xs text-muted",
        p
      ),
      children: [
        /* @__PURE__ */ t("span", { children: [
          /* @__PURE__ */ e("b", { className: "font-semibold text-fg", children: o === m ? o : `${o}–${m}` }),
          " of ",
          i
        ] }),
        /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ e("span", { children: "Rows per page" }),
          /* @__PURE__ */ e(
            x,
            {
              "aria-label": "Rows per page",
              size: "sm",
              searchable: !1,
              className: "w-20",
              value: String(a),
              onChange: (n) => n && d(Number(n)),
              options: h.map((n) => ({ value: String(n) }))
            }
          ),
          /* @__PURE__ */ e("span", { className: "mx-1 h-5 w-px bg-border", "aria-hidden": !0 }),
          /* @__PURE__ */ t("span", { children: [
            "Page ",
            r + 1,
            " of ",
            l
          ] }),
          /* @__PURE__ */ e(
            c,
            {
              variant: "outline",
              size: "icon-sm",
              "aria-label": "Previous page",
              disabled: r === 0,
              onClick: () => s(r - 1),
              children: /* @__PURE__ */ e(f, { "aria-hidden": !0 })
            }
          ),
          /* @__PURE__ */ e(
            c,
            {
              variant: "outline",
              size: "icon-sm",
              "aria-label": "Next page",
              disabled: r >= l - 1,
              onClick: () => s(r + 1),
              children: /* @__PURE__ */ e(b, { "aria-hidden": !0 })
            }
          )
        ] })
      ]
    }
  );
}
export {
  P as DEFAULT_PAGE_SIZE,
  g as PAGE_SIZES,
  S as Pager
};
