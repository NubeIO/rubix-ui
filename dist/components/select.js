import { jsx as t } from "react/jsx-runtime";
import { cn as i } from "../lib/cn.js";
function c({
  className: o,
  size: e = "md",
  ...r
}) {
  return /* @__PURE__ */ t(
    "select",
    {
      "data-slot": "select",
      "data-size": e,
      className: i(
        // The field look Input and Textarea share: same inset, focus border + ring, disabled fade. The
        // browser's own arrow is turned off (it brings its own inner padding, so the text sat further in
        // than an Input's); the chevron is the `--field-chevron` token, placed as the Combobox's is: 12px,
        // 10px from the outer right edge at both heights (Rubix Chart Shading §10).
        "w-full appearance-none rounded-md border border-border bg-bg bg-(image:--field-chevron) bg-no-repeat pl-2.5 text-fg transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60",
        e === "sm" ? "h-8 bg-size-[12px] bg-position-[right_9px_center] pr-7 text-xs" : "h-9 bg-size-[12px] bg-position-[right_9px_center] pr-8 text-sm",
        o
      ),
      ...r
    }
  );
}
export {
  c as Select
};
