import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Typography } from '@mui/material';

import type { CheckStatus, ServiceCheck } from '../../types/portal';
import InfoCard, { InfoCardRow } from '../info-card';
import { HealthCard, HealthHead, SummaryBar, SummarySegment } from './checks-summary.styled';

const count = (checks: ServiceCheck[], status: CheckStatus) =>
  checks.filter((check) => check.status === status).length;

const percent = (part: number, total: number) => (total ? (part / total) * 100 : 0);

/** How many checks pass, warn and fail, and the share that passes. */
const ChecksSummary = ({ checks }: { checks: ServiceCheck[] }) => {
  const total = checks.length;
  const pass = count(checks, 'Pass');
  const warn = count(checks, 'Warn');
  const fail = count(checks, 'Fail');
  const healthPercent = Math.round(percent(pass, total));

  return (
    <InfoCardRow data-testid="checks-summary">
      <InfoCard icon={<FactCheckOutlinedIcon />} label="Checks" value={total} detail="monitored" />
      <InfoCard
        icon={<CheckCircleOutlineIcon />}
        label="Pass"
        value={pass}
        tone="success"
        hasChip={false}
      />
      <InfoCard
        icon={<WarningAmberIcon />}
        label="Warn"
        value={warn}
        tone="warning"
        hasChip={false}
      />
      <InfoCard
        icon={<ErrorOutlineIcon />}
        label="Fail"
        value={fail}
        tone="error"
        hasChip={false}
      />
      <HealthCard variant="glass">
        <HealthHead>
          Health <b>{healthPercent}%</b>
        </HealthHead>
        <SummaryBar role="img" aria-label={`${pass} pass, ${warn} warn, ${fail} fail`}>
          <SummarySegment sx={{ width: `${percent(pass, total)}%`, bgcolor: 'success.main' }} />
          <SummarySegment sx={{ width: `${percent(warn, total)}%`, bgcolor: 'warning.main' }} />
          <SummarySegment sx={{ width: `${percent(fail, total)}%`, bgcolor: 'error.main' }} />
        </SummaryBar>
        <Typography variant="caption" color="text.secondary">
          {pass} pass · {warn} warn · {fail} fail
        </Typography>
      </HealthCard>
    </InfoCardRow>
  );
};

export default ChecksSummary;
