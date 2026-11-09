# @nube/rubix-ui

The Rubix design system's React components, shared by the rubix-ai app and its extensions, so an
extension's page looks and behaves like the app's without re-creating its buttons, fields, dialogs and
tables by hand.

- **One source.** The rubix-ai app re-exports these components; an extension imports the same ones.
- **Works inside an extension.** A pre-built stylesheet scoped to `[data-ext-root]`, and popups that
  render inside the extension's root, so they are styled and stack correctly with the host's own.
- **Follows the host's theme.** No colours are baked in: every class reads the host's CSS variables, so
  the app's theme and light/dark mode reach an extension with no rebuild.

## Install

```jsonc
// package.json
"dependencies": {
  "@nube/rubix-ui": "github:NubeIO/rubix-ui#v0.6.0"
}
```

The repo is public, so this installs with no credential. Pin a tag; [CHANGELOG.md](CHANGELOG.md) lists
them.

Peers (install them in the consumer): `react` and `react-dom` 18+, `lucide-react`, `@radix-ui/react-slot`,
and the Radix packages the popups use: `react-collapsible ~1.1`, `react-dialog ~1.1`,
`react-dropdown-menu ~2.1`, `react-menubar ~1.1`, `react-popover ~1.1`, `react-scroll-area ~1.2`,
`react-tooltip ~1.2`. pnpm and npm install missing peers for you. The `~` ranges are deliberate; see
[docs/extensions.md](docs/extensions.md#3b-share-the-hosts-popup-stack).

## Quick start in an extension

```tsx
// remoteEntry.tsx
import rubix from "@nube/rubix-ui/scoped.css?raw"; // ?raw, not ?inline
import own from "@/styles/tokens.css?inline";
import { defineRemote } from "@nube/ext-ui-sdk";
import { App } from "@/App";

export const { mount, mountWidget } = defineRemote({
  id: "my-ext",
  styles: rubix + own,
  page: (ctx, bridge) => <App ctx={ctx} bridge={bridge} />,
});
```

```tsx
// App.tsx
import { usePortalContainer } from "@nube/ext-ui-sdk";
import { Button, RubixUiProvider } from "@nube/rubix-ui";

export function App() {
  return (
    <RubixUiProvider portalContainer={usePortalContainer()}>
      <Button variant="solid">New schedule</Button>
    </RubixUiProvider>
  );
}
```

Then mark three Radix packages external in `vite.config.ts`. The full steps, and what goes wrong when
one is missed, are in **[docs/extensions.md](docs/extensions.md)**.

## What is in it

| Group | Components |
|---|---|
| Actions | `Button`, `CopyButton` |
| Form fields | `Input`, `Textarea`, `Label`, `Checkbox`, `Radio`, `Switch`, `Select`, `Combobox`, `DatePicker`, `TimeField`, `ColorSwatchPicker` |
| Surfaces | `Card`, `PanelFrame` (a dashboard panel's frame), `Table`, `Tabs`, `Accordion`, `Collapsible`, `ScrollArea`, `Separator` |
| Feedback | `Alert`, `Badge`, `EmptyState`, `Skeleton`, `Spinner` |
| Filters | `FilterTiles` (count tiles that filter a list), `FacetChip` (a dashed filter chip) |
| Navigation | `Breadcrumb`, `Pager` |
| Popups | `Dialog`, `Sheet`, `Popover`, `DropdownMenu`, `Menubar`, `Tooltip` |
| Schedules | `ScheduleWeekCalendar`, `AllSchedulesView`, `ScheduleWeekRows`, `ScheduleMonthGrid`, `WeekStrip`, `NameSwatch`, `nameColour`, `scheduleColourClass` (visual only; each app keeps its schedule editor and logic) |
| Setup | `RubixUiProvider`, `useOverlayContainer` |
| Helpers | `cn`, `useClipboard`, `writeText`, `canWriteText`, `parseTime`, `hhmm`, `formatDay`, `localToday` |

Props, variants and examples: **[docs/components.md](docs/components.md)**.

## Guides

| Guide | For |
|---|---|
| [docs/extensions.md](docs/extensions.md) | Using the package in an extension, step by step, plus troubleshooting |
| [docs/components.md](docs/components.md) | Every component: what it is for, its props, an example |
| [docs/rubix-ai.md](docs/rubix-ai.md) | How the rubix-ai app consumes the package, and how to bump it there |
| [docs/contributing.md](docs/contributing.md) | Changing or adding a component, the rules CI enforces, and releasing |
| [CHANGELOG.md](CHANGELOG.md) | What each tag changed |

## Develop

```sh
pnpm install
pnpm check      # typecheck, tests, build, CSS guard
```

`dist/` is committed: a `github:` dep installs the tree as-is, with no build step. Run `pnpm build` and
commit `dist/` with every change; CI fails when it is stale. See
[docs/contributing.md](docs/contributing.md).

## Licence

`UNLICENSED`: proprietary NubeIO code. The repo is public only so a `github:` dep installs with no
credential (deploy servers, an extension's CI, a contractor's machine), the same choice as
`NubeDev/lb-ui-kit` and `NubeDev/lb-ext-ui-sdk`. Public visibility grants **no** licence to use it.
Keep anything that must stay private (unreleased product screens, customer-specific code) out of this
repo.
