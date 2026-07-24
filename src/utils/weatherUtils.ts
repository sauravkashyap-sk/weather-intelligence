import {
  WeatherConditionInfo,
  CurrentWeatherData,
  HourlyDataPoint,
  DailyDataPoint,
  PlanningInsights,
  ActivityRecommendation,
  UnitSettings,
  TemperatureUnit,
  SpeedUnit,
  PrecipitationUnit
} from '../types/weather';

/**
 * Maps WMO Weather Interpretation Codes (0 - 99) to human readable metadata,
 * icon identifiers, and visual styling theme classes.
 */
export function getWeatherCondition(code: number, isDay: boolean = true): WeatherConditionInfo {
  switch (code) {
    case 0:
      return {
        code,
        label: 'Clear Sky',
        description: isDay ? 'Bright sunny skies' : 'Clear starry night',
        iconName: isDay ? 'Sun' : 'Moon',
        bgGradientLight: 'from-amber-400 via-orange-400 to-sky-500',
        bgGradientDark: 'from-slate-900 via-indigo-950 to-blue-900',
        accentColor: '#f59e0b',
      };
    case 1:
      return {
        code,
        label: 'Mainly Clear',
        description: 'Mostly sunny with occasional soft clouds',
        iconName: isDay ? 'Sun' : 'Moon',
        bgGradientLight: 'from-sky-400 via-blue-400 to-indigo-500',
        bgGradientDark: 'from-slate-900 via-slate-800 to-indigo-900',
        accentColor: '#38bdf8',
      };
    case 2:
      return {
        code,
        label: 'Partly Cloudy',
        description: 'Scattered clouds with periods of sunshine',
        iconName: isDay ? 'CloudSun' : 'CloudMoon',
        bgGradientLight: 'from-blue-400 via-slate-400 to-sky-600',
        bgGradientDark: 'from-slate-900 via-blue-950 to-slate-800',
        accentColor: '#60a5fa',
      };
    case 3:
      return {
        code,
        label: 'Overcast',
        description: 'Dense gray cloud blanket covering the sky',
        iconName: 'Cloud',
        bgGradientLight: 'from-slate-400 via-gray-500 to-slate-600',
        bgGradientDark: 'from-gray-900 via-slate-900 to-zinc-900',
        accentColor: '#94a3b8',
      };
    case 45:
    case 48:
      return {
        code,
        label: 'Foggy',
        description: 'Low visibility due to thick mist and fog',
        iconName: 'CloudFog',
        bgGradientLight: 'from-slate-300 via-zinc-400 to-slate-500',
        bgGradientDark: 'from-zinc-900 via-slate-900 to-gray-800',
        accentColor: '#cbd5e1',
      };
    case 51:
    case 53:
    case 55:
      return {
        code,
        label: 'Drizzle',
        description: 'Light misty droplets falling continuously',
        iconName: 'CloudDrizzle',
        bgGradientLight: 'from-cyan-400 via-blue-500 to-slate-600',
        bgGradientDark: 'from-slate-900 via-cyan-950 to-slate-800',
        accentColor: '#06b6d4',
      };
    case 56:
    case 57:
      return {
        code,
        label: 'Freezing Drizzle',
        description: 'Icy drizzle creating slippery surfaces',
        iconName: 'CloudSnow',
        bgGradientLight: 'from-cyan-300 via-sky-400 to-slate-500',
        bgGradientDark: 'from-slate-900 via-sky-950 to-cyan-900',
        accentColor: '#38bdf8',
      };
    case 61:
      return {
        code,
        label: 'Light Rain',
        description: 'Gentle raindrops falling intermittently',
        iconName: 'CloudDrizzle',
        bgGradientLight: 'from-sky-500 via-blue-600 to-slate-700',
        bgGradientDark: 'from-slate-900 via-blue-950 to-slate-900',
        accentColor: '#0284c7',
      };
    case 63:
      return {
        code,
        label: 'Moderate Rain',
        description: 'Steady rain shower falling over the area',
        iconName: 'CloudRain',
        bgGradientLight: 'from-blue-600 via-indigo-600 to-slate-800',
        bgGradientDark: 'from-slate-950 via-blue-950 to-indigo-950',
        accentColor: '#2563eb',
      };
    case 65:
      return {
        code,
        label: 'Heavy Rain',
        description: 'Pouring downpours with puddle accumulation',
        iconName: 'CloudRainWind',
        bgGradientLight: 'from-indigo-600 via-blue-800 to-slate-900',
        bgGradientDark: 'from-slate-950 via-slate-900 to-blue-950',
        accentColor: '#1d4ed8',
      };
    case 66:
    case 67:
      return {
        code,
        label: 'Freezing Rain',
        description: 'Rain freezing on impact with ground surfaces',
        iconName: 'CloudSnow',
        bgGradientLight: 'from-sky-400 via-indigo-600 to-slate-700',
        bgGradientDark: 'from-slate-900 via-cyan-950 to-slate-950',
        accentColor: '#0ea5e9',
      };
    case 71:
    case 73:
    case 75:
      return {
        code,
        label: 'Snowfall',
        description: 'Snow flakes drifting down with ground accumulation',
        iconName: 'Snowflake',
        bgGradientLight: 'from-sky-200 via-blue-300 to-slate-400',
        bgGradientDark: 'from-slate-900 via-sky-950 to-slate-800',
        accentColor: '#7dd3fc',
      };
    case 77:
      return {
        code,
        label: 'Snow Grains',
        description: 'Tiny ice particles floating in freezing air',
        iconName: 'Snowflake',
        bgGradientLight: 'from-slate-300 via-sky-300 to-blue-400',
        bgGradientDark: 'from-slate-900 via-blue-900 to-slate-800',
        accentColor: '#a5f3fc',
      };
    case 80:
    case 81:
    case 82:
      return {
        code,
        label: 'Rain Showers',
        description: 'Brief heavy rain bursts with quick breaks',
        iconName: 'CloudRain',
        bgGradientLight: 'from-sky-500 via-indigo-600 to-slate-700',
        bgGradientDark: 'from-slate-900 via-indigo-950 to-slate-900',
        accentColor: '#3b82f6',
      };
    case 85:
    case 86:
      return {
        code,
        label: 'Snow Showers',
        description: 'Intermittent heavy snow bursts with gusty wind',
        iconName: 'Snowflake',
        bgGradientLight: 'from-sky-300 via-indigo-400 to-slate-600',
        bgGradientDark: 'from-slate-900 via-slate-800 to-indigo-900',
        accentColor: '#e0f2fe',
      };
    case 95:
      return {
        code,
        label: 'Thunderstorm',
        description: 'Thunder and lightning with sudden rain squalls',
        iconName: 'CloudLightning',
        bgGradientLight: 'from-indigo-800 via-purple-900 to-slate-900',
        bgGradientDark: 'from-gray-950 via-slate-900 to-purple-950',
        accentColor: '#8b5cf6',
      };
    case 96:
    case 99:
      return {
        code,
        label: 'Thunderstorm & Hail',
        description: 'Severe storm with lightning and falling hail',
        iconName: 'CloudLightning',
        bgGradientLight: 'from-purple-900 via-slate-900 to-zinc-900',
        bgGradientDark: 'from-black via-purple-950 to-slate-950',
        accentColor: '#a855f7',
      };
    default:
      return {
        code,
        label: 'Unknown Weather',
        description: 'Variable local weather conditions',
        iconName: 'Cloud',
        bgGradientLight: 'from-sky-400 to-blue-600',
        bgGradientDark: 'from-slate-900 to-slate-800',
        accentColor: '#38bdf8',
      };
  }
}

