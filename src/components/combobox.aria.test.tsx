import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Combobox } from "./combobox";

const OPTS = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Bravo" },
  { value: "c", label: "Charlie" },
];

// A screen reader hears the option the arrow keys reach because the focused element (the search box,
// or the list without one) names it through aria-activedescendant.
describe("Combobox announces the highlighted option", () => {
  it("from the search box", async () => {
    render(<Combobox aria-label="pick" value="" onChange={() => {}} options={OPTS} />);
    const trigger = screen.getByRole("combobox", { name: "pick" });
    expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
    expect(trigger).not.toHaveAttribute("aria-controls");
    await userEvent.click(trigger);
    const list = screen.getByRole("listbox");
    expect(trigger).toHaveAttribute("aria-controls", list.id);
    const search = screen.getByLabelText("pick search");
    expect(search).toHaveFocus();
    expect(search).toHaveAttribute("aria-controls", list.id);
    const first = screen.getByRole("option", { name: "Alpha" });
    expect(search).toHaveAttribute("aria-activedescendant", first.id);
    await userEvent.keyboard("{ArrowDown}");
    expect(search).toHaveAttribute(
      "aria-activedescendant",
      screen.getByRole("option", { name: "Bravo" }).id,
    );
  });

  it("from the list itself without a search box", async () => {
    render(
      <Combobox aria-label="pick" searchable={false} value="" onChange={() => {}} options={OPTS} />,
    );
    await userEvent.click(screen.getByRole("combobox", { name: "pick" }));
    const list = screen.getByRole("listbox");
    expect(list).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}{ArrowDown}");
    expect(list).toHaveAttribute(
      "aria-activedescendant",
      screen.getByRole("option", { name: "Charlie" }).id,
    );
  });

  it("keeps options out of the tab order", async () => {
    render(<Combobox aria-label="pick" value="" onChange={() => {}} options={OPTS} />);
    await userEvent.click(screen.getByRole("combobox", { name: "pick" }));
    for (const o of screen.getAllByRole("option")) expect(o).toHaveAttribute("tabindex", "-1");
  });
});
