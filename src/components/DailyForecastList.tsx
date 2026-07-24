import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Umbrella, Wind, Sun, Droplet } from 'lucide-react';
import { DailyDataPoint, UnitSettings } from '../types/weather';
import {
  getWeatherCondition,
  formatTemp,
  formatSpeed,
  formatPrecip,
  formatDayName,
} from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcon';

interface DailyForecastListProps {
  daily: DailyDataPoint[];
  unitSettings: UnitSettings;
}

export const DailyForecastList: React.FC<DailyForecastListProps> = ({ daily, unitSettings }) => {
  const [expandedDate, setExpandedDate] = useState<string | null>(daily[0]?.date || null);

  // Find overall min and max temp across 7 days for relative bar chart scaling
  const allMin = Math.min(...daily.map((d) => d.tempMin));
  const allMax = Math.max(...daily.map((d) => d.tempMax));
  const tempRange = Math.max(1, allMax - allMin);

  const toggleExpand = (date: string) => {
    setExpandedDate((prev) => (prev === date ? null : date));
  };

  const formatTimeString = (isoTime?: string) => {
    if (!isoTime) return '--:--';
    const date = new Date(isoTime);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-slate-900/70 backdrop-blur-md rounded-3xl p-6 border border-slate-800/80 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-sky-400" />
          <span>7-Day Weather Outlook</span>
        </h2>
        <span className="text-xs text-slate-400">Click card for detailed day metrics</span>
      </div>

      <div className="space-y-2.5">
        {daily.map((day, idx) => {
          const condition = getWeatherCondition(day.weatherCode, true);
          const isExpanded = expandedDate === day.date;
          const isToday = idx === 0;

          // Calculate relative position for min/max temperature visual range bar
          const leftPercent = Math.max(0, Math.min(100, ((day.tempMin - allMin) / tempRange) * 100));
          const widthPercent = Math.max(10, Math.min(100 - leftPercent, ((day.tempMax - day.tempMin) / tempRange) * 100));

          return (
            <div
              key={day.date}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isToday
                  ? 'bg-slate-800/80 border-sky-500/40 shadow-md'
                  : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/70'
              }`}
            >
              {/* Row Summary */}
              <button
                onClick={() => toggleExpand(day.date)}
                className="w-full p-4 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 text-left focus:outline-none"
              >
                {/* Date & Icon */}
                <div className="flex items-center gap-3.5 min-w-[150px]">
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-700/50 shrink-0">
                    <WeatherIcon name={condition.iconName} size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
                      {formatDayName(day.date, isToday)}
                      {isToday && (
                        <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                          Today
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400">{condition.label}</div>
                  </div>
                </div>

                {/* Rain Probability */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 min-w-[80px]">
                  <Umbrella className={`w-3.5 h-3.5 ${day.precipitationProbabilityMax > 30 ? 'text-sky-400' : 'text-slate-500'}`} />
                  <span>{day.precipitationProbabilityMax}%</span>
                </div>

                {/* Temperature Min / Max Visual Range Bar */}
                <div className="flex-1 min-w-[180px] flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-400 text-right w-10">
                    {formatTemp(day.tempMin, unitSettings.temperature)}
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-slate-900/80 relative overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-rose-500"
                      style={{
                        left: `${leftPercent}%`,
                        width: `${widthPercent}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-bold text-white w-10">
                    {formatTemp(day.tempMax, unitSettings.temperature)}
                  </span>
                </div>

                {/* Toggle Chevron */}
                <div className="text-slate-400 hover:text-slate-200">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Expanded Detailed Breakdown */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-700/50 bg-slate-900/50 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/40">
                    <div className="text-slate-400 flex items-center gap-1">
                      <Sun className="w-3.5 h-3.5 text-amber-400" /> Max UV Index
                    </div>
                    <div className="text-sm font-bold text-slate-200 mt-1">{day.uvIndexMax} / 12</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/40">
                    <div className="text-slate-400 flex items-center gap-1">
                      <Droplet className="w-3.5 h-3.5 text-sky-400" /> Total Precip
                    </div>
                    <div className="text-sm font-bold text-slate-200 mt-1">
                      {formatPrecip(day.precipitationSum, unitSettings.precipitation)}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/40">
                    <div className="text-slate-400 flex items-center gap-1">
                      <Wind className="w-3.5 h-3.5 text-teal-400" /> Wind Gusts
                    </div>
                    <div className="text-sm font-bold text-slate-200 mt-1">
                      {formatSpeed(day.windGustsMax, unitSettings.speed)}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/40">
                    <div className="text-slate-400 flex items-center gap-1">
                      <Sun className="w-3.5 h-3.5 text-rose-400" /> Daylight
                    </div>
                    <div className="text-xs font-bold text-slate-200 mt-1">
                      {formatTimeString(day.sunrise)} – {formatTimeString(day.sunset)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
