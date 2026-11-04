import { useState as c, useRef as i, useEffect as m, useCallback as p } from "react";
import { writeText as d } from "./writeText.js";
function y(u = 1500) {
  const [l, r] = c(!1), [s, n] = c(null), e = i(null), t = i(!0);
  m(() => (t.current = !0, () => {
    t.current = !1, e.current && clearTimeout(e.current);
  }), []);
  const a = p(
    async (f) => {
      const o = await d(f);
      return t.current ? o ? (n(null), r(!0), e.current && clearTimeout(e.current), e.current = setTimeout(() => r(!1), u), !0) : (r(!1), n("Copy failed"), !1) : o;
    },
    [u]
  );
  return { copied: l, error: s, copy: a };
}
export {
  y as useClipboard
};
