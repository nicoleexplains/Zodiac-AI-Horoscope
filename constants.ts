import type { FocusArea, ZodiacSign, Planet, PlanetName } from './types';
import React from 'react';

const HeartIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.318a4.5 4.5 0 010-6.364z" }));
const BriefcaseIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }));
const SparklesIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 16l-4 4-4-4 5.293-5.293a1 1 0 011.414 0L13 13m0 0l2.293 2.293a1 1 0 001.414 0L21 12m-8 8l2.293-2.293a1 1 0 011.414 0L21 16m-8-8l-2.293-2.293a1 1 0 00-1.414 0L5 8m8 8l-2.293 2.293a1 1 0 01-1.414 0L5 16m8-8V5a1 1 0 00-1-1H4a1 1 0 00-1 1v4" }));
const CashIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" }));
const LightBulbIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" }));

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { name: 'Aries', symbol: '♈' },
  { name: 'Taurus', symbol: '♉' },
  { name: 'Gemini', symbol: '♊' },
  { name: 'Cancer', symbol: '♋' },
  { name: 'Leo', symbol: '♌' },
  { name: 'Virgo', symbol: '♍' },
  { name: 'Libra', symbol: '♎' },
  { name: 'Scorpio', symbol: '♏' },
  { name: 'Sagittarius', symbol: '♐' },
  { name: 'Capricorn', symbol: '♑' },
  { name: 'Aquarius', symbol: '♒' },
  { name: 'Pisces', symbol: '♓' },
];

export const FOCUS_AREAS: FocusArea[] = [
  { name: 'Love', icon: React.createElement(HeartIcon) },
  { name: 'Career', icon: React.createElement(BriefcaseIcon) },
  { name: 'Wellness', icon: React.createElement(SparklesIcon) },
  { name: 'Finance', icon: React.createElement(CashIcon) },
  { name: 'Creativity', icon: React.createElement(LightBulbIcon) },
];

export const PLANETS: Record<PlanetName, Planet> = {
  Sun: { name: 'Sun', symbol: '☉', color: 'text-yellow-400', frequency: 126.22 },
  Moon: { name: 'Moon', symbol: '☽', color: 'text-gray-300', frequency: 210.42 },
  Mars: { name: 'Mars', symbol: '♂', color: 'text-red-500', frequency: 144.72 },
  Mercury: { name: 'Mercury', symbol: '☿', color: 'text-indigo-400', frequency: 141.27 },
  Jupiter: { name: 'Jupiter', symbol: '♃', color: 'text-orange-500', frequency: 183.58 },
  Venus: { name: 'Venus', symbol: '♀', color: 'text-pink-400', frequency: 221.23 },
  Saturn: { name: 'Saturn', symbol: '♄', color: 'text-blue-400', frequency: 147.85 },
};

export const CHALDEAN_ORDER: PlanetName[] = ['Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon'];

export const DAY_RULERS: PlanetName[] = [ // Corresponds to Date.getDay() where 0 is Sunday
  'Sun',
  'Moon',
  'Mars',
  'Mercury',
  'Jupiter',
  'Venus',
  'Saturn',
];

export const BINAURAL_BEAT_HZ = 4; // A theta wave frequency for relaxation
