import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";

import { CountChips } from "./count-chips";

const chips = [
  { key: "all", label: "All", count: 9 },
  { key: "fault", label: "Faults", count: 3 },
  { key: "stale", label: "Stale", count: 0 },
  { key: "offline", label: "Offline", count: 6 },
];

describe("CountChips", () => {
  it("shows the whole list's chip always and the rest only where they count, with the pick pressed", () => {
    const onChange = vi.fn();
    render(<CountChips label="Filter Issues" chips={chips} value="fault" onChange={onChange} />);
    const row = screen.getByRole("group", { name: "Filter Issues" });
    expect(within(row).getAllByRole("button").map((b) => b.textContent)).toEqual(["All9", "Faults3", "Offline6"]);
    expect(within(row).getByRole("button", { name: /Faults/, pressed: true })).toBeTruthy();
    fireEvent.click(within(row).getByRole("button", { name: /Offline/ }));
    expect(onChange).toHaveBeenLastCalledWith("offline");
  });
});
