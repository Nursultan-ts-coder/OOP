import type { TypographyProps } from '@mui/material';
import { ButtonBase, Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

/** The `widget` card surface (see `MuiCard` in the theme) plus this card's padding and height. */
export const AppCardRoot = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'cardHeight' && prop !== 'hasCardPadding',
})<{
  cardHeight?: number;
  hasCardPadding: boolean;
}>(({ theme, cardHeight, hasCardPadding }) => ({
  padding: hasCardPadding ? theme.spacing(2) : 0,
  ...(cardHeight !== undefined && { height: cardHeight }),
}));

export const AppCardHeader = styled('div', {
  shouldForwardProp: (prop) => prop !== 'justify',
})<{ justify?: 'space-between' | 'flex-start' }>(({ theme, justify = 'space-between' }) => ({
  marginBottom: theme.spacing(1.25),
  display: 'flex',
  justifyContent: justify,
  alignItems: 'center',
}));

export const AppCardActions = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
}));

export const AppCardTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  ...theme.typography.cardTitle,
}));

// A real button around the title's info icon, so the tooltip opens on keyboard focus too; it
// keeps the bare icon's look (render it with `disableRipple`).
export const AppCardInfoButton = styled(ButtonBase)(({ theme }) => ({
  borderRadius: '50%', // A circle around the icon, whatever its size
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.info.main}`,
    outlineOffset: 2,
  },
}));

export const AppCardDescription = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.text.secondary, // text.disabled is 2.6:1 on cards, below WCAG AA
  fontSize: theme.typography.body2.fontSize,
}));
