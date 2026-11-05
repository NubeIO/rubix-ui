# How the rubix-ai app uses rubix-ui

The rubix-ai web UI (`NubeIO/rubix-ai`, `ui/`) is the package's first consumer. It differs from an
extension in two ways: it compiles the classes itself, and it *provides* the shared Radix popup stack
that extensions use.

## The pieces

| Where in rubix-ai | What it does |
|---|---|
| `ui/package.json` | `"@nube/rubix-ui": "github:NubeIO/rubix-ui#vX.Y.Z"` |
| `ui/src/components/ui/*.tsx` | One-line re-exports (`export { Button, buttonVariants } from "@nube/rubix-ui"`), so app code keeps importing `@/components/ui/button` |
| `ui/src/styles/globals.css` | `@source "../../node_modules/@nube/rubix-ui/dist";` so the app's Tailwind generates the classes the components use. The app does **not** load `scoped.css` |
| `ui/src/App.tsx` | `<RubixUiProvider motion={{ Reveal, Collapse }}>`: Tabs and Accordion animate with the app's motion primitives, which respect each member's motion setting. No `portalContainer`: in the app, popups go to the body |
| `ui/public/shims/radix-*.mjs`, `ui/src/features/ext-host/singletons.ts` | Share `@radix-ui/react-dismissable-layer`, `react-focus-scope` and `react-focus-guards` with extensions through the import map |
| `ui/src/features/ext-host/radixShims.test.ts`, `ui/src/components/ui/radixSingleCopy.guard.test.ts` | Fail if the shims drift from the installed versions, or if a second copy of those packages appears |

## The theme contract

The package's class names (`bg-bg`, `text-fg`, `border-border`, `rounded-md`, `text-caption`, …) are the
app's own `@theme` keys. They are copied from rubix-ai `ui/src/styles/globals.css` into this repo's
`src/styles/scoped.css`, and `cn`'s custom keys from `ui/src/lib/utils.ts`. Change a key in rubix-ai
first, then here, in the same release.

## Bumping the pin

1. Release the change here (see [contributing.md](contributing.md#releasing)).
2. In rubix-ai: set the new tag in `ui/package.json`, run `pnpm install` in `ui/`.
3. If a new component is now shared, replace the app's copy with a re-export.
4. `touch vite.config.ts` (or delete `node_modules/.vite`) so the dev server picks up the new build.
5. `make test`, and check the pages that use the changed component.

rubix-ai's `docs/WORKFLOW-LB.md` §4d is the same flow from that repo's side.

## Changing Radix versions

The host's three shared packages decide which Radix versions every extension can use. Move Radix in
rubix-ai and in this package (dev deps exact, peers `~`) in one coordinated release, then rebuild the
extensions. The guard tests above catch a half-done bump.

## Developing against an unreleased change

`pnpm link` this checkout into `rubix-ai/ui`, restart vite, and drop the link once the change is tagged.
Never commit a `link:` or `file:` dependency.
