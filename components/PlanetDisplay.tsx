

import React from 'react';
// Fix: Import PlanetaryHour from types.ts instead of planetaryHourService.ts.
import type { PlanetaryHour, Planet } from '../types';

interface PlanetDisplayProps {
  planetaryHour: PlanetaryHour;
  dayRuler: Planet;
  dayName: string;
}

const InfoPill: React.FC<{ label: string; value: string; valueClass?: string; symbol?: string }> = ({ label, value, valueClass = 'text-white', symbol }) => (
    <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg text-center">
      <span className="text-xs uppercase text-purple-300 tracking-widest">{label}</span>
      <span className={`text-lg font-bold ${valueClass}`}>
        {symbol && <span className="mr-1">{symbol}</span>}
        {value}
      </span>
    </div>
);

const PlanetDisplay: React.FC<PlanetDisplayProps> = ({ planetaryHour, dayRuler, dayName }) => {
  const { ruler, startTime, endTime, isDay } = planetaryHour;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-black/20 p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/10 text-center">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-400 mb-2">Hour of</p>
          <div className="flex items-center gap-4">
            <span className={`text-7xl font-bold ${ruler.color}`}>{ruler.symbol}</span>
            <span className={`text-4xl font-bold font-cinzel ${ruler.color}`}>{ruler.name}</span>
          </div>
        </div>
        
        <div className="flex flex-col text-center">
           <div className="grid grid-cols-2 gap-2 text-sm">
             <InfoPill label="Day" value={dayName} />
             <InfoPill label="Day Ruler" value={dayRuler.name} valueClass={dayRuler.color} symbol={dayRuler.symbol} />
             <InfoPill label="Hour Starts" value={formatTime(startTime)} />
             <InfoPill label="Hour Ends" value={formatTime(endTime)} />
           </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className={`text-6xl ${isDay ? 'text-yellow-300' : 'text-blue-300'}`}>
            {isDay ? '☀' : '☾'}
          </div>
          <div>
            <p className="text-xl font-bold font-cinzel">{isDay ? 'Day Hour' : 'Night Hour'}</p>
            <p className="text-gray-400">The celestial energies are active and outward.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlanetDisplay;
