import type { ReactNode } from 'react';

import { DetailLabel, DetailList, DetailRow, DetailValue } from './detail-rows.styled';

export interface DetailRowEntry {
  label: string;
  value: ReactNode;
  /** A palette path for the value's color, e.g. `'warning.main'`. */
  color?: string;
}

/** Label / value pairs, one per row (restaurant info, an issue's details). */
const DetailRows = ({ rows }: { rows: DetailRowEntry[] }) => (
  <DetailList>
    {rows.map((row) => (
      <DetailRow key={row.label}>
        <DetailLabel>{row.label}</DetailLabel>
        <DetailValue sx={{ color: row.color ?? 'text.primary' }}>{row.value}</DetailValue>
      </DetailRow>
    ))}
  </DetailList>
);

export default DetailRows;
