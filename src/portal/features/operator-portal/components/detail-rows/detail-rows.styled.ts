import { styled } from '@mui/material/styles';

export const DetailList = styled('dl')({
  margin: 0,
});

export const DetailRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: theme.spacing(1.5),
  padding: theme.spacing(1, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-of-type': { borderBottom: 0 },
}));

export const DetailLabel = styled('dt')(({ theme }) => ({
  flex: 'none',
  fontSize: theme.typography.pxToRem(12),
  color: theme.palette.text.secondary,
}));

export const DetailValue = styled('dd')(({ theme }) => ({
  margin: 0,
  fontSize: theme.typography.pxToRem(13),
  fontWeight: theme.typography.fontWeightSemiBold,
  textAlign: 'right',
}));
