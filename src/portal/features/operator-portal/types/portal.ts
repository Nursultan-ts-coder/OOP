/** A restaurant's overall network status, as the portal reports it. */
export type StoreStatus = 'HEALTHY' | 'DEGRADED' | 'DOWN' | 'UNKNOWN';

/** The result of one automated service check. */
export type CheckStatus = 'Pass' | 'Warn' | 'Fail';

export type IssueSeverity = 'Critical' | 'Warning' | 'Info';

/** A UI tone: which theme palette color a status renders with. */
export type StatusTone = 'success' | 'warning' | 'error' | 'info' | 'neutral';

export type InternetState = 'up' | 'warn' | 'down';
export type RoutingState = 'ok' | 'issue' | 'down';

export interface StoreServices {
  internet: InternetState;
  devices: { online: number; total: number };
  routing: RoutingState;
}

export interface Restaurant {
  id: string;
  storeNumber: string;
  city: string;
  state: string;
  address: string;
  region: string;
  owner: string;
  admin: string;
  lastUpdate: string;
  status: StoreStatus;
  services: StoreServices;
  /** Where the restaurant is, for the portfolio map. */
  coordinates: { lat: number; lng: number };
}

export interface PortfolioSummary {
  total: number;
  healthy: number;
  degraded: number;
  down: number;
  unknown: number;
  openIssues: number;
  healthPercent: number;
  region: string;
  areaLabel: string;
}

export interface PriorityAlert {
  storeId: string;
  storeNumber: string;
  city: string;
  state: string;
  issue: string;
  timeAgo: string;
  severity: 'critical' | 'warning';
}

export interface MaintenanceWindow {
  window: string;
  scope: string;
  bannerText: string;
}

export type HealthSignalKey = 'internet' | 'devices' | 'secure' | 'routing';

export interface HealthSignal {
  key: HealthSignalKey;
  label: string;
  value: string;
  detail: string;
  tone: StatusTone;
  trend?: string;
}

export interface NetworkSummary {
  wifiDevices: number;
  wiredDevices: number;
  accessPoints: number;
  devicesOnline: number;
  devicesTotal: number;
  isSecureActive: boolean;
  routingIssues: number;
  checksPassed: number;
  checksTotal: number;
  location: string;
}

export interface ActiveIssue {
  id: number;
  title: string;
  severity: IssueSeverity;
  timeAgo: string;
  category: string;
}

export interface ServiceCheck {
  name: string;
  status: CheckStatus;
}

export interface CableIssue {
  id: number;
  port: string;
  description: string;
  severity: IssueSeverity;
  type: string;
  firstSeen: string;
  lastSeen: string;
  status: string;
  errorRate: string;
  device: string;
}

export interface NetworkInsight {
  id: number;
  description: string;
  timeAgo: string;
}

export type TimelineLevel = 'critical' | 'warning' | 'info' | 'success';

export interface TimelineEvent {
  time: string;
  text: string;
  level: TimelineLevel;
}

/** One series of the 24-hour health trend: an uptime percentage per hour. */
export interface HealthTrendSeries {
  label: string;
  tone: StatusTone;
  values: number[];
}

export interface HealthTrend {
  hours: string[];
  series: HealthTrendSeries[];
  note: string;
}

export type TopologyNodeKind =
  'internet' | 'gateway' | 'firewall' | 'switch' | 'access-points' | 'wired' | 'wifi';

export interface TopologyNode {
  kind: TopologyNodeKind;
  label: string;
  detail: string;
  tone: StatusTone;
}

export interface NetworkTopology {
  /** Internet → gateway → firewall → switch, left to right. */
  uplink: TopologyNode[];
  /** What hangs off the switch. */
  clients: TopologyNode[];
  /** The uplink hop that is degraded, by the index of the node it leads to. */
  degradedHop?: { toIndex: number; label: string };
}

export interface RestaurantOverview {
  signals: HealthSignal[];
  network: NetworkSummary;
  topology: NetworkTopology;
  activeIssues: ActiveIssue[];
  serviceChecks: ServiceCheck[];
  healthTrend: HealthTrend;
  lastSync: string;
}

export interface RestaurantInsights {
  cableIssues: CableIssue[];
  networkInsights: NetworkInsight[];
  serviceChecks: ServiceCheck[];
  timeline: TimelineEvent[];
}

/** The tabs of a restaurant's page. Only the live ones open a page today. */
export type RestaurantTab = 'overview' | 'network' | 'devices' | 'insights' | 'wireless';
