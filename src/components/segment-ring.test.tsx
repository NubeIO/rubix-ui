import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { SegmentRing } from "./segment-ring";

const segments = [
  { key: "running", value: 20, tone: "success" },
  { key: "stopped", value: 8, tone: "success", alpha: 0.45 },
  { key: "fault", value: 3, tone: "destructive" },
  { key: "comm", value: 5, tone: "warning" },
  { key: "offline", value: 6, tone: "line-strong" },
];
const C = 2 * Math.PI * 67;
const share = (el: Element) => (parseFloat(el.getAttribute("stroke-dasharray")!) + 2) / C;

describe("SegmentRing", () => {
  it("draws each part as an arc of its share, in its tone, after the one before", () => {
    const { container } = render(<SegmentRing segments={segments} total={42} value="67%" caption="healthy" />);
    const arcs = [...container.querySelectorAll("[data-arc]")];
    expect(arcs.map((a) => a.getAttribute("data-arc"))).toEqual(["running", "stopped", "fault", "comm", "offline"]);
    expect(Math.round(share(arcs[0]) * 42)).toBe(20);
    expect((arcs[1] as SVGElement).style.stroke).toBe("hsl(var(--success) / 0.45)");
    // The two greens are the middle's share.
    expect(Math.round((share(arcs[0]) + share(arcs[1])) * 100)).toBe(67);
    expect(container.textContent).toContain("67%");
    expect(container.textContent).toContain("healthy");
  });

  it("closes the ring for a lone part, never stretches a sliver past its slot, and shows — with nothing", () => {
    const one = render(<SegmentRing segments={[{ key: "a", value: 5, tone: "success" }]} total={5} value="100%" />);
    expect(one.container.querySelector("[data-arc]")!.getAttribute("stroke-dasharray")).toBeNull();
    one.unmount();
    const sliver = render(<SegmentRing segments={[{ key: "a", value: 1, tone: "success" }, { key: "b", value: 1999, tone: "warning" }]} total={2000} value="0%" />);
    const a = sliver.container.querySelector("[data-arc='a']")!;
    expect(parseFloat(a.getAttribute("stroke-dasharray")!)).toBeLessThanOrEqual(C / 2000 + 1e-9);
    sliver.unmount();
    const none = render(<SegmentRing segments={[]} total={0} value="0%" />);
    expect(none.container.textContent).toContain("—");
  });
});
