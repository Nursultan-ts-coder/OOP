import { Tooltip } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import classNames from 'classnames';
import React from 'react';

import InfoOutlinedIcon from '@/app/assets/icons/tooltip-icon.svg?react';

import {
  AppCardActions,
  AppCardDescription,
  AppCardHeader,
  AppCardInfoButton,
  AppCardRoot,
  AppCardTitle,
} from './app-card.styled';

export interface AppCardProps {
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;

  /**
   * Additional MUI `sx` styles for the card root.
   */
  sx?: SxProps<Theme>;

  /**
   * Whether to include padding inside the card.
   * @default true
   */
  hasPadding?: boolean;

  title?: string;
  tooltip?: string;
  subtitle?: string | null;
  height?: number;

  /**
   * Alignment of the header content.
   * @default 'space-between'
   */
  headerJustify?: 'space-between' | 'flex-start';
}

/** The app's widget card (`<Card variant="widget">`) with an optional title row. */
const AppCard: React.FC<AppCardProps> = ({
  children,
  className,
  title,
  subtitle,
  height,
  actions,
  tooltip,
  hasPadding = true,
  headerJustify,
  ...props
}) => {
  return (
    <AppCardRoot
      variant="widget"
      cardHeight={height}
      hasCardPadding={hasPadding}
      className={classNames(className)}
      {...props}
    >
      {(title || subtitle || actions) && (
        <AppCardHeader justify={headerJustify}>
          <div>
            {title && (
              <AppCardTitle>
                {title}

                {tooltip && (
                  // describeChild keeps the help text as the description, not the button's name.
                  <Tooltip title={tooltip} arrow describeChild>
                    <AppCardInfoButton disableRipple aria-label={`About ${title}`}>
                      <InfoOutlinedIcon fontSize="large" />
                    </AppCardInfoButton>
                  </Tooltip>
                )}
              </AppCardTitle>
            )}
            {subtitle && <AppCardDescription>{subtitle}</AppCardDescription>}
          </div>

          {actions && <AppCardActions>{actions}</AppCardActions>}
        </AppCardHeader>
      )}

      {children}
    </AppCardRoot>
  );
};

export default AppCard;
