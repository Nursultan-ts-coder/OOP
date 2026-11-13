import { Link } from '@mui/material';
import type { MRT_ColumnDef } from 'material-react-table';
import { Link as RouterLink } from 'react-router-dom';

import { restaurantPath } from '../../const/paths';
import type { Restaurant } from '../../types/portal';
import { storeLocation, storeTitle } from '../../utils/restaurant';
import { STORE_STATUS_LABEL, storeStatusToTone } from '../../utils/status';
import ServicePips from '../service-pips';
import StatusChip from '../status-chip';

/** The portfolio table's columns, for grafana's Table (material-react-table). */
export const columns: MRT_ColumnDef<Restaurant>[] = [
  {
    id: 'store',
    header: 'Store',
    accessorFn: storeTitle,
    // The link keeps the row reachable as a link; the row click is a shortcut.
    Cell: ({ row }) => (
      <Link
        component={RouterLink}
        to={restaurantPath(row.original.id)}
        underline="hover"
        color="inherit"
        onClick={(event) => event.stopPropagation()}
      >
        {storeTitle(row.original)}
      </Link>
    ),
  },
  {
    id: 'location',
    header: 'Location',
    accessorFn: storeLocation,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    Cell: ({ row }) => (
      <StatusChip
        tone={storeStatusToTone(row.original.status)}
        label={STORE_STATUS_LABEL[row.original.status]}
      />
    ),
  },
  {
    id: 'services',
    header: 'Services',
    enableSorting: false,
    // Room for both pips on one line.
    size: 240,
    minSize: 200,
    Cell: ({ row }) => <ServicePips services={row.original.services} isCompact />,
  },
  {
    accessorKey: 'lastUpdate',
    header: 'Updated',
  },
];
