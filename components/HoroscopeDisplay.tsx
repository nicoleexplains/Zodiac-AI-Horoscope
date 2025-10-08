
import React, { useState, useEffect } from 'react';
import Loader from './Loader';

interface HoroscopeDisplayProps {
  horoscope: string;
  isLoading: boolean;
}

const TypingEffect: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText(''); // Reset on new text
    if (text) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
        }
      }, 30); // Adjust speed of typing here
      return () => clearInterval(interval);
    }
  }, [text]);

  return <p className="text-lg md:text-xl leading-relaxed text-gray-300">{displayedText}</p>;
};


const HoroscopeDisplay: React.FC<HoroscopeDisplayProps> = ({ horoscope, isLoading }) => {
  if (isLoading) {
    return (
      <div className="min-h-[150px] flex items-center justify-center bg-black/20 p-6 rounded-2xl shadow-inner border border-white/10">
        <Loader message="Reading the cosmic threads..." />
      </div>
    );
  }

  if (!horoscope) {
    return null; // Don't render anything if there's no horoscope and not loading
  }

  return (
    <div className="min-h-[150px] bg-black/20 p-6 sm:p-8 rounded-2xl shadow-inner border border-white/10 animate-fadeIn">
       <h3 className="text-2xl font-cinzel text-center mb-4 text-purple-300">Your Celestial Guidance</h3>
      <div className="text-center">
        <TypingEffect text={horoscope} />
      </div>
    </div>
  );
};

export default HoroscopeDisplay;
