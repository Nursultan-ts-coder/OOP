import type { HealthSignal, Restaurant } from '../types/portal';
import { devicesToTone, internetStateToTone, routingStateToTone } from './status';

const INTERNET_SIGNAL: Record<
  Restaurant['services']['internet'],
  Pick<HealthSignal, 'value' | 'detail'>
> = {
  up: { value: 'Connected', detail: '98.8% uptime' },
  warn: { value: 'Unstable', detail: 'Packet loss 3%' },
  down: { value: 'Down', detail: 'No connection' },
};

const ROUTING_SIGNAL: Record<
  Restaurant['services']['routing'],
  Pick<HealthSignal, 'value' | 'detail'>
> = {
  ok: { value: 'Healthy', detail: 'No route changes' },
  issue: { value: '1 Issue', detail: 'Unstable 2h' },
  down: { value: 'Down', detail: 'No routes' },
};

/**
 * The four health signals of a restaurant (internet, devices, secure tunnel, routing), from its
 * service states, so a restaurant's cards always agree with its row on the portfolio.
 */
export function buildHealthSignals(restaurant: Restaurant): HealthSignal[] {
  const { internet, devices, routing } = restaurant.services;
  const isOffline = internet === 'down';
  const devicesTone = devicesToTone(devices.online, devices.total);

  return [
    {
      key: 'internet',
      label: 'Internet',
      ...INTERNET_SIGNAL[internet],
      tone: internetStateToTone(internet),
      ...(internet === 'up' && { trend: '+0.2%' }),
    },
    {
      key: 'devices',
      label: 'Devices',
      value: `${devices.online} of ${devices.total}`,
      detail:
        devices.online === devices.total
          ? 'All responding'
          : `${devices.total - devices.online} not responding`,
      // All devices responding is the normal state: it reads as plain text, not as green.
      tone: devicesTone === 'success' ? 'neutral' : devicesTone,
    },
    {
      key: 'secure',
      label: 'Secure',
      value: isOffline ? 'Down' : 'Active',
      detail: isOffline ? 'Tunnel lost' : 'Tunnel established',
      tone: isOffline ? 'error' : 'success',
    },
    {
      key: 'routing',
      label: 'Routing',
      ...ROUTING_SIGNAL[routing],
      tone: routingStateToTone(routing),
    },
  ];
}
