import { createContext, useContext } from 'react';

/**
 * Where the page header goes: the standalone app's top bar provides an element, beside the app's
 * name; inside grafana there is none, so the header stays at the top of the page.
 */
export const PortalHeaderSlotContext = createContext<HTMLElement | null>(null);

export const usePortalHeaderSlot = () => useContext(PortalHeaderSlotContext);
