import { TechnologyStatus } from '@/api/generated';
import markerDangerSvg from '@/shared/components/maps/assets/marker-danger.svg?raw';
import markerHybridSvg from '@/shared/components/maps/assets/marker-hybrid-meraki.svg?raw';
import markerJuniperSvg from '@/shared/components/maps/assets/marker-juniper.svg?raw';
import markerMerakiSvg from '@/shared/components/maps/assets/marker-meraki.svg?raw';
import markerMerakiJuniperSvg from '@/shared/components/maps/assets/marker-meraki-juniper.svg?raw';
import markerMutedSvg from '@/shared/components/maps/assets/marker-muted.svg?raw';
import markerNonStandardSvg from '@/shared/components/maps/assets/marker-non-standard.svg?raw';
import markerSuccessSvg from '@/shared/components/maps/assets/marker-success.svg?raw';
import markerUnmanagedSvg from '@/shared/components/maps/assets/marker-unmanaged.svg?raw';
import { HealthStatus } from '@/shared/types/common';

const toDataUri = (svg: string) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

const MARKER_DANGER = toDataUri(markerDangerSvg);
const MARKER_MUTED = toDataUri(markerMutedSvg);
const MARKER_HYBRID_MERAKI = toDataUri(markerHybridSvg);
const MARKER_MERAKI = toDataUri(markerMerakiSvg);
const MARKER_NON_STANDARD = toDataUri(markerNonStandardSvg);
const MARKER_JUNIPER = toDataUri(markerJuniperSvg);
const MARKER_UNMANAGED = toDataUri(markerUnmanagedSvg);
const MARKER_MERAKI_JUNIPER = toDataUri(markerMerakiJuniperSvg);
const MARKER_SUCCESS = toDataUri(markerSuccessSvg);

export const getMarkerDataUri = (
  status: HealthStatus | TechnologyStatus | null | undefined
): string => {
  switch (status) {
    case TechnologyStatus['Full-Meraki']:
      return MARKER_MERAKI;
    case TechnologyStatus.Hybrid:
      return MARKER_HYBRID_MERAKI;
    case TechnologyStatus.Partial:
      return MARKER_MERAKI_JUNIPER;
    case TechnologyStatus['Full-Juniper']:
      return MARKER_JUNIPER;
    case TechnologyStatus['Non-standard']:
      return MARKER_NON_STANDARD;
    case TechnologyStatus.Unmanaged:
      return MARKER_UNMANAGED;
    case HealthStatus.healthy:
      return MARKER_SUCCESS;
    case HealthStatus.critical:
      return MARKER_DANGER;
    default:
      return MARKER_MUTED;
  }
};
