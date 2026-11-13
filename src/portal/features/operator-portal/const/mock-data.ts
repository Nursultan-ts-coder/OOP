/*
 * The portal's sample data: a Chicago metro portfolio of a single owner/operator, as the original
 * prototype showed it. The hooks in ../hooks serve it through React Query, so swapping in the real
 * API later changes only those hooks' query functions, never a component.
 */
import type {
  CableIssue,
  HealthTrend,
  MaintenanceWindow,
  NetworkInsight,
  NetworkTopology,
  PortfolioSummary,
  PriorityAlert,
  Restaurant,
  RestaurantInsights,
  RestaurantOverview,
  ServiceCheck,
  TimelineEvent,
} from '../types/portal';

const OWNER = { region: 'Midwest', owner: 'Jason D.', admin: 'Sara M.' };

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: '4031',
    storeNumber: '4031',
    city: 'Evanston',
    state: 'IL',
    address: '2100 Dempster St',
    ...OWNER,
    lastUpdate: '1m ago',
    status: 'DOWN',
    services: { internet: 'down', devices: { online: 0, total: 5 }, routing: 'down' },
    coordinates: { lat: 42.0451, lng: -87.6877 },
  },
  {
    id: '4023',
    storeNumber: '4023',
    city: 'Schaumburg',
    state: 'IL',
    address: '1402 E Higgins Rd',
    ...OWNER,
    lastUpdate: '4m ago',
    status: 'DEGRADED',
    services: { internet: 'up', devices: { online: 5, total: 5 }, routing: 'issue' },
    coordinates: { lat: 42.0334, lng: -88.0834 },
  },
  {
    id: '4038',
    storeNumber: '4038',
    city: 'Joliet',
    state: 'IL',
    address: '3101 Plainfield Rd',
    ...OWNER,
    lastUpdate: '8m ago',
    status: 'DEGRADED',
    services: { internet: 'warn', devices: { online: 4, total: 5 }, routing: 'ok' },
    coordinates: { lat: 41.525, lng: -88.0817 },
  },
  {
    id: '4052',
    storeNumber: '4052',
    city: 'Waukegan',
    state: 'IL',
    address: '500 N Green Bay Rd',
    ...OWNER,
    lastUpdate: '10m ago',
    status: 'DEGRADED',
    services: { internet: 'up', devices: { online: 5, total: 5 }, routing: 'issue' },
    coordinates: { lat: 42.3636, lng: -87.8448 },
  },
  {
    id: '4012',
    storeNumber: '4012',
    city: 'Oak Brook',
    state: 'IL',
    address: '700 Jorie Blvd',
    ...OWNER,
    lastUpdate: '1m ago',
    status: 'HEALTHY',
    services: { internet: 'up', devices: { online: 5, total: 5 }, routing: 'ok' },
    coordinates: { lat: 41.8328, lng: -87.929 },
  },
  {
    id: '4015',
    storeNumber: '4015',
    city: 'Naperville',
    state: 'IL',
    address: '1252 S Naper Blvd',
    ...OWNER,
    lastUpdate: '2m ago',
    status: 'HEALTHY',
    services: { internet: 'up', devices: { online: 5, total: 5 }, routing: 'ok' },
    coordinates: { lat: 41.7508, lng: -88.1535 },
  },
  {
    id: '4044',
    storeNumber: '4044',
    city: 'Aurora',
    state: 'IL',
    address: '215 S Randall Rd',
    ...OWNER,
    lastUpdate: '7m ago',
    status: 'HEALTHY',
    services: { internet: 'up', devices: { online: 5, total: 5 }, routing: 'ok' },
    coordinates: { lat: 41.7606, lng: -88.3201 },
  },
  {
    id: '4007',
    storeNumber: '4007',
    city: 'Skokie',
    state: 'IL',
    address: '5221 Dempster St',
    ...OWNER,
    lastUpdate: '5m ago',
    status: 'HEALTHY',
    services: { internet: 'up', devices: { online: 5, total: 5 }, routing: 'ok' },
    coordinates: { lat: 42.0324, lng: -87.7416 },
  },
  {
    id: '4019',
    storeNumber: '4019',
    city: 'Palatine',
    state: 'IL',
    address: '1120 N Rand Rd',
    ...OWNER,
    lastUpdate: '4m ago',
    status: 'HEALTHY',
    services: { internet: 'up', devices: { online: 5, total: 5 }, routing: 'ok' },
    coordinates: { lat: 42.1103, lng: -88.0342 },
  },
  {
    id: '4027',
    storeNumber: '4027',
    city: 'Elmhurst',
    state: 'IL',
    address: '185 S Addison Ave',
    ...OWNER,
    lastUpdate: '1m ago',
    status: 'HEALTHY',
    services: { internet: 'up', devices: { online: 5, total: 5 }, routing: 'ok' },
    coordinates: { lat: 41.8995, lng: -87.9403 },
  },
  {
    id: '4009',
    storeNumber: '4009',
    city: 'Arlington Heights',
    state: 'IL',
    address: '21 W Rand Rd',
    ...OWNER,
    lastUpdate: '3m ago',
    status: 'HEALTHY',
    services: { internet: 'up', devices: { online: 5, total: 5 }, routing: 'ok' },
    coordinates: { lat: 42.0884, lng: -87.9806 },
  },
  {
    id: '4033',
    storeNumber: '4033',
    city: 'Bolingbrook',
    state: 'IL',
    address: '400 N Weber Rd',
    ...OWNER,
    lastUpdate: '6m ago',
    status: 'UNKNOWN',
    services: { internet: 'warn', devices: { online: 3, total: 5 }, routing: 'ok' },
    coordinates: { lat: 41.6986, lng: -88.0684 },
  },
];

