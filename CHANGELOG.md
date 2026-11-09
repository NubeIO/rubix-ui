# Changelog

Each release is a git tag; install one with `"@nube/rubix-ui": "github:NubeIO/rubix-ui#vX.Y.Z"`.

## v0.6.0

- **Breaking:** the package keeps visual building blocks only. **NodeScheduleEditor**, the data-reading
  **AllSchedulesCalendar** and all schedule logic moved out: `readNodeSchedule`, `writeNodeSchedule`,
  `resolveDay`, `nowAndNext`, `wallAt`, `nameIndex`, `valueOf`, `OFF`, `MAX_NAMES`, `toSaveError`,
  `ChangedElsewhere`, `BackendNeedsUpgrade`, `Unreadable` and lb's schedule record types. The rubix-ai
  app and the Schedule Groups extension each keep their own editor and logic; the `v0.5.0` tag has the
  source to copy.
- New: plain-data calendar primitives, fed days the app has already resolved: **ScheduleWeekCalendar**
  (one schedule's week, the editor's Calendar tab), **ScheduleWeekRows** and **ScheduleMonthGrid** (every
  schedule's week and month), and **AllSchedulesView**, their frame (Week / Month, previous / next /
  Today, schedule chips, legend, dated entries). Types: `ScheduleSpan`, `ScheduleDay`, `ScheduleNote`,
  `ScheduleMoment`, `ScheduleRef`, `ScheduleWeekRow`, `ScheduleChip`, `ScheduleMonthDay`,
  `ScheduleListEntry`, `ScheduleLegendItem`, `ScheduleEntryKind`.
- **Breaking:** `WeekStrip` takes `week` (seven arrays of `{ start, end, nameIndex }`) instead of a
  schedule `doc`.
- `nameColour`, `SCHEDULE_COLOURS`, `scheduleColourClass` and `NameSwatch` stay, unchanged.
- The dated entries list puts the schedules in their own middle column (date, label, schedules, kind),
  and the month view says "Nov 2026" and "Dated entries in Nov", as the design does.
- ScheduleWeekCalendar draws a block too short for its words (a 30 minute strip) as a plain strip, and
  one with room for one line shows only the label; the tooltip still names it.
- The stylesheet reads `src/lib/colour` for the colour classes instead of `src/lib/schedule`.

## v0.5.0

- New: **NodeScheduleEditor** (weekly hours, dated entries, calendar, settings, the save and conflict
  flow), **AllSchedulesCalendar**, **WeekStrip** and **NameSwatch**, moved from the rubix-ai Schedules
  page so the Schedule Groups extension uses the same ones. Data in, events out; the page keeps the
  API.
- New: the node schedule helpers they run on: `readNodeSchedule`, `writeNodeSchedule`, `resolveDay`,
  `nowAndNext`, `wallAt`, `nameColour`, `SCHEDULE_COLOURS`, `scheduleColourClass`, `nameIndex`,
  `valueOf`, `OFF`, `MAX_NAMES`, `toSaveError` with `ChangedElsewhere`, `BackendNeedsUpgrade` and
  `Unreadable`, and lb's schedule record types (`ScheduleRecord`, `ScheduleDocument`, `WeeklyEntry`,
  `DatedEntry`, `DateWindow`, `DatedKind`) as plain types.
- A block that runs all day reads "00:00–24:00".
- NodeScheduleEditor takes `initialTab` and `weekOnly`, and switches to its phone view by checking the
  width in code (`useMinWidth`), so an extension's own `.hidden` cannot hide it.
- `resolveDay` (and so Now and the calendars) is lb's own evaluation of what the editor saves: the
  entry that started first gives the name, exceptions switch off, a box's own entry runs on every day
  its windows touch.
- Saves keep the stored `default_name`, keep switched-off weekly entries under their own keys, and
  ignore their values when reading a name's value. A rename reaches those entries and a box's own
  dated entries; a name they still use cannot be removed, and the names sheet says why.
- "Reload, keep my edit" carries renames and removed names onto the other person's days and keeps the
  names they added.
- The stylesheet also reads `src/lib/schedule`, for the name and schedule colour classes; the CSS guard
  checks they are there.

## v0.4.1

- **Combobox** reads correctly to a screen reader: the trigger points at its list, the search box (or
  the list, without search) announces the highlighted option as the arrow keys move, options leave the
  tab order, and the highlight scrolls into view in a long list.
- **DatePicker**'s month is a proper grid: a header row and one row per week, named by the month.
- Combobox split into its parts (options, list, field trigger, chip trigger). No API change.
- The stylesheet no longer reads class names from the README or `docs/`, which had put an unused
  `.fade-in` rule in it.
- Docs: a rewritten README and guides for extensions, components, rubix-ai and contributors.

## v0.4.0

- New: **DatePicker**, **TimeField** (with `parseTime`, `hhmm`, `DAY_MINS`), **EmptyState**, **Pager**
  (with `PAGE_SIZES`, `DEFAULT_PAGE_SIZE`), **Radio**; `formatDay` and `localToday`.
- **Combobox**: `searchable={false}` for a plain list, and `chip="…"` for a filter chip.
- **Alert**: `info`, `success` and `warning` variants.
- The stylesheet is built from `src` only, never from the committed `dist`.

## v0.3.1

- Extensions bundle only the components they import (one file per component, no side effects but CSS).
- Import the stylesheet with `?raw`: `?inline` breaks a Tailwind v3 extension build.

## v0.3.0

- New: **Select**, **Tabs**, **Accordion**, **Breadcrumb**, **CopyButton** (with `useClipboard`,
  `writeText`, `canWriteText`), **ColorSwatchPicker**.
- `RubixUiProvider motion` animates Tabs and Accordion with the host's motion primitives.

## v0.2.0

- New: **Popover**, **Combobox**, **Dialog**, **Sheet**, **DropdownMenu**, **Menubar**, **Tooltip**,
  **ScrollArea**, **Collapsible**.
- `RubixUiProvider portalContainer`: popups render inside an extension's root, so they are styled.
- Radix peers pinned to the host's minor versions, so extensions can share the host's popup stack.

## v0.1.0

- First release: **Button**, **Input**, **Textarea**, **Label**, **Checkbox**, **Switch**, **Card**,
  **Badge**, **Alert**, **Table**, **Separator**, **Skeleton**, **Spinner**, `cn`, and the scoped
  extension stylesheet.
