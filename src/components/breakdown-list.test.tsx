import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { BreakdownList, BreakdownRow } from "./breakdown-list";

describe("BreakdownList", () => {
  it("shows each group's count in its tone, its share at its title line's end, and its words, a hairline between", () => {
    const { container } = render(
      <BreakdownList>
        <BreakdownRow value={28} tone="success" title="Healthy" share="67%">20 running · 8 stopped</BreakdownRow>
        <BreakdownRow value={8} tone="destructive" title="Needs attention" share="19%">3 faults</BreakdownRow>
      </BreakdownList>,
    );
    expect(screen.getByText("28").style.color).toBe("hsl(var(--success))");
    const share = screen.getByText("Healthy").nextElementSibling as HTMLElement;
    expect(share.textContent).toBe("67%");
    expect(share.parentElement!.className).toContain("justify-between");
    expect(screen.getByText("20 running · 8 stopped")).toBeTruthy();
    expect((container.firstElementChild as HTMLElement).className).toContain("[&>*+*]:border-t");
  });
});
