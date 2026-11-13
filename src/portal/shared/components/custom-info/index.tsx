import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { InfoWindow } from '@vis.gl/react-google-maps';
import type { ReactNode, SetStateAction } from 'react';
import React from 'react';

import { InfoContent, InfoHeader, InfoTitle, LinkButton } from './custom-info.styled';

/**
 * `InfoWindow` compares `pixelOffset` by reference and re-opens the window (auto-panning the map)
 * whenever it changes, so it must be one constant rather than a literal created per render.
 */
const PIXEL_OFFSET: [number, number] = [10, -25];

interface CustomInfoWindowProps {
  children: ReactNode;
  position?: google.maps.LatLng | google.maps.LatLngLiteral | null | undefined;
  isOpen: boolean;
  onOpenChange: (value: SetStateAction<boolean>) => void;
  title: string;
  anchor?: google.maps.Marker | google.maps.marker.AdvancedMarkerElement | null;
  onClick?: () => void;
}

const CustomInfoWindow: React.FC<CustomInfoWindowProps> = ({
  children,
  position,
  isOpen,
  onOpenChange,
  title,
  anchor,
  onClick = () => {},
}) => {
  const handleClose = () => {
    onOpenChange(false);
  };

  if (!isOpen) return null;

  return (
    <InfoWindow
      position={position}
      disableAutoPan={false}
      pixelOffset={PIXEL_OFFSET}
      maxWidth={300}
      onClose={handleClose}
      anchor={anchor}
    >
      <InfoContent>
        <InfoHeader>
          {/* The heading wraps the button: a heading inside a button loses its heading role. */}
          <InfoTitle component="h2">
            <LinkButton
              type="button"
              tabIndex={0}
              onClick={onClick}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onClick();
                }
              }}
            >
              {title}
            </LinkButton>
          </InfoTitle>

          <IconButton size="small" onClick={handleClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </InfoHeader>
        {children}
      </InfoContent>
    </InfoWindow>
  );
};

export default CustomInfoWindow;
