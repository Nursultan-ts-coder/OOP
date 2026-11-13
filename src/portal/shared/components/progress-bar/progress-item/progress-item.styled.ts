import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

export const ProgressBar = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== 'barColor',
})<{ barColor?: string }>(({ theme, barColor }) => ({
  height: 13,
  borderRadius: theme.shape.pill,
  backgroundColor: theme.palette.track.list,
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: theme.shape.pill,
    backgroundColor: barColor,
  },
}));

export const ProgressItemRoot = styled('div')(({ theme }) => ({
  display: 'grid',
  alignItems: 'center',
  gridColumn: '1 / -1',
  gridTemplateColumns: 'subgrid',
  marginBottom: theme.spacing(1.25),
}));

export const LeftLabel = styled('div')({
  textAlign: 'left',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  minWidth: 0, // Required for text-overflow to work in a grid
});

export const RightLabel = styled('div')({
  textAlign: 'left',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  minWidth: 0, // Required for text-overflow to work in a grid
});

export const ProgressBarContainer = styled('div')({
  width: '100%',
});
