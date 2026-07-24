import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Loader2, Navigation, Building2 } from 'lucide-react';
import { LocationResult } from '../types/weather';
import { searchCities, PRESET_LOCATIONS } from '../services/weatherApi';

interface SearchBarProps {
  onSelectLocation: (location: LocationResult) => void;
  isLoading: boolean;
  selectedLocationName?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSelectLocation,
  isLoading,
  selectedLocationName,
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Debounce search input
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      setSearchError(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      setSearchError(null);
      try {
        const results = await searchCities(query);
        setSuggestions(results);
        setIsOpen(true);
        if (results.length === 0) {
          setSearchError(`No cities found matching "${query}". Try checking spelling or search another city.`);
        }
      } catch (err) {
        setSearchError('Could not reach Open-Meteo geocoding service. Please try again.');
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (location: LocationResult) => {
    onSelectLocation(location);
    setQuery('');
    setIsOpen(false);
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        // Construct location object from coordinates
        const myLocation: LocationResult = {
          id: Date.now(),
          name: 'My Current Location',
          latitude,
          longitude,
          country: 'Local Device',
          country_code: 'GPS',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'auto',
        };
        onSelectLocation(myLocation);
        setGeoLoading(false);
      },
      (error) => {
        setGeoLoading(false);
        console.warn('Geolocation error:', error);
        alert('Could not determine your location. Please check browser permissions or search manually.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3">
      <div ref={wrapperRef} className="relative">
        {/* Main Search Input Bar */}
        <div className="relative flex items-center shadow-lg rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 transition-all focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20">
          <div className="pl-4 pr-2 text-slate-400">
            {isSearching || isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-sky-400" />
            ) : (
              <Search className="w-5 h-5 text-slate-400" />
            )}
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) setIsOpen(true);
            }}
            placeholder="Search city, state or country (e.g., Tokyo, London, Paris, New York)..."
            className="w-full py-3.5 pr-10 text-base text-slate-100 placeholder-slate-400 bg-transparent outline-none rounded-2xl"
          />

          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                setIsOpen(false);
              }}
              className="p-2 text-slate-400 hover:text-slate-200 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={handleGeolocation}
            disabled={geoLoading}
            className="mx-2 px-3 py-1.5 flex items-center gap-1.5 text-xs font-medium bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-xl transition-all disabled:opacity-50 shrink-0"
            title="Locate me using GPS"
          >
            {geoLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Navigation className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">My Location</span>
          </button>
        </div>

        {/* Autocomplete Dropdown */}
        {isOpen && (
          <div className="absolute z-50 left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden divide-y divide-slate-800/80 max-h-80 overflow-y-auto">
            {suggestions.map((loc) => (
              <button
                key={`${loc.id}-${loc.latitude}-${loc.longitude}`}
                onClick={() => handleSelect(loc)}
                className="w-full text-left px-4 py-3 hover:bg-slate-800/90 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-800 text-sky-400 group-hover:bg-sky-500/20 group-hover:text-sky-300 transition-colors">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-100 group-hover:text-sky-300 transition-colors">
                      {loc.name}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                      {loc.admin1 && <span>{loc.admin1},</span>}
                      {loc.country && <span className="font-medium text-slate-300">{loc.country}</span>}
                    </div>
                  </div>
                </div>
                <div className="text-right text-xs text-slate-500 font-mono">
                  {loc.latitude.toFixed(2)}°, {loc.longitude.toFixed(2)}°
                </div>
              </button>
            ))}

            {searchError && (
              <div className="p-4 text-center text-xs text-amber-300 bg-amber-500/10">
                {searchError}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Preset Quick Locations */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-slate-400 font-medium whitespace-nowrap flex items-center gap-1 shrink-0">
          <MapPin className="w-3.5 h-3.5 text-sky-400" /> Quick Select:
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {PRESET_LOCATIONS.map((loc) => {
            const isSelected = selectedLocationName === loc.name;
            return (
              <button
                key={loc.id}
                onClick={() => handleSelect(loc)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-sky-500/20 border-sky-400 text-sky-200 shadow-sm shadow-sky-500/20'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-700/60 hover:border-slate-600 hover:text-white'
                }`}
              >
                {loc.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
