import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useMap } from '@vis.gl/react-google-maps';

import { ZoomButtonGroup, ZoomInControlButton, ZoomOutControlButton } from './zoom-control.styled';

const ZoomControl = () => {
  const map = useMap();

  const handleZoomIn = () => {
    const z = map?.getZoom();
    if (z !== undefined) map?.setZoom(z + 1);
  };

  const handleZoomOut = () => {
    const z = map?.getZoom();
    if (z !== undefined) map?.setZoom(z - 1);
  };

  return (
    <ZoomButtonGroup orientation="vertical">
      <ZoomInControlButton onClick={handleZoomIn} aria-label="Zoom in">
        <AddIcon />
      </ZoomInControlButton>
      <ZoomOutControlButton onClick={handleZoomOut} aria-label="Zoom out">
        <RemoveIcon />
      </ZoomOutControlButton>
    </ZoomButtonGroup>
  );
};

export default ZoomControl;
