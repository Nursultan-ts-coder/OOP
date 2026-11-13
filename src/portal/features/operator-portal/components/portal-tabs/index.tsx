import type { ReactElement, SyntheticEvent } from 'react';

import { BrandTab, BrandTabs } from './portal-tabs.styled';

export interface PortalTabItem<Key extends string> {
  key: Key;
  label: string;
  icon?: ReactElement;
  /** A tab that shows but can't be picked yet. */
  isDisabled?: boolean;
  /** Shown as the tab's tooltip, e.g. why it is disabled. */
  title?: string;
}

export interface PortalTabsProps<Key extends string> {
  items: PortalTabItem<Key>[];
  value: Key;
  onChange: (key: Key) => void;
  /** The accessible name of the tab set. */
  label: string;
  /** Pairs the tabs with `TabPanel`s of the same prefix; omit when the tabs switch pages. */
  idPrefix?: string;
}

/** The Next app's pill tabs (grafana's tabs, with the chosen one in the brand yellow). */
function PortalTabs<Key extends string>({
  items,
  value,
  onChange,
  label,
  idPrefix,
}: PortalTabsProps<Key>) {
  const handleChange = (_event: SyntheticEvent, next: Key) => onChange(next);

  return (
    <BrandTabs
      value={value}
      onChange={handleChange}
      aria-label={label}
      idPrefix={idPrefix}
      hasBorder
    >
      {items.map((item) => (
        <BrandTab
          key={item.key}
          value={item.key}
          label={item.label}
          icon={item.icon}
          iconPosition="start"
          disabled={item.isDisabled}
          title={item.title}
        />
      ))}
    </BrandTabs>
  );
}

export default PortalTabs;
