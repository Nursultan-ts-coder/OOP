import ErrorIcon from '@mui/icons-material/Error';
import { styled } from '@mui/material/styles';

import NoDataIcon from '@/app/assets/icons/no-data.svg?react';
import GlassCard from '@/shared/components/glass-card';

export const WidgetGlassRoot = styled(GlassCard)({});

export const WidgetPlainRoot = styled('div')({
  width: '100%',
});

/** Shared box for the loading, error and empty bodies so every state keeps the same footprint. */
export const WidgetStateContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'bodyHeight',
})<{ bodyHeight: number }>(({ theme, bodyHeight }) => ({
  width: '100%',
  minHeight: bodyHeight,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: theme.spacing(2.5),
}));

export const WidgetSkeletonContent = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
});

export const WidgetEmptyIcon = styled(NoDataIcon)(({ theme }) => ({
  width: 50,
  height: 50,
  marginBottom: theme.spacing(1.25),
}));

export const WidgetErrorIcon = styled(ErrorIcon)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(50),
  marginBottom: theme.spacing(1.25),
}));
