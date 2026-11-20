import { useState as i, useLayoutEffect as u } from "react";
function d(t) {
  const [s, o] = i(null);
  return u(() => {
    const e = t.current;
    if (!e || typeof ResizeObserver > "u") return;
    const n = () => o(e.getBoundingClientRect().width);
    n();
    const r = new ResizeObserver(n);
    return r.observe(e), () => r.disconnect();
  }, [t]), s;
}
export {
  d as useElementWidth
};
