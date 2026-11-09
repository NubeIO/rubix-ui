// Width checks done in code, for layouts that must switch whatever stylesheet sits beside the package.
// In an extension the extension's own Tailwind rules win over this package's (they are unlayered; ours
// sit in a cascade layer), so a `hidden md:flex` pair loses to the extension's `.hidden` and the part
// never shows. A component that swaps whole layouts by width reads the width here instead.

import { useEffect, useState } from "react";

/** The host's `md` breakpoint (Tailwind's 48rem). */
export const MD_PX = 768;

/** True while the window is at least `px` wide; follows resizes. True where there is no window. */
export function useMinWidth(px: number): boolean {
  const query = `(min-width: ${px}px)`;
  const read = () => (typeof window === "undefined" || !window.matchMedia ? true : window.matchMedia(query).matches);
  const [wide, setWide] = useState(read);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const list = window.matchMedia(query);
    const on = () => setWide(list.matches);
    on();
    list.addEventListener("change", on);
    return () => list.removeEventListener("change", on);
  }, [query]);
  return wide;
}
