import { List, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CheckGrid = styled(List, {
  shouldForwardProp: (prop) => prop !== 'columns',
})<{ columns: number }>(({ theme, columns }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  columnGap: theme.spacing(3),
  padding: 0,
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
}));

export const CheckRow = styled(ListItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
  padding: theme.spacing(1, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontSize: theme.typography.pxToRem(13),
}));

export const CheckResult = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  fontSize: theme.typography.pxToRem(13.5),
  fontWeight: theme.typography.fontWeightSemiBold,
}));
