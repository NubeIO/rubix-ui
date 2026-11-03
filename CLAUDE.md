# CLAUDE.md — rubix-ui

`@nube/rubix-ui`: the Rubix design system's components, shared by the rubix-ai app (`NubeIO/rubix-ai`,
`ui/`) and its extensions. Read `README.md` first.

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
6. **No popups until both popup fixes land** (README, *Popups*).

## Commands

`pnpm check` runs typecheck, tests, build and the CSS guard.
