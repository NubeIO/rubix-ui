# @nube/rubix-ui

The Rubix design system's components, published as one package so the rubix-ai app and its extensions
render with the same pieces. Before this, an extension re-created a button, a panel and a drawer by hand
to look like the app, and each copy drifted.

## What is in it

| Export | What it is |
|---|---|
| `Button`, `buttonVariants` | variants `default` · `solid` · `outline` · `ghost` · `destructive`; sizes `default` · `sm` · `lg` · `icon` · `icon-sm`; `asChild` |
| `Input`, `Textarea`, `Label`, `Checkbox`, `Switch` | form fields |
| `Card` (+ `Header`, `Title`, `Description`, `Content`, `Footer`) | a bordered surface |
| `Badge`, `badgeVariants` | status and count pills |
| `Alert` (+ `Title`, `Description`) | an inline message |
| `Table` (+ `Header`, `Body`, `Row`, `Head`, `Cell`) | styled native table |
| `Separator`, `Skeleton`, `Spinner` | small pieces |
| `cn` | `clsx` + `tailwind-merge`, taught the host's custom type and radius keys |

Popups (popover, select, sheet, dialog, menus, tooltip) come in a later release, together with the
two fixes they need (see *Popups* below).

## Install

```jsonc
// package.json
"@nube/rubix-ui": "github:NubeIO/rubix-ui#v0.1.0"
```

Peers: `react`, `react-dom`, `@radix-ui/react-slot`, `lucide-react`.

## In an extension

An extension's UI is mounted by `@nube/ext-ui-sdk` inside `<div data-ext-root>`. Add the package's
stylesheet to the extension's own `styles`:

```ts
// remoteEntry.tsx
import own from "@/styles/tokens.css?inline";
import rubix from "@nube/rubix-ui/scoped.css?inline";
import { defineRemote } from "@nube/ext-ui-sdk";
import { App } from "@/App";

export const { mount, mountWidget } = defineRemote({
  id: "my-ext",
  styles: rubix + own,
  page: (ctx, bridge) => <App ctx={ctx} bridge={bridge} />,
});
```

```tsx
import { Button, Card, CardContent } from "@nube/rubix-ui";
```

The stylesheet is pre-built, so the extension does not need Tailwind v4 or the host's class names in
its own config. Every rule in it is under `[data-ext-root]`, and it declares no colours: a class such as
`text-fg` compiles to `color: hsl(var(--fg))`, the host's own variable, so the host's theme and
light/dark mode reach the extension without a rebuild.

## In the rubix-ai app

The app does not load `scoped.css`. It compiles the same classes with its own Tailwind; point its
`globals.css` at the package:

```css
@source "../../node_modules/@nube/rubix-ui/dist";
```

## The CSS rules (enforced)

`scripts/assert-scoped-css.mjs` fails the build when `dist/rubix-ui.css`

- has a `:root`/`:host` rule or a `.dark` selector (it would repaint the host app), or
- has a class or attribute rule outside `[data-ext-root]` (it would match host elements).

The host keys (`bg-bg`, `text-fg`, `border-border`, `rounded-md`, `text-caption`, …) are copied from
rubix-ai's `ui/src/styles/globals.css` `@theme` into `src/styles/scoped.css`. Keep the two in step.

## Popups

Two things have to be true before a popup ships here:

1. **It renders where the extension's styles apply.** Radix renders popups at the end of
   `document.body`, outside `[data-ext-root]`. A provider will take a container: in the app, none (the
   body, as today); in an extension, `usePortalContainer()` from `@nube/ext-ui-sdk` (inside the page),
   or a body-level element that carries `data-ext-root` for a popup that must cover the whole screen.
2. **One copy of Radix's focus and dismiss state.** Two copies cannot see each other's open layers.
   The host will share `@radix-ui/react-dismissable-layer`, `react-focus-scope` and `react-focus-guards`
   through its import map, as it shares React, and extensions mark them external.

## Develop

```sh
pnpm install
pnpm check      # typecheck, tests, build, CSS guard
```

`dist/` is **committed**: a `github:` dep installs the tree as-is, with no build step. Run `pnpm build`
and commit `dist/` with every change; CI fails when it is stale.

To try an unreleased change in rubix-ai or an extension, `pnpm link` this checkout there, and drop the
link once the change is tagged.

## Release

1. PR to `main` (CI green, `dist/` rebuilt).
2. Tag `vX.Y.Z` on the merge commit and push the tag.
3. Bump the pin in each consumer.

## Licence

`UNLICENSED`: proprietary NubeIO code.
