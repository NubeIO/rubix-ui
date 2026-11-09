import { useState as s, useMemo as T, useRef as M, useEffect as v } from "react";
import { toSaveError as P, ChangedElsewhere as j, BackendNeedsUpgrade as q, Unreadable as z } from "../lib/schedule/saveErrors.js";
import { changedParts as A, reapplyEdits as F } from "../lib/schedule/scheduleEdits.js";
function J(a, o) {
  const [t, u] = s(a), [n, l] = s(a), [S, m] = s(!1), [U, i] = s(null), [b, c] = s(null), [k, R] = s(!1), [D, w] = s(!1), [g, p] = s(!1), y = T(() => t && n ? A(t, n) : [], [t, n]), f = y.length > 0, E = M(f);
  E.current = f, v(() => {
    a && (!t || t.id !== a.id || !E.current && t.rev !== a.rev) && (u(a), l(a), i(null), c(null));
  }, [a]);
  const d = o.onDirtyChange;
  v(() => {
    d == null || d(f);
  }, [f, d]), v(() => {
    if (!g) return;
    const e = setTimeout(() => p(!1), 3e3);
    return () => clearTimeout(e);
  }, [g]);
  const x = async () => {
    if (!(!n || !o.onSave)) {
      m(!0), c(null);
      try {
        const e = await o.onSave(n), r = { ...n, rev: (e == null ? void 0 : e.rev) ?? n.rev };
        u(r), l(r), i(null), p(!0);
      } catch (e) {
        const r = P(e);
        r instanceof j ? i({ kind: "conflict" }) : r instanceof q ? R(!0) : r instanceof z ? w(!0) : c(r.message);
      } finally {
        m(!1);
      }
    }
  }, B = async () => {
    if (!(!t || !n || !o.onReload)) {
      c(null);
      try {
        const e = await o.onReload(), { doc: r, applied: N } = F(t, n, e);
        u(e), l(r), i({ kind: "reloaded", applied: N });
      } catch (e) {
        c(e instanceof Error ? e.message : String(e));
      }
    }
  }, C = () => {
    l(t), i(null), c(null);
  };
  return {
    base: t,
    draft: n,
    setDraft: (e) => l(e),
    parts: y,
    dirty: f,
    saving: S,
    saved: g,
    conflict: U,
    error: b,
    needsUpgrade: k || !!o.backendNeedsUpgrade,
    unreadable: D,
    save: x,
    reload: B,
    discard: C
  };
}
export {
  J as useEditorDraft
};
