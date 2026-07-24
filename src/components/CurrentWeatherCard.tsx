import React from 'react';
import {
  Thermometer,
  Wind,
  Droplets,
  CloudRain,
  Gauge,
  Cloud,
  Sun,
  Sunset,
  Sunrise,
  Compass,
  Zap,
} from 'lucide-react';
import { WeatherData, UnitSettings } from '../types/weather';
import {
  getWeatherCondition,
  formatTemp,
  formatSpeed,
  formatPrecip,
  formatWindDir,
} from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherCardProps {
  weather: WeatherData;
  unitSettings: UnitSettings;
  onToggleTempUnit: () => void;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  weather,
  unitSettings,
  onToggleTempUnit,
}) => {
  const { location, current, daily } = weather;
  const condition = getWeatherCondition(current.weatherCode, current.isDay);
  const todayDaily = daily[0];

  const formatTimeString = (isoTime?: string) => {
    if (!isoTime) return '--:--';
    const date = new Date(isoTime);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl transition-all duration-500 bg-gradient-to-br ${condition.bgGradientDark}`}
    >
      {/* Background Decorative Glow */}
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ backgroundColor: condition.accentColor }}
      />

      <div className="relative z-10 space-y-6">
        {/* Top Header Row: Location & Refresh/Unit Toggle */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {location.name}
              </h1>
              {location.country_code && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-white/10 text-slate-200 border border-white/10">
                  {location.country_code}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-300/90 mt-1 flex items-center gap-1.5">
              <span>
                {location.admin1 ? `${location.admin1}, ` : ''}
                {location.country || ''}
              </span>
              <span className="text-slate-500">•</span>
              <span>Updated {weather.fetchedAt}</span>
            </p>
          </div>

          {/* Unit Toggle Pill */}
          <div className="flex items-center bg-slate-900/60 backdrop-blur-md p-1 rounded-2xl border border-white/10">
            <button
              onClick={onToggleTempUnit}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                unitSettings.temperature === 'celsius'
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              °C
            </button>
            <button
              onClick={onToggleTempUnit}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                unitSettings.temperature === 'fahrenheit'
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              °F
            </button>
          </div>
        </div>

        {/* Center Main Temp & Condition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center py-2">
          {/* Main Temperature Readout */}
          <div className="flex items-center gap-5">
            <div className="p-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-inner shrink-0">
              <WeatherIcon name={condition.iconName} size={64} />
            </div>
            <div>
              <div className="text-5xl sm:text-7xl font-black text-white tracking-tighter flex items-start">
                <span>{formatTemp(current.temperature, unitSettings.temperature)}</span>
              </div>
              <div className="text-sm font-medium text-slate-300 mt-1 flex items-center gap-2">
                <span>Feels like {formatTemp(current.apparentTemperature, unitSettings.temperature)}</span>
                {todayDaily && (
                  <span className="text-slate-400 font-normal">
                    H: {formatTemp(todayDaily.tempMax, unitSettings.temperature)} L:{' '}
                    {formatTemp(todayDaily.tempMin, unitSettings.temperature)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Weather Condition Description Badge */}
          <div className="md:text-right space-y-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white font-semibold text-sm">
              <Zap className="w-4 h-4 text-amber-300" />
              <span>{condition.label}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm md:ml-auto">
              {condition.description}
            </p>
          </div>
        </div>

        {/* Bottom Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {/* Humidity */}
          <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-300 shrink-0">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-400">Humidity</div>
              <div className="text-sm font-bold text-slate-100">{current.humidity}%</div>
            </div>
          </div>

          {/* Wind Speed */}
          <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300 shrink-0">
              <Wind className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-400">Wind</div>
              <div className="text-sm font-bold text-slate-100">
                {formatSpeed(current.windSpeed, unitSettings.speed)}{' '}
                <span className="text-xs font-normal text-slate-400">
                  {formatWindDir(current.windDirection)}
                </span>
              </div>
            </div>
          </div>

          {/* Precipitation */}
          <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-300 shrink-0">
              <CloudRain className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-400">Precipitation</div>
              <div className="text-sm font-bold text-slate-100">
                {formatPrecip(current.precipitation, unitSettings.precipitation)}
              </div>
            </div>
          </div>

          {/* Pressure */}
          <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 shrink-0">
              <Gauge className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-400">Pressure</div>
              <div className="text-sm font-bold text-slate-100">{Math.round(current.pressureMsl)} hPa</div>
            </div>
          </div>

          {/* UV Index */}
          <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
              <Sun className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-400">UV Index</div>
              <div className="text-sm font-bold text-slate-100">
                {todayDaily ? todayDaily.uvIndexMax : 0} / 12
              </div>
            </div>
          </div>

          {/* Sunrise / Sunset */}
          <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-300 shrink-0">
              <Sunset className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-400">Sunset</div>
              <div className="text-sm font-bold text-slate-100">
                {todayDaily ? formatTimeString(todayDaily.sunset) : '--:--'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
