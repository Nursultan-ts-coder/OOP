/*
 * The portal's status vocabularies (store status, check results, issue severity, service states)
 * mapped to one UI tone each, and the tone to a label and a theme palette path. Components never
 * pick colors themselves: they take a tone and resolve it with `toneToColor`.
 */
import type {
  CheckStatus,
  InternetState,
  IssueSeverity,
  RoutingState,
  StatusTone,
  StoreStatus,
  TimelineLevel,
} from '../types/portal';

/** A theme palette path, usable as an `sx` color or resolved with `resolveToneColor`. */
export type ToneColor =
  'success.main' | 'warning.main' | 'error.main' | 'info.main' | 'location.unmanaged';

export const STORE_STATUS_LABEL: Record<StoreStatus, string> = {
  HEALTHY: 'Healthy',
  DEGRADED: 'Degraded',
  DOWN: 'Down',
  UNKNOWN: 'Unknown',
};

export const STORE_STATUSES: StoreStatus[] = ['HEALTHY', 'DEGRADED', 'DOWN', 'UNKNOWN'];

export function storeStatusToTone(status: StoreStatus): StatusTone {
  switch (status) {
    case 'HEALTHY':
      return 'success';
    case 'DEGRADED':
      return 'warning';
    case 'DOWN':
      return 'error';
    case 'UNKNOWN':
    default:
      return 'neutral';
  }
}

export function checkStatusToTone(status: CheckStatus): StatusTone {
  switch (status) {
    case 'Pass':
      return 'success';
    case 'Warn':
      return 'warning';
    case 'Fail':
    default:
      return 'error';
  }
}

export function severityToTone(severity: IssueSeverity): StatusTone {
  switch (severity) {
    case 'Critical':
      return 'error';
    case 'Warning':
      return 'warning';
    case 'Info':
    default:
      return 'info';
  }
}

export function timelineLevelToTone(level: TimelineLevel): StatusTone {
  switch (level) {
    case 'critical':
      return 'error';
    case 'warning':
      return 'warning';
    case 'success':
      return 'success';
    case 'info':
    default:
      return 'info';
  }
}

export function internetStateToTone(state: InternetState): StatusTone {
  if (state === 'up') return 'success';
  return state === 'warn' ? 'warning' : 'error';
}

export function routingStateToTone(state: RoutingState): StatusTone {
  if (state === 'ok') return 'success';
  return state === 'issue' ? 'warning' : 'error';
}

/** All devices online is healthy, none is down, anything between is a warning. */
export function devicesToTone(online: number, total: number): StatusTone {
  if (online === total) return 'success';
  return online === 0 ? 'error' : 'warning';
}

/** The palette color a tone renders with. Neutral is the unmanaged grey of the maps. */
export function toneToColor(tone: StatusTone): ToneColor {
  switch (tone) {
    case 'success':
      return 'success.main';
    case 'warning':
      return 'warning.main';
    case 'error':
      return 'error.main';
    case 'info':
      return 'info.main';
    case 'neutral':
    default:
      return 'location.unmanaged';
  }
}

/** Text that names a tone, so status is never told by color alone. */
export function toneToLabel(tone: StatusTone): string {
  switch (tone) {
    case 'success':
      return 'Healthy';
    case 'warning':
      return 'Warning';
    case 'error':
      return 'Critical';
    case 'info':
      return 'Info';
    case 'neutral':
    default:
      return 'Unknown';
  }
}

type TonePalette = {
  success: { main: string };
  warning: { main: string };
  error: { main: string };
  info: { main: string };
  location: { unmanaged: string };
};

/** The real color value of a tone, for `alpha()` and canvas libraries (Chart.js). */
export function resolveToneColor(palette: TonePalette, tone: StatusTone): string {
  const [group, shade] = toneToColor(tone).split('.') as [keyof TonePalette, string];
  return (palette[group] as Record<string, string>)[shade];
}
