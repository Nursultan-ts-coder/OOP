import type { StatusTone } from '../../types/portal';
import { toneToLabel } from '../../utils/status';
import { ChipDot, ChipRoot } from './status-chip.styled';

export interface StatusChipProps {
  tone: StatusTone;
  /** The text on the chip; defaults to the tone's own name (Healthy, Warning, …). */
  label?: string;
  /** A bigger chip, for roomier spots such as the map's info window. */
  isLarge?: boolean;
}

/** A status as text and color, never color alone. */
const StatusChip = ({ tone, label = toneToLabel(tone), isLarge = false }: StatusChipProps) => (
  <ChipRoot tone={tone} isLarge={isLarge}>
    <ChipDot aria-hidden="true" />
    {label}
  </ChipRoot>
);

export default StatusChip;
