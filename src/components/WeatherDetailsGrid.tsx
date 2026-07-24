import React from 'react';
import {
  Sun,
  Wind,
  Droplets,
  Cloud,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  Compass,
} from 'lucide-react';
import { WeatherData, UnitSettings } from '../types/weather';
import {
  formatSpeed,
  formatTemp,
  formatWindDir,
} from '../utils/weatherUtils';

interface WeatherDetailsGridProps {
  weather: WeatherData;
  unitSettings: UnitSettings;
}

export const WeatherDetailsGrid: React.FC<WeatherDetailsGridProps> = ({
  weather,
  unitSettings,
}) => {
  const { current, daily, hourly } = weather;
  const todayDaily = daily[0];
  const currentHourly = hourly[0];

  const formatTimeString = (isoTime?: string) => {
    if (!isoTime) return '--:--';
    const date = new Date(isoTime);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const uvMax = todayDaily ? todayDaily.uvIndexMax : 0;
  const getUvStatus = (uv: number) => {
    if (uv >= 11) return { text: 'Extreme Risk', color: 'text-purple-400 bg-purple-500/20' };
    if (uv >= 8) return { text: 'Very High Risk', color: 'text-rose-400 bg-rose-500/20' };
    if (uv >= 6) return { text: 'High Risk', color: 'text-amber-400 bg-amber-500/20' };
    if (uv >= 3) return { text: 'Moderate Risk', color: 'text-yellow-400 bg-yellow-500/20' };
    return { text: 'Low Risk', color: 'text-emerald-400 bg-emerald-500/20' };
  };
  const uvStatus = getUvStatus(uvMax);

  // Visibility in km or miles
  const visibilityKm = currentHourly ? Math.round(currentHourly.visibility / 1000) : 10;

  return (
    <div className="space-y-4">
      <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
        <Gauge className="w-4 h-4 text-sky-400" />
        <span>Atmospheric Metrics & Indicators</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* UV Index Card */}
        <div className="p-5 rounded-3xl bg-slate-900/70 backdrop-blur-md border border-slate-800/80 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-400" /> UV Index
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${uvStatus.color}`}>
              {uvStatus.text}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{uvMax}</span>
            <span className="text-xs text-slate-400 font-medium">/ 12 Peak Today</span>
          </div>

          {/* Progress Meter Bar */}
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 transition-all duration-500"
              style={{ width: `${Math.min(100, (uvMax / 12) * 100)}%` }}
            />
          </div>
          <p className="text-xs text-slate-400">
            {uvMax >= 6 ? 'Wear sunscreen SPF 30+ & polarized sunglasses.' : 'Low UV levels during current window.'}
          </p>
        </div>

        {/* Wind & Gusts Card */}
        <div className="p-5 rounded-3xl bg-slate-900/70 backdrop-blur-md border border-slate-800/80 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-teal-400" /> Wind & Gusts
            </span>
            <span className="text-xs font-bold text-teal-300 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" />
              {formatWindDir(current.windDirection)} ({current.windDirection}°)
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">
              {formatSpeed(current.windSpeed, unitSettings.speed)}
            </span>
          </div>

          <div className="pt-1 text-xs text-slate-300 flex items-center justify-between border-t border-slate-800">
            <span className="text-slate-400">Peak Gusts:</span>
            <span className="font-bold text-teal-300">
              {formatSpeed(current.windGusts, unitSettings.speed)}
            </span>
          </div>
        </div>

        {/* Cloud Cover & Visibility */}
        <div className="p-5 rounded-3xl bg-slate-900/70 backdrop-blur-md border border-slate-800/80 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Cloud className="w-4 h-4 text-sky-400" /> Clouds & Visibility
            </span>
            <span className="text-xs font-bold text-sky-300 flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {visibilityKm} km visibility
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{current.cloudCover}%</span>
            <span className="text-xs text-slate-400 font-medium">Cloud Cover</span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-sky-400 transition-all duration-500"
              style={{ width: `${current.cloudCover}%` }}
            />
          </div>
          <p className="text-xs text-slate-400">
            {current.cloudCover > 80 ? 'Heavy overcast sky cover' : current.cloudCover > 40 ? 'Partly cloudy sky' : 'Clear open sky'}
          </p>
        </div>

        {/* Humidity & Dew Point */}
        <div className="p-5 rounded-3xl bg-slate-900/70 backdrop-blur-md border border-slate-800/80 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-blue-400" /> Humidity
            </span>
            <span className="text-xs font-bold text-blue-300">
              Dew Pt: {currentHourly ? formatTemp(currentHourly.dew_point_2m || 0, unitSettings.temperature) : '--'}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{current.humidity}%</span>
          </div>

          <p className="text-xs text-slate-400">
            {current.humidity > 80 ? 'High moisture level; feels sticky or humid.' : current.humidity < 30 ? 'Dry air level.' : 'Optimal air moisture level.'}
          </p>
        </div>

        {/* Sunrise & Sunset Arc */}
        <div className="p-5 rounded-3xl bg-slate-900/70 backdrop-blur-md border border-slate-800/80 shadow-xl space-y-3 sm:col-span-2 lg:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sunrise className="w-4 h-4 text-amber-400" /> Sun Schedule
            </span>
            <span className="text-xs font-bold text-rose-300 flex items-center gap-1">
              <Sunset className="w-3.5 h-3.5" /> Sunset today
            </span>
          </div>

          <div className="flex items-center justify-around py-2">
            <div className="text-center">
              <Sunrise className="w-6 h-6 text-amber-400 mx-auto mb-1" />
              <div className="text-xs text-slate-400 font-medium">Sunrise</div>
              <div className="text-base font-extrabold text-white">
                {todayDaily ? formatTimeString(todayDaily.sunrise) : '--:--'}
              </div>
            </div>

            <div className="h-10 w-px bg-slate-800" />

            <div className="text-center">
              <Sunset className="w-6 h-6 text-rose-400 mx-auto mb-1" />
              <div className="text-xs text-slate-400 font-medium">Sunset</div>
              <div className="text-base font-extrabold text-white">
                {todayDaily ? formatTimeString(todayDaily.sunset) : '--:--'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
