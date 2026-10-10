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

interface LeadTableProps {
  leads: Lead[];
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleAll: () => void;
  onSelectLead: (lead: Lead) => void;
}

export const LeadTable: React.FC<LeadTableProps> = ({
  leads,
  selectedIds,
  onToggleSelect,
  onToggleAll,
  onSelectLead,
}) => {
  const allSelected = leads.length > 0 && leads.every((l) => selectedIds.has(l.id));

  if (!leads.length) {
    return (
      <div className="rounded-lg border border-[#27272A] bg-[#09090B] p-8 text-center text-zinc-400">
        <Sparkles className="w-6 h-6 text-zinc-600 mx-auto mb-2" />
        <h4 className="text-xs font-bold text-zinc-200">No leads match your current criteria</h4>
        <p className="text-[11px] text-zinc-500 mt-1 max-w-sm mx-auto">
          Try expanding your location keywords, lowering the lead score slider, or running an extraction across Apollo, Facebook Groups, or Google Maps.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[#27272A] bg-[#09090B] overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#27272A] bg-[#121215] text-zinc-400 font-semibold uppercase tracking-wider text-[9px]">
              <th className="py-2.5 px-3 w-8">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleAll}
                  className="rounded border-zinc-700 bg-zinc-800 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  aria-label="Select all leads"
                />
              </th>
              <th className="py-2.5 px-3 min-w-[200px]">Company & Decision Maker</th>
              <th className="py-2.5 px-3 min-w-[140px]">Category & Platform</th>
              <th className="py-2.5 px-3 min-w-[130px]">Location</th>
              <th className="py-2.5 px-3 min-w-[180px]">Verified Contacts</th>
              <th className="py-2.5 px-3 min-w-[120px]">Signals & Revenue</th>
              <th className="py-2.5 px-3 min-w-[90px] text-center">Score</th>
              <th className="py-2.5 px-3 min-w-[110px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272A]">
            {leads.map((lead) => {
              const isSelected = selectedIds.has(lead.id);
              const platform = PLATFORM_CONFIG[lead.source] || PLATFORM_CONFIG.google_maps;

              return (
                <tr
                  key={lead.id}
                  id={`lead-table-row-${lead.id}`}
                  className={`hover:bg-[#18181B] transition-colors cursor-pointer ${
                    isSelected ? 'bg-indigo-950/20' : ''
                  }`}
                  onClick={() => onSelectLead(lead)}
                >
                  {/* Select Checkbox */}
                  <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(lead.id)}
                      className="rounded border-zinc-700 bg-zinc-800 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      aria-label={`Select ${lead.name}`}
                    />
                  </td>

                  {/* Company & Name */}
                  <td className="py-2.5 px-3">
                    <div className="font-bold text-zinc-100 text-xs hover:text-indigo-300 transition-colors line-clamp-1">
                      {lead.companyName}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-zinc-400">
                      <span className="font-medium text-zinc-300">{lead.name}</span>
                      {lead.title && <span className="text-zinc-500">• {lead.title}</span>}
                    </div>
                  </td>

                  {/* Category & Platform */}
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${platform.badgeBg}`}>
                        {platform.name}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#18181B] text-zinc-400 border border-[#27272A]">
                        {lead.category}
                      </span>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="py-2.5 px-3 text-zinc-300">
                    <div className="flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3 h-3 text-zinc-500 shrink-0" />
                      <span className="truncate max-w-[130px]">{lead.location.formatted}</span>
                    </div>
                  </td>

                  {/* Contact Channels */}
                  <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                    <div className="space-y-0.5">
                      {lead.email ? (
                        <a
                          href={`mailto:${lead.email}`}
                          className="flex items-center gap-1 text-indigo-400 hover:underline font-mono text-[10px] truncate max-w-[160px]"
                        >
                          <Mail className="w-2.5 h-2.5 shrink-0" />
                          <span>{lead.email}</span>
                        </a>
                      ) : (
                        <span className="text-zinc-600 text-[10px]">No email</span>
                      )}

                      {lead.phone && (
                        <a
                          href={`tel:${lead.phone}`}
                          className="flex items-center gap-1 text-zinc-300 hover:text-indigo-300 font-mono text-[10px]"
                        >
                          <Phone className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                          <span>{lead.phone}</span>
                        </a>
                      )}
                    </div>
                  </td>

                  {/* Signals & Revenue */}
                  <td className="py-2.5 px-3">
                    <div className="space-y-0.5 font-mono text-[10px]">
                      {lead.researchedData.estimatedAnnualRevenue && (
                        <div className="text-emerald-400 font-bold">
                          {lead.researchedData.estimatedAnnualRevenue}
                        </div>
                      )}
                      {lead.rating ? (
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-2.5 h-2.5 fill-amber-400" />
                          <span>{lead.rating.toFixed(1)}</span>
                          {lead.reviewsCount && (
                            <span className="text-zinc-500 font-mono">({lead.reviewsCount})</span>
                          )}
                        </div>
                      ) : (
                        <div className="text-zinc-500 text-[9px]">Active Prospect</div>
                      )}
                    </div>
                  </td>

                  {/* Score */}
                  <td className="py-2.5 px-3 text-center">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold border border-indigo-500/30 bg-indigo-950/40 text-indigo-300">
                      {lead.temperature === 'Hot' && <Zap className="w-2.5 h-2.5 fill-rose-400 text-rose-400" />}
                      <span>{lead.score}</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-2.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      id={`btn-table-open-${lead.id}`}
                      onClick={() => onSelectLead(lead)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium bg-[#18181B] border border-[#27272A] hover:border-indigo-500/40 hover:bg-indigo-600/20 hover:text-indigo-300 text-zinc-200 transition-colors cursor-pointer"
                    >
                      <span>Dossier</span>
                      <ArrowRight className="w-3 h-3 text-indigo-400" />
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
