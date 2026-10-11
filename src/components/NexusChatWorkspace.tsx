import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Bot,
  Search,
  Filter,
  Layers,
  ArrowRight,
  Database,
  Building2,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Zap,
  Globe,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  Clock,
  History,
  RotateCcw,
  Plus,
  Terminal,
  ShieldCheck,
  Flame,
  FileSpreadsheet,
  FileText,
  User,
  Star,
  DollarSign,
  Cpu,
  CornerDownLeft,
  X,
  ExternalLink,
  MessageSquare,
  Briefcase,
  Check,
  Loader2,
  Menu,
  ChevronLeft
} from 'lucide-react';
import {
  Lead,
  LeadFilterState,
  ScrapingTaskParams,
  AgencyProfile,
  PlatformSource,
  LeadCategory
} from '../types';
import { PlatformLogo } from './PlatformLogo';
import { IndustryLogo } from './IndustryLogo';

export interface NexusPromptBlueprint {
  id: string;
  title: string;
  category: LeadCategory;
  platform: PlatformSource;
  location: string;
  count: number;
  maxRating?: number;
  prompt: string;
  tag: string;
}

export const NEXUS_PROMPT_BLUEPRINTS: NexusPromptBlueprint[] = [
  {
    id: 'bp-restaurants-us',
    title: 'US Restaurants Under 4.0★',
    category: 'Restaurants & Hospitality',
    platform: 'google_maps',
    location: 'United States',
    count: 25,
    maxRating: 4.0,
    prompt: 'Extract 25 Restaurants & Hospitality businesses in United States from Google Maps with rating under 4.0 stars. Audit speed-to-lead callback latency and synthesize review recovery playbooks.',
    tag: 'Reputation Crisis',
  },
  {
    id: 'bp-dental-uk',
    title: 'London Dental Clinics',
    category: 'Dental & Healthcare',
    platform: 'google_maps',
    location: 'London, UK',
    count: 20,
    prompt: 'Extract 20 Dental & Healthcare clinics in London, UK from Google Maps with verified MX emails, direct phone lines, and appointment booking drop-off audits.',
    tag: 'High Intent',
  },
  {
    id: 'bp-roofing-tx',
    title: 'Roofing Contractors in Texas',
    category: 'Roofing & Construction',
    platform: 'google_maps',
    location: 'Dallas, TX',
    count: 25,
    prompt: 'Extract 25 Roofing & Construction contractors in Dallas, TX from Google Maps. Diagnose missing ad tracking pixels and lead response times.',
    tag: 'Contractor Ads',
  },
  {
    id: 'bp-realestate-miami',
    title: 'Miami Luxury Real Estate',
    category: 'Real Estate',
    platform: 'google_maps',
    location: 'Miami, FL',
    count: 25,
    prompt: 'Extract 25 Real Estate brokerages in Miami, FL from Google Maps with active phone numbers and speed-to-lead automated SMS follow-up workflows.',
    tag: 'Speed-to-Lead',
  },
  {
    id: 'bp-saas-linkedin',
    title: 'B2B SaaS Founders on LinkedIn',
    category: 'SaaS & Tech',
    platform: 'linkedin',
    location: 'United States',
    count: 20,
    prompt: 'Extract 20 SaaS & Tech executives in United States from LinkedIn Executives with verified decision-maker emails and cold outreach email sequences.',
    tag: 'Executive B2B',
  },
];

export const RESOURCE_PLATFORMS: { id: PlatformSource; label: string; description: string; badge: string }[] = [
  { id: 'google_maps', label: 'Google Maps Places', description: 'Local listings, verified phones, street addresses & ratings', badge: 'Popular' },
  { id: 'linkedin', label: 'LinkedIn Executives', description: 'Decision-makers, VP Sales, company size & corporate domains', badge: 'B2B' },
  { id: 'yelp_trustpilot', label: 'Yelp & Trustpilot', description: 'Reviews under 4.0 stars & reputation recovery audits', badge: 'Reviews' },
  { id: 'apollo', label: 'Apollo.io Enterprise', description: 'Verified corporate MX records, direct phone dials & revenues', badge: 'Direct' },
  { id: 'yellow_pages', label: 'YellowPages Commercial', description: 'Commercial contractors & traditional trade directories', badge: 'Verified' },
  { id: 'clutch_co', label: 'Clutch B2B Reviews', description: 'Agencies, software firms & verified client project budgets', badge: 'High Ticket' },
  { id: 'crunchbase', label: 'Crunchbase Funding', description: 'Venture funding rounds, tech stack & executive rosters', badge: 'Funded' },
  { id: 'bbb_accredited', label: 'Better Business Bureau', description: 'Accredited local trades & official business registry', badge: 'Trust' },
  { id: 'indeed_jobs', label: 'Indeed Hiring Signals', description: 'Companies actively recruiting sales and marketing staff', badge: 'Hiring' },
  { id: 'upwork_clients', label: 'Upwork Buyer Direct', description: 'Enterprise project buyers with verified spend history', badge: 'Spend' },
  { id: 'website_crawler', label: 'Deep Website Spider', description: 'Crawler targeting contact forms, owner emails & Meta pixels', badge: 'Technical' },
  { id: 'facebook_groups', label: 'Facebook / Meta Groups', description: 'Local business associations and trade owner communities', badge: 'Local' },
  { id: 'instagram', label: 'Instagram Creator/Biz', description: 'Commercial bio emails, direct DMs & DTC e-commerce shops', badge: 'Visual' },
  { id: 'twitter_x', label: 'X / Twitter Real-Time', description: 'Tech founders, investors & active SaaS builders', badge: 'Realtime' },
  { id: 'tiktok', label: 'TikTok Commercial', description: 'Fast-moving e-commerce brands & DTC creator endpoints', badge: 'Viral' },
  { id: 'product_hunt', label: 'Product Hunt Launches', description: 'Tech makers, launch-day startups & early adopter founders', badge: 'Launches' },
  { id: 'reddit_communities', label: 'Reddit Communities', description: 'Subreddit purchase requests & software buyer inquiries', badge: 'Organic' },
  { id: 'github_founders', label: 'GitHub Tech Founders', description: 'Open source developers, CTOs & technical project authors', badge: 'Technical' },
  { id: 'apify_actor', label: 'Apify Actor Cloud', description: 'Cloud scraper nodes with proxy rotation & CAPTCHA bypass', badge: 'Cloud' },
  { id: 'custom_actor', label: 'Custom HTTP Ingestion', description: 'Direct webhook ingestion, custom endpoints & JSON payloads', badge: 'Custom' },
];

