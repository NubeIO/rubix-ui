# Contributing

How to change or add a component, the rules the build enforces, and how to cut a release.

## Setup

```sh
pnpm install
pnpm check        # typecheck + tests + build + CSS guard; what CI runs
pnpm test:watch   # vitest while you work
```

## Layout

```
src/
  index.ts              the one entry: everything public is exported here
  index.test.ts         lists every export; a new one must be added
  components/<name>.tsx one component per file (a big one splits into <name>-<part>.tsx)
  lib/                  cn, the provider, overlay container, motion, clipboard, date and time helpers,
                        and the name and schedule colours (lib/colour)
  styles/scoped.css     the extension stylesheet's source
scripts/assert-scoped-css.mjs   the CSS guard
dist/                   the build, COMMITTED
```

## Rules

These are the package's contract with its consumers. CI or a test fails on most of them.

1. **The host owns the theme.** `scoped.css` has no `:root`, `:host` or `.dark` rule, and every utility
   is under `[data-ext-root]`. Use the host's tokens (`bg-panel`, `text-muted`, `border-border`,
   `text-caption`), never raw colours. *Guard: `assert-scoped-css.mjs`.*
2. **Keys follow the host.** The `@theme inline` keys in `scoped.css` and `cn`'s custom keys are copies
   of rubix-ai's `ui/src/styles/globals.css` and `ui/src/lib/utils.ts`. Change rubix-ai first.
3. **Every Radix `Portal` takes `container` from `useOverlayContainer()`** (or the caller's
   `container`). Without it the popup renders outside an extension's styles.
   *Test: `src/lib/overlay.test.tsx`; add your popup there.*
4. **Peers stay out of the bundle.** React, Radix and lucide are peers, never dependencies.
5. **Radix stays on the host's minor versions:** dev deps exact, peers `~`. Bump with rubix-ai, together.
6. **No motion library.** Animate only through `RubixUiProvider motion`; render statically without it.
7. **One responsibility per file**, 400 lines at most. No `utils`/`helpers` files.
8. **Commit `dist/`.** *CI: "dist/ is committed and matches src/".*

## Changing a component

1. Make the change in `src/components/`. Keep the props backward compatible unless the release is a
   minor bump that says otherwise in the CHANGELOG.
2. Add or update a test next to it (Testing Library, user-facing queries: roles and labels).
3. `pnpm check`, then commit `src/` **and** `dist/` together.
4. Try it in a consumer before releasing (below).

## Adding a component

Add a component when the app and at least one extension need it, or an extension is re-creating one
from the app. Start from the app's version so both look the same.

1. `src/components/<name>.tsx`, with a header comment saying what it is for.
2. Export it from `src/index.ts`; add the name to `src/index.test.ts`.
3. If it opens a popup: use `useOverlayContainer()`, and add it to `src/lib/overlay.test.tsx`.
4. If it needs a new Radix package: add it as a `~` peer and an exact dev dep at the **host's** version.
5. Add it to `docs/components.md` and the README table.
6. In rubix-ai, replace the app's copy with a re-export once the release is tagged.

## Trying a change in a consumer

`pnpm link` this checkout into the consumer's UI folder, restart its dev server (`touch vite.config.ts`
clears vite's dependency cache), and check the pages that use the component, in light and dark. Remove
the link once the change is tagged; never commit `link:` or `file:` deps.

## Releasing

Versions are semver tags. While on `0.x`: a new component or prop is a minor; a fix is a patch; a
breaking change is a minor with a **Breaking** note.

1. On a branch: set `version` in `package.json`, add the release to `CHANGELOG.md`, `pnpm check`,
   commit with `dist/`.
2. Open a PR to `main`; merge when CI is green.
3. Tag the merge commit and push the tag:

   ```sh
   git switch main && git pull
   git tag -a vX.Y.Z -m "vX.Y.Z: one line on what changed"
   git push origin vX.Y.Z
   ```

4. Bump the pin in each consumer (`github:NubeIO/rubix-ui#vX.Y.Z`); see [rubix-ai.md](rubix-ai.md).

Never move or reuse a tag: consumers' lockfiles point at its commit.
