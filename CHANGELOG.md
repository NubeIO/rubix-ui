# Changelog

Each release is a git tag; install one with `"@nube/rubix-ui": "github:NubeIO/rubix-ui#vX.Y.Z"`.

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
