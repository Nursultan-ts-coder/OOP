import { type ButtonProps as MuiButtonProps } from '@mui/material/Button';
import * as React from 'react';

import { StyledButton } from './button.styled';

export type ButtonProps = Omit<MuiButtonProps, 'size'> & {
  tSize?: 'sm' | 'md' | 'lg';
};

const sizeMap = {
  sm: 'small',
  md: 'medium',
  lg: 'large',
} as const;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { tSize = 'md', className, children, variant = 'text', ...rest } = props;
  const t = (tSize ?? 'md') as NonNullable<ButtonProps['tSize']>;
  return (
    <StyledButton
      ref={ref}
      className={className}
      size={sizeMap[t]}
      variant={variant}
      tSize={t}
      {...rest}
    >
      {children}
    </StyledButton>
  );
});

Button.displayName = 'Button';

export default Button;
