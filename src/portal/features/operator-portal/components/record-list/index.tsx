import type { ReactNode } from 'react';

import type { StatusTone } from '../../types/portal';
import {
  RecordBody,
  RecordButton,
  RecordDetails,
  RecordItem,
  RecordListRoot,
  RecordMeta,
  RecordRow,
  RecordText,
  RecordTitle,
  RecordToneBar,
} from './record-list.styled';

export interface RecordEntry {
  id: string | number;
  title: ReactNode;
  tone: StatusTone;
  /** A leading icon, e.g. the severity's. */
  icon?: ReactNode;
  /** The line under the title (category, a chip, the location). */
  details?: ReactNode;
  /** On the right: time and actions. */
  meta?: ReactNode;
  testId?: string;
}

export interface RecordListProps {
  records: RecordEntry[];
  label: string;
  /** Makes each record a button; the chosen one is `selectedId`. */
  onSelect?: (id: RecordEntry['id']) => void;
  selectedId?: RecordEntry['id'];
}

/** The Next app's record list (Records.js), each record with its status bar on the left. */
const RecordList = ({ records, label, onSelect, selectedId }: RecordListProps) => (
  <RecordListRoot aria-label={label}>
    {records.map((record) => {
      const content = (
        <>
          <RecordToneBar tone={record.tone} aria-hidden="true" />
          <RecordBody>
            {record.icon}
            <RecordText>
              <RecordTitle>{record.title}</RecordTitle>
              {record.details && <RecordDetails>{record.details}</RecordDetails>}
            </RecordText>
            {record.meta && <RecordMeta>{record.meta}</RecordMeta>}
          </RecordBody>
        </>
      );
      return (
        <RecordItem key={record.id} data-testid={record.testId}>
          {onSelect ? (
            <RecordButton
              isSelected={record.id === selectedId}
              aria-pressed={record.id === selectedId}
              onClick={() => onSelect(record.id)}
            >
              {content}
            </RecordButton>
          ) : (
            <RecordRow>{content}</RecordRow>
          )}
        </RecordItem>
      );
    })}
  </RecordListRoot>
);

export default RecordList;
