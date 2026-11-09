import { jsx as e, jsxs as s } from "react/jsx-runtime";
import { TriangleAlert as c, Info as p, Upload as v, CircleAlert as g, Power as m } from "lucide-react";
import { Alert as f, AlertTitle as w, AlertDescription as y } from "./alert.js";
import { Button as l } from "./button.js";
import { cn as b } from "../lib/cn.js";
const k = {
  warning: "border-warning/35 bg-warning/8 [&>svg]:text-warning",
  info: "border-info/35 bg-info/8 [&>svg]:text-info",
  destructive: ""
};
function T({ conflict: t, needsUpgrade: r, error: n, enabled: o, offText: a, canEdit: u, onReload: d, onSwitchOn: h }) {
  return (t == null ? void 0 : t.kind) === "conflict" ? /* @__PURE__ */ e(
    i,
    {
      tone: "warning",
      icon: /* @__PURE__ */ e(c, {}),
      title: "Not saved: changed elsewhere",
      body: "Someone else saved this schedule after you opened it. Your edit is still here. Reload to get their version; your edit is kept on top so you can check it and save again.",
      action: d && /* @__PURE__ */ e(l, { variant: "solid", size: "sm", onClick: d, children: "Reload, keep my edit" })
    }
  ) : (t == null ? void 0 : t.kind) === "reloaded" ? /* @__PURE__ */ e(
    i,
    {
      tone: "info",
      icon: /* @__PURE__ */ e(p, {}),
      title: "Loaded the latest version",
      body: `Your unsaved edit is applied on top of it: ${t.applied.join(" · ") || "none"}. Check it, then save, or discard your edit to keep the saved version.`
    }
  ) : r ? /* @__PURE__ */ e(
    i,
    {
      tone: "warning",
      icon: /* @__PURE__ */ e(v, {}),
      title: "This node's backend needs upgrading",
      body: "It can't store names, values or dated entries yet. You can look and try changes, but nothing will save until the node is upgraded."
    }
  ) : n ? /* @__PURE__ */ e(i, { tone: "destructive", icon: /* @__PURE__ */ e(g, {}), title: "Not saved", body: n }) : o ? null : /* @__PURE__ */ e(
    i,
    {
      tone: "info",
      icon: /* @__PURE__ */ e(m, {}),
      title: "Switched off",
      body: `Dashboards and flows read ${a} until it's switched back on. Boxes keep running the hours they already have.`,
      action: u && /* @__PURE__ */ e(l, { variant: "outline", size: "sm", onClick: h, children: "Switch on" })
    }
  );
}
function i({ tone: t, icon: r, title: n, body: o, action: a }) {
  return /* @__PURE__ */ e("div", { className: "px-4 pt-3", children: /* @__PURE__ */ s(
    f,
    {
      role: "alert",
      variant: t === "destructive" ? "destructive" : "default",
      className: b("flex items-start gap-3", k[t]),
      children: [
        r,
        /* @__PURE__ */ s("div", { className: "grid min-w-0 flex-1 gap-0.5", children: [
          /* @__PURE__ */ e(w, { children: n }),
          /* @__PURE__ */ e(y, { children: o })
        ] }),
        a
      ]
    }
  ) });
}
export {
  T as EditorBanner
};
