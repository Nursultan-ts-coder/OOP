import AppCard from '@/shared/components/app-card';

import type { CableIssue } from '../../types/portal';
import { severityToTone } from '../../utils/status';
import RecordList from '../record-list';
import SeverityIcon from '../severity-icon';
import StatusChip from '../status-chip';

interface CableIssuesProps {
  issues: CableIssue[];
  selectedId?: number;
  onSelect: (id: number) => void;
}

/** Cable faults found on the switch ports; picking one shows it in the detail panel. */
const CableIssues = ({ issues, selectedId, onSelect }: CableIssuesProps) => (
  <AppCard
    title="Cable issues"
    actions={
      <StatusChip tone={issues.length ? 'error' : 'success'} label={`${issues.length} detected`} />
    }
  >
    <RecordList
      label="Cable issues"
      selectedId={selectedId}
      onSelect={(id) => onSelect(Number(id))}
      records={issues.map((issue) => ({
        id: issue.id,
        tone: severityToTone(issue.severity),
        icon: <SeverityIcon severity={issue.severity} />,
        title: `Port ${issue.port}`,
        testId: `cable-issue-${issue.id}`,
        details: issue.description,
        meta: (
          <>
            <StatusChip tone={severityToTone(issue.severity)} label={issue.severity} />
            {issue.lastSeen}
          </>
        ),
      }))}
    />
  </AppCard>
);

export default CableIssues;
