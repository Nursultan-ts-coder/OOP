import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    background: theme.palette.background.dialog,
    backdropFilter: 'blur(25px)',
    outline: 'none',
    '&:focus, &:focus-visible': {
      outline: 'none',
    },
  },
  '& .MuiDialogContent-root': {
    overflowY: 'auto',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(3, 3),
  },
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(2),
  top: theme.spacing(2),
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h5.fontSize,
  fontWeight: theme.typography.fontWeightSemiBold,
})) as typeof Typography;

export const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  color: theme.palette.text.secondary,
  padding: theme.spacing(0, 5, 2, 3),
})) as typeof Typography;
