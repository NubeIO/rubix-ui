const e = {
  token: null,
  css: "hsl(var(--surface-inset))",
  bg: "bg-surface-inset",
  border: "border-line-strong",
  text: "text-ink-muted"
}, r = [
  { token: "--chart-8", css: "hsl(var(--chart-8))", bg: "bg-chart-8", border: "border-chart-8", text: "text-on-solid" },
  { token: "--chart-7", css: "hsl(var(--chart-7))", bg: "bg-chart-7", border: "border-chart-7", text: "text-on-solid" },
  { token: "--chart-2", css: "hsl(var(--chart-2))", bg: "bg-chart-2", border: "border-chart-2", text: "text-on-solid" },
  { token: "--chart-1", css: "hsl(var(--chart-1))", bg: "bg-chart-1", border: "border-chart-1", text: "text-on-solid" },
  { token: "--chart-5", css: "hsl(var(--chart-5))", bg: "bg-chart-5", border: "border-chart-5", text: "text-on-solid" }
];
function o(t) {
  return t <= 0 ? e : r[Math.min(t, r.length) - 1];
}
export {
  o as nameColour
};
