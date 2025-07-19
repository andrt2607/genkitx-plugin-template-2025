import { toJavanese, JavaneseDate } from './javanese-calendar';

/**
 * Generates a Javanese calendar timestamp from a Gregorian date.
 *
 * @param date - The Gregorian date to convert.
 * @returns The Javanese date object.
 */
export function generateJavaneseTimestamp(date: Date): JavaneseDate {
  return toJavanese(date);
}
