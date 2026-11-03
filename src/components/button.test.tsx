import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Button } from "./button";

describe("Button", () => {
  it("stamps its size for the icon rule, default when none is given", () => {
    render(
      <>
        <Button>Save</Button>
        <Button size="sm">Add</Button>
      </>,
    );
    expect(screen.getByRole("button", { name: "Save" }).getAttribute("data-btn")).toBe("default");
    expect(screen.getByRole("button", { name: "Add" }).getAttribute("data-btn")).toBe("sm");
  });

  it("lets a caller's class win over the variant's", () => {
    render(<Button className="h-10">Wide</Button>);
    const cls = screen.getByRole("button", { name: "Wide" }).className;
    expect(cls).toContain("h-10");
    expect(cls).not.toContain("h-9");
  });

  it("renders its child as the control with asChild", () => {
    render(
      <Button asChild>
        <a href="#/x">Open</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Open" });
    expect(link.getAttribute("data-btn")).toBe("default");
    expect(screen.queryByRole("button")).toBeNull();
  });
});
