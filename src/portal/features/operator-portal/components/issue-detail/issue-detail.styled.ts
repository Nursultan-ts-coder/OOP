import { List, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { StatusTone } from '../../types/portal';
import { resolveToneColor } from '../../utils/status';

export const SectionHeading = styled('h4')(({ theme }) => ({
  margin: theme.spacing(2, 0, 1.5),
  fontSize: theme.typography.pxToRem(11),
  fontWeight: theme.typography.fontWeightBold,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: theme.palette.text.secondary,
}));

/** A vertical timeline: a line down the left, a dot per event. */
export const Timeline = styled(List)(({ theme }) => ({
  position: 'relative',
  padding: 0,
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 5,
    top: theme.spacing(1),
    bottom: theme.spacing(1),
    width: 1,
    backgroundColor: theme.palette.divider,
  },
}));

export const TimelineItem = styled(ListItem)(({ theme }) => ({
  alignItems: 'flex-start',
  gap: theme.spacing(1.5),
  padding: theme.spacing(0, 0, 1.75),
}));

export const TimelineDot = styled('span', {
  shouldForwardProp: (prop) => prop !== 'tone',
})<{ tone: StatusTone }>(({ theme, tone }) => ({
  zIndex: 1,
  flex: 'none',
  width: 11,
  height: 11,
  marginTop: theme.spacing(0.375),
  borderRadius: '50%',
  backgroundColor: resolveToneColor(theme.palette, tone),
  boxShadow: `0 0 0 2px ${theme.palette.background.widget}`,
}));

export const TimelineText = styled('span')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  fontSize: theme.typography.pxToRem(13),
  fontWeight: theme.typography.fontWeightMedium,
  '& time': {
    fontFamily: 'monospace',
    fontSize: theme.typography.pxToRem(11),
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.text.secondary,
  },
}));