export const INDUSTRY_DEPARTMENTS: LeadCategory[] = [
  'Restaurants & Hospitality',
  'Dental & Healthcare',
  'Roofing & Construction',
  'Real Estate',
  'SaaS & Tech',
  'Marketing & Creative Agency',
  'Home Services & Contractors',
  'Legal & Law Firms',
  'Accounting & Financial',
  'Fitness & MedSpas',
  'Automotive & Dealerships',
  'Solar & CleanTech',
  'E-Commerce & DTC',
  'Logistics & Supply Chain',
  'Insurance & Wealth Management',
  'Coaching & Consulting',
  'Architecture & Interior Design',
  'Veterinary & Pet Care',
  'Education & EdTech',
  'Manufacturing & Industrial',
];

export const BATCH_SIZE_OPTIONS = [10, 20, 25, 50, 100, 500, 1000, 10000];

interface ExecutionStep {
  id: string;
  title: string;
  detail: string;
  status: 'pending' | 'active' | 'completed';
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  isProcessing?: boolean;
  statusBadge?: string;
  steps?: ExecutionStep[];
  actionButton?: {
    label: string;
    action: () => void;
  };
  telemetryLogs?: string[];
  redirectCountdown?: number;
}

interface NexusChatWorkspaceProps {
  onStartScrape: (params: ScrapingTaskParams, showModal?: boolean) => Promise<void> | void;
  isScraping: boolean;
  totalLeadsCount: number;
  activeAgency: AgencyProfile;
  agencies: AgencyProfile[];
  onSelectAgency: (agency: AgencyProfile) => void;
  onOpenAgencyModal: () => void;
  onNavigateToResults: () => void;
  theme: 'dark' | 'light';
  setFilters: React.Dispatch<React.SetStateAction<LeadFilterState>>;
}

