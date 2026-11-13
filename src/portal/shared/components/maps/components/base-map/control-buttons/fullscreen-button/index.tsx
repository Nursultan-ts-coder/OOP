import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

import { FullscreenControlButton } from './fullscreen-button.styled';

export interface FullscreenButtonProps {
  containerRef: RefObject<HTMLDivElement | null>;
}

const FullscreenButton = ({ containerRef }: FullscreenButtonProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleClick = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.warn(
          'Unable to enter fullscreen mode. Fullscreen mode is not supported or was denied.',
          err
        );
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.warn('Unable to exit fullscreen mode.', err);
      });
    }
  };

  return (
    <FullscreenControlButton
      onClick={handleClick}
      aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
    >
      {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
    </FullscreenControlButton>
  );
};

export default FullscreenButton;
