/** The y axis of an uptime chart: from a whole percent under the lowest value up to 100%. */
export function uptimeAxisRange(values: number[]): { min: number; max: number } {
  const finite = values.filter((value) => Number.isFinite(value));
  if (finite.length === 0) return { min: 0, max: 100 };
  const lowest = Math.min(...finite);
  return { min: Math.max(Math.floor(lowest) - 1, 0), max: 100 };
}
