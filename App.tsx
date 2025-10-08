import React, { useState, useCallback, useEffect, useRef } from 'react';
import { generateHoroscope } from './services/geminiService';
import { getCurrentPlanetaryHour, getDayRuler } from './services/planetaryHourService';
import { audioService } from './services/audioService';
import type { FocusArea, ZodiacSign, PlanetaryHour, Planet } from './types';
import { FOCUS_AREAS, ZODIAC_SIGNS, BINAURAL_BEAT_HZ } from './constants';
import ZodiacSelector from './components/ZodiacSelector';
import FocusSelector from './components/FocusSelector';
import HoroscopeDisplay from './components/HoroscopeDisplay';
import PlanetDisplay from './components/PlanetDisplay';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacSign>(ZODIAC_SIGNS[0]);
  const [selectedFocus, setSelectedFocus] = useState<FocusArea>(FOCUS_AREAS[0]);
  const [horoscope, setHoroscope] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Planetary hours state
  const [planetaryHour, setPlanetaryHour] = useState<PlanetaryHour | null>(null);
  const [dayRuler, setDayRuler] = useState<Planet | null>(null);
  const [dayName, setDayName] = useState<string>('');
  const [isLocationLoading, setIsLocationLoading] = useState<boolean>(true);

  // Tone generator state
  const [isPlayingTone, setIsPlayingTone] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.2);

  const planetForTone = planetaryHour?.ruler || dayRuler;

  // Stop tone if the relevant planet changes
  useEffect(() => {
    setIsPlayingTone(false);
    audioService.stop();
  }, [planetForTone?.name]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioService.stop();
    };
  }, []);

  useEffect(() => {
    const setDayInfo = () => {
      const now = new Date();
      const currentDayRuler = getDayRuler(now);
      const currentDayName = now.toLocaleDateString('en-US', { weekday: 'long' });
      setDayRuler(currentDayRuler);
      setDayName(currentDayName);
    };

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setDayInfo();
      setIsLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const now = new Date();
          const currentHour = getCurrentPlanetaryHour(latitude, longitude, now);
          setPlanetaryHour(currentHour);
        } catch (calcError: any)
        {
          console.error(calcError);
          setError(calcError.message || "Could not calculate planetary hours for your location. You might be in a polar region.");
        } finally {
          setDayInfo();
          setIsLocationLoading(false);
        }
      },
      (geoError) => {
        switch (geoError.code) {
          case geoError.PERMISSION_DENIED:
            setError("Planetary hours require location access. Please enable it in your browser settings to see the current celestial influence.");
            break;
          case geoError.POSITION_UNAVAILABLE:
            setError("Location information is unavailable at the moment.");
            break;
          case geoError.TIMEOUT:
            setError("The request to get your location timed out.");
            break;
          default:
            setError("An unknown error occurred while fetching your location.");
            break;
        }
        setDayInfo();
        setIsLocationLoading(false);
      },
      { timeout: 10000 }
    );
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!selectedZodiac || !selectedFocus) {
      setError('Cannot generate horoscope without a zodiac sign and focus.');
      return;
    }

    setIsGenerating(true);
    setHoroscope('');
    setError(null);

    try {
      const generatedText = await generateHoroscope(selectedZodiac, selectedFocus.name);
      setHoroscope(generatedText);
    } catch (apiError) {
      console.error(apiError);
      setError('Failed to generate horoscope from AI. Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  }, [selectedZodiac, selectedFocus]);

  const handleTogglePlayTone = useCallback(() => {
    if (isPlayingTone) {
      audioService.stop();
      setIsPlayingTone(false);
    } else if (planetForTone) {
      audioService.start(planetForTone.frequency, BINAURAL_BEAT_HZ, volume);
      setIsPlayingTone(true);
    }
  }, [isPlayingTone, planetForTone, volume]);
  
  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
    audioService.setVolume(newVolume);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-gray-200 p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8 animate-fadeIn">
          <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-cinzel tracking-wider">
            Zodiac AI Horoscope
          </h1>
          <p className="text-lg text-gray-400 mt-2">Your Personal AI Astrologer</p>
        </header>

        <main className="flex flex-col gap-8">
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
              <p>{error}</p>
            </div>
          )}

          <div className="animate-fadeInUp space-y-8">
            <div className="bg-black/20 p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/10">
                <h2 className="text-3xl font-cinzel text-center mb-6 text-purple-300">Current Celestial Influence</h2>
                {isLocationLoading && <Loader message="Determining your celestial position..." />}
                {!isLocationLoading && dayRuler && (
                    <PlanetDisplay
                        planetaryHour={planetaryHour}
                        dayRuler={dayRuler}
                        dayName={dayName}
                        isPlaying={isPlayingTone}
                        volume={volume}
                        onTogglePlay={handleTogglePlayTone}
                        onVolumeChange={handleVolumeChange}
                    />
                )}
            </div>

            <div className="bg-black/20 p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/10">
              <h2 className="text-3xl font-cinzel text-center mb-6 text-purple-300">Seek Your Guidance</h2>
              <div className="space-y-8">
                  <div>
                      <h3 className="text-xl font-cinzel text-center mb-4 text-purple-400">1. Select Your Zodiac Sign</h3>
                      <ZodiacSelector selectedZodiac={selectedZodiac} onSelectZodiac={setSelectedZodiac} />
                  </div>
                  <div className="border-t border-white/10 w-1/2 mx-auto"></div>
                  <div>
                      <h3 className="text-xl font-cinzel text-center mb-4 text-purple-400">2. Choose Your Focus</h3>
                      <FocusSelector
                        selectedFocus={selectedFocus}
                        onSelectFocus={setSelectedFocus}
                      />
                  </div>
              </div>
              <div className="text-center mt-8">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out font-cinzel tracking-widest"
                >
                  {isGenerating ? 'Consulting the Stars...' : horoscope ? "Get Today's Reading" : 'Generate Horoscope'}
                </button>
              </div>
            </div>

            <HoroscopeDisplay horoscope={horoscope} isLoading={isGenerating} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;