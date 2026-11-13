import { Box, styled, Tab, Tabs } from '@mui/material';

import type { TabsProps } from '.';

export const PanelContent = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
}));

export const StyledTabs = styled(Tabs, {
  shouldForwardProp: (prop) => prop !== 'hasBorder',
})<TabsProps>(({ hasBorder = false, theme }) => ({
  minHeight: 'unset',
  height: 48,
  borderRadius: theme.shape.pill,
  background: 'transparent',
  backdropFilter: 'blur(12px)',
  ...(hasBorder && {
    boxShadow: theme.customShadows.glassInset,
  }),

  '& .MuiTabs-scroller': {
    padding: theme.spacing(0, 0.625),
  },
  '& .MuiTabs-scrollButtons.Mui-disabled': {
    opacity: 0.3,
  },
  '& .MuiTabs-indicator': {
    height: 40,
    margin: theme.spacing(0.5, 0),
    borderRadius: theme.shape.pill,
    background: theme.palette.control.background,
    boxShadow: theme.customShadows.raisedPill,
    backdropFilter: 'blur(8px)',
    ...(theme.palette.mode === 'light' && {
      border: `2px solid ${theme.palette.primary.main}`,
    }),
  },
  '& .MuiTabs-flexContainer': {
    height: '100%',
    position: 'relative',
    zIndex: 1, // Local: the tab labels sit above the sliding indicator
  },
  '&.MuiTabs-root': {
    maxWidth: 'fit-content',
    minWidth: 0, // Lets a scrollable tab set shrink inside a flex row instead of overflowing it
  },
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  minWidth: 0,
  minHeight: 48,
  borderRadius: theme.shape.pill,
  textTransform: 'none',
  ...theme.typography.controlLabel,
  letterSpacing: '0.01em',
  color: theme.palette.text.muted,
  position: 'relative',
  zIndex: 1, // Local: above the sliding indicator
  transition: theme.transitions.create('color'),
  '&:hover': { color: theme.palette.text.subtle },
  '&.Mui-selected': {
    color: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.text.primary,
  },
  '&.MuiTab-root': {
    maxWidth: 'fit-content',
  },
}));
