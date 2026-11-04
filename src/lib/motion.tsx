// How Tabs and Accordion animate. The rubix-ai app animates a tab panel's entrance and an accordion
// item's open/close with its own motion library, gated by each member's motion preference. This package
// does not carry that library or that preference: the app hands its two primitives in through
// `RubixUiProvider motion={{ Reveal, Collapse }}`.
//
// Without them (an extension, a test) a panel simply appears and an item simply opens and closes: the
// same thing the app does when a member turns motion off.
//
// One responsibility: carry the animation primitives down to the components that use them.

import * as React from "react";

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
}

export interface CollapseProps {
  open: boolean;
  children: React.ReactNode;
  className?: string;
}

export interface RubixUiMotion {
  /** Wraps a tab panel each time it mounts (an entrance). */
  Reveal?: React.ComponentType<RevealProps>;
  /** Wraps an accordion item's body; shows it while `open`, hides it otherwise. */
  Collapse?: React.ComponentType<CollapseProps>;
}

function StaticReveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}

function StaticCollapse({ open, children, className }: CollapseProps) {
  return open ? <div className={className}>{children}</div> : null;
}

const MotionContext = React.createContext<RubixUiMotion>({});

function MotionProvider({
  motion,
  children,
}: {
  motion: RubixUiMotion;
  children: React.ReactNode;
}) {
  return <MotionContext.Provider value={motion}>{children}</MotionContext.Provider>;
}

function useReveal(): React.ComponentType<RevealProps> {
  return React.useContext(MotionContext).Reveal ?? StaticReveal;
}

function useCollapse(): React.ComponentType<CollapseProps> {
  return React.useContext(MotionContext).Collapse ?? StaticCollapse;
}

export { MotionProvider, useReveal, useCollapse };
