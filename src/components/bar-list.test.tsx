import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { BarList } from "./bar-list";

const rows = [
  { key: "cooling", label: "Cooling", value: 12, tone: "chart-8" },
  { key: "heating", label: "Heating", value: 6, tone: "chart-7" },
  { key: "auto", label: "Auto", value: 0, tone: "ink-muted" },
];

describe("BarList", () => {
  it("draws each bar as its share of the largest, in its own tone, in the given order", () => {
    const { container } = render(<BarList rows={rows} />);
    const fills = [...container.querySelectorAll<HTMLElement>("[data-bar-fill]")];
    expect(fills.map((f) => f.style.width)).toEqual(["100%", "50%", "0%"]);
    expect(fills[1].style.background).toBe("hsl(var(--chart-7))");
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("with onPick, each row toggles its key, off when it counts nothing", () => {
    const onPick = vi.fn();
    const { rerender } = render(<BarList rows={rows} onPick={onPick} />);
    fireEvent.click(screen.getByRole("button", { name: /Heating/ }));
    expect(onPick).toHaveBeenLastCalledWith("heating");
    expect(screen.getByRole("button", { name: /Auto/ }).hasAttribute("disabled")).toBe(true);
    rerender(<BarList rows={rows} onPick={onPick} picked="heating" />);
    fireEvent.click(screen.getByRole("button", { name: /Heating/, pressed: true }));
    expect(onPick).toHaveBeenLastCalledWith(undefined);
  });
});
