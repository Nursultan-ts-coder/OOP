import { styled } from '@mui/material/styles';

export const ProgressBarRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'fitLabels',
})<{ fitLabels: boolean }>(({ theme, fitLabels }) => ({
  marginTop: theme.spacing(3),
  ...(fitLabels && {
    width: '100%', // A size container ignores its content's width, so it needs its own
    containerType: 'inline-size', // Lets the list cap its columns against this width (`cqw`)
  }),
}));

/** One grid for every row (rows are subgrids), so labels, bars and values align across rows. */
export const ProgressListRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'fitLabels',
})<{ fitLabels: boolean }>(({ theme, fitLabels }) => ({
  display: 'grid',
  gridTemplateColumns: fitLabels
    ? // Label and value columns as wide as their widest entry, up to 40% / 25% of the list
      'fit-content(40cqw) minmax(0, 1fr) fit-content(25cqw)'
    : '2fr minmax(100px, 5fr) 1fr', // 100px: minimum legible bar width
  columnGap: theme.spacing(1.25),
}));
