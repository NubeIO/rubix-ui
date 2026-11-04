import { jsx as o } from "react/jsx-runtime";
import * as n from "react";
function i({ children: t, className: e }) {
  return /* @__PURE__ */ o("div", { className: e, children: t });
}
function a({ open: t, children: e, className: u }) {
  return t ? /* @__PURE__ */ o("div", { className: u, children: e }) : null;
}
const r = n.createContext({});
function c({
  motion: t,
  children: e
}) {
  return /* @__PURE__ */ o(r.Provider, { value: t, children: e });
}
function s() {
  return n.useContext(r).Reveal ?? i;
}
function v() {
  return n.useContext(r).Collapse ?? a;
}
export {
  c as MotionProvider,
  v as useCollapse,
  s as useReveal
};