// Temperature conversion
export function convertTemp(celsius: number, unit: TemperatureUnit): number {
  if (unit === 'fahrenheit') {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
}

export function formatTemp(celsius: number, unit: TemperatureUnit): string {
  const val = convertTemp(celsius, unit);
  return `${val}°${unit === 'fahrenheit' ? 'F' : 'C'}`;
}

// Speed conversion
export function convertSpeed(kmh: number, unit: SpeedUnit): number {
  if (unit === 'mph') {
    return Math.round(kmh * 0.621371);
  }
  return Math.round(kmh);
}

export function formatSpeed(kmh: number, unit: SpeedUnit): string {
  const val = convertSpeed(kmh, unit);
  return `${val} ${unit === 'mph' ? 'mph' : 'km/h'}`;
}

// Precipitation conversion
export function convertPrecip(mm: number, unit: PrecipitationUnit): number {
  if (unit === 'inch') {
    return Number((mm * 0.0393701).toFixed(2));
  }
  return Number(mm.toFixed(1));
}

export function formatPrecip(mm: number, unit: PrecipitationUnit): string {
  const val = convertPrecip(mm, unit);
  return `${val} ${unit === 'inch' ? 'in' : 'mm'}`;
}

// Wind direction compass cardinal
export function formatWindDir(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index] || 'N';
}

// Format Time (e.g. "2026-07-24T14:00" -> "2 PM" or "14:00")
export function formatHourTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

// Format Day (e.g. "2026-07-24" -> "Fri, Jul 24" or "Today")
export function formatDayName(dateStr: string, isFirstDay: boolean = false): string {
  const date = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  if (isToday || isFirstDay) {
    return 'Today';
  }

  return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
}

/**
 * Generate Smart Weather Intelligence & Planning Recommendations
 */
