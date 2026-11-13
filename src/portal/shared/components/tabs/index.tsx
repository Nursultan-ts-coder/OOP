import type { TabProps as MuiTabProps, TabsProps as MuiTabsProps } from '@mui/material';
import React, { createContext, useContext } from 'react';

import { useIsCompactLayout } from '@/shared/hooks/use-compact-layout';

import { StyledTab, StyledTabs } from './tabs.styled';

export { TabPanel } from './tab-panel';

/**
 * Pairs a tab set with its `TabPanel`s. Without it the tabs control no panel (map legends, layer
 * switchers), so they get no `aria-controls` pointing at an element that doesn't exist; with it,
 * ids are unique per tab set even when several sit on one page.
 */
const TabsIdPrefixContext = createContext<string | undefined>(undefined);

export type TabsProps = MuiTabsProps & {
  hasBorder?: boolean;
  /** Same value as the `idPrefix` of this tab set's `TabPanel`s. Omit when there are no panels. */
  idPrefix?: string;
};

/**
 * On tablets and phones a standard tab set becomes scrollable, so tabs that don't fit can be
 * swiped or reached with the scroll arrows instead of overflowing the card. Desktop rendering and
 * an explicit `fullWidth` variant are left as they are.
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    { idPrefix, variant = 'standard', scrollButtons = 'auto', allowScrollButtonsMobile, ...props },
    ref
  ) => {
    const isCompactLayout = useIsCompactLayout();
    const isScrollable = variant === 'scrollable' || (isCompactLayout && variant !== 'fullWidth');

    return (
      <TabsIdPrefixContext.Provider value={idPrefix}>
        <StyledTabs
          ref={ref}
          {...props}
          variant={isScrollable ? 'scrollable' : variant}
          scrollButtons={scrollButtons}
          // Touch devices hide the arrows by default; keep them as a cue that more tabs exist.
          allowScrollButtonsMobile={allowScrollButtonsMobile ?? isScrollable}
        />
      </TabsIdPrefixContext.Provider>
    );
  }
);

export type TabProps = MuiTabProps;

export const Tab = React.forwardRef<HTMLDivElement, MuiTabProps>((props, ref) => {
  const idPrefix = useContext(TabsIdPrefixContext);
  const panelIds = idPrefix
    ? {
        id: `${idPrefix}-tab-${props.value}`,
        'aria-controls': `${idPrefix}-tabpanel-${props.value}`,
      }
    : {};

  return <StyledTab disableRipple {...panelIds} {...props} ref={ref} />;
});
