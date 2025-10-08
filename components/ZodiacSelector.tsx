import React from 'react';
import { ZODIAC_SIGNS } from '../constants';
import type { ZodiacSign } from '../types';

interface ZodiacSelectorProps {
  selectedZodiac: ZodiacSign;
  onSelectZodiac: (sign: ZodiacSign) => void;
}

const ZodiacSelector: React.FC<ZodiacSelectorProps> = ({ selectedZodiac, onSelectZodiac }) => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 gap-2 sm:gap-4 justify-center max-w-lg mx-auto">
      {ZODIAC_SIGNS.map((sign) => (
        <button
          key={sign.name}
          onClick={() => onSelectZodiac(sign)}
          aria-label={`Select ${sign.name}`}
          className={`
            flex flex-col items-center justify-center gap-1 p-2 rounded-xl border-2 transition-all duration-300 transform hover:-translate-y-1 aspect-square
            ${selectedZodiac.name === sign.name
              ? 'bg-purple-600 border-purple-400 text-white shadow-lg scale-105'
              : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/70 hover:border-gray-500'
            }
          `}
        >
          <span className="text-3xl sm:text-4xl" aria-hidden="true">{sign.symbol}</span>
          <span className="font-semibold text-xs sm:text-sm tracking-tighter">{sign.name}</span>
        </button>
      ))}
    </div>
  );
};

export default ZodiacSelector;
