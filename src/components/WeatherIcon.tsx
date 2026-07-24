import React from 'react';
import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudLightning,
  Snowflake,
  LucideProps,
} from 'lucide-react';

interface WeatherIconProps extends LucideProps {
  name: string;
  size?: number;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ name, size = 28, className = '', ...props }) => {
  switch (name) {
    case 'Sun':
      return <Sun size={size} className={`text-amber-400 animate-spin-slow ${className}`} {...props} />;
    case 'Moon':
      return <Moon size={size} className={`text-indigo-200 ${className}`} {...props} />;
    case 'CloudSun':
      return <CloudSun size={size} className={`text-amber-300 ${className}`} {...props} />;
    case 'CloudMoon':
      return <CloudMoon size={size} className={`text-indigo-300 ${className}`} {...props} />;
    case 'Cloud':
      return <Cloud size={size} className={`text-slate-300 ${className}`} {...props} />;
    case 'CloudFog':
      return <CloudFog size={size} className={`text-slate-300 ${className}`} {...props} />;
    case 'CloudDrizzle':
      return <CloudDrizzle size={size} className={`text-cyan-300 ${className}`} {...props} />;
    case 'CloudRain':
      return <CloudRain size={size} className={`text-blue-400 ${className}`} {...props} />;
    case 'CloudRainWind':
      return <CloudRainWind size={size} className={`text-blue-500 ${className}`} {...props} />;
    case 'CloudSnow':
      return <CloudSnow size={size} className={`text-sky-200 ${className}`} {...props} />;
    case 'CloudLightning':
      return <CloudLightning size={size} className={`text-purple-400 animate-pulse ${className}`} {...props} />;
    case 'Snowflake':
      return <Snowflake size={size} className={`text-sky-200 animate-pulse ${className}`} {...props} />;
    default:
      return <Cloud size={size} className={`text-slate-300 ${className}`} {...props} />;
  }
};
