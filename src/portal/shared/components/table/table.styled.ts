import { Box, IconButton, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import WidgetWrapper from '@/shared/components/widget-wrapper';

export const TableWrapper = styled('div')(({ theme }) => {
  const tableBackground = theme.palette.background.table;

  return {
    // material-react-table paints its rows with `!important` and its cells/paper through `sx`,
    // so the table background has to be forced to win over both.
    '.MuiTableCell-root': {
      backgroundColor: `${tableBackground} !important`,
      borderBottom: `1px solid ${alpha(theme.palette.border.default, 0.7)}`,
    },

    '.MuiTableRow-root': {
      backgroundColor: `${tableBackground} !important`,
    },

    // Only material-react-table's own paper: cards inside the table (the empty state) are Papers too.
    '& > .MuiPaper-root': {
      padding: theme.spacing(0.625, 1.25),
      backgroundColor: `${tableBackground} !important`,
      borderRadius: theme.shape.panel,
    },

    '.MuiTableHead-root .MuiTableCell-root': {
      backgroundColor: tableBackground,
      fontWeight: theme.typography.fontWeightSemiBold,
    },

    '.MuiBox-root': {
      backgroundColor: tableBackground,
    },
  };
});

export const ToolbarContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
}));

export const FiltersContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap', // Narrow (tablet) tables wrap filters instead of clipping the last ones
  gap: theme.spacing(1),
  alignItems: 'center',
}));

export const EmptyWidgetWrapper = styled(WidgetWrapper)({
  height: '100%',
});

export const DownloadIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: theme.spacing(1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.text.primary, 0.1),
    color: alpha(theme.palette.text.primary, 0.9),
  },
  '&:disabled': {
    color: theme.palette.action.disabled,
  },
}));

export const DownloadLabel = styled(Typography)({
  display: 'inline',
});

export const EmptyStateWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
