import React, { useState, useEffect } from 'react';
import {
  CloudSun,
  RefreshCw,
  Sparkles,
  Info,
  SlidersHorizontal,
  Compass,
} from 'lucide-react';
import { LocationResult, WeatherData, UnitSettings } from './types/weather';
import { fetchWeatherForecast, PRESET_LOCATIONS } from './services/weatherApi';
import { generatePlanningInsights } from './utils/weatherUtils';
import { SearchBar } from './components/SearchBar';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { HourlyForecastSlider } from './components/HourlyForecastSlider';
import { TemperatureChart } from './components/TemperatureChart';
import { PlanningRecommendations } from './components/PlanningRecommendations';
import { DailyForecastList } from './components/DailyForecastList';
import { WeatherDetailsGrid } from './components/WeatherDetailsGrid';
import { ErrorMessage } from './components/ErrorMessage';

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState<LocationResult>(PRESET_LOCATIONS[0]); // Default to New York
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Unit settings state
  const [unitSettings, setUnitSettings] = useState<UnitSettings>({
    temperature: 'celsius',
    speed: 'kmh',
    precipitation: 'mm',
  });

  // Fetch forecast whenever selectedLocation changes
  const loadWeather = async (loc: LocationResult) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherForecast(loc);
      setWeather(data);
    } catch (err: any) {
      console.error('Failed to load weather:', err);
      setError(
        `Unable to retrieve weather forecast for "${loc.name}". Please check your connection or choose another location.`
      );
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather(selectedLocation);
  }, [selectedLocation]);

  const handleSelectLocation = (location: LocationResult) => {
    setSelectedLocation(location);
  };

  const toggleTemperatureUnit = () => {
    setUnitSettings((prev) => ({
      ...prev,
      temperature: prev.temperature === 'celsius' ? 'fahrenheit' : 'celsius',
      speed: prev.temperature === 'celsius' ? 'mph' : 'kmh',
      precipitation: prev.temperature === 'celsius' ? 'inch' : 'mm',
    }));
  };

  // Generate intelligence insights when weather data is ready
  const insights = weather
    ? generatePlanningInsights(
        weather.current,
        weather.hourly,
        weather.daily,
        unitSettings
      )
    : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-white pb-16">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Logo & App Name */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20">
              <CloudSun className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-white">
                  Weather Intelligence
                </span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Open-Meteo
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Smart forecasts, atmospheric trends & outdoor planning
              </p>
            </div>
          </div>

          {/* Unit Switcher & Refresh Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => loadWeather(selectedLocation)}
              disabled={loading}
              className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all disabled:opacity-50"
              title="Refresh forecast data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-sky-400' : ''}`} />
            </button>

            <button
              onClick={toggleTemperatureUnit}
              className="px-3 py-1.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-bold text-sky-400 hover:bg-slate-800 transition-all flex items-center gap-1.5"
              title="Toggle metric / imperial units"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{unitSettings.temperature === 'celsius' ? '°C, km/h' : '°F, mph'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        {/* Search Bar Section */}
        <SearchBar
          onSelectLocation={handleSelectLocation}
          isLoading={loading}
          selectedLocationName={selectedLocation.name}
        />

        {/* Loading State Spinner */}
        {loading && !weather && (
          <div className="py-24 text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full border-4 border-sky-500/20 border-t-sky-500 animate-spin" />
            <p className="text-sm font-semibold text-slate-400">
              Fetching Open-Meteo weather intelligence for {selectedLocation.name}...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <ErrorMessage
            message={error}
            onRetry={() => loadWeather(selectedLocation)}
            onSelectPreset={handleSelectLocation}
          />
        )}

        {/* Weather Dashboard Content */}
        {weather && !loading && (
          <div className="space-y-8 animate-fade-in">
            {/* Primary Current Weather Banner */}
            <CurrentWeatherCard
              weather={weather}
              unitSettings={unitSettings}
              onToggleTempUnit={toggleTemperatureUnit}
            />

            {/* Smart Planning Recommendations & Intelligence Insights */}
            {insights && (
              <PlanningRecommendations
                insights={insights}
                unitSettings={unitSettings}
              />
            )}

            {/* Hourly Forecast Timeline (24 Hours) */}
            <HourlyForecastSlider
              hourly={weather.hourly}
              unitSettings={unitSettings}
            />

            {/* Temperature Trend Chart */}
            <TemperatureChart
              hourly={weather.hourly}
              daily={weather.daily}
              unitSettings={unitSettings}
            />

            {/* 7-Day Forecast Outlook List */}
            <DailyForecastList
              daily={weather.daily}
              unitSettings={unitSettings}
            />

            {/* Detailed Atmospheric Indicators & Metrics Grid */}
            <WeatherDetailsGrid
              weather={weather}
              unitSettings={unitSettings}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-900 pt-8 text-center text-xs text-slate-500 space-y-2">
        <p className="flex items-center justify-center gap-1.5">
          <span>Powered by public</span>
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:underline font-semibold"
          >
            Open-Meteo Weather & Geocoding API
          </a>
          <span>(Free & Open Data, No API Key Required)</span>
        </p>
        <p className="text-slate-600">
          Designed with React, Vite, Recharts, and Tailwind CSS.
        </p>
      </footer>
    </div>
  );
}
