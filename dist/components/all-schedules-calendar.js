import { jsxs as r, jsx as n } from "react/jsx-runtime";
import { useState as v, useMemo as z, useEffect as _ } from "react";
import { ChevronLeft as B, ChevronRight as F } from "lucide-react";
import { Button as w } from "./button.js";
import { cn as b } from "../lib/cn.js";
import { Tabs as V, TabsList as W, TabsTrigger as O } from "./tabs.js";
import { nameColour as Z } from "../lib/schedule/nameColour.js";
import { wallAt as K, nowAndNext as P } from "../lib/schedule/nowAndNext.js";
import { addDays as g } from "../lib/date.js";
import { scheduleColourClass as A } from "../lib/schedule/scheduleColour.js";
import { HATCH as q, KindChip as G } from "./node-schedule-editor-dated-kinds.js";
import { mondayOf as k, weekText as Q, untilText as M, dateText as X } from "./node-schedule-editor-words.js";
import { CalendarMonth as Y } from "./all-schedules-calendar-month.js";
import { CalendarWeekRows as ee } from "./all-schedules-calendar-week-rows.js";
import { dayTable as ne, periodEntries as te } from "./all-schedules-calendar-entries.js";
import { hhmm as S } from "../lib/time.js";
const I = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
], ae = ["1st", "2nd", "3rd", "4th", "5th"], re = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
};
function j(a, o) {
  return new Date(Date.UTC(Number(a.slice(0, 4)), Number(a.slice(5, 7)) - 1 + o, 1)).toISOString().slice(0, 7);
}
const T = (a, o) => {
  const s = [a];
  for (; s[s.length - 1] < o; ) s.push(g(s[s.length - 1], 1));
  return s;
};
function se(a) {
  const [o, s] = v(() => a ?? Date.now());
  return _(() => {
    if (a !== void 0) return;
    const h = setInterval(() => s(Date.now()), 3e4);
    return () => clearInterval(h);
  }, [a]), a ?? o;
}
function ve({ schedules: a, onOpen: o, now: s }) {
  const h = se(s), [i, E] = v("week"), [f, N] = v(0), [C, H] = v([]), l = K(h, re()).date, x = a.filter((e) => !C.includes(e.id)), d = j(l, f), $ = g(j(l, f + 1) + "-01", -1), c = i === "week" ? T(g(k(l), f * 7), g(k(l), f * 7 + 6)) : T(k(`${d}-01`), g(k($), 6)), J = i === "week" ? c : T(`${d}-01`, $), y = z(() => ne(x, c), [a, C, c.join()]), L = z(() => new Map(a.map((e) => [e.id, P(e, h)])), [a, h]), D = te(x, y, J), R = i === "week" ? Q(c[0]) : `${I[Number(d.slice(5)) - 1]} ${d.slice(0, 4)}`, U = ae.map((e, t) => ({
    ord: e,
    index: t + 1,
    names: [...new Set(x.map((m) => {
      var p;
      return (p = m.names[t + 1]) == null ? void 0 : p.name;
    }).filter(Boolean))]
  })).filter((e) => e.names.length > 0);
  return /* @__PURE__ */ r("section", { className: "grid gap-4", children: [
    /* @__PURE__ */ r("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ n(
        V,
        {
          value: i,
          onValueChange: (e) => {
            E(e), N(0);
          },
          className: "gap-0",
          children: /* @__PURE__ */ r(W, { "aria-label": "Calendar view", children: [
            /* @__PURE__ */ n(O, { value: "week", children: "Week" }),
            /* @__PURE__ */ n(O, { value: "month", children: "Month" })
          ] })
        }
      ),
      /* @__PURE__ */ n(
        w,
        {
          variant: "ghost",
          size: "icon-sm",
          "aria-label": `Previous ${i}`,
          onClick: () => N((e) => e - 1),
          children: /* @__PURE__ */ n(B, {})
        }
      ),
      /* @__PURE__ */ n("span", { className: "min-w-36 text-center text-sm font-semibold text-ink-strong", children: R }),
      /* @__PURE__ */ n(w, { variant: "ghost", size: "icon-sm", "aria-label": `Next ${i}`, onClick: () => N((e) => e + 1), children: /* @__PURE__ */ n(F, {}) }),
      /* @__PURE__ */ n(w, { variant: "outline", size: "sm", disabled: f === 0, onClick: () => N(0), children: "Today" }),
      /* @__PURE__ */ n("div", { className: "ml-auto flex flex-wrap gap-1.5", children: a.map((e) => {
        const t = !C.includes(e.id);
        return /* @__PURE__ */ r(
          w,
          {
            variant: "outline",
            size: "sm",
            "aria-pressed": t,
            className: b("rounded-full", !t && "text-ink-faint"),
            onClick: () => H((m) => t ? [...m, e.id] : m.filter((p) => p !== e.id)),
            children: [
              /* @__PURE__ */ n(
                "span",
                {
                  "aria-hidden": !0,
                  className: b("size-2 rounded-full", t ? A(e.color) : "bg-ink-faint")
                }
              ),
              e.name
            ]
          },
          e.id
        );
      }) })
    ] }),
    i === "week" ? /* @__PURE__ */ n(ee, { schedules: x, days: c, table: y, today: l, now: L, onOpen: o }) : /* @__PURE__ */ n(Y, { schedules: x, days: c, month: d, table: y, today: l }),
    /* @__PURE__ */ r("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-1.5 text-caption text-ink-muted", children: [
      U.map((e) => /* @__PURE__ */ r("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ n("span", { "aria-hidden": !0, className: b("size-2.5 rounded-xs", Z(e.index).bg) }),
        /* @__PURE__ */ r("span", { className: "text-ink", children: [
          e.ord,
          " name"
        ] }),
        e.names.join(" · ")
      ] }, e.index)),
      /* @__PURE__ */ r("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ n("span", { "aria-hidden": !0, className: "size-2.5 rounded-xs border border-dashed border-ink-strong" }),
        "Extra hours"
      ] }),
      /* @__PURE__ */ r("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ n("span", { "aria-hidden": !0, className: "size-2.5 rounded-xs border border-line-strong", style: q }),
        "Closed or holiday"
      ] }),
      /* @__PURE__ */ r("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ n("span", { "aria-hidden": !0, className: "h-2.5 w-0.5 bg-destructive" }),
        "Now"
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "grid gap-2", children: [
      /* @__PURE__ */ n("h3", { className: "text-sm font-semibold text-ink-strong", children: i === "week" ? "Dated entries this week" : `Dated entries in ${I[Number(d.slice(5)) - 1]}` }),
      /* @__PURE__ */ r("ul", { "aria-label": "Dated entries in this period", className: "divide-y divide-line overflow-hidden rounded-lg border border-line", children: [
        D.length === 0 && /* @__PURE__ */ n("li", { className: "p-4 text-center text-xs text-ink-faint", children: "No dated entries." }),
        D.map(({ date: e, item: t, schedules: m }) => {
          const p = t.start !== void 0 && t.end !== void 0 ? ` · ${S(t.start)}–${M(t.end)}` : (t.hours ?? []).map((u) => ` · ${S(u.start)}–${M(u.end)}`).join("");
          return /* @__PURE__ */ r(
            "li",
            {
              className: "grid grid-cols-[minmax(0,8rem)_minmax(0,1fr)_minmax(0,auto)_auto] items-center gap-3 px-3.5 py-2.5",
              children: [
                /* @__PURE__ */ n("span", { className: "text-xs font-semibold text-ink-strong", children: X(e, l) }),
                /* @__PURE__ */ r("span", { className: "truncate text-xs text-ink", children: [
                  t.label,
                  p
                ] }),
                /* @__PURE__ */ n("span", { className: "flex flex-wrap gap-x-3 gap-y-1", children: m.map((u) => /* @__PURE__ */ r("span", { className: "flex items-center gap-1.5 text-caption text-ink-muted", children: [
                  /* @__PURE__ */ n("span", { "aria-hidden": !0, className: b("size-1.5 rounded-full", A(u.color)) }),
                  u.name
                ] }, u.id)) }),
                /* @__PURE__ */ n(G, { kind: t.kind, nameIndex: 1 })
              ]
            },
            `${t.kind}|${t.label}`
          );
        })
      ] })
    ] })
  ] });
}
export {
  ve as AllSchedulesCalendar
};
