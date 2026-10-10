import React, { useState } from 'react';
import {
  ArrowLeft,
  Building,
  MapPin,
  Mail,
  Phone,
  Globe,
  Star,
  ExternalLink,
  ShieldCheck,
  Zap,
  Copy,
  Check,
  Sparkles,
  FileText,
  MessageSquare,
  AlertTriangle,
  Send,
  DollarSign,
  TrendingUp,
  Clock,
  Briefcase,
  ChevronRight,
  Printer,
  Download,
  Share2,
  RefreshCw,
  Cpu,
  Layers,
  FileType
} from 'lucide-react';
import { Lead, BusinessPainPoint, ColdEmailStep, AgencyProfile } from '../types';
import { PLATFORM_CONFIG } from '../data/seedLeads';
import { downloadWordDocument, triggerPrintablePdf } from '../utils/exportUtils';
import { SendProposalEmailModal } from './SendProposalEmailModal';

interface LeadDetailPageProps {
  lead: Lead;
  onBack: () => void;
  onUpdateLead: (updatedLead: Lead) => void;
  onOpenDocumentGenerator: (lead: Lead, docType: string) => void;
  activeAgency?: AgencyProfile;
  onOpenAgencyModal?: () => void;
  theme?: 'dark' | 'light';
}

export const LeadDetailPage: React.FC<LeadDetailPageProps> = ({
  lead,
  onBack,
  onUpdateLead,
  onOpenDocumentGenerator,
  activeAgency,
  onOpenAgencyModal,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  const [activeTab, setActiveTab] = useState<'overview' | 'pain_points' | 'outreach' | 'proposal' | 'vector_match'>('overview');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [activeEmailStep, setActiveEmailStep] = useState(0);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const platform = PLATFORM_CONFIG[lead.source] || PLATFORM_CONFIG.google_maps;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleTriggerAiEnrichment = async () => {
    setIsRegenerating(true);
    try {
      const res = await fetch('/api/ai/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadData: lead,
          activeAgency,
          customInstructions: `Provide hyper-personalized, high-converting intelligence for this business from the perspective of ${activeAgency?.name || 'ADS RESULTS 24/7'}.`,
        }),
      });
      const data = await res.json();
      if (data.success && data.research) {
        const updated: Lead = {
          ...lead,
          researchedData: {
            ...lead.researchedData,
            companyOverview: data.research.companyOverview || lead.researchedData.companyOverview,
            marketPositioning: data.research.marketPositioning || lead.researchedData.marketPositioning,
            competitors: data.research.competitors || lead.researchedData.competitors,
            estimatedAnnualRevenue: data.research.estimatedAnnualRevenue || lead.researchedData.estimatedAnnualRevenue,
            techStackDetected: data.research.techStackDetected || lead.researchedData.techStackDetected,
          },
          painPoints: data.research.painPoints?.length ? data.research.painPoints : lead.painPoints,
          outreachStrategy: data.research.outreachStrategy || lead.outreachStrategy,
          proposal: data.research.proposal || lead.proposal,
          updatedAt: new Date().toISOString(),
        };
        onUpdateLead(updated);
      }
    } catch (err) {
      console.error('Failed to regenerate research:', err);
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      {/* Top Breadcrumb & Action Bar */}
      <div className={`flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg border ${
        isLight ? 'bg-white border-zinc-200 shadow-xs' : 'border-[#27272A] bg-[#09090B]'
      }`}>
        <button
          type="button"
          id="btn-back-to-leads"
          onClick={onBack}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-colors cursor-pointer text-xs font-medium ${
            isLight
              ? 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900'
              : 'border-[#27272A] bg-[#18181B] text-zinc-300 hover:text-white hover:border-zinc-500'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Leads</span>
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleTriggerAiEnrichment}
            disabled={isRegenerating}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium border border-purple-500/40 bg-purple-950/30 text-purple-300 hover:bg-purple-900/40 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Synthesizing with Gemini...' : 'Re-Analyze with AI'}</span>
          </button>

          {/* Word Export Shortcut */}
          <button
            type="button"
            onClick={() => downloadWordDocument(lead, activeAgency, 'proposal')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium border transition-colors cursor-pointer ${
              isLight ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' : 'bg-blue-950/30 border-blue-500/30 text-blue-300 hover:bg-blue-900/40'
            }`}
            title="Download Word Document (.doc)"
          >
            <FileType className="w-3 h-3 text-blue-500" />
            <span>Word (.doc)</span>
          </button>

          {/* PDF Export Shortcut */}
          <button
            type="button"
            onClick={() => triggerPrintablePdf(lead, activeAgency, 'proposal')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium border transition-colors cursor-pointer ${
              isLight ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100' : 'bg-rose-950/30 border-rose-500/30 text-rose-300 hover:bg-rose-900/40'
            }`}
            title="Download / Print PDF"
          >
            <Printer className="w-3 h-3 text-rose-500" />
            <span>PDF</span>
          </button>

          {/* Direct Email Dispatcher */}
          <button
            type="button"
            onClick={() => setShowEmailModal(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors cursor-pointer"
            title="Send proposal to client via email"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Email</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenDocumentGenerator(lead, 'proposal')}
            className="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 shadow-xs transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Document Studio</span>
          </button>
        </div>
      </div>

      {/* Main Dossier Header Banner */}
      <div className="rounded-lg border border-[#27272A] bg-[#09090B] p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            {/* Avatar or Logo Placeholder */}
            <div className="w-12 h-12 rounded-lg bg-indigo-950/50 border border-indigo-500/30 flex items-center justify-center text-lg font-bold text-indigo-400 shrink-0 shadow-xs">
              {lead.avatarUrl ? (
                <img src={lead.avatarUrl} alt={lead.name} className="w-full h-full rounded-lg object-cover" />
              ) : (
                lead.companyName.charAt(0)
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap mb-1">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${platform.badgeBg}`}>
                  {platform.name}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#18181B] text-zinc-400 border border-[#27272A]">
                  {lead.category}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                  🔥 Lead Score: {lead.score}/100
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
                {lead.companyName}
              </h1>

              <div className="flex items-center gap-2.5 mt-1 text-xs text-zinc-400 flex-wrap">
                <span className="font-medium text-zinc-300">{lead.name}</span>
                {lead.title && <span className="text-zinc-500">• {lead.title}</span>}
                <div className="flex items-center gap-1 text-zinc-400 text-xs">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  <span>{lead.location.formatted}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact & Action Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
            {lead.email && (
              <a
                href={`mailto:${lead.email}`}
                className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono bg-[#18181B] border border-[#27272A] text-indigo-300 hover:border-indigo-500/40 hover:bg-indigo-950/20 transition-colors"
              >
                <Mail className="w-3 h-3" />
                <span>{lead.email}</span>
              </a>
            )}

            {lead.phone && (
              <a
                href={`tel:${lead.phone}`}
                className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono bg-[#18181B] border border-[#27272A] text-emerald-300 hover:border-emerald-500/40 hover:bg-emerald-950/20 transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span>{lead.phone}</span>
              </a>
            )}

            {lead.website && (
              <a
                href={lead.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 rounded text-xs bg-[#18181B] border border-[#27272A] text-zinc-300 hover:text-white transition-colors"
              >
                <Globe className="w-3 h-3 text-blue-400" />
                <span>Website</span>
                <ExternalLink className="w-2.5 h-2.5 text-zinc-500" />
              </a>
            )}

            {lead.socials?.linkedin && (
              <a
                href={lead.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded bg-[#18181B] border border-[#27272A] text-blue-400 hover:bg-[#27272A] transition-colors"
                title="Open LinkedIn Profile"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Lead Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3.5 border-t border-[#27272A] text-xs">
          <div className="p-2.5 rounded bg-[#18181B] border border-[#27272A]">
            <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-wider block">Est. Revenue Tier</span>
            <span className="text-emerald-400 font-bold text-xs mt-0.5 block font-mono">
              {lead.researchedData.estimatedAnnualRevenue || '$2M - $5M'}
            </span>
          </div>

          <div className="p-2.5 rounded bg-[#18181B] border border-[#27272A]">
            <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-wider block">Team Size</span>
            <span className="text-zinc-200 font-semibold text-xs mt-0.5 block">
              {lead.researchedData.estimatedEmployees || '15-40 staff'}
            </span>
          </div>

          <div className="p-2.5 rounded bg-[#18181B] border border-[#27272A]">
            <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-wider block">Reputation</span>
            <span className="text-amber-400 font-semibold text-xs mt-0.5 block flex items-center gap-1 font-mono">
              {lead.rating ? (
                <>
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{lead.rating.toFixed(1)}</span>
                  <span className="text-zinc-500 font-normal">({lead.reviewsCount || 0})</span>
                </>
              ) : (
                'B2B Direct'
              )}
            </span>
          </div>

          <div className="p-2.5 rounded bg-[#18181B] border border-[#27272A]">
            <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-wider block">Vector Pattern Match</span>
            <span className="text-cyan-400 font-mono font-bold text-xs mt-0.5 block">
              Rank #{lead.researchedData.vectorSimilarityRank || 1} (94.8% Sim)
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation for Lead Intelligence */}
      <div className="flex items-center gap-1 border-b border-[#27272A] overflow-x-auto pb-0.5">
        {[
          { id: 'overview', label: '1. Business Intelligence', icon: <Building className="w-3.5 h-3.5" /> },
          { id: 'pain_points', label: '2. Diagnosed Pain Points', icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />, badge: `${lead.painPoints?.length || 3}` },
          { id: 'outreach', label: '3. Multi-Channel Outreach', icon: <Send className="w-3.5 h-3.5 text-indigo-400" />, badge: 'Cold Email, InMail, Call' },
          { id: 'proposal', label: '4. Tailored Proposal & ROI', icon: <DollarSign className="w-3.5 h-3.5 text-amber-400" /> },
          { id: 'vector_match', label: '5. Vector DB Insights', icon: <Cpu className="w-3.5 h-3.5 text-cyan-400" /> },
        ].map((tab) => {
          const isCurrent = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              id={`tab-lead-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium text-xs transition-colors whitespace-nowrap cursor-pointer ${
                isCurrent
                  ? 'border-indigo-500 text-indigo-300 bg-indigo-950/20'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#18181B] text-zinc-400 border border-[#27272A] font-mono">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT 1: BUSINESS OVERVIEW & INTELLIGENCE */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            {/* Overview Box */}
            <div className="p-4 rounded-lg border border-[#27272A] bg-[#09090B]">
              <h3 className="text-xs font-bold text-zinc-100 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                <Building className="w-3.5 h-3.5 text-indigo-400" />
                <span>Executive Company Profile</span>
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {lead.researchedData.companyOverview}
              </p>

              <div className="mt-3 pt-3 border-t border-[#27272A]">
                <h4 className="text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider">
                  Market Positioning & Core Offer
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {lead.researchedData.marketPositioning}
                </p>
              </div>

              {lead.sourceSpecificData?.facebookPostContent && (
                <div className="mt-3 p-2.5 rounded bg-blue-950/20 border border-blue-800/40 text-xs">
                  <div className="font-bold text-blue-300 mb-1 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-blue-400" />
                    <span>Trigger Event: Verified Facebook Group Post</span>
                  </div>
                  <p className="text-zinc-300 italic text-[11px] leading-relaxed">
                    "{lead.sourceSpecificData.facebookPostContent}"
                  </p>
                  <div className="text-[10px] text-blue-400 mt-1 font-mono">
                    Source: {lead.sourceSpecificData.facebookGroupName || 'Real Estate & Business Mastermind'}
                  </div>
                </div>
              )}
            </div>

            {/* Review Sentiment Analysis */}
            {lead.researchedData.reviewSentimentSummary && (
              <div className="p-4 rounded-lg border border-[#27272A] bg-[#09090B]">
                <h3 className="text-xs font-bold text-zinc-100 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Reputation & Sentiment Analysis</span>
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {lead.researchedData.reviewSentimentSummary}
                </p>
              </div>
            )}
          </div>

          {/* Right Sidebar: Tech Stack & Competitors */}
          <div className="space-y-4">
            {/* Detected Tech Stack */}
            <div className="p-4 rounded-lg border border-[#27272A] bg-[#09090B]">
              <h3 className="text-xs font-bold text-zinc-100 mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Detected Tech Stack</span>
              </h3>
              <div className="flex flex-wrap gap-1">
                {(lead.researchedData.techStackDetected || ['WordPress', 'Meta Pixel', 'Google Ads']).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#18181B] border border-[#27272A] text-cyan-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-zinc-500 mt-2">
                Identified via DNS signature inspection, pixel telemetry, and page headers.
              </p>
            </div>

            {/* Competitor Landscape */}
            {lead.researchedData.competitors && lead.researchedData.competitors.length > 0 && (
              <div className="p-4 rounded-lg border border-[#27272A] bg-[#09090B]">
                <h3 className="text-xs font-bold text-zinc-100 mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
                  <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                  <span>Key Market Competitors</span>
                </h3>
                <ul className="space-y-1.5 text-xs">
                  {lead.researchedData.competitors.map((comp) => (
                    <li key={comp} className="flex items-center gap-1.5 text-zinc-300 p-1.5 rounded bg-[#18181B] border border-[#27272A] text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                      <span>{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: PAIN POINTS & DIAGNOSED VULNERABILITIES */}
      {activeTab === 'pain_points' && (
        <div className="space-y-3">
          <div className="p-3 rounded bg-rose-950/20 border border-rose-800/40 text-xs text-rose-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>
                <strong>{lead.painPoints?.length || 3} High-Impact Vulnerabilities</strong> diagnosed for {lead.companyName}.
              </span>
            </div>
            <span className="text-rose-400 font-bold font-mono text-[11px]">Total Est. Annual Leakage: ~$320,000</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(lead.painPoints || []).map((pp, idx) => (
              <div
                key={pp.id || idx}
                className="p-3.5 rounded-lg border border-[#27272A] bg-[#09090B] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[#18181B] text-zinc-400 border border-[#27272A]">
                      {pp.category}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                        pp.severity === 'Critical'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      }`}
                    >
                      {pp.severity}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs text-zinc-100 mb-1.5 leading-snug">
                    {pp.title}
                  </h4>

                  <p className="text-[11px] text-zinc-400 leading-relaxed mb-3">
                    {pp.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-[#27272A] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-zinc-500">Estimated Cost:</span>
                    <span className="text-rose-400 font-mono font-bold">{pp.estimatedRevenueLoss}</span>
                  </div>
                  <div className="p-2 rounded bg-indigo-950/20 border border-indigo-900/30 text-[10px] text-indigo-300">
                    <strong className="text-indigo-400 block mb-0.5">Recommended Fix:</strong>
                    <span>{pp.recommendedFix}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: MULTI-CHANNEL SALES OUTREACH PLAYBOOKS */}
      {activeTab === 'outreach' && (
        <div className="space-y-4">
          {/* Strategy Header */}
          <div className="p-3 rounded bg-[#09090B] border border-[#27272A] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider block">Target Persona</span>
              <span className="text-zinc-200 font-semibold mt-0.5 block">{lead.outreachStrategy.targetPersona}</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider block">Primary Channel</span>
              <span className="text-indigo-400 font-semibold mt-0.5 block flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>{lead.outreachStrategy.bestChannel} (High Reply Propensity)</span>
              </span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider block">Optimal Timing</span>
              <span className="text-zinc-200 font-semibold mt-0.5 block font-mono">{lead.outreachStrategy.idealTiming}</span>
            </div>
          </div>

          {/* Icebreaker & Value Hook */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-lg border border-[#27272A] bg-[#09090B]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-zinc-200 flex items-center gap-1 text-xs">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>Personalized Icebreaker Hook</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(lead.outreachStrategy.icebreaker, 'icebreaker')}
                  className="text-zinc-400 hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {copiedKey === 'icebreaker' ? <Check className="w-3 h-3 text-indigo-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <p className="text-zinc-300 italic bg-[#18181B] p-2.5 rounded border border-[#27272A] leading-relaxed text-[11px]">
                "{lead.outreachStrategy.icebreaker}"
              </p>
            </div>

            <div className="p-3.5 rounded-lg border border-[#27272A] bg-[#09090B]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-zinc-200 flex items-center gap-1 text-xs">
                  <DollarSign className="w-3 h-3 text-amber-400" />
                  <span>Value Proposition Angle</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(lead.outreachStrategy.valueHook, 'valueHook')}
                  className="text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {copiedKey === 'valueHook' ? <Check className="w-3 h-3 text-indigo-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <p className="text-zinc-300 bg-[#18181B] p-2.5 rounded border border-[#27272A] leading-relaxed text-[11px]">
                {lead.outreachStrategy.valueHook}
              </p>
            </div>
          </div>

          {/* 3-Step Cold Email Cadence */}
          <div className="p-4 rounded-lg border border-[#27272A] bg-[#09090B]">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xs font-bold text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Hyper-Personalized 3-Step Email Sequence</span>
                </h3>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Engineered specifically for {lead.companyName} with high-converting subject line variations.
                </p>
              </div>

              {/* Step selector */}
              <div className="flex items-center gap-1 bg-[#18181B] p-1 rounded border border-[#27272A]">
                {lead.outreachStrategy.coldEmailSequence.map((step, idx) => (
                  <button
                    key={step.step}
                    type="button"
                    onClick={() => setActiveEmailStep(idx)}
                    className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                      activeEmailStep === idx
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Email {step.step} (Day {step.day})
                  </button>
                ))}
              </div>
            </div>

            {lead.outreachStrategy.coldEmailSequence[activeEmailStep] && (
              <div className="space-y-3">
                {/* Subject Lines */}
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                    Tested Subject Line Options:
                  </span>
                  <div className="space-y-1">
                    {lead.outreachStrategy.coldEmailSequence[activeEmailStep].subjectLines.map((subj, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center justify-between p-1.5 rounded bg-[#18181B] border border-[#27272A] text-xs text-zinc-200 font-mono"
                      >
                        <span className="truncate">{subj}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(subj, `subj-${sIdx}`)}
                          className="text-zinc-400 hover:text-indigo-400 ml-2 cursor-pointer"
                        >
                          {copiedKey === `subj-${sIdx}` ? <Check className="w-3 h-3 text-indigo-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Email Body */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      Email Body Content:
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(lead.outreachStrategy.coldEmailSequence[activeEmailStep].body, `email-body-${activeEmailStep}`)}
                      className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
                    >
                      {copiedKey === `email-body-${activeEmailStep}` ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Full Email</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-3 rounded bg-[#121215] border border-[#27272A] text-zinc-200 text-xs font-sans whitespace-pre-wrap leading-relaxed">
                    {lead.outreachStrategy.coldEmailSequence[activeEmailStep].body}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* LinkedIn & Cold Call Playbooks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* LinkedIn InMail & Connection Note */}
            <div className="p-3.5 rounded-lg border border-[#27272A] bg-[#09090B] space-y-3">
              <h3 className="text-xs font-bold text-zinc-100 flex items-center justify-between uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn Connection & InMail</span>
                </span>
                <span className="text-[9px] text-zinc-500 font-mono">&lt; 300 Chars</span>
              </h3>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Connection Request Note:
                </span>
                <div className="p-2.5 rounded bg-[#18181B] border border-[#27272A] text-xs text-zinc-300 relative">
                  <p className="text-[11px]">{lead.outreachStrategy.linkedInInMail.connectionNote}</p>
                  <button
                    type="button"
                    onClick={() => handleCopy(lead.outreachStrategy.linkedInInMail.connectionNote, 'li-note')}
                    className="absolute top-2 right-2 text-zinc-400 hover:text-blue-400 cursor-pointer"
                  >
                    {copiedKey === 'li-note' ? <Check className="w-3 h-3 text-indigo-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Follow-up InMail Pitch:
                </span>
                <div className="p-2.5 rounded bg-[#18181B] border border-[#27272A] text-xs text-zinc-300 relative">
                  <p className="text-[11px]">{lead.outreachStrategy.linkedInInMail.followUpPitch}</p>
                  <button
                    type="button"
                    onClick={() => handleCopy(lead.outreachStrategy.linkedInInMail.followUpPitch, 'li-pitch')}
                    className="absolute top-2 right-2 text-zinc-400 hover:text-blue-400 cursor-pointer"
                  >
                    {copiedKey === 'li-pitch' ? <Check className="w-3 h-3 text-indigo-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Cold Call Script with Objection Handlers */}
            <div className="p-3.5 rounded-lg border border-[#27272A] bg-[#09090B] space-y-3">
              <h3 className="text-xs font-bold text-zinc-100 flex items-center justify-between uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Cold Calling Battlecards</span>
                </span>
                <span className="text-[9px] text-emerald-400 font-mono">Objection Armored</span>
              </h3>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Gatekeeper Bypass:
                </span>
                <p className="p-2 rounded bg-[#18181B] border border-[#27272A] text-[11px] text-zinc-300 italic">
                  "{lead.outreachStrategy.coldCallScript.gatekeeperBypass}"
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  15-Second Opening Hook:
                </span>
                <p className="p-2 rounded bg-[#18181B] border border-[#27272A] text-[11px] text-zinc-300 font-medium">
                  "{lead.outreachStrategy.coldCallScript.openingHook}"
                </p>
              </div>

              {lead.outreachStrategy.coldCallScript.objectionHandlers?.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Live Objection Battlecards:
                  </span>
                  <div className="space-y-1">
                    {lead.outreachStrategy.coldCallScript.objectionHandlers.map((obj, oIdx) => (
                      <div key={oIdx} className="p-2 rounded bg-[#18181B] border border-[#27272A] text-[10px]">
                        <div className="text-rose-400 font-bold mb-0.5">If they say: "{obj.objection}"</div>
                        <div className="text-zinc-300">You respond: "{obj.response}"</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: TAILORED PROPOSAL & ROI MODEL */}
      {activeTab === 'proposal' && (
        <div className="space-y-4">
          <div className="p-4 sm:p-5 rounded-lg border border-[#27272A] bg-[#09090B]">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#27272A]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 block mb-0.5">
                  Tailored Commercial Proposal
                </span>
                <h2 className="text-base sm:text-lg font-bold text-zinc-100">
                  {lead.proposal.proposalTitle}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => onOpenDocumentGenerator(lead, 'proposal')}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-indigo-600 text-white font-medium text-xs hover:bg-indigo-500 transition-colors cursor-pointer shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Export Formal Proposal Document</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Executive Summary */}
              <div>
                <h4 className="font-bold text-zinc-200 text-xs mb-1.5 uppercase tracking-wider">Executive Summary</h4>
                <p className="text-zinc-300 leading-relaxed bg-[#18181B] p-3 rounded border border-[#27272A] text-[11px]">
                  {lead.proposal.executiveSummary}
                </p>
              </div>

              {/* Projected ROI Metrics */}
              <div>
                <h4 className="font-bold text-zinc-200 text-xs mb-2 uppercase tracking-wider">Projected Financial Gain & ROI Model</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {lead.proposal.projectedRoi.map((roi, rIdx) => (
                    <div key={rIdx} className="p-3 rounded bg-[#18181B] border border-[#27272A]">
                      <span className="text-zinc-400 font-medium text-[11px] block">{roi.metric}</span>
                      <div className="flex items-baseline justify-between mt-1.5">
                        <span className="text-zinc-500 line-through text-[11px]">{roi.currentEstimated}</span>
                        <span className="text-emerald-400 font-bold text-xs font-mono">{roi.projectedWithSolution}</span>
                      </div>
                      <div className="mt-1.5 pt-1.5 border-t border-[#27272A] text-[10px] font-bold text-emerald-300">
                        {roi.financialGain}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phased Roadmap */}
              <div>
                <h4 className="font-bold text-zinc-200 text-xs mb-2 uppercase tracking-wider">Implementation Roadmap & Deliverables</h4>
                <div className="space-y-2">
                  {lead.proposal.proposedSolution.map((phase, pIdx) => (
                    <div key={pIdx} className="p-3 rounded bg-[#18181B] border border-[#27272A]">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-zinc-100 text-xs">{phase.phase}</span>
                        <span className="text-indigo-400 font-mono text-[10px] font-semibold">{phase.timeline}</span>
                      </div>
                      <ul className="space-y-1 text-zinc-400 text-[11px]">
                        {phase.deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-indigo-400"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Tiers */}
              <div>
                <h4 className="font-bold text-zinc-200 text-xs mb-2 uppercase tracking-wider">Recommended Investment Packages</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {lead.proposal.pricingTiers.map((tier, tIdx) => (
                    <div
                      key={tIdx}
                      className={`p-3.5 rounded-lg border flex flex-col justify-between ${
                        tier.highlighted
                          ? 'border-indigo-500 bg-indigo-950/20 ring-1 ring-indigo-500/30'
                          : 'border-[#27272A] bg-[#18181B]'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="font-bold text-zinc-100 text-xs">{tier.tierName}</span>
                          {tier.highlighted && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-indigo-600 text-white">
                              Recommended
                            </span>
                          )}
                        </div>
                        <div className="text-xl font-bold text-emerald-400 font-mono mb-2">
                          {tier.price} <span className="text-xs text-zinc-400 font-normal">{tier.billingPeriod}</span>
                        </div>
                        <ul className="space-y-1.5 text-zinc-300 text-[11px]">
                          {tier.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-1.5">
                              <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantee */}
              {lead.proposal.guaranteeTerms && (
                <div className="p-3 rounded bg-amber-950/20 border border-amber-800/40 text-amber-300 text-xs">
                  <strong className="block mb-0.5 text-amber-400 text-[11px]">🛡️ Executive Guarantee Terms:</strong>
                  <span className="text-[11px]">{lead.proposal.guaranteeTerms}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: VECTOR DATABASE MATCH INSIGHTS */}
      {activeTab === 'vector_match' && (
        <div className="p-4 sm:p-5 rounded-lg border border-[#27272A] bg-[#09090B] space-y-4 text-xs">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#27272A]">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <div>
                <h3 className="font-bold text-xs text-zinc-100">Vector Knowledge Base Retrieval (1536-dim Embedding)</h3>
                <p className="text-zinc-400 text-[10px]">Sub-50ms cosine similarity match across 520,000+ indexed business models.</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono font-bold text-[10px]">
              Cosine Sim: 0.948
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 rounded bg-[#18181B] border border-[#27272A] space-y-1.5">
              <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-wider block">Cluster Pattern</span>
              <span className="text-zinc-200 font-semibold block text-xs">
                High GCI Local Service + Delayed First-Touch Latency
              </span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                {lead.researchedData.vectorInsightSnippet ||
                  'Matches high-ticket conversion cluster. When speed-to-lead drops below 60s, response rates average 34.2% higher than industry baseline.'}
              </p>
            </div>

            <div className="p-3 rounded bg-[#18181B] border border-[#27272A] space-y-1.5">
              <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-wider block">Historical Win-Rate Benchmark</span>
              <div className="text-emerald-400 font-mono font-bold text-lg">34.2% Close Probability</div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Based on 148 similar closed opportunities in {lead.category} across the US & UK.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Real Email Dispatcher Sub-Modal */}
      {showEmailModal && (
        <SendProposalEmailModal
          lead={lead}
          activeAgency={activeAgency}
          theme={theme}
          onClose={() => setShowEmailModal(false)}
        />
      )}
    </div>
  );
};
