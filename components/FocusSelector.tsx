
import React from 'react';
import { FOCUS_AREAS } from '../constants';
import type { FocusArea } from '../types';

interface FocusSelectorProps {
  selectedFocus: FocusArea;
  onSelectFocus: (focus: FocusArea) => void;
}

const FocusSelector: React.FC<FocusSelectorProps> = ({ selectedFocus, onSelectFocus }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      {FOCUS_AREAS.map((focus) => (
        <button
          key={focus.name}
          onClick={() => onSelectFocus(focus)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-300 transform hover:-translate-y-1
            ${selectedFocus.name === focus.name
              ? 'bg-purple-600 border-purple-400 text-white shadow-lg'
              : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/70 hover:border-gray-500'
            }
          `}
        >
          {focus.icon}
          <span className="font-semibold">{focus.name}</span>
        </button>
      ))}
    </div>
  );
};

export default FocusSelector;
