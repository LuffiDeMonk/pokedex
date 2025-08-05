// Usage: getTimeInMs(1, 'day') => 86400000
export default function getTimeInMs(
  time: number,
  duration:
    | "seconds"
    | "minutes"
    | "hours"
    | "days"
    | "weeks"
    | "months"
    | "years"
) {
  const timeSpanInMs = {
    second: 1000,
    seconds: 1000,
    minute: 60_000,
    minutes: 60_000,
    hour: 36_00_000,
    hours: 36_00_000,
    day: 8_64_00_000,
    days: 8_64_00_000,
    week: 60_48_00_000,
    weeks: 60_48_00_000,
    month: 2_62_80_00_000,
    months: 2_62_80_00_000,
    year: 31_54_00_00_000,
    years: 31_54_00_00_000,
  };

  return time * timeSpanInMs[duration];
}
