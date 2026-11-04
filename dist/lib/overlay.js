import { jsx as n } from "react/jsx-runtime";
import * as e from "react";
const r = e.createContext(null);
function i({
  container: t,
  children: o
}) {
  return /* @__PURE__ */ n(r.Provider, { value: t, children: o });
}
function u() {
  return e.useContext(r) ?? void 0;
}
export {
  i as OverlayProvider,
  u as useOverlayContainer
};
