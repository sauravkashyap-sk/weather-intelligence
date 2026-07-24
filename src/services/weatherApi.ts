import {
  LocationResult,
  WeatherData,
  CurrentWeatherData,
  HourlyDataPoint,
  DailyDataPoint,
} from '../types/weather';

const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Search cities using Open-Meteo Geocoding API
 */
export async function searchCities(query: string): Promise<LocationResult[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const url = `${GEOCODING_BASE_URL}?name=${encodeURIComponent(query.trim())}&count=10&language=en&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Geocoding server error: status ${response.status}`);
    }

    const data = await response.json();
    if (!data.results || !Array.isArray(data.results)) {
      return [];
    }

    return data.results;
  } catch (err) {
    console.error('Error searching cities:', err);
    throw err;
  }
}

/**
 * Fetch weather forecast for latitude and longitude from Open-Meteo Forecast API
 */
export async function fetchWeatherForecast(location: LocationResult): Promise<WeatherData> {
  const { latitude, longitude } = location;

  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'rain',
      'showers',
      'snowfall',
      'weather_code',
      'cloud_cover',
      'pressure_msl',
      'surface_pressure',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
    ].join(','),
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'dew_point_2m',
      'apparent_temperature',
      'precipitation_probability',
      'precipitation',
      'weather_code',
      'pressure_msl',
      'cloud_cover',
      'visibility',
      'wind_speed_10m',
      'uv_index',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'apparent_temperature_max',
      'apparent_temperature_min',
      'sunrise',
      'sunset',
      'uv_index_max',
      'precipitation_sum',
      'rain_sum',
      'showers_sum',
      'snowfall_sum',
      'precipitation_hours',
      'precipitation_probability_max',
      'wind_speed_10m_max',
      'wind_gusts_10m_max',
      'wind_direction_10m_dominant',
    ].join(','),
    timezone: 'auto',
  });

  const url = `${FORECAST_BASE_URL}?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Forecast server error: status ${response.status}`);
    }

    const raw = await response.json();

    // Parse current weather
    const c = raw.current || {};
    const current: CurrentWeatherData = {
      time: c.time || new Date().toISOString(),
      temperature: c.temperature_2m ?? 0,
      apparentTemperature: c.apparent_temperature ?? c.temperature_2m ?? 0,
      humidity: c.relative_humidity_2m ?? 0,
      isDay: c.is_day === 1,
      precipitation: c.precipitation ?? 0,
      rain: c.rain ?? 0,
      showers: c.showers ?? 0,
      snowfall: c.snowfall ?? 0,
      weatherCode: c.weather_code ?? 0,
      cloudCover: c.cloud_cover ?? 0,
      pressureMsl: c.pressure_msl ?? 1013.25,
      surfacePressure: c.surface_pressure ?? 1013.25,
      windSpeed: c.wind_speed_10m ?? 0,
      windDirection: c.wind_direction_10m ?? 0,
      windGusts: c.wind_gusts_10m ?? 0,
    };

    // Parse hourly forecast
    const h = raw.hourly || {};
    const times: string[] = h.time || [];
    const hourly: HourlyDataPoint[] = times.map((t, i) => ({
      time: t,
      temperature: h.temperature_2m?.[i] ?? 0,
      apparentTemperature: h.apparent_temperature?.[i] ?? 0,
      humidity: h.relative_humidity_2m?.[i] ?? 0,
      precipitationProbability: h.precipitation_probability?.[i] ?? 0,
      precipitation: h.precipitation?.[i] ?? 0,
      weatherCode: h.weather_code?.[i] ?? 0,
      windSpeed: h.wind_speed_10m?.[i] ?? 0,
      uvIndex: h.uv_index?.[i] ?? 0,
      cloudCover: h.cloud_cover?.[i] ?? 0,
      visibility: h.visibility?.[i] ?? 10000,
      pressureMsl: h.pressure_msl?.[i] ?? 1013,
    }));

    // Parse daily forecast
    const d = raw.daily || {};
    const dTimes: string[] = d.time || [];
    const daily: DailyDataPoint[] = dTimes.map((dateStr, i) => ({
      date: dateStr,
      weatherCode: d.weather_code?.[i] ?? 0,
      tempMax: d.temperature_2m_max?.[i] ?? 0,
      tempMin: d.temperature_2m_min?.[i] ?? 0,
      apparentTempMax: d.apparent_temperature_max?.[i] ?? 0,
      apparentTempMin: d.apparent_temperature_min?.[i] ?? 0,
      sunrise: d.sunrise?.[i] || '',
      sunset: d.sunset?.[i] || '',
      uvIndexMax: d.uv_index_max?.[i] ?? 0,
      precipitationSum: d.precipitation_sum?.[i] ?? 0,
      precipitationProbabilityMax: d.precipitation_probability_max?.[i] ?? 0,
      windSpeedMax: d.wind_speed_10m_max?.[i] ?? 0,
      windGustsMax: d.wind_gusts_10m_max?.[i] ?? 0,
      windDirectionDominant: d.wind_direction_10m_dominant?.[i] ?? 0,
    }));

    return {
      location,
      current,
      hourly,
      daily,
      fetchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  } catch (err) {
    console.error('Error fetching weather forecast:', err);
    throw err;
  }
}

/**
 * Default preset locations for quick user selection
 */
export const PRESET_LOCATIONS: LocationResult[] = [
  {
    id: 5128581,
    name: 'New York',
    latitude: 40.71427,
    longitude: -74.00597,
    country: 'United States',
    country_code: 'US',
    admin1: 'New York',
    timezone: 'America/New_York',
  },
  {
    id: 2643743,
    name: 'London',
    latitude: 51.50853,
    longitude: -0.12574,
    country: 'United Kingdom',
    country_code: 'GB',
    admin1: 'England',
    timezone: 'Europe/London',
  },
  {
    id: 1850147,
    name: 'Tokyo',
    latitude: 35.6895,
    longitude: 139.69171,
    country: 'Japan',
    country_code: 'JP',
    admin1: 'Tokyo',
    timezone: 'Asia/Tokyo',
  },
  {
    id: 2988507,
    name: 'Paris',
    latitude: 48.85341,
    longitude: 2.3488,
    country: 'France',
    country_code: 'FR',
    admin1: 'Île-de-France',
    timezone: 'Europe/Paris',
  },
  {
    id: 2147714,
    name: 'Sydney',
    latitude: -33.86785,
    longitude: 151.20732,
    country: 'Australia',
    country_code: 'AU',
    admin1: 'New South Wales',
    timezone: 'Australia/Sydney',
  },
  {
    id: 5391959,
    name: 'San Francisco',
    latitude: 37.77493,
    longitude: -122.41942,
    country: 'United States',
    country_code: 'US',
    admin1: 'California',
    timezone: 'America/Los_Angeles',
  },
];
