var o = Object.defineProperty;
var c = (e, n, r) => n in e ? o(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[n] = r;
var s = (e, n, r) => c(e, typeof n != "symbol" ? n + "" : n, r);
class a extends Error {
  constructor() {
    super(...arguments);
    s(this, "kind", "changed-elsewhere");
  }
}
class d extends Error {
  constructor() {
    super(...arguments);
    s(this, "kind", "backend-needs-upgrade");
  }
}
class t extends Error {
  constructor() {
    super(...arguments);
    s(this, "kind", "unreadable");
  }
}
function l(e) {
  if (e instanceof a || e instanceof d || e instanceof t) return e;
  const n = e instanceof Error ? e.message : String(e);
  return /schedule_stale|changed elsewhere|someone else changed/i.test(n) ? new a(n) : /schedule_old_shape|old format|old shape/i.test(n) ? new t(n) : /backend needs upgrading/i.test(n) ? new d(n) : e instanceof Error ? e : new Error(n);
}
export {
  d as BackendNeedsUpgrade,
  a as ChangedElsewhere,
  t as Unreadable,
  l as toSaveError
};
