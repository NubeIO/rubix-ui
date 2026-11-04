import { jsx as r } from "react/jsx-runtime";
import { MotionProvider as t } from "./motion.js";
import { OverlayProvider as e } from "./overlay.js";
const m = {};
function l({
  portalContainer: o = null,
  motion: i = m,
  children: n
}) {
  return /* @__PURE__ */ r(e, { container: o, children: /* @__PURE__ */ r(t, { motion: i, children: n }) });
}
export {
  l as RubixUiProvider
};
