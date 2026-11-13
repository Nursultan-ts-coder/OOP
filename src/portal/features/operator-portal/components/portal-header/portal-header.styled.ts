import { styled } from '@mui/material/styles';

/**
 * The Next app's page header: where you are on the left, the page's controls on the right. On the
 * page it has its own row and rule; in the top bar it fills the bar's middle, a smaller title.
 */
export const HeaderRoot = styled('header', {
  shouldForwardProp: (prop) => prop !== 'isInTopBar',
})<{ isInTopBar: boolean }>(({ theme, isInTopBar }) =>
  isInTopBar
    ? {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(2),
        minWidth: 0,
        '& .MuiBreadcrumbs-root': { fontSize: theme.typography.pxToRem(16) },
      }
    : {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: theme.spacing(1.25, 2),
        padding: theme.spacing(1.5, 0, 1.25),
        borderBottom: `1px solid ${theme.palette.divider}`,
      }
);

export const HeaderActions = styled('div')(({ theme }) => ({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  gap: theme.spacing(1.5),
}));
