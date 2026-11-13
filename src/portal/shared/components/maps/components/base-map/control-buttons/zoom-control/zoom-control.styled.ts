import { ButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';

import { MapControlButton } from '../control-buttons.styled';

export const ZoomButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  margin: theme.spacing(1.25),
  boxShadow: theme.shadows[2],
  '& .MuiButtonGroup-grouped': {
    borderColor: theme.palette.divider,
  },
  // On a light map the group's square-cornered shadow reads as a second frame around the pill
  // buttons, which already have their own border.
  ...theme.applyStyles('light', { boxShadow: 'none' }),
}));

// The pair reads as one pill: rounded top on "zoom in", rounded bottom on "zoom out".
export const ZoomInControlButton = styled(MapControlButton)(({ theme }) => ({
  borderRadius: `${theme.shape.pill}px ${theme.shape.pill}px 0 0`,
}));

export const ZoomOutControlButton = styled(MapControlButton)(({ theme }) => ({
  borderRadius: `0 0 ${theme.shape.pill}px ${theme.shape.pill}px`,
}));
