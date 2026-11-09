import { jsxs as x, jsx as s } from "react/jsx-runtime";
import { useState as C, useRef as R } from "react";
import { cn as b } from "../lib/cn.js";
import { nameColour as E } from "../lib/schedule/nameColour.js";
import { nameIndex as T, DAY_MINUTES as h, OFF as U, valueOf as X } from "../lib/schedule/nodeSchedule.js";
import { DAY_NAMES as $, DAY_LONG as H, untilText as Y } from "./node-schedule-editor-words.js";
import { hhmm as p } from "../lib/time.js";
const f = (i) => `${i / h * 100}%`, j = [0, 3, 6, 9, 12, 15, 18, 21, 24], W = [3, 6, 9, 12, 15, 18, 21], q = 150;
function nt({ doc: i, snap: A, brush: g, canEdit: S, changed: z, today: B, onPaint: F, onOpenDay: L }) {
  const [n, N] = C(null), [r, M] = C(null), P = R([]), _ = (a, e) => {
    var u;
    const o = (u = P.current[a]) == null ? void 0 : u.getBoundingClientRect();
    return o && o.width > 0 ? (e.clientX - o.left) / o.width : 0;
  }, D = (a, e) => Math.max(0, Math.min(h, Math.round(_(a, e) * h / A) * A)), G = (a, e) => Math.max(0, Math.min(h - 1, Math.floor(_(a, e) * h))), k = !!n && (n.r0 !== n.r1 || n.m0 !== n.m1), m = n ? Math.min(n.r0, n.r1) : 0, v = n ? Math.max(n.r0, n.r1) : 0, c = n ? Math.min(n.m0, n.m1) : 0, d = n ? Math.max(n.m0, n.m1) : 0, y = (a) => `${a ?? U} = ${X(i, a)}${a === null || a === U ? " (default)" : ""}`, I = () => {
    n && (N(null), k ? d > c && F(Array.from({ length: v - m + 1 }, (a, e) => m + e), c, d) : L(n.r0));
  }, O = (a) => {
    if (n && k && a === m) {
      const t = v > m ? `${$[m]}–${$[v]}` : $[m];
      return {
        at: (c + d) / 2,
        a: g === null ? `Clear to ${y(null)}` : y(g),
        b: `${t} ${p(c)} until ${d >= h ? "24:00" : p(d)}`
      };
    }
    if (n || (r == null ? void 0 : r.r) !== a) return null;
    const e = i.week[a] ?? [], o = e.find((t) => t.start <= r.m && r.m <= t.end), u = (o == null ? void 0 : o.start) ?? Math.max(0, ...e.filter((t) => t.end < r.m).map((t) => t.end + 1)), w = (o == null ? void 0 : o.end) ?? Math.min(h, ...e.filter((t) => t.start > r.m).map((t) => t.start)) - 1;
    return {
      at: r.m,
      a: `${$[a]} ${p(r.m)} · ${y((o == null ? void 0 : o.name) ?? null)}`,
      b: `${p(u)} until ${Y(w)}  ·  stored ${p(u)}–${p(w)}`
    };
  };
  return /* @__PURE__ */ x(
    "div",
    {
      role: "grid",
      "aria-label": "Weekly hours",
      className: "grid select-none grid-cols-[3.5rem_minmax(0,1fr)] gap-y-1.5",
      onPointerUp: I,
      onPointerLeave: I,
      children: [
        /* @__PURE__ */ s("span", {}),
        /* @__PURE__ */ s("div", { className: "relative h-4", children: j.map((a, e) => /* @__PURE__ */ s(
          "span",
          {
            className: b(
              "absolute top-0 font-mono text-caption text-ink-faint",
              e === 0 ? "" : e === j.length - 1 ? "-translate-x-full" : "-translate-x-1/2"
            ),
            style: { left: f(a * 60) },
            children: String(a).padStart(2, "0")
          },
          a
        )) }),
        $.map((a, e) => {
          const o = O(e), u = k && e >= m && e <= v && d > c, w = E(g === null ? 0 : T(i, g));
          return /* @__PURE__ */ x("div", { role: "row", className: "contents", children: [
            /* @__PURE__ */ x(
              "button",
              {
                type: "button",
                title: `Exact times for ${a}`,
                "aria-label": `${H[e]}: exact times`,
                className: b(
                  "flex h-[30px] items-center gap-1.5 self-center text-left text-xs font-semibold hover:text-accent",
                  e === B ? "text-accent" : "text-ink"
                ),
                onClick: () => L(e),
                children: [
                  a,
                  z.has(e) && /* @__PURE__ */ s("span", { title: "Unsaved change", className: "size-1.5 rounded-full bg-accent" })
                ]
              }
            ),
            /* @__PURE__ */ x(
              "div",
              {
                ref: (t) => {
                  P.current[e] = t;
                },
                "data-testid": `week-row-${e}`,
                className: b(
                  "relative h-[30px] rounded-md bg-surface-inset",
                  S && "cursor-crosshair touch-none"
                ),
                onPointerDown: (t) => {
                  if (!S || t.button !== 0) return;
                  t.preventDefault();
                  const l = D(e, t);
                  N({ r0: e, m0: l, r1: e, m1: l }), M(null);
                },
                onPointerMove: (t) => {
                  if (n) {
                    const l = D(e, t);
                    (l !== n.m1 || e !== n.r1) && N({ ...n, r1: e, m1: l });
                  } else M({ r: e, m: G(e, t) });
                },
                onPointerLeave: () => M(null),
                children: [
                  /* @__PURE__ */ x("div", { className: "absolute inset-0 overflow-hidden rounded-md", children: [
                    W.map((t) => /* @__PURE__ */ s(
                      "span",
                      {
                        className: b("absolute inset-y-0 w-px", t % 6 === 0 ? "bg-line-strong" : "bg-line/60"),
                        style: { left: f(t * 60) }
                      },
                      t
                    )),
                    (i.week[e] ?? []).map((t) => {
                      const l = E(T(i, t.name));
                      return /* @__PURE__ */ s(
                        "span",
                        {
                          "data-block": t.name,
                          className: b(
                            "pointer-events-none absolute inset-y-[3px] flex items-center overflow-hidden whitespace-nowrap rounded-sm px-1.5 font-mono text-caption",
                            l.bg,
                            l.text
                          ),
                          style: { left: f(t.start), width: f(t.end + 1 - t.start) },
                          children: t.end + 1 - t.start >= q ? `${p(t.start)}–${Y(t.end)}` : ""
                        },
                        t.start
                      );
                    }),
                    u && /* @__PURE__ */ s(
                      "span",
                      {
                        className: b(
                          "pointer-events-none absolute inset-y-[3px] rounded-sm border border-dashed border-ink-strong",
                          w.bg
                        ),
                        style: { left: f(c), width: f(d - c) }
                      }
                    )
                  ] }),
                  o && /* @__PURE__ */ x(
                    "span",
                    {
                      role: "tooltip",
                      className: "pointer-events-none absolute bottom-full z-10 mb-1 grid -translate-x-1/2 gap-0.5 whitespace-pre rounded-md border border-line bg-surface-card px-2.5 py-1.5 text-xs text-ink shadow-(--elev-popover)",
                      style: { left: `clamp(7rem, ${f(o.at)}, calc(100% - 7rem))` },
                      children: [
                        /* @__PURE__ */ s("span", { className: "font-semibold text-ink-strong", children: o.a }),
                        /* @__PURE__ */ s("span", { className: "text-ink-muted", children: o.b })
                      ]
                    }
                  )
                ]
              }
            )
          ] }, a);
        })
      ]
    }
  );
}
export {
  nt as PaintGrid
};
