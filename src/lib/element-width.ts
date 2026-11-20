// An element's width, its border box (padding and border in), kept current as it resizes. Measured
// once before the first paint too, so a layout chosen from it never shows the wrong shape for a frame,
// and the same box every time: two elements in one column measure alike whatever their padding, and
// the first measure never disagrees with the next. `null` before the first measure, and under jsdom
// (no ResizeObserver, no layout).
//
// One responsibility: report an element's width.

import { useLayoutEffect, useState, type RefObject } from "react";

export function useElementWidth(ref: RefObject<HTMLElement | null>): number | null {
  const [width, setWidth] = useState<number | null>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const measure = () => setWidth(el.getBoundingClientRect().width);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return width;
}
