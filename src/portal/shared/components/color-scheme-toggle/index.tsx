import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useColorScheme } from '@mui/material/styles';

import Button from '../button';

/**
 * Switches the app between its dark and light color schemes. MUI swaps the class on `<html>`,
 * re-renders the theme and remembers the choice in `localStorage`. The icon shows the active scheme.
 */
export const ColorSchemeToggle: React.FC = () => {
  const { mode, systemMode, setMode } = useColorScheme();
  // `mode` is undefined until MUI has read the stored choice; until then the app is dark.
  const isLight = (mode === 'system' ? systemMode : mode) === 'light';

  const handleToggle = () => {
    setMode(isLight ? 'dark' : 'light');
  };

  return (
    <Button
      variant="contained"
      onClick={handleToggle}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
    >
      {isLight ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
    </Button>
  );
};
