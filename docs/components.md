# Components

Everything is imported from the package root:

```tsx
import { Button, Combobox, Dialog } from "@nube/rubix-ui";
```

Plain wrappers (`Input`, `Card`, `Table`, …) take every prop of the element they render, plus
`className`, merged with `cn` so your classes win over the defaults. Sizes line up across fields: `md`
is 36px (forms), `sm` is 32px (toolbars, dense rows).

## Actions

### Button

Variants `default` · `solid` (the one primary action) · `outline` · `ghost` · `destructive`.
Sizes `default` (36px) · `sm` (32px) · `lg` · `icon` · `icon-sm`. `asChild` renders the child (a link,
say) with the button's look.

```tsx
<Button variant="solid">Save</Button>
<Button variant="ghost" size="icon-sm" aria-label="Edit"><Pencil size={14} /></Button>
<Button asChild variant="outline"><a href="/docs">Docs</a></Button>
```

`buttonVariants({ variant, size })` returns the class string for something that is not a `<button>`.

### CopyButton

Copies `text` and shows "Copied" for 1.5 s. Works on plain `http` too (falls back to a hidden
textarea). Props: `text`, `label?`, `copiedLabel?`, `variant?`, `size?` (`default` · `sm` · `icon`),
`ariaLabel?`.

```tsx
<CopyButton text={token} label="Copy token" />
```

For your own UI, `useClipboard()` returns `{ copied, error, copy(text) }`; `writeText(text)` and
`canWriteText()` are the bare helpers.

## Form fields

### Input, Textarea, Label, Checkbox, Radio, Switch

Styled native elements; use them as you would the element. Group `Radio`s with a shared `name`.

```tsx
<Label htmlFor="name">Name</Label>
<Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
<Checkbox checked={on} onChange={(e) => setOn(e.target.checked)} />
```

### Select

A styled native `<select>`, sizes `md` · `sm`. Prefer `Combobox` unless you need the native picker.

### Combobox

The select to use by default: a trigger opening a list with type-to-filter search.

| Prop | |
|---|---|
| `options` | `{ value, label?, group?, description?, swatch? }[]`. `group` draws headings; `swatch` a colour dot |
| `value`, `onChange` | the chosen `value`; `""` is none |
| `aria-label` | required: the trigger's name |
| `placeholder` | shown with no value; `"— select —"` by default |
| `searchable` | `true` by default; `false` for a short fixed list (arrows and Enter still work) |
| `allowCustom` | Enter commits the typed text as the value |
| `clearable` | an × on the trigger while a value is set |
| `chip` | draw as a filter chip: "⊕ Site" while empty, "Site · Adelaide" when set, with a clear button |
| `renderValue` | `(value, option) => node`: draw the trigger's value yourself |
| `size`, `disabled`, `className` | |

```tsx
<Combobox
  aria-label="Site"
  options={sites.map((s) => ({ value: s.id, label: s.name, group: s.region }))}
  value={site}
  onChange={setSite}
  clearable
/>

<Combobox chip="Status" aria-label="Status" searchable={false} options={STATUSES} value={status} onChange={setStatus} />
```

It works inside a `Dialog` or `Sheet` (the list renders into the dialog) and is fully keyboard and
screen-reader operable.

### DatePicker

A date field with a month popover. Values are `"YYYY-MM-DD"` strings, `""` for none.

Props: `value`, `onChange`, `min?`, `max?`, `weekStart?` (1 = Monday, default; 0 = Sunday),
`format?` (field text; "31 Oct 2026" by default), `placeholder?`, `size?`, `disabled?`, `aria-label?`.

```tsx
<DatePicker aria-label="Start" value={from} onChange={setFrom} min={localToday()} />
```

Keyboard: arrows move a day/week, PageUp/PageDown a month, Home/End the week, Enter picks, Escape
closes. `localToday()` is today as `"YYYY-MM-DD"` in local time; `formatDay(iso)` the default label.

### TimeField

A text field for a time of day. It takes "13:05", "1305", "13" or "1.05", normalises to "HH:MM" on
blur, and ↑/↓ nudge it by a minute (Shift: 15 minutes, Alt: an hour). `value` and `onChange` are the text; turn it into minutes with
`parseTime(text)` (`undefined` when invalid), and back with `hhmm(minutes)`. `DAY_MINS` is 1440, so
"24:00" is a valid end of day.

