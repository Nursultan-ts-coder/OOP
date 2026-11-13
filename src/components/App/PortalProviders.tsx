import { useTheme2 } from '@grafana/ui';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import { ThemeProvider, useColorScheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, useEffect, useState } from 'react';

import { AppGlobalStyles, createAppTheme, themeProviderProps } from '@/app/theme';

const appTheme = createAppTheme();

/** How long a portal response is reused before a remount fetches it again. */
const DEFAULT_STALE_TIME_MS = 30 * 1000;

/** Follows Grafana's light or dark theme: the portal has no toggle of its own here. */
const FollowGrafanaTheme = () => {
  const { isDark } = useTheme2();
  const { setMode } = useColorScheme();
  useEffect(() => setMode(isDark ? 'dark' : 'light'), [isDark, setMode]);
  return null;
};

/**
 * The portal's providers inside Grafana: React Query and its MUI theme, as in the standalone app,
 * but with a scoped baseline so Grafana's own page keeps its styles.
 */
export const PortalProviders = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: DEFAULT_STALE_TIME_MS, refetchOnWindowFocus: false, retry: false },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={appTheme} {...themeProviderProps} disableTransitionOnChange>
        <FollowGrafanaTheme />
        <AppGlobalStyles />
        <ScopedCssBaseline sx={{ backgroundColor: 'transparent' }}>{children}</ScopedCssBaseline>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
