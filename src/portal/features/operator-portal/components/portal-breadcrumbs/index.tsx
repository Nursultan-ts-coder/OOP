import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  BrandBar,
  CrumbHere,
  CrumbLink,
  CrumbsRoot,
  StyledBreadcrumbs,
} from './portal-breadcrumbs.styled';

export interface Crumb {
  label: string;
  /** Where the crumb leads; the last crumb (the page you are on) has none. */
  path?: string;
}

export interface PortalBreadcrumbsProps {
  crumbs: Crumb[];
  /** Shown after the last crumb, e.g. the restaurant's status chip. */
  badge?: ReactNode;
}

/** The Next app's breadcrumbs: a yellow brand bar, then Portfolio › Store #4023 › Insights. */
const PortalBreadcrumbs = ({ crumbs, badge }: PortalBreadcrumbsProps) => (
  <CrumbsRoot>
    <BrandBar aria-hidden="true" />
    <StyledBreadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="Breadcrumbs">
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        if (!isLast && crumb.path) {
          return (
            <CrumbLink key={crumb.label} component={RouterLink} to={crumb.path} underline="hover">
              {crumb.label}
            </CrumbLink>
          );
        }
        return (
          <CrumbHere key={crumb.label} aria-current={isLast ? 'page' : undefined}>
            {crumb.label}
            {isLast && badge}
          </CrumbHere>
        );
      })}
    </StyledBreadcrumbs>
  </CrumbsRoot>
);

export default PortalBreadcrumbs;
