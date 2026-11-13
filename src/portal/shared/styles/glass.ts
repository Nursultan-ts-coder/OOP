import type { Theme } from '@mui/material';

/** Frosted, transparent surface of the hardware-type button, its popover and the map controls. */
export const glassStyles = (theme: Theme) => ({
  background: 'transparent',
  WebkitBackdropFilter: 'blur(12px)',
  backdropFilter: 'blur(12px)',
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.customShadows.glassInset,
});
