import getTimeInMs from "./get-time-in-ms";

const staleTimeDuration = {
  Infinity: Infinity,
  "10s": getTimeInMs(10, "seconds"),
  "30s": getTimeInMs(30, "seconds"),
  "1m": getTimeInMs(1, "minutes"),
  "5m": getTimeInMs(5, "minutes"),
};

/**
 * Returns the stale time duration (in milliseconds) for a query
 * based on a predefined set of durations.
 *
 * This function is typically used to configure stale times for data-fetching
 * libraries like React Query, allowing queries to remain "fresh" for a specified
 * amount of time before being marked as stale.
 *
 * @param {keyof typeof staleTimeDuration} duration - A key representing the desired stale time.
 *        Accepted values: `'Infinity'`, `'30s'`, `'1m'`, `'5m'`.
 *
 * @returns {number} The stale time in milliseconds, or `Infinity` for non-expiring queries.
 *
 * @example
 * const staleTime = getQueryStaleTime('5m'); // returns 300000ms
 */
export const getQueryStaleTime = (duration: keyof typeof staleTimeDuration) =>
  staleTimeDuration[duration];
