import React from 'react';
import type { Planet } from '../types';

interface ToneGeneratorProps {
  planet: Planet;
  isPlaying: boolean;
  volume: number;
  onTogglePlay: () => void;
  onVolumeChange: (volume: number) => void;
}

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

const PauseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);

const ToneGenerator: React.FC<ToneGeneratorProps> = ({ planet, isPlaying, volume, onTogglePlay, onVolumeChange }) => {
    return (
        <div className="bg-black/20 mt-6 p-4 rounded-2xl shadow-inner backdrop-blur-sm border border-white/10 text-center">
            <h4 className="text-lg font-cinzel text-purple-300 mb-3">Planetary Frequency Attunement</h4>
            <div className="flex items-center justify-center gap-6">
                <button
                    onClick={onTogglePlay}
                    className="text-purple-400 hover:text-white transition-colors duration-300"
                    aria-label={isPlaying ? 'Pause tone' : 'Play tone'}
                >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <div className="flex-grow flex items-center gap-4">
                    <div className="text-left">
                        <p className={`text-xl font-bold ${planet.color}`}>{planet.name} Tone</p>
                        <p className="text-sm text-gray-400">{planet.frequency} Hz</p>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                        aria-label="Volume control"
                    />
                </div>
            </div>
             <p className="text-xs text-gray-500 mt-3 px-4">
                For the best experience, use headphones. This creates a binaural beat to aid focus and relaxation.
            </p>
        </div>
    );
};

export default ToneGenerator;
