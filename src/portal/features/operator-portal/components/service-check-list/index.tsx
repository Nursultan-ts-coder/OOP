import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import type { CheckStatus, ServiceCheck } from '../../types/portal';
import { checkStatusToTone, toneToColor } from '../../utils/status';
import { CheckGrid, CheckResult, CheckRow } from './service-check-list.styled';

const CHECK_ICONS: Record<CheckStatus, typeof CheckCircleOutlineIcon> = {
  Pass: CheckCircleOutlineIcon,
  Warn: WarningAmberIcon,
  Fail: ErrorOutlineIcon,
};

interface ServiceCheckListProps {
  checks: ServiceCheck[];
  columns?: number;
}

/** Service checks with their result, as text and icon (never color alone). */
const ServiceCheckList = ({ checks, columns = 1 }: ServiceCheckListProps) => (
  <CheckGrid columns={columns} aria-label="Service checks">
    {checks.map((check) => {
      const Icon = CHECK_ICONS[check.status];
      return (
        <CheckRow
          key={check.name}
          data-testid={`check-${check.name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {check.name}
          <CheckResult sx={{ color: toneToColor(checkStatusToTone(check.status)) }}>
            <Icon fontSize="inherit" aria-hidden="true" />
            {check.status}
          </CheckResult>
        </CheckRow>
      );
    })}
  </CheckGrid>
);

export default ServiceCheckList;
