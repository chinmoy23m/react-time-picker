import { TimeValue } from './types';

/**
 * Parses a time string and returns a TimeValue object
 */
export function parseTimeString(timeString: string, format12Hour: boolean = false): TimeValue | null {
  if (!timeString) return null;

  const timeRegex = format12Hour 
    ? /^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)$/i
    : /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/;

  const match = timeString.trim().match(timeRegex);
  if (!match) return null;

  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const seconds = match[3] ? parseInt(match[3], 10) : 0;
  const period = format12Hour ? (match[4]?.toUpperCase() as 'AM' | 'PM') : undefined;

  // Validate ranges
  if (format12Hour) {
    if (hours < 1 || hours > 12) return null;
  } else {
    if (hours < 0 || hours > 23) return null;
  }
  
  if (minutes < 0 || minutes > 59) return null;
  if (seconds < 0 || seconds > 59) return null;

  return { hours, minutes, seconds, period };
}

/**
 * Formats a TimeValue object to a time string
 */
export function formatTimeValue(timeValue: TimeValue, format12Hour: boolean = false, showSeconds: boolean = false): string {
  if (!timeValue) return '';

  const { hours, minutes, seconds, period } = timeValue;

  if (format12Hour) {
    const timeStr = showSeconds 
      ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`
      : `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
    return timeStr;
  } else {
    const timeStr = showSeconds
      ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      : `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return timeStr;
  }
}

/**
 * Converts 12-hour format to 24-hour format
 */
export function convertTo24Hour(hours: number, period: 'AM' | 'PM'): number {
  if (period === 'AM') {
    return hours === 12 ? 0 : hours;
  } else {
    return hours === 12 ? 12 : hours + 12;
  }
}

/**
 * Converts 24-hour format to 12-hour format
 */
export function convertTo12Hour(hours: number): { hours: number; period: 'AM' | 'PM' } {
  if (hours === 0) {
    return { hours: 12, period: 'AM' };
  } else if (hours < 12) {
    return { hours, period: 'AM' };
  } else if (hours === 12) {
    return { hours: 12, period: 'PM' };
  } else {
    return { hours: hours - 12, period: 'PM' };
  }
}

/**
 * Generates an array of numbers with a given step
 */
export function generateNumberArray(max: number, step: number = 1): number[] {
  const array: number[] = [];
  for (let i = 0; i < max; i += step) {
    array.push(i);
  }
  return array;
}

/**
 * Validates if a time string is in correct format
 */
export function isValidTimeString(timeString: string, format12Hour: boolean = false): boolean {
  return parseTimeString(timeString, format12Hour) !== null;
}