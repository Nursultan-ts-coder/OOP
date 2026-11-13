import { styled } from '@mui/material/styles';

/** The map's slot, as tall as `fillHeight` (down to the bottom of the window). */
export const MapSlot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'fillHeight',
})<{ fillHeight: number }>(({ fillHeight }) => ({
  height: fillHeight,
}));

/** Holds the map's place while it has no key. */
export const MapPlaceholder = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  borderRadius: theme.shape.panel,
  boxShadow: theme.customShadows.glassInset,
  padding: theme.spacing(2),
}));
