import React from 'react';

export type ZodiacName = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export interface ZodiacSign {
  name: ZodiacName;
  symbol: string;
}

export interface FocusArea {
  name: 'Love' | 'Career' | 'Wellness' | 'Finance' | 'Creativity';
  icon: React.ReactNode;
}

export type PlanetName = 'Sun' | 'Moon' | 'Mars' | 'Mercury' | 'Jupiter' | 'Venus' | 'Saturn';

export interface Planet {
  name: PlanetName;
  symbol: string;
  color: string;
  frequency: number; // Base frequency in Hz for the tone generator
}

export interface PlanetaryHour {
  ruler: Planet;
  startTime: Date;
  endTime: Date;
  isDay: boolean;
}
