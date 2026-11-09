import { jsxs as i, jsx as a } from "react/jsx-runtime";
import { useState as T } from "react";
import { Plus as $, Repeat as w, Trash2 as y } from "lucide-react";
import { Button as N } from "./button.js";
import { cn as C } from "../lib/cn.js";
import { Tabs as D, TabsList as O, TabsTrigger as I } from "./tabs.js";
import { nextWindow as k, isPast as R } from "../lib/schedule/datedWindows.js";
import { nameIndex as S, defaultName as v } from "../lib/schedule/nodeSchedule.js";
import { addDays as j } from "../lib/date.js";
import { dateText as p, nameText as f, untilText as z } from "./node-schedule-editor-words.js";
import { KINDS as u, KindChip as K } from "./node-schedule-editor-dated-kinds.js";
import { hhmm as P } from "../lib/time.js";
const _ = ["all", "extra", "changed", "closed", "holiday"];
function A(t, n) {
  const r = k(t, n), s = r.start.slice(0, 10), l = r.end.endsWith("T00:00") ? j(r.end.slice(0, 10), -1) : r.end.slice(0, 10);
  return l > s ? `${p(s, n)} – ${p(l, n)}` : p(s, n);
}
function E(t, n, r) {
  const s = (m, d) => `${P(m)} until ${z(d)}`, l = f(n, t.name ?? v(n));
  if (t.kind === "extra" && t.start !== void 0 && t.end !== void 0)
    return `Open ${s(t.start, t.end)} · ${l} on top of the week`;
  if (t.kind === "changed") {
    const m = (t.hours ?? []).map((d) => s(d.start, d.end)).join(", ");
    return m ? `Only ${m} · ${l}` : `Off all day · ${f(n, null)}`;
  }
  const h = t.start !== void 0 && t.end !== void 0 ? `Off ${s(t.start ?? 0, t.end ?? 0)}` : "Off all day";
  return `${r ? "Past · " : ""}${h} · ${f(n, null)}`;
}
function X({ doc: t, canEdit: n, today: r, onAdd: s, onChange: l }) {
  const [c, h] = T("all"), m = (e) => t.dated.filter((o) => e === "all" || o.kind === e).length, d = t.dated.filter((e) => c === "all" || e.kind === c).map((e) => ({ e, past: R(e, r), next: k(e, r) })).sort((e, o) => Number(e.past) - Number(o.past) || e.next.start.localeCompare(o.next.start)), x = `${r}T00:00`;
  return /* @__PURE__ */ i("section", { className: "grid gap-3", children: [
    /* @__PURE__ */ i("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ a(D, { value: c, onValueChange: (e) => h(e), className: "gap-0", children: /* @__PURE__ */ a(O, { "aria-label": "Kind", children: _.map((e) => /* @__PURE__ */ i(I, { value: e, className: "gap-1.5", children: [
        e === "all" ? "All" : u[e].filter,
        /* @__PURE__ */ a("span", { className: "text-ink-faint", children: m(e) })
      ] }, e)) }) }),
      n && /* @__PURE__ */ i(N, { variant: "outline", size: "sm", className: "ml-auto", onClick: s, children: [
        /* @__PURE__ */ a($, {}),
        "Add dated entry"
      ] })
    ] }),
    /* @__PURE__ */ a("p", { className: "text-xs text-ink-muted", children: "Dates that differ from the week. Extra hours open on top of the week; changed hours replace that day's hours. Closed and holiday switch the schedule off for the day, over everything else." }),
    /* @__PURE__ */ i("ul", { "aria-label": "Dated entries", className: "divide-y divide-line overflow-hidden rounded-lg border border-line", children: [
      d.length === 0 && /* @__PURE__ */ a("li", { className: "p-4 text-center text-xs text-ink-faint", children: t.dated.length ? "Nothing matches" : "No dated entries. The week runs as it is every week." }),
      d.map(({ e, past: o, next: g }) => /* @__PURE__ */ i(
        "li",
        {
          className: C(
            "grid min-h-12 grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)_auto_2rem] items-center gap-3 py-2 pl-3.5 pr-1.5",
            o && "opacity-55",
            g.start <= x && g.end > x && "bg-accent/6"
          ),
          children: [
            /* @__PURE__ */ i("div", { className: "grid gap-0.5", children: [
              /* @__PURE__ */ a("span", { className: "text-xs font-semibold text-ink-strong", children: A(e, r) }),
              e.yearly && /* @__PURE__ */ i("span", { className: "flex items-center gap-1 text-caption text-ink-muted", children: [
                /* @__PURE__ */ a(w, { className: "size-3" }),
                "Every year"
              ] })
            ] }),
            /* @__PURE__ */ i("div", { className: "grid min-w-0 gap-0.5", children: [
              /* @__PURE__ */ a("span", { className: "truncate text-xs font-medium text-ink-strong", children: e.label || u[e.kind].label }),
              /* @__PURE__ */ a("span", { className: "truncate text-caption text-ink-muted", children: E(e, t, o) })
            ] }),
            /* @__PURE__ */ a(K, { kind: e.kind, nameIndex: S(t, e.name ?? v(t)) }),
            n ? /* @__PURE__ */ a(
              N,
              {
                variant: "ghost",
                size: "icon-sm",
                "aria-label": `Remove ${e.label || u[e.kind].label}`,
                title: "Remove",
                onClick: () => l({ ...t, dated: t.dated.filter((b) => b.id !== e.id) }),
                children: /* @__PURE__ */ a(y, {})
              }
            ) : /* @__PURE__ */ a("span", {})
          ]
        },
        e.id
      ))
    ] })
  ] });
}
export {
  X as DatedTab,
  E as detailText,
  A as whenText
};
