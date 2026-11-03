import { describe, expect, it } from "vitest";

import { cn } from "./cn";

describe("cn", () => {
  it("keeps a page-system type size beside a text colour, in either order", () => {
    expect(cn("text-caption", "text-muted")).toBe("text-caption text-muted");
    expect(cn("text-fg", "text-value-lg")).toBe("text-fg text-value-lg");
    expect(cn("text-micro text-faint", "text-destructive")).toBe("text-micro text-destructive");
  });

  it("lets a later size replace an earlier one, named or stock", () => {
    expect(cn("text-sm", "text-caption")).toBe("text-caption");
    expect(cn("text-value-xl", "text-xs")).toBe("text-xs");
  });

  it("treats the panel radius as a radius", () => {
    expect(cn("rounded-md", "rounded-panel")).toBe("rounded-panel");
  });
});
