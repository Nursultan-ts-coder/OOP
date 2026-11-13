import TextSnippetIcon from '@mui/icons-material/Description';
import TableViewIcon from '@mui/icons-material/TableView';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

import { ExportFormat } from '@/api/generated';
import Modal from '@/shared/components/modal';

export interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onExportFormatChange?: (format: ExportFormat) => void;
}

const ExportDialog: React.FC<ExportDialogProps> = ({ isOpen, onClose, onExportFormatChange }) => {
  const handleExportFormat = (format: ExportFormat) => {
    onExportFormatChange?.(format);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Data" footerButtons="none">
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleExportFormat(ExportFormat.excel)}>
            <ListItemIcon>
              <TableViewIcon />
            </ListItemIcon>
            <ListItemText primary="Export as Excel" secondary="Export table data in Excel format" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleExportFormat(ExportFormat.csv)}>
            <ListItemIcon>
              <TextSnippetIcon />
            </ListItemIcon>
            <ListItemText primary="Export as CSV" secondary="Export table data in CSV format" />
          </ListItemButton>
        </ListItem>
      </List>
    </Modal>
  );
};

export default ExportDialog;
