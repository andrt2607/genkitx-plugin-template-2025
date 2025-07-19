/* eslint-disable max-len */

// Source: https://github.com/kalenderjawa/kalenderjawa.js
// Indonesian Javanese Calendar
// Functions to convert from Gregorian to Javanese Calendar
// (c) 2011-2022 Didit Velliz
// (c) 2018-2022 Fajar Subeki, Krisna Dinata, G無法rani Fathan
// MIT License

/**
 * @namespace JavaneseDate
 */

/**
 * @typedef {object} JavaneseDate
 * @property {number} year - The Javanese year.
 * @property {number} month - The Javanese month.
 * @property {number} day - The Javanese day.
 * @property {string} monthName - The name of the Javanese month.
 * @property {string} dayName - The name of the Javanese day.
 * @property {object} pasaran - The pasaran object.
 * @property {number} pasaran.day - The pasaran day.
 * @property {string} pasaran.name - The name of the pasaran day.
 * @property {object} wuku - The wuku object.
 * @property {number} wuku.day - The wuku day.
 * @property {string} wuku.name - The name of the wuku.
 */
export interface JavaneseDate {
    year: number;
    month: number;
    day: number;
    monthName: string;
    dayName: string;
    pasaran: {
        day: number;
        name: string;
    };
    wuku: {
        day: number;
        name: string;
    };
}

// Javanese constants
const DINTEN = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Kliwon', 'Legi', 'Pahing', 'Pon', 'Wage'];
const SASIH = [
  'Sura',
  'Sapar',
  'Mulud',
  'Bakda Mulud',
  'Jumadilawal',
  'Jumadilakir',
  'Rejeb',
  'Ruwah',
  'Pasa',
  'Sawal',
  'Dulkangidah',
  'Besar',
];
const WULAN = [
  'Sura',
  'Sapar',
  'Mulud',
  'Bakda Mulud',
  'Jumadil Awal',
  'Jumadil Akhir',
  'Rejeb',
  'Ruwah',
  'Pasa',
  'Sawal',
  'Sela',
  'Besar',
];
const WUKU = [
  'Sinta', 'Landep', 'Wukir', 'Kurantil', 'Tolu', 'Gumbreg',
  'Warigalit', 'Warigagung', 'Julungwangi', 'Sungsang', 'Galungan',
  'Kuningan', 'Langkir', 'Mandasiya', 'Julungpujut', 'Pahang',
  'Kuruwelut', 'Marakeh', 'Tambir', 'Medangkungan', 'Maktal',
  'Wuye', 'Manahil', 'Prangbakat', 'Bala', 'Wugu', 'Wayang',
  'Kulawu', 'Dukut', 'Watugunung',
];

/**
 * Check if a year is a leap year in the Javanese calendar.
 * @param {number} year - The Javanese year.
 * @returns {boolean} True if it's a leap year, false otherwise.
 */
function isJavaneseLeapYear(year: number): boolean {
  const cycle = Math.ceil((year - 1) / 8);
  const yearInCycle = year - (cycle - 1) * 8;
  return [2, 5, 8].includes(yearInCycle);
}

/**
 * Get the number of days in a Javanese month.
 * @param {number} year - The Javanese year.
 * @param {number} month - The Javanese month.
 * @returns {number} The number of days in the month.
 */
function getDaysInJavaneseMonth(year: number, month: number): number {
  if (month === 12 && isJavaneseLeapYear(year)) {
    return 30;
  }
  return month % 2 === 1 ? 30 : 29;
}

/**
 * Get the total number of days in a Javanese year.
 * @param {number} year - The Javanese year.
 * @returns {number} The total number of days in the year.
 */
function getTotalDaysInJavaneseYear(year: number): number {
  return isJavaneseLeapYear(year) ? 355 : 354;
}

/**
 * Convert a Gregorian date to a Javanese date.
 * @param {Date} date - The Gregorian date.
 * @returns {JavaneseDate} The Javanese date.
 */
export function toJavanese(date: Date): JavaneseDate {
  let julianDay = Math.floor((date.getTime() - new Date('1867-03-04T17:00:00.000Z').getTime()) / 86400000);
  let year = 1795;
  let daysInYear = getTotalDaysInJavaneseYear(year);
  while (julianDay >= daysInYear) {
    julianDay -= daysInYear;
    year += 1;
    daysInYear = getTotalDaysInJavaneseYear(year);
  }

  let month = 1;
  let daysInMonth = getDaysInJavaneseMonth(year, month);
  while (julianDay >= daysInMonth) {
    julianDay -= daysInMonth;
    month += 1;
    daysInMonth = getDaysInJavaneseMonth(year, month);
  }

  const day = julianDay + 1;
  const dayOfWeek = date.getDay();

  const pasaranDay = (dayOfWeek + 1) % 5;
  const wukuDay = Math.floor((julianDay + 1) / 7) % 30;

  return {
    year,
    month,
    day,
    monthName: WULAN[month - 1],
    dayName: DINTEN[dayOfWeek],
    pasaran: {
      day: pasaranDay,
      name: PASARAN[pasaranDay],
    },
    wuku: {
      day: wukuDay,
      name: WUKU[wukuDay],
    },
  };
}
