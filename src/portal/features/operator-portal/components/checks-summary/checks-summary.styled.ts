import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SummaryBar = styled('div')(({ theme }) => ({
  display: 'flex',
  height: theme.spacing(1),
  borderRadius: theme.shape.pill,
  overflow: 'hidden',
  backgroundColor: theme.palette.track.progress,
}));

export const SummarySegment = styled('span')({
  height: '100%',
});

export const HealthCard = styled(Card)(({ theme }) => ({
  flex: '1.4 1 0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: theme.spacing(0.75),
  minWidth: 0,
  padding: theme.spacing(1.25, 1.5),
}));

export const HealthHead = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  fontSize: theme.typography.pxToRem(11),
  fontWeight: theme.typography.fontWeightSemiBold,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: theme.palette.text.secondary,
  '& b': {
    ...theme.typography.metricValue,
    color: theme.palette.text.primary,
    textTransform: 'none',
  },
}));
