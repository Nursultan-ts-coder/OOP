import { ListItem } from '@mui/material';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import type { Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

import { portalSurfaces } from '../../theme/surfaces';

/** The search box's width in the toolbar; full width on phones. */
export const SearchBox = styled('div')(({ theme }) => ({
  width: 300,
  [`& .${autocompleteClasses.inputRoot}`]: { flexWrap: 'nowrap' },
  [theme.breakpoints.down('sm')]: { width: '100%' },
}));

export const SuggestionOption = styled(ListItem)(({ theme }) => ({
  [`&.${autocompleteClasses.option}`]: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    padding: theme.spacing(1, 2),
  },
}));

export const SuggestionIcon = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  color: theme.palette.text.secondary,
  '& svg': { fontSize: theme.typography.pxToRem(20) },
}));

export const SuggestionText = styled('span')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  fontSize: theme.typography.pxToRem(14),
  fontWeight: theme.typography.fontWeightMedium,
}));

export const SuggestionDetail = styled('span')(({ theme }) => ({
  fontSize: theme.typography.pxToRem(12),
  fontWeight: theme.typography.fontWeightRegular,
  color: theme.palette.text.secondary,
}));

/** The suggestion list: on the portal's card color (it opens outside the page, in a popper). */
export const suggestionPaperSx = (theme: Theme) => {
  const { card, inset } = portalSurfaces(theme);
  return {
    marginTop: theme.spacing(0.75),
    backgroundColor: card,
    backgroundImage: 'none',
    border: `1px solid ${theme.palette.divider}`,
    // In sx a bare number is scaled by the theme radius, so it is given in px.
    borderRadius: `${theme.shape.panel}px`,
    [`& .${autocompleteClasses.groupLabel}`]: {
      backgroundColor: card,
      fontSize: theme.typography.pxToRem(11),
      fontWeight: theme.typography.fontWeightSemiBold,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      lineHeight: 2.75,
      color: theme.palette.text.secondary,
    },
    [`& .${autocompleteClasses.option}.Mui-focused, & .${autocompleteClasses.option}[aria-selected="true"]`]:
      { backgroundColor: inset },
  };
};
