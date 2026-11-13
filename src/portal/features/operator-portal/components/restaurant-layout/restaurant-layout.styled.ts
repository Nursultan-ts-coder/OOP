import { styled } from '@mui/material/styles';

export const TabsRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(1.5),
  minWidth: 0,
}));

/** The Next app's "where" note beside the tabs. */
export const TabsNote = styled('span')(({ theme }) => ({
  marginLeft: 'auto',
  fontSize: theme.typography.pxToRem(12),
  color: theme.palette.text.secondary,
}));
