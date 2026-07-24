export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type SpeedUnit = 'kmh' | 'mph';
export type PrecipitationUnit = 'mm' | 'inch';

export interface UnitSettings {
  temperature: TemperatureUnit;
  speed: SpeedUnit;
  precipitation: PrecipitationUnit;
}

export interface LocationResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  country?: string;
  admin1?: string;
  admin2?: string;
  timezone: string;
  population?: number;
}

export interface CurrentWeatherData {
  time: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  isDay: boolean;
  precipitation: number;
  rain: number;
  showers: number;
  snowfall: number;
  weatherCode: number;
  cloudCover: number;
  pressureMsl: number;
  surfacePressure: number;
  windSpeed: number;
  windDirection: number;
  windGusts: number;
}

export interface HourlyDataPoint {
  time: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitationProbability: number;
  precipitation: number;
  weatherCode: number;
  windSpeed: number;
  uvIndex: number;
  cloudCover: number;
  visibility: number;
  pressureMsl: number;
}

export interface DailyDataPoint {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  apparentTempMax: number;
  apparentTempMin: number;
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
  precipitationSum: number;
  precipitationProbabilityMax: number;
  windSpeedMax: number;
  windGustsMax: number;
  windDirectionDominant: number;
}

export interface WeatherData {
  location: LocationResult;
  current: CurrentWeatherData;
  hourly: HourlyDataPoint[];
  daily: DailyDataPoint[];
  fetchedAt: string;
}

export interface WeatherConditionInfo {
  code: number;
  label: string;
  description: string;
  iconName: string;
  bgGradientLight: string;
  bgGradientDark: string;
  accentColor: string;
}

export interface ActivityRecommendation {
  id: string;
  title: string;
  rating: number; // 0 to 10
  status: 'excellent' | 'good' | 'moderate' | 'poor' | 'extreme';
  summary: string;
  tips: string[];
  iconName: string;
}

export interface PlanningInsights {
  activityScore: number;
  summaryQuote: string;
  bestOutdoorWindow: {
    start: string;
    end: string;
    reason: string;
  } | null;
  outfitRecommendation: {
    clothing: string[];
    accessories: string[];
    note: string;
  };
  drivingAdvisory: {
    status: 'optimal' | 'caution' | 'hazardous';
    message: string;
  };
  uvHealthAdvice: {
    level: string;
    recommendation: string;
  };
  activities: ActivityRecommendation[];
}
