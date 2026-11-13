import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import type { PortfolioSummary as PortfolioSummaryData } from '../../types/portal';
import InfoCard, { InfoCardRow } from '../info-card';

interface PortfolioSummaryProps {
  summary: PortfolioSummaryData;
}

/** The portfolio's restaurant counts by status, as the Next app's info card row. */
const PortfolioSummary = ({ summary }: PortfolioSummaryProps) => (
  <InfoCardRow data-testid="portfolio-summary">
    <InfoCard
      icon={<StorefrontOutlinedIcon />}
      label="Portfolio"
      value={`${summary.total} restaurants`}
      detail={`${summary.areaLabel} · ${summary.region}`}
      isHighlighted
    />
    <InfoCard
      icon={<CheckCircleOutlineIcon />}
      label="Healthy"
      value={summary.healthy}
      tone="success"
      hasChip={false}
    />
    <InfoCard
      icon={<WarningAmberIcon />}
      label="Degraded"
      value={summary.degraded}
      tone="warning"
      hasChip={false}
    />
    <InfoCard
      icon={<ErrorOutlineIcon />}
      label="Down"
      value={summary.down}
      tone="error"
      hasChip={false}
    />
    <InfoCard icon={<HelpOutlineIcon />} label="Unknown" value={summary.unknown} tone="neutral" />
  </InfoCardRow>
);

export default PortfolioSummary;
