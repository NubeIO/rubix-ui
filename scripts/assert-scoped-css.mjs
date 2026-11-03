// Guard: the extension stylesheet never reaches outside an extension.
//
// An extension UI renders INSIDE the host DOM. A `:root { --bg: … }` or `.dark { … }` block, or an
// unscoped `.p-4 { … }`, does not style the extension: it restyles the WHOLE host app, because those
// selectors match host elements. The family has shipped this once already (the modbus extension turned
// every page amber), which is why it is proven on the built file rather than left to review.
//
// The rules, on dist/rubix-ui.css:
//   • no `:root` / `:host` rule at all: the host keys are declared `inline`, so nothing needs one;
//   • no `.dark` selector: the host owns the mode;
//   • every rule that targets a class or an attribute sits under `[data-ext-root]`.
// The one allowed global is Tailwind's `*,:before,:after,::backdrop { --tw-*: … }` property block (inert
// `--tw-` defaults nothing reads outside a scoped utility), plus `@keyframes`.
//
// One responsibility: prove the CSS-isolation invariant on the BUILT artifact. Run from `pnpm check`.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const css = join(new URL("..", import.meta.url).pathname, "dist", "rubix-ui.css");
if (!existsSync(css)) {
  console.error("assert-scoped-css: dist/rubix-ui.css missing, run `pnpm build` first.");
  process.exit(1);
}

const text = readFileSync(css, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
const problems = [];

for (const m of text.matchAll(/(:root|:host)\b[^{]*\{/g)) {
  problems.push(`\`${m[1]}\` rule: the host owns its root variables`);
}
for (const m of text.matchAll(/\.dark\b[^{,]*/g)) {
  problems.push(`\`.dark\` selector: ${m[0].trim()}`);
}

const SCOPE = "[data-ext-root]";

/** Split a selector list on its TOP-LEVEL commas (a comma inside `:where(…)` is not a new member). */
function members(list) {
  const out = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < list.length; i++) {
    const c = list[i];
    if (c === "(") depth++;
    else if (c === ")") depth--;
    else if (c === "," && depth === 0) {
      out.push(list.slice(start, i));
      start = i + 1;
    }
  }
  out.push(list.slice(start));
  return out;
}
const TW_PROPERTIES = /^\*\s*,\s*:before\s*,\s*:after\s*,\s*::backdrop$/;
for (const m of text.matchAll(/([^{}@;]+)\{/g)) {
  const sel = m[1].trim();
  if (!sel || /^(from|to|\d+%)/.test(sel)) continue; // keyframe steps
  if (TW_PROPERTIES.test(sel)) continue;
  if (!/[.[]/.test(sel)) continue; // no class or attribute: an at-rule prelude, an element-free step
  // A selector list: every member must be scoped, or that member matches host elements.
  for (const part of members(sel)) {
    if (!part.includes(SCOPE)) {
      problems.push(`unscoped rule (would match HOST elements): ${part.trim().slice(0, 120)}`);
    }
  }
}

if (problems.length) {
  console.error("assert-scoped-css: dist/rubix-ui.css reaches outside an extension:");
  for (const p of problems) console.error(`  • ${p}`);
  process.exit(1);
}
console.log("assert-scoped-css: ok, every rule in dist/rubix-ui.css is under [data-ext-root].");
