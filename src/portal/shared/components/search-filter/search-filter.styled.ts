import { TextField } from '@mui/material';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';

const FIELD_HEIGHT = 45;

/**
 * Size of the search box; its pill look comes from `fieldClasses.pill` in the theme. Unlike the
 * pickers, the hover outline is drawn on the field's root, outside the gradient ring.
 */
export const SearchTextField = styled(TextField)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.pill,
  overflow: 'hidden',
  border: '1px solid transparent',
  transition: theme.transitions.create('border-color', { duration: 200, easing: 'ease-in-out' }),
  '&:hover': {
    borderColor: theme.palette.text.primary,
  },
  [`& .${outlinedInputClasses.root}`]: {
    height: FIELD_HEIGHT,
    padding: theme.spacing(0, 1.25),
    border: 0,
  },
}));
