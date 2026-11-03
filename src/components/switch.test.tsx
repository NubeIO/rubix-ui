import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Switch } from "./switch";

describe("Switch", () => {
  it("flips itself when uncontrolled", async () => {
    render(<Switch aria-label="enabled" />);
    const sw = screen.getByRole("switch", { name: "enabled" });
    expect(sw.getAttribute("aria-checked")).toBe("false");
    await userEvent.click(sw);
    expect(sw.getAttribute("aria-checked")).toBe("true");
  });

  it("reports the next value but keeps the parent's when controlled", async () => {
    const onChange = vi.fn();
    render(<Switch aria-label="enabled" checked={false} onCheckedChange={onChange} />);
    const sw = screen.getByRole("switch", { name: "enabled" });
    await userEvent.click(sw);
    expect(onChange).toHaveBeenCalledWith(true);
    expect(sw.getAttribute("aria-checked")).toBe("false");
  });
});
