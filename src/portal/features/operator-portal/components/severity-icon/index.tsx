import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import type { IssueSeverity } from '../../types/portal';

/** A severity's icon shape, so it reads without its color; named for screen readers. */
const SeverityIcon = ({ severity }: { severity: IssueSeverity }) => {
  switch (severity) {
    case 'Critical':
      return <ErrorOutlineIcon color="error" fontSize="small" titleAccess="Critical" />;
    case 'Warning':
      return <WarningAmberIcon color="warning" fontSize="small" titleAccess="Warning" />;
    case 'Info':
    default:
      return <InfoOutlinedIcon color="info" fontSize="small" titleAccess="Info" />;
  }
};

export default SeverityIcon;
