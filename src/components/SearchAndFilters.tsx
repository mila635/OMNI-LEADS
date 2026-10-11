import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Download,
  Plus,
  Upload,
  ArrowRight,
  Filter,
  CheckCircle2,
  Mail,
  Phone,
  Flame,
  Building,
  ShieldCheck,
  X
} from 'lucide-react';
import {
  PlatformSource,
  LeadCategory,
  LeadFilterState,
  ScrapingTaskParams,
  AgencyProfile
} from '../types';
import { PlatformLogo } from './PlatformLogo';

interface SearchAndFiltersProps {
  filters: LeadFilterState;
  onFilterChange: (newFilters: LeadFilterState) => void;
  onStartScrape?: (params: ScrapingTaskParams) => void;
  isScraping?: boolean;
  totalLeadsCount: number;
  filteredCount: number;
  activeAgency?: AgencyProfile;
  onOpenAgencyModal?: () => void;
  onOpenImportModal?: () => void;
  onOpenAddModal?: () => void;
  onOpenExportModal?: () => void;
  onNavigateToChat?: () => void;
  theme?: 'dark' | 'light';
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  filters,
  onFilterChange,
  totalLeadsCount,
  filteredCount,
  activeAgency,
  onOpenAgencyModal,
  onOpenImportModal,
  onOpenAddModal,
  onOpenExportModal,
  onNavigateToChat,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleResetFilters = () => {
    onFilterChange({
      keyword: '',
      sources: [],
      categories: [],
      countries: [],
      temperature: [],
      minScore: 0,
      requireEmail: false,
      requirePhone: false,
      requireWebsite: false,
      requireVerified: false,
      minRating: 0,
      minReviews: 0,
      revenueRange: 'all',
      employeeRange: 'all',
      techStack: [],
      status: 'All',
      sortBy: 'score_desc',
    });
  };

  const hasActiveFilters =
    Boolean(filters.keyword) ||
    filters.sources.length > 0 ||
    filters.categories.length > 0 ||
    filters.temperature.length > 0 ||
    filters.requireEmail ||
    filters.requirePhone ||
    filters.minScore > 0 ||
    filters.status !== 'All';

  return (
    <div className="space-y-3">
      {/* Top Header Card */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
          isLight
            ? 'bg-white border-zinc-300 text-black shadow-xs'
            : 'bg-[#121215] border-[#27272A] text-zinc-100 shadow-xl'
        }`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Title & Stats */}
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className={`text-lg sm:text-xl font-bold tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
                Lead Pipeline & Dossiers
              </h1>
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                  isLight
                    ? 'bg-zinc-100 text-black border-zinc-300'
                    : 'bg-zinc-800 text-zinc-200 border-zinc-700'
                }`}
              >
                {filteredCount} / {totalLeadsCount} Leads
              </span>
            </div>
            <p className={`text-xs mt-1 ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
              Search and filter extracted records. Click any lead to inspect its custom growth dossier & outreach playbook.
            </p>
          </div>

