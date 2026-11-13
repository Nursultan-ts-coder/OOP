import React from 'react';

import { ProgressBarRoot, ProgressListRoot } from './progress-bar.styled';
import type { ProgressItemProps } from './progress-item';
import ProgressItem from './progress-item';

export type { ProgressItemProps } from './progress-item';

/** True when every item is at zero, i.e. there is nothing to show as a breakdown. */
export const isProgressEmpty = (items: Pick<ProgressItemProps, 'value'>[]): boolean =>
  items.every((item) => item.value === 0);

type ProgressListProps = {
  items: ProgressItemProps[];
  fitLabels: boolean;
};

type ProgressBarProps = {
  items: ProgressItemProps[];

  fitLabels?: boolean;
};

const ProgressList: React.FC<ProgressListProps> = ({ items, fitLabels }) => (
  <ProgressListRoot fitLabels={fitLabels}>
    {items.map((item, idx) => (
      <ProgressItem key={idx} {...item} />
    ))}
  </ProgressListRoot>
);

const ProgressBar: React.FC<ProgressBarProps> = ({ items, fitLabels = false }) => {
  return (
    <ProgressBarRoot fitLabels={fitLabels}>
      <ProgressList items={items} fitLabels={fitLabels} />
    </ProgressBarRoot>
  );
};

export default ProgressBar;
