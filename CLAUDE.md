# CLAUDE.md — rubix-ui

`@nube/rubix-ui`: the Rubix design system's components, shared by the rubix-ai app (`NubeIO/rubix-ai`,
`ui/`) and its extensions. Read `README.md` first, then the guide for the task in `docs/`
(`extensions.md`, `components.md`, `rubix-ai.md`, `contributing.md`). Every release adds an entry to
`CHANGELOG.md`, and a new or changed component updates `docs/components.md`.

## Rules

1. **The host owns the theme.** No `:root`, `:host` or `.dark` rule in `src/styles/scoped.css`, and every
   utility is compiled under `[data-ext-root]`. `scripts/assert-scoped-css.mjs` proves it on the build.
2. **Keys follow the host.** The `@theme inline` keys in `scoped.css` are copied from rubix-ai's
   `ui/src/styles/globals.css` `@theme`, and `cn`'s custom keys from its `src/lib/utils.ts`. Change them
   there first, then here.
3. **Externals are the contract.** React, Radix and lucide are peers and stay out of the bundle; one
   copy of each on the page.
4. **Commit `dist/`.** A `github:` dep installs the tree as-is. Run `pnpm build` before every commit.
5. **One component per file**, under `src/components/`; export it from `src/index.ts` and list it in
   `src/index.test.ts`.
6. **Every Radix `Portal` takes `container` from `useOverlayContainer()`** (or a caller's explicit
   `container`). A portal without it renders outside an extension's styles. `src/lib/overlay.test.tsx`
   checks each popup lands in the provider's element.
7. **Radix stays on the host's minor versions.** Peers are `~` ranges and dev deps are the host's exact
   versions, because extensions share the host's `dismissable-layer`/`focus-scope`/`focus-guards`
   (README, *Popups*). Bump Radix here and in rubix-ai together.
8. **No motion library here.** Tabs and Accordion take `Reveal`/`Collapse` from `RubixUiProvider
   motion` (`src/lib/motion.tsx`) and render statically without them.

## Commands

`pnpm check` runs typecheck, tests, build and the CSS guard.
