// The real bug the ten hand-rolled `navigator.clipboard?.writeText(text)` callsites carried, and why it
// survived ten copies: it is **invisible on a developer's machine**. The dev node is `127.0.0.1:8099` —
// a secure context — so the async Clipboard API is defined and every copy button works. Deployed on a
// LAN address over plain HTTP, `navigator.clipboard` is `undefined`, `?.writeText(...)` short-circuits
// to `undefined`, nothing throws, and the button still flips to "Copied ✓" having copied nothing.
//
// So the insecure-context path gets asserted here or it does not get asserted at all. Same class of
// silent-in-Chrome / broken-elsewhere defect as the `downloadBlob` revoke race next door.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { canWriteText, writeText } from "./writeText";

/** Swap `navigator.clipboard` / `isSecureContext` for the duration of a test. jsdom defines neither the
 *  way a browser does, so both are installed explicitly per scenario rather than assumed. */
function setContext(opts: { secure: boolean; asyncApi?: (text: string) => Promise<void> }) {
  Object.defineProperty(globalThis, "isSecureContext", { value: opts.secure, configurable: true });
  Object.defineProperty(navigator, "clipboard", {
    value: opts.asyncApi ? { writeText: vi.fn(opts.asyncApi) } : undefined,
    configurable: true,
  });
}

/** What the legacy `execCommand("copy")` path actually copied: the value of the selected textarea at
 *  the instant of the call, plus whether it was attached to the document (a detached node cannot hold
 *  a selection, so a detached copy is a silent no-op). */
let execCopied: Array<{ value: string; attached: boolean; selected: boolean }> = [];
let execResult = true;

beforeEach(() => {
  execCopied = [];
  execResult = true;
  document.execCommand = vi.fn((cmd: string) => {
    if (cmd !== "copy") return false;
    const el = document.activeElement;
    if (el instanceof HTMLTextAreaElement) {
      execCopied.push({
        value: el.value,
        attached: document.body.contains(el),
        selected: el.selectionStart === 0 && el.selectionEnd === el.value.length,
      });
    }
    return execResult;
  }) as unknown as typeof document.execCommand;
});

afterEach(() => {
  vi.restoreAllMocks();
  Object.defineProperty(navigator, "clipboard", { value: undefined, configurable: true });
});

describe("writeText — secure context (HTTPS / localhost / Tauri webview)", () => {
  it("uses the async Clipboard API and does not touch the DOM", async () => {
    setContext({ secure: true, asyncApi: async () => {} });

    await expect(writeText("chiller-kw")).resolves.toBe(true);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("chiller-kw");
    expect(execCopied).toEqual([]);
    expect(document.querySelector("textarea")).toBeNull();
  });

  it("falls back to execCommand when the async API is present but REFUSES", async () => {
    // A denied permission, or a document that was not focused at the moment of the write.
    setContext({
      secure: true,
      asyncApi: async () => Promise.reject(new Error("NotAllowedError")),
    });

    await expect(writeText("still-copied")).resolves.toBe(true);
    expect(execCopied.map((c) => c.value)).toEqual(["still-copied"]);
  });
});

describe("writeText — insecure context (plain HTTP on a LAN address)", () => {
  beforeEach(() => setContext({ secure: false }));

  it("copies via the legacy path when navigator.clipboard is undefined", async () => {
    // THE regression this file exists for: pre-fix, this resolved "successfully" having copied nothing.
    await expect(writeText("api-key-secret")).resolves.toBe(true);

    expect(execCopied).toHaveLength(1);
    expect(execCopied[0].value).toBe("api-key-secret");
    // A detached or unselected textarea copies nothing — both are invisible in a passing dev copy.
    expect(execCopied[0].attached).toBe(true);
    expect(execCopied[0].selected).toBe(true);
  });

  it("ignores a clipboard object that exists but is not secure-context-backed", async () => {
    // Some engines expose `navigator.clipboard` on an insecure page and throw on use, so the
    // `isSecureContext` flag has to win over the mere presence of the object.
    const api = vi.fn(async () => {});
    setContext({ secure: false, asyncApi: api });

    await expect(writeText("x")).resolves.toBe(true);
    expect(api).not.toHaveBeenCalled();
    expect(execCopied.map((c) => c.value)).toEqual(["x"]);
  });

  it("does the copy BEFORE the first await — the user gesture is still alive", async () => {
    // The load-bearing ordering rule. `execCommand` is only honoured inside the gesture's own task, so
    // the legacy path must not sit behind an awaited promise rejection. Not awaiting the returned
    // promise here models the synchronous gesture task: the copy must already have happened.
    void writeText("gesture-bound");

    expect(execCopied.map((c) => c.value)).toEqual(["gesture-bound"]);
  });

  it("reports false when the copy is refused rather than pretending it worked", async () => {
    execResult = false;
    await expect(writeText("nope")).resolves.toBe(false);
  });

  it("cleans up the textarea and restores the prior selection", async () => {
    // Start from a clean selection — jsdom's selection is per-document and survives across tests.
    document.getSelection()?.removeAllRanges();
    const p = document.createElement("p");
    p.textContent = "the user's own selection";
    document.body.appendChild(p);
    const range = document.createRange();
    range.selectNodeContents(p);
    document.getSelection()?.addRange(range);

    await writeText("copied");

    // No stray textarea accumulates in the document…
    expect(document.querySelector("textarea")).toBeNull();
    // …and the user's own selection is put back where it was. Asserted structurally (the range is
    // restored, and it still spans the user's node) rather than via `getSelection().toString()`:
    // jsdom does not recompute selection text after the textarea is detached, so the string form
    // reads empty here regardless of correctness. The range identity is what the source restores.
    const sel = document.getSelection();
    expect(sel?.rangeCount).toBe(1);
    expect(sel?.getRangeAt(0).commonAncestorContainer).toBe(p);
    document.body.removeChild(p);
  });
});

describe("writeText — no DOM", () => {
  it("returns false instead of throwing", async () => {
    setContext({ secure: false });
    const body = document.body;
    // A null body is the real non-DOM shape (SSR, and during parse) — `delete document.body` would not
    // model it, since the prototype getter survives and `typeof` still reports "object".
    Object.defineProperty(document, "body", { value: null, configurable: true });
    try {
      await expect(writeText("x")).resolves.toBe(false);
      expect(canWriteText()).toBe(false);
    } finally {
      Object.defineProperty(document, "body", { value: body, configurable: true });
    }
  });
});
