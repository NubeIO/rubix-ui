// Where popups render. Radix puts popover, menu, tooltip, dialog and sheet content at the end of
// `document.body`, so it escapes any clipped ancestor. That is right in the rubix-ai app, and wrong in an
// extension: the extension's stylesheet (`scoped.css`) applies only under `[data-ext-root]`, and the body
// is outside it, so a popup there renders unstyled, as a transparent full-width overlay, with no error.
//
// An extension therefore wraps its page in `<RubixUiProvider portalContainer={usePortalContainer()}>`
// (`usePortalContainer` is `@nube/ext-ui-sdk`'s: the extension's own root). Every portal in this package
// renders there. The root sets no `overflow` and nothing above it traps `position: fixed`, so a dialog's
// overlay still covers the whole window, host sidebar and top bar included.
//
// Without a provider (the app) the container is `undefined`, which Radix reads as "the body".
//
// One responsibility: carry the popup container down to the portals.

import * as React from "react";

const OverlayContainerContext = React.createContext<HTMLElement | null>(null);

interface RubixUiProviderProps {
  /** The element popups render into. `null`/omitted ⇒ `document.body` (Radix's default). */
  portalContainer?: HTMLElement | null;
  children: React.ReactNode;
}

function RubixUiProvider({ portalContainer = null, children }: RubixUiProviderProps) {
  return (
    <OverlayContainerContext.Provider value={portalContainer}>
      {children}
    </OverlayContainerContext.Provider>
  );
}

/** The container for a Radix `Portal`'s `container` prop: the provider's element, else `undefined`. */
function useOverlayContainer(): HTMLElement | undefined {
  return React.useContext(OverlayContainerContext) ?? undefined;
}

export { RubixUiProvider, useOverlayContainer };
