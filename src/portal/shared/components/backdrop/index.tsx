import { CircularProgress } from '@mui/material';
import React from 'react';

import { BackdropContent, BackdropMessage, StyledBackdrop } from './backdrop.styled';

interface BackdropProps {
  isOpen: boolean;
  onClick?: () => void;
  message?: string;
}
const defaultMessage = 'Loading...';

const Backdrop: React.FC<BackdropProps> = ({ isOpen, message = defaultMessage }) => {
  if (!isOpen) return null;

  return (
    <StyledBackdrop open={true}>
      <BackdropContent>
        <CircularProgress color="inherit" size={40} />
        <BackdropMessage variant="body2">{message}</BackdropMessage>
      </BackdropContent>
    </StyledBackdrop>
  );
};

export default Backdrop;
