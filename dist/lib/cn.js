import { clsx as t } from "clsx";
import { extendTailwindMerge as r } from "tailwind-merge";
const n = r({
  extend: {
    theme: {
      text: ["micro", "caption", "detail", "value-lg", "value-xl"],
      radius: ["panel"]
    }
  }
});
function l(...e) {
  return n(t(e));
}
export {
  l as cn
};
