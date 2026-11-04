// Times of day as minutes since midnight, and the forgiving parse `TimeField` reads typing with.
//
// One responsibility: time-of-day parse and format.

/** Minutes in a day. "24:00" (the end of the day) is this. */
export const DAY_MINS = 1440;

/** Minutes → "HH:MM". */
export function hhmm(mins: number): string {
  return `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
}

/** A time typed any usual way → minutes: "13:05", "13.05", "1305", "105" (= 01:05), "13" (= 13:00) or
 *  "24:00". `undefined` when it is none of those. */
export function parseTime(s: string): number | undefined {
  const t = s.trim();
  const sep = /^(\d{1,2})[:.hH](\d{2})$/.exec(t);
  const run = /^(\d{1,2})(\d{2})$/.exec(t);
  const bare = /^(\d{1,2})$/.exec(t);
  const [h, m] = sep
    ? [Number(sep[1]), Number(sep[2])]
    : run
      ? [Number(run[1]), Number(run[2])]
      : bare
        ? [Number(bare[1]), 0]
        : [NaN, NaN];
  if (!Number.isFinite(h) || m >= 60) return undefined;
  const mins = h * 60 + m;
  return mins <= DAY_MINS ? mins : undefined;
}
