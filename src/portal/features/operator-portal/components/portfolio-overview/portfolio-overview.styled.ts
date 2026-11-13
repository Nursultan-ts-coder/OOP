import { styled } from '@mui/material/styles';

export const Toolbar = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(1.5),
}));

/** The view tabs, at the toolbar's right end. */
export const ToolbarTabs = styled('div')({
  marginLeft: 'auto',
});
