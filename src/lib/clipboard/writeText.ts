// THE clipboard write — the one place in the app that puts text on the system clipboard. Everything
// that copies anything routes here: the copy button, the JSON popout, the code block, the agent answer,
// an API key, a share URL, a flow bundle.
//
// The reason this file exists rather than a bare `navigator.clipboard.writeText` call at each site: the
// async Clipboard API is **only defined in a secure context** (HTTPS, or `localhost`/`127.0.0.1`).
// rubix-ai's dev node is `127.0.0.1:8099`, which IS secure — so every copy affordance works perfectly on
// a developer's machine and then silently no-ops the moment the node is reached over plain HTTP on a LAN
// address (`http://192.168.x.x:8099`), which is how it is actually deployed. `navigator.clipboard` is
// `undefined` there, so `navigator.clipboard?.writeText(text)` — the shape this tree used in ten places —
// evaluates to `undefined`, throws nothing, and reports success. That is the worst failure mode
// available: invisible in dev, invisible in the logs, and the button still flips to "Copied ✓".
//
// So: two strategies, tried in order.
//
//   1. **Async Clipboard API** (`navigator.clipboard.writeText`) — the modern path. Covers HTTPS,
//      localhost, and the Tauri webview (served from a `tauri://`-scheme origin, which the webview
//      treats as a secure context — the desktop shell needs no special case, and deliberately does not
//      get one: a Tauri-only clipboard plugin would be a new dependency in both build graphs to fix a
//      case that is not broken. If that ever changes it slots in here as a third strategy.)
//   2. **`document.execCommand("copy")`** — deprecated, and the only thing that works in an insecure
//      context. Selects a hidden `<textarea>` and copies the selection.
//
// **The ordering constraint that makes this subtle.** Strategy 2 only works inside the task of a real
// user gesture (click/keydown). Once you `await` anything, the gesture is spent and the browser refuses
// the `execCommand` as untrusted. So the fallback CANNOT be written as the natural-looking
// `try { await navigator.clipboard.writeText(t) } catch { legacy(t) }` — by the time that promise
// rejects we are a microtask later, the gesture is gone, and the fallback fails too. Instead we decide
// which strategy to use *synchronously* (`hasAsyncClipboard()`) and only ever await on the path that
// does not need the gesture. `writeText` is still declared `async` for a uniform call shape, but on the
// legacy path it does all its real work before the first await point.
//
// Callers get `false` back rather than an exception: a failed copy is never destructive, and the text
// is still selectable for a manual copy. One responsibility: a string → the system clipboard.

/** Is the async Clipboard API actually usable? False in an insecure context (plain HTTP on a LAN IP),
 *  where `navigator.clipboard` is undefined, and in a non-DOM context (a node-side test). Checked
 *  synchronously so the caller can pick a strategy without spending the user gesture. */
function hasAsyncClipboard(): boolean {
  return (
    typeof navigator !== "undefined" &&
    typeof navigator.clipboard?.writeText === "function" &&
    // `isSecureContext` is the spec's own gate. Some engines expose a `clipboard` object that throws
    // on use in an insecure context rather than omitting it, so trust the flag over the shape.
    (typeof isSecureContext === "undefined" || isSecureContext)
  );
}

/** Is there a DOM to run the legacy strategy through? Checks for a truthy `body` rather than merely a
 *  defined one: during parse, and in a non-DOM context, `document.body` is `null` while still being of
 *  type "object" — appending to it would throw. */
function hasDom(): boolean {
  return (
    typeof document !== "undefined" &&
    !!document.body &&
    typeof document.createElement === "function"
  );
}

/** The insecure-context path: copy `text` via a hidden `<textarea>` and `document.execCommand("copy")`.
 *  Fully synchronous — it MUST complete inside the user-gesture task to be honoured.
 *
 *  The details here are each load-bearing, and each is invisible in a passing dev-browser copy:
 *   * The textarea must be IN the document and focusable — a detached node cannot hold a selection.
 *   * It must not scroll the page: `position: fixed` + near-zero size + `opacity: 0` keeps it inert.
 *     (`display: none` or `visibility: hidden` would make it unselectable and break the copy.)
 *   * `readOnly` stops the mobile keyboard from opening, while still allowing selection.
 *   * The previous selection is restored afterwards, so copying does not clobber a user's text
 *     selection elsewhere on the page. */
function legacyWriteText(text: string): boolean {
  if (!hasDom()) return false;

  const previous = document.getSelection();
  // Snapshot before we mutate the selection; ranges are live objects, so clone them.
  const priorRanges: Range[] = [];
  if (previous)
    for (let i = 0; i < previous.rangeCount; i += 1)
      priorRanges.push(previous.getRangeAt(i).cloneRange());

  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.setAttribute("aria-hidden", "true");
  ta.tabIndex = -1;
  ta.style.position = "fixed";
  ta.style.top = "0";
  ta.style.left = "0";
  ta.style.width = "1px";
  ta.style.height = "1px";
  ta.style.padding = "0";
  ta.style.border = "none";
  ta.style.outline = "none";
  ta.style.boxShadow = "none";
  ta.style.background = "transparent";
  ta.style.opacity = "0";

  document.body.appendChild(ta);

  let ok = false;
  try {
    ta.focus({ preventScroll: true });
    ta.select();
    // `setSelectionRange` is what actually makes the selection stick on iOS Safari, where `select()`
    // alone is a no-op on a readonly field.
    ta.setSelectionRange(0, text.length);
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  } finally {
    document.body.removeChild(ta);
    // Put the user's own selection back exactly as we found it.
    if (priorRanges.length > 0) {
      const sel = document.getSelection();
      if (sel) {
        sel.removeAllRanges();
        for (const r of priorRanges) sel.addRange(r);
      }
    }
  }
  return ok;
}

/**
 * Copy `text` to the system clipboard. Resolves to whether it succeeded; never throws.
 *
 * Works in a secure context (HTTPS / localhost / the Tauri webview) via the async Clipboard API, and in
 * an insecure one (plain HTTP on a LAN address) via the legacy `execCommand` fallback.
 *
 * **Call it directly from the user-gesture handler.** The legacy fallback is only honoured inside the
 * gesture's own task, so `await`-ing something else first will break copying for HTTP users while
 * continuing to work for you on localhost:
 *
 * ```ts
 * onClick={() => void writeText(text)}          // ✅
 * onClick={async () => { await load(); writeText(text) }}   // ❌ gesture spent — HTTP users get nothing
 * ```
 */
export async function writeText(text: string): Promise<boolean> {
  if (hasAsyncClipboard()) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Present but refused — a denied permission, or a document that was not focused at the moment of
      // the write. The gesture is spent by now, but the legacy path is still worth one attempt: it
      // succeeds in some of these cases (notably a cross-origin-iframe focus quirk) and costs nothing
      // when it does not.
      return legacyWriteText(text);
    }
  }
  return legacyWriteText(text);
}

/** Whether *some* clipboard strategy is available at all. Useful for hiding a copy affordance entirely
 *  in a context where neither path can work (a non-DOM environment). Note this is deliberately NOT used
 *  to gate on secure-context: an insecure page can still copy via the legacy path. */
export function canWriteText(): boolean {
  return hasAsyncClipboard() || hasDom();
}
