import React, { useState, useEffect, useMemo } from 'react';
import {
  Navbar,
  ActiveTab
} from './components/Navbar';
import { SearchAndFilters } from './components/SearchAndFilters';
import { LeadCard } from './components/LeadCard';
import { LeadTable } from './components/LeadTable';
import { LeadDetailPage } from './components/LeadDetailPage';
import { DocumentGeneratorModal } from './components/DocumentGeneratorModal';
import { SystemArchitectureView } from './components/SystemArchitectureView';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ScrapeProgressModal } from './components/ScrapeProgressModal';
import { CrmExportModal } from './components/CrmExportModal';
import { AgencyProfileModal } from './components/AgencyProfileModal';
import { ExtractionHistoryView } from './components/ExtractionHistoryView';
import { FloatingExtractionWidget } from './components/FloatingExtractionWidget';
import { ImportLeadsModal } from './components/ImportLeadsModal';
import { AddManualLeadModal } from './components/AddManualLeadModal';
import { NexusAutonomousAgent } from './components/NexusAutonomousAgent';
import { NexusChatWorkspace } from './components/NexusChatWorkspace';
import { PlatformLogo } from './components/PlatformLogo';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import {
  Lead,
  LeadFilterState,
  ScrapingTaskParams,
  ScrapingJob,
  AgencyProfile,
  PlatformSource,
  UserAccount
} from './types';
import { INITIAL_SEED_LEADS, DEFAULT_AGENCIES } from './data/seedLeads';
import {
  getCurrentUser,
  setCurrentUser,
  getUserLeads,
  setUserLeads,
  getUserAgencies,
  setUserAgencies,
  getUserActiveAgencyId,
  setUserActiveAgencyId,
  logoutUser
} from './utils/userStorage';
import {
  LayoutGrid,
  List,
  Download,
  Plus,
  RefreshCw,
  Sparkles,
  Zap,
  Filter,
  CheckSquare,
  Square,
  AlertCircle,
  Trash2
} from 'lucide-react';

