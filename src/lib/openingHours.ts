import { schedule, site } from '../data/site';

export type OpeningStatus = {
  isOpen: boolean;
  /** Restaurant-local weekday, 0 = Sunday … 6 = Saturday. */
  today: number;
  /** e.g. "Closes 9:30 PM" or "Opens Friday at 10:00 AM". */
  detail: string;
};

const DAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const DAY_NAME = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

/**
 * Weekday and minutes-past-midnight in St. Augustine for a given instant, read
 * through the Intl time-zone database so daylight saving is handled for us.
 * Returns null when the browser cannot resolve the zone, in which case the UI
 * omits the live status rather than risk showing something wrong.
 */
export function restaurantLocalTime(now: Date): { day: number; minutes: number } | null {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: site.timeZone,
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(now);

    const get = (type: Intl.DateTimeFormatPartTypes) =>
      parts.find((part) => part.type === type)?.value;

    const day = DAY_INDEX[get('weekday') ?? ''];
    const hour = Number(get('hour'));
    const minute = Number(get('minute'));

    if (day === undefined || Number.isNaN(hour) || Number.isNaN(minute)) return null;
    return { day, minutes: (hour % 24) * 60 + minute };
  } catch {
    return null;
  }
}

export function formatTime(minutesPastMidnight: number): string {
  const hour24 = Math.floor(minutesPastMidnight / 60);
  const minute = minutesPastMidnight % 60;
  const suffix = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${String(minute).padStart(2, '0')} ${suffix}`;
}

/** Open/closed state for an instant, using the published schedule. */
export function openingStatusAt(now: Date): OpeningStatus | null {
  const local = restaurantLocalTime(now);
  if (!local) return null;

  const todayShift = schedule[local.day];

  if (local.minutes >= todayShift.open && local.minutes < todayShift.close) {
    return {
      isOpen: true,
      today: local.day,
      detail: `Closes ${formatTime(todayShift.close)}`,
    };
  }

  if (local.minutes < todayShift.open) {
    return {
      isOpen: false,
      today: local.day,
      detail: `Opens today at ${formatTime(todayShift.open)}`,
    };
  }

  const nextDay = (local.day + 1) % 7;
  return {
    isOpen: false,
    today: local.day,
    detail: `Opens ${DAY_NAME[nextDay]} at ${formatTime(schedule[nextDay].open)}`,
  };
}
