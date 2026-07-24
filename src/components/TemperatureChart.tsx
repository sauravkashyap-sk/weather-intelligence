import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { TrendingUp, BarChart2 } from 'lucide-react';
import { HourlyDataPoint, DailyDataPoint, UnitSettings } from '../types/weather';
import { convertTemp, formatHourTime, formatDayName } from '../utils/weatherUtils';

interface TemperatureChartProps {
  hourly: HourlyDataPoint[];
  daily: DailyDataPoint[];
  unitSettings: UnitSettings;
}

export const TemperatureChart: React.FC<TemperatureChartProps> = ({
  hourly,
  daily,
  unitSettings,
}) => {
  const [viewMode, setViewMode] = useState<'hourly' | 'daily'>('hourly');

  const unitSymbol = unitSettings.temperature === 'fahrenheit' ? '°F' : '°C';

  // Format 24-hour hourly data for chart
  const hourlyChartData = hourly.slice(0, 24).map((item) => ({
    timeLabel: formatHourTime(item.time),
    Temperature: convertTemp(item.temperature, unitSettings.temperature),
    'Feels Like': convertTemp(item.apparentTemperature, unitSettings.temperature),
    'Rain Prob %': item.precipitationProbability,
  }));

  // Format 7-day daily data for chart
  const dailyChartData = daily.map((day, idx) => ({
    timeLabel: formatDayName(day.date, idx === 0),
    'Max Temp': convertTemp(day.tempMax, unitSettings.temperature),
    'Min Temp': convertTemp(day.tempMin, unitSettings.temperature),
    'Rain Prob %': day.precipitationProbabilityMax,
  }));

  const chartData = viewMode === 'hourly' ? hourlyChartData : dailyChartData;

  return (
    <div className="bg-slate-900/70 backdrop-blur-md rounded-3xl p-6 border border-slate-800/80 shadow-xl space-y-4">
      {/* Header and View Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">Temperature Trend Chart</h2>
            <p className="text-xs text-slate-400">Interactive thermal & precipitation visualizer</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center bg-slate-800/80 p-1 rounded-2xl border border-slate-700/60 text-xs font-semibold">
          <button
            onClick={() => setViewMode('hourly')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              viewMode === 'hourly'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Next 24 Hours
          </button>
          <button
            onClick={() => setViewMode('daily')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              viewMode === 'daily'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            7-Day Range
          </button>
        </div>
      </div>

      {/* Recharts Canvas Container */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="feelsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />

            <XAxis
              dataKey="timeLabel"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#475569' }}
            />

            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#475569' }}
              tickFormatter={(val) => `${val}${unitSymbol}`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderColor: 'rgba(51, 65, 85, 0.8)',
                borderRadius: '16px',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                color: '#f8fafc',
                fontSize: '12px',
              }}
              formatter={(value: any, name: any) => {
                if (name === 'Rain Prob %') return [`${value}%`, name];
                return [`${value}${unitSymbol}`, name];
              }}
            />

            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
              iconType="circle"
            />

            {viewMode === 'hourly' ? (
              <>
                <Area
                  type="monotone"
                  dataKey="Temperature"
                  stroke="#38bdf8"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#tempGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="Feels Like"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#feelsGradient)"
                />
              </>
            ) : (
              <>
                <Area
                  type="monotone"
                  dataKey="Max Temp"
                  stroke="#f43f5e"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#tempGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="Min Temp"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#feelsGradient)"
                />
              </>
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
