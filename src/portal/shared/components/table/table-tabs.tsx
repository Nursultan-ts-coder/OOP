import type { SyntheticEvent } from 'react';
import { useState } from 'react';

import AppCard from '../app-card';
import { Tab, Tabs } from '../tabs';
import { ToolbarContainer } from './table.styled';

type TableTabsProps = {
  tabs: { label: string; children: React.ReactNode; title: string; description: string }[];
} & (
  | {
      /**
       * `title`: the active tab's label and description head the card, with the tabs on the right.
       * `tabs`: the tabs head the card on the left, with no title, and `headerActions` on the right.
       * @default 'title'
       */
      header?: 'title';
      headerActions?: never;
    }
  | {
      header: 'tabs';
      /** Content on the tabs' row, aligned to the right. */
      headerActions?: React.ReactNode;
    }
);

const TableWrapper = ({ tabs, header = 'title', headerActions }: TableTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const headerTabsNode = (
    <Tabs value={activeTab} onChange={handleTabChange} hasBorder>
      {tabs.map((tab) => (
        <Tab key={tab.label} label={tab.label} />
      ))}
    </Tabs>
  );

  if (header === 'tabs') {
    return (
      <AppCard>
        <ToolbarContainer sx={{ marginBottom: 1.25 }}>
          {headerTabsNode}
          {headerActions}
        </ToolbarContainer>
        {tabs[activeTab]?.children}
      </AppCard>
    );
  }

  return (
    <>
      <AppCard
        title={tabs[activeTab]?.label}
        subtitle={tabs[activeTab]?.description}
        actions={headerTabsNode}
      >
        {tabs[activeTab]?.children}
      </AppCard>
    </>
  );
};

export default TableWrapper;
