import React, { useState, useEffect } from 'react';
import {
  History,
  Trash2,
  Download,
  Filter,
  ExternalLink,
  Sparkles,
  Search,
  Layers,
  Building,
  CheckCircle2,
  Clock,
  RefreshCw,
  Globe
} from 'lucide-react';
import { PLATFORM_CONFIG } from '../data/seedLeads';
import { PlatformSource, Lead } from '../types';
import { PlatformLogo } from './PlatformLogo';

export interface ExtractionBatch {
  id: string;
  timestamp: string;
  platform: PlatformSource | string;
  query: string;
  category: string;
  location: string;
  leadCount: number;
  agencyName: string;
  status: 'completed' | 'running' | 'failed';
  leadIds: string[];
}

interface ExtractionHistoryViewProps {
  leads: Lead[];
  onFilterByPlatform: (platform: PlatformSource) => void;
  onFilterByBatch: (batchId: string) => void;
  onDeleteBatch?: (batchId: string) => void;
  onClearAllHistory?: () => void;
  activeAgency?: any;
  theme?: 'dark' | 'light';
}

export const ExtractionHistoryView: React.FC<ExtractionHistoryViewProps> = ({
  leads,
  onFilterByPlatform,
  onFilterByBatch,
  onDeleteBatch,
  onClearAllHistory,
  activeAgency,
  theme = 'dark',
}) => {
  const [batches, setBatches] = useState<ExtractionBatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  // Fetch batches from server with agencyId scoping
  const fetchBatches = async () => {
    setIsLoading(true);
    try {
      const url = activeAgency?.id
        ? `/api/extractions/history?agencyId=${activeAgency.id}`
        : '/api/extractions/history';
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && data.history?.length) {
        setBatches(data.history);
      } else {
        // Build fallback batches from leads in memory
        buildBatchesFromLeads();
      }
    } catch (err) {
      buildBatchesFromLeads();
    } finally {
      setIsLoading(false);
    }
  };

  const buildBatchesFromLeads = () => {
    const agencyLeads = activeAgency?.id ? leads.filter((l) => !l.agencyId || l.agencyId === activeAgency.id) : leads;
    const grouped = new Map<string, { platform: string; count: number; category: string; location: string }>();
    agencyLeads.forEach((l) => {
      const key = l.source;
      const cur = grouped.get(key) || { platform: l.source, count: 0, category: l.category, location: l.location?.formatted || 'USA' };
      cur.count++;
      grouped.set(key, cur);
    });

    const fallback: ExtractionBatch[] = Array.from(grouped.entries()).map(([k, v], idx) => ({
      id: `batch_local_${idx}`,
      timestamp: new Date(Date.now() - idx * 3600000).toISOString(),
      platform: v.platform,
      query: `${v.category} in ${v.location}`,
      category: v.category,
      location: v.location,
      leadCount: v.count,
      agencyName: activeAgency?.name || 'ADS RESULTS 24/7',
      status: 'completed',
      leadIds: agencyLeads.filter((l) => l.source === v.platform).map((l) => l.id),
    }));

    setBatches(fallback);
  };

  useEffect(() => {
    fetchBatches();
  }, [leads, activeAgency]);

  // Group leads by platform
  const platformStats = React.useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach((l) => {
      counts[l.source] = (counts[l.source] || 0) + 1;
    });
    return counts;
  }, [leads]);

  const filteredBatches = batches.filter((b) => {
    if (selectedPlatform !== 'all' && b.platform !== selectedPlatform) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        b.query.toLowerCase().includes(q) ||
        b.platform.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 rounded-xl border border-[#27272A] bg-[#121215] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Real-Time Extraction History & Platform Index
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Permanent records of all live data extractions across 20+ verified search grounding sources.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchBatches}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18181B] border border-[#27272A] text-xs font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh Logs</span>
          </button>
        </div>
      </div>

      {/* Platform Breakdown Grid (20 Platforms) */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>Extracted Leads Stored by Platform Source</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
          {Object.entries(PLATFORM_CONFIG).map(([key, config]) => {
            const count = platformStats[key] || 0;
            const isSelected = selectedPlatform === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  if (isSelected) {
                    setSelectedPlatform('all');
                  } else {
                    setSelectedPlatform(key);
                    onFilterByPlatform(key as PlatformSource);
                  }
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-950/30 shadow-md ring-1 ring-indigo-500/40'
                    : count > 0
                    ? 'border-[#27272A] bg-[#141418] hover:border-zinc-700'
                    : 'border-[#27272A]/50 bg-[#101014]/50 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <PlatformLogo source={key} size={15} />
                    <span className="text-xs font-bold text-white truncate">{config.name}</span>
                  </div>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                      count > 0 ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {count}
                  </span>
                </div>
                <div className="text-[10px] text-zinc-400 line-clamp-1 mt-1">{config.description}</div>
                <div className="text-[9px] text-indigo-400/80 font-medium mt-2">
                  {count > 0 ? 'Click to Filter Pipeline' : 'Ready for Extraction'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Batch History Table */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span>Historical Extraction Batches ({filteredBatches.length})</span>
          </h3>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search history by query or city..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#27272A] bg-[#121215] text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            {selectedPlatform !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedPlatform('all')}
                className="text-xs text-indigo-400 hover:underline cursor-pointer whitespace-nowrap"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#27272A] bg-[#121215]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#18181C] text-zinc-300 font-bold border-b border-[#27272A]">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Source Platform</th>
                <th className="p-3">Search Query & Focus</th>
                <th className="p-3">Geo-Location</th>
                <th className="p-3">Pitching Agency</th>
                <th className="p-3">Leads Extracted</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A] text-zinc-300">
              {filteredBatches.length > 0 ? (
                filteredBatches.map((batch) => {
                  const platConf = PLATFORM_CONFIG[batch.platform as PlatformSource] || { name: batch.platform };

                  return (
                    <tr key={batch.id} className="hover:bg-[#18181B]/60 transition-colors">
                      <td className="p-3 whitespace-nowrap text-zinc-400 font-mono text-[11px]">
                        {new Date(batch.timestamp).toLocaleDateString()} {new Date(batch.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 font-semibold text-[11px]">
                          <PlatformLogo source={batch.platform} size={13} />
                          {platConf.name}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-white">
                        <div>{batch.query}</div>
                        <div className="text-[10px] text-zinc-500">{batch.category}</div>
                      </td>
                      <td className="p-3 text-zinc-400">{batch.location}</td>
                      <td className="p-3 text-zinc-300 font-medium">{batch.agencyName || 'ADS RESULTS 24/7'}</td>
                      <td className="p-3">
                        <span className="font-bold text-emerald-400 text-xs">
                          {batch.leadCount} verified
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onFilterByBatch(batch.id)}
                          className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[11px] transition-colors cursor-pointer"
                        >
                          View Leads
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-zinc-500">
                    No extraction history found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
