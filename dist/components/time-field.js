import { jsx as n } from "react/jsx-runtime";
import { cn as u } from "../lib/cn.js";
import { parseTime as h, hhmm as o, DAY_MINS as l } from "../lib/time.js";
import { Input as c } from "./input.js";
function y({ value: r, onChange: e, className: s, onKeyDown: m, onBlur: a, ...d }) {
  const i = h(r);
  return /* @__PURE__ */ n(
    c,
    {
      "aria-invalid": i === void 0,
      inputMode: "numeric",
      placeholder: "HH:MM",
      title: "Type 13:05, 1305 or 13. ↑/↓ nudge a minute; Shift 15 minutes; Alt an hour. 24:00 is the end of the day.",
      "data-slot": "time-field",
      className: u("w-24 tabular-nums", s),
      value: r,
      onChange: (t) => e(t.target.value),
      onBlur: (t) => {
        i !== void 0 && o(i) !== r && e(o(i)), a == null || a(t);
      },
      onKeyDown: (t) => {
        if (m == null || m(t), t.defaultPrevented || t.key !== "ArrowUp" && t.key !== "ArrowDown") return;
        t.preventDefault();
        const p = t.altKey ? 60 : t.shiftKey ? 15 : 1, f = (i ?? 0) + (t.key === "ArrowUp" ? p : -p);
        e(o(Math.max(0, Math.min(l, f))));
      },
      ...d
    }
  );
}
export {
  y as TimeField
};
