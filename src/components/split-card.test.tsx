import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { SPLIT_STACK_BELOW, SplitCard } from "./split-card";
import { SplitRow } from "./split-row";

// jsdom has no layout: give every element a width, and a ResizeObserver that never fires.
const at = (width: number) => {
  vi.stubGlobal("ResizeObserver", class { observe() {} disconnect() {} });
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({ width, height: 400, top: 0, left: 0, right: width, bottom: 400, x: 0, y: 0, toJSON() {} } as DOMRect);
};
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const both = () =>
  render(
    <>
      <SplitCard label="Fleet status" left={<p>Fleet health</p>} right={<p>Operating mode</p>} />
      <SplitRow left={<section>Sites</section>} right={<section>Issues</section>} />
    </>,
  );

describe("SplitCard and SplitRow", () => {
  it("sit side by side at the stack width and up, on the same 3 : 2 lines", () => {
    at(SPLIT_STACK_BELOW);
    const { container } = both();
    const card = screen.getByRole("region", { name: "Fleet status" });
    expect(card.dataset.split).toBe("side");
    expect((card.children[1] as HTMLElement).style.borderLeft).toContain("1px solid");
    const row = container.querySelector<HTMLElement>("div[data-split]")!;
    expect(row.dataset.split).toBe("side");
    expect(row.className).toContain("calc(60%-1px)");
  });

  it("stack together below it, the card's divider across", () => {
    at(SPLIT_STACK_BELOW - 1);
    const { container } = both();
    const card = screen.getByRole("region", { name: "Fleet status" });
    expect(card.dataset.split).toBe("stack");
    expect((card.children[1] as HTMLElement).dataset.splitDivider).toBe("top");
    expect((card.children[1] as HTMLElement).style.borderTop).toContain("1px solid");
    expect(container.querySelector<HTMLElement>("div[data-split]")!.dataset.split).toBe("stack");
  });

  it("side by side before they are measured (jsdom)", () => {
    both();
    expect(screen.getByRole("region", { name: "Fleet status" }).dataset.split).toBe("side");
  });
});
