import { Tooltip } from '@mui/material';
import React from 'react';

import FileDownload from '../../../app/assets/icons/file-download.svg?react';
import { DownloadIconButton, DownloadLabel } from './table.styled';

export interface DownloadButtonProps {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick, label, disabled = false }) => {
  // One string for the tooltip and the accessible name, so the name matches what sighted users see.
  const actionLabel = label || 'Export data';

  return (
    <Tooltip title={actionLabel}>
      <div>
        <DownloadIconButton
          onClick={onClick}
          disabled={disabled}
          size="small"
          aria-label={actionLabel}
        >
          <FileDownload width={24} height={24} />
        </DownloadIconButton>
        <DownloadLabel>{label}</DownloadLabel>
      </div>
    </Tooltip>
  );
};

export default DownloadButton;
