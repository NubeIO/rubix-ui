// The package's one provider: where popups render (overlay.tsx) and how Tabs and Accordion animate
// (motion.tsx). Both are optional.
//
//   • an extension: `<RubixUiProvider portalContainer={usePortalContainer()}>` (popups inside its root);
//   • the rubix-ai app: `<RubixUiProvider motion={{ Reveal, Collapse }}>` (its motion primitives).
//
// One responsibility: compose the package's contexts behind one component.

import * as React from "react";

import { MotionProvider, type RubixUiMotion } from "./motion";
import { OverlayProvider } from "./overlay";

const NO_MOTION: RubixUiMotion = {};

interface RubixUiProviderProps {
  /** The element popups render into. `null`/omitted ⇒ `document.body` (Radix's default). */
  portalContainer?: HTMLElement | null;
  /** Animation primitives for Tabs and Accordion. Omitted ⇒ no animation. */
  motion?: RubixUiMotion;
  children: React.ReactNode;
}

function RubixUiProvider({
  portalContainer = null,
  motion = NO_MOTION,
  children,
}: RubixUiProviderProps) {
  return (
    <OverlayProvider container={portalContainer}>
      <MotionProvider motion={motion}>{children}</MotionProvider>
    </OverlayProvider>
  );
}

export { RubixUiProvider };
