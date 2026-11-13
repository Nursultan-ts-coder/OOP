import { styled, Typography } from '@mui/material';

export const LoaderContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 200,
  width: '100%',
});

export const LoaderMessage = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));
