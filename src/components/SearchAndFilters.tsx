import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Filter,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  CheckCircle2,
  Globe,
  Mail,
  Phone,
  Star,
  Users,
  ShieldCheck,
  Zap,
  Building,
  Briefcase,
  Terminal,
  Layers,
  ArrowRight,
  ExternalLink,
  Video,
  DollarSign,
  Award,
  Hash,
  Share2
} from 'lucide-react';
import {
  PlatformSource,
  LeadCategory,
  LeadFilterState,
  ScrapingTaskParams,
  AgencyProfile
} from '../types';
import { PLATFORM_CONFIG } from '../data/seedLeads';

interface SearchAndFiltersProps {
  filters: LeadFilterState;
  onFilterChange: (newFilters: LeadFilterState) => void;
  onStartScrape: (params: ScrapingTaskParams) => void;
  isScraping: boolean;
  totalLeadsCount: number;
  filteredCount: number;
  activeAgency?: AgencyProfile;
  onOpenAgencyModal?: () => void;
  onOpenImportModal?: () => void;
  onOpenAddModal?: () => void;
  onOpenExportModal?: () => void;
  theme?: 'dark' | 'light';
}

const CATEGORIES: LeadCategory[] = [
  'Real Estate',
  'Dental & Healthcare',
  'Home Services & Contractors',
  'Roofing & Construction',
  'Solar & CleanTech',
  'Legal & Law Firms',
  'Accounting & Financial',
  'SaaS & Tech',
  'Marketing & Creative Agency',
  'E-Commerce & DTC',
  'Restaurants & Hospitality',
  'Fitness & MedSpas',
  'Automotive & Dealerships',
  'Logistics & Supply Chain',
  'Insurance & Wealth Management',
  'Coaching & Consulting',
  'Architecture & Interior Design',
  'Veterinary & Pet Care',
  'Education & EdTech',
  'Manufacturing & Industrial',
];

const PLATFORMS: { id: PlatformSource; label: string; icon: string }[] = [
  { id: 'google_maps', label: 'Google Maps Places', icon: '📍' },
  { id: 'apollo', label: 'Apollo.io Leads', icon: '🎯' },
  { id: 'clutch_co', label: 'Clutch.co B2B', icon: '🏆' },
  { id: 'crunchbase', label: 'Crunchbase Funded', icon: '🚀' },
  { id: 'indeed_jobs', label: 'Indeed Hiring Intent', icon: '💼' },
  { id: 'bbb_accredited', label: 'BBB Accredited', icon: '🛡️' },
  { id: 'upwork_clients', label: 'Upwork Commercial', icon: '⚡' },
  { id: 'facebook_groups', label: 'Facebook (Groups)', icon: '👥' },
  { id: 'linkedin', label: 'LinkedIn B2B', icon: '👔' },
  { id: 'yelp_trustpilot', label: 'Yelp & Reviews', icon: '⭐' },
  { id: 'product_hunt', label: 'Product Hunt SaaS', icon: '🐱' },
  { id: 'yellow_pages', label: 'Yellow Pages Trade', icon: '📒' },
  { id: 'reddit_communities', label: 'Reddit Communities', icon: '🤖' },
  { id: 'github_founders', label: 'GitHub Founders', icon: '🐙' },
  { id: 'website_crawler', label: 'Live Domain Crawler', icon: '🌐' },
  { id: 'apify_actor', label: 'Apify Store Connect', icon: '🔌' },
  { id: 'instagram', label: 'Instagram Brands', icon: '📸' },
  { id: 'twitter_x', label: 'Twitter / X', icon: '𝕏' },
  { id: 'tiktok', label: 'TikTok Shop', icon: '🎵' },
  { id: 'custom_actor', label: 'Custom Actor API', icon: '⚙️' },
];

const QUICK_LOCATIONS = [
  'Miami, USA',
  'Austin, TX',
  'London, UK',
  'United Kingdom',
  'Dallas, TX',
  'Los Angeles, CA',
  'Dubai, UAE',
  'Sydney, AU',
  'Toronto, CA',
];

