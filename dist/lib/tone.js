function o(r, n) {
  return n === void 0 ? `hsl(var(--${r}))` : `hsl(var(--${r}) / ${n})`;
}
export {
  o as tone
};
