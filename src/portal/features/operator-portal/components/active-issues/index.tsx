import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import AppCard from '@/shared/components/app-card';

import { restaurantPath } from '../../const/paths';
import type { ActiveIssue } from '../../types/portal';
import { severityToTone } from '../../utils/status';
import RecordList from '../record-list';
import SeverityIcon from '../severity-icon';
import StatusChip from '../status-chip';

interface ActiveIssuesProps {
  storeId: string;
  issues: ActiveIssue[];
}

/** The restaurant's open issues, each linking to its findings on the Insights tab. */
const ActiveIssues = ({ storeId, issues }: ActiveIssuesProps) => (
  <AppCard
    title="Active issues"
    actions={
      <StatusChip tone={issues.length ? 'warning' : 'success'} label={`${issues.length} open`} />
    }
  >
    <RecordList
      label="Active issues"
      records={issues.map((issue) => ({
        id: issue.id,
        tone: severityToTone(issue.severity),
        icon: <SeverityIcon severity={issue.severity} />,
        title: issue.title,
        testId: `issue-row-${issue.id}`,
        details: (
          <>
            <StatusChip tone={severityToTone(issue.severity)} label={issue.severity} />
            {issue.category}
          </>
        ),
        meta: (
          <>
            {issue.timeAgo}
            <Link
              component={RouterLink}
              to={restaurantPath(storeId, 'insights')}
              underline="hover"
              color="info.main"
              sx={{ display: 'inline-flex', alignItems: 'center' }}
            >
              View in Insights
              <ArrowForwardIcon fontSize="inherit" />
            </Link>
          </>
        ),
      }))}
    />
  </AppCard>
);

export default ActiveIssues;
