import type { Collector, CollectorFreshnessCollector } from '@/api/generated';
import {
  Collector as GeneratedHardwareCollector,
  CollectorFreshnessCollector as GeneratedCollector,
} from '@/api/generated';
import type { Option } from '@/shared/types';

export const baseUrl = import.meta.env.BASE_URL;

export const CollectorOptions: Option<CollectorFreshnessCollector>[] = [
  { key: GeneratedCollector.meraki, label: 'Meraki' },
  { key: GeneratedCollector.mist, label: 'Juniper' },
  { key: GeneratedCollector.aruba, label: 'Aruba' },
];

type HardwareCollector = Exclude<Collector, typeof GeneratedHardwareCollector.combined>;

export const HardwareCollectorOptions: Option<HardwareCollector>[] = [
  { key: GeneratedHardwareCollector.meraki, label: 'Meraki' },
  { key: GeneratedHardwareCollector.mist, label: 'Juniper' },
  { key: GeneratedHardwareCollector.aruba, label: 'Aruba' },
  { key: GeneratedHardwareCollector.cradlepoint, label: 'Cradlepoint' },
];

export const CollectorDisplayNames: Record<CollectorFreshnessCollector, string> = {
  [GeneratedCollector.meraki]: 'Meraki',
  [GeneratedCollector.mist]: 'Juniper',
  [GeneratedCollector.aruba]: 'Aruba',
};
