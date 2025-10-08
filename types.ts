// Fix: Import React to use React.ReactNode
import React from 'react';
import type { Planet } from './types';

export type ZodiacName = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export interface ZodiacSign {
  name: ZodiacName;
  symbol: string;
}

export interface FocusArea {
  name: 'Love' | 'Career' | 'Wellness' | 'Finance' | 'Creativity';
  // Fix: Use React.ReactNode instead of JSX.Element to avoid JSX namespace issues in a .ts file.
  icon: React.ReactNode;
}

// Fix: Add and export Planet and PlanetName types for planetary hour calculations.
export type PlanetName = 'Sun' | 'Moon' | 'Mars' | 'Mercury' | 'Jupiter' | 'Venus' | 'Saturn';

export interface Planet {
  name: PlanetName;
  symbol: string;
  color: string;
}

// Fix: Add PlanetaryHour interface to be available globally.
export interface PlanetaryHour {
  ruler: Planet;
  startTime: Date;
  endTime: Date;
  isDay: boolean;
}
