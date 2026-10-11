import React from 'react';
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Star,
  ExternalLink,
  Zap,
  ArrowRight,
  ShieldCheck,
  Building,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { Lead } from '../types';
import { PLATFORM_CONFIG } from '../data/seedLeads';
import { PlatformLogo } from './PlatformLogo';
import { IndustryLogo } from './IndustryLogo';

interface LeadTableProps {
  leads: Lead[];
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleAll: () => void;
  onSelectLead: (lead: Lead) => void;
  theme?: 'dark' | 'light';
}

export const LeadTable: React.FC<LeadTableProps> = ({
  leads,
  selectedIds,
  onToggleSelect,
  onToggleAll,
  onSelectLead,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  const allSelected = leads.length > 0 && leads.every((l) => selectedIds.has(l.id));

  if (!leads.length) {
    return (
      <div
        className={`rounded-xl border p-8 text-center ${
          isLight
            ? 'bg-white border-zinc-200 text-zinc-600'
            : 'border-[#27272A] bg-[#09090B] text-zinc-400'
        }`}
      >
        <Sparkles className="w-6 h-6 text-zinc-400 mx-auto mb-2" />
        <h4 className={`text-xs font-bold ${isLight ? 'text-zinc-800' : 'text-zinc-200'}`}>
          No leads match your current criteria
        </h4>
        <p className="text-[11px] text-zinc-500 mt-1 max-w-sm mx-auto">
          Try expanding your search keywords, adjusting filters, or running a live extraction.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border overflow-hidden shadow-xs ${
        isLight ? 'bg-white border-zinc-200' : 'bg-[#09090B] border-[#27272A]'
      }`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr
              className={`border-b font-semibold uppercase tracking-wider text-[9px] ${
                isLight
                  ? 'bg-zinc-50 border-zinc-200 text-zinc-600'
                  : 'bg-[#121215] border-[#27272A] text-zinc-400'
              }`}
            >
              <th className="py-2.5 px-3 w-8">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleAll}
                  className={`rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer ${
                    isLight ? 'border-zinc-300 bg-white' : 'border-zinc-700 bg-zinc-800'
                  }`}
                  aria-label="Select all leads"
                />
              </th>
              <th className="py-2.5 px-3 min-w-[200px]">Company & Decision Maker</th>
              <th className="py-2.5 px-3 min-w-[150px]">Source & Category</th>
              <th className="py-2.5 px-3 min-w-[130px]">Territory</th>
              <th className="py-2.5 px-3 min-w-[160px]">Direct Contact Points</th>
              <th className="py-2.5 px-3 min-w-[90px]">Reputation</th>
              <th className="py-2.5 px-3 min-w-[80px]">Score</th>
              <th className="py-2.5 px-3 min-w-[80px]">Temp</th>
              <th className="py-2.5 px-3 min-w-[110px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isLight ? 'divide-zinc-200' : 'divide-[#27272A]'}`}>
            {leads.map((lead) => {
              const isSelected = selectedIds.has(lead.id);
              const platform = PLATFORM_CONFIG[lead.source] || PLATFORM_CONFIG.google_maps;

              return (
                <tr
                  key={lead.id}
                  id={`lead-table-row-${lead.id}`}
                  className={`transition-colors cursor-pointer ${
                    isLight
                      ? isSelected
                        ? 'bg-indigo-50/70 hover:bg-indigo-50'
                        : 'bg-white hover:bg-zinc-50/80'
                      : isSelected
                      ? 'bg-indigo-950/20 hover:bg-indigo-950/30'
                      : 'hover:bg-[#18181B]'
                  }`}
                  onClick={() => onSelectLead(lead)}
                >
                  {/* Select Checkbox */}
                  <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(lead.id)}
                      className={`rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer ${
                        isLight ? 'border-zinc-300 bg-white' : 'border-zinc-700 bg-zinc-800'
                      }`}
                      aria-label={`Select ${lead.name}`}
                    />
                  </td>

                  {/* Company & Name */}
                  <td className="py-2.5 px-3">
                    <div
                      className={`font-bold text-xs transition-colors line-clamp-1 ${
                        isLight
                          ? 'text-black hover:text-indigo-600'
                          : 'text-zinc-100 hover:text-indigo-300'
                      }`}
                    >
                      {lead.companyName}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[11px]">
                      <span className={`font-semibold ${isLight ? 'text-black' : 'text-zinc-300'}`}>
                        {lead.name}
                      </span>
                      {lead.title && (
                        <span className={isLight ? 'text-zinc-600' : 'text-zinc-500'}>
                          • {lead.title}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Category & Platform */}
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold border ${platform.badgeBg}`}
                      >
                        <PlatformLogo source={lead.source} size={12} />
                        {platform.name}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] border ${
                          isLight
                            ? 'bg-zinc-100 text-black border-zinc-300'
                            : 'bg-[#18181B] text-zinc-400 border-[#27272A]'
                        }`}
                      >
                        <IndustryLogo category={lead.category} size={11} className="p-0 bg-transparent" />
                        <span>{lead.category}</span>
                      </span>
                    </div>
                  </td>

                  {/* Location */}
                  <td className={`py-2.5 px-3 ${isLight ? 'text-black' : 'text-zinc-300'}`}>
                    <div className="flex items-center gap-1 text-[11px]">
                      <MapPin className={`w-3 h-3 shrink-0 ${isLight ? 'text-zinc-600' : 'text-zinc-500'}`} />
                      <span className="truncate max-w-[130px]">{lead.location.formatted}</span>
                    </div>
                  </td>

                  {/* Contact Channels */}
                  <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                    <div className="space-y-0.5">
                      {lead.email ? (
                        <a
                          href={`mailto:${lead.email}`}
                          className={`flex items-center gap-1 hover:underline font-mono text-[10px] truncate max-w-[160px] ${
                            isLight ? 'text-indigo-600' : 'text-indigo-400'
                          }`}
                        >
                          <Mail className="w-2.5 h-2.5 shrink-0" />
                          <span>{lead.email}</span>
                        </a>
                      ) : (
                        <span className="text-[10px] text-zinc-400">No email</span>
                      )}

                      {lead.phone && (
                        <div
                          className={`flex items-center gap-1 font-mono text-[10px] ${
                            isLight ? 'text-emerald-700' : 'text-emerald-400'
                          }`}
                        >
                          <Phone className="w-2.5 h-2.5 shrink-0" />
                          <span>{lead.phone}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Rating */}
                  <td className="py-2.5 px-3">
                    {lead.rating ? (
                      <div className="flex items-center gap-1 text-amber-500 font-mono text-[11px] font-semibold">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{lead.rating.toFixed(1)}</span>
                        {lead.reviewsCount && (
                          <span className={isLight ? 'text-zinc-400 text-[10px]' : 'text-zinc-500 text-[10px]'}>
                            ({lead.reviewsCount})
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-[10px] text-zinc-400 font-mono">-</span>
                    )}
                  </td>

                  {/* Score */}
                  <td className="py-2.5 px-3">
                    <span
                      className={`font-mono font-bold text-xs px-1.5 py-0.5 rounded border ${
                        lead.score >= 85
                          ? isLight
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : lead.score >= 60
                          ? isLight
                            ? 'bg-amber-50 text-amber-700 border-amber-300'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : isLight
                          ? 'bg-zinc-100 text-zinc-600 border-zinc-200'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {lead.score}
                    </span>
                  </td>

                  {/* Temperature */}
                  <td className="py-2.5 px-3">
                    {lead.temperature === 'Hot' ? (
                      <span
                        className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold border ${
                          isLight
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                        }`}
                      >
                        <Zap className="w-2.5 h-2.5 fill-rose-500 text-rose-500" /> Hot
                      </span>
                    ) : lead.temperature === 'Warm' ? (
                      <span
                        className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold border ${
                          isLight
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        ⚡ Warm
                      </span>
                    ) : (
                      <span
                        className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-medium border ${
                          isLight
                            ? 'bg-zinc-100 text-zinc-600 border-zinc-200'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        ❄️ Cold
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-2.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      id={`btn-open-lead-row-${lead.id}`}
                      onClick={() => onSelectLead(lead)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all cursor-pointer ${
                        isLight
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600'
                          : 'bg-indigo-600/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-600 hover:text-white'
                      }`}
                    >
                      <span>Dossier</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
