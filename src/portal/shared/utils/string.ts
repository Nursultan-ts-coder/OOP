export function truncateString(
  str: string | null | undefined,
  maxLength: number
): string | null | undefined {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}
