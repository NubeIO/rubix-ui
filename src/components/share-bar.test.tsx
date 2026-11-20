import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { CountPill } from "./count-pill";
import { ShareBar } from "./share-bar";

describe("ShareBar and CountPill", () => {
  it("ShareBar reads 10 of 14 over a bar of that share, the share in its tooltip; — when unknown", () => {
    const { container, unmount } = render(<ShareBar value={10} of={14} noun="units running" />);
    expect(container.textContent).toBe("10 of 14");
    expect((container.firstElementChild as HTMLElement).title).toBe("10 of 14 units running (71%)");
    expect(container.querySelector<HTMLElement>("[data-bar-fill]")!.style.width).toBe("71%");
    unmount();
    render(<ShareBar value={null} of={6} />);
    expect(screen.getByText("—")).toBeTruthy();
  });

  it("CountPill tints a count in its tone, a faint 0 with none, — when unknown", () => {
    const pill = render(<CountPill count={4} tone="destructive" />).container.firstElementChild as HTMLElement;
    expect(pill.style.color).toBe("hsl(var(--destructive))");
    expect(pill.style.background).toBe("hsl(var(--destructive) / 0.14)");
    expect(render(<CountPill count={0} tone="warning" />).container.textContent).toBe("0");
    expect(render(<CountPill count={null} tone="warning" />).container.textContent).toBe("—");
  });
});
