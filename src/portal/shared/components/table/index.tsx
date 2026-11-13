import type { SxProps, Theme } from '@mui/material';
import type { CSSObject } from '@mui/material/styles';
import type {
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_Row,
  MRT_RowData,
  MRT_TableState,
  MRT_Updater,
} from 'material-react-table';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import type { ExportTaskResponse, ExportTaskStatusResponse } from '@/api/generated';
import { ExportFormat, ExportTaskStatus } from '@/api/generated';
import { encodePathParam } from '@/shared/utils/api-path';

import Backdrop from '../backdrop';
import DownloadButton from './download-button';
import ExportDialog from './export-dialog';
import { getExportFileName } from './export-file-name';
import {
  EmptyStateWrapper,
  EmptyWidgetWrapper,
  FiltersContainer,
  TableWrapper,
  ToolbarContainer,
} from './table.styled';
import { renderTruncatedCell } from './truncated-cell';

export { default as TableTabs } from './table-tabs';

export interface PaginationParams {
  page: number;
  pageSize: number;
}

/** Options passed to a generated `useStart*Export` mutation hook. */
export interface StartExportOptions {
  mutation: {
    onSuccess: (data: ExportTaskResponse) => void;
    onError: () => void;
  };
}

/** Shape of a generated `useStart*Export` mutation hook, as consumed by Table. */
export type StartExportHook<TExportVariables> = (
  options: StartExportOptions
) =>
  | { mutate: (variables: TExportVariables & { exportFormat: ExportFormat }) => void }
  | null
  | undefined;

/** Shape of a generated `useExportTaskStatus*` query hook, as consumed by Table. */
export type ExportStatusHook = (
  taskId: string,
  options: {
    query: {
      enabled: boolean;
      refetchInterval: (data: ExportTaskStatusResponse | undefined) => number | false;
      onSuccess: (data: ExportTaskStatusResponse) => void;
    };
  }
) => unknown;

/** Shape of a generated `useDownloadExportFile*` query hook, as consumed by Table. */
export type DownloadExportHook = (
  taskId: string,
  options: {
    query: {
      enabled: boolean;
      onSuccess: (data: Blob) => void;
      onError: () => void;
    };
  }
) => unknown;

export interface TableProps<
  TData extends MRT_RowData,
  TExportVariables extends Record<string, unknown> = Record<string, unknown>,
> {
  data: TData[];
  columns: MRT_ColumnDef<TData>[];
  filters?: React.ReactNode;
  canExport?: boolean;
  isLoading?: boolean;
  height?: number;
  initialPageIndex?: number;
  initialPageSize?: number;
  rowCount?: number;
  pageCount?: number;
  manualPagination?: boolean;
  onPaginationParamsChange?: (params: PaginationParams) => void;
  resetTrigger?: string | number;
  activeTab?: number;
  defaultActiveTab?: number;
  onTabChange?: (event: React.SyntheticEvent, newValue: number) => void;
  tabsSx?: SxProps<Theme>;
  initialState?: Partial<MRT_TableState<TData>> | undefined;
  onRowClick?: (row: TData) => void;
  /** Extra styles for a body row, e.g. to set some rows apart. Cell backgrounds are forced with
   * `!important` (see `TableWrapper`), so a row tint must target `&& .MuiTableCell-root` with
   * `!important` too. */
  getRowStyles?: (row: TData, theme: Theme) => CSSObject | undefined;
  startExportHook?: StartExportHook<TExportVariables>;
  exportStatusHook?: ExportStatusHook;
  downloadExportHook?: DownloadExportHook;
  exportFileName?: string;
  exportOptions?: TExportVariables;
}

const defaultColumn = {
  size: 150,
  minSize: 50,
  maxSize: 1000,
  // Columns with their own `Cell` (chips, links, avatars) keep it; plain text is truncated.
  Cell: renderTruncatedCell,
};

/**
 * Viewport height the table container leaves for the fixed app bar (150px, page filters included)
 * and the card around the rows: title, toolbar and pagination. Capping the container there keeps
 * the whole table card on screen and scrolls long tables inside it, instead of growing the page.
 * MRT's own sticky-header cap only subtracts its toolbars, so the card still ran below the fold.
 */
const TABLE_VIEWPORT_OFFSET = 380;

const defaultInitialState = {
  density: 'compact',
} as const;

const Table = <
  TData extends MRT_RowData,
  TExportVariables extends Record<string, unknown> = Record<string, unknown>,
