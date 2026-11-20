import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { CountToggle } from "./count-toggle";

describe("CountToggle", () => {
  it("narrows on a press, lets go on a second, and is off at 0 unless pressed", () => {
    const onToggle = vi.fn();
    const { rerender } = render(<CountToggle pressed={false} count={3} onToggle={onToggle} title="Units with a fault. Show only these">3 faults</CountToggle>);
    const b = screen.getByRole("button", { name: "3 faults" });
    expect(b.getAttribute("aria-pressed")).toBe("false");
    expect(b.title).toBe("Units with a fault. Show only these");
    fireEvent.click(b);
    expect(onToggle).toHaveBeenLastCalledWith(true);
    rerender(<CountToggle pressed count={0} onToggle={onToggle} pressedTitle="Show every unit">0 faults</CountToggle>);
    // A pressed toggle can always be let go, even emptied by a refresh.
    expect(screen.getByRole("button", { name: "0 faults" }).hasAttribute("disabled")).toBe(false);
    expect(screen.getByRole("button", { name: "0 faults" }).title).toBe("Show every unit");
    fireEvent.click(screen.getByRole("button", { name: "0 faults" }));
    expect(onToggle).toHaveBeenLastCalledWith(false);
    rerender(<CountToggle pressed={false} count={0} onToggle={onToggle}>0 faults</CountToggle>);
    expect(screen.getByRole("button", { name: "0 faults" }).hasAttribute("disabled")).toBe(true);
  });
});
