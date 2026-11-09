import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { PanelFrame } from "./panel-frame";

describe("PanelFrame", () => {
  it("draws the panel frame around its children", () => {
    render(
      <PanelFrame className="h-40" aria-label="Unit card">
        <p>body</p>
      </PanelFrame>,
    );
    const frame = screen.getByLabelText("Unit card");
    expect(frame.tagName).toBe("DIV");
    expect(frame.getAttribute("data-panel")).toBe("");
    expect(frame.hasAttribute("data-transparent")).toBe(false);
    for (const c of ["surface-panel", "rounded-panel", "border-border", "bg-panel", "shadow-(--elev-panel)", "h-40"]) {
      expect(frame.classList.contains(c), c).toBe(true);
    }
    expect(frame.textContent).toBe("body");
  });

  it("transparent drops data-panel, the border, background and shadow", () => {
    render(<PanelFrame transparent className="h-40" aria-label="Unit card" />);
    const frame = screen.getByLabelText("Unit card");
    expect(frame.hasAttribute("data-panel")).toBe(false);
    expect(frame.getAttribute("data-transparent")).toBe("true");
    expect(frame.className).toBe("group/cell flex flex-col overflow-hidden rounded-panel h-40");
  });
});
