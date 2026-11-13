import type { RefObject } from 'react';
import { useLayoutEffect, useState } from 'react';

interface FillOptions {
  /** Never shorter than this (px), e.g. on a short window. */
  minHeight: number;
  /** Space left below the element (px): the card's padding and the page's bottom margin. */
  bottomGap: number;
}

/**
 * The height (px) that makes the element reach the bottom of the window when the page is scrolled
 * to the top. Follows window resizes and layout shifts above it (e.g. a dismissed banner).
 */
export function useFillViewportHeight(
  ref: RefObject<HTMLElement | null>,
  { minHeight, bottomGap }: FillOptions
): number {
  const [height, setHeight] = useState(minHeight);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const measure = () => {
      const top = element.getBoundingClientRect().top + window.scrollY;
      setHeight(Math.max(minHeight, Math.round(window.innerHeight - top - bottomGap)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [ref, minHeight, bottomGap]);

  return height;
}
