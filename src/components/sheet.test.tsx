// The sheet-surface signal the shared `Combobox` reads to decide where to portal its panel. A Sheet is
// a Radix DIALOG under the hood, so it has the same popover-in-modal problem (radix #2121): a
// body-portalled popover is "outside" the sheet's focus scope and is trapped/dismissed before it can be
// used. `sheet.tsx` therefore provides the same `DialogSurfaceContext` `dialog.tsx` provides, and the
// combobox portals INTO the SheetContent node instead of the body.
//
// A unit test can pin the wiring — the signal is null outside and the content node inside
// `SheetContent`. Revert the provider and a combobox inside a sheet silently loses its portal target
// (the "Add transformation" picker was exactly that).

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { useDialogSurface } from "./dialog";
import { Sheet, SheetContent, SheetTitle } from "./sheet";

function SurfaceProbe() {
  const surface = useDialogSurface();
  return (
    <output data-testid="surface">
      {surface instanceof HTMLElement ? `element:${surface.dataset.panel}` : String(surface)}
    </output>
  );
}

describe("the sheet-surface portal signal", () => {
  it("is null outside a sheet", () => {
    render(<SurfaceProbe />);
    expect(screen.getByTestId("surface")).toHaveTextContent("null");
  });

  it("is the content node inside SheetContent", () => {
    render(
      <Sheet open>
        <SheetContent>
          <SheetTitle>Transform</SheetTitle>
          <SurfaceProbe />
        </SheetContent>
      </Sheet>,
    );
    expect(screen.getByTestId("surface")).toHaveTextContent("element:");
  });
});
