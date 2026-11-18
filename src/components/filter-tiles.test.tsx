import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

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

  it("shows \"/ of\" beside the count, read as \"of\", and a bar of value out of of with its words", () => {
    const withBars = [
      { key: "all", label: "Total", count: 16, tone: "accent", icon: null, note: "15 connected", bar: { value: 15, of: 16, title: "15 of 16 connected" } },
      { key: "run", label: "Running", count: 14, of: 16, tone: "success", icon: null, note: "1 stopped", bar: { value: 14, of: 16, title: "14 of 16 units running" } },
      { key: "iss", label: "Issues", count: 2, tone: "destructive", icon: null, note: "Comms", alarm: true },
    ];
    render(<FilterTiles label="Summary" tiles={withBars} active="all" onPick={() => {}} />);
    const run = screen.getByRole("button", { name: /Running/ });
    expect(run.textContent).toContain("/ 16");
    expect(run.querySelector(".sr-only")?.textContent).toBe(" of 16");
    const fill = run.querySelector<HTMLElement>("[data-bar-fill]")!;
    expect(fill.style.width).toBe("87.5%");
    expect(fill.title).toBe("14 of 16 units running");
    // The tile with no bar keeps the slot, so every count sits at the same height.
    const iss = screen.getByRole("button", { name: /Issues/ });
    expect(iss.querySelector("[data-bar]")).not.toBeNull();
    expect(iss.querySelector("[data-bar-fill]")).toBeNull();
  });

  it("draws a sliver for a small share, nothing for zero, and no bar row at all when no tile has one", () => {
    const small = [
      { key: "all", label: "Total", count: 70, tone: "accent", icon: null, note: "" },
      { key: "a", label: "A", count: 1, tone: "warning", icon: null, note: "", bar: { value: 1, of: 70 } },
      { key: "b", label: "B", count: 0, tone: "warning", icon: null, note: "", bar: { value: 0, of: 70 } },
    ];
    const { unmount } = render(<FilterTiles label="Summary" tiles={small} active="all" onPick={() => {}} />);
    expect(screen.getByRole("button", { name: /^A/ }).querySelector<HTMLElement>("[data-bar-fill]")!.style.minWidth).toBe("4px");
    expect(screen.getByRole("button", { name: /^B/ }).querySelector("[data-bar-fill]")).toBeNull();
    unmount();
    render(<FilterTiles label="Summary" tiles={tiles} active="all" onPick={() => {}} />);
    expect(document.querySelector("[data-bar]")).toBeNull();
  });

  it("is 120px tall unless told otherwise", () => {
    const { rerender } = render(<FilterTiles label="Summary" tiles={tiles} active="all" onPick={() => {}} />);
    expect(screen.getByRole("button", { name: /^Total/ }).style.height).toBe("120px");
    rerender(<FilterTiles label="Summary" tiles={tiles} active="all" onPick={() => {}} height={96} />);
    expect(screen.getByRole("button", { name: /^Total/ }).style.height).toBe("96px");
  });
});
