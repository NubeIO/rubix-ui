import { useState as a, useEffect as r } from "react";
const w = 768;
function u(i) {
  const e = `(min-width: ${i}px)`, d = () => typeof window > "u" || !window.matchMedia ? !0 : window.matchMedia(e).matches, [o, c] = a(d);
  return r(() => {
    if (typeof window > "u" || !window.matchMedia) return;
    const t = window.matchMedia(e), n = () => c(t.matches);
    return n(), t.addEventListener("change", n), () => t.removeEventListener("change", n);
  }, [e]), o;
}
export {
  w as MD_PX,
  u as useMinWidth
};
