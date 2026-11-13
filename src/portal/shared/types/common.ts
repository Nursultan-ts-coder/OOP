import { SrcAppsWidgetsSchemasGlobalDashboardHealthStatus } from '@/api/generated';

/**
 * Domain health status levels for network infrastructure and restaurants.
 *
 * The values are owned by the backend contract; this is a readable app-wide name for the
 * generated enum, not a second copy of its values.
 */
export const HealthStatus = SrcAppsWidgetsSchemasGlobalDashboardHealthStatus;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type HealthStatus = SrcAppsWidgetsSchemasGlobalDashboardHealthStatus;

/**
 * UI presentation status enum matching semantic color tokens.
 */
export enum ColorsEnum {
  Info = 'info',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
}

/**
 * UI presentation semantic status used for colors, badges, and icon indicators: the string
 * values of `ColorsEnum`, for callers that pass plain literals.
 */
export type UiStatus = `${ColorsEnum}`;

export type Option<T = string> = {
  label: string;
  key: T;
};
