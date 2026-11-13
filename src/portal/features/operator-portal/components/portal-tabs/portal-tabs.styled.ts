import { alpha, styled } from '@mui/material/styles';

import { Tab, Tabs } from '@/shared/components/tabs';

/**
 * grafana's pill tabs with the Next app's hook (PillTabs.js): the chosen tab's pill is tinted the
 * brand yellow with a yellow edge, and its label is yellow in the dark scheme, so it stands out.
 */
export const BrandTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    background: alpha(theme.palette.brand.loginCta, theme.palette.mode === 'light' ? 0.4 : 0.18),
    boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.brand.loginCta, 0.6)}`,
    border: 0,
  },
}));

export const BrandTab = styled(Tab)(({ theme }) => ({
  '&.Mui-selected': {
    color:
      theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.brand.loginCta,
  },
  '&.Mui-disabled': {
    color: theme.palette.text.disabled,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.brand.loginCta}`,
    outlineOffset: -2,
  },
  '& .MuiTab-icon': { margin: 0 },
  gap: theme.spacing(0.75),
}));
