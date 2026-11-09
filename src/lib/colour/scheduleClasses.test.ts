// Every class the colour helpers hand a component is in the built extension stylesheet, under
// the extension root, and reads the host's own variable. They come from `src/lib/colour`, not a
// component, so they exist only because `scoped.css` scans this folder; drop that and an extension
// draws every name block unfilled.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { nameColour } from "./nameColour";
import { SCHEDULE_COLOURS } from "./scheduleColour";

// vitest runs from the package root.
const css = readFileSync(resolve("dist/rubix-ui.css"), "utf8");

describe("schedule colour classes", () => {
  const tones = [0, 1, 2, 3, 4, 5].map(nameColour);
  const classes = [...tones.flatMap((t) => [t.bg, t.border, t.text]), ...SCHEDULE_COLOURS.map((c) => c.bg)];

  it.each([...new Set(classes)])("%s is built under [data-ext-root]", (c) => {
    expect(css).toContain(`[data-ext-root] .${c}{`);
  });

  it("reads the host's chart variables, declaring none of its own", () => {
    expect(css).toContain("[data-ext-root] .bg-chart-8{background-color:hsl(var(--chart-8))}");
    expect(css).not.toMatch(/--chart-\d\s*:/);
    for (const t of tones.slice(1)) expect(t.css).toBe(`hsl(var(${t.token}))`);
  });
});
