import { useState } from 'react';

import AppCard from '@/shared/components/app-card';
import WidgetWrapper from '@/shared/components/widget-wrapper';

import { useRestaurantInsights } from '../../hooks/use-restaurant-insights';
import CableIssues from '../cable-issues';
import ChecksSummary from '../checks-summary';
import IssueDetail from '../issue-detail';
import NetworkInsights from '../network-insights';
import { PageColumns, WidgetColumn } from '../section-grid/section-grid.styled';
import ServiceCheckList from '../service-check-list';

/** The info card row above has five cards; the rail is one of them wide. */
const TOP_CARD_COUNT = 5;

interface RestaurantInsightsProps {
  storeId: string;
}

/** A restaurant's Insights tab: what the checks and the network analysis found. */
const RestaurantInsights = ({ storeId }: RestaurantInsightsProps) => {
  const { data, isInitialLoading, error } = useRestaurantInsights(storeId);
  const [pickedIssueId, setPickedIssueId] = useState<number>();

  if (!data) {
    return (
      <WidgetWrapper
        title="Insights"
        isLoading={isInitialLoading}
        error={error}
        isEmpty={!isInitialLoading && !error}
      />
    );
  }

  // Until one is picked, the panel shows the most severe issue (the first listed).
  const selectedIssue =
    data.cableIssues.find((issue) => issue.id === pickedIssueId) ?? data.cableIssues[0];

  return (
    <PageColumns columns={TOP_CARD_COUNT}>
      <WidgetColumn>
        <ChecksSummary checks={data.serviceChecks} />
        <CableIssues
          issues={data.cableIssues}
          selectedId={selectedIssue?.id}
          onSelect={setPickedIssueId}
        />
        <NetworkInsights insights={data.networkInsights} />
        <AppCard title="All service checks" subtitle={`${data.serviceChecks.length} total`}>
          <ServiceCheckList checks={data.serviceChecks} columns={2} />
        </AppCard>
      </WidgetColumn>
      <WidgetColumn>
        <IssueDetail issue={selectedIssue} timeline={data.timeline} />
      </WidgetColumn>
    </PageColumns>
  );
};

export default RestaurantInsights;
