import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Combobox } from "../components/combobox";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../components/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../components/popover";
import { NodeScheduleEditor } from "../components/node-schedule-editor";
import { Sheet, SheetContent, SheetTitle } from "../components/sheet";
import { RubixUiProvider } from "./provider";
import { readNodeSchedule } from "./schedule/readNodeSchedule";
import { buildingHours } from "./schedule/scheduleRecord.fixtures";

// An extension's stylesheet applies only under its root, so every popup must land INSIDE the element
// the provider names. Without a provider (the app) it lands in the body, as Radix does by default.
function inExtension(ui: React.ReactNode) {
  const root = document.createElement("div");
  root.setAttribute("data-ext-root", "test");
  document.body.appendChild(root);
  render(<RubixUiProvider portalContainer={root}>{ui}</RubixUiProvider>, { container: root });
  return root;
}

describe("popups follow the provider's container", () => {
  it("popover", async () => {
    const root = inExtension(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Panel</PopoverContent>
      </Popover>,
    );
    await userEvent.click(screen.getByText("Open"));
    expect(root.contains(await screen.findByText("Panel"))).toBe(true);
  });

  it("dropdown menu", async () => {
    const root = inExtension(
      <DropdownMenu>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Rename</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await userEvent.click(screen.getByText("Menu"));
    expect(root.contains(await screen.findByText("Rename"))).toBe(true);
  });

  it("dialog", async () => {
    const root = inExtension(
      <Dialog>
        <DialogTrigger>Ask</DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          <DialogTitle>Sure?</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    await userEvent.click(screen.getByText("Ask"));
    expect(root.contains(await screen.findByText("Sure?"))).toBe(true);
  });

  it("sheet", async () => {
    const root = inExtension(
      <Sheet open>
        <SheetContent aria-describedby={undefined}>
          <SheetTitle>Drawer</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    expect(root.contains(await screen.findByText("Drawer"))).toBe(true);
  });

  it("combobox outside a dialog", async () => {
    const root = inExtension(
      <Combobox
        aria-label="type"
        value=""
        onChange={() => {}}
        options={[{ value: "holiday", label: "Holiday" }]}
      />,
    );
    await userEvent.click(screen.getByLabelText("type"));
    expect(root.contains(await screen.findByText("Holiday"))).toBe(true);
  });

  it("node schedule editor's sheets", async () => {
    const root = inExtension(
      <NodeScheduleEditor schedule={readNodeSchedule(buildingHours())} onSave={async () => ({ rev: 2 })} />,
    );
    await userEvent.click(screen.getByRole("button", { name: /Names 3\/6/ }));
    expect(root.contains(await screen.findByLabelText("Occupied value"))).toBe(true);
  });

  it("lands in the body without a provider", async () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Panel</PopoverContent>
      </Popover>,
    );
    await userEvent.click(screen.getByText("Open"));
    expect((await screen.findByText("Panel")).closest("[data-ext-root]")).toBeNull();
  });
});
