import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import clamp from 'lodash/clamp';
import React, { useId } from 'react';

import {
  LeftLabel,
  ProgressBar,
  ProgressBarContainer,
  ProgressItemRoot,
  RightLabel,
} from './progress-item.styled';

/** `primary` is the bright `accent` blue, not the navy `palette.primary`. */
export type ProgressColorType = 'primary' | 'success' | 'warning' | 'danger' | 'secondary' | string;

export interface ProgressItemProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  value?: number;
  color?: ProgressColorType;
}

const ProgressItem: React.FC<ProgressItemProps> = ({
  left,
  right,
  value = 0,
  color = 'primary',
}) => {
  const theme = useTheme();
  const labelId = useId();

  const predefinedColors: Record<string, string> = {
    primary: theme.palette.accent.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    danger: theme.palette.error.main,
    secondary: theme.palette.secondary.main,
  };

  // `color` may be a predefined semantic name or a custom hex/rgb value passed by the caller
  const barColor = predefinedColors[color] ?? color;

  return (
    <ProgressItemRoot>
      {left && (
        <LeftLabel id={labelId}>
          {typeof left === 'string' ? (
            <Typography variant="body2" noWrap>
              {left}
            </Typography>
          ) : (
            left
          )}
        </LeftLabel>
      )}

      <ProgressBarContainer>
        <ProgressBar
          variant="determinate"
          value={clamp(value, 0, 100)}
          barColor={barColor}
          aria-labelledby={left ? labelId : undefined}
        />
      </ProgressBarContainer>

      {right && (
        <RightLabel>
          {typeof right === 'string' ? <Typography variant="body2">{right}</Typography> : right}
        </RightLabel>
      )}
    </ProgressItemRoot>
  );
};

export default ProgressItem;