```tsx
<TimeField aria-label="Opens" value={open} onChange={setOpen} />
```

### ColorSwatchPicker

A row of swatches plus an optional hex field. `palette` is `{ value, css, label? }[]` (`value` is what
you store, `css` what is painted). Props: `value`, `onChange`, `aria-label`, `allowCustom?` (hex field,
on by default).

## Surfaces

### Card

`Card` with `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.

### Table

Styled native table: `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`.
Pair it with `Pager` for paging and `EmptyState` for no rows.

### Tabs

Controlled tabs (`tablist`/`tab`/`tabpanel` roles, each tab tied to its panel).

```tsx
<Tabs value={tab} onValueChange={setTab}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="history">History</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
  <TabsContent value="history">…</TabsContent>
</Tabs>
```

### Accordion

One item open at a time. Props: `collapsible?` (the open item can close), `defaultValue?`.

```tsx
<Accordion collapsible defaultValue="general">
  <AccordionItem value="general">
    <AccordionTrigger>General</AccordionTrigger>
    <AccordionContent>…</AccordionContent>
  </AccordionItem>
</Accordion>
```

Tabs and Accordion animate only with `RubixUiProvider motion` (see *Setup*).

### Collapsible, ScrollArea, Separator

Radix `Collapsible` (`Trigger`, `Content`); `ScrollArea` with the app's thin scrollbar (`ScrollBar` for
a horizontal one); a 1px `Separator`.

## Feedback

### Alert

An inline message. Variants `default` · `info` · `success` · `warning` · `destructive`. Put a lucide
icon first; it takes the tone's colour.

```tsx
<Alert variant="warning">
  <TriangleAlert />
  <AlertTitle>Not saved</AlertTitle>
  <AlertDescription>Two days overlap.</AlertDescription>
</Alert>
```

### Badge

Variants `default` · `secondary` · `outline` · `success` · `warning` · `info` · `destructive` ·
`accent2`; `pill` for rounded ends; `size="count"` for a small number beside a label.

### EmptyState

What a list shows with nothing in it: `icon` (a lucide icon component), `title`, `description?`, and one
`action?`. Leave out the action when the viewer cannot create anything.

```tsx
<EmptyState icon={CalendarX} title="No schedules yet" description="Create one to set opening hours."
  action={<Button variant="solid" onClick={create}>New schedule</Button>} />
```

### Skeleton, Spinner

`Skeleton` is a pulsing block sized by `className`. `Spinner` is a spinning lucide icon; give it
`aria-label` when it is the only sign of loading.

## Navigation

### Breadcrumb

`Breadcrumb` › `BreadcrumbList` › `BreadcrumbItem` with `BreadcrumbLink` (or `asChild` for your router's
link), `BreadcrumbPage` for the current one, `BreadcrumbSeparator`, `BreadcrumbEllipsis`.

### Pager

A paged table's footer: "1–25 of 140", a page-size picker and previous/next.

Props: `page` (from 0), `size`, `total`, `onPage`, `onSize` (a new size goes back to page 0),
`sizes?` (`PAGE_SIZES` = 10, 25, 50, 100; `DEFAULT_PAGE_SIZE` = 25).

```tsx
<Pager page={page} size={size} total={rows.length} onPage={setPage}
  onSize={(n) => { setSize(n); setPage(0); }} />
```

## Popups

All popups render through `useOverlayContainer()`, so inside an extension they land in its root (see
[extensions.md](extensions.md#3-render-popups-inside-the-extension)). They layer correctly with each other
and with the host's: a Combobox in a Dialog, a DropdownMenu in a Sheet.

### Dialog

A centred modal: `Dialog`, `DialogTrigger`, `DialogContent` (`showClose` default `true`),
`DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`. Always give it a
`DialogTitle`.

```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete schedule?</DialogTitle>
      <DialogDescription>This cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="destructive" onClick={remove}>Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

`useDialogSurface()` returns the open dialog's content element; use it as `container` when you portal
your own popup from inside a dialog.

### Sheet

A drawer from a side: `Sheet`, `SheetContent` (`side` = `right` default · `left` · `top` · `bottom`),
`SheetHeader`, `SheetTitle`, `SheetDescription`. Size it with `className` (e.g. `sm:max-w-[420px]`).

### Popover, DropdownMenu, Menubar, Tooltip