/** The portfolio has 24 restaurants; the sample lists the first 12. */
export const MOCK_PORTFOLIO_SUMMARY: PortfolioSummary = {
  total: 24,
  healthy: 19,
  degraded: 3,
  down: 1,
  unknown: 1,
  openIssues: 5,
  healthPercent: 79,
  region: 'Midwest',
  areaLabel: 'Chicago metro area',
};

export const MOCK_PRIORITY_ALERTS: PriorityAlert[] = [
  {
    storeId: '4031',
    storeNumber: '4031',
    city: 'Evanston',
    state: 'IL',
    issue: 'Internet down',
    timeAgo: '1h ago',
    severity: 'critical',
  },
  {
    storeId: '4023',
    storeNumber: '4023',
    city: 'Schaumburg',
    state: 'IL',
    issue: 'Routing issue',
    timeAgo: '8h ago',
    severity: 'warning',
  },
];

export const MOCK_MAINTENANCE: MaintenanceWindow = {
  window: 'Apr 18, 03:00–05:00 CT',
  scope: 'Midwest region · planned',
  bannerText:
    'Planned maintenance: Apr 18, 03:00–05:00 CT. Some services may be temporarily impacted.',
};

const HOURS = Array.from({ length: 25 }, (_, index) => (index === 24 ? 'now' : `-${24 - index}h`));

const round = (value: number) => Number(value.toFixed(2));

const MOCK_HEALTH_TREND: HealthTrend = {
  hours: HOURS,
  series: [
    {
      label: 'Routing',
      tone: 'warning',
      values: HOURS.map((_, index) => {
        const hoursAgo = 24 - index;
        if (hoursAgo === 2) return 97.8;
        if (hoursAgo === 1) return 95.4;
        if (hoursAgo === 0) return 96.6;
        return round(99.5 + Math.cos(index * 0.4) * 0.25);
      }),
    },
    {
      label: 'Internet',
      tone: 'success',
      values: HOURS.map((_, index) =>
        24 - index <= 2 ? 98.4 : round(98.8 + Math.sin(index * 0.6) * 0.25)
      ),
    },
    { label: 'Secure', tone: 'info', values: HOURS.map(() => 99.95) },
    { label: 'Devices', tone: 'neutral', values: HOURS.map(() => 100) },
  ],
  note: 'Routing instability detected in the last 2h',
};

const MOCK_TOPOLOGY: NetworkTopology = {
  uplink: [
    { kind: 'internet', label: 'Internet', detail: 'Connected', tone: 'success' },
    { kind: 'gateway', label: 'Internet Gateway', detail: 'Healthy', tone: 'success' },
    { kind: 'firewall', label: 'Router / Firewall', detail: 'Tunnel active', tone: 'success' },
    { kind: 'switch', label: 'Switch', detail: '5 of 5 active', tone: 'success' },
  ],
  clients: [
    { kind: 'access-points', label: 'Access Points', detail: '3 APs · 1 warning', tone: 'warning' },
    { kind: 'wired', label: 'Wired Devices', detail: '12 connected', tone: 'success' },
    { kind: 'wifi', label: 'Wi-Fi Devices', detail: '38 connected', tone: 'success' },
  ],
  degradedHop: { toIndex: 3, label: 'Routing instability' },
};

const OVERVIEW_CHECKS: ServiceCheck[] = [
  { name: 'Connectivity', status: 'Pass' },
  { name: 'Firewall status', status: 'Pass' },
  { name: 'Secure tunnel', status: 'Pass' },
  { name: 'Primary routing', status: 'Warn' },
  { name: 'DNS resolution', status: 'Pass' },
  { name: 'Wireless controller', status: 'Pass' },
];