export function App() {
  // Authentication & Per-User Isolation
  const [currentUser, setCurrentUserAccount] = useState<UserAccount | null>(() => getCurrentUser());
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [leads, setLeads] = useState<Lead[]>(() => {
    const user = getCurrentUser();
    if (user) {
      return getUserLeads(user.id);
    }
    return [];
  });
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedLeadIds, setSelectedLeadIds] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Theme State
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('leadgen_theme') as 'dark' | 'light') || 'dark';
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('leadgen_theme', nextTheme);
  };

  // Synchronize documentElement theme class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [theme]);

  // Synchronize leads per-user (User can access own created data only)
  useEffect(() => {
    if (currentUser) {
      setUserLeads(currentUser.id, leads);
    }
  }, [leads, currentUser]);

  // Multi-Agency State per user
  const [agencies, setAgencies] = useState<AgencyProfile[]>(() => {
    const user = getCurrentUser();
    if (user) {
      return getUserAgencies(user.id);
    }
    return DEFAULT_AGENCIES;
  });
  const [activeAgencyId, setActiveAgencyId] = useState<string>(() => {
    const user = getCurrentUser();
    if (user) {
      return getUserActiveAgencyId(user.id);
    }
    return 'agency-ads-results-247';
  });
  const [agencyModalOpen, setAgencyModalOpen] = useState(false);

  // Sync agencies per user
  useEffect(() => {
    if (currentUser) {
      setUserAgencies(currentUser.id, agencies);
    }
  }, [agencies, currentUser]);

  useEffect(() => {
    if (currentUser) {
      setUserActiveAgencyId(currentUser.id, activeAgencyId);
    }
  }, [activeAgencyId, currentUser]);

  const activeAgency = useMemo(() => {
    return agencies.find((a) => a.id === activeAgencyId) || agencies[0] || DEFAULT_AGENCIES[0];
  }, [agencies, activeAgencyId]);

  // Handle Login / Registration success
  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUserAccount(user);
    setCurrentUser(user);
    const userLeads = getUserLeads(user.id);
    setLeads(userLeads);
    setAgencies(getUserAgencies(user.id));
    setActiveAgencyId(getUserActiveAgencyId(user.id));
    setActiveTab('chat');
    setSelectedLead(null);
  };

  const handleSignOut = () => {
    logoutUser();
    setCurrentUserAccount(null);
    setSelectedLead(null);
  };

  // Modals state
  const [docModalLead, setDocModalLead] = useState<Lead | null>(null);
  const [docModalType, setDocModalType] = useState<string>('proposal');
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [addManualModalOpen, setAddManualModalOpen] = useState(false);
  const [showFullScrapeModal, setShowFullScrapeModal] = useState(false);
  const [activeScrapeJob, setActiveScrapeJob] = useState<ScrapingJob | null>(null);
  const [isScraping, setIsScraping] = useState(false);
  const [isAgentOpen, setIsAgentOpen] = useState(false);

  // Filters State
  const [filters, setFilters] = useState<LeadFilterState>({
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

  // Fetch initial agencies and leads from backend
  useEffect(() => {
    // Only fetch saved agency profiles
    fetch('/api/agencies')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.agencies?.length) {
          setAgencies(data.agencies);
          if (data.activeAgencyId) {
            setActiveAgencyId(data.activeAgencyId);
          }
        }
      })
      .catch((err) => console.log('Offline agencies loaded:', err));
  }, []);

  const handleSaveAgency = async (agency: AgencyProfile) => {
    setAgencies((prev) => {
      const idx = prev.findIndex((a) => a.id === agency.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = agency;
        return next;
      }
      return [agency, ...prev];
    });

    try {
      await fetch('/api/agencies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agency),
      });
    } catch (err) {
      console.error('Failed to sync agency to server:', err);
    }
  };

  const handleSelectAgency = async (agency: AgencyProfile) => {
    setActiveAgencyId(agency.id);
    try {
      await fetch('/api/agencies/active', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agencyId: agency.id }),
      });
    } catch (err) {
      console.error('Failed to sync active agency:', err);
    }
  };

  const handleDeleteAgency = async (agencyId: string) => {
    if (agencies.length <= 1) return;
    setAgencies((prev) => prev.filter((a) => a.id !== agencyId));
    if (activeAgencyId === agencyId) {
      const remaining = agencies.filter((a) => a.id !== agencyId);
      setActiveAgencyId(remaining[0]?.id || '');
    }
    try {
      await fetch(`/api/agencies/${agencyId}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete agency on server:', err);
    }
  };

  // Scraping handler
  const handleStartScrape = async (params: ScrapingTaskParams, showModal: boolean = true) => {
    setIsScraping(true);
    if (showModal) {
      setShowFullScrapeModal(true);
    }
    const enrichedParams = {
      ...params,
      activeAgency,
      agencyId: activeAgency?.id,
    };

    try {
      const res = await fetch('/api/scrape/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enrichedParams),
      });
      const data = await res.json();
      if (data.success && data.job) {
        setActiveScrapeJob(data.job);
        pollScrapeJob(data.job.id);
      }
    } catch (err) {
      console.error('Error starting scrape:', err);
      setIsScraping(false);
    }
  };

  const pollScrapeJob = (jobId: string) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/scrape/status/${jobId}`);
        const data = await res.json();
        if (data.success && data.job) {
          setActiveScrapeJob(data.job);
          if (data.job.status === 'completed') {
            clearInterval(interval);
            setIsScraping(false);
            if (data.job.results?.length) {
              setLeads((prev) => {
                const map = new Map<string, Lead>();
                data.job.results.forEach((l: Lead) => map.set(l.id, l));
                prev.forEach((l) => {
                  if (!map.has(l.id)) map.set(l.id, l);
                });
                return Array.from(map.values());
              });
            }
          } else if (data.job.status === 'failed') {
            clearInterval(interval);
            setIsScraping(false);
          }
        }
      } catch (err) {
        console.error('Polling error:', err);
        clearInterval(interval);
        setIsScraping(false);
      }
    }, 1200);
  };

  // Import / Manual Add Handlers
  const handleImportLeads = async (importedLeads: Lead[]) => {
    setLeads((prev) => {
      const map = new Map<string, Lead>();
      importedLeads.forEach((l) => map.set(l.id, l));
      prev.forEach((l) => {
        if (!map.has(l.id)) map.set(l.id, l);
      });
      return Array.from(map.values());
    });
    try {
      await fetch('/api/leads/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leads: importedLeads, agencyId: activeAgency?.id }),
      });
    } catch (err) {
      console.error('Failed to sync imported leads to server:', err);
    }
  };

  const handleAddManualLead = async (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead),
      });
    } catch (err) {
      console.error('Failed to sync manual lead to server:', err);
    }
  };

  // Lead selection toggle
  const handleToggleSelectLead = (id: string) => {
    setSelectedLeadIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleToggleSelectAll = () => {
    if (selectedLeadIds.size === filteredLeads.length) {
      setSelectedLeadIds(new Set());
    } else {
      setSelectedLeadIds(new Set(filteredLeads.map((l) => l.id)));
    }
  };

  const handleClearAllLeads = async () => {
    setLeads([]);
    setSelectedLeadIds(new Set());
    try {
      localStorage.removeItem('leadgen_active_leads_v5');
      await fetch('/api/leads', { method: 'DELETE' });
    } catch (e) {
      console.error(e);
    }
  };

  // Filter and Sort leads
  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) => {
        // Keyword
        if (filters.keyword) {
          const kw = filters.keyword.toLowerCase();
          const match =
            lead.name.toLowerCase().includes(kw) ||
            lead.companyName.toLowerCase().includes(kw) ||
            lead.location.formatted.toLowerCase().includes(kw) ||
            lead.category.toLowerCase().includes(kw) ||
            lead.outreachStrategy.icebreaker.toLowerCase().includes(kw);
          if (!match) return false;
        }

        // Sources
        if (filters.sources.length > 0 && !filters.sources.includes(lead.source)) {
          return false;
        }

        // Categories
        if (filters.categories.length > 0 && !filters.categories.includes(lead.category)) {
          return false;
        }

        // Temperature
        if (filters.temperature.length > 0 && !filters.temperature.includes(lead.temperature)) {
          return false;
        }

        // Min Score
        if (filters.minScore > 0 && lead.score < filters.minScore) {
          return false;
        }

        // Contact Requirements
        if (filters.requireEmail && !lead.email) return false;
        if (filters.requirePhone && !lead.phone) return false;
        if (filters.requireWebsite && !lead.website) return false;
        if (filters.requireVerified && !lead.emailVerified && !lead.phoneVerified && !lead.deliverabilityScore) return false;

        // Ratings & Reviews
        if (filters.minRating > 0 && (!lead.rating || lead.rating < filters.minRating)) return false;
        if (filters.maxRating && filters.maxRating > 0 && lead.rating && lead.rating >= filters.maxRating) return false;
        if (filters.minReviews > 0 && (!lead.reviewsCount || lead.reviewsCount < filters.minReviews)) return false;

        // Revenue Range
        if (filters.revenueRange && filters.revenueRange !== 'all') {
          const rev = lead.researchedData?.estimatedAnnualRevenue || '';
          if (filters.revenueRange === 'under_1m' && !rev.includes('< $1M') && !rev.includes('$500K')) return false;
          if (filters.revenueRange === '1m_5m' && !rev.includes('$1M') && !rev.includes('$2M') && !rev.includes('$3M')) return false;
          if (filters.revenueRange === '5m_20m' && !rev.includes('$5M') && !rev.includes('$10M') && !rev.includes('$12M') && !rev.includes('$15M')) return false;
          if (filters.revenueRange === '20m_plus' && !rev.includes('$20M') && !rev.includes('$50M')) return false;
        }

        // Tech stack
        if (filters.techStack.length > 0) {
          const hasTech = filters.techStack.some((tech) =>
            lead.researchedData?.techStackDetected?.includes(tech)
          );
          if (!hasTech) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'score_desc') return b.score - a.score;
        if (filters.sortBy === 'rating_desc') return (b.rating || 0) - (a.rating || 0);
        if (filters.sortBy === 'reviews_desc') return (b.reviewsCount || 0) - (a.reviewsCount || 0);
        if (filters.sortBy === 'date_desc') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (filters.sortBy === 'name_asc') return a.companyName.localeCompare(b.companyName);
        return 0;
      });
  }, [leads, filters]);

  const hotLeadsCount = useMemo(() => {
    return leads.filter((l) => l.temperature === 'Hot').length;
  }, [leads]);

  const handleUpdateLead = (updated: Lead) => {
    setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    setSelectedLead(updated);
  };

  const handleOpenDocModal = (lead: Lead, type: string) => {
    setDocModalLead(lead);
    setDocModalType(type);
  };

  const handleFilterByPlatformFromHistory = (platform: PlatformSource) => {
    setFilters((prev) => ({
      ...prev,
      sources: [platform],
    }));
    setActiveTab('leads');
  };

  const handleFilterByBatchFromHistory = (batchId: string) => {
    // Show leads matching this batch
    setActiveTab('leads');
  };

  // If not authenticated, show professional Enterprise Landing Page
  if (!currentUser) {
    return (
      <LandingPage
        onLoginSuccess={handleLoginSuccess}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' ? 'bg-[#0A0A0B] text-[#E4E4E7]' : 'bg-[#F8F9FA] text-black'
    } font-sans selection:bg-indigo-600 selection:text-white flex flex-col`}>
      {/* Top Global Navigation with Single Dropdown & User Profile */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (selectedLead) setSelectedLead(null);
        }}
        leadsCount={leads.length}
        hotLeadsCount={hotLeadsCount}
        agencies={agencies}
        activeAgency={activeAgency}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        onSelectAgency={handleSelectAgency}
        onOpenAgencyModal={() => setAgencyModalOpen(true)}
        onOpenExportModal={() => setExportModalOpen(true)}
        onOpenAgent={() => setIsAgentOpen(true)}
      />

      {/* Main Container: Non-scrollable viewport fitting when in chat workspace */}
      <main className={`flex-1 max-w-7xl w-full mx-auto ${
        activeTab === 'chat' && !selectedLead
          ? 'px-2 sm:px-4 py-2 sm:py-2.5 h-[calc(100vh-4.25rem)] overflow-hidden flex flex-col'
          : 'px-3 sm:px-6 py-4 sm:py-5'
      }`}>
        {/* VIEW 1: DETAILED LEAD INTELLIGENCE PAGE */}
        {selectedLead ? (
          <LeadDetailPage
            lead={selectedLead}
            onBack={() => setSelectedLead(null)}
            onUpdateLead={handleUpdateLead}
            onOpenDocumentGenerator={handleOpenDocModal}
            activeAgency={activeAgency}
            onOpenAgencyModal={() => setAgencyModalOpen(true)}
            theme={theme}
          />
        ) : (
          <>
            {/* VIEW 0: CHAT INTERFACE - NON-SCROLLABLE FULL VIEW */}
            {activeTab === 'chat' && (
              <div className="w-full h-full flex flex-col overflow-hidden">
                <NexusChatWorkspace
                  onStartScrape={handleStartScrape}
                  isScraping={isScraping}
                  totalLeadsCount={leads.length}
                  activeAgency={activeAgency}
                  agencies={agencies}
                  onSelectAgency={handleSelectAgency}
                  onOpenAgencyModal={() => setAgencyModalOpen(true)}
                  onNavigateToResults={() => setActiveTab('leads')}
                  theme={theme}
                  setFilters={setFilters}
                />
              </div>
            )}

            {/* VIEW 2: LEADS COMMAND CENTER */}
            {activeTab === 'leads' && (
              <div className="space-y-4">
                {/* Search, Platforms & Deep Filters */}
                <SearchAndFilters
                  filters={filters}
                  onFilterChange={setFilters}
                  onStartScrape={handleStartScrape}
                  isScraping={isScraping}
                  totalLeadsCount={leads.length}
                  filteredCount={filteredLeads.length}
                  activeAgency={activeAgency}
                  onOpenAgencyModal={() => setAgencyModalOpen(true)}
                  onOpenImportModal={() => setImportModalOpen(true)}
                  onOpenAddModal={() => setAddManualModalOpen(true)}
                  onOpenExportModal={() => setExportModalOpen(true)}
                  onNavigateToChat={() => setActiveTab('chat')}
                  theme={theme}
                />

                {/* Leads Action & View Switcher Bar */}
                <div className={`flex flex-wrap items-center justify-between gap-2.5 p-2.5 rounded-lg border ${
                  theme === 'dark' ? 'border-[#27272A] bg-[#09090B]' : 'border-zinc-300 bg-white shadow-xs'
                }`}>
                  <div className="flex items-center gap-3">
                    {/* Bulk Selection count */}
                    {selectedLeadIds.size > 0 ? (
                      <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
                        <span>{selectedLeadIds.size} Leads Selected</span>
                        <button
                          type="button"
                          onClick={() => setSelectedLeadIds(new Set())}
                          className="text-xs text-zinc-400 hover:text-white underline cursor-pointer"
                        >
                          Deselect
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                          Pipeline: {filteredLeads.length} Verified Leads
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800/40 px-1.5 py-0.5 rounded border border-zinc-700/50">
                          Sorted by Score
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Clear Button */}
                    {leads.length > 0 && (
                      <button
                        type="button"
                        onClick={handleClearAllLeads}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800/40 hover:bg-rose-950/30 border border-zinc-700/60 hover:border-rose-500/40 text-zinc-400 hover:text-rose-400 text-xs font-medium transition-colors cursor-pointer"
                        title="Clear pipeline records"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Clear</span>
                      </button>
                    )}

                    {/* Bulk Export Button */}
                    <button
                      type="button"
                      id="btn-open-export"
                      onClick={() => setExportModalOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Records</span>
                    </button>

                    {/* View Switcher: Cards vs Table */}
                    <div className="flex items-center bg-zinc-800/50 p-0.5 rounded border border-zinc-700/60">
                      <button
                        type="button"
                        onClick={() => setViewMode('cards')}
                        className={`p-1 rounded text-xs transition-colors cursor-pointer ${
                          viewMode === 'cards' ? 'bg-indigo-600 text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                        }`}
                        title="Card Grid View"
                      >
                        <LayoutGrid className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode('table')}
                        className={`p-1 rounded text-xs transition-colors cursor-pointer ${
                          viewMode === 'table' ? 'bg-indigo-600 text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                        }`}
                        title="Dense Table View"
                      >
                        <List className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Leads Grid, Table or Real Pipeline Ready State */}
                {filteredLeads.length === 0 ? (
                  leads.length === 0 ? (
                    <div
                      className={`py-20 px-6 rounded-2xl border text-center space-y-4 my-4 ${
                        theme === 'dark'
                          ? 'bg-[#0E0E11] border-[#27272A] text-zinc-100'
                          : 'bg-white border-zinc-300 text-black shadow-xs'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-600 flex items-center justify-center mx-auto">
                        <Database className="w-6 h-6" />
                      </div>
                      <div className="max-w-md mx-auto space-y-1.5">
                        <h3 className={`text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                          No Leads in Pipeline
                        </h3>
                        <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-700'}`}>
                          Your corporate workspace is ready for real-time lead acquisition. Launch an extraction in Nexus AI Chat to populate your pipeline with verified contacts and tailored dossiers.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                        <button
                          type="button"
                          onClick={() => setActiveTab('chat')}
                          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-indigo-600/20 cursor-pointer transition-all transform hover:-translate-y-0.5"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>Extract Leads in Nexus AI Chat</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setImportModalOpen(true)}
                          className={`px-4 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                            theme === 'dark'
                              ? 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-zinc-800'
                              : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-black'
                          }`}
                        >
                          Import Existing CSV/XLSX
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`p-12 rounded-2xl border text-center space-y-3 my-4 ${
                        theme === 'dark'
                          ? 'bg-[#0E0E11] border-[#27272A] text-zinc-300'
                          : 'bg-white border-zinc-300 text-black'
                      }`}
                    >
                      <Filter className="w-8 h-8 text-zinc-400 mx-auto" />
                      <h4 className="font-bold text-sm">No Leads Match Your Search</h4>
                      <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-700'}`}>
                        Try modifying your search keywords or resetting active filters.
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setFilters({
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
                          })
                        }
                        className="px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold cursor-pointer"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  )
                ) : viewMode === 'cards' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {filteredLeads.map((lead) => (
                      <LeadCard
                        key={lead.id}
                        lead={lead}
                        onSelectLead={(l) => setSelectedLead(l)}
                        isSelected={selectedLeadIds.has(lead.id)}
                        onToggleSelect={handleToggleSelectLead}
                        theme={theme}
                      />
                    ))}
                  </div>
                ) : (
                  <LeadTable
                    leads={filteredLeads}
                    selectedIds={selectedLeadIds}
                    onToggleSelect={handleToggleSelectLead}
                    onToggleAll={handleToggleSelectAll}
                    onSelectLead={(l) => setSelectedLead(l)}
                    theme={theme}
                  />
                )}
              </div>
            )}

            {/* VIEW 3: EXTRACTION HISTORY & PLATFORM INDEX */}
            {activeTab === 'history' && (
              <ExtractionHistoryView
                leads={leads}
                onFilterByPlatform={handleFilterByPlatformFromHistory}
                onFilterByBatch={handleFilterByBatchFromHistory}
                activeAgency={activeAgency}
                theme={theme}
              />
            )}

            {/* VIEW 4: ANALYTICS & DATA VISUALIZATION DASHBOARD */}
            {activeTab === 'analytics' && <AnalyticsDashboard leads={leads} />}

            {/* VIEW 5: SYSTEM ARCHITECTURE SPECIFICATIONS */}
            {activeTab === 'architecture' && <SystemArchitectureView />}

            {/* VIEW 6: VECTOR DB & RAG KNOWLEDGE BASE */}
            {activeTab === 'vector_rag' && <SystemArchitectureView />}
          </>
        )}
      </main>

      {/* MODALS */}
      {/* Automated Document Generator Modal */}
      {docModalLead && (
        <DocumentGeneratorModal
          lead={docModalLead}
          initialDocType={docModalType}
          onClose={() => setDocModalLead(null)}
          activeAgency={activeAgency}
          theme={theme}
        />
      )}

      {/* Live Scraping Progress Overlay Modal */}
      <ScrapeProgressModal
        job={showFullScrapeModal ? activeScrapeJob : null}
        onCancel={() => {
          setShowFullScrapeModal(false);
        }}
      />

      {/* Persistent Floating Extraction Status Widget - Only outside chat view */}
      {activeTab !== 'chat' && (
        <FloatingExtractionWidget
          job={activeScrapeJob}
          onOpenDetails={() => setShowFullScrapeModal(true)}
          onDismiss={() => {
            setActiveScrapeJob(null);
            setIsScraping(false);
          }}
        />
      )}

      {/* CSV / Excel Spreadsheet Import & AI Enrichment Modal */}
      <ImportLeadsModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        onImportLeads={handleImportLeads}
        activeAgency={activeAgency}
        theme={theme}
      />

      {/* Manual Lead Entry & Verification Modal */}
      <AddManualLeadModal
        isOpen={addManualModalOpen}
        onClose={() => setAddManualModalOpen(false)}
        onAddLead={handleAddManualLead}
        activeAgency={activeAgency}
      />

      {/* CRM Export Modal */}
      <CrmExportModal
        leads={selectedLeadIds.size > 0 ? leads.filter((l) => selectedLeadIds.has(l.id)) : filteredLeads}
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
      />

      {/* Business / Agency Configuration Modal */}
      <AgencyProfileModal
        isOpen={agencyModalOpen}
        onClose={() => setAgencyModalOpen(false)}
        activeAgency={activeAgency}
        agencies={agencies}
        onSaveAgency={handleSaveAgency}
        onSelectActiveAgency={handleSelectAgency}
        onDeleteAgency={handleDeleteAgency}
      />

      {/* User Switch & Registration Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleLoginSuccess}
        initialMode="register"
        theme={theme}
      />

      {/* Nexus AI Autonomous Operator (Floating Bottom-Right Button & Command Center) - Hidden on default Nexus AI chat page */}
      {activeTab !== 'chat' && (
        <NexusAutonomousAgent
          isOpen={isAgentOpen}
          onToggle={() => setIsAgentOpen(!isAgentOpen)}
          leads={leads}
          setLeads={setLeads}
          activeAgency={activeAgency}
          onStartScrape={(p) => handleStartScrape(p, false)}
          isScraping={isScraping}
          activeScrapeJob={activeScrapeJob}
          filters={filters}
          setFilters={setFilters}
          selectedLead={selectedLead}
          setSelectedLead={setSelectedLead}
          onOpenDocGenerator={handleOpenDocModal}
          onOpenCrmExport={() => setExportModalOpen(true)}
          onOpenAgencyModal={() => setAgencyModalOpen(true)}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (selectedLead) setSelectedLead(null);
          }}
          theme={theme}
        />
      )}

      {/* Footer - Only visible outside full-height chat workspace */}
      {activeTab !== 'chat' && (
        <footer className={`border-t py-4 mt-8 text-center text-xs ${
          theme === 'dark' ? 'border-[#27272A] bg-[#09090B] text-zinc-500' : 'border-zinc-300 bg-white text-zinc-600'
        }`}>
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <span className={`font-bold ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-800'}`}>LEADGEN PRO</span>
              <span>• 20-Source Live Grounding & Sales Intelligence Engine</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-emerald-400 font-bold">● Live Search Grounding Active</span>
              <span>•</span>
              <span>Branded for {activeAgency.name}</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
