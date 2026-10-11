import React from 'react';
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Star,
  ExternalLink,
  ShieldCheck,
  Zap,
  ArrowRight,
  FileText,
  MessageSquare,
  AlertTriangle,
  Building,
  CheckCircle2,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { Lead } from '../types';
import { PLATFORM_CONFIG } from '../data/seedLeads';
import { PlatformLogo } from './PlatformLogo';
import { IndustryLogo } from './IndustryLogo';

interface LeadCardProps {
  lead: Lead;
  onSelectLead: (lead: Lead) => void;
  isSelected?: boolean;
  onToggleSelect?: (id: string) => void;
  theme?: 'dark' | 'light';
}

export const LeadCard: React.FC<LeadCardProps> = ({
  lead,
  onSelectLead,
  isSelected = false,
  onToggleSelect,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  const platform = PLATFORM_CONFIG[lead.source] || PLATFORM_CONFIG.google_maps;
  const topPainPoint = lead.painPoints?.[0];

  const getScoreColor = (score: number) => {
    if (score >= 85) {
      return isLight
        ? 'text-emerald-700 border-emerald-300 bg-emerald-50'
        : 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10';
    }
    if (score >= 60) {
      return isLight
        ? 'text-amber-700 border-amber-300 bg-amber-50'
        : 'text-amber-300 border-amber-500/40 bg-amber-500/10';
    }
    return isLight
      ? 'text-slate-600 border-slate-300 bg-slate-100'
      : 'text-slate-300 border-slate-700 bg-slate-800/40';
  };

  const getTemperatureBadge = (temp: 'Hot' | 'Warm' | 'Cold') => {
    if (temp === 'Hot') {
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
            isLight
              ? 'bg-rose-50 text-rose-700 border-rose-200'
              : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
          }`}
        >
          <Zap className="w-3 h-3 fill-rose-500 text-rose-500" /> Hot Prospect
        </span>
      );
    }
    if (temp === 'Warm') {
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
            isLight
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
          }`}
        >
          ⚡ Warm Lead
        </span>
      );
    }
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${
          isLight
            ? 'bg-zinc-100 text-zinc-600 border-zinc-200'
            : 'bg-slate-800 text-slate-400 border-slate-700'
        }`}
      >
        ❄️ Cold
      </span>
    );
  };

  return (
    <div
      id={`lead-card-${lead.id}`}
      className={`group relative rounded-xl border transition-all duration-150 overflow-hidden flex flex-col justify-between ${
        isLight
          ? isSelected
            ? 'bg-white border-indigo-600 ring-2 ring-indigo-500/20 shadow-md'
            : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-xs hover:shadow-md'
          : isSelected
          ? 'bg-[#09090B] border-indigo-500 ring-1 ring-indigo-500/40 bg-indigo-950/10'
          : 'bg-[#09090B] border-[#27272A] hover:border-zinc-600'
      }`}
    >
      {/* Top Header Card Info */}
      <div className="p-3.5 sm:p-4">
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Checkbox */}
            {onToggleSelect && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleSelect(lead.id)}
                className={`rounded border text-indigo-600 focus:ring-indigo-500 cursor-pointer ${
                  isLight ? 'border-zinc-300 bg-white' : 'border-zinc-700 bg-zinc-800'
                }`}
                aria-label={`Select ${lead.name}`}
              />
            )}

            {/* Platform Tag */}
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold border ${platform.badgeBg}`}
            >
              <PlatformLogo source={lead.source} size={13} />
              <span>{platform.name}</span>
            </span>

            {/* Category Tag with Official Industry Icon */}
            <span
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border ${
                isLight
                  ? 'bg-zinc-100 text-zinc-700 border-zinc-200'
                  : 'bg-[#18181B] text-zinc-400 border-[#27272A]'
              }`}
            >
              <IndustryLogo category={lead.category} size={11} className="p-0 bg-transparent" />
              <span>{lead.category}</span>
            </span>
          </div>

          {/* Lead Temperature & Score */}
          <div className="flex items-center gap-1 shrink-0">
            {getTemperatureBadge(lead.temperature)}
            <div
              className={`flex items-center justify-center font-mono font-bold text-[11px] px-1.5 py-0.5 rounded border ${getScoreColor(
                lead.score,
              )}`}
            >
              {lead.score}
            </div>
          </div>
        </div>

        {/* Business and Contact Name */}
        <div className="mb-2.5">
          <h3
            className={`font-bold text-sm transition-colors line-clamp-1 ${
              isLight
                ? 'text-zinc-900 group-hover:text-indigo-600'
                : 'text-zinc-100 group-hover:text-indigo-300'
            }`}
          >
            {lead.companyName}
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5 text-xs">
            <span
              className={`font-medium ${
                isLight ? 'text-zinc-700' : 'text-zinc-300'
              }`}
            >
              {lead.name}
            </span>
            {lead.title && (
              <span className={isLight ? 'text-zinc-400 text-[11px]' : 'text-zinc-500 text-[11px]'}>
                • {lead.title}
              </span>
            )}
          </div>
        </div>

        {/* Location & Key Metrics */}
        <div
          className={`flex items-center gap-2.5 flex-wrap text-xs mb-3 ${
            isLight ? 'text-zinc-500' : 'text-zinc-400'
          }`}
        >
          <div className="flex items-center gap-1 text-[11px]">
            <MapPin className={`w-3 h-3 ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`} />
            <span className="line-clamp-1">{lead.location.formatted}</span>
          </div>

          {lead.rating && (
            <div className="flex items-center gap-1 text-amber-500 font-mono text-[10px] font-semibold">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{lead.rating.toFixed(1)}</span>
              {lead.reviewsCount && (
                <span className={isLight ? 'text-zinc-400' : 'text-zinc-500'}>
                  ({lead.reviewsCount})
                </span>
              )}
            </div>
          )}

          {lead.researchedData.estimatedAnnualRevenue && (
            <div className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-semibold">
              <DollarSign className="w-3 h-3" />
              <span>{lead.researchedData.estimatedAnnualRevenue}</span>
            </div>
          )}
        </div>

        {/* Verified Channels Badges */}
        <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
          {lead.email ? (
            <span
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono border ${
                isLight
                  ? 'bg-zinc-50 border-zinc-200 text-zinc-700'
                  : 'bg-[#18181B] border-[#27272A] text-zinc-300'
              }`}
            >
              <Mail className="w-2.5 h-2.5 text-indigo-500" />
              <span className="truncate max-w-[130px]">{lead.email}</span>
            </span>
          ) : (
            <span
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] border ${
                isLight
                  ? 'bg-zinc-100 border-zinc-200 text-zinc-400'
                  : 'bg-[#18181B]/50 border-[#27272A]/50 text-zinc-600'
              }`}
            >
              <Mail className="w-2.5 h-2.5 text-zinc-400" />
              <span>No email</span>
            </span>
          )}

          {lead.phone && (
            <span
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono border ${
                isLight
                  ? 'bg-zinc-50 border-zinc-200 text-zinc-700'
                  : 'bg-[#18181B] border-[#27272A] text-zinc-300'
              }`}
            >
              <Phone className="w-2.5 h-2.5 text-emerald-500" />
              <span>{lead.phone}</span>
            </span>
          )}

          {lead.website && (
            <a
              href={lead.website}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] border transition-colors ${
                isLight
                  ? 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300'
                  : 'bg-[#18181B] border-[#27272A] text-zinc-400 hover:text-zinc-200'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <Globe className="w-2.5 h-2.5 text-blue-500" />
              <span className="truncate max-w-[100px]">
                {lead.website.replace('https://', '').replace('http://', '').replace('www.', '')}
              </span>
            </a>
          )}
        </div>

        {/* Diagnosed Pain Point Snippet */}
        {topPainPoint && (
          <div
            className={`p-2 rounded border mb-2 text-xs ${
              isLight
                ? 'bg-rose-50/60 border-rose-200'
                : 'bg-[#18181B] border-[#27272A]'
            }`}
          >
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <span
                className={`flex items-center gap-1 font-semibold text-[10px] ${
                  isLight ? 'text-rose-700' : 'text-rose-300'
                }`}
              >
                <AlertTriangle className="w-2.5 h-2.5 text-rose-500" />
                <span>Diagnosed Bottleneck</span>
              </span>
              <span
                className={`text-[9px] font-mono font-bold ${
                  isLight ? 'text-rose-700' : 'text-rose-400/90'
                }`}
              >
                {topPainPoint.estimatedRevenueLoss}
              </span>
            </div>
            <p
              className={`text-[10px] line-clamp-2 leading-relaxed ${
                isLight ? 'text-zinc-600' : 'text-zinc-400'
              }`}
            >
              {topPainPoint.description}
            </p>
          </div>
        )}

        {/* Facebook Post Trigger or Intent Snippet */}
        {lead.sourceSpecificData?.facebookPostContent && (
          <div
            className={`p-1.5 rounded border text-[10px] mb-2 ${
              isLight
                ? 'bg-blue-50/70 border-blue-200 text-blue-900'
                : 'bg-blue-950/20 border-blue-900/30 text-blue-300'
            }`}
          >
            <span className="font-bold text-blue-600 dark:text-blue-400">Intent Trigger: </span>
            <span className="italic line-clamp-2">"{lead.sourceSpecificData.facebookPostContent}"</span>
          </div>
        )}
      </div>

      {/* Bottom CTA Action Button */}
      <div
        className={`px-3.5 py-2.5 border-t flex items-center justify-between gap-2 ${
          isLight
            ? 'bg-zinc-50 border-zinc-200'
            : 'bg-[#121215] border-[#27272A]'
        }`}
      >
        <div
          className={`flex items-center gap-1 text-[10px] font-medium ${
            isLight ? 'text-zinc-500' : 'text-zinc-400'
          }`}
        >
          <FileText className="w-3 h-3 text-indigo-500" />
          <span>Research Dossier Ready</span>
        </div>

        <button
          type="button"
          id={`btn-view-lead-${lead.id}`}
          onClick={() => onSelectLead(lead)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
            isLight
              ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 shadow-xs'
              : 'bg-indigo-600/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-600 hover:text-white'
          }`}
        >
          <span>Open Dossier</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
