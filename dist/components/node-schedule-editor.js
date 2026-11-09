import { jsxs as h, jsx as n } from "react/jsx-runtime";
import { useState as g, useMemo as C, useEffect as R } from "react";
import { Tabs as O, TabsList as L, TabsTrigger as M } from "./tabs.js";
import { useMinWidth as P, MD_PX as V } from "../lib/media.js";
import { nowAndNext as W } from "../lib/schedule/nowAndNext.js";
import { changedDays as j } from "../lib/schedule/scheduleEdits.js";
import { CalendarTab as B } from "./node-schedule-editor-calendar-tab.js";
import { AddDatedSheet as I } from "./node-schedule-editor-add-dated.js";
import { DatedTab as $ } from "./node-schedule-editor-dated-tab.js";
import { EditorBanner as F } from "./node-schedule-editor-banner.js";
import { EditorHeader as x } from "./node-schedule-editor-header.js";
import { UnreadableState as H, EditorSkeleton as X } from "./node-schedule-editor-states.js";
import { nameValue as Z } from "./node-schedule-editor-words.js";
import { PhoneView as _ } from "./node-schedule-editor-phone.js";
import { SaveBar as q } from "./node-schedule-editor-save-bar.js";
import { SettingsTab as z } from "./node-schedule-editor-settings-tab.js";
import { useEditorDraft as G } from "./node-schedule-editor-draft.js";
import { WeekTab as J } from "./node-schedule-editor-week-tab.js";
function K(e) {
  const [b, m] = g(() => e ?? Date.now());
  return R(() => {
    if (e !== void 0) return m(e);
    const f = setInterval(() => m(Date.now()), 3e4);
    return () => clearInterval(f);
  }, [e]), e ?? b;
}
function be(e) {
  const { schedule: b, unreadable: m, readOnly: f = !1, hideSettings: T = !1, extraTab: i } = e, D = K(e.now), a = G(b, e), [w, y] = g(e.initialTab ?? "hours"), E = P(V), [N, v] = g(!1), t = a.draft, d = C(() => t ? W(t, D) : null, [t, D]), k = C(() => new Set(a.base && t ? j(a.base, t) : []), [a.base, t]), s = m ?? (a.unreadable && t ? { id: t.id, name: t.name } : void 0);
  if (s)
    return /* @__PURE__ */ h("div", { className: "flex h-full min-h-0 flex-col", children: [
      /* @__PURE__ */ n(
        x,
        {
          doc: null,
          fallback: s,
          state: null,
          title: e.title,
          subtitle: e.subtitle,
          onClose: e.onClose
        }
      ),
      /* @__PURE__ */ n(
        H,
        {
          id: s.id,
          canEdit: !f,
          onDelete: e.onDelete,
          onRecreate: e.onRecreate && (() => {
            var o;
            return (o = e.onRecreate) == null ? void 0 : o.call(e, s.id, s.name);
          })
        }
      )
    ] });
  if (!t || !d) return /* @__PURE__ */ n(X, {});
  const l = !f, c = (o) => l && a.setDraft(o), u = e.weekOnly ?? !1, S = [
    ["hours", "Weekly hours"],
    ...u ? [] : [["dated", `Dated entries (${t.dated.length})`]],
    ["cal", "Calendar"],
    ...T || u ? [] : [["set", "Settings"]],
    ...i ? [["extra", i.label]] : []
  ], r = S.some(([o]) => o === w) ? w : "hours", A = ((/* @__PURE__ */ new Date(`${d.at.date}T00:00:00Z`)).getUTCDay() + 6) % 7;
  return /* @__PURE__ */ h("div", { className: "flex h-full min-h-0 flex-col", children: [
    /* @__PURE__ */ n(x, { doc: t, state: d, title: e.title, subtitle: e.subtitle, onClose: e.onClose }),
    E ? /* @__PURE__ */ h("div", { className: "flex min-h-0 flex-1 flex-col", "data-testid": "node-schedule-editor", children: [
      /* @__PURE__ */ n(
        F,
        {
          conflict: a.conflict,
          needsUpgrade: a.needsUpgrade,
          error: a.error,
          enabled: t.enabled,
          offText: Z(t.names[0]),
          canEdit: l,
          onReload: e.onReload && (() => void a.reload()),
          onSwitchOn: () => c({ ...t, enabled: !0 })
        }
      ),
      /* @__PURE__ */ n("div", { className: "min-h-0 flex-1 overflow-y-auto px-4 pb-6 pt-3", children: /* @__PURE__ */ h(O, { value: r, onValueChange: (o) => y(o), className: "gap-3", children: [
        /* @__PURE__ */ n(L, { "aria-label": "Schedule sections", className: "self-start", children: S.map(([o, U]) => /* @__PURE__ */ n(M, { value: o, children: U }, o)) }),
        r === "hours" && /* @__PURE__ */ n(
          J,
          {
            doc: t,
            canEdit: l,
            namesFixed: u,
            changed: k,
            today: A,
            onChange: c
          }
        ),
        r === "dated" && /* @__PURE__ */ n(
          $,
          {
            doc: t,
            canEdit: l,
            today: d.at.date,
            onAdd: () => v(!0),
            onChange: c
          }
        ),
        r === "cal" && /* @__PURE__ */ n(B, { doc: t, at: d.at, canEdit: l && !u, onAdd: () => v(!0) }),
        r === "set" && /* @__PURE__ */ n(z, { doc: t, canEdit: l, onChange: c, onDelete: e.onDelete }),
        r === "extra" && (i == null ? void 0 : i.render())
      ] }) }),
      l && /* @__PURE__ */ n(
        q,
        {
          parts: a.parts,
          saving: a.saving,
          saved: a.saved,
          needsUpgrade: a.needsUpgrade,
          saveLabel: e.saveLabel ?? "Save",
          onSave: () => void a.save(),
          onDiscard: a.discard
        }
      )
    ] }) : /* @__PURE__ */ n(_, { doc: t, state: d }),
    /* @__PURE__ */ n(
      I,
      {
        open: N,
        doc: t,
        today: d.at.date,
        onClose: () => v(!1),
        onAdd: (o) => c({ ...t, dated: [...t.dated, o] })
      }
    )
  ] });
}
export {
  be as NodeScheduleEditor
};