Radix primitives with the app's look. `DropdownMenu` and `Menubar` include items, checkbox and radio
items, groups, labels, separators, shortcuts and sub-menus. Wrap the page once in `TooltipProvider` to
share tooltip delays.

## Schedules

Visual building blocks for schedule pages: a week calendar, the all-schedules week rows and month grid,
their frame, a week strip and the name colours. They know nothing about lb, records or schedule rules:
the app resolves what each day runs with its own logic and hands plain data in; moving the period,
hiding a schedule or opening one comes back as a callback. The schedule editor and the schedule logic
are not here; each app keeps its own (the `v0.5.0` tag has the last shared copy).

Colours read the host's `--chart-*`, `--surface-inset` and `--ink-muted`.

### The data

Minutes are minutes of the day, `0` to `1439`; a span's `end` is its **last** minute, inclusive (a block
to midnight ends at `1439` and reads "until 24:00"). Dates are wall dates, `YYYY-MM-DD`.

```ts
type ScheduleEntryKind = "extra" | "changed" | "closed" | "holiday";

interface ScheduleSpan {
  start: number;               // first minute
  end: number;                 // last minute, inclusive
  nameIndex: number;           // name position for nameColour: 1..5, 0 = default (Off)
  name: string;                // the name it runs ("Occupied")
  label?: string;              // the block's words when not the name (a dated entry's label)
  kind?: "extra" | "changed";  // dashed edge / solid edge
  title?: string;              // tooltip; default: label, name and times
}
interface ScheduleNote { kind: ScheduleEntryKind; label: string } // "" label: the kind's words
interface ScheduleDay {
  date: string;
  spans: ScheduleSpan[];
  closed?: ScheduleNote;       // closed all day: hatched, with this label
  entries?: ScheduleNote[];    // dated entries touching the day; the first is named
}
interface ScheduleMoment { date: string; minute: number }       // now, in the schedule's zone
interface ScheduleRef { id: string; name: string; colour?: string } // colour: a SCHEDULE_COLOURS value
interface ScheduleWeekRow extends ScheduleRef {
  status: string;              // "Now: Occupied = 1", "Switched off"
  now?: ScheduleMoment;        // omitted: no now line, no ring
  days: ScheduleDay[];         // the header's dates, in order
}
interface ScheduleChip extends ScheduleNote { schedules: ScheduleRef[] }
interface ScheduleMonthDay { date: string; chips: ScheduleChip[] }
interface ScheduleListEntry extends ScheduleChip {
  date: string;                               // first day of the period it touches
  hours?: { start: number; end: number }[];   // written after the label
  nameIndex?: number;                         // colours an extra / changed chip; default 1
}
interface ScheduleLegendItem { nameIndex: number; label: string; detail?: string }
```

### ScheduleWeekCalendar

One schedule's week as a vertical calendar: a column per day on an hour axis, blocks placed by their
minutes, a closed day hatched with its label chip, the now line on today and a ring on the running
block, previous / next / Today above and a legend below. A block too short for its words is a plain
strip (its tooltip names it); one with room for one line shows only the label.

| Prop | |
|---|---|
| `days` | the seven `ScheduleDay`s, Monday first; the heading is that week ("2 Nov – 8 Nov 2026") |
| `now?` | `ScheduleMoment`: today's column, the now line and the running block |
| `onPrev`, `onNext`, `onToday` | move the week |
| `atToday` | the week holds today: Today is off |
| `actions?` | at the right of the controls ("Add dated entry") |
| `legend` | `ScheduleLegendItem[]`, the names in position order |

```tsx
<ScheduleWeekCalendar
  days={dates.map((date) => toScheduleDay(myResolveDay(schedule, date)))}
  now={{ date: "2026-11-06", minute: 860 }}
  onPrev={() => setOffset((o) => o - 1)}
  onNext={() => setOffset((o) => o + 1)}
  onToday={() => setOffset(0)}
  atToday={offset === 0}
  legend={[{ nameIndex: 1, label: "Occupied" }, { nameIndex: 2, label: "Standby" }]}
/>
```

### AllSchedulesView, ScheduleWeekRows, ScheduleMonthGrid

`AllSchedulesView` is the all-schedules calendar's frame: Week / Month tabs, previous / next / Today, a
chip per schedule, the body you put in, a legend and "Closures & holidays this week / in Nov".

