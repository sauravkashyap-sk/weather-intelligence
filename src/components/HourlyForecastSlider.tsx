import React from 'react';
import { Clock, Umbrella, Wind } from 'lucide-react';
import { HourlyDataPoint, UnitSettings } from '../types/weather';
import { getWeatherCondition, formatTemp, formatSpeed, formatHourTime } from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcon';

interface HourlyForecastSliderProps {
  hourly: HourlyDataPoint[];
  unitSettings: UnitSettings;
}

export const HourlyForecastSlider: React.FC<HourlyForecastSliderProps> = ({
  hourly,
  unitSettings,
}) => {
  // Show next 24 hours
  const next24 = hourly.slice(0, 24);

  return (
    <div className="bg-slate-900/70 backdrop-blur-md rounded-3xl p-6 border border-slate-800/80 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Clock className="w-4 h-4 text-sky-400" />
          <span>Hourly Forecast (Next 24 Hours)</span>
        </h2>
        <span className="text-xs text-slate-400 font-medium">Scroll horizontally →</span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-700 hover:scrollbar-thumb-slate-600">
        {next24.map((item, idx) => {
          const condition = getWeatherCondition(item.weatherCode, true);
          const isNow = idx === 0;

          return (
            <div
              key={item.time}
              className={`flex-none w-28 p-3.5 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-between gap-2.5 ${
                isNow
                  ? 'bg-sky-500/20 border-sky-400/80 shadow-lg shadow-sky-500/20 ring-1 ring-sky-400/50'
                  : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800/90 hover:border-slate-600'
              }`}
            >
              <div className="text-xs font-semibold text-slate-300">
                {isNow ? (
                  <span className="text-sky-300 font-bold px-2 py-0.5 rounded-md bg-sky-500/20">
                    Now
                  </span>
                ) : (
                  formatHourTime(item.time)
                )}
              </div>

              <div className="my-1">
                <WeatherIcon name={condition.iconName} size={28} />
              </div>

              <div className="text-base font-extrabold text-white">
                {formatTemp(item.temperature, unitSettings.temperature)}
              </div>

              {/* Rain Probability Badge */}
              <div
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  item.precipitationProbability > 40
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    : 'text-slate-400'
                }`}
              >
                <Umbrella className="w-3 h-3 text-sky-400" />
                <span>{item.precipitationProbability}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
