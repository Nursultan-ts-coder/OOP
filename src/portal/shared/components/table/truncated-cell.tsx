import { Box, Tooltip } from '@mui/material';
import type { ReactNode } from 'react';

import { truncateString } from '@/shared/utils/string';

/** Longest plain-text cell value shown in full; longer values are cut short and end in "...". */
export const CELL_TEXT_MAX_LENGTH = 24;

/**
 * The part of MRT's `Cell` props this renderer reads. Kept structural so the renderer can sit in
 * the table's `defaultColumn` whatever the row type is.
 */
interface TruncatedCellProps {
  cell: { getValue: () => unknown };
  renderedCellValue: ReactNode;
}

/**
 * Default `Cell` for columns that do not render their own: text longer than
 * `CELL_TEXT_MAX_LENGTH` is shortened to that many characters (including the "...") and the full
 * value is shown in a tooltip. Every other value renders exactly as MRT would render it.
 */
export const renderTruncatedCell = ({ cell, renderedCellValue }: TruncatedCellProps) => {
  const value = cell.getValue();

  if (typeof value !== 'string' || value.length <= CELL_TEXT_MAX_LENGTH) {
    return renderedCellValue;
  }

  return (
    <Tooltip title={value}>
      <Box component="span" sx={{ cursor: 'pointer' }}>
        {truncateString(value, CELL_TEXT_MAX_LENGTH)}
      </Box>
    </Tooltip>
  );
};
