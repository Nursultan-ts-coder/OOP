import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * True below the theme's `lg` breakpoint (tablets and phones), where the sidebar overlays the page
 * and tab sets scroll instead of overflowing. Use it only when what is rendered changes; prefer
 * `theme.breakpoints` in styles for purely visual changes.
 */
export const useIsCompactLayout = () => {
  const theme = useTheme();
  // `noSsr` reads the query on the first render, so there is no initial desktop-mode frame.
  return useMediaQuery(theme.breakpoints.down('lg'), { noSsr: true });
};
