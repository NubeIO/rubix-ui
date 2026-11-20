import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { BreakdownList, BreakdownRow } from "./breakdown-list";

describe("BreakdownList", () => {
  it("shows each group's count in its tone, its share beside its title, and its words, a hairline between", () => {
    const { container } = render(
      <BreakdownList>
        <BreakdownRow value={28} tone="success" title="Healthy" share="67%">20 running · 8 stopped</BreakdownRow>
        <BreakdownRow value={8} tone="destructive" title="Needs attention" share="19%">3 faults</BreakdownRow>
      </BreakdownList>,
    );
    expect(screen.getByText("28").style.color).toBe("hsl(var(--success))");
    expect(screen.getByText("Healthy").nextElementSibling!.textContent).toBe("67%");
    expect(screen.getByText("20 running · 8 stopped")).toBeTruthy();
    expect((container.firstElementChild as HTMLElement).className).toContain("[&>*+*]:border-t");
  });
});
