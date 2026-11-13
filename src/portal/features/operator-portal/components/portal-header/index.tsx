import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import type { PortalBreadcrumbsProps } from '../portal-breadcrumbs';
import PortalBreadcrumbs from '../portal-breadcrumbs';
import { usePortalHeaderSlot } from './header-slot';
import { HeaderActions, HeaderRoot } from './portal-header.styled';

export interface PortalHeaderProps extends PortalBreadcrumbsProps {
  /** The page's own controls (filters, the restaurant switcher). */
  actions?: ReactNode;
}

/**
 * The top of every portal page, in one row: the breadcrumbs, then the page filters. In the
 * standalone app it renders in the top bar, beside the app's name, to save the page's space.
 */
const PortalHeader = ({ crumbs, badge, actions }: PortalHeaderProps) => {
  const slot = usePortalHeaderSlot();
  const header = (
    <HeaderRoot isInTopBar={Boolean(slot)}>
      <PortalBreadcrumbs crumbs={crumbs} badge={badge} />
      {actions && (
        <HeaderActions role="group" aria-label="Page filters">
          {actions}
        </HeaderActions>
      )}
    </HeaderRoot>
  );
  return slot ? createPortal(header, slot) : header;
};

export default PortalHeader;
