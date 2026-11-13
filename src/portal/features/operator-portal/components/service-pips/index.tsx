import type { StoreServices } from '../../types/portal';
import {
  devicesToTone,
  internetStateToTone,
  routingStateToTone,
  toneToLabel,
} from '../../utils/status';
import { Pip, PipDot, PipList } from './service-pips.styled';

interface ServicePipsProps {
  services: StoreServices;
  /** "5/5 Dev" on cards, "5/5" in the table. */
  isCompact?: boolean;
  /** Bigger text and dots, for roomier spots such as the map's info window. */
  isLarge?: boolean;
}

/** A restaurant's three services at a glance: internet, devices online and routing. */
const ServicePips = ({ services, isCompact = false, isLarge = false }: ServicePipsProps) => {
  const { online, total } = services.devices;
  const pips = [
    { key: 'internet', label: 'Internet', tone: internetStateToTone(services.internet) },
    {
      key: 'devices',
      label: isCompact ? `${online}/${total}` : `${online}/${total} Dev`,
      tone: devicesToTone(online, total),
    },
    { key: 'routing', label: 'Routing', tone: routingStateToTone(services.routing) },
  ];

  return (
    <PipList>
      {pips.map((pip) => (
        <Pip key={pip.key} isLarge={isLarge} title={`${pip.label}: ${toneToLabel(pip.tone)}`}>
          <PipDot tone={pip.tone} isLarge={isLarge} aria-hidden="true" />
          {pip.label}
        </Pip>
      ))}
    </PipList>
  );
};

export default ServicePips;
