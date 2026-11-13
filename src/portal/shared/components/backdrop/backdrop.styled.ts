import type { TypographyProps } from '@mui/material';
import { Backdrop as BackdropMui, styled, Typography } from '@mui/material';

export const StyledBackdrop = styled(BackdropMui)(({ theme }) => ({
  position: 'absolute',
  opacity: 0.4,
  zIndex: theme.zIndex.drawer + 1,
  color: theme.palette.text.primary,
}));

export const BackdropContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const BackdropMessage = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginTop: theme.spacing(1),
}));