const TECH_STACK_OPTIONS = [
  'Shopify',
  'WordPress',
  'KVCore',
  'HubSpot',
  'JobNimbus',
  'Meta Pixel',
  'Google Ads',
  'Stripe',
  'Klaviyo',
  'Dentally',
];

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  filters,
  onFilterChange,
  onStartScrape,
  isScraping,
  totalLeadsCount,
  filteredCount,
  activeAgency,
  onOpenAgencyModal,
  onOpenImportModal,
  onOpenAddModal,
  onOpenExportModal,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  const [activePlatform, setActivePlatform] = useState<PlatformSource>('google_maps');
  const [selectedCategory, setSelectedCategory] = useState<LeadCategory>('Restaurants & Hospitality');
  const [searchQuery, setSearchQuery] = useState('Restaurants in UK');
  const [searchLocation, setSearchLocation] = useState('United Kingdom');
  const [jobTitles, setJobTitles] = useState('Founder, Managing Director, Owner');
  const [fbGroupKeyword, setFbGroupKeyword] = useState('Restaurant Owners & Hospitality UK');
  const [targetWebsiteUrl, setTargetWebsiteUrl] = useState('https://');
  const [maxResults, setMaxResults] = useState(25);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [customActorId, setCustomActorId] = useState('compass~crawler-google-places');

  // Platform specific filter states
  const [gmapsRatingCeiling, setGmapsRatingCeiling] = useState<string>('4.0');
  const [gmapsMissingWebsiteOnly, setGmapsMissingWebsiteOnly] = useState(false);
  const [gmapsLowReviewsOnly, setGmapsLowReviewsOnly] = useState(false);
  const [apolloSeniority, setApolloSeniority] = useState<string>('c_level');
  const [apolloVerifiedEmailOnly, setApolloVerifiedEmailOnly] = useState(true);
  const [clutchProjectSize, setClutchProjectSize] = useState<string>('all');
  const [crunchbaseFundingStage, setCrunchbaseFundingStage] = useState<string>('all');
  const [indeedHiringRole, setIndeedHiringRole] = useState<string>('Sales & Growth Operations');
  const [socialMinFollowers, setSocialMinFollowers] = useState<string>('all');

  const handleLaunchScrape = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() && activePlatform !== 'website_crawler') return;

    let maxRating: number | undefined = undefined;
    let minRating: number | undefined = undefined;

    if (activePlatform === 'google_maps' || activePlatform === 'yelp_trustpilot') {
      if (gmapsRatingCeiling === '5.0') maxRating = 5.0;
      else if (gmapsRatingCeiling === '4.5') maxRating = 4.5;
      else if (gmapsRatingCeiling === '4.0') maxRating = 4.0;
      else if (gmapsRatingCeiling === '3.5') maxRating = 3.5;
      else if (gmapsRatingCeiling === '3.0') maxRating = 3.0;
      else if (gmapsRatingCeiling === 'top_rated') minRating = 4.5;
    }

    onStartScrape({
      platform: activePlatform,
      query: activePlatform === 'website_crawler' ? targetWebsiteUrl : searchQuery,
      category: selectedCategory,
      location: searchLocation,
      country: (searchLocation.includes('UK') || searchLocation.toLowerCase().includes('united kingdom') || searchLocation.toLowerCase().includes('london')) ? 'United Kingdom' : 'United States',
      maxResults,
      minRating,
      maxRating,
      websiteOnly: gmapsMissingWebsiteOnly ? false : undefined,
      jobTitles: activePlatform === 'linkedin' || activePlatform === 'apollo' ? jobTitles : undefined,
      facebookGroupKeyword: activePlatform === 'facebook_groups' ? fbGroupKeyword : undefined,
      customActorId: (activePlatform === 'custom_actor' || activePlatform === 'apify_actor') ? customActorId : undefined,
      hiringRoleKeyword: activePlatform === 'indeed_jobs' ? indeedHiringRole : undefined,
      minFundingAmount: activePlatform === 'crunchbase' ? crunchbaseFundingStage : undefined,
      enableAiResearch: true,
      enableVectorIndexing: true,
      activeAgency,
    });
  };

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
      maxRating: undefined,
      minReviews: 0,
      revenueRange: 'all',
      employeeRange: 'all',
      techStack: [],
      status: 'All',
      sortBy: 'score_desc',
    });
  };

  const activeFiltersCount = [
    filters.keyword,
    filters.sources.length > 0,
    filters.categories.length > 0,
    filters.temperature.length > 0,
    filters.minScore > 0,
    filters.requireEmail,
    filters.requirePhone,
    filters.requireWebsite,
    filters.requireVerified,
    filters.minRating > 0,
    filters.maxRating !== undefined,
    filters.minReviews > 0,
    filters.revenueRange !== 'all' && filters.revenueRange !== '',
    filters.employeeRange !== 'all' && filters.employeeRange !== '',
    filters.techStack.length > 0,
    filters.status !== 'All',
  ].filter(Boolean).length;

  return (
    <div className="space-y-3">
      {/* Main Scraper Formulation Panel */}
      <div className={`rounded-xl border p-4 shadow-sm transition-colors ${
        isLight ? 'bg-white border-zinc-200 text-zinc-900 shadow-sm' : 'bg-[#09090B] border-[#27272A] text-zinc-100'
      }`}>
        {/* Platform Selection Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase font-bold tracking-widest ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`}>
                1. Select Extraction Platform
              </span>
              <span className="text-zinc-500 text-[10px] hidden sm:inline">• Live Multi-Threaded Adapters</span>
            </div>
            <span className={`text-[10px] font-mono ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
              Active: <strong className={isLight ? 'text-zinc-900' : 'text-zinc-200'}>{PLATFORM_CONFIG[activePlatform]?.name}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5">
            {PLATFORMS.map((p) => {
              const isSelected = activePlatform === p.id;
              return (
                <button
                  key={p.id}
                  id={`btn-platform-${p.id}`}
                  type="button"
                  onClick={() => {
                    setActivePlatform(p.id);
                    if (p.id === 'google_maps') {
                      setSelectedCategory('Restaurants & Hospitality');
                      setSearchQuery('Restaurants in UK');
                      setSearchLocation('United Kingdom');
                    } else if (p.id === 'facebook_groups') {
                      setSearchQuery('Hospitality & Restaurant Owners Network');
                    } else if (p.id === 'apollo') {
                      setSearchQuery('VP Operations, Managing Directors, Founders');
                    } else if (p.id === 'instagram') {
                      setSearchQuery('DTC Hospitality & Artisanal Food Brands');
                    } else if (p.id === 'clutch_co') {
                      setSearchQuery('B2B Tech Agencies & Digital Providers');
                    }
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg border text-[11px] font-medium transition-all cursor-pointer ${
                    isSelected
                      ? isLight
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold shadow-xs'
                        : 'border-indigo-500 bg-indigo-950/40 text-indigo-300 font-semibold shadow-xs'
                      : isLight
                      ? 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100'
                      : 'border-[#27272A] bg-[#18181B] text-zinc-400 hover:text-zinc-200 hover:bg-[#27272A]'
                  }`}
                >
                  <span className="text-sm mb-0.5">{p.icon}</span>
                  <span className="text-center font-medium leading-tight text-[10px]">{p.label}</span>
                </button>
              );
            })}
          </div>
          <p className={`text-[10px] mt-1.5 italic ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
            {PLATFORM_CONFIG[activePlatform]?.description}
          </p>
        </div>

        {/* Search & Extraction Form */}
        <form onSubmit={handleLaunchScrape} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
            {/* Category Dropdown */}
            <div className="md:col-span-3">
              <label htmlFor="search-category-select" className={`block text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center justify-between ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                <span>Category Hierarchy</span>
              </label>
              <div className="relative">
                <select
                  id="search-category-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as LeadCategory)}
                  className={`w-full appearance-none rounded-lg border px-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 cursor-pointer ${
                    isLight
                      ? 'bg-white border-zinc-300 text-zinc-900 focus:border-indigo-600 focus:ring-indigo-600'
                      : 'bg-[#18181B] border-[#27272A] text-zinc-200 focus:border-indigo-500 focus:ring-indigo-500'
                  }`}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className={isLight ? 'bg-white text-zinc-900' : 'bg-[#18181B] text-zinc-200'}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
              </div>
            </div>

            {/* Search Query / Niche Target */}
            <div className="md:col-span-5">
              <label htmlFor="search-query-input" className={`block text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center justify-between ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                <span>Target Keywords & Niche</span>
                <span className={`text-[9px] font-mono ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`}>Live Grounded</span>
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-500" />
                <input
                  id="search-query-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Restaurants in UK, Dental Clinics London"
                  className={`w-full rounded-lg border pl-8 pr-2.5 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 ${
                    isLight
                      ? 'bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-600 focus:ring-indigo-600'
                      : 'bg-[#18181B] border-[#27272A] text-zinc-200 placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-indigo-500'
                  }`}
                />
              </div>
            </div>

            {/* Location & Geo-Targeting */}
            <div className="md:col-span-4">
              <label htmlFor="search-location-input" className={`block text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center justify-between ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                <span>Location Territory</span>
                <span className="text-[9px] text-zinc-500 font-mono">Geo-Bounded</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-500" />
                <input
                  id="search-location-input"
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="e.g. United Kingdom, London, UK, Miami, USA"
                  className={`w-full rounded-lg border pl-8 pr-2.5 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 ${
                    isLight
                      ? 'bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-600 focus:ring-indigo-600'
                      : 'bg-[#18181B] border-[#27272A] text-zinc-200 placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-indigo-500'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Location Quick Tags */}
          <div className="flex items-center gap-1.5 flex-wrap text-xs text-zinc-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">Quick Geo:</span>
            {QUICK_LOCATIONS.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setSearchLocation(loc)}
                className={`px-2 py-0.5 rounded text-[10px] border transition-colors cursor-pointer ${
                  isLight
                    ? 'bg-zinc-100 border-zinc-300 text-zinc-800 hover:bg-zinc-200'
                    : 'bg-[#18181B] border-[#27272A] text-zinc-300 hover:text-white hover:border-zinc-600'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          {/* ---------------------------------------------------- */}
          {/* PLATFORM SPECIFIC GRANULAR FILTERS */}
          {/* ---------------------------------------------------- */}

          {/* Google Maps Specific Granular Filters (Rating < 5, < 4.5, < 4.0, etc.) */}
          {activePlatform === 'google_maps' && (
            <div className={`p-3 rounded-xl border space-y-2 text-xs ${
              isLight ? 'bg-amber-50/70 border-amber-200' : 'bg-amber-950/20 border-amber-800/40'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isLight ? 'text-amber-900' : 'text-amber-300'}`}>
                    Google Maps Granular Rating & Optimization Filters
                  </span>
                </div>
                <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400">Strict Geo-Index</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Rating Ceiling / Floor Selector */}
                <div>
                  <label className={`block text-[10px] font-bold mb-1 ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                    Google Maps Rating Filter:
                  </label>
                  <select
                    id="gmaps-rating-filter"
                    value={gmapsRatingCeiling}
                    onChange={(e) => {
                      setGmapsRatingCeiling(e.target.value);
                      if (e.target.value === '4.0') {
                        onFilterChange({ ...filters, maxRating: 4.0, minRating: 0 });
                      } else if (e.target.value === '4.5') {
                        onFilterChange({ ...filters, maxRating: 4.5, minRating: 0 });
                      } else if (e.target.value === '3.5') {
                        onFilterChange({ ...filters, maxRating: 3.5, minRating: 0 });
                      } else if (e.target.value === '3.0') {
                        onFilterChange({ ...filters, maxRating: 3.0, minRating: 0 });
                      } else if (e.target.value === 'top_rated') {
                        onFilterChange({ ...filters, minRating: 4.5, maxRating: undefined });
                      } else {
                        onFilterChange({ ...filters, maxRating: undefined, minRating: 0 });
                      }
                    }}
                    className={`w-full rounded-lg border px-2.5 py-1 text-xs font-semibold ${
                      isLight ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-[#18181B] border-[#27272A] text-zinc-200'
                    }`}
                  >
                    <option value="4.0">⭐ Below 4.0 Stars (&lt; 4.0) — High Opportunity</option>
                    <option value="4.5">⭐ Below 4.5 Stars (&lt; 4.5)</option>
                    <option value="5.0">⭐ Below 5.0 Stars (&lt; 5.0)</option>
                    <option value="3.5">⭐ Below 3.5 Stars (&lt; 3.5) — Critical Pain</option>
                    <option value="3.0">⭐ Below 3.0 Stars (&lt; 3.0)</option>
                    <option value="top_rated">⭐ Top Rated (&gt; 4.5 Stars)</option>
                    <option value="all">⭐ All Ratings (Unfiltered)</option>
                  </select>
                </div>

                {/* Missing Website Checkbox */}
                <div className="flex items-center">
                  <label className={`flex items-center gap-2 p-2 rounded-lg border w-full cursor-pointer ${
                    isLight ? 'bg-white border-zinc-300 text-zinc-800' : 'bg-[#18181B] border-[#27272A] text-zinc-300'
                  }`}>
                    <input
                      type="checkbox"
                      checked={gmapsMissingWebsiteOnly}
                      onChange={(e) => setGmapsMissingWebsiteOnly(e.target.checked)}
                      className="rounded border-zinc-600 text-indigo-600 focus:ring-indigo-500"
                    />
                    <Globe className="w-3.5 h-3.5 text-rose-500" />
                    <span className="text-[11px] font-medium">Highlight Missing/Broken Websites</span>
                  </label>
                </div>

                {/* Review Count Optimization */}
                <div className="flex items-center">
                  <label className={`flex items-center gap-2 p-2 rounded-lg border w-full cursor-pointer ${
                    isLight ? 'bg-white border-zinc-300 text-zinc-800' : 'bg-[#18181B] border-[#27272A] text-zinc-300'
                  }`}>
                    <input
                      type="checkbox"
                      checked={gmapsLowReviewsOnly}
                      onChange={(e) => setGmapsLowReviewsOnly(e.target.checked)}
                      className="rounded border-zinc-600 text-indigo-600 focus:ring-indigo-500"
                    />
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-[11px] font-medium">Under-Reviewed Local Listings (&lt; 50 reviews)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Apollo.io Specific Filters */}
          {activePlatform === 'apollo' && (
            <div className={`p-3 rounded-xl border grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs ${
              isLight ? 'bg-indigo-50/70 border-indigo-200' : 'bg-indigo-950/20 border-indigo-800/40'
            }`}>
              <div>
                <label className={`block text-[10px] font-bold mb-1 ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                  Target Decision Maker Titles:
                </label>
                <input
                  type="text"
                  value={jobTitles}
                  onChange={(e) => setJobTitles(e.target.value)}
                  placeholder="e.g. VP Growth, Founder, Head of Sales, Owner"
                  className={`w-full rounded-lg border px-2.5 py-1 text-xs ${
                    isLight ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-[#18181B] border-[#27272A] text-zinc-200'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-[10px] font-bold mb-1 ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                  Seniority Level:
                </label>
                <select
                  value={apolloSeniority}
                  onChange={(e) => setApolloSeniority(e.target.value)}
                  className={`w-full rounded-lg border px-2.5 py-1 text-xs ${
                    isLight ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-[#18181B] border-[#27272A] text-zinc-200'
                  }`}
                >
                  <option value="c_level">C-Suite / Founder / Owner</option>
                  <option value="vp_director">VP & Director Level</option>
                  <option value="manager">Department Head / Manager</option>
                  <option value="all">All Seniority Levels</option>
                </select>
              </div>
            </div>
          )}

          {/* LinkedIn Specific Filters */}
          {activePlatform === 'linkedin' && (
            <div className={`p-3 rounded-xl border grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs ${
              isLight ? 'bg-blue-50/70 border-blue-200' : 'bg-blue-950/20 border-blue-800/40'
            }`}>
              <div>
                <label className={`block text-[10px] font-bold mb-1 ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                  LinkedIn Executive Targeting:
                </label>
                <input
                  type="text"
                  value={jobTitles}
                  onChange={(e) => setJobTitles(e.target.value)}
                  placeholder="e.g. Chief Executive Officer, Managing Director"
                  className={`w-full rounded-lg border px-2.5 py-1 text-xs ${
                    isLight ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-[#18181B] border-[#27272A] text-zinc-200'
                  }`}
                />
              </div>
              <div className="flex items-center text-[10px] text-blue-600 dark:text-blue-300">
                <span>👔 Synthesizes personalized InMail pitch hooks and connection notes for each executive prospect.</span>
              </div>
            </div>
          )}

          {/* Clutch.co Specific Filters */}
          {activePlatform === 'clutch_co' && (
            <div className={`p-3 rounded-xl border grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs ${
              isLight ? 'bg-purple-50/70 border-purple-200' : 'bg-purple-950/20 border-purple-800/40'
            }`}>
              <div>
                <label className={`block text-[10px] font-bold mb-1 ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                  Minimum Project Size Filter:
                </label>
                <select
                  value={clutchProjectSize}
                  onChange={(e) => setClutchProjectSize(e.target.value)}
                  className={`w-full rounded-lg border px-2.5 py-1 text-xs ${
                    isLight ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-[#18181B] border-[#27272A] text-zinc-200'
                  }`}
                >
                  <option value="all">All Project Sizes</option>
                  <option value="10k">$10,000+ Projects</option>
                  <option value="25k">$25,000+ Projects</option>
                  <option value="50k">$50,000+ High-Ticket</option>
                </select>
              </div>
              <div className="flex items-center text-[10px] text-purple-600 dark:text-purple-300">
                <span>🏆 Verified hourly rates and verified client reviews are auto-parsed into revenue estimates.</span>
              </div>
            </div>
          )}

          {/* Crunchbase Specific Filters */}
          {activePlatform === 'crunchbase' && (
            <div className={`p-3 rounded-xl border grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs ${
              isLight ? 'bg-emerald-50/70 border-emerald-200' : 'bg-emerald-950/20 border-emerald-800/40'
            }`}>
              <div>
                <label className={`block text-[10px] font-bold mb-1 ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                  Funding Stage:
                </label>
                <select
                  value={crunchbaseFundingStage}
                  onChange={(e) => setCrunchbaseFundingStage(e.target.value)}
                  className={`w-full rounded-lg border px-2.5 py-1 text-xs ${
                    isLight ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-[#18181B] border-[#27272A] text-zinc-200'
                  }`}
                >
                  <option value="all">All Funding Rounds</option>
                  <option value="seed">Seed & Pre-Seed ($500k - $2M)</option>
                  <option value="series_a">Series A Funded ($3M - $10M)</option>
                  <option value="series_b">Series B+ Scale-up ($10M+)</option>
                  <option value="bootstrapped">Bootstrapped & Profitable</option>
                </select>
              </div>
              <div className="flex items-center text-[10px] text-emerald-600 dark:text-emerald-300">
                <span>🚀 Maps active investor capital into custom agency growth proposals.</span>
              </div>
            </div>
          )}

          {/* Indeed Hiring Intent Filters */}
          {activePlatform === 'indeed_jobs' && (
            <div className={`p-3 rounded-xl border grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs ${
              isLight ? 'bg-cyan-50/70 border-cyan-200' : 'bg-cyan-950/20 border-cyan-800/40'
            }`}>
              <div>
                <label className={`block text-[10px] font-bold mb-1 ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                  Hiring Intent Position:
                </label>
                <input
                  type="text"
                  value={indeedHiringRole}
                  onChange={(e) => setIndeedHiringRole(e.target.value)}
                  placeholder="e.g. Sales Director, Growth Marketer"
                  className={`w-full rounded-lg border px-2.5 py-1 text-xs ${
                    isLight ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-[#18181B] border-[#27272A] text-zinc-200'
                  }`}
                />
              </div>
              <div className="flex items-center text-[10px] text-cyan-600 dark:text-cyan-300">
                <span>💼 Identifies companies spending $8k+/mo on salary budgets and pitches agency automation.</span>
              </div>
            </div>
          )}

          {/* Website Crawler */}
          {activePlatform === 'website_crawler' && (
            <div className={`p-3 rounded-xl border grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs ${
              isLight ? 'bg-cyan-50/70 border-cyan-200' : 'bg-cyan-950/20 border-cyan-800/40'
            }`}>
              <div>
                <label className={`block text-[10px] font-bold mb-1 ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                  Target Domain / Website URL to Crawl:
                </label>
                <input
                  type="url"
                  value={targetWebsiteUrl}
                  onChange={(e) => setTargetWebsiteUrl(e.target.value)}
                  placeholder="https://examplecompany.com"
                  className={`w-full rounded-lg border px-2.5 py-1 text-xs ${
                    isLight ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-[#18181B] border-[#27272A] text-zinc-200'
                  }`}
                />
              </div>
              <div className="flex items-center text-[10px] text-zinc-500">
                <span>🌐 Deep crawls live HTML, extracts verified email addresses, phones, and detects tech stack vulnerabilities.</span>
              </div>
            </div>
          )}

          {/* Social Brands: Instagram / TikTok */}
          {(activePlatform === 'instagram' || activePlatform === 'tiktok') && (
            <div className={`p-3 rounded-xl border grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs ${
              isLight ? 'bg-pink-50/70 border-pink-200' : 'bg-pink-950/20 border-pink-800/40'
            }`}>
              <div>
                <label className={`block text-[10px] font-bold mb-1 ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                  Follower Range:
                </label>
                <select
                  value={socialMinFollowers}
                  onChange={(e) => setSocialMinFollowers(e.target.value)}
                  className={`w-full rounded-lg border px-2.5 py-1 text-xs ${
                    isLight ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-[#18181B] border-[#27272A] text-zinc-200'
                  }`}
                >
                  <option value="all">All Follower Counts</option>
                  <option value="micro">5,000 - 25,000 (Micro Brands)</option>
                  <option value="mid">25,000 - 100,000 (Growth Brands)</option>
                  <option value="macro">100,000+ (High Volume)</option>
                </select>
              </div>
              <div className="flex items-center text-[10px] text-pink-600 dark:text-pink-300">
                <span>📸 Extracts direct bio contact emails, phone touchpoints, and e-commerce stores.</span>
              </div>
            </div>
          )}

          {/* Active Pitching Agency Banner */}
          {activeAgency && (
            <div className={`flex items-center justify-between p-2.5 rounded-xl border text-xs ${
              isLight ? 'bg-indigo-50 border-indigo-200' : 'bg-indigo-950/20 border-indigo-500/30'
            }`}>
              <div className="flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span className={`text-[11px] ${isLight ? 'text-zinc-800' : 'text-zinc-300'}`}>
                  Output proposals & emails will be branded for: <strong className={isLight ? 'text-indigo-900' : 'text-white'}>{activeAgency.name}</strong> ({activeAgency.senderName})
                </span>
              </div>
              {onOpenAgencyModal && (
                <button
                  type="button"
                  onClick={onOpenAgencyModal}
                  className="text-[10px] font-semibold text-indigo-500 hover:text-indigo-400 cursor-pointer"
                >
                  Configure Services / Pricing →
                </button>
              )}
            </div>
          )}

          {/* Action Row */}
          <div className={`flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t ${
            isLight ? 'border-zinc-200' : 'border-[#27272A]'
          }`}>
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="btn-toggle-advanced-filters"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  showAdvancedFilters || activeFiltersCount > 0
                    ? isLight
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold'
                      : 'border-indigo-500 bg-indigo-950/30 text-indigo-300'
                    : isLight
                    ? 'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50'
                    : 'border-[#27272A] bg-[#18181B] text-zinc-300 hover:text-white'
                }`}
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Deep Lead Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-indigo-600 text-white text-[9px] font-bold font-mono">
                    {activeFiltersCount}
                  </span>
                )}
                {showAdvancedFilters ? <ChevronUp className="w-3 h-3 ml-0.5" /> : <ChevronDown className="w-3 h-3 ml-0.5" />}
              </button>

              <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                <span className="text-[10px] uppercase font-bold">Batch:</span>
                <select
                  value={maxResults}
                  onChange={(e) => setMaxResults(Number(e.target.value))}
                  className={`rounded-lg border px-2 py-1 text-xs font-mono font-medium ${
                    isLight ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-[#18181B] border-[#27272A] text-zinc-200'
                  }`}
                >
                  <option value={10}>10 Leads</option>
                  <option value={25}>25 Leads</option>
                  <option value={50}>50 Leads</option>
                  <option value={100}>100 Leads</option>
                  <option value={250}>250 Leads</option>
                  <option value={500}>500 Leads</option>
                  <option value={1000}>1,000 Leads</option>
                  <option value={2500}>2,500 Leads</option>
                  <option value={5000}>5,000 Leads</option>
                  <option value={10000}>10,000 Leads (Bulk)</option>
                </select>
              </div>
              {onOpenImportModal && (
                <button
                  type="button"
                  onClick={onOpenImportModal}
                  className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                    isLight
                      ? 'bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-50'
                      : 'bg-[#18181B] hover:bg-[#27272A] border-[#27272A] text-zinc-300 hover:text-white'
                  }`}
                  title="Import spreadsheet (.xlsx, .csv)"
                >
                  <span>Import Excel/CSV</span>
                </button>
              )}
              {onOpenAddModal && (
                <button
                  type="button"
                  onClick={onOpenAddModal}
                  className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                    isLight
                      ? 'bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-50'
                      : 'bg-[#18181B] hover:bg-[#27272A] border-[#27272A] text-zinc-300 hover:text-white'
                  }`}
                  title="Add verified lead manually"
                >
                  <span>+ Manual Lead</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {onOpenExportModal && (
                <button
                  type="button"
                  onClick={onOpenExportModal}
                  className={`flex items-center gap-1 px-3.5 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                    isLight
                      ? 'bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-50'
                      : 'bg-[#18181B] hover:bg-[#27272A] border-[#27272A] text-zinc-200'
                  }`}
                >
                  <span>Export ({totalLeadsCount})</span>
                </button>
              )}
              <button
                type="submit"
                id="btn-launch-scraper"
                disabled={isScraping || !searchQuery.trim()}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-bold text-xs bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm disabled:opacity-50 transition-colors cursor-pointer"
              >
                {isScraping ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Run AI Lead Extraction</span>
                    <ArrowRight className="w-3 h-3" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Advanced Filter Drawer / Section */}
      {showAdvancedFilters && (
        <div className={`rounded-xl border p-4 space-y-3.5 transition-colors ${
          isLight ? 'bg-white border-zinc-200 text-zinc-900 shadow-sm' : 'bg-[#121215] border-[#27272A] text-zinc-100'
        }`}>
          <div className={`flex items-center justify-between pb-2 border-b ${
            isLight ? 'border-zinc-200' : 'border-[#27272A]'
          }`}>
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-indigo-500" />
              <h3 className="text-xs font-bold">Deep Qualification & Extraction Filters</h3>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-[11px] text-zinc-500 hover:text-indigo-500 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Keyword search in results */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Filter by Keyword / Contact
              </label>
              <input
                type="text"
                value={filters.keyword}
                onChange={(e) => onFilterChange({ ...filters, keyword: e.target.value })}
                placeholder="Search extracted records..."
                className={`w-full rounded-lg border px-2.5 py-1 text-xs ${
                  isLight ? 'bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-400' : 'bg-[#18181B] border-[#27272A] text-zinc-200 placeholder:text-zinc-500'
                }`}
              />
            </div>

            {/* Min Lead Score Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Min Lead Score</label>
                <span className="text-xs font-mono font-bold text-indigo-500">{filters.minScore}+</span>
              </div>
              <input
                type="range"
                min={0}
                max={95}
                step={5}
                value={filters.minScore}
                onChange={(e) => onFilterChange({ ...filters, minScore: Number(e.target.value) })}
                className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[9px] text-zinc-500 mt-1 font-mono">
                <span>0 (All)</span>
                <span>50 (Warm)</span>
                <span>80+ (Hot 🔥)</span>
              </div>
            </div>

            {/* Google Maps / Platform Rating Filter */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Max Star Rating Ceiling
              </label>
              <select
                value={filters.maxRating !== undefined ? String(filters.maxRating) : 'all'}
                onChange={(e) => {
                  const val = e.target.value;
                  onFilterChange({
                    ...filters,
                    maxRating: val === 'all' ? undefined : Number(val),
                  });
                }}
                className={`w-full rounded-lg border px-2.5 py-1 text-xs ${
                  isLight ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-[#18181B] border-[#27272A] text-zinc-200'
                }`}
              >
                <option value="all">Any Rating (0 - 5.0)</option>
                <option value="4.0">⭐ Less than 4.0 Stars (&lt; 4.0)</option>
                <option value="4.5">⭐ Less than 4.5 Stars (&lt; 4.5)</option>
                <option value="3.5">⭐ Less than 3.5 Stars (&lt; 3.5)</option>
                <option value="3.0">⭐ Less than 3.0 Stars (&lt; 3.0)</option>
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Sort Results By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as any })}
                className={`w-full rounded-lg border px-2.5 py-1 text-xs font-medium ${
                  isLight ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-[#18181B] border-[#27272A] text-zinc-200'
                }`}
              >
                <option value="score_desc">🔥 Lead Score (Highest)</option>
                <option value="rating_desc">⭐ Star Rating (Highest)</option>
                <option value="reviews_desc">💬 Total Reviews Count</option>
                <option value="date_desc">🕒 Extraction Recency</option>
                <option value="name_asc">🔤 Company Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Contact Verification Checkboxes */}
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
              Channel Verification Requirements
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
              <label className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer ${
                isLight ? 'bg-white border-zinc-300 text-zinc-800' : 'bg-[#18181B] border-[#27272A] text-zinc-300'
              }`}>
                <input
                  type="checkbox"
                  checked={filters.requireEmail}
                  onChange={(e) => onFilterChange({ ...filters, requireEmail: e.target.checked })}
                  className="rounded border-zinc-600 text-indigo-600 focus:ring-indigo-500"
                />
                <Mail className="w-3 h-3 text-indigo-500" />
                <span className="text-[11px]">Must have Email</span>
              </label>

              <label className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer ${
                isLight ? 'bg-white border-zinc-300 text-zinc-800' : 'bg-[#18181B] border-[#27272A] text-zinc-300'
              }`}>
                <input
                  type="checkbox"
                  checked={filters.requirePhone}
                  onChange={(e) => onFilterChange({ ...filters, requirePhone: e.target.checked })}
                  className="rounded border-zinc-600 text-indigo-600 focus:ring-indigo-500"
                />
                <Phone className="w-3 h-3 text-emerald-500" />
                <span className="text-[11px]">Must have Phone</span>
              </label>

              <label className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer ${
                isLight ? 'bg-white border-zinc-300 text-zinc-800' : 'bg-[#18181B] border-[#27272A] text-zinc-300'
              }`}>
                <input
                  type="checkbox"
                  checked={filters.requireWebsite}
                  onChange={(e) => onFilterChange({ ...filters, requireWebsite: e.target.checked })}
                  className="rounded border-zinc-600 text-indigo-600 focus:ring-indigo-500"
                />
                <Globe className="w-3 h-3 text-blue-500" />
                <span className="text-[11px]">Has Website</span>
              </label>

              <label className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer ${
                isLight ? 'bg-white border-zinc-300 text-zinc-800' : 'bg-[#18181B] border-[#27272A] text-zinc-300'
              }`}>
                <input
                  type="checkbox"
                  checked={filters.requireVerified}
                  onChange={(e) => onFilterChange({ ...filters, requireVerified: e.target.checked })}
                  className="rounded border-zinc-600 text-indigo-600 focus:ring-indigo-500"
                />
                <ShieldCheck className="w-3 h-3 text-amber-500" />
                <span className="text-[11px]">Deliverable Verified</span>
              </label>
            </div>
          </div>

          {/* Filter by Category Chips */}
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
              Category Hierarchy Filter
            </span>
            <div className="flex flex-wrap gap-1">
              {CATEGORIES.map((cat) => {
                const isSelected = filters.categories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      const next = isSelected
                        ? filters.categories.filter((c) => c !== cat)
                        : [...filters.categories, cat];
                      onFilterChange({ ...filters, categories: next });
                    }}
                    className={`px-2.5 py-0.5 rounded text-[11px] font-medium border transition-colors cursor-pointer ${
                      isSelected
                        ? isLight
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold'
                          : 'border-indigo-500 bg-indigo-500/20 text-indigo-300 font-semibold'
                        : isLight
                        ? 'border-zinc-300 bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
                        : 'border-[#27272A] bg-[#18181B] text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tech Stack Detected Filter */}
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
              Detected Tech Stack
            </span>
            <div className="flex flex-wrap gap-1">
              {TECH_STACK_OPTIONS.map((tech) => {
                const isSelected = filters.techStack.includes(tech);
                return (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => {
                      const next = isSelected
                        ? filters.techStack.filter((t) => t !== tech)
                        : [...filters.techStack, tech];
                      onFilterChange({ ...filters, techStack: next });
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-colors cursor-pointer ${
                      isSelected
                        ? isLight
                          ? 'border-cyan-600 bg-cyan-50 text-cyan-900 font-bold'
                          : 'border-cyan-500 bg-cyan-500/20 text-cyan-300 font-bold'
                        : isLight
                        ? 'border-zinc-300 bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
                        : 'border-[#27272A] bg-[#18181B] text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Filter Results Summary Pill */}
      <div className="flex items-center justify-between text-xs text-zinc-500 px-0.5">
        <div className="flex items-center gap-2 text-[11px]">
          <span>Showing <strong className={isLight ? 'text-zinc-900' : 'text-zinc-200'}>{filteredCount}</strong> of <strong className={isLight ? 'text-zinc-900' : 'text-zinc-200'}>{totalLeadsCount}</strong> organized leads</span>
          {activeFiltersCount > 0 && (
            <span className="text-indigo-500 font-medium">({activeFiltersCount} filters active)</span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-[11px] text-zinc-500 hover:text-indigo-500 underline cursor-pointer"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
};
