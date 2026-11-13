/**
 * Helpers for the values that go into a generated API request.
 *
 * Generated request functions interpolate path identifiers straight into their URL
 * template (`url: \`/api/v1/metrics/site/vpn/${siteId}/\``) and hand query parameters to
 * Axios. Axios encodes query parameters, but nothing encodes the path, so identifiers
 * that can contain `#`, `/`, `?`, `&` or spaces — restaurant network names in
 * particular — must be encoded by the caller.
 */

/**
 * Encode a value for use as a dynamic path segment of a generated API URL.
 *
 * Returns an empty string for a missing identifier, which keeps the generated
 * `enabled: !!pathParam` guard disabling the query until the identifier exists.
 * Only use this for path segments; never for query parameters, which Axios already
 * encodes and would otherwise be encoded twice.
 */
export const encodePathParam = (value: string | null | undefined): string =>
  value ? encodeURIComponent(value) : '';

/**
 * True when every required request value is present.
 *
 * Presence is checked with `!= null` so that valid `0`, `false` and `''` values are
 * not mistaken for missing data — `lat: 0` is a real coordinate, not an absent one.
 */
export const areParamsPresent = (...values: unknown[]): boolean =>
  values.every((value) => value != null);