>({
  data,
  columns,
  filters,
  canExport = false,
  height = 350,
  initialPageIndex = 0,
  initialPageSize = 10,
  rowCount,
  initialState = defaultInitialState,
  pageCount,
  manualPagination = false,
  onPaginationParamsChange,
  resetTrigger,
  isLoading = false,
  onRowClick,
  getRowStyles,
  startExportHook: StartExport,
  exportStatusHook: ExportStatus,
  downloadExportHook: DownloadExport,
  exportOptions,
  exportFileName = 'export',
}: TableProps<TData, TExportVariables>) => {
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [internalPagination, setInternalPagination] = useState({
    pageIndex: initialPageIndex,
    pageSize: initialPageSize,
  });

  const [exportFormat, setExportFormat] = useState<ExportFormat | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [isDownloadReady, setIsDownloadReady] = useState(false);
  // The name the export status response suggests for the downloaded file.
  const [serverFileName, setServerFileName] = useState<string | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);

  let startExportMutation: ReturnType<StartExportHook<TExportVariables>> = null;

  if (StartExport && DownloadExport && ExportStatus) {
    startExportMutation = StartExport({
      mutation: {
        onSuccess: (data: ExportTaskResponse) => {
          if (data?.task_id) {
            setTaskId(data.task_id);
            setExportError(null);
          } else {
            setExportError('Failed to start export task.');
            setIsExporting(false);
          }
        },
        onError: () => {
          setExportError('Failed to start export task.');
          setIsExporting(false);
        },
      },
    });
    ExportStatus(encodePathParam(taskId), {
      query: {
        enabled: Boolean(taskId),
        refetchInterval: (data: ExportTaskStatusResponse | undefined) => {
          if (
            !data ||
            data.data?.status === ExportTaskStatus.completed ||
            data.data?.status === ExportTaskStatus.failed
          ) {
            return false;
          }
          return 2000;
        },
        onSuccess: (data: ExportTaskStatusResponse) => {
          if (data.data?.status === ExportTaskStatus.completed) {
            setServerFileName(data.data.file_name ?? null);
            setIsDownloadReady(true);
          } else if (data.data?.status === ExportTaskStatus.failed) {
            setExportError('Export failed.');
            setIsExporting(false);
          }
        },
      },
    });

    DownloadExport(encodePathParam(taskId), {
      query: {
        enabled: Boolean(taskId) && isDownloadReady,
        onSuccess: (data: Blob) => {
          if (data instanceof Blob) {
            const url = URL.createObjectURL(data);
            const ext = exportFormat === ExportFormat.excel ? 'xlsx' : String(exportFormat);
            const link = document.createElement('a');
            link.href = url;
            link.download = getExportFileName(serverFileName, exportFileName, ext);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            setIsExporting(false);
            setExportFormat(null);
            setTaskId(null);
            setIsDownloadReady(false);
            setServerFileName(null);
          } else {
            setExportError('Failed to download file.');
            setIsExporting(false);
          }
        },
        onError: () => {
          setExportError('Failed to download file.');
          setIsExporting(false);
        },
      },
    });
  }

  // Notify parent of initial pagination params
  React.useEffect(() => {
    if (onPaginationParamsChange && manualPagination) {
      onPaginationParamsChange({
        page: initialPageIndex + 1,
        pageSize: initialPageSize,
      });
    }
  }, []);

  React.useEffect(() => {
    if (resetTrigger !== undefined) {
      setInternalPagination({
        pageIndex: initialPageIndex,
        pageSize: initialPageSize,
      });
      if (onPaginationParamsChange && manualPagination) {
        onPaginationParamsChange({
          page: initialPageIndex + 1,
          pageSize: initialPageSize,
        });
      }
    }
  }, [resetTrigger, initialPageIndex, initialPageSize, onPaginationParamsChange, manualPagination]);

  const handleExportClick = () => {
    setIsExportDialogOpen(true);
  };

  const handleExportDialogClose = () => {
    setIsExportDialogOpen(false);
  };

  const handleExport = (format: ExportFormat) => {
    setExportFormat(format);
    setIsExporting(true);
    setExportError(null);
    setTaskId(null);
    setIsDownloadReady(false);
    if (startExportMutation) {
      // `exportOptions` is optional on TableProps but is required by the mutation.
      // Every export-enabled caller supplies it; see docs/type-safety-followups.md
      // for making that invariant compiler-enforced.
      startExportMutation.mutate({ ...exportOptions, exportFormat: format } as TExportVariables & {
        exportFormat: ExportFormat;
      });
    }
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  const renderWidgetWrapper = () => (
    <EmptyStateWrapper>
      <EmptyWidgetWrapper isEmpty={true} />
    </EmptyStateWrapper>
  );

  const containerProps = {
    ref: containerRef,
    sx: {
      position: 'relative',
      height: `auto`,
      minHeight: `${height}px`,
      // `minHeight` wins over this on short viewports, so `height` stays the floor.
      maxHeight: `calc(100vh - ${TABLE_VIEWPORT_OFFSET}px)`,
      overflowY: 'auto',
      overflowX: 'auto',
    },
  };

  const columnOptions = {
    'mrt-row-expand': {
      enableResizing: true,
    },
  };

  const handleInternalPaginationChange = (updater: MRT_Updater<MRT_PaginationState>) => {
    setInternalPagination((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;

      if (
        onPaginationParamsChange &&
        (prev.pageIndex !== next.pageIndex || prev.pageSize !== next.pageSize)
      ) {
        onPaginationParamsChange({
          page: next.pageIndex + 1,
          pageSize: next.pageSize,
        });
      }

      return next;
    });
  };

  const exportButtonLabel = exportError
    ? 'Export Failed'
    : isExporting || !StartExport || !ExportStatus || !DownloadExport
      ? 'Exporting...'
      : undefined;

  // MRT makes every body cell a tab stop with arrow-key navigation, so a clickable row is reached
  // through its cells: Enter/Space on a focused cell (or the row) opens it. Keys from controls
  // nested inside a cell (e.g. a "+N" badge) belong to that control and are left alone.
  const muiTableBodyRowProps =
    onRowClick || getRowStyles
      ? ({ row }: { row: MRT_Row<TData> }) => ({
          ...(onRowClick && {
            onClick: () => onRowClick(row.original),
            onKeyDown: (event: React.KeyboardEvent<HTMLTableRowElement>) => {
              if (event.key !== 'Enter' && event.key !== ' ') return;
              const target = event.target as HTMLElement;
              if (target !== event.currentTarget && target.parentElement !== event.currentTarget) {
                return;
              }
              event.preventDefault();
              onRowClick(row.original);
            },
          }),
          sx: (theme: Theme) => ({
            ...(onRowClick && { cursor: 'pointer' }),
            ...getRowStyles?.(row.original, theme),
          }),
        })
      : undefined;

  const table = useMaterialReactTable({
    columns,
    data,
    displayColumnDefOptions: columnOptions,
    defaultColumn,
    enableFilters: false,
    enableColumnResizing: true,
    enableGrouping: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enablePagination: true,
    paginationDisplayMode: 'pages',
    enableRowVirtualization: false,
    muiToolbarAlertBannerProps: { sx: { display: 'none' } },
    // MRT only takes the pagination out of absolute positioning below a 720px *viewport*; next to
    // the sidebar the table is narrower than that at tablet widths, the pagination wraps onto a
    // second line, and the fixed-height toolbar clipped it. The alert banner it overlays is hidden.
    muiBottomToolbarProps: {
      sx: (theme: Theme) => ({
        [theme.breakpoints.down('lg')]: {
          '& .MuiBox-root:has(> .MuiTablePagination-root)': { position: 'relative' },
        },
      }),
    },
    initialState,
    muiTableContainerProps: containerProps,
    layoutMode: 'semantic',
    manualPagination,
    ...(manualPagination && {
      state: { pagination: internalPagination },
      onPaginationChange: handleInternalPaginationChange,
      rowCount,
      pageCount: pageCount !== undefined ? pageCount : undefined,
    }),
    renderTopToolbarCustomActions: ({ table: _table }) => (
      <ToolbarContainer>
        <FiltersContainer>{filters || null}</FiltersContainer>
        {canExport && <DownloadButton onClick={handleExportClick} label={exportButtonLabel} />}
      </ToolbarContainer>
    ),
    renderEmptyRowsFallback: renderWidgetWrapper,
    muiTableBodyRowProps,
  });

  const { pageIndex, pageSize } = table.getState().pagination;

  // Rows scroll inside the container, so a new page or a filter reset starts at the first row
  // instead of keeping the previous page's scroll offset.
  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [pageIndex, pageSize, resetTrigger]);

  return (
    <>
      <TableWrapper>
        <MaterialReactTable table={table} />
        {containerRef.current &&
          createPortal(
            <Backdrop isOpen={isLoading} message="Loading data..." />,
            containerRef.current
          )}
      </TableWrapper>

      {canExport && (
        <ExportDialog
          isOpen={isExportDialogOpen}
          onClose={handleExportDialogClose}
          onExportFormatChange={handleExport}
        />
      )}
    </>
  );
};

export default Table;
