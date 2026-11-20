import { jsx as t } from "react/jsx-runtime";
import { tone as r } from "../lib/tone.js";
function a({ count: n, tone: e }) {
  return n === null ? /* @__PURE__ */ t("span", { className: "text-ink-muted", children: "—" }) : n ? /* @__PURE__ */ t(
    "span",
    {
      className: "inline-block min-w-[28px] rounded-full px-2 py-0.5 text-center text-caption font-semibold tabular-nums",
      style: { color: r(e), background: r(e, 0.14) },
      children: n.toLocaleString()
    }
  ) : /* @__PURE__ */ t("span", { className: "tabular-nums text-ink-faint", children: "0" });
}
export {
  a as CountPill
};
