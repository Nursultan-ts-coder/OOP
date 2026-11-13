import AppCard from '@/shared/components/app-card';

import type { NetworkSummary as NetworkSummaryData } from '../../types/portal';
import DetailRows from '../detail-rows';

interface NetworkSummaryProps {
  network: NetworkSummaryData;
}

/** The restaurant's device counts and check results, warnings in amber. */
const NetworkSummary = ({ network }: NetworkSummaryProps) => {
  const hasRoutingIssue = network.routingIssues > 0;
  const hasFailedChecks = network.checksPassed < network.checksTotal;

  return (
    <AppCard title="Network summary" subtitle={network.location}>
      <DetailRows
        rows={[
          { label: 'Devices', value: `${network.devicesOnline}/${network.devicesTotal}` },
          { label: 'Wired', value: network.wiredDevices },
          { label: 'Wi-Fi', value: network.wifiDevices },
          {
            label: 'Secure',
            value: network.isSecureActive ? 'Active' : 'Down',
            color: network.isSecureActive ? 'success.main' : 'error.main',
          },
          {
            label: 'Routing',
            value: hasRoutingIssue ? `${network.routingIssues} issue` : 'Healthy',
            color: hasRoutingIssue ? 'warning.main' : 'success.main',
          },
          {
            label: 'Checks',
            value: `${network.checksPassed}/${network.checksTotal} passing`,
            color: hasFailedChecks ? 'warning.main' : 'success.main',
          },
        ]}
      />
    </AppCard>
  );
};

export default NetworkSummary;
