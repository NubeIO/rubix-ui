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

The node schedule editor and the all-schedules calendar, shared by the rubix-ai Schedules page and the
Schedule Groups extension. Data in, events out: they take schedules as `NodeSchedule`s and hand edits
back through callbacks. The page owns the API (`schedule.get` / `schedule.save`); nothing here calls it.
Colours read the host's `--chart-*`, `--surface-inset`, `--ink-muted`, `--sheet-w-md` and
`--elev-popover`.

### NodeScheduleEditor

Weekly hours (paint, day sheet, names), dated entries, a calendar, settings and the page's own last
tab, with the save bar, the "changed elsewhere" flow and the unreadable and needs-upgrade states.
Below `md` it is view only.

| Prop | |
|---|---|
| `schedule` | the schedule, from `readNodeSchedule(record)`; `null` while it loads |
| `onSave(doc)` | save `writeNodeSchedule(doc)`; resolve `{ rev }`, reject with the error (`toSaveError` sorts it) |
| `onReload()` | the latest saved version, for "Reload, keep my edit" |
| `onDelete`, `onRecreate(id, name)`, `onClose`, `onDirtyChange(dirty)` | the page's actions |
| `unreadable` | `{ id, name }`: the record is in the old format; shows Recreate |
| `backendNeedsUpgrade` | editing works, Save is off with the reason |
| `extraTab` | `{ label, render }`: the page's own last tab (Used by, Boxes) |
| `readOnly`, `hideSettings`, `title`, `subtitle`, `saveLabel`, `host` | |
| `initialTab` | `"hours" \| "dated" \| "cal" \| "set" \| "extra"`: the tab it opens on (`"extra"` lands on the page's own tab) |
| `weekOnly` | edit the weekly hours only (a box's own week): no Dated entries or Settings tab, names fixed |

Below the host's `md` width (768px) it shows the phone view. The switch is made in code, not with
`hidden md:flex`, because inside an extension the extension's own `.hidden` would win over the
package's layered `md:flex` and the editor would never show.
| `now` | the instant (epoch ms); omitted, it follows the clock |

```tsx
const record = await getSchedule(id);
<NodeScheduleEditor
  schedule={readNodeSchedule(record)}
  onSave={async (doc) => ({ rev: (await saveSchedule(writeNodeSchedule(doc))).rev })}
  onReload={async () => readNodeSchedule(await getSchedule(id))}
/>
```

### AllSchedulesCalendar, WeekStrip, NameSwatch

`AllSchedulesCalendar` shows every schedule at once: a week (a row per schedule) or a month of dated
entries, with schedule chips to hide one. Props: `schedules`, `onOpen?(id)`, `now?`. `WeekStrip` is
the one-line week of a schedule's names for a list row: `doc`, `className?`. `NameSwatch` is one name's colour
square (`index`: 0 is the default, outlined), for a legend or a list's now column.

### Schedule helpers

- Record types (lb's `schedule.*` shape): `ScheduleRecord`, `ScheduleDocument`, `WeeklyEntry`,
  `DatedEntry`, `DateWindow`, `DatedKind`.
- The model: `NodeSchedule`, `NameValue`, `Seg`, `DatedItem`, `BoxOutput`, `OFF`, `MAX_NAMES`,
  `nameIndex`, `valueOf`; `readNodeSchedule(record)` and `writeNodeSchedule(doc)` convert both ways.
- `resolveDay(doc, date)`: what a date runs, minute by minute, dated entries applied.
  `nowAndNext(doc, instant)` and `wallAt(instant, zone)`: what runs now and the next change.
- `nameColour(index)`: a name's colour by position (0 is the default). `SCHEDULE_COLOURS` and
  `scheduleColourClass(value)`: a schedule's own colour.
- `toSaveError(e)` sorts a failed save into `ChangedElsewhere`, `BackendNeedsUpgrade`, `Unreadable` or
  the error as it came.

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
