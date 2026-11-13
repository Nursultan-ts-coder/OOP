import { styled } from '@mui/material/styles';

import { fillContainerCanvas } from '@/shared/styles/canvas';

export const ChartBox = styled('div')(({ theme }) => ({
  position: 'relative',
  height: 160,
  ...fillContainerCanvas,
  marginBottom: theme.spacing(1),
}));

export const Legend = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5, 1.5),
  fontSize: theme.typography.pxToRem(12),
  color: theme.palette.text.secondary,
}));

export const LegendItem = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.75),
}));

export const LegendSwatch = styled('span', {
  shouldForwardProp: (prop) => prop !== 'swatchColor' && prop !== 'isFocal',
})<{ swatchColor: string; isFocal: boolean }>(({ swatchColor, isFocal }) => ({
  width: 12,
  height: isFocal ? 3 : 2,
  borderRadius: 1,
  backgroundColor: swatchColor,
}));

export const TrendNote = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1.5),
  paddingTop: theme.spacing(1.25),
  borderTop: `1px solid ${theme.palette.divider}`,
  fontSize: theme.typography.pxToRem(12),
}));
