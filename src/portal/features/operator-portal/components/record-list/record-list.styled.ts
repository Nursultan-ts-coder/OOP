import { ButtonBase, List, ListItem } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import type { StatusTone } from '../../types/portal';
import { resolveToneColor } from '../../utils/status';

export const RecordListRoot = styled(List)({
  padding: 0,
});

export const RecordItem = styled(ListItem)(({ theme }) => ({
  padding: 0,
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-of-type': { borderBottom: 0 },
}));

const rowStyles = {
  display: 'flex',
  alignItems: 'stretch',
  width: '100%',
  minWidth: 0,
  textAlign: 'left',
} as const;

export const RecordRow = styled('div')(rowStyles);

/** A record that can be picked (the cable issue shown in the detail panel). */
export const RecordButton = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  ...rowStyles,
  justifyContent: 'flex-start',
  borderRadius: theme.shape.compact,
  backgroundColor: isSelected ? alpha(theme.palette.brand.loginCta, 0.08) : 'transparent',
  boxShadow: isSelected ? `inset 0 0 0 1px ${alpha(theme.palette.brand.loginCta, 0.4)}` : 'none',
  transition: theme.transitions.create(['background-color', 'box-shadow']),
  '&:hover': { backgroundColor: theme.palette.action.hover },
  '&.Mui-focusVisible': { outline: `2px solid ${theme.palette.brand.loginCta}` },
}));

/** The status bar down the record's left edge. */
export const RecordToneBar = styled('span', {
  shouldForwardProp: (prop) => prop !== 'tone',
})<{ tone: StatusTone }>(({ theme, tone }) => ({
  flex: 'none',
  width: theme.spacing(0.375),
  margin: theme.spacing(1, 0),
  borderRadius: theme.spacing(0.25),
  backgroundColor: resolveToneColor(theme.palette, tone),
}));

export const RecordBody = styled('div')(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(1.25, 1.5),
}));

export const RecordText = styled('div')({
  flex: 1,
  minWidth: 0,
});

export const RecordTitle = styled('div')(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.text.primary,
  overflowWrap: 'anywhere',
}));

export const RecordDetails = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(0.25),
  fontSize: theme.typography.pxToRem(12),
  color: theme.palette.text.secondary,
}));

export const RecordMeta = styled('div')(({ theme }) => ({
  flex: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  fontSize: theme.typography.pxToRem(12),
  color: theme.palette.text.secondary,
  whiteSpace: 'nowrap',
}));