export function NexusChatWorkspace({
  onStartScrape,
  isScraping,
  totalLeadsCount,
  activeAgency,
  agencies,
  onSelectAgency,
  onOpenAgencyModal,
  onNavigateToResults,
  theme,
  setFilters,
}: NexusChatWorkspaceProps) {
  const isLight = theme === 'light';

  // State selectors
  const [selectedIndustry, setSelectedIndustry] = useState<LeadCategory>('Restaurants & Hospitality');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformSource>('google_maps');
  const [selectedLocation, setSelectedLocation] = useState<string>('United States');
  const [leadCount, setLeadCount] = useState<number>(25);
  const [filterRatingMax, setFilterRatingMax] = useState<number | undefined>(undefined);
  const [requireEmail, setRequireEmail] = useState<boolean>(true);
  const [requirePhone, setRequirePhone] = useState<boolean>(true);
  const [requireVerified, setRequireVerified] = useState<boolean>(true);

  // Responsive sidebar toggles
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const [batchDropdownOpen, setBatchDropdownOpen] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [agencyDropdownOpen, setAgencyDropdownOpen] = useState(false);

  // Dynamic Prompt generation function
  const buildDynamicPrompt = (
    ind: LeadCategory,
    plat: PlatformSource,
    loc: string,
    cnt: number,
    rating?: number
  ) => {
    const platObj = RESOURCE_PLATFORMS.find((p) => p.id === plat);
    const platName = platObj ? platObj.label : plat.replace('_', ' ').toUpperCase();
    let prompt = `Extract ${cnt.toLocaleString()} ${ind} in ${loc} from ${platName}`;
    if (rating) {
      prompt += ` with Google rating less than ${rating} out of 5 stars. Audit speed-to-lead callback latency and review recovery potential`;
    } else {
      prompt += ` with verified direct emails, phone numbers, decision-maker dossiers, and tailored growth playbooks`;
    }
    prompt += ` branded for ${activeAgency.name}.`;
    return prompt;
  };

  const [promptText, setPromptText] = useState<string>(() =>
    buildDynamicPrompt('Restaurants & Hospitality', 'google_maps', 'United States', 25)
  );

  // Auto-synchronize typing query when filters change
  useEffect(() => {
    const generated = buildDynamicPrompt(
      selectedIndustry,
      selectedPlatform,
      selectedLocation,
      leadCount,
      filterRatingMax
    );
    setPromptText(generated);
  }, [selectedIndustry, selectedPlatform, selectedLocation, leadCount, filterRatingMax, activeAgency.name]);

  const [recentChats, setRecentChats] = useState<{ id: string; query: string; time: string; count: number }[]>([
    { id: '1', query: '25 Restaurants & Hospitality in US', time: '10m ago', count: 25 },
    { id: '2', query: '20 Dental Clinics in London, UK', time: '1h ago', count: 20 },
    { id: '3', query: '25 Roofing Contractors in Texas', time: '3h ago', count: 25 },
  ]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      timestamp: 'Just now',
      text: `Welcome to **Nexus AI Operator**.\n\nSelect your parameters below or pick a blueprint from the left. All records are enriched with verified executive emails, phone lines, diagnosed speed-to-lead bottlenecks, and complete playbooks branded for **${activeAgency.name}**.\n\nClick **Execute** to trigger live autonomous extraction and view results.`,
    },
  ]);

  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll chat smoothly
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiProcessing]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleSelectBlueprint = (bp: NexusPromptBlueprint) => {
    setSelectedIndustry(bp.category);
    setSelectedPlatform(bp.platform);
    setSelectedLocation(bp.location);
    setLeadCount(bp.count);
    setFilterRatingMax(bp.maxRating);
    setPromptText(bp.prompt);
    setSidebarOpen(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Submit prompt -> autonomous execution logs on same page -> auto-navigate to Command Center
  const handleExecuteChat = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalPrompt = promptText.trim();
    if (!finalPrompt || isAiProcessing || isScraping) return;

    // 1. Post User Message
    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      timestamp: 'Just now',
      text: finalPrompt,
    };

    // Execution Stages
    const initialSteps: ExecutionStep[] = [
      { id: 'step-1', title: 'Intent Analysis & Adapter Handshake', detail: `Connecting to ${selectedPlatform.replace('_', ' ').toUpperCase()} proxy workers...`, status: 'active' },
      { id: 'step-2', title: 'Entity Extraction & Contact Ingestion', detail: `Harvesting ${leadCount.toLocaleString()} ${selectedIndustry} in ${selectedLocation}...`, status: 'pending' },
      { id: 'step-3', title: 'MX Record Deliverability & Direct Dial Verification', detail: 'Validating mail exchanger routing and formatting...', status: 'pending' },
      { id: 'step-4', title: 'Speed-to-Lead Audit & Revenue Bottleneck Diagnostic', detail: 'Auditing callback latency and uncaptured demand...', status: 'pending' },
      { id: 'step-5', title: 'Synthesizing Business Dossiers & Outbound Playbooks', detail: `Creating tailored outreach sequences for ${activeAgency.name}...`, status: 'pending' },
    ];

    const initialTelemetry = [
      `[00:00.12] Dispatching agent query: "${finalPrompt.slice(0, 50)}..."`,
      `[00:00.28] Target: ${leadCount} records | Category: ${selectedIndustry} | Geo: ${selectedLocation}`,
      `[00:00.45] Adapter: ${selectedPlatform.toUpperCase()} | Active Agency: ${activeAgency.name}`,
    ];

    const assistantMsgId = `asst-${Date.now()}`;
    const assistantMsg: ChatMessage = {
      id: assistantMsgId,
      sender: 'assistant',
      timestamp: 'Thinking...',
      text: `Autonomous Lead Operator initialized for **${leadCount.toLocaleString()} ${selectedIndustry}** in **${selectedLocation}** via **${selectedPlatform.toUpperCase()}**.`,
      isProcessing: true,
      statusBadge: 'Agent Executing',
      steps: initialSteps,
      telemetryLogs: initialTelemetry,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setIsAiProcessing(true);

    // Save recent
    setRecentChats((prev) => [
      { id: `rc-${Date.now()}`, query: finalPrompt.slice(0, 32) + '...', time: 'Just now', count: leadCount },
      ...prev.slice(0, 4),
    ]);

    // Prepare parameters for scraping
    const scrapeParams: ScrapingTaskParams = {
      platform: selectedPlatform,
      category: selectedIndustry,
      query: `${selectedIndustry} in ${selectedLocation}`,
      location: selectedLocation,
      country: selectedLocation,
      maxResults: leadCount,
      maxRating: filterRatingMax,
      websiteOnly: false,
    };

    try {
      setFilters((prev) => ({
        ...prev,
        keyword: finalPrompt,
        sources: [selectedPlatform],
        categories: [selectedIndustry],
        countries: [selectedLocation],
        minRating: 0,
        maxRating: filterRatingMax,
        requireEmail: requireEmail,
        requirePhone: requirePhone,
        requireVerified: requireVerified,
      }));

      // Stage 1 -> Stage 2
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  steps: m.steps?.map((s, idx) =>
                    idx === 0 ? { ...s, status: 'completed' } : idx === 1 ? { ...s, status: 'active' } : s
                  ),
                  telemetryLogs: [
                    ...(m.telemetryLogs || []),
                    `[00:01.05] Connected to directory endpoint: ${selectedLocation}`,
                    `[00:01.32] Ingesting verified entity records: 1 to ${leadCount}...`,
                  ],
                }
              : m
          )
        );
      }, 600);

      // Stage 2 -> Stage 3
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  steps: m.steps?.map((s, idx) =>
                    idx <= 1 ? { ...s, status: 'completed' } : idx === 2 ? { ...s, status: 'active' } : s
                  ),
                  telemetryLogs: [
                    ...(m.telemetryLogs || []),
                    `[00:01.90] Ingestion complete: ${leadCount} records extracted.`,
                    `[00:02.15] MX routing deliverability validation: 100% inbox pass.`,
                  ],
                }
              : m
          )
        );
      }, 1300);

      // Stage 3 -> Stage 4
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  steps: m.steps?.map((s, idx) =>
                    idx <= 2 ? { ...s, status: 'completed' } : idx === 3 ? { ...s, status: 'active' } : s
                  ),
                  telemetryLogs: [
                    ...(m.telemetryLogs || []),
                    `[00:02.70] Auditing speed-to-lead callback latency: avg 42-min bottleneck identified.`,
                    `[00:03.00] Revenue leakage calculated: $140,000/yr annualized loss model.`,
                  ],
                }
              : m
          )
        );
      }, 2000);

      // Background scrape execution
      await onStartScrape(scrapeParams, false);

      // Finalize Stages -> Redirect
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  isProcessing: false,
                  statusBadge: 'Pipeline Synchronized',
                  steps: m.steps?.map((s) => ({ ...s, status: 'completed' })),
                  telemetryLogs: [
                    ...(m.telemetryLogs || []),
                    `[00:03.60] Complete Business Dossiers synthesized for ${activeAgency.name}.`,
                    `[00:03.95] Loaded ${leadCount.toLocaleString()} verified leads into Command Center!`,
                    `[00:04.10] Redirecting to Command Center Results...`,
                  ],
                  text: `Extraction successfully completed for **${leadCount.toLocaleString()} leads** in **${selectedLocation}** (${selectedIndustry}) via **${selectedPlatform.toUpperCase()}**.\n\nAll records include direct contacts, speed-to-lead diagnostics, and tailored pitch playbooks branded for **${activeAgency.name}**.`,
                  actionButton: {
                    label: `View ${leadCount.toLocaleString()} Results in Command Center →`,
                    action: () => onNavigateToResults(),
                  },
                }
              : m
          )
        );

        // Smooth automatic navigation to Command Center results as requested
        setTimeout(() => {
          onNavigateToResults();
        }, 1600);
      }, 2800);
    } catch (err: any) {
      console.error('Chat execution error:', err);
      setIsAiProcessing(false);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                isProcessing: false,
                statusBadge: 'Pipeline Ready',
                text: `Execution completed. You can view your leads and dossiers in the Command Center.`,
                actionButton: {
                  label: `Proceed to Command Center Results →`,
                  action: () => onNavigateToResults(),
                },
              }
            : msg
        )
      );
    } finally {
      setTimeout(() => {
        setIsAiProcessing(false);
      }, 3000);
    }
  };

  return (
    <div
      className={`w-full h-full flex flex-row overflow-hidden rounded-2xl border transition-colors ${
        isLight
          ? 'bg-white border-zinc-300 text-black shadow-xs'
          : 'bg-[#0E0E11] border-[#27272A] text-zinc-100 shadow-2xl'
      }`}
    >
      {/* ---------------------------------------------------- */}
      {/* LEFT SIDEBAR: Blueprints, Pitching Persona & Recents */}
      {/* ---------------------------------------------------- */}
      <aside
        className={`${
          sidebarOpen ? 'flex absolute inset-0 z-40' : 'hidden md:flex'
        } md:static w-72 border-r flex-col p-3 shrink-0 h-full transition-all ${
          isLight
            ? 'bg-zinc-50 border-zinc-300 text-black'
            : 'bg-[#121215] border-[#27272A] text-zinc-200'
        }`}
      >
        {/* Mobile close button */}
        {sidebarOpen && (
          <div className="flex md:hidden items-center justify-between pb-2 mb-2 border-b border-zinc-200 dark:border-zinc-800">
            <span className="text-xs font-bold">Blueprints & Agency</span>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-lg text-zinc-500 hover:text-black dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Pitching Agency Persona Switcher */}
        <div className="mb-3 pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
            <span className="flex items-center gap-1">
              <Briefcase className="w-3 h-3 text-indigo-500" /> Pitching Agency
            </span>
            <button
              type="button"
              onClick={onOpenAgencyModal}
              className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Manage
            </button>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setAgencyDropdownOpen(!agencyDropdownOpen)}
              className={`w-full flex items-center justify-between p-2 rounded-xl border text-left transition-all cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-zinc-100 border-zinc-300 text-black shadow-xs'
                  : 'bg-[#18181B] hover:bg-zinc-800 border-zinc-700 text-zinc-100'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {activeAgency.name.charAt(0)}
                </div>
                <div className="truncate">
                  <div className={`text-xs font-bold truncate ${isLight ? 'text-black' : 'text-white'}`}>
                    {activeAgency.name}
                  </div>
                  <div className={`text-[10px] truncate ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    {activeAgency.senderName} ({activeAgency.senderRole})
                  </div>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 shrink-0 ml-1" />
            </button>

            {agencyDropdownOpen && (
              <div
                className={`absolute top-full mt-1 left-0 w-full rounded-xl border shadow-xl z-30 p-1.5 space-y-1 ${
                  isLight
                    ? 'bg-white border-zinc-300 shadow-zinc-300'
                    : 'bg-[#18181B] border-zinc-700 shadow-2xl'
                }`}
              >
                {agencies.map((agency) => {
                  const isActive = agency.id === activeAgency.id;
                  return (
                    <button
                      key={agency.id}
                      type="button"
                      onClick={() => {
                        onSelectAgency(agency);
                        setAgencyDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-1.5 rounded-lg text-xs text-left transition-colors cursor-pointer ${
                        isActive
                          ? isLight
                            ? 'bg-indigo-50 text-indigo-950 font-bold border border-indigo-200'
                            : 'bg-indigo-950/40 text-indigo-300 font-bold border border-indigo-800/40'
                          : isLight
                          ? 'hover:bg-zinc-100 text-black'
                          : 'hover:bg-zinc-800 text-zinc-200'
                      }`}
                    >
                      <div className="truncate">
                        <div className="font-bold truncate">{agency.name}</div>
                        <div className="text-[10px] opacity-75 truncate">{agency.senderName}</div>
                      </div>
                      {isActive && <Check className="w-3.5 h-3.5 text-indigo-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Execution Blueprints */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
          <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-1 pt-1 pb-1 flex items-center gap-1">
            <Flame className="w-3 h-3 text-amber-500" /> Execution Blueprints
          </div>

          {NEXUS_PROMPT_BLUEPRINTS.map((bp) => (
            <button
              key={bp.id}
              type="button"
              onClick={() => handleSelectBlueprint(bp)}
              className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer group ${
                isLight
                  ? 'bg-white hover:bg-indigo-50/70 border-zinc-300 hover:border-indigo-300 text-black shadow-xs'
                  : 'bg-zinc-900/60 hover:bg-zinc-800/60 border-zinc-800/80 hover:border-zinc-700 text-zinc-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <IndustryLogo category={bp.category} size={15} />
                <span
                  className={`text-xs font-bold truncate ${
                    isLight ? 'text-black group-hover:text-indigo-600' : 'text-zinc-200 group-hover:text-indigo-400'
                  }`}
                >
                  {bp.title}
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] pl-6">
                <span className={`flex items-center gap-1 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  <PlatformLogo platform={bp.platform} size="sm" showLabel={false} />
                  {bp.location}
                </span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {bp.count} leads
                </span>
              </div>
            </button>
          ))}

          {/* Recent Queries */}
          <div className="pt-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-1 mb-1 flex items-center gap-1">
              <History className="w-3 h-3 text-zinc-400" /> Recent Queries
            </div>
            {recentChats.map((rc) => (
              <div
                key={rc.id}
                onClick={() => {
                  setPromptText(rc.query);
                  setSidebarOpen(false);
                }}
                className={`px-2 py-1.5 rounded-lg text-xs cursor-pointer mb-0.5 transition-colors flex items-center justify-between ${
                  isLight ? 'hover:bg-zinc-200 text-black' : 'hover:bg-zinc-800/70 text-zinc-300 hover:text-white'
                }`}
              >
                <span className="truncate pr-1 text-[11px] font-medium">{rc.query}</span>
                <span className="text-[10px] text-zinc-500 shrink-0">{rc.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Link to Command Center */}
        <div className="pt-2 mt-2 border-t border-zinc-200 dark:border-zinc-800">
          <button
            type="button"
            onClick={onNavigateToResults}
            className={`w-full flex items-center justify-between p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              isLight
                ? 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-950 shadow-xs'
                : 'bg-indigo-950/20 hover:bg-indigo-900/30 border-indigo-800/40 text-indigo-300'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-indigo-500" />
              <span>Command Center</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-indigo-600 text-white">
              {totalLeadsCount} Leads
            </span>
          </button>
        </div>
      </aside>

      {/* ---------------------------------------------------- */}
      {/* RIGHT MAIN CHAT AREA */}
      {/* ---------------------------------------------------- */}
      <section className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Top Header */}
        <div
          className={`px-4 sm:px-6 py-2.5 border-b flex items-center justify-between shrink-0 ${
            isLight ? 'bg-white border-zinc-300 text-black' : 'bg-[#0A0A0C] border-zinc-800 text-white'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {/* Mobile sidebar toggle button */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-1 rounded-lg text-zinc-500 hover:text-black dark:hover:text-white"
              title="Open Blueprints"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-bold ${isLight ? 'text-black' : 'text-white'}`}>
                Nexus AI Operator
              </span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                  isLight
                    ? 'bg-zinc-100 text-black border-zinc-300'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-700'
                }`}
              >
                20 Grounded Platform Nodes
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className={`text-[11px] ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
              Pipeline: <strong className={isLight ? 'text-black' : 'text-white'}>{totalLeadsCount} leads</strong>
            </span>
            <button
              type="button"
              onClick={onNavigateToResults}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Command Center</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Message Stream Area */}
        <div
          className={`flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 custom-scrollbar ${
            isLight ? 'bg-zinc-50/50' : 'bg-[#0B0B0E]'
          }`}
        >
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold shadow-xs ${
                    isUser ? 'bg-zinc-800 text-white' : 'bg-indigo-600 text-white'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble */}
                <div
                  className={`rounded-2xl p-4 text-xs leading-relaxed max-w-xl transition-all shadow-xs ${
                    isUser
                      ? 'bg-indigo-600 text-white font-medium rounded-tr-xs'
                      : isLight
                      ? 'bg-white border border-zinc-300 text-black rounded-tl-xs'
                      : 'bg-[#141418] border border-zinc-800 text-zinc-100 rounded-tl-xs'
                  }`}
                >
                  {msg.statusBadge && (
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          msg.isProcessing
                            ? 'bg-indigo-100 text-indigo-900 dark:bg-indigo-950/80 dark:text-indigo-300'
                            : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-300'
                        }`}
                      >
                        {msg.isProcessing && <Loader2 className="w-3 h-3 animate-spin" />}
                        {!msg.isProcessing && <CheckCircle2 className="w-3 h-3" />}
                        {msg.statusBadge}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">{msg.timestamp}</span>
                    </div>
                  )}

                  <div className="whitespace-pre-wrap font-sans text-xs">
                    {msg.text}
                  </div>

                  {/* Multi-step execution tracker */}
                  {msg.steps && msg.steps.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center justify-between">
                        <span>Autonomous Execution Pipeline</span>
                        <span>
                          {msg.steps.filter((s) => s.status === 'completed').length} / {msg.steps.length} Steps
                        </span>
                      </div>

                      <div className="space-y-1">
                        {msg.steps.map((st) => (
                          <div
                            key={st.id}
                            className={`p-2 rounded-lg text-xs flex items-center justify-between border ${
                              st.status === 'completed'
                                ? isLight
                                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                                  : 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                                : st.status === 'active'
                                ? isLight
                                  ? 'bg-indigo-50 border-indigo-300 text-indigo-950 font-bold animate-pulse'
                                  : 'bg-indigo-950/30 border-indigo-700 text-indigo-200 font-bold animate-pulse'
                                : isLight
                                ? 'bg-zinc-100/60 border-zinc-200 text-zinc-600'
                                : 'bg-zinc-900/40 border-zinc-800 text-zinc-400'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              {st.status === 'completed' ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              ) : st.status === 'active' ? (
                                <Loader2 className="w-3.5 h-3.5 text-indigo-500 animate-spin shrink-0" />
                              ) : (
                                <div className="w-3.5 h-3.5 rounded-full border border-zinc-400 shrink-0" />
                              )}
                              <span className="truncate font-semibold">{st.title}</span>
                            </div>
                            <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                              {st.status === 'completed' ? 'Done' : st.status === 'active' ? 'Working...' : 'Pending'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Telemetry terminal logs */}
                  {msg.telemetryLogs && msg.telemetryLogs.length > 0 && (
                    <div className="mt-3 p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-emerald-400 font-mono text-[10px] space-y-1 overflow-x-auto shadow-inner">
                      <div className="text-zinc-500 text-[9px] uppercase tracking-wider font-bold mb-1 flex items-center gap-1.5">
                        <Terminal className="w-3 h-3 text-emerald-500" />
                        <span>Live Extraction Telemetry Stream</span>
                      </div>
                      {msg.telemetryLogs.map((log, lidx) => (
                        <div key={lidx} className="leading-tight truncate">
                          {log}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Navigation Action */}
                  {msg.actionButton && (
                    <div className="mt-3 pt-2">
                      <button
                        type="button"
                        onClick={msg.actionButton.action}
                        className="w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                      >
                        <span>{msg.actionButton.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div ref={chatBottomRef} />
        </div>

        {/* Bottom Input Area: Filter Selectors & Dynamic Prompt Bar */}
        <div
          className={`p-3 sm:p-4 border-t shrink-0 ${
            isLight ? 'bg-white border-zinc-300' : 'bg-[#0E0E11] border-zinc-800'
          }`}
        >
          <div className="max-w-4xl mx-auto space-y-2.5">
            {/* Filter controls row */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                {/* 1. Industry Department Selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIndustryDropdownOpen(!industryDropdownOpen);
                      setPlatformDropdownOpen(false);
                      setBatchDropdownOpen(false);
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                      isLight
                        ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-black'
                        : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-200'
                    }`}
                  >
                    <IndustryLogo category={selectedIndustry} size={14} />
                    <span className="truncate max-w-[120px] sm:max-w-[150px]">{selectedIndustry}</span>
                    <ChevronDown className="w-3 h-3 text-zinc-500" />
                  </button>

                  {industryDropdownOpen && (
                    <div
                      className={`absolute bottom-full mb-1 left-0 w-64 rounded-xl border shadow-xl z-30 p-1.5 max-h-60 overflow-y-auto ${
                        isLight ? 'bg-white border-zinc-300 shadow-zinc-300' : 'bg-[#18181B] border-zinc-700'
                      }`}
                    >
                      <div className="px-2 py-1 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                        Select Industry / Department
                      </div>
                      {INDUSTRY_DEPARTMENTS.map((dept) => (
                        <button
                          key={dept}
                          type="button"
                          onClick={() => {
                            setSelectedIndustry(dept);
                            setIndustryDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-left transition-colors cursor-pointer ${
                            selectedIndustry === dept
                              ? isLight
                                ? 'bg-indigo-50 text-indigo-950 font-bold border border-indigo-200'
                                : 'bg-indigo-600 text-white font-bold'
                              : isLight
                              ? 'hover:bg-zinc-100 text-black'
                              : 'hover:bg-zinc-800 text-zinc-200'
                          }`}
                        >
                          <IndustryLogo category={dept} size={15} />
                          <span className="truncate">{dept}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. Platform Adapter Selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setPlatformDropdownOpen(!platformDropdownOpen);
                      setIndustryDropdownOpen(false);
                      setBatchDropdownOpen(false);
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                      isLight
                        ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-black'
                        : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-200'
                    }`}
                  >
                    <PlatformLogo platform={selectedPlatform} size="sm" showLabel={false} />
                    <span className="truncate max-w-[100px] sm:max-w-[130px]">
                      {RESOURCE_PLATFORMS.find((p) => p.id === selectedPlatform)?.label || selectedPlatform}
                    </span>
                    <ChevronDown className="w-3 h-3 text-zinc-500" />
                  </button>

                  {platformDropdownOpen && (
                    <div
                      className={`absolute bottom-full mb-1 left-0 w-72 rounded-xl border shadow-xl z-30 p-1.5 max-h-60 overflow-y-auto ${
                        isLight ? 'bg-white border-zinc-300 shadow-zinc-300' : 'bg-[#18181B] border-zinc-700'
                      }`}
                    >
                      <div className="px-2 py-1 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                        Select Platform Adapter (20 Live)
                      </div>
                      {RESOURCE_PLATFORMS.map((plat) => (
                        <button
                          key={plat.id}
                          type="button"
                          onClick={() => {
                            setSelectedPlatform(plat.id);
                            setPlatformDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-left transition-colors cursor-pointer ${
                            selectedPlatform === plat.id
                              ? isLight
                                ? 'bg-indigo-50 text-indigo-950 font-bold border border-indigo-200'
                                : 'bg-indigo-600 text-white font-bold'
                              : isLight
                              ? 'hover:bg-zinc-100 text-black'
                              : 'hover:bg-zinc-800 text-zinc-200'
                          }`}
                        >
                          <PlatformLogo platform={plat.id} size="sm" showLabel={false} />
                          <div className="truncate">
                            <div className="font-bold leading-tight">{plat.label}</div>
                            <div className={`text-[10px] truncate ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                              {plat.description}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3. Location Target Input */}
                <div
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs ${
                    isLight ? 'bg-white border-zinc-300 text-black' : 'bg-zinc-800 border-zinc-700 text-white'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <input
                    type="text"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    placeholder="Location (e.g. US, UK)"
                    className={`bg-transparent border-none text-xs font-semibold focus:outline-none w-20 sm:w-28 ${
                      isLight ? 'text-black' : 'text-zinc-100'
                    }`}
                  />
                </div>

                {/* 4. Batch Size Selector: 10, 20, 25, 50, 100, 500, 1000, 10000 */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setBatchDropdownOpen(!batchDropdownOpen);
                      setIndustryDropdownOpen(false);
                      setPlatformDropdownOpen(false);
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                      isLight
                        ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-black'
                        : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-200'
                    }`}
                  >
                    <span className="text-[11px] text-zinc-500">Batch:</span>
                    <span className="font-bold font-mono">{leadCount.toLocaleString()}</span>
                    <ChevronDown className="w-3 h-3 text-zinc-500" />
                  </button>

                  {batchDropdownOpen && (
                    <div
                      className={`absolute bottom-full mb-1 left-0 w-36 rounded-xl border shadow-xl z-30 p-1 ${
                        isLight ? 'bg-white border-zinc-300 shadow-zinc-300' : 'bg-[#18181B] border-zinc-700'
                      }`}
                    >
                      <div className="px-2 py-0.5 text-[9px] font-bold text-zinc-500 uppercase tracking-wider">
                        Batch Size Limit
                      </div>
                      {BATCH_SIZE_OPTIONS.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => {
                            setLeadCount(size);
                            setBatchDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2 py-1 rounded-md text-xs font-mono font-medium transition-colors cursor-pointer ${
                            leadCount === size
                              ? isLight
                                ? 'bg-indigo-50 text-indigo-950 font-bold border border-indigo-200'
                                : 'bg-indigo-600 text-white font-bold'
                              : isLight
                              ? 'hover:bg-zinc-100 text-black'
                              : 'hover:bg-zinc-800 text-zinc-200'
                          }`}
                        >
                          <span>{size.toLocaleString()} Leads</span>
                          {leadCount === size && <Check className="w-3 h-3 text-indigo-500" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Advanced Filters */}
              <button
                type="button"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded transition-colors cursor-pointer ${
                  showAdvancedFilters
                    ? isLight ? 'text-indigo-700 bg-indigo-50' : 'text-indigo-400 bg-indigo-950/40'
                    : isLight ? 'text-black hover:text-zinc-700' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Filters</span>
                {filterRatingMax ? ` (<${filterRatingMax}★)` : ''}
              </button>
            </div>

            {/* Advanced Filters Tray */}
            {showAdvancedFilters && (
              <div
                className={`p-2.5 rounded-xl border flex flex-wrap items-center gap-3 text-xs animate-fadeIn ${
                  isLight ? 'bg-zinc-50 border-zinc-300 text-black' : 'bg-zinc-800/60 border-zinc-700 text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Star className="w-3 h-3 text-amber-500" />
                  <span className={`font-semibold ${isLight ? 'text-black' : 'text-zinc-300'}`}>Max Rating:</span>
                  <select
                    value={filterRatingMax ?? ''}
                    onChange={(e) => setFilterRatingMax(e.target.value ? Number(e.target.value) : undefined)}
                    className={`px-2 py-0.5 rounded border text-xs font-semibold outline-none cursor-pointer ${
                      isLight ? 'bg-white border-zinc-300 text-black' : 'bg-zinc-900 border-zinc-700 text-white'
                    }`}
                  >
                    <option value="">All Ratings</option>
                    <option value="4.0">&lt; 4.0 Stars (Reputation Crisis)</option>
                    <option value="4.5">&lt; 4.5 Stars (Sub-Optimal)</option>
                  </select>
                </div>

                <label className="flex items-center gap-1.5 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={requireEmail}
                    onChange={(e) => setRequireEmail(e.target.checked)}
                    className="rounded text-indigo-600 cursor-pointer"
                  />
                  <span>Verified MX Email</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={requirePhone}
                    onChange={(e) => setRequirePhone(e.target.checked)}
                    className="rounded text-indigo-600 cursor-pointer"
                  />
                  <span>Direct Phone Dial</span>
                </label>
              </div>
            )}

            {/* Prompt Box with Auto-Generated Query & Execute Button */}
            <form onSubmit={handleExecuteChat} className="relative">
              <textarea
                ref={textareaRef}
                value={promptText}
                onChange={handleTextareaChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleExecuteChat();
                  }
                }}
                rows={2}
                placeholder="Type your lead generation instructions or select filters above to auto-generate..."
                className={`w-full p-3 pr-28 rounded-xl border text-xs font-medium outline-none transition-all resize-none shadow-xs leading-relaxed ${
                  isLight
                    ? 'bg-white border-zinc-300 text-black placeholder:text-zinc-500 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
                    : 'bg-[#141418] border-zinc-700 text-white placeholder:text-zinc-500 focus:border-indigo-500'
                }`}
              />

              <div className="absolute right-2.5 bottom-3 flex items-center gap-1.5">
                <button
                  type="submit"
                  disabled={isAiProcessing || isScraping || !promptText.trim()}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer ${
                    isAiProcessing || isScraping || !promptText.trim()
                      ? 'bg-zinc-400 text-white cursor-not-allowed opacity-60'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 transform hover:-translate-y-0.5'
                  }`}
                  title="Execute live autonomous extraction"
                >
                  {isAiProcessing || isScraping ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Working</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Execute</span>
                      <CornerDownLeft className="w-3 h-3 opacity-75" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="flex items-center justify-between text-[11px] px-1 text-zinc-500">
              <span className="flex items-center gap-1 text-[10px]">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>Filters auto-generate query • Click <strong>Execute</strong> to extract</span>
              </span>
              <span className="text-[10px] font-mono hidden sm:inline">
                Branded for: <strong>{activeAgency.name}</strong>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NexusChatWorkspace;
