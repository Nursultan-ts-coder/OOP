import CableOutlinedIcon from '@mui/icons-material/CableOutlined';
import DevicesOtherOutlinedIcon from '@mui/icons-material/DevicesOtherOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import RouterOutlinedIcon from '@mui/icons-material/RouterOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import { Fragment, type ReactElement } from 'react';

import AppCard from '@/shared/components/app-card';

import type {
  NetworkSummary,
  NetworkTopology,
  TopologyNode,
  TopologyNodeKind,
} from '../../types/portal';
import { toneToLabel } from '../../utils/status';
import StatusChip from '../status-chip';
import {
  ClientsHeading,
  ClientsRow,
  Connector,
  LayoutFooter,
  NodeCard,
  NodeDetail,
  NodeDot,
  NodeLabel,
  UplinkRow,
} from './network-layout.styled';

const NODE_ICONS: Record<TopologyNodeKind, ReactElement> = {
  internet: <LanguageOutlinedIcon fontSize="small" />,
  gateway: <RouterOutlinedIcon fontSize="small" />,
  firewall: <SecurityOutlinedIcon fontSize="small" />,
  switch: <HubOutlinedIcon fontSize="small" />,
  'access-points': <WifiOutlinedIcon fontSize="small" />,
  wired: <CableOutlinedIcon fontSize="small" />,
  wifi: <DevicesOtherOutlinedIcon fontSize="small" />,
};

const TopologyNodeCard = ({ node }: { node: TopologyNode }) => (
  <NodeCard
    variant="widget"
    tone={node.tone}
    data-testid={`node-${node.kind}`}
    aria-label={`${node.label}: ${node.detail} (${toneToLabel(node.tone)})`}
  >
    <NodeDot tone={node.tone} aria-hidden="true" />
    <span className="node-icon" aria-hidden="true">
      {NODE_ICONS[node.kind]}
    </span>
    <NodeLabel>{node.label}</NodeLabel>
    <NodeDetail>{node.detail}</NodeDetail>
  </NodeCard>
);

interface NetworkLayoutProps {
  topology: NetworkTopology;
  network: NetworkSummary;
}

/** The restaurant's network: the uplink from the internet to the switch, and what hangs off it. */
const NetworkLayout = ({ topology, network }: NetworkLayoutProps) => (
  <AppCard
    title="Store network layout"
    subtitle="Live view of core equipment and connected devices"
    actions={<StatusChip tone="info" label="Current topology" />}
  >
    <UplinkRow>
      {topology.uplink.map((node, index) => {
        const isDegraded = topology.degradedHop?.toIndex === index;
        return (
          <Fragment key={node.kind}>
            {index > 0 && (
              <Connector isDegraded={isDegraded} aria-hidden={!isDegraded}>
                {isDegraded && (
                  <WarningAmberIcon
                    color="warning"
                    fontSize="small"
                    titleAccess={topology.degradedHop?.label}
                  />
                )}
              </Connector>
            )}
            <TopologyNodeCard node={node} />
          </Fragment>
        );
      })}
    </UplinkRow>
    <ClientsHeading>Connected to the switch</ClientsHeading>
    <ClientsRow>
      {topology.clients.map((node) => (
        <TopologyNodeCard key={node.kind} node={node} />
      ))}
    </ClientsRow>
    <LayoutFooter>
      <span>{network.accessPoints} access points</span>
      <span>{network.wifiDevices} Wi-Fi devices</span>
      <span>{network.wiredDevices} wired devices</span>
      {network.routingIssues > 0 && (
        <StatusChip
          tone="warning"
          label={`${network.routingIssues} routing issue${network.routingIssues > 1 ? 's' : ''}`}
        />
      )}
    </LayoutFooter>
  </AppCard>
);

export default NetworkLayout;
