# Using rubix-ui in an extension

An extension's UI is a federated remote: `@nube/ext-ui-sdk` mounts it inside `<div data-ext-root>` on a
host page. Four steps make the package's components look and behave there exactly as they do in the app.
Each step fixes a specific failure, listed under *Troubleshooting*.

The `rust-schedule-management` extension (schedule groups) is a working example.

## 1. Install

```jsonc
// ui/package.json
"dependencies": {
  "@nube/rubix-ui": "github:NubeIO/rubix-ui#v0.6.0"
}
```

Install the peers your package manager reports as missing (see the README). Keep the Radix versions on
the `~` ranges the package declares.

## 2. Add the stylesheet

The package ships a pre-built stylesheet, `@nube/rubix-ui/scoped.css`. Every rule in it is under
`[data-ext-root]`, so it cannot restyle the host, and it declares no colours: `text-fg` compiles to
`color: hsl(var(--fg))`, the host's own variable.

Add it to the extension's `styles`, before the extension's own CSS:

```tsx
// src/remoteEntry.tsx
import rubix from "@nube/rubix-ui/scoped.css?raw";
import own from "@/styles/tokens.css?inline";
import { defineRemote } from "@nube/ext-ui-sdk";
import { App } from "@/App";

export const { mount, mountWidget } = defineRemote({
  id: "my-ext",
  styles: rubix + own,
  page: (ctx, bridge) => <App ctx={ctx} bridge={bridge} />,
});
```

- **Import it with `?raw`, not `?inline`.** The file is already built with Tailwind v4. `?inline` runs
  it through the extension's own PostCSS, and a Tailwind v3 build stops on its `@layer` blocks.
- The extension does **not** need Tailwind v4, or the host's class names in its Tailwind config.
- Its rules sit in a cascade layer, so where the extension defines the same class, the extension wins.
- `remoteEntry.tsx` stays a single `defineRemote` call. Never inject the CSS into `document.head`.

## 3. Render popups inside the extension

Radix renders popups (Dialog, Sheet, Popover, Combobox list, DropdownMenu, Tooltip, DatePicker) at the
end of `document.body`, outside `[data-ext-root]`, where the stylesheet does not apply. Wrap the page in
`RubixUiProvider` with the SDK's container, and every popup renders inside the root instead:

```tsx
// src/App.tsx
import { usePortalContainer } from "@nube/ext-ui-sdk";
import { RubixUiProvider } from "@nube/rubix-ui";

export function App(props: AppProps) {
  return (
    <RubixUiProvider portalContainer={usePortalContainer()}>
      <Page {...props} />
    </RubixUiProvider>
  );
}
```

A dialog's overlay still covers the whole window, the host's sidebar and top bar included: nothing
above the root traps `position: fixed`.

### 3b. Share the host's popup stack

Radix keeps the stack of open popups, the focus trap and the focus sentinels in three packages. With
its own copy, an extension's popups cannot see the host's: Escape or an outside click reaches the wrong
one, and a popover inside a modal stops taking clicks. The rubix-ai app shares its copy through its
import map, as it shares React. Mark the three external:

```ts
// vite.config.ts
export default defineExtConfig({
  entry: "src/remoteEntry.tsx",
  externals: [
    "@radix-ui/react-dismissable-layer",
    "@radix-ui/react-focus-scope",
    "@radix-ui/react-focus-guards",
  ],
});
```

The extension then runs against the host's versions of those three, so its other Radix packages must
work with them. That is why the peers are `~` ranges on the host's minor versions: a newer minor (for
example `react-dialog` 1.3) imports names the host's `focus-scope` does not have, and the extension
fails to load. Radix moves to a new minor in the host and this package together.

## 4. Use the components

```tsx
import { Button, Combobox, Dialog, DialogContent, DialogTitle } from "@nube/rubix-ui";
```

See [components.md](components.md). Only what you import is bundled: each component is its own file and
the package has no side effects besides its CSS.

Tabs and Accordion animate only when a `motion` prop is passed to the provider (the app passes its
own). In an extension they appear and toggle without animation, as the app does when a member turns
motion off.

## Checklist

- [ ] `@nube/rubix-ui` pinned to a tag
- [ ] `scoped.css?raw` first in `styles`
- [ ] page wrapped in `RubixUiProvider portalContainer={usePortalContainer()}`
- [ ] the three Radix packages in `externals`
- [ ] open a Dialog, a Combobox inside it, and a DropdownMenu on the host: all styled, Escape closes the top one only

## Troubleshooting

| What you see | Cause | Fix |
|---|---|---|
| Components unstyled everywhere | Stylesheet not in `styles` | Step 2 |
| Build error "`@layer utilities` is used but no matching `@tailwind utilities` directive" | Imported with `?inline` | Use `?raw` |
| The page is styled but popups are not | Popups rendered to `document.body` | Step 3, the provider |
| A Combobox or Popover inside a Dialog closes as soon as you click it, or can't be clicked | Extension has its own Radix popup stack | Step 3b, the externals |
| Escape closes the host's popup instead of the extension's | Same | Step 3b |
| Extension fails to load: "does not provide an export named …" from a Radix package | A Radix peer on a newer minor than the host's | Install the `~` versions the package declares |
| Colours wrong in light mode | Testing by toggling `.dark` alone | The host also sets `color-scheme`; switch the theme in the app's settings |
| Your own class overrides a component's look by accident | Same class name in your CSS, which wins over the layer | Rename yours, or pass `className` to the component on purpose |
