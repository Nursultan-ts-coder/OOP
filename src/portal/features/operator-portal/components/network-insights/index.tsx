import AppCard from '@/shared/components/app-card';

import type { NetworkInsight } from '../../types/portal';
import RecordList from '../record-list';

/** What the network analysis noticed, newest first. */
const NetworkInsights = ({ insights }: { insights: NetworkInsight[] }) => (
  <AppCard title="Network insights" subtitle={`${insights.length} findings`}>
    <RecordList
      label="Network insights"
      records={insights.map((insight) => ({
        id: insight.id,
        tone: 'warning',
        title: insight.description,
        meta: insight.timeAgo,
        testId: `row-insight-${insight.id}`,
      }))}
    />
  </AppCard>
);

export default NetworkInsights;
