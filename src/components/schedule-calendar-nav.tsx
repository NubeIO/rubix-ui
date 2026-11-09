// The schedule calendars' period controls: previous, the period's words, next and Today (off while
// the period already holds today).
//
// One responsibility: draw the period controls.

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

export interface ScheduleCalendarNavProps {
  /** "week" or "month", for the buttons' names ("Previous week"). */
  unit: string;
  label: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  /** The period holds today: Today is off. */
  atToday: boolean;
}

export function ScheduleCalendarNav({ unit, label, onPrev, onNext, onToday, atToday }: ScheduleCalendarNavProps) {
  return (
    <>
      <Button variant="ghost" size="icon-sm" aria-label={`Previous ${unit}`} onClick={onPrev}>
        <ChevronLeft />
      </Button>
      <span className="min-w-36 text-center text-sm font-semibold text-ink-strong">{label}</span>
      <Button variant="ghost" size="icon-sm" aria-label={`Next ${unit}`} onClick={onNext}>
        <ChevronRight />
      </Button>
      <Button variant="outline" size="sm" disabled={atToday} onClick={onToday}>
        Today
      </Button>
    </>
  );
}
