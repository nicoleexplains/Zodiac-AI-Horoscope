import React from 'react';
import type { PlanetaryHour, Planet } from '../types';
import ToneGenerator from './ToneGenerator';

interface PlanetDisplayProps {
  planetaryHour: PlanetaryHour | null;
  dayRuler: Planet;
  dayName: string;
  isPlaying: boolean;
  volume: number;
  onTogglePlay: () => void;
  onVolumeChange: (volume: number) => void;
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

const PlanetDisplay: React.FC<PlanetDisplayProps> = ({ planetaryHour, dayRuler, dayName, isPlaying, volume, onTogglePlay, onVolumeChange }) => {
  const ruler = planetaryHour?.ruler || dayRuler;
  const title = planetaryHour ? 'Hour of' : 'Daily Influence';

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div className="text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-400 mb-2">{title}</p>
            <div className="flex items-center gap-4">
              <span className={`text-7xl font-bold ${ruler.color}`}>{ruler.symbol}</span>
              <span className={`text-4xl font-bold font-cinzel ${ruler.color}`}>{ruler.name}</span>
            </div>
          </div>
          
          <div className="flex flex-col text-center">
             <div className="grid grid-cols-2 gap-2 text-sm">
               <InfoPill label="Day" value={dayName} />
               <InfoPill label="Day Ruler" value={dayRuler.name} valueClass={dayRuler.color} symbol={dayRuler.symbol} />
               {planetaryHour ? (
                 <>
                  <InfoPill label="Hour Starts" value={formatTime(planetaryHour.startTime)} />
                  <InfoPill label="Hour Ends" value={formatTime(planetaryHour.endTime)} />
                 </>
               ) : (
                <div className="col-span-2 p-2 bg-white/5 rounded-lg text-center flex items-center justify-center">
                  <span className="text-xs text-gray-400">Enable location for hourly details.</span>
                </div>
               )}
             </div>
          </div>

          <div className="flex items-center justify-center gap-4 min-h-[64px]">
            {planetaryHour ? (
              <>
                <div className={`text-6xl ${planetaryHour.isDay ? 'text-yellow-300' : 'text-blue-300'}`}>
                  {planetaryHour.isDay ? '☀' : '☾'}
                </div>
                <div>
                  <p className="text-xl font-bold font-cinzel">{planetaryHour.isDay ? 'Day Hour' : 'Night Hour'}</p>
                  <p className="text-gray-400 text-sm">The celestial energies are active and outward.</p>
                </div>
              </>
            ) : (
              <div className="text-center">
                <p className="text-gray-400 italic text-sm">Today's primary influence is guided by {dayRuler.name}.</p>
              </div>
            )}
          </div>

        </div>
      </div>
      <ToneGenerator
        planet={ruler}
        isPlaying={isPlaying}
        volume={volume}
        onTogglePlay={onTogglePlay}
        onVolumeChange={onVolumeChange}
      />
    </>
  );
};

export default PlanetDisplay;