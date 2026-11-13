import { Skeleton, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

import AppCard from '@/shared/components/app-card';

import { getWidgetErrorMessage } from './get-widget-error-message';
import {
  WidgetEmptyIcon,
  WidgetErrorIcon,
  WidgetGlassRoot,
  WidgetPlainRoot,
  WidgetSkeletonContent,
  WidgetStateContainer,
} from './widget-wrapper.styled';

export const DEFAULT_EMPTY_TITLE = 'No data available';
export const DEFAULT_EMPTY_DESCRIPTION = 'There is no data to display.';
export const DEFAULT_ERROR_TITLE = 'Unable to load data';
const DEFAULT_WIDGET_BODY_HEIGHT = 200;

export interface WidgetWrapperProps {
  /** The widget's pure presentation, rendered only once data is loaded and non-empty. */
  children?: React.ReactNode;
  title?: string;
  subtitle?: string | null;
  tooltip?: string;
  actions?: React.ReactNode;
  /** Show the loading skeleton. Feed it `isInitialLoading` (optionally `|| isRefetching`). */
  isLoading?: boolean;
  /** React Query `error`, passed through untouched; mapped to a message here. */
  error?: unknown;
  /** Show the "no data" placeholder. Decide it with `hasValue`/`isMissing`, not truthiness. */
  isEmpty?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  /** Minimum body height for the loading, error and empty states. */
  height?: number;
  /**
   * `card` frames the widget in an `AppCard` with its header.
   * `glass` frames the widget in the translucent, blurred `GlassCard` panel (no header).
   * `plain` renders only the state body, for widgets already inside a card (e.g. a tab panel).
   * @default 'card'
   */
  variant?: 'card' | 'glass' | 'plain';
  className?: string;
  sx?: SxProps<Theme>;
}

type WidgetBodyProps = Pick<
  WidgetWrapperProps,
  'children' | 'isLoading' | 'error' | 'isEmpty' | 'emptyTitle' | 'emptyDescription'
> & { height: number };

type WidgetStateMessageProps = {
  icon: React.ReactNode;
  title?: string;
  description?: string;
  height: number;
  role?: React.AriaRole;
};

/** Icon + title + description layout shared by the empty and error states. */
const WidgetStateMessage: React.FC<WidgetStateMessageProps> = ({
  icon,
  title,
  description,
  height,
  role,
}) => (
  <WidgetStateContainer bodyHeight={height} role={role}>
    {icon}
    <Typography
      variant="h6"
      component="p"
      color="text.primary"
      sx={(theme) => ({ fontWeight: theme.typography.fontWeightBold })}
    >
      {title}
    </Typography>
    {description && (
      <Typography variant="body1" color="text.secondary">
        {description}
      </Typography>
    )}
  </WidgetStateContainer>
);

const WidgetBody: React.FC<WidgetBodyProps> = ({
  children,
  isLoading,
  error,
  isEmpty,
  emptyTitle,
  emptyDescription,
  height,
}) => {
  if (isLoading) {
    return (
      <Skeleton variant="rounded" height={height} width="100%" animation="wave">
        <WidgetSkeletonContent>
          <Typography variant="body2" color="text.secondary">
            Loading...
          </Typography>
        </WidgetSkeletonContent>
      </Skeleton>
    );
  }

  if (error) {
    return (
      <WidgetStateMessage
        role="alert"
        icon={<WidgetErrorIcon />}
        title={DEFAULT_ERROR_TITLE}
        description={getWidgetErrorMessage(error)}
        height={height}
      />
    );
  }

  if (isEmpty) {
    return (
      <WidgetStateMessage
        icon={<WidgetEmptyIcon />}
        title={emptyTitle}
        description={emptyDescription}
        height={height}
      />
    );
  }

  return <>{children}</>;
};

/**
 * The single frame every widget renders in: one card presentation plus the loading, error
 * and empty states, so the widget itself stays pure presentation.
 *
 * @example
 * <WidgetWrapper title="Issues" isLoading={isInitialLoading} error={error} isEmpty={isEmpty}>
 *   <TrendsChart data={chartData} />
 * </WidgetWrapper>
 */
const WidgetWrapper: React.FC<WidgetWrapperProps> = ({
  children,
  title,
  subtitle,
  tooltip,
  actions,
  isLoading = false,
  error,
  isEmpty = false,
  emptyTitle = DEFAULT_EMPTY_TITLE,
  emptyDescription = DEFAULT_EMPTY_DESCRIPTION,
  height = DEFAULT_WIDGET_BODY_HEIGHT,
  variant = 'card',
  className,
  sx,
}) => {
  const body = (
    <WidgetBody
      isLoading={isLoading}
      error={error}
      isEmpty={isEmpty}
      emptyTitle={emptyTitle}
      emptyDescription={emptyDescription}
      height={height}
    >
      {children}
    </WidgetBody>
  );

  if (variant === 'glass') {
    return (
      <WidgetGlassRoot className={className} sx={sx}>
        {body}
      </WidgetGlassRoot>
    );
  }

  if (variant === 'plain') {
    return (
      <WidgetPlainRoot className={className} sx={sx}>
        {body}
      </WidgetPlainRoot>
    );
  }

  return (
    <AppCard
      title={title}
      subtitle={subtitle}
      tooltip={tooltip}
      actions={actions}
      className={className}
      sx={sx}
    >
      {body}
    </AppCard>
  );
};

export default WidgetWrapper;
