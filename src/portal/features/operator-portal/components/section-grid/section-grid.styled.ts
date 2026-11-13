import { styled } from '@mui/material/styles';

/**
 * A page body on the same grid as the info card row above it: `columns` equal columns a widget gap
 * apart, the main column spanning all but the last, so the right rail is exactly one top card wide.
 * One column on tablets and phones, rail last.
 */
export const PageColumns = styled('div', {
  shouldForwardProp: (prop) => prop !== 'columns',
})<{ columns: number }>(({ theme, columns }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  alignItems: 'start',
  gap: theme.spacing(theme.layout.widgetGap),
  '& > :first-of-type': { gridColumn: `span ${columns - 1}` },
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
    '& > :first-of-type': { gridColumn: 'auto' },
  },
}));

/** A column of widgets. */
export const WidgetColumn = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(theme.layout.widgetGap),
  minWidth: 0,
}));

/** The page itself: header, info cards, tabs and body, a widget gap apart. */
export const PageStack = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(theme.layout.widgetGap),
  paddingBottom: theme.spacing(4),
  minWidth: 0,
}));
