import { describe, expect, it } from "vitest";

import { parseTime } from "./time";

describe("parseTime", () => {
  it("reads the usual ways of typing a time", () => {
    expect(parseTime("13:05")).toBe(785);
    expect(parseTime("13.05")).toBe(785);
    expect(parseTime("1305")).toBe(785);
    expect(parseTime("105")).toBe(65);
    expect(parseTime("13")).toBe(780);
    expect(parseTime("24:00")).toBe(1440);
  });

  it("refuses what is not a time of day", () => {
    expect(parseTime("13:60")).toBeUndefined();
    expect(parseTime("25:00")).toBeUndefined();
    expect(parseTime("noon")).toBeUndefined();
  });
});