/** Store 4023's overview, the one the prototype was designed around. */
export const MOCK_RESTAURANT_OVERVIEW: RestaurantOverview = {
  signals: [
    {
      key: 'internet',
      label: 'Internet',
      value: 'Connected',
      detail: '98.8% uptime',
      tone: 'success',
      trend: '+0.2%',
    },
    {
      key: 'devices',
      label: 'Devices',
      value: '5 of 5',
      detail: 'All responding',
      tone: 'neutral',
    },
    {
      key: 'secure',
      label: 'Secure',
      value: 'Active',
      detail: 'Tunnel established',
      tone: 'success',
    },
    { key: 'routing', label: 'Routing', value: '1 Issue', detail: 'Unstable 2h', tone: 'warning' },
  ],
  network: {
    wifiDevices: 38,
    wiredDevices: 12,
    accessPoints: 3,
    devicesOnline: 5,
    devicesTotal: 5,
    isSecureActive: true,
    routingIssues: 1,
    checksPassed: 5,
    checksTotal: 6,
    location: 'Hub 1a · Slot 5 of 45 · Midwest Region',
  },
  topology: MOCK_TOPOLOGY,
  activeIssues: [
    {
      id: 1,
      title: 'Routing unstable on primary link',
      severity: 'Warning',
      timeAgo: '2h ago',
      category: 'Network',
    },
    {
      id: 2,
      title: 'Bad cable on switch port 3',
      severity: 'Warning',
      timeAgo: '6h ago',
      category: 'Hardware',
    },
  ],
  serviceChecks: OVERVIEW_CHECKS,
  healthTrend: MOCK_HEALTH_TREND,
  lastSync: '4m ago',
};

const CABLE_ISSUES: CableIssue[] = [
  {
    id: 1,
    port: 'ge-0/0/7',
    description: 'bad cable detected',
    severity: 'Critical',
    type: 'Cable Issue',
    firstSeen: '8h ago',
    lastSeen: '22m ago',
    status: 'Open',
    errorRate: '7.1% (last 1h)',
    device: 'Switch-01',
  },
  {
    id: 2,
    port: 'ge-0/0/3',
    description: 'intermittent errors',
    severity: 'Warning',
    type: 'Cable Issue',
    firstSeen: '6h ago',
    lastSeen: '44m ago',
    status: 'Open',
    errorRate: '3.2% (last 1h)',
    device: 'Switch-01',
  },
];

const NETWORK_INSIGHTS: NetworkInsight[] = [
  { id: 1, description: 'BGP session flapping on primary uplink', timeAgo: '2h ago' },
  { id: 2, description: 'AP-03 client association failures', timeAgo: '5h ago' },
  { id: 3, description: 'DHCP pool nearing capacity (87%)', timeAgo: '8h ago' },
  { id: 4, description: 'Switch-01 CPU utilization spike (72%)', timeAgo: '12h ago' },
];

const ALL_CHECKS: ServiceCheck[] = [
  { name: 'Internet uptime', status: 'Pass' },
  { name: 'Firewall status', status: 'Pass' },
  { name: 'Secure tunnel', status: 'Pass' },
  { name: 'Primary routing', status: 'Warn' },
  { name: 'DNS resolution', status: 'Pass' },
  { name: 'Wireless controller', status: 'Pass' },
  { name: 'Cable integrity', status: 'Pass' },
  { name: 'BGP peering', status: 'Fail' },
  { name: 'DHCP service', status: 'Pass' },
  { name: 'Switch health', status: 'Pass' },
  { name: 'PoS connectivity', status: 'Pass' },
  { name: 'Backup link', status: 'Pass' },
];

const TIMELINE: TimelineEvent[] = [
  { time: '18:42', text: 'BGP flap detected', level: 'critical' },
  { time: '15:35', text: 'Cable worn on port 3', level: 'warning' },
  { time: '12:03', text: 'AP-13 restarted', level: 'info' },
  { time: '08:30', text: 'DHCP pool warning', level: 'warning' },
  { time: '02:11', text: 'Cable fail on port 7', level: 'critical' },
  { time: '00:02', text: 'All checks passed', level: 'success' },
];

/** Store 4023's insights. */
export const MOCK_RESTAURANT_INSIGHTS: RestaurantInsights = {
  cableIssues: CABLE_ISSUES,
  networkInsights: NETWORK_INSIGHTS,
  serviceChecks: ALL_CHECKS,
  timeline: TIMELINE,
};