| Prop | |
|---|---|
| `view`, `onViewChange(view)` | `"week" \| "month"` |
| `start` | the period's first day: the week's Monday, or the month's 1st. Heads "2 Nov – 8 Nov 2026" or "Nov 2026" |
| `onPrev`, `onNext`, `onToday`, `atToday` | as above |
| `schedules`, `hidden`, `onToggle(id)` | the schedules the search matches, a chip each; a hidden id draws its chip off. Past 12 the chips give way to a count |
| `search`, `onSearch(q)` | the search box's text; the app matches it and passes the matches as `schedules`. `CHIP_LIMIT` (12) is exported so the app can apply `hidden` only while chips show |
| `noun?` | `{ one, many }` for the search and the count; default `schedule` / `schedules` |
| `legend` | `ScheduleLegendItem[]`: `{ nameIndex: 1, label: "1st name", detail: "Occupied · Trading" }` |
| `entries` | `ScheduleListEntry[]`: one row each, date \| label and hours \| schedules \| kind chip |
| `today` | today in the viewer's zone |
| `children` | `ScheduleWeekRows` or `ScheduleMonthGrid` |

`ScheduleWeekRows`: one row per schedule with a 24-hour bar per day. Props: `dates` (the seven, Monday
first), `rows` (`ScheduleWeekRow[]`, the shown schedules only), `today`, `onOpen?(id)` (the name becomes a
button).

`ScheduleMonthGrid`: the month's dated entries on their days, up to three chips a day with a dot per
schedule (three at most; the count follows the label). Props: `days` (`ScheduleMonthDay[]`, whole weeks,
Monday first), `month` (`YYYY-MM`; other days dimmed), `today`. The dated list shows three schedule names
an entry, then "+N more".

```tsx
<AllSchedulesView
  view="week" onViewChange={setView} start="2026-11-02"
  onPrev={prev} onNext={next} onToday={home} atToday={offset === 0}
  schedules={matches} search={q} onSearch={setQ} hidden={hidden} onToggle={toggle}
  legend={legend} entries={entries} today="2026-11-06"
>
  <ScheduleWeekRows dates={dates} rows={rows} today="2026-11-06" onOpen={openSchedule} />
</AllSchedulesView>
```

### FilterTiles, FacetChip

`FilterTiles` is a row of count tiles that filter a list (the UART Units page's): an icon and title, the
count, and a footer with a note and "Filter →" in the tile's tone. The first tile is the whole list;
picking a tile filters, picking it again goes back to the first. Props: `tiles` (`FilterTile[]`: `key`,
`label`, `count`, `tone` (a colour token without `--`), `icon`, `note`, `alarm?` for a red non-zero
count), `active`, `onPick(key)`, `label` (the row's accessible name).

`FacetChip` is the Insights toolbar's dashed filter chip: "+ Label" at rest, a checklist of values with
optional counts, the picks on the chip and a × that clears. Props: `label`, `values`, `selected`,
`onChange(next)`, `render?(value)`, `counts?`.

```tsx
<FilterTiles label="Schedule summary" tiles={tiles} active={tile} onPick={setTile} />
<FacetChip label="Time zone" values={zones} counts={zoneCounts} selected={picked} onChange={setPicked} />
```

### WeekStrip, NameSwatch, colours

`WeekStrip` is a week in miniature for a list row: seven 3px rows of coloured segments. Props: `week`
(seven arrays of `WeekStripSegment` `{ start, end, nameIndex }`, Monday first), `className?`.
`NameSwatch` is one name's colour square (`index`: 0 is the default, outlined), for a legend or a list's
now column.

- `nameColour(index)`: a name's colour by position (0 is the default): `{ token, css, bg, border, text }`.
- `SCHEDULE_COLOURS` and `scheduleColourClass(value)`: a schedule's own colour, by token value.

## Setup

### RubixUiProvider

| Prop | |
|---|---|
| `portalContainer` | where popups render. In an extension: `usePortalContainer()` from the SDK. Omitted: `document.body` |
| `motion` | `{ Reveal?, Collapse? }` components that animate a tab panel's entrance and an accordion item. Omitted: no animation |

`useOverlayContainer()` returns the provider's container, for your own portals.

### cn

`clsx` + `tailwind-merge`, taught the app's custom font-size and radius keys, so
`cn("text-caption", "text-sm")` keeps only the last. Use it for every `className` you combine.
