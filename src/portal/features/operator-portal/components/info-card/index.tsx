import type { ReactNode } from 'react';

import type { StatusTone } from '../../types/portal';
import StatusChip from '../status-chip';
import {
  InfoCardBadge,
  InfoCardDetail,
  InfoCardFoot,
  InfoCardHead,
  InfoCardLabel,
  InfoCardRoot,
  InfoCardText,
  InfoCardValue,
} from './info-card.styled';

export { InfoCardRow } from './info-card.styled';

export interface InfoCardProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  /** A short line under the value. */
  detail?: string;
  /** Colors the icon badge, and adds a status chip. Neutral keeps the card plain. */
  tone?: StatusTone;
  /** Text of the status chip; without it the chip names the tone. */
  chipLabel?: string;
  /** False leaves the chip out (the label already names the status, e.g. "Healthy"). */
  hasChip?: boolean;
  /** The card that names the subject (the restaurant, the portfolio), in the brand yellow. */
  isHighlighted?: boolean;
}

/**
 * A stat card in the Figma "Dashboard Cards" style: a round tinted icon badge beside a large value
 * over its label, and, as the Figma statistical card, a foot line with the status chip and a note.
 */
const InfoCard = ({
  icon,
  label,
  value,
  detail,
  tone,
  chipLabel,
  hasChip = true,
  isHighlighted = false,
}: InfoCardProps) => {
  const hasStatusChip = hasChip && tone !== undefined && tone !== 'neutral';
  return (
    <InfoCardRoot isHighlighted={isHighlighted}>
      <InfoCardHead>
        <InfoCardBadge tone={tone} isHighlighted={isHighlighted} aria-hidden="true">
          {icon}
        </InfoCardBadge>
        <InfoCardText>
          <InfoCardValue>{value}</InfoCardValue>
          <InfoCardLabel>{label}</InfoCardLabel>
        </InfoCardText>
      </InfoCardHead>
      {(hasStatusChip || detail) && (
        <InfoCardFoot>
          {hasStatusChip && <StatusChip tone={tone} label={chipLabel} />}
          {detail && <InfoCardDetail>{detail}</InfoCardDetail>}
        </InfoCardFoot>
      )}
    </InfoCardRoot>
  );
};

export default InfoCard;
