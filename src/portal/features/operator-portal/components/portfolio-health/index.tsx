import { Typography } from '@mui/material';

import AppCard from '@/shared/components/app-card';

import type { PortfolioSummary } from '../../types/portal';
import DetailRows from '../detail-rows';
import { HealthBar, HealthRow } from './portfolio-health.styled';

interface PortfolioHealthProps {
  summary: PortfolioSummary;
}

/** The share of healthy restaurants, with the totals beside it. */
const PortfolioHealth = ({ summary }: PortfolioHealthProps) => (
  <AppCard title="Portfolio health">
    <HealthRow>
      <HealthBar
        variant="determinate"
        color="success"
        value={summary.healthPercent}
        aria-label="Healthy restaurants"
      />
      <Typography variant="subtitle1" component="span" fontWeight="bold">
        {summary.healthPercent}%
      </Typography>
    </HealthRow>
    <DetailRows
      rows={[
        { label: 'Total stores', value: summary.total },
        { label: 'Open issues', value: summary.openIssues, color: 'warning.main' },
        { label: 'Region', value: summary.region },
      ]}
    />
  </AppCard>
);

export default PortfolioHealth;
