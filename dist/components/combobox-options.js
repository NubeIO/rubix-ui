function u(s, n) {
  if (!n) return !0;
  const e = n.toLowerCase();
  return s.value.toLowerCase().includes(e) || (s.label ?? "").toLowerCase().includes(e) || (s.description ?? "").toLowerCase().includes(e);
}
function i(s) {
  const n = [];
  return s.forEach((e, t) => {
    const r = n.find((o) => o.name === e.group);
    r ? r.items.push({ o: e, idx: t }) : n.push({ name: e.group, items: [{ o: e, idx: t }] });
  }), n;
}
export {
  i as groupOptions,
  u as matches
};
