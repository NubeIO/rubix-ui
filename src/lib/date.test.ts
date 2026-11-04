import { describe, expect, it } from "vitest";

import { addMonths, formatDay, monthGrid } from "./date";

describe("day maths", () => {
  it("keeps the day where the month has it, else its last day", () => {
    expect(addMonths("2026-01-31", 1)).toBe("2026-02-28");
    expect(addMonths("2026-03-15", -1)).toBe("2026-02-15");
  });

  it("lays a month out in six weeks from the chosen first weekday", () => {
    // 1 Nov 2026 is a Sunday.
    expect(monthGrid("2026-11-10", 1)[0]).toBe("2026-10-26"); // Monday first
    expect(monthGrid("2026-11-10", 0)[0]).toBe("2026-11-01"); // Sunday first
    expect(monthGrid("2026-11-10")).toHaveLength(42);
  });

  it("shows a day as 31 Oct 2026", () => {
    expect(formatDay("2026-10-31")).toBe("31 Oct 2026");
  });
});
