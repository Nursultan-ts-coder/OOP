import { LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

export const HealthRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.25),
  marginBottom: theme.spacing(1),
}));

export const HealthBar = styled(LinearProgress)(({ theme }) => ({
  flex: 1,
  height: theme.spacing(1),
  borderRadius: theme.shape.pill,
  backgroundColor: theme.palette.track.progress,
}));
