import { styled } from '@mui/material/styles';
import { Map as GoogleMap } from '@vis.gl/react-google-maps';

import { fillContainerCanvas } from '@/shared/styles/canvas';

export const MapContainer = styled('div')({
  width: '100%',
  height: '100%',
  position: 'relative',
  // Lets map controls size against the map (`cqw`), so a control row never outgrows a narrow map
  containerType: 'inline-size',
  ...fillContainerCanvas,
});

export const StyledGoogleMap = styled(GoogleMap)({
  width: '100%',
  height: '100%',
  position: 'relative',
});

export const OverlayContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  zIndex: theme.zIndex.mapOverlay,
}));