export function generatePlanningInsights(
  current: CurrentWeatherData,
  hourly: HourlyDataPoint[],
  daily: DailyDataPoint[],
  unitSettings: UnitSettings
): PlanningInsights {
  const tempC = current.temperature;
  const isRainy = current.precipitation > 0 || current.weatherCode >= 50;
  const windKmh = current.windSpeed;
  const humidity = current.humidity;
  const todayDaily = daily[0];
  const maxUv = todayDaily ? todayDaily.uvIndexMax : 3;

  // Calculate outdoor suitability score (0-10)
  let score = 10;

  if (isRainy) score -= 3.5;
  if (tempC < 5) score -= 2.5;
  else if (tempC > 32) score -= 2;
  else if (tempC >= 18 && tempC <= 25) score += 0.5;

  if (windKmh > 35) score -= 2.5;
  else if (windKmh > 20) score -= 1;

  if (humidity > 85) score -= 1;
  if (maxUv >= 8) score -= 1;

  score = Math.max(1, Math.min(10, Math.round(score * 10) / 10));

  // Summary quote
  let summaryQuote = 'Optimal conditions for outdoor activities!';
  if (score >= 8.5) {
    summaryQuote = 'Gorgeous weather ahead! Perfect for sports, walks, and outdoor plans.';
  } else if (score >= 6.5) {
    summaryQuote = 'Generally favorable conditions with mild outdoor comfort.';
  } else if (score >= 4.5) {
    summaryQuote = 'Fair weather with minor elements to keep in mind before stepping out.';
  } else {
    summaryQuote = 'Challenging weather conditions—plan indoor activities or dress appropriately.';
  }

  // Outfit Recommendations
  const clothing: string[] = [];
  const accessories: string[] = [];
  let note = '';

  if (tempC <= 0) {
    clothing.push('Thermal base layer', 'Heavy insulated parka', 'Fleece pants');
    accessories.push('Beanie', 'Warm gloves', 'Winter scarf');
    note = 'Freezing temperature! Protect exposed skin against frost risks.';
  } else if (tempC <= 10) {
    clothing.push('Warm coat or heavy sweater', 'Long trousers / denim');
    accessories.push('Light scarf or knitted cap');
    note = 'Chilly weather—layering is recommended throughout the day.';
  } else if (tempC <= 20) {
    clothing.push('Light jacket or cardigan', 'Comfortable cotton shirt', 'Jeans');
    accessories.push('Sunglasses');
    note = 'Mild and comfortable—a light removable layer works best.';
  } else if (tempC <= 28) {
    clothing.push('Breathable cotton t-shirt', 'Shorts or light trousers');
    accessories.push('Sunglasses', 'Sun cap');
    note = 'Warm & pleasant! Ideal for light summer attire.';
  } else {
    clothing.push('Ultra-light linen/cotton clothes', 'Loose shorts or dress');
    accessories.push('Wide-brim hat', 'Polarized sunglasses', 'Sunscreen SPF 50+');
    note = 'High heat! Wear loose light-colored garments to reflect solar radiation.';
  }

  if (isRainy || (todayDaily && todayDaily.precipitationProbabilityMax > 50)) {
    accessories.push('Waterproof umbrella', 'Rain jacket / poncho');
    if (!clothing.includes('Water-resistant footwear')) {
      clothing.push('Water-resistant shoes');
    }
  }

  // Find best 3-hour outdoor time window today (from next 18 hours)
  let bestWindow = null;
  if (hourly && hourly.length > 0) {
    const nextHours = hourly.slice(0, 18);
    let bestAvgScore = -1;
    let bestStartIdx = 0;

    for (let i = 0; i <= nextHours.length - 3; i++) {
      const windowHours = nextHours.slice(i, i + 3);
      const avgRainProb = windowHours.reduce((acc, h) => acc + h.precipitationProbability, 0) / 3;
      const avgTemp = windowHours.reduce((acc, h) => acc + h.temperature, 0) / 3;
      const avgWind = windowHours.reduce((acc, h) => acc + h.windSpeed, 0) / 3;

      let windowScore = 10 - avgRainProb / 10;
      if (avgTemp >= 16 && avgTemp <= 26) windowScore += 2;
      else if (avgTemp < 8 || avgTemp > 32) windowScore -= 3;
      if (avgWind > 25) windowScore -= 2;

      if (windowScore > bestAvgScore) {
        bestAvgScore = windowScore;
        bestStartIdx = i;
      }
    }

    const startH = nextHours[bestStartIdx];
    const endH = nextHours[bestStartIdx + 2];
    if (startH && endH) {
      bestWindow = {
        start: formatHourTime(startH.time),
        end: formatHourTime(endH.time),
        reason: `Lowest rain probability (${startH.precipitationProbability}%) with comfortable ${formatTemp(startH.temperature, unitSettings.temperature)} temperature.`,
      };
    }
  }

  // Driving Advisory
  let drivingStatus: 'optimal' | 'caution' | 'hazardous' = 'optimal';
  let drivingMessage = 'Clear road visibility and dry pavement conditions.';

  if (current.weatherCode >= 95) {
    drivingStatus = 'hazardous';
    drivingMessage = 'Severe thunderstorm hazard! Watch out for sudden flash floods, hydroplaning, and lightning.';
  } else if (current.weatherCode === 45 || current.weatherCode === 48) {
    drivingStatus = 'hazardous';
    drivingMessage = 'Dense fog alert! Turn on low-beam headlights and maintain extra braking distance.';
  } else if (current.weatherCode >= 63) {
    drivingStatus = 'caution';
    drivingMessage = 'Heavy rainfall on roads. Maintain increased following distance and check windshield wipers.';
  } else if (windKmh > 40) {
    drivingStatus = 'caution';
    drivingMessage = 'High wind gusts! Exercise caution when driving high-profile vehicles or crossing bridges.';
  }

  // UV Advice
  let uvLevel = 'Low';
  let uvAdvice = 'No special solar protection required.';
  if (maxUv >= 11) {
    uvLevel = 'Extreme (11+)';
    uvAdvice = 'Avoid sun exposure between 10 AM – 4 PM. Reapply SPF 50+ every 2 hours.';
  } else if (maxUv >= 8) {
    uvLevel = 'Very High (8-10)';
    uvAdvice = 'High risk of skin burn. Wear UV protection, sunglasses, and seek shade during midday.';
  } else if (maxUv >= 6) {
    uvLevel = 'High (6-7)';
    uvAdvice = 'Protection required. Wear hat, UV sunglasses, and sunscreen SPF 30+.';
  } else if (maxUv >= 3) {
    uvLevel = 'Moderate (3-5)';
    uvAdvice = 'Moderate UV radiation. Wear sunglasses and SPF 15+ if outside for >30 mins.';
  }

  // Specific Activities
  const activities: ActivityRecommendation[] = [
    {
      id: 'running',
      title: 'Running & Jogging',
      rating: tempC >= 10 && tempC <= 22 && !isRainy && windKmh < 25 ? 9 : isRainy ? 3 : 6,
      status: isRainy ? 'poor' : tempC > 30 ? 'moderate' : 'excellent',
      summary: isRainy ? 'Slippery paths & rain expected' : tempC > 28 ? 'Warm weather - stay hydrated' : 'Ideal outdoor cardio window',
      tips: ['Hydrate before & after', tempC < 10 ? 'Wear breathable warm tights' : 'Light moisture-wicking top'],
      iconName: 'Activity',
    },
    {
      id: 'cycling',
      title: 'Cycling & Biking',
      rating: windKmh > 30 ? 3 : isRainy ? 2 : 9,
      status: windKmh > 30 || isRainy ? 'poor' : 'excellent',
      summary: windKmh > 25 ? `Strong headwind (${formatSpeed(windKmh, unitSettings.speed)})` : 'Smooth riding conditions',
      tips: ['Check tire traction on wet pavement', 'Wear windproof glasses'],
      iconName: 'Bike',
    },
    {
      id: 'dining',
      title: 'Outdoor Dining & Patio',
      rating: tempC >= 18 && tempC <= 27 && !isRainy && windKmh < 20 ? 10 : isRainy ? 1 : 5,
      status: isRainy ? 'poor' : tempC >= 18 ? 'excellent' : 'moderate',
      summary: isRainy ? 'Indoor seating recommended' : 'Pleasant outdoor dining atmosphere',
      tips: ['Reserve outdoor seating early', 'Check for patio shade heaters if breezy'],
      iconName: 'Utensils',
    },
    {
      id: 'gardening',
      title: 'Gardening & Plants',
      rating: isRainy ? 4 : tempC > 32 ? 4 : 8,
      status: isRainy ? 'moderate' : 'good',
      summary: isRainy ? 'Natural precipitation watering soil' : 'Good window for pruning & plant care',
      tips: [isRainy ? 'Ensure soil drainage is working' : 'Water plants early morning or evening'],
      iconName: 'Flower2',
    },
  ];

  return {
    activityScore: score,
    summaryQuote,
    bestOutdoorWindow: bestWindow,
    outfitRecommendation: {
      clothing,
      accessories,
      note,
    },
    drivingAdvisory: {
      status: drivingStatus,
      message: drivingMessage,
    },
    uvHealthAdvice: {
      level: uvLevel,
      recommendation: uvAdvice,
    },
    activities,
  };
}
