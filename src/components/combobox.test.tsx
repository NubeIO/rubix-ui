// The searchable-Select primitive's behavior contract (editor-parity scope, step 1): open →
// type-to-filter → pick; groups render; `allowCustom` commits free-typed text (the field-picker
// degrade path); Escape closes without committing.

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

import { Combobox, type ComboboxOption } from "./combobox";

const OPTIONS: ComboboxOption[] = [
  {
    value: "celsius",
    label: "°C",
    group: "Temperature",
    description: "degrees Celsius",
  },
  { value: "fahrenheit", label: "°F", group: "Temperature" },
  { value: "bytes", label: "B", group: "Data" },
];

function Harness({
  allowCustom = false,
  clearable = false,
  initial = "",
}: {
  allowCustom?: boolean;
  clearable?: boolean;
  initial?: string;
}) {
  const [value, setValue] = useState(initial);
  return (
    <>
      <Combobox
        aria-label="unit"
        options={OPTIONS}
        value={value}
        onChange={setValue}
        allowCustom={allowCustom}
        clearable={clearable}
      />
      <output aria-label="picked">{value}</output>
    </>
  );
}

describe("Combobox", () => {
  it("opens, filters by typed text, and commits the clicked option", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole("combobox", { name: "unit" }));
    await user.type(screen.getByLabelText("unit search"), "fahr");
    expect(screen.queryByText("°C")).not.toBeInTheDocument();
    await user.click(screen.getByText("°F"));
    expect(screen.getByLabelText("picked").textContent).toBe("fahrenheit");
    // the list closed after the pick
    expect(screen.queryByLabelText("unit search")).not.toBeInTheDocument();
  });

  it("matches on description text and renders group headers", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole("combobox", { name: "unit" }));
    expect(screen.getByText("Temperature")).toBeInTheDocument();
    expect(screen.getByText("Data")).toBeInTheDocument();
    await user.type(screen.getByLabelText("unit search"), "degrees");
    expect(screen.getByText("°C")).toBeInTheDocument();
    expect(screen.queryByText("B")).not.toBeInTheDocument();
  });

  it("allowCustom commits free-typed text via Enter (the no-frames degrade path)", async () => {
    const user = userEvent.setup();
    render(<Harness allowCustom />);
    await user.click(screen.getByRole("combobox", { name: "unit" }));
    await user.type(screen.getByLabelText("unit search"), "my_field{Enter}");
    expect(screen.getByLabelText("picked").textContent).toBe("my_field");
  });

  it("without allowCustom, unmatched text commits nothing and shows no matches", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole("combobox", { name: "unit" }));
    await user.type(screen.getByLabelText("unit search"), "zzz");
    expect(screen.getByText("no matches")).toBeInTheDocument();
    await user.keyboard("{Enter}");
    expect(screen.getByLabelText("picked").textContent).toBe("");
  });

  it("clearable shows a clear (×) only when a value is set, and clearing commits the empty value", async () => {
    const user = userEvent.setup();
    // No value → no clear affordance (nothing to clear).
    const empty = render(<Harness clearable />);
    expect(empty.queryByLabelText("clear unit")).not.toBeInTheDocument();
    empty.unmount();
    // A set value → the clear appears; clicking it resets to "" (— none —) without opening the list.
    render(<Harness clearable initial="celsius" />);
    expect(screen.getByRole("combobox", { name: "unit" })).toHaveTextContent("°C");
    await user.click(screen.getByLabelText("clear unit"));
    expect(screen.getByLabelText("picked").textContent).toBe("");
    expect(screen.queryByLabelText("unit search")).not.toBeInTheDocument();
  });

  // The clipping regression: the list used to render as an in-flow `absolute z-50` sibling, so any
  // ancestor pairing `overflow-hidden` with `rounded-md` (every option-row group in the panel-builder
  // surfaces) clipped it. jsdom has no layout, so the PIXEL proof lives in the browser; what a unit
  // test CAN pin is the structural invariant that makes clipping impossible — the list must not be a
  // descendant of the clipping container. Revert to an in-flow div and this fails.
  it("portals the list out of a clipping ancestor", async () => {
    const user = userEvent.setup();
    render(
      <div data-testid="clipper" className="overflow-hidden rounded-md">
        <Harness />
      </div>,
    );
    await user.click(screen.getByRole("combobox", { name: "unit" }));

    const list = document.querySelector('[data-slot="combobox-list"]')!;
    expect(list).toBeTruthy();
    // The list escaped the overflow-hidden subtree entirely...
    expect(screen.getByTestId("clipper").contains(list)).toBe(false);
    // ...and lives under the body, where no ancestor can clip it.
    expect(document.body.contains(list)).toBe(true);
  });

  it("closes on an outside click even though the list is portalled", async () => {
    // Portalling broke the old rootRef containment check (the list is no longer a DOM descendant of
    // the root), so dismissal is Radix's job now. This pins that it still works.
    const user = userEvent.setup();
    render(
      <>
        <Harness />
        <button type="button">outside</button>
      </>,
    );
    await user.click(screen.getByRole("combobox", { name: "unit" }));
    expect(screen.getByLabelText("unit search")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "outside" }));
    expect(screen.queryByLabelText("unit search")).not.toBeInTheDocument();
  });

  it("focuses the search input on open and returns focus to the trigger on close", async () => {
    // Focus lands in the filter input on open and returns to the trigger on close. NB (verified by
    // mutation): removing `onOpenAutoFocus` does NOT fail this — Radix's default already focuses the
    // first focusable child in both jsdom and Chromium. This pins the observable contract, not that
    // handler; the handler is defence against the content being reordered later.
    const user = userEvent.setup();
    render(<Harness />);
    const trigger = screen.getByRole("combobox", { name: "unit" });
    await user.click(trigger);
    expect(document.activeElement).toBe(screen.getByLabelText("unit search"));
    // Typing goes straight into the filter without an extra click/Tab.
    await user.keyboard("fahr");
    expect(screen.getByLabelText("unit search")).toHaveValue("fahr");
    await user.keyboard("{Escape}");
    expect(trigger).toHaveFocus();
  });

  it("Escape closes without committing", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole("combobox", { name: "unit" }));
    await user.type(screen.getByLabelText("unit search"), "celsius");
    await user.keyboard("{Escape}");
    expect(screen.queryByLabelText("unit search")).not.toBeInTheDocument();
    expect(screen.getByLabelText("picked").textContent).toBe("");
  });

  // jsdom has no layout, so the PIXEL proof of the spacing is a browser check. What a unit test can
  // pin is the set of classes the sheet's numbers were turned into, per height.
  it("spaces the chevron and the clear button to the sheet at both heights", () => {
    const at = (size: "sm" | "md") => {
      const view = render(
        <Combobox
          aria-label="unit"
          options={OPTIONS}
          value="celsius"
          onChange={() => {}}
          clearable
          size={size}
        />,
      );
      const trigger = view.getByRole("combobox", { name: "unit" });
      const clear = view.getByLabelText("clear unit");
      const label = trigger.querySelector("span");
      const classes = {
        trigger: trigger.className,
        clear: clear.className,
        label: label?.className ?? "",
      };
      view.unmount();
      return classes;
    };
    const sm = at("sm");
    expect(sm.trigger).toContain("pr-[9px]");
    expect(sm.trigger).toContain("pl-2.5");
    expect(sm.clear).toContain("right-[23px]");
    expect(sm.clear).toContain("h-5 w-5");
    expect(sm.label).toContain("pr-[25px]");
    const md = at("md");
    expect(md.trigger).toContain("pl-2.5");
    expect(md.clear).toContain("right-[21px]");
    expect(md.clear).toContain("h-6 w-6");
    expect(md.label).toContain("pr-[27px]");
    expect(md.clear).toContain("text-faint");
    expect(md.clear).toContain("rounded-[4px]");
  });

  it("lets a caller draw the value, and falls back to the default text", () => {
    const view = render(
      <Combobox
        aria-label="unit"
        options={OPTIONS}
        value="$unit"
        onChange={() => {}}
        allowCustom
        renderValue={(value, option) =>
          value.startsWith("$") ? <em>var {value}</em> : option ? undefined : null
        }
      />,
    );
    expect(view.getByRole("combobox", { name: "unit" }).querySelector("em")).toHaveTextContent(
      "var $unit",
    );
    view.rerender(
      <Combobox
        aria-label="unit"
        options={OPTIONS}
        value="celsius"
        onChange={() => {}}
        renderValue={() => undefined}
      />,
    );
    expect(view.getByRole("combobox", { name: "unit" })).toHaveTextContent("°C");
    // Never called for an empty value: the placeholder is not a value.
    view.rerender(
      <Combobox
        aria-label="unit"
        options={OPTIONS}
        value=""
        onChange={() => {}}
        placeholder="Pick one"
        renderValue={() => <em>x</em>}
      />,
    );
    expect(view.getByRole("combobox", { name: "unit" })).toHaveTextContent("Pick one");
  });
});
