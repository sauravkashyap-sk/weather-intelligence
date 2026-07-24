import React from 'react';
import {
  Sparkles,
  Shirt,
  Clock,
  Car,
  ShieldAlert,
  Activity,
  Bike,
  Utensils,
  Flower2,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sun,
} from 'lucide-react';
import { PlanningInsights, UnitSettings } from '../types/weather';

interface PlanningRecommendationsProps {
  insights: PlanningInsights;
  unitSettings: UnitSettings;
}

export const PlanningRecommendations: React.FC<PlanningRecommendationsProps> = ({
  insights,
}) => {
  const getScoreBadgeColor = (score: number) => {
    if (score >= 8) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    if (score >= 6) return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
    if (score >= 4) return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
  };

  const getActivityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="w-4 h-4 text-sky-400" />;
      case 'Bike':
        return <Bike className="w-4 h-4 text-emerald-400" />;
      case 'Utensils':
        return <Utensils className="w-4 h-4 text-amber-400" />;
      case 'Flower2':
        return <Flower2 className="w-4 h-4 text-purple-400" />;
      default:
        return <Activity className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <div className="bg-slate-900/70 backdrop-blur-md rounded-3xl p-6 border border-slate-800/80 shadow-xl space-y-6">
      {/* Title Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-100">Smart Weather Intelligence & Planning</h2>
            <p className="text-xs text-slate-400">Personalized recommendations based on current atmospheric conditions</p>
          </div>
        </div>

        {/* Score Badge */}
        <div className={`px-4 py-2 rounded-2xl border text-center font-bold ${getScoreBadgeColor(insights.activityScore)}`}>
          <div className="text-xs uppercase tracking-wider text-slate-300 font-medium">Outdoor Index</div>
          <div className="text-xl font-black">{insights.activityScore} / 10</div>
        </div>
      </div>

      {/* Summary Banner Quote */}
      <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-sm font-medium text-slate-200 flex items-start gap-3">
        <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">{insights.summaryQuote}</p>
      </div>

      {/* Grid of Key Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Best Outdoor Time Window */}
        <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
            <Clock className="w-4 h-4 text-sky-400" />
            <span>Optimal Outdoor Window</span>
          </div>
          {insights.bestOutdoorWindow ? (
            <div>
              <div className="text-base font-extrabold text-white">
                {insights.bestOutdoorWindow.start} – {insights.bestOutdoorWindow.end}
              </div>
              <p className="text-xs text-slate-300 mt-1">{insights.bestOutdoorWindow.reason}</p>
            </div>
          ) : (
            <p className="text-xs text-slate-400">Continuous condition expected today.</p>
          )}
        </div>

        {/* Outfit Recommendations */}
        <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Shirt className="w-4 h-4 text-amber-400" />
            <span>Recommended Outfit</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {insights.outfitRecommendation.clothing.map((item, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-700/80 text-xs font-medium text-slate-200"
              >
                {item}
              </span>
            ))}
            {insights.outfitRecommendation.accessories.map((item, idx) => (
              <span
                key={`acc-${idx}`}
                className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300"
              >
                + {item}
              </span>
            ))}
          </div>
        </div>

        {/* Driving Advisory */}
        <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
            <Car className="w-4 h-4 text-indigo-400" />
            <span>Commute & Road Safety</span>
          </div>
          <div className="flex items-start gap-2">
            {insights.drivingAdvisory.status === 'hazardous' ? (
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            ) : insights.drivingAdvisory.status === 'caution' ? (
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <p className="text-xs text-slate-200 leading-snug">{insights.drivingAdvisory.message}</p>
          </div>
        </div>
      </div>

      {/* Activity Suitability Cards */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
          Activity Suitability Ratings
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {insights.activities.map((act) => (
            <div
              key={act.id}
              className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-slate-900 border border-slate-700">
                    {getActivityIcon(act.iconName)}
                  </div>
                  <span className="text-xs font-bold text-slate-200">{act.title}</span>
                </div>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                    act.status === 'excellent'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : act.status === 'good'
                      ? 'bg-sky-500/20 text-sky-300'
                      : act.status === 'moderate'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {act.rating}/10
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">{act.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
