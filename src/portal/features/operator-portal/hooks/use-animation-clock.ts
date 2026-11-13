import { useEffect, useState } from 'react';

/** About 30 frames a second: smooth enough for a pulse, and cheap (as the Next map's pulse). */
const FRAME_MS = 33;

/**
 * The time in milliseconds, updated every animation frame (at most ~30 times a second) while
 * `isRunning`. Stops when the tab is hidden, as requestAnimationFrame does.
 */
export function useAnimationClock(isRunning: boolean): number {
  const [now, setNow] = useState(() => performance.now());

  useEffect(() => {
    if (!isRunning) return undefined;
    let frame = 0;
    let last = 0;
    const tick = (time: number) => {
      if (time - last >= FRAME_MS) {
        last = time;
        setNow(time);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isRunning]);

  return now;
}
