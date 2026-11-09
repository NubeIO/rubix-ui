import { jsxs as u, jsx as n } from "react/jsx-runtime";
import { useState as v, useMemo as C, useEffect as A } from "react";
import { Tabs as U, TabsList as R, TabsTrigger as L } from "./tabs.js";
import { nowAndNext as V } from "../lib/schedule/nowAndNext.js";
import { changedDays as j } from "../lib/schedule/scheduleEdits.js";
import { CalendarTab as B } from "./node-schedule-editor-calendar-tab.js";
import { AddDatedSheet as I } from "./node-schedule-editor-add-dated.js";
import { DatedTab as O } from "./node-schedule-editor-dated-tab.js";
import { EditorBanner as P } from "./node-schedule-editor-banner.js";
import { EditorHeader as w } from "./node-schedule-editor-header.js";
import { UnreadableState as W, EditorSkeleton as $ } from "./node-schedule-editor-states.js";
import { nameValue as H } from "./node-schedule-editor-words.js";
import { PhoneView as M } from "./node-schedule-editor-phone.js";
import { SaveBar as Z } from "./node-schedule-editor-save-bar.js";
import { SettingsTab as q } from "./node-schedule-editor-settings-tab.js";
import { useEditorDraft as z } from "./node-schedule-editor-draft.js";
import { WeekTab as F } from "./node-schedule-editor-week-tab.js";
function G(e) {
  const [h, m] = v(() => e ?? Date.now());
  return A(() => {
    if (e !== void 0) return m(e);
    const f = setInterval(() => m(Date.now()), 3e4);
    return () => clearInterval(f);
  }, [e]), e ?? h;
}
function ce(e) {
  const { schedule: h, unreadable: m, readOnly: f = !1, hideSettings: x = !1, extraTab: s } = e, g = G(e.now), a = z(h, e), [D, T] = v("hours"), [N, b] = v(!1), t = a.draft, d = C(() => t ? V(t, g) : null, [t, g]), y = C(() => new Set(a.base && t ? j(a.base, t) : []), [a.base, t]), i = m ?? (a.unreadable && t ? { id: t.id, name: t.name } : void 0);
  if (i)
    return /* @__PURE__ */ u("div", { className: "flex h-full min-h-0 flex-col", children: [
      /* @__PURE__ */ n(
        w,
        {
          doc: null,
          fallback: i,
          state: null,
          title: e.title,
          subtitle: e.subtitle,
          onClose: e.onClose
        }
      ),
      /* @__PURE__ */ n(
        W,
        {
          id: i.id,
          canEdit: !f,
          onDelete: e.onDelete,
          onRecreate: e.onRecreate && (() => {
            var o;
            return (o = e.onRecreate) == null ? void 0 : o.call(e, i.id, i.name);
          })
        }
      )
    ] });
  if (!t || !d) return /* @__PURE__ */ n($, {});
  const l = !f, c = (o) => l && a.setDraft(o), S = [
    ["hours", "Weekly hours"],
    ["dated", `Dated entries (${t.dated.length})`],
    ["cal", "Calendar"],
    ...x ? [] : [["set", "Settings"]],
    ...s ? [["extra", s.label]] : []
  ], r = S.some(([o]) => o === D) ? D : "hours", E = ((/* @__PURE__ */ new Date(`${d.at.date}T00:00:00Z`)).getUTCDay() + 6) % 7;
  return /* @__PURE__ */ u("div", { className: "flex h-full min-h-0 flex-col", children: [
    /* @__PURE__ */ n(w, { doc: t, state: d, title: e.title, subtitle: e.subtitle, onClose: e.onClose }),
    /* @__PURE__ */ u("div", { className: "hidden min-h-0 flex-1 flex-col md:flex", "data-testid": "node-schedule-editor", children: [
      /* @__PURE__ */ n(
        P,
        {
          conflict: a.conflict,
          needsUpgrade: a.needsUpgrade,
          error: a.error,
          enabled: t.enabled,
          offText: H(t.names[0]),
          canEdit: l,
          onReload: e.onReload && (() => void a.reload()),
          onSwitchOn: () => c({ ...t, enabled: !0 })
        }
      ),
      /* @__PURE__ */ n("div", { className: "min-h-0 flex-1 overflow-y-auto px-4 pb-6 pt-3", children: /* @__PURE__ */ u(U, { value: r, onValueChange: (o) => T(o), className: "gap-3", children: [
        /* @__PURE__ */ n(R, { "aria-label": "Schedule sections", className: "self-start", children: S.map(([o, k]) => /* @__PURE__ */ n(L, { value: o, children: k }, o)) }),
        r === "hours" && /* @__PURE__ */ n(F, { doc: t, canEdit: l, changed: y, today: E, onChange: c }),
        r === "dated" && /* @__PURE__ */ n(
          O,
          {
            doc: t,
            canEdit: l,
            today: d.at.date,
            onAdd: () => b(!0),
            onChange: c
          }
        ),
        r === "cal" && /* @__PURE__ */ n(B, { doc: t, at: d.at, canEdit: l, onAdd: () => b(!0) }),
        r === "set" && /* @__PURE__ */ n(q, { doc: t, canEdit: l, onChange: c, onDelete: e.onDelete }),
        r === "extra" && (s == null ? void 0 : s.render())
      ] }) }),
      l && /* @__PURE__ */ n(
        Z,
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
    ] }),
    /* @__PURE__ */ n("div", { className: "md:hidden", children: /* @__PURE__ */ n(M, { doc: t, state: d }) }),
    /* @__PURE__ */ n(
      I,
      {
        open: N,
        doc: t,
        today: d.at.date,
        onClose: () => b(!1),
        onAdd: (o) => c({ ...t, dated: [...t.dated, o] })
      }
    )
  ] });
}
export {
  ce as NodeScheduleEditor
};
