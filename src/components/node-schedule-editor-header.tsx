// The editor's header: the schedule's dot, name and `id · zone · N names`, then the Now card in two
// columns (wrapping to one): what runs now and until when, and the next change of name with its from
// and until. Switched off reads "Switched off · reads 0"; an unreadable schedule reads Unknown.
//
// One responsibility: draw the header and the Now card.

import type { ReactNode } from "react";
import { Power, X } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { cn } from "../lib/cn";

import { nameIndex, type NodeSchedule } from "../lib/schedule/nodeSchedule";
import type { NowAndNext } from "../lib/schedule/nowAndNext";
import { scheduleColourClass } from "../lib/schedule/scheduleColour";

import { momentText, nameValue, nowLabel } from "./node-schedule-editor-words";
import { NameSwatch } from "./name-swatch";

interface Props {
  doc: NodeSchedule | null;
  /** Shown while `doc` is null (an unreadable schedule). */
  fallback?: { id: string; name: string };
  state: NowAndNext | null;
  title?: string;
  subtitle?: string;
  onClose?: () => void;
}

export function EditorHeader({ doc, fallback, state, title, subtitle, onClose }: Props) {
  const name = title ?? doc?.name ?? fallback?.name ?? "";
  const meta =
    subtitle ?? (doc ? `${doc.id} · ${doc.timezone || "UTC"} · ${doc.names.length} names` : (fallback?.id ?? ""));
  const off = !!doc && !doc.enabled;
  return (
    <header className="grid gap-3 border-b border-line px-4 pb-4 pt-4">
      <div className="flex items-start gap-2.5">
        <span
          aria-hidden
          className={cn("mt-1.5 size-2.5 flex-none rounded-full", scheduleColourClass(doc?.color))}
        />
        <div className="grid min-w-0 flex-1 gap-0.5">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-xl font-semibold text-ink-strong">{name}</h2>
            {off && (
              <Badge variant="outline">
                <Power className="size-3" />
                Switched off
              </Badge>
            )}
          </div>
          <span className="truncate text-xs text-ink-muted">{meta}</span>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon-sm" aria-label="Close" onClick={onClose}>
            <X />
          </Button>
        )}
      </div>
      <NowCard doc={doc} state={state} />
    </header>
  );
}

function NowCard({ doc, state }: { doc: NodeSchedule | null; state: NowAndNext | null }) {
  if (!doc || !state)
    return (
      <Card
        now={<Column over="Now" name="Unknown" sub="The saved hours can't be read" />}
        next={<Column over="Next change" name="Unknown" sub="Recreate the schedule to see it" />}
      />
    );
  const today = state.at.date;
  if (!state.enabled)
    return (
      <Card
        now={
          <Column
            over={nowLabel(state.at)}
            name="Switched off"
            value={`reads ${doc.names[0].value}`}
            sub={`Dashboards and flows read ${nameValue(doc.names[0])}. Boxes keep running.`}
          />
        }
        next={<Column over="Next change" name="None while off" sub="Switch it on in Settings" />}
      />
    );
  const { now, next } = state;
  const until = now.until ? `until ${momentText(now.until, today)}` : "No change in the next week";
  return (
    <Card
      now={
        <Column
          over={nowLabel(state.at)}
          swatch={nameIndex(doc, now.name)}
          name={now.name}
          value={`= ${now.value}`}
          sub={now.closed ? `${until} · ${now.closed.label}` : until}
          large
        />
      }
      next={
        next ? (
          <Column
            over="Next change"
            swatch={nameIndex(doc, next.name)}
            name={next.name}
            value={`= ${next.value}`}
            sub={`from ${momentText(next.from, today)}${next.until ? ` until ${momentText(next.until, today)}` : ""}`}
          />
        ) : (
          <Column over="Next change" name="None" sub="Nothing changes in the next week" />
        )
      }
    />
  );
}

function Card({ now, next }: { now: ReactNode; next: ReactNode }) {
  return (
    <div
      aria-label="Now"
      className="grid gap-4 rounded-lg border border-line bg-surface-card p-3.5 sm:grid-cols-2"
    >
      {now}
      {next}
    </div>
  );
}

interface ColumnProps {
  over: string;
  name: string;
  value?: string;
  sub: string;
  swatch?: number;
  large?: boolean;
}

function Column({ over, name, value, sub, swatch, large }: ColumnProps) {
  return (
    <div className="grid min-w-0 content-start gap-1">
      <span className="text-caption font-semibold uppercase tracking-wide text-ink-faint">{over}</span>
      <div className="flex items-center gap-2">
        {swatch !== undefined && <NameSwatch index={swatch} className={large ? "size-3.5" : "size-3"} />}
        <span className={cn("truncate font-semibold text-ink-strong", large ? "text-xl" : "text-sm")}>{name}</span>
        {value && <span className="text-xs text-ink-muted">{value}</span>}
      </div>
      <span className="text-xs text-ink-muted">{sub}</span>
    </div>
  );
}
