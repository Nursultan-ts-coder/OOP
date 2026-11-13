import AppCard from '@/shared/components/app-card';
import WidgetWrapper from '@/shared/components/widget-wrapper';

import type { CableIssue, TimelineEvent } from '../../types/portal';
import { severityToTone, timelineLevelToTone, toneToColor } from '../../utils/status';
import DetailRows from '../detail-rows';
import StatusChip from '../status-chip';
import {
  SectionHeading,
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineText,
} from './issue-detail.styled';

interface IssueDetailProps {
  issue?: CableIssue;
  timeline: TimelineEvent[];
}

/** The picked cable issue in full, and the restaurant's event timeline. */
const IssueDetail = ({ issue, timeline }: IssueDetailProps) => {
  if (!issue) {
    return (
      <WidgetWrapper
        title="Issue detail"
        isEmpty
        emptyTitle="Select an issue"
        emptyDescription="Pick a cable issue to see its details."
        height={160}
      />
    );
  }

  const tone = severityToTone(issue.severity);

  return (
    <AppCard
      title="Issue detail"
      subtitle={`Port ${issue.port} · ${issue.device}`}
      actions={<StatusChip tone={tone} label={issue.severity} />}
    >
      <DetailRows
        rows={[
          { label: 'Type', value: issue.type },
          { label: 'Port', value: issue.port },
          { label: 'Severity', value: issue.severity, color: toneToColor(tone) },
          { label: 'First seen', value: issue.firstSeen },
          { label: 'Last seen', value: issue.lastSeen },
          { label: 'Device', value: issue.device },
          { label: 'Status', value: issue.status },
          { label: 'Error rate', value: issue.errorRate },
        ]}
      />
      <SectionHeading>Event timeline</SectionHeading>
      <Timeline aria-label="Event timeline">
        {timeline.map((event, index) => {
          const eventTone = timelineLevelToTone(event.level);
          return (
            <TimelineItem key={`${event.time}-${index}`} data-testid={`timeline-event-${index}`}>
              <TimelineDot tone={eventTone} aria-hidden="true" />
              <TimelineText sx={{ color: toneToColor(eventTone) }}>
                {event.text}
                <time>{event.time}</time>
              </TimelineText>
            </TimelineItem>
          );
        })}
      </Timeline>
    </AppCard>
  );
};

export default IssueDetail;
