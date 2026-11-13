import { Breadcrumbs, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CrumbsRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.25),
  minWidth: 0,
}));

/** The Next app's brand mark before the breadcrumbs: a short yellow bar. */
export const BrandBar = styled('span')(({ theme }) => ({
  flex: 'none',
  width: theme.spacing(0.5),
  height: theme.spacing(2.5),
  borderRadius: theme.spacing(0.25),
  backgroundColor: theme.palette.brand.loginCta,
}));

export const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  minWidth: 0,
  ...theme.typography.h6,
  fontWeight: theme.typography.fontWeightSemiBold,
  lineHeight: 1.3,
  color: theme.palette.text.secondary,
  '& .MuiBreadcrumbs-ol': { flexWrap: 'nowrap' },
  '& .MuiBreadcrumbs-li': { minWidth: 0 },
}));

export const CrumbLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  whiteSpace: 'nowrap',
  '&:hover, &:focus-visible': { color: theme.palette.text.primary },
})) as typeof Link;

export const CrumbHere = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  minWidth: 0,
  color: theme.palette.text.primary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));
