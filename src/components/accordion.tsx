// The `accordion` primitive — a token-bound single-collapsible disclosure. Hand-authored (no
// `@radix-ui/react-accordion` dep; a `<button aria-expanded>` + region gives the a11y contract). Scoped
// to the one shape the Customizer needs: `type="single" collapsible` with one open item at a time.
// One primitive per file (FILE-LAYOUT), the sub-parts kept together as they are a single widget.

import * as React from "react";

import { ChevronDown } from "lucide-react";

import { cn } from "../lib/cn";
import { useCollapse } from "../lib/motion";

interface AccordionContextValue {
  openValue: string | null;
  toggle: (value: string) => void;
}
const AccordionContext = React.createContext<AccordionContextValue | null>(null);

interface AccordionProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** Only `single` (one open item) is implemented — the Customizer's shape. */
  type?: "single";
  collapsible?: boolean;
  defaultValue?: string;
}

function Accordion({ className, defaultValue, children, ...props }: AccordionProps) {
  const [openValue, setOpenValue] = React.useState<string | null>(defaultValue ?? null);
  const toggle = React.useCallback((value: string) => {
    setOpenValue((cur) => (cur === value ? null : value));
  }, []);
  return (
    <AccordionContext.Provider value={{ openValue, toggle }}>
      <div data-slot="accordion" className={className} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

const ItemContext = React.createContext<string>("");

function AccordionItem({
  value,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { value: string }) {
  return (
    <ItemContext.Provider value={value}>
      <div data-slot="accordion-item" className={className} {...props}>
        {children}
      </div>
    </ItemContext.Provider>
  );
}

function useAccordion() {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("Accordion parts must be used within <Accordion>.");
  return ctx;
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<"button">) {
  const { openValue, toggle } = useAccordion();
  const value = React.useContext(ItemContext);
  const open = openValue === value;
  return (
    <button
      type="button"
      data-slot="accordion-trigger"
      aria-expanded={open}
      onClick={() => toggle(value)}
      className={cn(
        "flex w-full items-center justify-between gap-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown
        aria-hidden
        className={cn("h-4 w-4 shrink-0 text-muted transition-transform", open && "rotate-180")}
      />
    </button>
  );
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<"div">) {
  const { openValue } = useAccordion();
  const value = React.useContext(ItemContext);
  const open = openValue === value;
  const Collapse = useCollapse();
  // The disclosure eases its HEIGHT open/closed through the app's `Collapse` (`RubixUiProvider motion`; none = instant show/hide). The
  // region node stays for the a11y contract; `Collapse` owns presence + the height animation.
  return (
    <Collapse open={open}>
      <div data-slot="accordion-content" role="region" className={className} {...props}>
        {children}
      </div>
    </Collapse>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
