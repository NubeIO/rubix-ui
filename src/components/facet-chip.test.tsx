import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { FacetChip } from "./facet-chip";

describe("FacetChip", () => {
  it("shows the picks on the chip and clears them", () => {
    const onChange = vi.fn();
    render(<FacetChip label="Time zone" values={["Australia/Perth"]} selected={["Australia/Perth"]} onChange={onChange} />);
    expect(screen.getByText("· Australia/Perth")).toBeTruthy();
    expect(screen.getByRole("button", { name: "filter by time zone: Australia/Perth" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "clear time zone filter" }));
    expect(onChange).toHaveBeenCalledWith([]);
  });
});
