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


Popups and overlays:

| Export | What it is |
|---|---|
| `Popover` (+ `Trigger`, `Content`, `Anchor`) | a floating panel |
| `Combobox`, `ComboboxOption` | the searchable select (use it, not a native `<select>`) |
| `Dialog` (+ `Trigger`, `Content`, `Header`, `Footer`, `Title`, `Description`, `Close`, …) | a centred modal |
| `Sheet` (+ `Content`, `Header`, `Title`, `Description`) | a drawer from the side |
| `DropdownMenu` (+ items, groups, radio, checkbox, sub-menus) | an action menu |
| `Menubar` (+ the same parts) | a row of menus |
| `Tooltip` (+ `Provider`, `Trigger`, `Content`) | a hover hint |
| `ScrollArea`, `ScrollBar`, `Collapsible` (+ `Trigger`, `Content`) | small pieces |
| `RubixUiProvider`, `useOverlayContainer` | where popups render (see *Popups*) |

Not here yet: `Tabs` and `Accordion`. Their panels animate with the app's motion preference, which
lives in the app.

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

The `animate-in`/`fade-in`/`slide-in` classes the popups use come from `tw-animate-css`, compiled under
the same scope.

The host keys (`bg-bg`, `text-fg`, `border-border`, `rounded-md`, `text-caption`, …) are copied from
rubix-ai's `ui/src/styles/globals.css` `@theme` into `src/styles/scoped.css`. Keep the two in step.

## Popups

Two things make popups work inside an extension. Both are needed.

1. **Render inside the extension's root.** Radix renders popups at the end of `document.body`, outside
   `[data-ext-root]`, where `scoped.css` does not apply: the popup would show unstyled. Wrap the page
   in `RubixUiProvider` with the SDK's container, and every popup here renders inside the root:

   ```tsx
   import { usePortalContainer } from "@nube/ext-ui-sdk";
   import { RubixUiProvider } from "@nube/rubix-ui";

   export function App(props) {
     return (
       <RubixUiProvider portalContainer={usePortalContainer()}>
         <Page {...props} />
       </RubixUiProvider>
     );
   }
   ```

   Nothing above the root traps `position: fixed`, so a dialog's overlay still covers the whole window,
   the host's sidebar and top bar included. In the app there is no provider and popups go to the body.

2. **Share the host's popup stack.** Radix keeps the stack of open popups, the focus trap and the focus
   sentinels in three packages. With its own copy, an extension's popups cannot see the host's: Escape
   or an outside click reaches the wrong one, and a popover inside a modal stops taking clicks. The
   rubix-ai app shares its copy through its import map, as it shares React. Mark the three external:

   ```ts
   // vite.config.ts
   defineExtConfig({
     entry: "src/remoteEntry.tsx",
     externals: [
       "@radix-ui/react-dismissable-layer",
       "@radix-ui/react-focus-scope",
       "@radix-ui/react-focus-guards",
     ],
   });
   ```

   The extension then runs against the host's versions of those three, so its own Radix packages must be
   ones that work with them. This package's peer ranges (`~` on the host's minor versions) keep that
   true; a newer Radix minor (for example `react-dialog` 1.3) imports names the host's `focus-scope` does
   not have, and the extension fails to load. Move the host and this package to a new Radix minor
   together.

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

`UNLICENSED`: proprietary NubeIO code. The repo is public so a `github:` dep installs with no credential
(the rubix-ai frontend builds on its deploy servers, an extension's CI, a contractor's machine), the same
choice as `NubeDev/lb-ui-kit` and `NubeDev/lb-ext-ui-sdk`. Public visibility grants **no** licence to
use it.

Keep anything that must stay private (unreleased product screens, customer-specific code) out of this
repo.
