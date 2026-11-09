import { jsxs as n, jsx as t } from "react/jsx-runtime";
import { Check as x } from "lucide-react";
import { Button as s } from "./button.js";
import { Spinner as u } from "./spinner.js";
function g({ parts: a, saving: e, saved: l, needsUpgrade: r, saveLabel: c, onSave: o, onDiscard: d }) {
  if (a.length === 0 && !e)
    return l ? /* @__PURE__ */ n("div", { role: "status", className: "flex items-center gap-2 border-t border-line px-4 py-2.5 text-xs text-ink", children: [
      /* @__PURE__ */ t(x, { className: "size-3.5 text-success" }),
      "Saved"
    ] }) : null;
  const i = `Changed: ${a.join(" · ")}`, m = e ? "Saving…" : r ? `${i}. Can't save until the node is upgraded.` : i;
  return /* @__PURE__ */ n(
    "div",
    {
      role: "region",
      "aria-label": "Unsaved changes",
      className: "flex items-center gap-2 border-t border-line bg-surface-card px-4 py-2.5",
      children: [
        /* @__PURE__ */ t("span", { "aria-hidden": !0, className: "size-1.5 flex-none rounded-full bg-accent" }),
        /* @__PURE__ */ t("span", { className: "min-w-0 flex-1 truncate text-xs text-ink", children: m }),
        /* @__PURE__ */ t(s, { variant: "ghost", size: "sm", disabled: e, onClick: d, children: "Discard" }),
        /* @__PURE__ */ n(s, { variant: "solid", size: "sm", disabled: e || r, onClick: o, children: [
          e && /* @__PURE__ */ t(u, {}),
          e ? "Saving" : r ? "Can't save" : c
        ] })
      ]
    }
  );
}
export {
  g as SaveBar
};
