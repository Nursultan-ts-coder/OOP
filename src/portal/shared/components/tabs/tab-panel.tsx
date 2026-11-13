import { PanelContent } from './tabs.styled';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  /** Same value as the `idPrefix` of the `Tabs` that control this panel. */
  idPrefix: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, idPrefix, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${idPrefix}-tabpanel-${index}`}
      aria-labelledby={`${idPrefix}-tab-${index}`}
      {...other}
    >
      {value === index && <PanelContent>{children}</PanelContent>}
    </div>
  );
}

export { TabPanel };
