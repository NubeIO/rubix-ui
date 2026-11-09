import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { FacetChip } from "./facet-chip";
import { FilterTiles } from "./filter-tiles";

const tiles = [
  { key: "all", label: "Total", count: 1008, tone: "accent", icon: null, note: "Every schedule" },
  { key: "attn", label: "Needs attention", count: 3, tone: "destructive", icon: null, note: "A box failed", alarm: true },
];

describe("FilterTiles", () => {
  it("filters on a tile, goes back to the first on a second pick, and marks the alarm count", () => {
    const onPick = vi.fn();
    const { rerender } = render(<FilterTiles label="Summary" tiles={tiles} active="all" onPick={onPick} />);
    expect(screen.getAllByText("Filter →")).toHaveLength(1);
    expect(screen.getByText("3").className).toContain("text-destructive");
    fireEvent.click(screen.getByRole("button", { name: /Needs attention/ }));
    expect(onPick).toHaveBeenLastCalledWith("attn");
    rerender(<FilterTiles label="Summary" tiles={tiles} active="attn" onPick={onPick} />);
    expect(screen.getByRole("button", { name: /Needs attention/, pressed: true })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Needs attention/ }));
    expect(onPick).toHaveBeenLastCalledWith("all");
  });
});

describe("FacetChip", () => {
  it("shows the picks on the chip and clears them", () => {
    const onChange = vi.fn();
    render(<FacetChip label="Time zone" values={["Australia/Perth"]} selected={["Australia/Perth"]} onChange={onChange} />);
    expect(screen.getByText("· Australia/Perth")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "clear time zone filter" }));
    expect(onChange).toHaveBeenCalledWith([]);
  });
});
