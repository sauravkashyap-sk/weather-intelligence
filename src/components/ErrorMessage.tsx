import React from 'react';
import { AlertCircle, RefreshCw, MapPin, Search } from 'lucide-react';
import { LocationResult } from '../types/weather';
import { PRESET_LOCATIONS } from '../services/weatherApi';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  onSelectPreset?: (location: LocationResult) => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  onSelectPreset,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto my-8 p-8 rounded-3xl bg-slate-900/90 border border-amber-500/30 shadow-2xl text-center space-y-6 backdrop-blur-md">
      <div className="mx-auto w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
        <AlertCircle className="w-8 h-8 animate-bounce" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-extrabold text-slate-100">Location Weather Unavailable</h3>
        <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">{message}</p>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-5 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-500/30 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>

      {onSelectPreset && (
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>Or explore weather in popular global hubs:</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {PRESET_LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                onClick={() => onSelectPreset(loc)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-all"
              >
                {loc.name}, {loc.country_code}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
