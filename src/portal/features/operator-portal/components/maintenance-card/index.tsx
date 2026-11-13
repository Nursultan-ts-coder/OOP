import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import { Typography } from '@mui/material';

import AppCard from '@/shared/components/app-card';

import type { MaintenanceWindow } from '../../types/portal';
import StatusChip from '../status-chip';

interface MaintenanceCardProps {
  maintenance: MaintenanceWindow;
}

/** The next planned maintenance window of the region. */
const MaintenanceCard = ({ maintenance }: MaintenanceCardProps) => (
  <AppCard title="Upcoming maintenance" actions={<StatusChip tone="warning" label="Planned" />}>
    <Typography component="p" variant="subtitle2" sx={{ display: 'flex', gap: 1 }}>
      <EventOutlinedIcon fontSize="small" color="warning" aria-hidden="true" />
      {maintenance.window}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {maintenance.scope}
    </Typography>
  </AppCard>
);

export default MaintenanceCard;