          {/* Primary Action Row */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {onNavigateToChat && (
              <button
                type="button"
                onClick={onNavigateToChat}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all cursor-pointer transform hover:-translate-y-0.5"
                title="Launch a new extraction query in Nexus AI Chat"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>New Extraction in Chat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {onOpenImportModal && (
              <button
                type="button"
                onClick={onOpenImportModal}
                className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isLight
                    ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-black'
                    : 'bg-[#18181B] hover:bg-zinc-800 border-zinc-700 text-zinc-200'
                }`}
                title="Import leads from CSV or XLSX spreadsheet"
              >
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Import</span>
              </button>
            )}

            {onOpenAddModal && (
              <button
                type="button"
                onClick={onOpenAddModal}
                className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isLight
                    ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-black'
                    : 'bg-[#18181B] hover:bg-zinc-800 border-zinc-700 text-zinc-200'
                }`}
                title="Add manual lead record"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add Lead</span>
              </button>
            )}

            {onOpenExportModal && (
              <button
                type="button"
                onClick={onOpenExportModal}
                disabled={totalLeadsCount === 0}
                className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  totalLeadsCount === 0
                    ? 'opacity-40 cursor-not-allowed border-zinc-300 text-zinc-400'
                    : isLight
                    ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-black'
                    : 'bg-[#18181B] hover:bg-zinc-800 border-zinc-700 text-zinc-200'
                }`}
                title="Export leads to CSV or CRM"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export</span>
              </button>
            )}
          </div>
        </div>

        {/* Search Bar & Quick Filters */}
        <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col md:flex-row items-stretch md:items-center gap-2.5">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search
              className={`absolute left-3.5 top-2.5 w-4 h-4 ${
                isLight ? 'text-zinc-600' : 'text-zinc-400'
              }`}
            />
            <input
              type="text"
              value={filters.keyword}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  keyword: e.target.value,
                })
              }
              placeholder="Search leads by company name, owner, city, phone, email, or domain..."
              className={`w-full pl-10 pr-9 py-2 text-xs rounded-xl border outline-none font-medium transition-all ${
                isLight
                  ? 'bg-zinc-50 border-zinc-300 text-black placeholder:text-zinc-500 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
                  : 'bg-[#18181B] border-zinc-700 text-white placeholder:text-zinc-500 focus:border-indigo-500'
              }`}
            />
            {filters.keyword && (
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, keyword: '' })}
                className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Temperature Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {(['All', 'Hot', 'Warm', 'Cold'] as const).map((temp) => {
              const isSelected =
                temp === 'All'
                  ? filters.temperature.length === 0
                  : filters.temperature.includes(temp);

              return (
                <button
                  key={temp}
                  type="button"
                  onClick={() => {
                    if (temp === 'All') {
                      onFilterChange({ ...filters, temperature: [] });
                    } else {
                      const next = filters.temperature.includes(temp)
                        ? filters.temperature.filter((t) => t !== temp)
                        : [...filters.temperature, temp];
                      onFilterChange({ ...filters, temperature: next });
                    }
                  }}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? isLight
                        ? 'bg-black text-white border-black font-bold'
                        : 'bg-white text-black border-white font-bold'
                      : isLight
                      ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-black'
                      : 'bg-[#18181B] hover:bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  {temp === 'Hot' && '🔥 '}
                  {temp === 'Warm' && '⚡ '}
                  {temp === 'Cold' && '❄️ '}
                  {temp}
                </button>
              );
            })}

            {/* Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                showAdvancedFilters
                  ? isLight
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-950 font-bold'
                    : 'bg-indigo-950/40 border-indigo-700 text-indigo-300 font-bold'
                  : isLight
                  ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-black'
                  : 'bg-[#18181B] hover:bg-zinc-800 border-zinc-700 text-zinc-300'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-600 transition-colors cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Collapsible Refinements Tray */}
        {showAdvancedFilters && (
          <div
            className={`mt-3 p-3 rounded-xl border flex flex-wrap items-center gap-4 text-xs animate-fadeIn ${
              isLight
                ? 'bg-zinc-50 border-zinc-300 text-black'
                : 'bg-[#18181B] border-zinc-700 text-zinc-200'
            }`}
          >
            {/* Require Email */}
            <label className="flex items-center gap-1.5 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={filters.requireEmail}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    requireEmail: e.target.checked,
                  })
                }
                className="rounded text-indigo-600 cursor-pointer"
              />
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-indigo-500" />
                <span>Verified Email Required</span>
              </span>
            </label>

            {/* Require Phone */}
            <label className="flex items-center gap-1.5 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={filters.requirePhone}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    requirePhone: e.target.checked,
                  })
                }
                className="rounded text-indigo-600 cursor-pointer"
              />
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-emerald-500" />
                <span>Phone Number Required</span>
              </span>
            </label>

            {/* Minimum Lead Score */}
            <div className="flex items-center gap-2">
              <span className="font-medium">Min Score:</span>
              <select
                value={filters.minScore}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    minScore: Number(e.target.value),
                  })
                }
                className={`px-2 py-1 rounded border text-xs font-semibold outline-none cursor-pointer ${
                  isLight
                    ? 'bg-white border-zinc-300 text-black'
                    : 'bg-zinc-900 border-zinc-700 text-white'
                }`}
              >
                <option value={0}>Any Score</option>
                <option value={70}>70+ (High Intent)</option>
                <option value={80}>80+ (Very High)</option>
                <option value={90}>90+ (Top Tier Hot)</option>
              </select>
            </div>

            {/* Pipeline Status */}
            <div className="flex items-center gap-2">
              <span className="font-medium">Status:</span>
              <select
                value={filters.status}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    status: e.target.value as any,
                  })
                }
                className={`px-2 py-1 rounded border text-xs font-semibold outline-none cursor-pointer ${
                  isLight
                    ? 'bg-white border-zinc-300 text-black'
                    : 'bg-zinc-900 border-zinc-700 text-white'
                }`}
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Audit Generated">Audit Generated</option>
                <option value="Pitch Sent">Pitch Sent</option>
                <option value="Meeting Booked">Meeting Booked</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchAndFilters;
