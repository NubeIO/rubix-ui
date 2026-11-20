// A colour token as a CSS colour: `tone("success")` → `hsl(var(--success))`, with an optional alpha
// (`tone("success", 0.45)`). The overview pieces take tones as token names without `--`, as
// `FilterTiles` does, so the host's theme decides every colour.
//
// One responsibility: turn a token name into a colour.

export function tone(token: string, alpha?: number): string {
  return alpha === undefined ? `hsl(var(--${token}))` : `hsl(var(--${token}) / ${alpha})`;
}
