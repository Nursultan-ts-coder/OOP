import { Card, CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Grid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
  gap: theme.spacing(1.5),
}));

export const RestaurantCardRoot = styled(Card)({
  minWidth: 0,
});

export const RestaurantCardAction = styled(CardActionArea)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: theme.spacing(1),
  padding: theme.spacing(1.5, 2),
  '&.Mui-focusVisible': { outline: `2px solid ${theme.palette.brand.loginCta}` },
})) as typeof CardActionArea;

export const CardTop = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
}));

export const CardTitle = styled('span')(({ theme }) => ({
  fontSize: theme.typography.pxToRem(15),
  fontWeight: theme.typography.fontWeightSemiBold,
  color: theme.palette.text.primary,
}));

export const CardLocation = styled('span')(({ theme }) => ({
  fontSize: theme.typography.pxToRem(12),
  color: theme.palette.text.secondary,
}));

export const CardFooter = styled('span')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: theme.typography.pxToRem(11),
  color: theme.palette.text.secondary,
}));
