import type { TypographyProps } from '@mui/material';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const InfoContent = styled('div')(({ theme }) => ({
  padding: theme.spacing(1.25),
}));

export const InfoHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2.5),
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const InfoTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  ...theme.typography.cardTitle,
  fontWeight: theme.typography.fontWeightBold,
  marginBottom: theme.spacing(0.625),
  padding: theme.spacing(1.25, 0),
}));

// A native button: it keeps the heading's own text metrics and the browser focus ring. MUI's
// Link/ButtonBase would add `vertical-align: middle`, `outline: 0` and a translucent underline.
// eslint-disable-next-line no-restricted-syntax -- native button, see above
export const LinkButton = styled('button')({
  textDecoration: 'underline',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: 0,
  font: 'inherit',
  color: 'inherit',
  textAlign: 'inherit',
});
