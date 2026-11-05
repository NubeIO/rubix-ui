import { jsx as p } from "react/jsx-runtime";
import * as r from "react";
import * as q from "@radix-ui/react-popover";
import { useOverlayContainer as F } from "../lib/overlay.js";
import { ComboboxChip as K } from "./combobox-chip.js";
import { ComboboxField as Q } from "./combobox-field.js";
import { ComboboxList as U } from "./combobox-list.js";
import { matches as z, groupOptions as B } from "./combobox-options.js";
import { useDialogSurface as G } from "./dialog.js";
function _({
  options: u,
  value: o,
  onChange: v,
  placeholder: A = "— select —",
  "aria-label": a,
  allowCustom: x = !1,
  clearable: E = !1,
  disabled: C = !1,
  size: I = "md",
  renderValue: i,
  searchable: $ = !0,
  chip: b,
  className: g
}) {
  const [n, f] = r.useState(!1), [c, D] = r.useState(""), [S, m] = r.useState(0), k = r.useId(), h = `${k}-list`, M = (t) => `${k}-opt-${t}`, P = G(), R = F(), d = P ?? R, l = u.filter((t) => z(t, c)), e = u.find((t) => t.value === o);
  r.useEffect(() => {
    n && (D(""), m(0));
  }, [n]);
  const y = (t) => {
    v(t), f(!1);
  }, w = () => {
    v(""), f(!1);
  }, j = (t) => {
    if (t.key === "Escape") {
      f(!1);
      return;
    }
    if (t.key === "ArrowDown")
      t.preventDefault(), m((s) => Math.min(s + 1, l.length - 1));
    else if (t.key === "ArrowUp")
      t.preventDefault(), m((s) => Math.max(s - 1, 0));
    else if (t.key === "Enter") {
      t.preventDefault();
      const s = l[S];
      s ? y(s.value) : x && c.trim() && y(c.trim());
    }
  }, O = /* @__PURE__ */ p(
    U,
    {
      container: d,
      listId: h,
      optionId: M,
      ariaLabel: a,
      value: o,
      groups: B(l),
      count: l.length,
      active: S,
      setActive: m,
      query: c,
      setQuery: D,
      searchable: $,
      allowCustom: x,
      fitContent: b !== void 0,
      onKeyDown: j,
      commit: y
    }
  );
  return /* @__PURE__ */ p(q.Root, { open: n, onOpenChange: f, children: b !== void 0 ? /* @__PURE__ */ p(
    K,
    {
      chip: b,
      ariaLabel: a,
      open: n,
      listId: h,
      disabled: C,
      on: o !== "",
      label: (i == null ? void 0 : i(o, e)) || (e ? e.label ?? e.value : o),
      onClear: w,
      className: g,
      children: O
    }
  ) : /* @__PURE__ */ p(
    Q,
    {
      ariaLabel: a,
      open: n,
      listId: h,
      disabled: C,
      size: I,
      current: e,
      label: o !== "" && (i == null ? void 0 : i(o, e)) || (e ? e.label ?? e.value : o || A),
      showClear: E && !C && o !== "",
      onClear: w,
      className: g,
      children: O
    }
  ) });
}
export {
  _ as Combobox
};
