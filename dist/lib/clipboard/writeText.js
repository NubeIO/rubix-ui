function c() {
  var t;
  return typeof navigator < "u" && typeof ((t = navigator.clipboard) == null ? void 0 : t.writeText) == "function" && // `isSecureContext` is the spec's own gate. Some engines expose a `clipboard` object that throws
  // on use in an insecure context rather than omitting it, so trust the flag over the shape.
  (typeof isSecureContext > "u" || isSecureContext);
}
function l() {
  return typeof document < "u" && !!document.body && typeof document.createElement == "function";
}
function a(t) {
  if (!l()) return !1;
  const o = document.getSelection(), r = [];
  if (o)
    for (let n = 0; n < o.rangeCount; n += 1)
      r.push(o.getRangeAt(n).cloneRange());
  const e = document.createElement("textarea");
  e.value = t, e.setAttribute("readonly", ""), e.setAttribute("aria-hidden", "true"), e.tabIndex = -1, e.style.position = "fixed", e.style.top = "0", e.style.left = "0", e.style.width = "1px", e.style.height = "1px", e.style.padding = "0", e.style.border = "none", e.style.outline = "none", e.style.boxShadow = "none", e.style.background = "transparent", e.style.opacity = "0", document.body.appendChild(e);
  let i = !1;
  try {
    e.focus({ preventScroll: !0 }), e.select(), e.setSelectionRange(0, t.length), i = document.execCommand("copy");
  } catch {
    i = !1;
  } finally {
    if (document.body.removeChild(e), r.length > 0) {
      const n = document.getSelection();
      if (n) {
        n.removeAllRanges();
        for (const u of r) n.addRange(u);
      }
    }
  }
  return i;
}
async function d(t) {
  if (c())
    try {
      return await navigator.clipboard.writeText(t), !0;
    } catch {
      return a(t);
    }
  return a(t);
}
function s() {
  return c() || l();
}
export {
  s as canWriteText,
  d as writeText
};
