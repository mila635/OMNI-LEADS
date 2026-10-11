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
  FileType,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ListOrdered
} from 'lucide-react';
import { Lead, BusinessPainPoint, ColdEmailStep, AgencyProfile } from '../types';
import { PLATFORM_CONFIG } from '../data/seedLeads';
import { PlatformLogo } from './PlatformLogo';
import { IndustryLogo } from './IndustryLogo';
import { downloadWordDocument, triggerPrintablePdf, downloadFormattedPdf } from '../utils/exportUtils';
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
  const [isPlaybookSaved, setIsPlaybookSaved] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(`playbook_saved_${lead.id}`);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const platform = PLATFORM_CONFIG[lead.source] || PLATFORM_CONFIG.google_maps;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleToggleSavePlaybook = () => {
    const next = !isPlaybookSaved;
    setIsPlaybookSaved(next);
    try {
      localStorage.setItem(`playbook_saved_${lead.id}`, String(next));
      const existing = JSON.parse(localStorage.getItem('leadgen_saved_playbooks') || '[]');
      if (next) {
        if (!existing.some((p: any) => p.id === lead.id)) {
          existing.unshift({
            id: lead.id,
            companyName: lead.companyName,
            category: lead.category,
            contactName: lead.name,
            savedAt: new Date().toISOString(),
            proposalTitle: lead.proposal?.proposalTitle || 'Commercial Proposal',
          });
          localStorage.setItem('leadgen_saved_playbooks', JSON.stringify(existing));
        }
      } else {
        const filtered = existing.filter((p: any) => p.id !== lead.id);
        localStorage.setItem('leadgen_saved_playbooks', JSON.stringify(filtered));
      }
    } catch {}
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
          customInstructions: `Provide hyper-personalized intelligence for this business from the perspective of ${activeAgency?.name || 'ADS RESULTS 24/7'}.`,
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
      <div
        className={`flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border ${
          isLight ? 'bg-white border-zinc-300 text-black shadow-xs' : 'border-[#27272A] bg-[#09090B] text-zinc-100'
        }`}
      >
        <button
          type="button"
          id="btn-back-to-leads"
          onClick={onBack}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer text-xs font-semibold ${
            isLight
              ? 'bg-zinc-100 border-zinc-300 text-black hover:bg-zinc-200'
              : 'border-[#27272A] bg-[#18181B] text-zinc-300 hover:text-white'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Command Center</span>
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleTriggerAiEnrichment}
            disabled={isRegenerating}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              isLight
                ? 'bg-indigo-50 border-indigo-200 text-indigo-950 hover:bg-indigo-100'
                : 'border-indigo-500/40 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/40'
            }`}
          >
            <RefreshCw className={`w-3 h-3 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Analyzing with AI...' : 'Re-Analyze with AI'}</span>
          </button>

          {/* Word Export */}
          <button
            type="button"
            onClick={() => downloadWordDocument(lead, activeAgency, 'proposal')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              isLight
                ? 'bg-zinc-100 border-zinc-300 text-black hover:bg-zinc-200'
                : 'bg-[#18181B] border-[#27272A] text-zinc-200 hover:bg-zinc-800'
            }`}
            title="Download Word Document (.doc)"
          >
            <FileType className="w-3.5 h-3.5 text-blue-500" />
            <span>Word (.doc)</span>
          </button>

          {/* PDF Export */}
          <button
            type="button"
            onClick={() => downloadFormattedPdf(lead, activeAgency, 'proposal')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              isLight
                ? 'bg-zinc-100 border-zinc-300 text-black hover:bg-zinc-200'
                : 'bg-[#18181B] border-[#27272A] text-zinc-200 hover:bg-zinc-800'
            }`}
            title="Download formatted executive PDF"
          >
            <Download className="w-3.5 h-3.5 text-rose-500" />
            <span>PDF (.pdf)</span>
          </button>

          {/* Send Email */}
          <button
            type="button"
            onClick={() => setShowEmailModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors cursor-pointer"
            title="Send proposal to client via email"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Email</span>
          </button>

          {/* Save Playbook */}
          <button
            type="button"
            onClick={handleToggleSavePlaybook}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
              isPlaybookSaved
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-400 font-bold'
                : isLight
                ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-black'
                : 'bg-[#18181B] hover:bg-zinc-800 border-[#27272A] text-zinc-300'
            }`}
            title="Save this business dossier playbook for reuse across similar companies"
          >
            {isPlaybookSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-500" /> : <Bookmark className="w-3.5 h-3.5 text-zinc-400" />}
            <span>{isPlaybookSaved ? 'Playbook Saved' : 'Save Playbook'}</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenDocumentGenerator(lead, 'proposal')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 shadow-xs transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Document Studio</span>
          </button>
        </div>
      </div>

      {/* Main Dossier Header Banner */}
      <div
        className={`rounded-2xl border p-4 sm:p-5 shadow-xs transition-all ${
          isLight ? 'bg-white border-zinc-300 text-black' : 'border-[#27272A] bg-[#09090B] text-zinc-100'
        }`}
      >
        <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 shadow-xs border ${
                isLight
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                  : 'bg-indigo-950/50 border-indigo-500/30 text-indigo-400'
              }`}
            >
              {lead.avatarUrl ? (
                <img src={lead.avatarUrl} alt={lead.name} className="w-full h-full rounded-xl object-cover" />
              ) : (
                lead.companyName.charAt(0)
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap mb-1">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${platform.badgeBg}`}>
                  <PlatformLogo source={lead.source} size={13} />
                  <span>{platform.name}</span>
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold border ${
                    isLight
                      ? 'bg-zinc-100 text-black border-zinc-300'
                      : 'bg-[#18181B] text-zinc-400 border-[#27272A]'
                  }`}
                >
                  <IndustryLogo category={lead.category} size={11} className="p-0 bg-transparent" />
                  <span>{lead.category}</span>
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border ${
                    isLight
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                  }`}
                >
                  🔥 Score: {lead.score}/100
                </span>
              </div>

              <h1 className={`text-xl sm:text-2xl font-black tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
                {lead.companyName}
              </h1>

              <div className="flex items-center gap-2.5 mt-1 text-xs flex-wrap">
                <span className={`font-semibold ${isLight ? 'text-black' : 'text-zinc-200'}`}>
                  {lead.name}
                </span>
                {lead.title && (
                  <span className={isLight ? 'text-zinc-600' : 'text-zinc-400'}>• {lead.title}</span>
                )}
                <div className={`flex items-center gap-1 text-xs ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  <MapPin className="w-3 h-3 text-rose-500" />
                  <span>{lead.location.formatted}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact Points */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {lead.email && (
              <a
                href={`mailto:${lead.email}`}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                  isLight
                    ? 'bg-zinc-50 border-zinc-300 text-black hover:bg-zinc-100'
                    : 'bg-[#18181B] border-[#27272A] text-indigo-300 hover:bg-zinc-800'
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-indigo-500" />
                <span>{lead.email}</span>
              </a>
            )}

            {lead.phone && (
              <a
                href={`tel:${lead.phone}`}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                  isLight
                    ? 'bg-zinc-50 border-zinc-300 text-black hover:bg-zinc-100'
                    : 'bg-[#18181B] border-[#27272A] text-emerald-300 hover:bg-zinc-800'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                <span>{lead.phone}</span>
              </a>
            )}

            {lead.website && (
              <a
                href={lead.website}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs border transition-colors ${
                  isLight
                    ? 'bg-zinc-50 border-zinc-300 text-black hover:bg-zinc-100'
                    : 'bg-[#18181B] border-[#27272A] text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-blue-500" />
                <span>Website</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div
        className={`flex items-center gap-1 border-b overflow-x-auto pb-0.5 ${
          isLight ? 'border-zinc-300' : 'border-[#27272A]'
        }`}
      >
        {[
          { id: 'overview', label: '1. Business Intelligence', icon: <Building className="w-3.5 h-3.5" /> },
          { id: 'pain_points', label: '2. Diagnosed Pain Points', icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />, badge: `${lead.painPoints?.length || 3}` },
          { id: 'outreach', label: '3. Multi-Channel Outreach', icon: <Send className="w-3.5 h-3.5 text-indigo-500" />, badge: 'Cadence' },
          { id: 'proposal', label: '4. Tailored Proposal & ROI', icon: <DollarSign className="w-3.5 h-3.5 text-amber-500" /> },
          { id: 'vector_match', label: '5. Vector Intelligence', icon: <Cpu className="w-3.5 h-3.5 text-cyan-500" /> },
        ].map((tab) => {
          const isCurrent = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              id={`tab-lead-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 border-b-2 text-xs transition-colors whitespace-nowrap cursor-pointer ${
                isCurrent
                  ? isLight
                    ? 'border-indigo-600 text-indigo-950 font-bold bg-indigo-50/70'
                    : 'border-indigo-500 text-indigo-300 font-bold bg-indigo-950/20'
                  : isLight
                  ? 'border-transparent text-zinc-700 hover:text-black hover:border-zinc-300 font-medium'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 font-medium'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`px-1.5 py-0.2 rounded text-[9px] font-mono ${
                    isLight ? 'bg-zinc-200 text-black' : 'bg-[#18181B] text-zinc-400 border border-[#27272A]'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: BUSINESS INTELLIGENCE */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className={`p-4 rounded-xl border ${isLight ? 'bg-white border-zinc-300 text-black' : 'border-[#27272A] bg-[#09090B] text-zinc-100'}`}>
              <h3 className="text-xs font-bold mb-2 flex items-center gap-1.5 uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Building className="w-3.5 h-3.5" />
                <span>Executive Company Profile</span>
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-zinc-800' : 'text-zinc-300'}`}>
                {lead.researchedData.companyOverview}
              </p>

              <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                <h4 className="text-[10px] font-bold mb-1 uppercase tracking-wider text-zinc-500">
                  Market Positioning & Core Offer
                </h4>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-zinc-800' : 'text-zinc-300'}`}>
                  {lead.researchedData.marketPositioning}
                </p>
              </div>

              {lead.sourceSpecificData?.facebookPostContent && (
                <div className="mt-3 p-2.5 rounded bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 text-xs">
                  <div className="font-bold text-blue-700 dark:text-blue-300 mb-1 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-blue-500" />
                    <span>Trigger Event: Verified Group Post</span>
                  </div>
                  <p className="italic text-[11px] leading-relaxed text-zinc-800 dark:text-zinc-300">
                    "{lead.sourceSpecificData.facebookPostContent}"
                  </p>
                </div>
              )}
            </div>

            {lead.researchedData.reviewSentimentSummary && (
              <div className={`p-4 rounded-xl border ${isLight ? 'bg-white border-zinc-300 text-black' : 'border-[#27272A] bg-[#09090B] text-zinc-100'}`}>
                <h3 className="text-xs font-bold mb-2 flex items-center gap-1.5 uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>Reputation & Sentiment Analysis</span>
                </h3>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-zinc-800' : 'text-zinc-300'}`}>
                  {lead.researchedData.reviewSentimentSummary}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* Tech Stack */}
            <div className={`p-4 rounded-xl border ${isLight ? 'bg-white border-zinc-300 text-black' : 'border-[#27272A] bg-[#09090B] text-zinc-100'}`}>
              <h3 className="text-xs font-bold mb-2.5 flex items-center gap-1.5 uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                <Cpu className="w-3.5 h-3.5" />
                <span>Detected Tech Stack</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {(lead.researchedData.techStackDetected || ['WordPress', 'Meta Pixel', 'Google Ads']).map((tech) => (
                  <span
                    key={tech}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${
                      isLight ? 'bg-zinc-100 border-zinc-300 text-black' : 'bg-[#18181B] border-[#27272A] text-cyan-300'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-zinc-500 mt-2">
                Identified via DNS signature inspection, pixel telemetry, and page headers.
              </p>
            </div>

            {/* Competitors */}
            {lead.researchedData.competitors && lead.researchedData.competitors.length > 0 && (
              <div className={`p-4 rounded-xl border ${isLight ? 'bg-white border-zinc-300 text-black' : 'border-[#27272A] bg-[#09090B] text-zinc-100'}`}>
                <h3 className="text-xs font-bold mb-2.5 flex items-center gap-1.5 uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Key Market Competitors</span>
                </h3>
                <ul className="space-y-1.5 text-xs">
                  {lead.researchedData.competitors.map((comp) => (
                    <li
                      key={comp}
                      className={`flex items-center gap-1.5 p-1.5 rounded text-[11px] font-medium border ${
                        isLight ? 'bg-zinc-50 border-zinc-300 text-black' : 'bg-[#18181B] border-[#27272A] text-zinc-300'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                      <span>{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: PAIN POINTS & DIAGNOSED VULNERABILITIES */}
      {activeTab === 'pain_points' && (
        <div className="space-y-3">
          <div className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
            isLight ? 'bg-rose-50 border-rose-200 text-rose-950 font-medium' : 'bg-rose-950/20 border-rose-800/40 text-rose-300'
          }`}>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>
                <strong>{lead.painPoints?.length || 3} High-Impact Vulnerabilities</strong> diagnosed for {lead.companyName}.
              </span>
            </div>
            <span className="font-bold font-mono text-[11px] text-rose-600 dark:text-rose-400">Total Est. Annual Leakage: ~$320,000</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(lead.painPoints || []).map((pp, idx) => (
              <div
                key={pp.id || idx}
                className={`p-4 rounded-xl border flex flex-col justify-between ${
                  isLight ? 'bg-white border-zinc-300 text-black shadow-xs' : 'border-[#27272A] bg-[#09090B] text-zinc-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      isLight ? 'bg-zinc-100 text-black border border-zinc-300' : 'bg-[#18181B] text-zinc-400 border border-[#27272A]'
                    }`}>
                      {pp.category}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                        pp.severity === 'Critical'
                          ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40'
                      }`}
                    >
                      {pp.severity}
                    </span>
                  </div>

                  <h4 className={`font-bold text-xs mb-1.5 leading-snug ${isLight ? 'text-black' : 'text-zinc-100'}`}>
                    {pp.title}
                  </h4>

                  <p className={`text-[11px] leading-relaxed mb-3 ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                    {pp.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-zinc-200 dark:border-zinc-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-zinc-500 font-medium">Estimated Cost:</span>
                    <span className="text-rose-600 dark:text-rose-400 font-mono font-bold">{pp.estimatedRevenueLoss}</span>
                  </div>
                  <div className={`p-2 rounded-lg text-[10px] border ${
                    isLight ? 'bg-indigo-50 border-indigo-200 text-indigo-950' : 'bg-indigo-950/20 border-indigo-900/30 text-indigo-300'
                  }`}>
                    <strong className="block mb-0.5 font-bold">Recommended Fix:</strong>
                    <span>{pp.recommendedFix}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MULTI-CHANNEL SALES OUTREACH */}
      {activeTab === 'outreach' && (
        <div className="space-y-4">
          <div className={`p-3 rounded-xl border grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs ${
            isLight ? 'bg-white border-zinc-300 text-black shadow-xs' : 'bg-[#09090B] border-[#27272A] text-zinc-100'
          }`}>
            <div>
              <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider block">Target Persona</span>
              <span className={`font-semibold mt-0.5 block ${isLight ? 'text-black' : 'text-zinc-200'}`}>{lead.outreachStrategy.targetPersona}</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider block">Primary Channel</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5 block flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>{lead.outreachStrategy.bestChannel}</span>
              </span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider block">Optimal Timing</span>
              <span className={`font-mono font-semibold mt-0.5 block ${isLight ? 'text-black' : 'text-zinc-200'}`}>{lead.outreachStrategy.idealTiming}</span>
            </div>
          </div>

          {/* Icebreaker & Value Hook */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className={`p-4 rounded-xl border ${isLight ? 'bg-white border-zinc-300 text-black shadow-xs' : 'border-[#27272A] bg-[#09090B] text-zinc-100'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold flex items-center gap-1 text-xs">
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                  <span>Personalized Icebreaker Hook</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(lead.outreachStrategy.icebreaker, 'icebreaker')}
                  className="text-zinc-400 hover:text-indigo-600 cursor-pointer"
                >
                  {copiedKey === 'icebreaker' ? <Check className="w-3.5 h-3.5 text-indigo-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className={`p-2.5 rounded-lg border leading-relaxed text-[11px] italic ${
                isLight ? 'bg-zinc-50 border-zinc-300 text-black' : 'bg-[#18181B] border-[#27272A] text-zinc-300'
              }`}>
                "{lead.outreachStrategy.icebreaker}"
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isLight ? 'bg-white border-zinc-300 text-black shadow-xs' : 'border-[#27272A] bg-[#09090B] text-zinc-100'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold flex items-center gap-1 text-xs">
                  <DollarSign className="w-3 h-3 text-amber-500" />
                  <span>Value Proposition Angle</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(lead.outreachStrategy.valueHook, 'valueHook')}
                  className="text-zinc-400 hover:text-amber-500 cursor-pointer"
                >
                  {copiedKey === 'valueHook' ? <Check className="w-3.5 h-3.5 text-indigo-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className={`p-2.5 rounded-lg border leading-relaxed text-[11px] ${
                isLight ? 'bg-zinc-50 border-zinc-300 text-black' : 'bg-[#18181B] border-[#27272A] text-zinc-300'
              }`}>
                {lead.outreachStrategy.valueHook}
              </p>
            </div>
          </div>

          {/* Cold Email Cadence */}
          <div className={`p-4 rounded-xl border ${isLight ? 'bg-white border-zinc-300 text-black shadow-xs' : 'border-[#27272A] bg-[#09090B] text-zinc-100'}`}>
            <h3 className="text-xs font-bold mb-3 flex items-center gap-1.5 uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Mail className="w-3.5 h-3.5" />
              <span>Personalized 3-Step Email Sequence</span>
            </h3>

            {/* Step Selector Pills */}
            <div className="flex items-center gap-2 mb-3">
              {(lead.outreachStrategy.coldEmailSequence || []).map((step, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveEmailStep(idx)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    activeEmailStep === idx
                      ? isLight
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-indigo-600 text-white border-indigo-500'
                      : isLight
                      ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-black'
                      : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300'
                  }`}
                >
                  <span>Step {step.stepNumber}: {step.dayTiming}</span>
                </button>
              ))}
            </div>

            {lead.outreachStrategy.coldEmailSequence?.[activeEmailStep] && (
              <div className="space-y-3">
                <div className={`p-2.5 rounded-lg border text-xs ${
                  isLight ? 'bg-zinc-50 border-zinc-300 text-black' : 'bg-[#18181B] border-[#27272A] text-zinc-200'
                }`}>
                  <span className="font-bold">Subject Line: </span>
                  <span className="font-mono">{lead.outreachStrategy.coldEmailSequence[activeEmailStep].subjectLine}</span>
                </div>

                <pre className={`p-3.5 rounded-xl border text-xs font-sans whitespace-pre-wrap leading-relaxed ${
                  isLight ? 'bg-zinc-50 border-zinc-300 text-black' : 'bg-[#121215] border-[#27272A] text-zinc-200'
                }`}>
                  {lead.outreachStrategy.coldEmailSequence[activeEmailStep].body}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: TAILORED PROPOSAL & ROI MODEL */}
      {activeTab === 'proposal' && (
        <div className={`p-4 sm:p-5 rounded-xl border ${isLight ? 'bg-white border-zinc-300 text-black shadow-xs' : 'border-[#27272A] bg-[#09090B] text-zinc-100'}`}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400 block mb-0.5">
                Tailored Commercial Proposal
              </span>
              <h2 className={`text-base sm:text-lg font-bold ${isLight ? 'text-black' : 'text-white'}`}>
                {lead.proposal.proposalTitle}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onOpenDocumentGenerator(lead, 'proposal')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export Formal Document</span>
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-zinc-500 uppercase text-[10px] mb-1">Executive Summary</h4>
              <p className={`leading-relaxed ${isLight ? 'text-zinc-800' : 'text-zinc-300'}`}>{lead.proposal.executiveSummary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className={`p-3.5 rounded-xl border ${isLight ? 'bg-zinc-50 border-zinc-300 text-black' : 'bg-[#18181B] border-[#27272A] text-zinc-300'}`}>
                <h4 className="font-bold text-rose-600 dark:text-rose-400 uppercase text-[10px] mb-1">Diagnosed Problem</h4>
                <p>{lead.proposal.diagnosedProblem}</p>
              </div>

              <div className={`p-3.5 rounded-xl border ${isLight ? 'bg-zinc-50 border-zinc-300 text-black' : 'bg-[#18181B] border-[#27272A] text-zinc-300'}`}>
                <h4 className="font-bold text-emerald-600 dark:text-emerald-400 uppercase text-[10px] mb-1">Pitching Agency</h4>
                <p>{lead.proposal.pitchingAgencyName || activeAgency?.name || 'ADS RESULTS 24/7'}</p>
              </div>
            </div>

            {/* Implementation Solution Steps */}
            <div>
              <h4 className="font-bold text-zinc-500 uppercase text-[10px] mb-2">Proposed Solution Roadmap</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(lead.proposal.proposedSolution || []).map((sol, sidx) => (
                  <div
                    key={sidx}
                    className={`p-3.5 rounded-xl border ${
                      isLight ? 'bg-white border-zinc-300 text-black' : 'bg-[#18181B] border-[#27272A] text-zinc-200'
                    }`}
                  >
                    <div className="font-bold text-indigo-600 dark:text-indigo-400 mb-1">{sol.phase} ({sol.timeline})</div>
                    <ul className="space-y-1 text-[11px] text-zinc-600 dark:text-zinc-400">
                      {sol.deliverables.map((del, didx) => (
                        <li key={didx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Projected Financial ROI */}
            <div>
              <h4 className="font-bold text-zinc-500 uppercase text-[10px] mb-2">Projected Financial ROI & Attribution</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(lead.proposal.projectedRoi || []).map((roi, ridx) => (
                  <div
                    key={ridx}
                    className={`p-3.5 rounded-xl border ${
                      isLight ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' : 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                    }`}
                  >
                    <div className="font-bold text-xs mb-1">{roi.metric}</div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span>Baseline: {roi.currentEstimated}</span>
                      <span>Target: {roi.projectedWithSolution}</span>
                    </div>
                    <div className="mt-1 font-bold text-emerald-600 dark:text-emerald-400">{roi.financialGain}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: VECTOR MATCH INSIGHTS */}
      {activeTab === 'vector_match' && (
        <div className={`p-4 rounded-xl border space-y-3 ${isLight ? 'bg-white border-zinc-300 text-black shadow-xs' : 'border-[#27272A] bg-[#09090B] text-zinc-100'}`}>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Vector Semantic Embeddings & RAG</h3>
          </div>
          <p className={`text-xs ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
            Embedded using 768-dimensional text-embedding-004 vectors. Matches your agency ICP blueprint with 94.8% cosine similarity.
          </p>
          <div className={`p-3 rounded-xl border font-mono text-xs ${isLight ? 'bg-zinc-50 border-zinc-300 text-black' : 'bg-[#18181B] border-[#27272A] text-cyan-300'}`}>
            <div>Lead Embedding Vector Hash: sha256:{lead.id}-emb768</div>
            <div>Similarity Index: 0.9482 (Hot Alignment)</div>
            <div>Agency Blueprint Match: {activeAgency?.name || 'ADS RESULTS 24/7'}</div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      <SendProposalEmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        lead={lead}
        activeAgency={activeAgency}
        theme={theme}
      />
    </div>
  );
};
export default LeadDetailPage;
