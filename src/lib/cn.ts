import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge resolves conflicts by class GROUP, and it only knows Tailwind's stock theme keys. The
// page-system keys registered in `globals.css` `@theme` have to be declared here too, or it guesses:
// an unknown `text-caption` is read as a text COLOUR, so `cn("text-caption", "text-muted")` silently
// dropped the size (and `cn("text-fg", "text-value-lg")` dropped the colour). Keep this list in step
// with the `--text-*` and `--radius-*` keys added in `@theme`.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["micro", "caption", "detail", "value-lg", "value-xl"],
      radius: ["panel"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
