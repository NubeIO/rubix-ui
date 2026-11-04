import { useState } from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs";
import type { CollapseProps, RevealProps } from "./motion";
import { RubixUiProvider } from "./provider";

function TabsDemo() {
  const [tab, setTab] = useState("a");
  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList aria-label="sections">
        <TabsTrigger value="a">A</TabsTrigger>
        <TabsTrigger value="b">B</TabsTrigger>
      </TabsList>
      <TabsContent value="a">Panel A</TabsContent>
      <TabsContent value="b">Panel B</TabsContent>
    </Tabs>
  );
}

function accordion() {
  return (
    <Accordion>
      <AccordionItem value="x">
        <AccordionTrigger>Item</AccordionTrigger>
        <AccordionContent>Body</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// The app hands in its own animation primitives; these stand-ins mark where each one was used.
function MarkedReveal({ children, className }: RevealProps) {
  return (
    <div data-testid="app-reveal" className={className}>
      {children}
    </div>
  );
}
function MarkedCollapse({ open, children }: CollapseProps) {
  return open ? <div data-testid="app-collapse">{children}</div> : null;
}

describe("Tabs and Accordion animate with the app's primitives, or not at all", () => {
  it("tabs swap panels with no provider", async () => {
    render(<TabsDemo />);
    expect(screen.getByText("Panel A")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("tab", { name: "B" }));
    expect(screen.getByText("Panel B")).toBeInTheDocument();
    expect(screen.queryByText("Panel A")).toBeNull();
  });

  it("tabs wrap the panel in the app's Reveal when given one", () => {
    render(
      <RubixUiProvider motion={{ Reveal: MarkedReveal }}>
        <TabsDemo />
      </RubixUiProvider>,
    );
    expect(screen.getByTestId("app-reveal")).toHaveTextContent("Panel A");
  });

  it("an accordion item opens and closes with no provider", async () => {
    render(accordion());
    expect(screen.queryByText("Body")).toBeNull();
    await userEvent.click(screen.getByText("Item"));
    expect(screen.getByText("Body")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Item"));
    expect(screen.queryByText("Body")).toBeNull();
  });

  it("an accordion item uses the app's Collapse when given one", async () => {
    render(<RubixUiProvider motion={{ Collapse: MarkedCollapse }}>{accordion()}</RubixUiProvider>);
    await userEvent.click(screen.getByText("Item"));
    expect(screen.getByTestId("app-collapse")).toHaveTextContent("Body");
  });
});
