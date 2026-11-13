import { styled } from '@mui/material/styles';

import { MapControlButton } from '../control-buttons.styled';

export const FullscreenControlButton = styled(MapControlButton)(({ theme }) => ({
  margin: theme.spacing(0, 1.25, 1.25),
}));
