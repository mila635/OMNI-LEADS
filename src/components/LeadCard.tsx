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

interface LeadCardProps {
  lead: Lead;
  onSelectLead: (lead: Lead) => void;
  isSelected?: boolean;
  onToggleSelect?: (id: string) => void;
}

export const LeadCard: React.FC<LeadCardProps> = ({
  lead,
  onSelectLead,
  isSelected = false,
  onToggleSelect,
}) => {
  const platform = PLATFORM_CONFIG[lead.source] || PLATFORM_CONFIG.google_maps;
  const topPainPoint = lead.painPoints?.[0];

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'from-emerald-500 to-teal-400 text-emerald-300 border-emerald-500/40 bg-emerald-500/10';
    if (score >= 60) return 'from-amber-500 to-yellow-400 text-amber-300 border-amber-500/40 bg-amber-500/10';
    return 'from-slate-500 to-slate-400 text-slate-300 border-slate-700 bg-slate-800/40';
  };

  const getTemperatureBadge = (temp: 'Hot' | 'Warm' | 'Cold') => {
    if (temp === 'Hot') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
          <Zap className="w-3 h-3 fill-rose-400" /> Hot Prospect
        </span>
      );
    }
    if (temp === 'Warm') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
          ⚡ Warm Lead
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-400 border border-slate-700">
        ❄️ Cold
      </span>
    );
  };

  return (
    <div
      id={`lead-card-${lead.id}`}
      className={`group relative rounded-lg border transition-colors overflow-hidden flex flex-col justify-between bg-[#09090B] ${
        isSelected
          ? 'border-indigo-500 ring-1 ring-indigo-500/40 bg-indigo-950/10'
          : 'border-[#27272A] hover:border-zinc-600'
      }`}
    >
      {/* Top Header Card Info */}
      <div className="p-3 sm:p-3.5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Checkbox */}
            {onToggleSelect && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleSelect(lead.id)}
                className="rounded border-zinc-700 bg-zinc-800 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                aria-label={`Select ${lead.name}`}
              />
            )}

            {/* Platform Tag */}
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${platform.badgeBg}`}
            >
              <span>{platform.name}</span>
            </span>

            {/* Category Tag */}
            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#18181B] text-zinc-400 border border-[#27272A]">
              {lead.category}
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
        <div className="mb-2">
          <h3 className="font-bold text-sm text-zinc-100 group-hover:text-indigo-300 transition-colors line-clamp-1">
            {lead.companyName}
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5 text-xs text-zinc-400">
            <span className="font-medium text-zinc-300">{lead.name}</span>
            {lead.title && <span className="text-zinc-500 text-[11px]">• {lead.title}</span>}
          </div>
        </div>

        {/* Location & Key Metrics */}
        <div className="flex items-center gap-2.5 flex-wrap text-xs text-zinc-400 mb-2.5">
          <div className="flex items-center gap-1 text-zinc-400 text-[11px]">
            <MapPin className="w-3 h-3 text-zinc-500" />
            <span className="line-clamp-1">{lead.location.formatted}</span>
          </div>

          {lead.rating && (
            <div className="flex items-center gap-1 text-amber-400 font-mono text-[10px]">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{lead.rating.toFixed(1)}</span>
              {lead.reviewsCount && <span className="text-zinc-500 font-mono">({lead.reviewsCount})</span>}
            </div>
          )}

          {lead.researchedData.estimatedAnnualRevenue && (
            <div className="flex items-center gap-1 text-emerald-400 font-mono text-[10px]">
              <DollarSign className="w-3 h-3" />
              <span>{lead.researchedData.estimatedAnnualRevenue}</span>
            </div>
          )}
        </div>

        {/* Verified Channels Badges */}
        <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
          {lead.email ? (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-[#18181B] border border-[#27272A] text-zinc-300 font-mono">
              <Mail className="w-2.5 h-2.5 text-indigo-400" />
              <span className="truncate max-w-[130px]">{lead.email}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-[#18181B]/50 border border-[#27272A]/50 text-zinc-600">
              <Mail className="w-2.5 h-2.5 text-zinc-600" />
              <span>No email</span>
            </span>
          )}

          {lead.phone && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-[#18181B] border border-[#27272A] text-zinc-300 font-mono">
              <Phone className="w-2.5 h-2.5 text-emerald-400" />
              <span>{lead.phone}</span>
            </span>
          )}

          {lead.website && (
            <a
              href={lead.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-[#18181B] border border-[#27272A] text-zinc-400 hover:text-zinc-200"
              onClick={(e) => e.stopPropagation()}
            >
              <Globe className="w-2.5 h-2.5 text-blue-400" />
              <span className="truncate max-w-[100px]">
                {lead.website.replace('https://', '').replace('http://', '').replace('www.', '')}
              </span>
            </a>
          )}
        </div>

        {/* Diagnosed Pain Point Snippet */}
        {topPainPoint && (
          <div className="p-2 rounded bg-[#18181B] border border-[#27272A] mb-2 text-xs">
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <span className="flex items-center gap-1 font-semibold text-rose-300 text-[10px]">
                <AlertTriangle className="w-2.5 h-2.5 text-rose-400" />
                <span>Diagnosed Bottleneck</span>
              </span>
              <span className="text-[9px] font-mono text-rose-400/90 font-bold">
                {topPainPoint.estimatedRevenueLoss}
              </span>
            </div>
            <p className="text-zinc-400 text-[10px] line-clamp-2 leading-relaxed">
              {topPainPoint.description}
            </p>
          </div>
        )}

        {/* Facebook Post Trigger or Vector Snippet */}
        {lead.sourceSpecificData?.facebookPostContent && (
          <div className="p-1.5 rounded bg-blue-950/20 border border-blue-900/30 text-[10px] text-blue-300 mb-2">
            <span className="font-bold text-blue-400">FB Group Intent: </span>
            <span className="italic line-clamp-2">"{lead.sourceSpecificData.facebookPostContent}"</span>
          </div>
        )}
      </div>

      {/* Bottom CTA Action Button */}
      <div className="px-3 py-2 bg-[#121215] border-t border-[#27272A] flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-[10px] text-zinc-400">
          <FileText className="w-3 h-3 text-indigo-400" />
          <span>Research Dossier Ready</span>
        </div>

        <button
          type="button"
          id={`btn-view-lead-${lead.id}`}
          onClick={() => onSelectLead(lead)}
          className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"
        >
          <span>Open Dossier</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
