import { styled } from '@mui/material/styles';

import { portalSurfaces } from '../../theme/surfaces';

/** A table inside a card: material-react-table's paper, rows, cells and toolbars. */
const CARD_TABLE = '& .MuiCard-root .MuiPaper-root:has(.MuiTableContainer-root)';

/**
 * The Figma card style, scoped to the portal: solid, borderless cards with 12px corners on the
 * portal's page color. grafana's widget and glass cards (frosted, outlined) keep their look
 * elsewhere in grafana.
 */
export const SurfaceRoot = styled('div')(({ theme }) => {
  const surfaces = portalSurfaces(theme);
  return {
    minHeight: '100%',
    backgroundColor: surfaces.page,
    '& .MuiCard-root': {
      backgroundColor: surfaces.card,
      backgroundImage: 'none',
      backdropFilter: 'none',
      borderRadius: theme.shape.panel,
      boxShadow: surfaces.cardShadow,
      '&:hover': { boxShadow: surfaces.cardShadow },
    },
    '& .MuiCard-root .MuiCard-root': {
      backgroundColor: surfaces.inset,
      boxShadow: 'none',
    },
    // grafana's Table forces its own panel color with !important; inside a card it takes the card's.
    [`${CARD_TABLE}, ${CARD_TABLE} .MuiTableRow-root, ${CARD_TABLE} .MuiTableCell-root`]: {
      backgroundColor: `${surfaces.card} !important`,
      boxShadow: 'none',
    },
    [`${CARD_TABLE} .MuiBox-root`]: { backgroundColor: surfaces.card },
    [`${CARD_TABLE} .MuiTableBody-root .MuiTableRow-root:hover .MuiTableCell-root`]: {
      backgroundColor: `${surfaces.inset} !important`,
    },
  };
});
