/*
 * The only part of grafana-restraurant-custom-widgets' generated API client (src/api/generated.ts)
 * that the files copied from it need: the enums and types the theme, the shared Table and the map
 * markers import. They are copied from grafana's client as they are. This app has no grafana
 * backend; the portal reads its own mock data (features/operator-portal/const/mock-data.ts) until
 * its API exists.
 *
 * Inside grafana the real generated client is used instead; this file is never copied there.
 */
/* eslint-disable @typescript-eslint/no-redeclare */

export type TechnologyStatus = (typeof TechnologyStatus)[keyof typeof TechnologyStatus];
export const TechnologyStatus = {
  Unmanaged: 'Unmanaged',
  Partial: 'Partial',
  'Full-Meraki': 'Full-Meraki',
  Hybrid: 'Hybrid',
  'Full-Juniper': 'Full-Juniper',
  'Non-standard': 'Non-standard',
} as const;

export type SrcAppsWidgetsSchemasGlobalDashboardHealthStatus =
  (typeof SrcAppsWidgetsSchemasGlobalDashboardHealthStatus)[keyof typeof SrcAppsWidgetsSchemasGlobalDashboardHealthStatus];
export const SrcAppsWidgetsSchemasGlobalDashboardHealthStatus = {
  healthy: 'healthy',
  warning: 'warning',
  critical: 'critical',
  unmanaged: 'unmanaged',
  unknown: 'unknown',
} as const;

export type Collector = (typeof Collector)[keyof typeof Collector];
export const Collector = {
  meraki: 'meraki',
  mist: 'mist',
  aruba: 'aruba',
  cradlepoint: 'cradlepoint',
  combined: 'combined',
} as const;

export type CollectorFreshnessCollector =
  (typeof CollectorFreshnessCollector)[keyof typeof CollectorFreshnessCollector];
export const CollectorFreshnessCollector = {
  meraki: 'meraki',
  mist: 'mist',
  aruba: 'aruba',
} as const;

export type ExportFormat = (typeof ExportFormat)[keyof typeof ExportFormat];
export const ExportFormat = {
  csv: 'csv',
  excel: 'excel',
} as const;

export type ExportTaskStatus = (typeof ExportTaskStatus)[keyof typeof ExportTaskStatus];
export const ExportTaskStatus = {
  pending: 'pending',
  processing: 'processing',
  completed: 'completed',
  failed: 'failed',
} as const;

export interface ExportTaskProgress {
  task_id: string;
  status: ExportTaskStatus;
  progress: number;
  total_items: number;
  processed_items: number;
  message?: string | null;
  error?: string | null;
  file_url?: string | null;
  file_name?: string | null;
}

export interface ExportTaskResponse {
  status?: 'success';
  task_id: string;
  message: string;
}

export interface ExportTaskStatusResponse {
  status?: 'success';
  data: ExportTaskProgress;
}
