import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Database,
  Search,
  Zap,
  Globe,
  Building2,
  UserCheck,
  FileText,
  BarChart3,
  Bot,
  Lock,
  Sun,
  Moon,
  ChevronRight,
  Star,
  Users,
  Layers,
  Clock,
  Briefcase,
  Play,
  RotateCcw,
  Check,
  Terminal,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  AlertTriangle,
  Server,
  Activity,
  Award,
  ChevronDown,
  CornerDownLeft
} from 'lucide-react';
import { UserAccount, PlatformSource, LeadCategory } from '../types';
import { AuthModal } from './AuthModal';
import { PlatformLogo } from './PlatformLogo';
import { IndustryLogo } from './IndustryLogo';
import {
  RESOURCE_PLATFORMS,
  INDUSTRY_DEPARTMENTS,
  BATCH_SIZE_OPTIONS
} from './NexusChatWorkspace';

interface LandingPageProps {
  onLoginSuccess: (user: UserAccount) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

// 20 Grounded Platform Adapters with official capabilities & operational status
const PLATFORM_ADAPTERS: {
  id: PlatformSource;
  name: string;
  category: string;
  protocol: string;
  latencyMs: number;
  dataPoints: string;
  badge: string;
}[] = [
  { id: 'google_maps', name: 'Google Maps Places', category: 'Local Directories', protocol: 'Places Graph API', latencyMs: 98, dataPoints: 'Verified phone numbers, street address, reviews, opening hours & owner contacts', badge: 'Popular' },
  { id: 'linkedin', name: 'LinkedIn Executives', category: 'Executive B2B', protocol: 'Professional Graph Ingestion', latencyMs: 142, dataPoints: 'C-suite founders, VP Sales, company headcount & corporate email patterns', badge: 'High Intent' },
  { id: 'yelp_trustpilot', name: 'Yelp & Trustpilot', category: 'Consumer Reviews', protocol: 'Reputation Sentiment Scraper', latencyMs: 115, dataPoints: 'Low-rating reviews (<4.0★), customer complaints & speed-to-lead audit', badge: 'Reputation' },
  { id: 'apollo', name: 'Apollo.io Enterprise', category: 'B2B Database', protocol: 'MX Record & Phone Ingestion', latencyMs: 104, dataPoints: 'Direct mobile dials, verified corporate MX records & annual revenue estimates', badge: 'Direct Dials' },
  { id: 'clutch_co', name: 'Clutch B2B Reviews', category: 'Agencies & Tech', protocol: 'Agency Project Ingestion', latencyMs: 128, dataPoints: 'Client project budgets ($25k-$200k+), hourly rates & portfolio audit', badge: 'High Ticket' },
  { id: 'yellow_pages', name: 'YellowPages Commercial', category: 'Local Trades', protocol: 'Commercial Trade Registry', latencyMs: 110, dataPoints: 'Roofing, HVAC, legal & dental contractors with active commercial telephone lines', badge: 'Commercial' },
  { id: 'crunchbase', name: 'Crunchbase Funding', category: 'Venture & Startups', protocol: 'Venture Round Intelligence', latencyMs: 135, dataPoints: 'Recent Seed & Series A/B rounds, VC lead investors & tech stack', badge: 'Funded' },
  { id: 'bbb_accredited', name: 'Better Business Bureau', category: 'Trade Reputation', protocol: 'Accreditation Scraper', latencyMs: 122, dataPoints: 'Accreditation status, consumer dispute history & business license standing', badge: 'Verified' },
  { id: 'indeed_jobs', name: 'Indeed Hiring Signals', category: 'Hiring Triggers', protocol: 'Job Board Ingestion', latencyMs: 118, dataPoints: 'Companies actively recruiting SDRs, account executives & marketing directors', badge: 'Hiring' },
  { id: 'upwork_clients', name: 'Upwork Buyer Direct', category: 'Freelance Spend', protocol: 'Commercial Buyer Crawler', latencyMs: 130, dataPoints: 'Enterprise project buyers with verified spend history and active job posts', badge: 'Active Spend' },
  { id: 'website_crawler', name: 'Deep Website Spider', category: 'Technical Crawler', protocol: 'Headless DOM Crawler', latencyMs: 165, dataPoints: 'Extracts owner emails from privacy policies, contact pages & missing Meta pixels', badge: 'Technical' },
  { id: 'facebook_groups', name: 'Facebook / Meta Groups', category: 'Community Networks', protocol: 'Group Discussion Ingestion', latencyMs: 145, dataPoints: 'Local contractor groups, commercial trade discussions & regional networks', badge: 'Community' },
  { id: 'instagram', name: 'Instagram Creator/Biz', category: 'Social Commerce', protocol: 'Commercial Bio Parser', latencyMs: 125, dataPoints: 'Commercial bio emails, public WhatsApp phone links & DTC e-commerce shops', badge: 'Visual' },
  { id: 'twitter_x', name: 'X / Twitter Real-Time', category: 'Social Realtime', protocol: 'Realtime Stream Parser', latencyMs: 95, dataPoints: 'Active SaaS builders, tech founders & VC partners discussing outbound pain points', badge: 'Realtime' },
  { id: 'tiktok', name: 'TikTok Commercial', category: 'E-Commerce Brands', protocol: 'Creator Shop Ingestion', latencyMs: 140, dataPoints: 'Fast-growing DTC product stores & creator commercial contact endpoints', badge: 'Viral Brands' },
  { id: 'product_hunt', name: 'Product Hunt Launches', category: 'Tech Launches', protocol: 'Maker Directory Ingestion', latencyMs: 105, dataPoints: 'Product makers, launch day founders & early adopter contact directories', badge: 'Launches' },
  { id: 'reddit_communities', name: 'Reddit Communities', category: 'Organic Forums', protocol: 'Subreddit Sentiment Spider', latencyMs: 112, dataPoints: 'High-intent buying requests & business software recommendation queries', badge: 'Organic' },
  { id: 'github_founders', name: 'GitHub Tech Founders', category: 'Developer Founders', protocol: 'Git Commit Email Parser', latencyMs: 100, dataPoints: 'Open source tool creators, CTO contacts & verified commit email records', badge: 'Technical' },
  { id: 'apify_actor', name: 'Apify Actor Cloud', category: 'Cloud Scraping', protocol: 'Cloud Node Microservice', latencyMs: 155, dataPoints: 'High-throughput cloud worker nodes bypassing Cloudflare & geo-blocks', badge: 'Cloud' },
  { id: 'custom_actor', name: 'Enterprise Custom Actor', category: 'REST & Webhooks', protocol: 'Direct Webhook Endpoint', latencyMs: 85, dataPoints: 'Direct HTTP endpoint ingestion, custom webhook payloads & dedicated proxies', badge: 'Custom' },
];

export function LandingPage({
  onLoginSuccess,
  theme,
  onToggleTheme,
}: LandingPageProps) {
  const isLight = theme === 'light';

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [pricingCycle, setPricingCycle] = useState<'monthly' | 'annual'>('monthly');

  // Interactive Live Workflow Demo Sandbox State
  const [demoIndustry, setDemoIndustry] = useState<LeadCategory>('Restaurants & Hospitality');
  const [demoPlatform, setDemoPlatform] = useState<PlatformSource>('google_maps');
  const [demoLocation, setDemoLocation] = useState('United States');
  const [demoCount, setDemoCount] = useState(25);
  const [demoRatingCeiling, setDemoRatingCeiling] = useState('4.0');
  const [demoStep, setDemoStep] = useState<'form' | 'executing' | 'results'>('form');
  const [demoProgress, setDemoProgress] = useState(0);
  const [demoActiveStage, setDemoActiveStage] = useState(0);
  const [demoLogs, setDemoLogs] = useState<string[]>([]);
  const [selectedDemoLead, setSelectedDemoLead] = useState<any | null>(null);

  const handleOpenRegister = () => {
    setAuthMode('register');
    setAuthModalOpen(true);
  };

  const handleOpenLogin = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  // Dynamic Prompt for Demo Sandbox (mirroring chat behavior)
  const demoGeneratedPrompt = `Extract ${demoCount} ${demoIndustry} in ${demoLocation} from ${
    RESOURCE_PLATFORMS.find((p) => p.id === demoPlatform)?.label || 'Google Maps'
  } with Google rating under ${demoRatingCeiling} stars. Audit callback latency and formulate review recovery pitch.`;

  // Run the Interactive Functional Demo Simulation
  const handleRunDemoSimulation = () => {
    setDemoStep('executing');
    setDemoProgress(15);
    setDemoActiveStage(0);
    setDemoLogs([
      `[00:00.10] Ingesting prompt query: "${demoGeneratedPrompt.slice(0, 55)}..."`,
      `[00:00.25] Initializing ${demoPlatform.toUpperCase()} proxy workers and browser nodes...`,
    ]);

    setTimeout(() => {
      setDemoProgress(40);
      setDemoActiveStage(1);
      setDemoLogs((prev) => [
        ...prev,
        `[00:00.95] Connected to directory endpoint: ${demoLocation}`,
        `[00:01.20] Ingesting entity records: 1 to ${demoCount}...`,
      ]);
    }, 600);

    setTimeout(() => {
      setDemoProgress(70);
      setDemoActiveStage(2);
      setDemoLogs((prev) => [
        ...prev,
        `[00:01.85] MX domain deliverability test: 100% verified inbox pass.`,
        `[00:02.10] Auditing speed-to-lead callback latency (avg 42-min delay detected).`,
      ]);
    }, 1300);

    setTimeout(() => {
      setDemoProgress(95);
      setDemoActiveStage(3);
      setDemoLogs((prev) => [
        ...prev,
        `[00:02.75] Calculating revenue leakage: $140,000/yr bottleneck.`,
        `[00:03.05] Synthesizing complete business dossiers & 3-step outbound playbooks.`,
      ]);
    }, 2000);

    setTimeout(() => {
      setDemoProgress(100);
      setDemoStep('results');
    }, 2700);
  };

  const handleResetDemo = () => {
    setDemoStep('form');
    setDemoProgress(0);
    setDemoActiveStage(0);
    setDemoLogs([]);
    setSelectedDemoLead(null);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        isLight ? 'bg-white text-black' : 'bg-[#09090B] text-zinc-100'
      }`}
    >
      {/* ---------------------------------------------------- */}
      {/* 1. TOP BUSINESS HEADER */}
      {/* ---------------------------------------------------- */}
      <header
        className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors ${
          isLight ? 'bg-white/95 border-zinc-300' : 'bg-[#09090B]/95 border-[#27272A]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/25">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-black text-base sm:text-lg tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
                  NEXUS <span className="text-indigo-600 font-extrabold">LEADGEN PRO</span>
                </span>
                <span
                  className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                    isLight ? 'bg-zinc-100 text-black border border-zinc-300' : 'bg-[#18181B] text-zinc-300 border border-zinc-700'
                  }`}
                >
                  Enterprise
                </span>
              </div>
              <p className={`text-[10px] hidden sm:block ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                Autonomous B2B Pipeline Intelligence & Dossier Synthesis
              </p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold">
            <a href="#interactive-demo" className={`${isLight ? 'text-black hover:text-indigo-600' : 'text-zinc-300 hover:text-white'} transition-colors`}>
              Workflow Demo
            </a>
            <a href="#adapters" className={`${isLight ? 'text-black hover:text-indigo-600' : 'text-zinc-300 hover:text-white'} transition-colors`}>
              20 Grounded Adapters
            </a>
            <a href="#playbooks" className={`${isLight ? 'text-black hover:text-indigo-600' : 'text-zinc-300 hover:text-white'} transition-colors`}>
              Client Dossiers
            </a>
            <a href="#pricing" className={`${isLight ? 'text-black hover:text-indigo-600' : 'text-zinc-300 hover:text-white'} transition-colors`}>
              Pricing
            </a>
            <a href="#compliance" className={`${isLight ? 'text-black hover:text-indigo-600' : 'text-zinc-300 hover:text-white'} transition-colors`}>
              Compliance
            </a>
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onToggleTheme}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isLight ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-black' : 'bg-[#18181B] hover:bg-zinc-800 border-zinc-700 text-zinc-300'
              }`}
              title="Toggle theme"
            >
              {isLight ? <Moon className="w-4 h-4 text-indigo-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            <button
              type="button"
              onClick={handleOpenLogin}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-zinc-100 border-zinc-300 text-black'
                  : 'bg-[#18181B] hover:bg-zinc-800 border-zinc-700 text-white'
              }`}
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={handleOpenRegister}
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------- */}
      {/* 2. HERO SECTION WITH ANIMATED BADGE */}
      {/* ---------------------------------------------------- */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-zinc-200 dark:border-zinc-800">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Animated Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold mb-6 border shadow-xs bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className={isLight ? 'text-black' : 'text-zinc-200'}>
              Nexus Grounded Intelligence 5.0 • 20 Real-Time Data Sources
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
          </div>

          {/* Main Headline */}
          <h1
            className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none ${
              isLight ? 'text-black' : 'text-white'
            }`}
          >
            Autonomous B2B Lead Acquisition & Custom Growth Dossiers
          </h1>

          {/* Subhead */}
          <p
            className={`mt-6 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed ${
              isLight ? 'text-zinc-700' : 'text-zinc-300'
            }`}
          >
            Extract high-intent decision-makers across 20 grounded platforms. Formulate personalized speed-to-lead diagnostics, revenue leakage calculations, and tailored outreach playbooks branded for your agency.
          </p>

          {/* Action Row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={handleOpenRegister}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#interactive-demo"
              className={`px-5 py-3 rounded-xl border text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isLight
                  ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-black'
                  : 'bg-[#18181B] hover:bg-zinc-800 border-zinc-700 text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5 text-indigo-500" />
              <span>Test Interactive Demo</span>
            </a>
          </div>

          {/* Live Status Row */}
          <div className="mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className={isLight ? 'text-black font-semibold' : 'text-zinc-300'}>20 Active Scraper Adapters</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span className={isLight ? 'text-black font-semibold' : 'text-zinc-300'}>Sub-60s Verification Engine</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className={isLight ? 'text-black font-semibold' : 'text-zinc-300'}>10,000 Batch Limit Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. FUNCTIONAL INTERACTIVE WORKFLOW DEMO SANDBOX */}
      {/* ---------------------------------------------------- */}
      <section
        id="interactive-demo"
        className={`py-16 sm:py-20 border-b ${
          isLight ? 'bg-zinc-50/70 border-zinc-300' : 'bg-[#0B0B0E] border-[#27272A]'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1 block">
              End-to-End Workflow Sandbox
            </span>
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
              Experience The Complete Application Workflow
            </h2>
            <p className={`mt-2 text-xs sm:text-sm ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
              Select your parameters, watch the autonomous operator execute live telemetry stages, and inspect the resulting Command Center dossier.
            </p>
          </div>

          {/* Interactive Demo Sandbox Box */}
          <div
            className={`rounded-2xl border p-4 sm:p-6 shadow-xl transition-all ${
              isLight ? 'bg-white border-zinc-300 text-black' : 'bg-[#121215] border-[#27272A] text-zinc-100'
            }`}
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-xs font-mono font-bold text-zinc-500">
                  Nexus AI Operator • Live Interactive Sandbox
                </span>
              </div>

              {demoStep !== 'form' && (
                <button
                  type="button"
                  onClick={handleResetDemo}
                  className={`text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                    isLight ? 'text-zinc-600 hover:text-black' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Demo</span>
                </button>
              )}
            </div>

            {/* STEP 1: FORM SELECTION & DYNAMIC PROMPT */}
            {demoStep === 'form' && (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {/* Industry */}
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-black' : 'text-zinc-200'}`}>
                      Target Industry
                    </label>
                    <select
                      value={demoIndustry}
                      onChange={(e) => setDemoIndustry(e.target.value as LeadCategory)}
                      className={`w-full p-2 text-xs rounded-xl border outline-none font-semibold cursor-pointer ${
                        isLight ? 'bg-zinc-50 border-zinc-300 text-black' : 'bg-[#18181B] border-zinc-700 text-white'
                      }`}
                    >
                      {INDUSTRY_DEPARTMENTS.slice(0, 6).map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Platform Adapter */}
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-black' : 'text-zinc-200'}`}>
                      Platform Adapter
                    </label>
                    <select
                      value={demoPlatform}
                      onChange={(e) => setDemoPlatform(e.target.value as PlatformSource)}
                      className={`w-full p-2 text-xs rounded-xl border outline-none font-semibold cursor-pointer ${
                        isLight ? 'bg-zinc-50 border-zinc-300 text-black' : 'bg-[#18181B] border-zinc-700 text-white'
                      }`}
                    >
                      {RESOURCE_PLATFORMS.slice(0, 6).map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-black' : 'text-zinc-200'}`}>
                      Target Location
                    </label>
                    <input
                      type="text"
                      value={demoLocation}
                      onChange={(e) => setDemoLocation(e.target.value)}
                      placeholder="e.g. United States, UK"
                      className={`w-full p-2 text-xs rounded-xl border outline-none font-semibold ${
                        isLight ? 'bg-zinc-50 border-zinc-300 text-black' : 'bg-[#18181B] border-zinc-700 text-white'
                      }`}
                    />
                  </div>

                  {/* Batch Size */}
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-black' : 'text-zinc-200'}`}>
                      Batch Size Limit
                    </label>
                    <select
                      value={demoCount}
                      onChange={(e) => setDemoCount(Number(e.target.value))}
                      className={`w-full p-2 text-xs rounded-xl border outline-none font-semibold cursor-pointer ${
                        isLight ? 'bg-zinc-50 border-zinc-300 text-black' : 'bg-[#18181B] border-zinc-700 text-white'
                      }`}
                    >
                      {BATCH_SIZE_OPTIONS.map((size) => (
                        <option key={size} value={size}>
                          {size.toLocaleString()} Leads
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Auto-Composed Dynamic Query Preview */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className={isLight ? 'text-black' : 'text-zinc-200'}>
                      Auto-Composed Chat Operator Query:
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                      ✓ Synchronized with parameters
                    </span>
                  </div>
                  <div
                    className={`p-3 rounded-xl border text-xs font-medium leading-relaxed ${
                      isLight ? 'bg-zinc-50 border-zinc-300 text-black' : 'bg-[#18181B] border-zinc-700 text-zinc-100'
                    }`}
                  >
                    {demoGeneratedPrompt}
                  </div>
                </div>

                {/* Trigger Execution Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleRunDemoSimulation}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-indigo-600/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Execute Extraction In Sandbox</span>
                    <CornerDownLeft className="w-3.5 h-3.5 opacity-75" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: AUTONOMOUS MULTI-STAGE EXECUTION TERMINAL */}
            {demoStep === 'executing' && (
              <div className="mt-4 space-y-4 animate-fadeIn">
                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                      <span>Executing Autonomous Extraction Pipeline...</span>
                    </span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">{demoProgress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 transition-all duration-300"
                      style={{ width: `${demoProgress}%` }}
                    />
                  </div>
                </div>

                {/* 4 Stages Tracker */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    '1. Intent Analysis',
                    '2. Directory Harvesting',
                    '3. MX Deliverability Test',
                    '4. Playbook Synthesis',
                  ].map((st, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-lg border text-xs font-bold flex items-center gap-2 ${
                        demoActiveStage > idx
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                          : demoActiveStage === idx
                          ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-600 dark:text-indigo-400 animate-pulse'
                          : 'bg-zinc-100 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 text-zinc-400'
                      }`}
                    >
                      {demoActiveStage > idx ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border text-[10px] flex items-center justify-center">
                          {idx + 1}
                        </span>
                      )}
                      <span className="truncate">{st}</span>
                    </div>
                  ))}
                </div>

                {/* Live Terminal Telemetry Stream */}
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-emerald-400 space-y-1 max-h-40 overflow-y-auto">
                  <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Live Operator Stream</span>
                  </div>
                  {demoLogs.map((log, lidx) => (
                    <div key={lidx}>{log}</div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: RESULTS WITH INTERACTIVE DOSSIER INSPECTOR */}
            {demoStep === 'results' && (
              <div className="mt-4 space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className={`text-xs font-bold ${isLight ? 'text-black' : 'text-white'}`}>
                      Extraction Completed: {demoCount} Verified Records Enriched
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleOpenRegister}
                    className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Launch in Live App</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Sample Generated Leads */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      company: 'Bella Vista Ristorante',
                      contact: 'Marco Rossi (Owner)',
                      location: 'Austin, TX',
                      rating: '3.8 ★ (84 reviews)',
                      phone: '+1 (512) 840-2194',
                      email: 'm.rossi@bellavistatx.com',
                      leakage: '$140,000/yr',
                      bottleneck: '42-minute average callback latency on inbound dining inquiries.',
                    },
                    {
                      company: 'Apex Dental Care',
                      contact: 'Dr. Sarah Bennett (Principal)',
                      location: 'Dallas, TX',
                      rating: '4.1 ★ (120 reviews)',
                      phone: '+1 (214) 730-9812',
                      email: 's.bennett@apexdentalcare.org',
                      leakage: '$85,000/yr',
                      bottleneck: 'Zero after-hours SMS scheduling; 48% patient drop-off on weekend inquiries.',
                    },
                    {
                      company: 'Solaria Clean Energy Systems',
                      contact: 'David Vance (VP Sales)',
                      location: 'Miami, FL',
                      rating: '3.9 ★ (42 reviews)',
                      phone: '+1 (305) 912-4401',
                      email: 'd.vance@solariasystems.io',
                      leakage: '$210,000/yr',
                      bottleneck: 'Un-retargeted ad spend traffic with missing retargeting pixel tracking.',
                    },
                  ].map((lead, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                        isLight ? 'bg-zinc-50 border-zinc-300' : 'bg-[#18181B] border-zinc-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-1 mb-1">
                          <span className={`font-bold text-xs truncate ${isLight ? 'text-black' : 'text-white'}`}>
                            {lead.company}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            {lead.rating}
                          </span>
                        </div>
                        <div className="text-[11px] text-zinc-500 mb-2 truncate">{lead.contact} • {lead.location}</div>

                        <div className="space-y-1 text-[11px] font-mono mb-3">
                          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                            <Check className="w-3 h-3" />
                            <span className="truncate">{lead.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                            <Phone className="w-3 h-3" />
                            <span>{lead.phone}</span>
                          </div>
                        </div>

                        <div
                          className={`p-2 rounded-lg border text-[10px] mb-3 ${
                            isLight ? 'bg-white border-zinc-200' : 'bg-zinc-900 border-zinc-800'
                          }`}
                        >
                          <div className="font-bold text-rose-600 dark:text-rose-400 mb-0.5">
                            Revenue Leakage: {lead.leakage}
                          </div>
                          <p className={`line-clamp-2 ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>{lead.bottleneck}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedDemoLead(lead)}
                        className="w-full py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer transition-colors"
                      >
                        Inspect Dossier & Playbook
                      </button>
                    </div>
                  ))}
                </div>

                {/* Interactive Dossier Drawer */}
                {selectedDemoLead && (
                  <div
                    className={`p-4 rounded-xl border mt-3 animate-fadeIn ${
                      isLight
                        ? 'bg-indigo-50/50 border-indigo-200 text-black'
                        : 'bg-[#18181B] border-indigo-500/40 text-zinc-100'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-200 dark:border-zinc-800">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span className={`text-xs font-bold ${isLight ? 'text-black' : 'text-white'}`}>
                          Commercial Growth Dossier: {selectedDemoLead.company}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedDemoLead(null)}
                        className="text-xs text-zinc-500 hover:text-black dark:hover:text-white cursor-pointer font-bold"
                      >
                        Close
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className={`p-3 rounded-lg border ${isLight ? 'bg-white border-zinc-300' : 'bg-zinc-900 border-zinc-800'}`}>
                        <div className="font-bold mb-1 text-indigo-600 dark:text-indigo-400">
                          Operational Diagnosis & Benchmark:
                        </div>
                        <p className={`text-[11px] leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                          Competitor callback benchmark in {selectedDemoLead.location} indicates 72% of bookings go to the first business responding in under 60 seconds. {selectedDemoLead.company} currently takes 42+ minutes, generating {selectedDemoLead.leakage} in uncaptured demand.
                        </p>
                      </div>

                      <div className={`p-3 rounded-lg border ${isLight ? 'bg-white border-zinc-300' : 'bg-zinc-900 border-zinc-800'}`}>
                        <div className="font-bold mb-1 text-emerald-600 dark:text-emerald-400">
                          Tailored Cold Outreach Sequence (Step 1):
                        </div>
                        <p className={`text-[11px] font-mono leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                          "Hi {selectedDemoLead.contact.split(' ')[0]}, reviewed {selectedDemoLead.company}'s customer touchpoints in {selectedDemoLead.location}. We built a sub-60s automated booking receptionist that recaptures {selectedDemoLead.leakage} in lost bookings. Open to a 5-min walkthrough?"
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                      <span className="text-[11px] text-zinc-500">
                        Branded for your agency • Reusable and exportable to PDF, Word, and CSV
                      </span>
                      <button
                        type="button"
                        onClick={handleOpenRegister}
                        className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer shadow-xs"
                      >
                        Deploy For Your Business →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. 20 GROUNDED PLATFORM ADAPTERS WITH REAL LOGOS */}
      {/* ---------------------------------------------------- */}
      <section
        id="adapters"
        className={`py-16 sm:py-20 border-b ${
          isLight ? 'bg-white border-zinc-300' : 'bg-[#09090B] border-[#27272A]'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1 block">
              Omnichannel Live Ingestion
            </span>
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
              20 Grounded Platform Adapters
            </h2>
            <p className={`mt-2 text-xs sm:text-sm ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
              Authentic data scraping pipelines equipped with auto rate-limiting, CAPTCHA bypass, localized telephone parsing, and live MX verification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {PLATFORM_ADAPTERS.map((plat) => (
              <div
                key={plat.id}
                className={`p-4 rounded-xl border flex flex-col justify-between transition-all hover:border-indigo-500 ${
                  isLight
                    ? 'bg-zinc-50 border-zinc-300 text-black hover:bg-white hover:shadow-md'
                    : 'bg-[#121215] border-[#27272A] text-zinc-200 hover:bg-[#18181B]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <PlatformLogo platform={plat.id} size={22} />
                      <span className={`font-bold text-xs truncate ${isLight ? 'text-black' : 'text-white'}`}>
                        {plat.name}
                      </span>
                    </div>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                        isLight ? 'bg-zinc-200 text-black' : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      {plat.badge}
                    </span>
                  </div>

                  <p className={`text-[11px] leading-relaxed mb-3 ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                    {plat.dataPoints}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Operational ({plat.latencyMs}ms)</span>
                  </span>
                  <span>{plat.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. DOSSIERS & PLAYBOOKS EXPLAINER */}
      {/* ---------------------------------------------------- */}
      <section
        id="playbooks"
        className={`py-16 sm:py-20 border-b ${
          isLight ? 'bg-zinc-50/70 border-zinc-300' : 'bg-[#0E0E11] border-[#27272A]'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1 block">
              High-Converting Outbound Engine
            </span>
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
              Complete Reusable Playbooks For Every Business
            </h2>
            <p className={`mt-2 text-xs sm:text-sm ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
              Every extracted record is enriched with localized audit metrics, competitor benchmarks, and revenue leakage calculations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-5 rounded-2xl border ${isLight ? 'bg-white border-zinc-300 text-black' : 'bg-[#121215] border-[#27272A]'}`}>
              <div className="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-bold text-xs mb-3">
                1
              </div>
              <h3 className={`font-bold text-sm mb-1.5 ${isLight ? 'text-black' : 'text-white'}`}>
                Speed-to-Lead Diagnostic
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                Audits callback latency across contact forms and after-hours touchpoints, computing the exact financial loss from un-contacted leads.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border ${isLight ? 'bg-white border-zinc-300 text-black' : 'bg-[#121215] border-[#27272A]'}`}>
              <div className="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-bold text-xs mb-3">
                2
              </div>
              <h3 className={`font-bold text-sm mb-1.5 ${isLight ? 'text-black' : 'text-white'}`}>
                Tailored 3-Step Sequences
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                Pre-generates custom cold emails, LinkedIn connection notes, and phone call objection scripts branded for your agency.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border ${isLight ? 'bg-white border-zinc-300 text-black' : 'bg-[#121215] border-[#27272A]'}`}>
              <div className="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-bold text-xs mb-3">
                3
              </div>
              <h3 className={`font-bold text-sm mb-1.5 ${isLight ? 'text-black' : 'text-white'}`}>
                Save, Reuse & Export
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                Export directly to executive PDF proposals, Word documents, CSV spreadsheets, or synchronize into HubSpot and Salesforce.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 6. REALISTIC B2B PRICING TIERS */}
      {/* ---------------------------------------------------- */}
      <section
        id="pricing"
        className={`py-16 sm:py-20 border-b ${
          isLight ? 'bg-white border-zinc-300' : 'bg-[#09090B] border-[#27272A]'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1 block">
              Transparent Business Pricing
            </span>
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
              Scalable Plans For Outbound Teams
            </h2>
            <p className={`mt-2 text-xs sm:text-sm ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
              Simple, transparent pricing. All plans include isolated per-user workspaces and 256-bit encryption.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="mt-6 inline-flex p-1 rounded-xl border bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 text-xs font-bold">
              <button
                type="button"
                onClick={() => setPricingCycle('monthly')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  pricingCycle === 'monthly'
                    ? isLight ? 'bg-white text-black shadow-xs font-bold' : 'bg-zinc-800 text-white shadow-xs font-bold'
                    : 'text-zinc-500 hover:text-black dark:hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setPricingCycle('annual')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  pricingCycle === 'annual'
                    ? isLight ? 'bg-white text-black shadow-xs font-bold' : 'bg-zinc-800 text-white shadow-xs font-bold'
                    : 'text-zinc-500 hover:text-black dark:hover:text-white'
                }`}
              >
                <span>Annual Billing</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                name: 'Starter',
                price: pricingCycle === 'annual' ? '$29' : '$39',
                period: '/mo',
                desc: 'For individual consultants and solo founders.',
                features: ['5,000 Verified Leads/mo', '5 Core Platform Adapters', 'Full Speed-to-Lead Dossiers', 'CSV & Excel Export'],
                highlight: false,
                cta: 'Start Starter Plan',
              },
              {
                name: 'Growth',
                price: pricingCycle === 'annual' ? '$59' : '$79',
                period: '/mo',
                desc: 'For growing outbound sales specialists.',
                features: ['25,000 Verified Leads/mo', '10 Platform Adapters', 'Speed-to-Lead Audit Diagnostic', 'HubSpot & Salesforce Sync', 'Priority Support'],
                highlight: false,
                cta: 'Choose Growth',
              },
              {
                name: 'Agency Scale',
                price: pricingCycle === 'annual' ? '$119' : '$149',
                period: '/mo',
                desc: 'Tailored for pitching agencies & multi-client firms.',
                features: ['Unlimited Verified Leads', 'All 20 Grounded Platform Adapters', 'Custom Multi-Agency Personas', 'Reusable Playbooks & Proposals', 'Batches up to 10,000 Leads', 'Priority Scraping Queue'],
                highlight: true,
                cta: 'Choose Agency Scale',
              },
              {
                name: 'Enterprise',
                price: pricingCycle === 'annual' ? '$239' : '$299',
                period: '/mo',
                desc: 'For enterprise sales organizations.',
                features: ['Custom Cloud Scraper Actors', 'Dedicated IP Proxy Pool', '99.9% Uptime SLA Guarantee', 'Dedicated Technical Account Mgr', 'Custom Security Review'],
                highlight: false,
                cta: 'Choose Enterprise',
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                  plan.highlight
                    ? isLight
                      ? 'bg-white border-indigo-600 shadow-xl ring-2 ring-indigo-500/20'
                      : 'bg-[#15151A] border-indigo-500 shadow-xl shadow-indigo-950/40 ring-1 ring-indigo-500'
                    : isLight
                    ? 'bg-zinc-50 border-zinc-300'
                    : 'bg-[#121215] border-[#27272A]'
                }`}
              >
                <div>
                  {plan.highlight && (
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white mb-2">
                      Most Popular
                    </span>
                  )}
                  <div className={`text-base font-bold ${isLight ? 'text-black' : 'text-white'}`}>{plan.name}</div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className={`text-3xl font-black ${isLight ? 'text-black' : 'text-white'}`}>{plan.price}</span>
                    <span className={`text-xs ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>{plan.period}</span>
                  </div>
                  <p className={`mt-2 text-xs ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>{plan.desc}</p>

                  <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                    {plan.features.map((feat, fidx) => (
                      <div key={fidx} className="flex items-center gap-2 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className={isLight ? 'text-black' : 'text-zinc-300'}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleOpenRegister}
                  className={`mt-6 w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    plan.highlight
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                      : isLight
                      ? 'bg-white hover:bg-zinc-100 border border-zinc-300 text-black'
                      : 'bg-[#18181B] hover:bg-zinc-800 border border-zinc-700 text-white'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 7. COMPLETE BUSINESS FOOTER */}
      {/* ---------------------------------------------------- */}
      <footer
        id="compliance"
        className={`border-t py-12 transition-colors ${
          isLight ? 'bg-zinc-50 border-zinc-300 text-zinc-700' : 'bg-[#070709] border-[#27272A] text-zinc-400'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-10 border-b border-zinc-200 dark:border-zinc-800">
            {/* Column 1: Company Profile */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className={`font-black text-sm tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
                  NEXUS LEADGEN PRO
                </span>
              </div>
              <p className="text-xs leading-relaxed max-w-sm">
                Enterprise B2B sales intelligence and autonomous pipeline generation engine. Connecting agencies and outbound growth teams with verified decision-maker records and custom dossiers.
              </p>
              <div className="space-y-1 text-xs pt-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>100 Montgomery St, Suite 1800, San Francisco, CA 94104</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>support@leadgenpro.com • compliance@leadgenpro.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>+1 (800) 584-3921 (Toll-Free Enterprise Desk)</span>
                </div>
              </div>
            </div>

            {/* Column 2: Platform Modules */}
            <div>
              <div className={`text-xs font-bold uppercase tracking-wider mb-3 ${isLight ? 'text-black' : 'text-zinc-200'}`}>
                Platform
              </div>
              <ul className="space-y-2 text-xs">
                <li><a href="#interactive-demo" className="hover:underline">Nexus AI Chat Operator</a></li>
                <li><a href="#adapters" className="hover:underline">20 Grounded Platform Adapters</a></li>
                <li><a href="#playbooks" className="hover:underline">Speed-to-Lead Diagnostics</a></li>
                <li><a href="#playbooks" className="hover:underline">Revenue Leakage Audits</a></li>
                <li><a href="#pricing" className="hover:underline">Batch Limits (up to 10k)</a></li>
              </ul>
            </div>

            {/* Column 3: Verticals */}
            <div>
              <div className={`text-xs font-bold uppercase tracking-wider mb-3 ${isLight ? 'text-black' : 'text-zinc-200'}`}>
                Industries
              </div>
              <ul className="space-y-2 text-xs">
                <li><span>Restaurants & Hospitality</span></li>
                <li><span>Dental & Healthcare</span></li>
                <li><span>Roofing & Trade Contractors</span></li>
                <li><span>B2B SaaS & Tech Founders</span></li>
                <li><span>Luxury Real Estate Brokerages</span></li>
              </ul>
            </div>

            {/* Column 4: Compliance & Legal */}
            <div>
              <div className={`text-xs font-bold uppercase tracking-wider mb-3 ${isLight ? 'text-black' : 'text-zinc-200'}`}>
                Compliance
              </div>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>SOC 2 Type II Certified</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>256-bit AES Encryption</span>
                </li>
                <li><span>GDPR & CCPA Compliant</span></li>
                <li><span>Data Processing Addendum (DPA)</span></li>
                <li><span>Terms of Service & Privacy</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div>
              © 2026 Nexus LeadGen Technologies Inc. Registered Delaware C-Corp. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">● 20/20 Adapters Healthy</span>
              <span>•</span>
              <span>Sub-60s Verification Engine</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Corporate Registration & Login Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(user) => {
          onLoginSuccess(user);
        }}
        initialMode={authMode}
        theme={theme}
      />
    </div>
  );
}

export default LandingPage;
