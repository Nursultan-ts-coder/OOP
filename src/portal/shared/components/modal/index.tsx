import CloseIcon from '@mui/icons-material/Close';
import type { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

import Button, { type ButtonProps } from '../button';
import GlassCard from '../glass-card';
import { CloseButton, StyledDialog, Subtitle, Title } from './modal.styled';

// Duck-typed rather than `instanceof Promise` so any thenable (e.g. a value crossing a
// realm boundary, or a non-native Promise polyfill/wrapper) is still recognized as async.
// Per the spec a thenable can be a function with a callable `.then` (not just a plain
// object), so both typeofs are checked here.
const isThenable = (value: unknown): value is PromiseLike<void> =>
  (typeof value === 'object' || typeof value === 'function') &&
  value !== null &&
  typeof (value as PromiseLike<void>).then === 'function';

/** Which footer buttons a `Modal` renders; `none` drops the footer entirely. */
export type ModalFooterButtons = 'both' | 'cancel' | 'confirm' | 'none';

export interface ModalProps extends Omit<MuiDialogProps, 'open' | 'children'> {
  isOpen: boolean;
  onClose: () => void;
  // A thenable-returning `onConfirm` (e.g. an API call) defers closing the dialog until it
  // settles — resolving closes it, rejecting leaves it open with the caller's state intact so
  // the caller can show an error (typically a toast) and let the user retry without re-entering
  // their input. A synchronous (void-returning) `onConfirm` closes immediately, as before.
  onConfirm?: () => void | PromiseLike<void>;
  title?: string;
  /** A secondary line under the title. Ignored if `title` is omitted. */
  subtitle?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  /**
   * `both` renders Cancel and Confirm, `cancel` or `confirm` renders that button alone, and
   * `none` renders no footer (for a dialog whose content holds its own actions).
   * @default 'both'
   */
  footerButtons?: ModalFooterButtons;
  // When false, `onConfirm` runs but the dialog stays open afterward regardless of a sync
  // return or a resolved promise — for a confirm slot repurposed as an in-place mode switch
  // (e.g. a "view → edit" toggle) rather than an action that finishes the dialog. Defaults to
  // true, preserving the normal confirm-then-close behavior.
  shouldCloseOnConfirm?: boolean;
  /** Renders the top-right close (X) button. Shown by default whenever the dialog is open. */
  hasCloseButton?: boolean;
  children?: React.ReactNode;
  confirmButtonProps?: Partial<ButtonProps>;
  cancelButtonProps?: Partial<ButtonProps>;
}

/**
 * The app's single Dialog-based modal — every modal in the app should render through this
 * component (directly, or via a thin wrapper) rather than styling its own `Dialog`, so the
 * header/close-button/scrollable-content/footer chrome and its behavior (scroll containment,
 * confirm-then-close semantics) stay consistent and only need fixing in one place.
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  subtitle,
  description,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  footerButtons = 'both',
  shouldCloseOnConfirm = true,
  hasCloseButton = true,
  children,
  maxWidth = 'xs',
  fullWidth = true,
  confirmButtonProps,
  cancelButtonProps,
  ...rest
}) => {
  const titleId = React.useId();
  const descriptionId = React.useId();
  const hasCancelButton = footerButtons === 'both' || footerButtons === 'cancel';
  const hasConfirmButton = footerButtons === 'both' || footerButtons === 'confirm';

  const handleConfirm = () => {
    const result = onConfirm?.();
    if (isThenable(result)) {
      if (shouldCloseOnConfirm) {
        // Swallow the rejection here — the caller already surfaced it (e.g. via a toast) and
        // not calling `onClose` is what keeps the dialog open on failure. `PromiseLike` only
        // guarantees `.then`, so the rejection handler is passed as `.then`'s second argument
        // rather than a chained `.catch`.
        void result.then(onClose, () => {});
      }
      return;
    }
    if (shouldCloseOnConfirm) {
      onClose();
    }
  };

  return (
    <StyledDialog
      open={isOpen}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : undefined}
      {...rest}
    >
      <GlassCard>
        {title && (
          <DialogTitle id={titleId} sx={{ pr: 5, pb: subtitle ? 0.5 : 2 }}>
            <Title component="span">{title}</Title>
          </DialogTitle>
        )}
        {title && subtitle && <Subtitle>{subtitle}</Subtitle>}
        {hasCloseButton && (
          <CloseButton aria-label="Close dialog" onClick={onClose} size="small">
            <CloseIcon fontSize="small" />
          </CloseButton>
        )}
        <DialogContent sx={{ maxHeight: '60vh' }} dividers={!!title || !!description}>
          {description && <span id={descriptionId}>{description}</span>}
          {children}
        </DialogContent>
        {footerButtons !== 'none' && (
          <DialogActions>
            {hasCancelButton && (
              <Button onClick={onClose} variant="outlined" {...cancelButtonProps}>
                {cancelText}
              </Button>
            )}
            {hasConfirmButton && (
              <Button variant="contained" onClick={handleConfirm} {...confirmButtonProps}>
                {confirmText}
              </Button>
            )}
          </DialogActions>
        )}
      </GlassCard>
    </StyledDialog>
  );
};

Modal.displayName = 'Modal';

export default Modal;
