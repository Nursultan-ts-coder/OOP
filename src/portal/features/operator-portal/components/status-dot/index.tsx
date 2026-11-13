import type { StatusTone } from '../../types/portal';
import { Dot } from './status-dot.styled';

/** A status color dot, as the Next app's StatusIcon; always shown beside the status's name. */
const StatusDot = ({ tone }: { tone: StatusTone }) => <Dot tone={tone} aria-hidden="true" />;

export default StatusDot;
