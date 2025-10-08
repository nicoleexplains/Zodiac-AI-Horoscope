// Fix: Import PlanetName from types.ts where it is defined, not from constants.ts.
import { PLANETS, CHALDEAN_ORDER, DAY_RULERS } from '../constants';
// Fix: Import PlanetaryHour from types.ts.
import type { Planet, PlanetName, PlanetaryHour } from '../types';

// --- Sunrise/Sunset Calculation (based on NOAA's method) ---
// This is a complex but standard astronomical calculation.

const deg2rad = (deg: number) => deg * (Math.PI / 180);
const rad2deg = (rad: number) => rad * (180 / Math.PI);

function getSunriseSunset(lat: number, lon: number, date: Date): { sunrise: Date, sunset: Date } {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));

  const zenith = 90.8333; // Civil twilight
  const longitudeHour = lon / 15;
  const t = dayOfYear + ((6 - longitudeHour) / 24);

  const M = (0.9856 * t) - 3.289;
  let L = M + (1.916 * Math.sin(deg2rad(M))) + (0.020 * Math.sin(deg2rad(2 * M))) + 282.634;
  if (L < 0) L += 360;
  if (L >= 360) L -= 360;

  let RA = rad2deg(Math.atan(0.91764 * Math.tan(deg2rad(L))));
  if (RA < 0) RA += 360;
  if (RA >= 360) RA -= 360;

  const Lquadrant = Math.floor(L / 90) * 90;
  const RAquadrant = Math.floor(RA / 90) * 90;
  RA = RA + (Lquadrant - RAquadrant);
  RA = RA / 15;

  const sinDec = 0.39782 * Math.sin(deg2rad(L));
  const cosDec = Math.cos(Math.asin(sinDec));

  const cosH = (Math.cos(deg2rad(zenith)) - (sinDec * Math.sin(deg2rad(lat)))) / (cosDec * Math.cos(deg2rad(lat)));
  if (cosH > 1 || cosH < -1) {
    // This location is in the arctic/antarctic circle and has 24h day or night
    throw new Error("Polar day/night, planetary hours cannot be calculated.");
  }

  const H = rad2deg(Math.acos(cosH)) / 15;

  const T_rise = H + RA - (0.06571 * t) - 6.622;
  const T_set = -H + RA - (0.06571 * t) - 6.622;

  let UT_sunrise = T_rise - longitudeHour;
  let UT_sunset = T_set - longitudeHour;

  // Adjust to be within 0-24 range
  UT_sunrise = (UT_sunrise + 24) % 24;
  UT_sunset = (UT_sunset + 24) % 24;

  const localOffset = -date.getTimezoneOffset() / 60;
  const sunriseHour = (UT_sunrise + localOffset + 24) % 24;
  const sunsetHour = (UT_sunset + localOffset + 24) % 24;

  const sunrise = new Date(date);
  sunrise.setUTCHours(Math.floor(sunriseHour), Math.round((sunriseHour % 1) * 60), 0, 0);

  const sunset = new Date(date);
  sunset.setUTCHours(Math.floor(sunsetHour), Math.round((sunsetHour % 1) * 60), 0, 0);

  return { sunrise, sunset };
}

export function getDayRuler(date: Date): Planet {
  return PLANETS[DAY_RULERS[date.getDay()]];
}

export function calculatePlanetaryHoursForDay(lat: number, lon: number, date: Date): PlanetaryHour[] {
  const { sunrise, sunset } = getSunriseSunset(lat, lon, date);
  const tomorrowSunrise = getSunriseSunset(lat, lon, new Date(date.getTime() + 24 * 60 * 60 * 1000)).sunrise;

  const dayLength = (sunset.getTime() - sunrise.getTime()) / (1000 * 60); // in minutes
  const nightLength = (tomorrowSunrise.getTime() - sunset.getTime()) / (1000 * 60); // in minutes

  const dayHourDuration = dayLength / 12; // in minutes
  const nightHourDuration = nightLength / 12; // in minutes

  const rulerOfTheDay = DAY_RULERS[date.getDay()];
  const startIndex = CHALDEAN_ORDER.indexOf(rulerOfTheDay);

  const hours: PlanetaryHour[] = [];

  // Day Hours
  for (let i = 0; i < 12; i++) {
    const rulerIndex = (startIndex + i) % 7;
    const rulerName = CHALDEAN_ORDER[rulerIndex];
    const ruler = PLANETS[rulerName];

    const startTime = new Date(sunrise.getTime() + i * dayHourDuration * 60000);
    const endTime = new Date(sunrise.getTime() + (i + 1) * dayHourDuration * 60000);

    hours.push({ ruler, startTime, endTime, isDay: true });
  }

  // Night Hours
  for (let i = 0; i < 12; i++) {
    const rulerIndex = (startIndex + 12 + i) % 7;
    const rulerName = CHALDEAN_ORDER[rulerIndex];
    const ruler = PLANETS[rulerName];

    const startTime = new Date(sunset.getTime() + i * nightHourDuration * 60000);
    const endTime = new Date(sunset.getTime() + (i + 1) * nightHourDuration * 60000);

    hours.push({ ruler, startTime, endTime, isDay: false });
  }

  return hours;
}

export function getCurrentPlanetaryHour(lat: number, lon: number, now: Date): PlanetaryHour | null {
  // Check for today
  let hoursToday = calculatePlanetaryHoursForDay(lat, lon, now);
  for (const hour of hoursToday) {
    if (now >= hour.startTime && now < hour.endTime) {
      return hour;
    }
  }

  // If it's before today's sunrise, check yesterday's night hours
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  let hoursYesterday = calculatePlanetaryHoursForDay(lat, lon, yesterday);
  for (const hour of hoursYesterday) {
    if (now >= hour.startTime && now < hour.endTime && !hour.isDay) {
      return hour;
    }
  }

  return null; // Should not happen if logic is correct
}
