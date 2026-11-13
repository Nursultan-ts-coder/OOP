import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import type { ButtonProps } from './index';

const FIELD_HEIGHT = 45;

export const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'tSize',
})<Pick<ButtonProps, 'tSize'>>(({ theme, tSize, variant, color = 'primary' }) => {
  const size = tSize ?? 'md';

  const getPadding = () => {
    const paddingValues = {
      sm: {
        sm: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
        md: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
        lg: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
        xl: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
      },
      md: {
        sm: `${theme.spacing(0.79)} ${theme.spacing(2)}`,
        md: `${theme.spacing(0.79)} ${theme.spacing(2)}`,
        lg: `${theme.spacing(0.79)} ${theme.spacing(2)}`,
        xl: `${theme.spacing(0.79)} ${theme.spacing(2)}`,
      },
      lg: {
        sm: `${theme.spacing(1)} ${theme.spacing(3)}`,
        md: `${theme.spacing(1)} ${theme.spacing(3)}`,
        lg: `${theme.spacing(1)} ${theme.spacing(3)}`,
        xl: `${theme.spacing(1)} ${theme.spacing(3)}`,
      },
    };

    return {
      [theme.breakpoints.down('md')]: {
        padding: paddingValues[size].sm,
      },
      [theme.breakpoints.between('md', 'lg')]: {
        padding: paddingValues[size].md,
      },
      [theme.breakpoints.between('lg', 'xl')]: {
        padding: paddingValues[size].lg,
      },
      [theme.breakpoints.up('xl')]: {
        padding: paddingValues[size].xl,
      },
    };
  };

  const isContained = variant === 'contained';
  const isOutlined = variant === 'outlined';
  // A contained primary button is a `tonal` pill (navy in the dark scheme, blue[700] in the light
  // one). Other contained colors (`info` call-to-actions) keep MUI's solid fill, so their label
  // follows the fill.
  const isTonal = isContained && color === 'primary';
  const containedLabelColor = isTonal
    ? theme.palette.tonal.text
    : theme.palette.primary.contrastText;
  const labelColor = isContained ? containedLabelColor : theme.palette.text.primary;

  return {
    whiteSpace: 'nowrap',
    borderRadius: theme.shape.pill,
    color: isContained ? labelColor : theme.palette.text.inactive,
    textTransform: 'none',
    boxShadow: 'none',
    display: 'flex',
    gap: theme.spacing(0.625),
    alignItems: 'center',
    fontSize: theme.typography.body2.fontSize,
    transition: theme.transitions.create(['border-color', 'color', 'background-color']),
    minWidth: 'min-content',
    height: FIELD_HEIGHT,
    ...getPadding(),
    // MUI paints the contained fill from this variable, so its disabled style still applies.
    ...(isTonal && { '--variant-containedBg': theme.palette.tonal.background }),

    // Light scheme: Contained buttons have primary.main fill and border with contrasting label
    ...(isContained &&
      theme.palette.mode === 'light' && {
        border: `2px solid ${theme.palette.primary.main}`,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&::before': theme.mixins.sheenBorder,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
          borderColor: theme.palette.primary.dark,
          boxShadow: 'none',
        },
      }),

    // Dark scheme: Keep tonal styling for contained buttons
    ...(isContained &&
      theme.palette.mode === 'dark' && {
        '&::before': theme.mixins.sheenBorder,
        '&:hover': {
          borderColor: theme.palette.text.primary,
          boxShadow: 'none',
          color: labelColor,
          ...(isTonal && { '--variant-containedBg': theme.palette.tonal.hover }),
        },
      }),

    // Light scheme: Outlined buttons have 2px primary.main border and label
    ...(isOutlined &&
      theme.palette.mode === 'light' && {
        border: `2px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
        '&:hover': {
          borderColor: theme.palette.primary.main,
          backgroundColor: 'transparent',
        },
      }),

    '&.Mui-focusVisible': {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: 2,
    },
  };
});
