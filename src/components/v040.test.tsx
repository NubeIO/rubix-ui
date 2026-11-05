import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Inbox } from "lucide-react";

import { Alert } from "./alert";
import { Combobox } from "./combobox";
import { DatePicker } from "./date-picker";
import { EmptyState } from "./empty-state";
import { Pager } from "./pager";
import { TimeField } from "./time-field";

const SITES = [
  { value: "adl", label: "Adelaide Depot" },
  { value: "bne", label: "Brisbane Southbank" },
];

function Chip() {
  const [v, setV] = useState("");
  return <Combobox chip="Site" aria-label="site" value={v} onChange={setV} options={SITES} />;
}

describe("Combobox as a filter chip", () => {
  it("reads ⊕ Site, then Site · the pick, and clears back", async () => {
    render(<Chip />);
    const trigger = screen.getByRole("combobox", { name: "site" });
    expect(trigger).toHaveTextContent("Site");
    expect(screen.queryByLabelText("clear site")).toBeNull();
    await userEvent.click(trigger);
    await userEvent.click(await screen.findByRole("option", { name: "Adelaide Depot" }));
    expect(trigger).toHaveTextContent("Site· Adelaide Depot");
    await userEvent.click(screen.getByLabelText("clear site"));
    expect(trigger).not.toHaveTextContent("Adelaide");
  });
});

describe("Combobox chip with a short value", () => {
  it("draws the part after the dot with renderValue", async () => {
    render(
      <Combobox
        chip="State"
        aria-label="state"
        value="yes"
        onChange={() => {}}
        options={[{ value: "yes", label: "Answered the last sync" }]}
        renderValue={() => "Answered"}
      />,
    );
    expect(screen.getByRole("combobox", { name: "state" })).toHaveTextContent("State· Answered");
  });
});

describe("Combobox without a search box", () => {
  it("opens as a plain list the arrow keys and Enter drive", async () => {
    const onChange = vi.fn();
    render(
      <Combobox
        aria-label="size"
        searchable={false}
        value=""
        onChange={onChange}
        options={SITES}
      />,
    );
    await userEvent.click(screen.getByRole("combobox", { name: "size" }));
    expect(screen.queryByLabelText("size search")).toBeNull();
    expect(screen.getByRole("listbox")).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}{Enter}");
    expect(onChange).toHaveBeenCalledWith("bne");
  });
});

describe("Alert tones", () => {
  it("takes info, success and warning", () => {
    render(
      <>
        <Alert variant="info">i</Alert>
        <Alert variant="success">s</Alert>
        <Alert variant="warning">w</Alert>
      </>,
    );
    const [i, s, w] = screen.getAllByRole("alert");
    expect(i.className).toContain("bg-info/10");
    expect(s.className).toContain("bg-success/10");
    expect(w.className).toContain("bg-warning/10");
  });
});

describe("EmptyState", () => {
  it("shows what is missing, the hint and the one action", () => {
    render(
      <EmptyState
        icon={Inbox}
        title="No groups yet"
        description="Make one."
        action={<button>New group</button>}
      />,
    );
    expect(screen.getByText("No groups yet")).toBeInTheDocument();
    expect(screen.getByText("Make one.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "New group" })).toBeInTheDocument();
  });
});

describe("Pager", () => {
  it("says which rows are shown and steps the pages", async () => {
    const onPage = vi.fn();
    render(<Pager page={1} size={25} total={60} onPage={onPage} onSize={() => {}} />);
    expect(screen.getByRole("navigation", { name: "Pages" })).toHaveTextContent("26–50 of 60");
    expect(screen.getByText("Page 2 of 3")).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText("Next page"));
    expect(onPage).toHaveBeenCalledWith(2);
  });

  it("changes the page size from its list", async () => {
    const onSize = vi.fn();
    render(<Pager page={0} size={25} total={60} onPage={() => {}} onSize={onSize} />);
    await userEvent.click(screen.getByRole("combobox", { name: "Rows per page" }));
    await userEvent.click(await screen.findByRole("option", { name: "50" }));
    expect(onSize).toHaveBeenCalledWith(50);
  });

  it("is hidden for an empty table", () => {
    const { container } = render(
      <Pager page={0} size={25} total={0} onPage={() => {}} onSize={() => {}} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});

function Time() {
  const [t, setT] = useState("1305");
  return <TimeField aria-label="start" value={t} onChange={setT} />;
}

describe("TimeField", () => {
  it("settles a typed time on blur and nudges with the arrows", async () => {
    render(<Time />);
    const f = screen.getByLabelText("start");
    f.focus();
    await userEvent.tab();
    expect(f).toHaveValue("13:05");
    f.focus();
    await userEvent.keyboard("{ArrowUp}");
    expect(f).toHaveValue("13:06");
    await userEvent.keyboard("{Shift>}{ArrowDown}{/Shift}");
    expect(f).toHaveValue("12:51");
  });
});

function Day({ min }: { min?: string }) {
  const [d, setD] = useState("2026-11-10");
  return <DatePicker aria-label="from" value={d} onChange={setD} min={min} />;
}

describe("DatePicker", () => {
  it("shows the day, opens on it, and picks another with the keyboard", async () => {
    render(<Day />);
    const trigger = screen.getByRole("button", { name: "from: 10 Nov 2026" });
    await userEvent.click(trigger);
    expect(screen.getByRole("gridcell", { name: "10 Nov 2026" })).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}{Enter}");
    expect(screen.getByRole("button", { name: "from: 11 Nov 2026" })).toBeInTheDocument();
  });

  it("lays the month out as rows a screen reader can walk", async () => {
    render(<Day />);
    await userEvent.click(screen.getByRole("button", { name: /^from/ }));
    const grid = screen.getByRole("grid", { name: "November 2026" });
    const rows = within(grid).getAllByRole("row");
    expect(rows).toHaveLength(7); // the weekday header, then six weeks
    expect(within(rows[0]).getAllByRole("columnheader")).toHaveLength(7);
    for (const r of rows.slice(1)) expect(within(r).getAllByRole("gridcell")).toHaveLength(7);
  });

  it("will not pick a day before min", async () => {
    render(<Day min="2026-11-10" />);
    await userEvent.click(screen.getByRole("button", { name: /^from/ }));
    await userEvent.click(screen.getByRole("gridcell", { name: "9 Nov 2026" }));
    expect(screen.getByRole("button", { name: "from: 10 Nov 2026" })).toBeInTheDocument();
  });
});
