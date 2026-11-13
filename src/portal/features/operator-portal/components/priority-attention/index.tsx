import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import AppCard from '@/shared/components/app-card';

import { restaurantPath } from '../../const/paths';
import type { PriorityAlert } from '../../types/portal';
import RecordList from '../record-list';
import StatusChip from '../status-chip';

interface PriorityAttentionProps {
  alerts: PriorityAlert[];
}

/** The restaurants to look at first, worst first, each linking to its page. */
const PriorityAttention = ({ alerts }: PriorityAttentionProps) => (
  <AppCard
    title="Priority attention"
    actions={<StatusChip tone="error" label={`${alerts.length} open`} />}
  >
    <RecordList
      label="Priority attention"
      records={alerts.map((alert) => ({
        id: alert.storeId,
        tone: alert.severity === 'critical' ? 'error' : 'warning',
        testId: `alert-card-${alert.storeId}`,
        title: (
          <Link
            component={RouterLink}
            to={restaurantPath(alert.storeId)}
            underline="hover"
            color="inherit"
          >
            Store #{alert.storeNumber}
          </Link>
        ),
        details: `${alert.issue} · ${alert.city}, ${alert.state}`,
        meta: alert.timeAgo,
      }))}
    />
  </AppCard>
);

export default PriorityAttention;
