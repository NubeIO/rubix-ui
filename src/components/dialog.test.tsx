// The dialog-surface signal the shared `Combobox` reads to decide where to portal its panel
// (popover-in-dialog dismissal, radix #2121 — a modal dialog traps focus, so a body-portalled popover
// reads the focus move as "outside" and dismisses itself). The combobox portals INTO the `DialogContent`
// node instead of rendering its own modal layer (which fought the dialog's focus scope over the search
// input and OOMs V8 under jsdom).
//
// A unit test can pin the wiring — the signal is null outside and the content node inside
// `DialogContent`. Revert the provider and the combobox silently loses its portal target.

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Dialog, DialogContent, DialogTitle, useDialogSurface } from "./dialog";

function SurfaceProbe() {
  const surface = useDialogSurface();
  return (
    <output data-testid="surface">
      {surface instanceof HTMLElement ? `element:${surface.dataset.panel}` : String(surface)}
    </output>
  );
}

describe("the dialog-surface portal signal", () => {
  it("is null outside a dialog", () => {
    render(<SurfaceProbe />);
    expect(screen.getByTestId("surface")).toHaveTextContent("null");
  });

  it("is the content node inside DialogContent", () => {
    render(
      <Dialog open>
        <DialogContent showClose={false}>
          <DialogTitle>Settings</DialogTitle>
          <SurfaceProbe />
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByTestId("surface")).toHaveTextContent("element:");
  });
});
