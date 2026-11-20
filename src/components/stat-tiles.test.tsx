import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";

import { StatTiles } from "./stat-tiles";

const tiles = [
  { key: "rep", label: "Units reporting", value: 34, suffix: "/ 42", bar: 81, note: "81% reporting · 8 sites" },
  { key: "run", label: "Running normally", value: 20, suffix: "units", dot: "success", note: "+ 8 stopped with no issues" },
  { key: "att", label: "Need attention", value: 8, suffix: "units", dot: "destructive", note: "3 faults", alarm: true },
  { key: "off", label: "Offline or unknown", value: 0, suffix: "units", dot: "line-strong", note: "None", alarm: true },
];

describe("StatTiles", () => {
  it("draws each tile's label, number, word beside it, bar and note, in a named group", () => {
    render(<StatTiles label="Summary" tiles={tiles} />);
    const row = screen.getByRole("group", { name: "Summary" });
    expect(within(row).getAllByRole("heading").map((h) => h.textContent)).toEqual(tiles.map((t) => t.label));
    expect(within(row).getByText("/ 42")).toBeTruthy();
    expect(row.querySelector<HTMLElement>("[data-bar-fill]")!.style.width).toBe("81%");
    // The note sits at the tile's foot: `mt-auto`, never cancelled by a later `m-0`.
    const note = within(row).getByText("81% reporting · 8 sites");
    expect(note.className).toContain("mt-auto");
    expect(note.className).not.toMatch(/(^|\s)m-0(\s|$)/);
  });

  it("tints an alarm tile only while it counts anything", () => {
    render(<StatTiles label="Summary" tiles={tiles} />);
    const tile = (label: string) => screen.getByRole("heading", { name: label }).closest("section")!;
    expect(tile("Need attention").className).toContain("bg-destructive/[0.06]");
    expect(tile("Offline or unknown").className).not.toContain("bg-destructive");
  });
});
