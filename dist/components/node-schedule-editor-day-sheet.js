import { jsx as s, jsxs as i, Fragment as k } from "react/jsx-runtime";
import { useState as N, useEffect as y } from "react";
import { Trash2 as A, Plus as R } from "lucide-react";
import { Button as d } from "./button.js";
import { cn as C } from "../lib/cn.js";
import { Input as w } from "./input.js";
import { Select as U } from "./select.js";
import { parseHHMM as z } from "../lib/schedule/nodeSchedule.js";
import { DAY_NAMES as f, untilInput as S } from "./node-schedule-editor-words.js";
import { EditorSheet as D } from "./node-schedule-editor-sheet.js";
import { hhmm as M } from "../lib/time.js";
function x(t) {
  const o = z(t.from), r = z(t.until);
  if (o === null || r === null) return null;
  const u = r === 0 ? 1439 : r - 1;
  return u >= o ? { start: o, end: u, name: t.name } : null;
}
const F = (t) => ({ name: t.name, from: M(t.start), until: S(t.end) });
function V({ day: t, doc: o, canEdit: r, onClose: u, onChange: _, onCopy: $ }) {
  const [m, b] = N([]), [c, h] = N([]);
  y(() => {
    t !== null && (b(o.week[t].map(F)), h([]));
  }, [t]);
  const p = (n) => {
    b(n), t !== null && _(t, n.map(x).filter((e) => e !== null));
  }, g = (n, e) => p(m.map((a, l) => l === n ? { ...a, ...e } : a)), B = () => {
    var a;
    const n = m.length ? x(m[m.length - 1]) : null, e = n ? Math.min(1380, n.end + 1) : 540;
    p([...m, { name: ((a = o.names[1]) == null ? void 0 : a.name) ?? "", from: M(e), until: S(Math.min(1439, e + 59)) }]);
  }, v = o.names.slice(1);
  return /* @__PURE__ */ s(
    D,
    {
      open: t !== null,
      onClose: u,
      scheduleName: o.name,
      title: t === null ? "" : `${f[t]}: exact times`,
      description: "Each block runs one name from its start until its end. Changes stay unsaved until you save the schedule.",
      footer: /* @__PURE__ */ i(k, { children: [
        /* @__PURE__ */ s(d, { variant: "ghost", size: "sm", onClick: u, children: "Close" }),
        r && c.length > 0 && t !== null && /* @__PURE__ */ i(
          d,
          {
            variant: "solid",
            size: "sm",
            onClick: () => {
              $(t, c), h([]);
            },
            children: [
              "Copy to ",
              c.length,
              " ",
              c.length === 1 ? "day" : "days"
            ]
          }
        )
      ] }),
      children: t !== null && /* @__PURE__ */ i(k, { children: [
        m.length === 0 && /* @__PURE__ */ i("p", { className: "rounded-lg border border-dashed border-line-strong p-4 text-center text-xs text-ink-muted", children: [
          "Nothing runs this day: it is ",
          o.names[0].name,
          " = ",
          o.names[0].value,
          " all day."
        ] }),
        m.map((n, e) => {
          const a = !x(n);
          return /* @__PURE__ */ i("div", { className: "grid grid-cols-[minmax(0,1fr)_6.5rem_6.5rem_2rem] items-end gap-2", children: [
            /* @__PURE__ */ i("label", { className: "grid gap-1 text-caption text-ink-muted", children: [
              "Name",
              /* @__PURE__ */ s(
                U,
                {
                  size: "sm",
                  "aria-label": `Block ${e + 1} name`,
                  value: n.name,
                  disabled: !r,
                  onChange: (l) => g(e, { name: l.target.value }),
                  children: v.map((l) => /* @__PURE__ */ i("option", { value: l.name, children: [
                    l.name,
                    " = ",
                    l.value
                  ] }, l.name))
                }
              )
            ] }),
            /* @__PURE__ */ i("label", { className: "grid gap-1 text-caption text-ink-muted", children: [
              "From",
              /* @__PURE__ */ s(
                w,
                {
                  type: "time",
                  "aria-label": `Block ${e + 1} from`,
                  value: n.from,
                  disabled: !r,
                  className: "h-8 text-xs",
                  onChange: (l) => g(e, { from: l.target.value })
                }
              )
            ] }),
            /* @__PURE__ */ i("label", { className: "grid gap-1 text-caption text-ink-muted", children: [
              "Until",
              /* @__PURE__ */ s(
                w,
                {
                  type: "time",
                  "aria-label": `Block ${e + 1} until`,
                  "aria-invalid": a || void 0,
                  value: n.until,
                  disabled: !r,
                  className: C("h-8 text-xs", a && "border-destructive"),
                  onChange: (l) => g(e, { until: l.target.value })
                }
              )
            ] }),
            r ? /* @__PURE__ */ s(
              d,
              {
                variant: "ghost",
                size: "icon-sm",
                "aria-label": `Remove block ${e + 1}`,
                onClick: () => p(m.filter((l, T) => T !== e)),
                children: /* @__PURE__ */ s(A, {})
              }
            ) : /* @__PURE__ */ s("span", {})
          ] }, e);
        }),
        r && /* @__PURE__ */ i(
          d,
          {
            variant: "ghost",
            size: "sm",
            className: "justify-self-start",
            disabled: v.length === 0,
            onClick: B,
            children: [
              /* @__PURE__ */ s(R, {}),
              "Add a block"
            ]
          }
        ),
        /* @__PURE__ */ s("p", { className: "text-caption text-ink-muted", children: "Until is when the block stops: 07:00 until 18:00 is stored as 07:00–17:59, the last minute it runs. Until 00:00 means the end of the day." }),
        r && /* @__PURE__ */ i("div", { className: "grid gap-1.5 border-t border-line pt-3", children: [
          /* @__PURE__ */ i("span", { className: "text-caption text-ink-muted", children: [
            "Copy ",
            f[t],
            " to"
          ] }),
          /* @__PURE__ */ s("div", { className: "flex flex-wrap gap-1.5", children: f.map(
            (n, e) => e === t ? null : /* @__PURE__ */ s(
              d,
              {
                variant: "outline",
                size: "sm",
                "aria-pressed": c.includes(e),
                className: C(
                  "h-7 px-2.5 text-caption",
                  c.includes(e) && "border-accent/50 bg-accent/10 text-accent hover:bg-accent/15"
                ),
                onClick: () => h((a) => a.includes(e) ? a.filter((l) => l !== e) : [...a, e]),
                children: n
              },
              n
            )
          ) })
        ] })
      ] })
    }
  );
}
export {
  V as DaySheet,
  x as rowToSeg
};
