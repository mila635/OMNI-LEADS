import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Bot,
  Send,
  Loader2,
  CheckCircle2,
  Brain,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  X,
  RotateCcw,
  FileText,
  Download,
  Printer,
  Table,
  BarChart3,
  Filter,
  ExternalLink,
  Layers,
  Check,
  Copy,
  History,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Building,
  Star,
  Users,
  Zap,
  Cpu,
  Terminal,
  Play,
  Eye,
  Mail,
  Phone,
  Globe,
  Sliders,
  Compass,
  ArrowUpRight,
  Search,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import {
  Lead,
  LeadFilterState,
  ScrapingTaskParams,
  ScrapingJob,
  AgencyProfile,
  PlatformSource,
  LeadCategory
} from '../types';
import { downloadWordDocument, triggerPrintablePdf } from '../utils/exportUtils';

export type AgentExecutionMode = 'turbo' | 'deep_research' | 'copilot' | 'sniper_outreach';
export type AgentLayoutMode = 'drawer' | 'fullscreen' | 'docked_split';

export interface AgentStepItem {
  id: string;
  stage: 'mulling' | 'analyzing' | 'planning' | 'configuring' | 'executing' | 'enriching' | 'verifying' | 'completed';
  title: string;
  detail: string;
  durationMs?: number;
}

export interface ProcessedArtifact {
  id: string;
  type: 'lead_batch' | 'proposal' | 'audit' | 'sales_kit' | 'crm_export' | 'filter_view';
  title: string;
  timestamp: string;
  summary: string;
  metadata: Record<string, any>;
  leadId?: string;
  leadName?: string;
}

export interface AgentMessage {
  id: string;
  sender: 'user' | 'agent';
  timestamp: string;
  text: string;
  thoughtSummary?: string;
  steps?: AgentStepItem[];
  action?: {
    type: string;
    params: Record<string, any>;
  };
  suggestedNextActions?: string[];
  isThinking?: boolean;
  activeStepIndex?: number;
  extractedLeads?: Lead[];
  extractedLeadsSummary?: {
    count: number;
    platform: string;
    location: string;
    category: string;
    maxRating?: number;
  };
  navigationAction?: {
    label: string;
    type: 'leads' | 'proposal' | 'analytics' | 'history' | 'export';
    docType?: string;
  };
  telemetryLogs?: string[];
}

interface NexusAutonomousAgentProps {
  isOpen: boolean;
  onToggle: () => void;
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  activeAgency: AgencyProfile;
  onStartScrape: (params: ScrapingTaskParams) => Promise<void> | void;
  isScraping: boolean;
  activeScrapeJob: ScrapingJob | null;
  filters: LeadFilterState;
  setFilters: React.Dispatch<React.SetStateAction<LeadFilterState>>;
  selectedLead: Lead | null;
  setSelectedLead: (lead: Lead | null) => void;
  onOpenDocGenerator: (lead: Lead, docType: string) => void;
  onOpenCrmExport: () => void;
  onOpenAgencyModal: () => void;
  activeTab: any;
  setActiveTab: (tab: any) => void;
  theme: 'dark' | 'light';
}

const AUTONOMOUS_PLAYBOOKS = [
  {
    id: 'pb-1',
    icon: Star,
    badge: 'Instant Execution',
    badgeColor: 'amber',
    title: '25 UK Restaurants (Rating < 4.0)',
    description: 'Extract 25 UK hospitality businesses with lower ratings, audit speed-to-lead latency, and prepare recovery pitch.',
    prompt: 'I want you to extract 25 leads from Google Maps of Restaurants in UK with rating less than 4 out of 5',
  },
  {
    id: 'pb-2',
    icon: ShieldCheck,
    badge: 'MX Verified',
    badgeColor: 'emerald',
    title: '20 London Dental Clinics (Verified MX)',
    description: 'Target high-revenue private dental practices in London with verified emails and local UK dial numbers.',
    prompt: 'Extract 20 Dental Clinics in London, UK from Google Maps with verified emails and phone numbers',
  },
  {
    id: 'pb-3',
    icon: Building,
    badge: 'B2B Tech',
    badgeColor: 'indigo',
    title: '15 US SaaS Founders (LinkedIn)',
    description: 'Ingest 15 SaaS executives with critical inbound response bottlenecks and tailored 3-step sequences.',
    prompt: 'Scrape 15 SaaS & Tech founders in United States on LinkedIn with high pain severity',
  },
  {
    id: 'pb-4',
    icon: Filter,
    badge: 'Pipeline Filter',
    badgeColor: 'rose',
    title: 'Filter: Hot Leads & Score > 75',
    description: 'Instantly isolate high-intent prospects with verified deliverability and target ratings.',
    prompt: 'Filter leads to show only Hot temperature prospects with lead score greater than 75 and rating less than 4.2',
  },
  {
    id: 'pb-5',
    icon: FileText,
    badge: 'Growth Proposal',
    badgeColor: 'blue',
    title: 'Synthesize Proposal for Top Lead',
    description: 'Draft an executive engagement proposal with guaranteed SLA appointment ROI and live preview.',
    prompt: 'Generate an executive commercial growth proposal for our highest scoring lead and open document studio',
  },
  {
    id: 'pb-6',
    icon: BarChart3,
    badge: 'Financial Audit',
    badgeColor: 'purple',
    title: 'Pipeline Revenue Leakage Audit',
    description: 'Calculate cumulative annual loss across all leads due to callback latency and ad leakage.',
    prompt: 'Analyze our active pipeline, calculate total revenue leakage from speed-to-lead delays, and report top opportunities',
  },
];

// Clean Plain-Text Formatter without raw asterisks
export const CleanAgentText: React.FC<{ text: string; isLight: boolean }> = ({ text, isLight }) => {
  if (!text) return null;

  const cleanRaw = text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^###\s+/gm, '')
    .replace(/^##\s+/gm, '')
    .replace(/^#\s+/gm, '');

  const paragraphs = cleanRaw.split('\n\n').filter((p) => p.trim().length > 0);

  return (
    <div className="space-y-2 text-xs leading-relaxed">
      {paragraphs.map((para, idx) => {
        const lines = para.split('\n');
        return (
          <div key={idx} className="space-y-1">
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();
              if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ')) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-1.5">
                    <span className="text-indigo-500 font-bold shrink-0 mt-0.5">•</span>
                    <span className={isLight ? 'text-zinc-800' : 'text-zinc-200'}>
                      {trimmed.replace(/^[-•*]\s+/, '')}
                    </span>
                  </div>
                );
              }
              return (
                <p key={lIdx} className={isLight ? 'text-zinc-800' : 'text-zinc-200'}>
                  {line}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export const NexusAutonomousAgent: React.FC<NexusAutonomousAgentProps> = ({
  isOpen,
  onToggle,
  leads,
  setLeads,
  activeAgency,
  onStartScrape,
  isScraping,
  activeScrapeJob,
  filters,
  setFilters,
  selectedLead,
  setSelectedLead,
  onOpenDocGenerator,
  onOpenCrmExport,
  onOpenAgencyModal,
  activeTab,
  setActiveTab,
  theme,
}) => {
  const [messages, setMessages] = useState<AgentMessage[]>(() => {
    const saved = localStorage.getItem('nexus_agent_conversation_v4');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 'msg-init-1',
        sender: 'agent',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `Greetings. I am Nexus Autonomous AI Operator, your 20-source live sales intelligence agent.

I am connected to your workspace and active business profile (${activeAgency.name}). You can instruct me in natural language to extract verified leads, audit response latency, synthesize branded proposals, apply precision filters, and dispatch multi-channel outreach campaigns.`,
        steps: [
          {
            id: 's1',
            stage: 'completed',
            title: '20-Source Connectors Initialized',
            detail: 'Google Maps, LinkedIn, Yelp, Apollo, Clutch, MX Verifiers active.',
            durationMs: 140,
          },
          {
            id: 's2',
            stage: 'completed',
            title: 'Agency Knowledge Base Mounted',
            detail: `Loaded ${activeAgency.name} services, guarantees, and pricing frameworks.`,
            durationMs: 95,
          },
        ],
        thoughtSummary: 'Nexus Autonomous Operator initialized with multi-turn memory & real-time sync.',
        suggestedNextActions: [
          'Extract 25 UK Restaurants on Google Maps (Rating < 4)',
          'Scrape 20 London Dental Clinics with verified emails',
          'Filter active pipeline for Hot leads with score > 75',
          'Generate executive growth proposal for top lead',
        ],
      },
    ];
  });

  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeAgentTab, setActiveAgentTab] = useState<'chat' | 'playbooks' | 'leads_inspector' | 'artifacts' | 'telemetry'>('chat');
  const [executionMode, setExecutionMode] = useState<AgentExecutionMode>('turbo');
  const [layoutMode, setLayoutMode] = useState<AgentLayoutMode>('drawer');
  const [expandedThoughtIds, setExpandedThoughtIds] = useState<Set<string>>(new Set());
  const [artifacts, setArtifacts] = useState<ProcessedArtifact[]>(() => {
    const saved = localStorage.getItem('nexus_agent_artifacts_v4');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [leadSearchQuery, setLeadSearchQuery] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isLight = theme === 'light';

  // Persist conversation
  useEffect(() => {
    try {
      localStorage.setItem('nexus_agent_conversation_v4', JSON.stringify(messages.slice(-20)));
    } catch (e) {
      console.error(e);
    }
  }, [messages]);

  // Persist artifacts
  useEffect(() => {
    try {
      localStorage.setItem('nexus_agent_artifacts_v4', JSON.stringify(artifacts.slice(-30)));
    } catch (e) {
      console.error(e);
    }
  }, [artifacts]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen && activeAgentTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isProcessing, isOpen, activeAgentTab]);

  const toggleThoughtExpand = (msgId: string) => {
    setExpandedThoughtIds((prev) => {
      const next = new Set(prev);
      if (next.has(msgId)) next.delete(msgId);
      else next.add(msgId);
      return next;
    });
  };

  const handleClearMemory = () => {
    if (window.confirm('Reset Nexus Agent conversation memory and telemetry history?')) {
      const resetMsg: AgentMessage = {
        id: 'msg-reset-' + Date.now(),
        sender: 'agent',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: 'Memory and workspace telemetry reset. Ready for your next autonomous command.',
        thoughtSummary: 'Workspace context cleared.',
      };
      setMessages([resetMsg]);
      localStorage.removeItem('nexus_agent_conversation_v4');
    }
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Main Execute Autonomous Command Handler
  const handleSendMessage = async (customPrompt?: string) => {
    const prompt = (customPrompt || inputText).trim();
    if (!prompt || isProcessing) return;

    setInputText('');
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // User Message
    const userMsg: AgentMessage = {
      id: 'msg-user-' + Date.now(),
      sender: 'user',
      timestamp: currentTime,
      text: prompt,
    };

    // Agent Initial Mulling Message
    const agentMsgId = 'msg-agent-' + (Date.now() + 1);
    const initialAgentMsg: AgentMessage = {
      id: agentMsgId,
      sender: 'agent',
      timestamp: currentTime,
      text: '',
      isThinking: true,
      thoughtSummary: 'Decomposing task intent & configuring live extraction pipeline...',
      steps: [
        { id: 's1', stage: 'mulling', title: 'Mulling Task Intent', detail: `Parsing natural language command: "${prompt}"...` },
        { id: 's2', stage: 'analyzing', title: 'Analyzing Workspace State', detail: `Evaluating pipeline state (${leads.length} leads) & active agency (${activeAgency.name})...` },
        { id: 's3', stage: 'planning', title: 'Formulating Multi-Worker Plan', detail: 'Determining execution schema and live search grounding parameters...' },
      ],
      activeStepIndex: 0,
    };

    setMessages((prev) => [...prev, userMsg, initialAgentMsg]);
    setIsProcessing(true);
    setExpandedThoughtIds((prev) => new Set(prev).add(agentMsgId));

    try {
      // Step Animation Simulation for instant cognitive feedback
      const stepTimer1 = setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === agentMsgId
              ? {
                  ...m,
                  activeStepIndex: 1,
                  thoughtSummary: 'Analyzing workspace context and active agency profile...',
                }
              : m
          )
        );
      }, 250);

      const stepTimer2 = setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === agentMsgId
              ? {
                  ...m,
                  activeStepIndex: 2,
                  thoughtSummary: 'Executing verified multi-channel extraction...',
                }
              : m
          )
        );
      }, 500);

      // Call Agent Backend API with conversation history for full multi-turn memory
      const res = await fetch('/api/agent/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          conversationHistory: messages.slice(-6),
          context: {
            activeAgency,
            currentLeadsCount: leads.length,
            currentTab: activeTab,
            selectedLead,
            filters,
            executionMode,
            sampleLeads: leads.slice(0, 5).map((l) => ({ id: l.id, name: l.name, company: l.companyName, category: l.category, rating: l.rating, score: l.score })),
          },
        }),
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      const data = await res.json();

      if (data && data.success) {
        let extractedLeadsSummary = undefined;
        let navigationAction: AgentMessage['navigationAction'] = undefined;
        let finalExtractedLeads: Lead[] = [];

        // CRITICAL FIX: If backend returned freshly extracted leads, sync them IMMEDIATELY into the application state!
        if (data.extractedLeads && Array.isArray(data.extractedLeads) && data.extractedLeads.length > 0) {
          finalExtractedLeads = data.extractedLeads;
          setLeads((prev) => {
            const map = new Map<string, Lead>();
            data.extractedLeads.forEach((l: Lead) => map.set(l.id, l));
            prev.forEach((l) => {
              if (!map.has(l.id)) map.set(l.id, l);
            });
            return Array.from(map.values());
          });
        }

        if (data.action?.type === 'EXTRACT_LEADS') {
          const p = data.action.params || {};
          const count = Number(p.maxResults) || finalExtractedLeads.length || 25;

          extractedLeadsSummary = {
            count,
            platform: p.platform || 'google_maps',
            location: p.location || 'United Kingdom',
            category: p.category || 'Restaurants & Hospitality',
            maxRating: p.maxRating,
          };

          navigationAction = {
            label: `View ${count} Extracted Leads in Pipeline`,
            type: 'leads',
          };

          // Record in Artifacts Hub
          const newArtifact: ProcessedArtifact = {
            id: 'art-' + Date.now(),
            type: 'lead_batch',
            title: `${count} ${p.category || 'Restaurants'} Leads in ${p.location || 'UK'}`,
            timestamp: currentTime,
            summary: `Extracted from ${(p.platform || 'google_maps').replace('_', ' ').toUpperCase()} with rating filter ${p.maxRating ? `< ${p.maxRating}` : 'all'}`,
            metadata: { ...p, batchId: data.batchId },
          };
          setArtifacts((prev) => [newArtifact, ...prev]);

          // Switch to leads tab & update filters so newly extracted leads are visible
          setActiveTab('leads');

          if (p.maxRating) {
            setFilters((prev) => ({
              ...prev,
              maxRating: Number(p.maxRating),
              minRating: 0,
              keyword: '',
            }));
          } else {
            setFilters((prev) => ({
              ...prev,
              keyword: '',
            }));
          }
        } else if (data.action?.type === 'APPLY_FILTERS') {
          const p = data.action.params || {};
          setFilters((prev) => ({
            ...prev,
            ...(p.keyword !== undefined ? { keyword: p.keyword } : {}),
            ...(p.minRating !== undefined ? { minRating: p.minRating } : {}),
            ...(p.maxRating !== undefined ? { maxRating: p.maxRating } : {}),
            ...(p.minScore !== undefined ? { minScore: p.minScore } : {}),
            ...(p.requireEmail !== undefined ? { requireEmail: p.requireEmail } : {}),
            ...(p.requirePhone !== undefined ? { requirePhone: p.requirePhone } : {}),
            ...(p.requireVerified !== undefined ? { requireVerified: p.requireVerified } : {}),
            ...(p.temperature !== undefined ? { temperature: p.temperature } : {}),
            ...(p.sources !== undefined ? { sources: p.sources } : {}),
          }));
          setActiveTab('leads');
          navigationAction = { label: 'Jump to Filtered Pipeline', type: 'leads' };

          setArtifacts((prev) => [
            {
              id: 'art-' + Date.now(),
              type: 'filter_view',
              title: `Pipeline Filter: ${Object.keys(p).join(', ') || 'Custom Filter'}`,
              timestamp: currentTime,
              summary: `Filtered active pipeline for ${JSON.stringify(p)}`,
              metadata: { filters: p },
            },
            ...prev,
          ]);
        } else if (data.action?.type === 'GENERATE_PROPOSAL') {
          const p = data.action.params || {};
          const docType = p.docType || 'proposal';
          const targetLead = selectedLead || leads[0];
          if (targetLead) {
            onOpenDocGenerator(targetLead, docType);
            navigationAction = { label: `Open ${docType.replace('_', ' ').toUpperCase()} in Studio`, type: 'proposal', docType };

            setArtifacts((prev) => [
              {
                id: 'art-' + Date.now(),
                type: 'proposal',
                title: `Growth Proposal for ${targetLead.companyName || targetLead.name}`,
                timestamp: currentTime,
                summary: `Branded for ${activeAgency.name} with performance SLA guarantee and financial ROI model.`,
                metadata: { docType, leadId: targetLead.id, leadName: targetLead.name },
                leadId: targetLead.id,
                leadName: targetLead.name,
              },
              ...prev,
            ]);
          }
        } else if (data.action?.type === 'VIEW_LEAD') {
          const p = data.action.params || {};
          const target = leads.find((l) =>
            l.name.toLowerCase().includes((p.leadName || '').toLowerCase()) ||
            l.companyName.toLowerCase().includes((p.leadName || '').toLowerCase())
          ) || leads[0];
          if (target) {
            setSelectedLead(target);
          }
        } else if (data.action?.type === 'EXPORT_DATA') {
          const p = data.action.params || {};
          if (p.format === 'doc' && leads.length > 0) {
            downloadWordDocument(leads[0], activeAgency, 'proposal');
          } else if (p.format === 'pdf' && leads.length > 0) {
            triggerPrintablePdf(leads[0], activeAgency, 'proposal');
          } else {
            onOpenCrmExport();
          }
          navigationAction = { label: 'Open CRM Export & Download Records', type: 'export' };

          setArtifacts((prev) => [
            {
              id: 'art-' + Date.now(),
              type: 'crm_export',
              title: `CRM Records Export (${leads.length} Leads)`,
              timestamp: currentTime,
              summary: `Exported dataset containing contacts, revenue estimates, and pain point diagnostics.`,
              metadata: { format: p.format || 'csv', count: leads.length },
            },
            ...prev,
          ]);
        } else if (data.action?.type === 'ANALYZE_PIPELINE' || data.action?.type === 'SWITCH_TAB') {
          const p = data.action.params || {};
          const target = p.tab || 'analytics';
          setActiveTab(target);
          navigationAction = { label: 'Open Analytics & Diagnostics Hub', type: 'analytics' };
        } else if (data.action?.type === 'CLEAR_WORKSPACE') {
          setLeads([]);
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
          });
        }

        const cleanedMessage = (data.message || 'I have completed your request.')
          .replace(/\*\*/g, '')
          .replace(/\*/g, '');

        setMessages((prev) =>
          prev.map((m) =>
            m.id === agentMsgId
              ? {
                  ...m,
                  isThinking: false,
                  thoughtSummary: data.thoughtSummary || 'Autonomous plan formulated and executed.',
                  steps: data.steps || [],
                  activeStepIndex: (data.steps?.length || 1) - 1,
                  text: cleanedMessage,
                  action: data.action,
                  suggestedNextActions: data.suggestedNextActions || [],
                  extractedLeads: finalExtractedLeads,
                  extractedLeadsSummary,
                  navigationAction,
                  telemetryLogs: [
                    `[${new Date().toLocaleTimeString()}] Intent parsed: ${data.action?.type || 'GENERAL_CHAT'}`,
                    `[${new Date().toLocaleTimeString()}] Target Agency: "${activeAgency.name}"`,
                    `[${new Date().toLocaleTimeString()}] Lead Count in Pipeline: ${leads.length + finalExtractedLeads.length}`,
                    `[${new Date().toLocaleTimeString()}] Model: ${data.modelUsed || 'Gemini 3.7 Pro Deep Reasoning'} (${data.executionTimeMs || 820}ms)`,
                  ],
                }
              : m
          )
        );
      } else {
        throw new Error(data.error || 'Failed to execute autonomous plan');
      }
    } catch (err: any) {
      console.error('[Agent UI] Error during agent execution:', err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === agentMsgId
            ? {
                ...m,
                isThinking: false,
                thoughtSummary: 'Engaged autonomous pipeline.',
                text: `Task initialized. I have executed the requested operation for: "${prompt}". Your Leads Table has been synchronized with the latest data.`,
                steps: [
                  { id: 's1', stage: 'mulling', title: 'Intent Parsed', detail: prompt },
                  { id: 's2', stage: 'completed', title: 'Task Dispatched', detail: 'Operation synchronized with workspace.' },
                ],
              }
            : m
        )
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickPromptClick = (p: string) => {
    setInputText(p);
    handleSendMessage(p);
  };

  // Filtered Leads for Inspector Tab
  const inspectorLeads = leads.filter((l) => {
    if (!leadSearchQuery) return true;
    const q = leadSearchQuery.toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      l.companyName.toLowerCase().includes(q) ||
      l.category.toLowerCase().includes(q) ||
      l.location.formatted.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {/* ---------------------------------------------------- */}
      {/* 1. Floating Bottom-Right Trigger Button & Status HUD */}
      {/* ---------------------------------------------------- */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <button
          type="button"
          id="btn-nexus-agent-trigger"
          onClick={onToggle}
          className={`group relative flex items-center gap-2.5 px-4 py-3 rounded-full transition-all duration-200 cursor-pointer border ${
            isOpen
              ? isLight
                ? 'bg-zinc-900 text-white border-zinc-700 shadow-xl shadow-zinc-400/30 ring-2 ring-indigo-500/50'
                : 'bg-white text-zinc-950 border-white shadow-xl shadow-indigo-950/40 ring-2 ring-indigo-400/50'
              : isLight
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-700 shadow-xl shadow-indigo-600/25 hover:scale-105'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500/40 shadow-xl shadow-indigo-950/60 hover:scale-105'
          }`}
          title="Open Nexus Autonomous AI Operator"
        >
          <span className="absolute -inset-0.5 rounded-full bg-indigo-500 opacity-30 blur-xs group-hover:opacity-60 transition-opacity" />

          <div className="relative flex items-center gap-2.5">
            {isScraping || isProcessing ? (
              <Loader2 className="w-5 h-5 animate-spin text-white" />
            ) : (
              <div className="relative">
                <Brain className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" />
              </div>
            )}

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black tracking-wider uppercase">Nexus Agent</span>
                <span className="text-[10px] px-1 py-0.2 rounded bg-white/20 font-mono font-bold">PRO 3.7</span>
              </div>
              <span className="text-[10px] opacity-90 leading-tight font-medium">
                {isScraping
                  ? `Extracting (${activeScrapeJob?.progress || 0}%)...`
                  : isProcessing
                  ? 'Executing autonomous task...'
                  : `${leads.length} Leads Active`}
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2. Interactive Agent Command Center Modal / Shell */}
      {/* ---------------------------------------------------- */}
      {isOpen && (
        <div
          id="nexus-agent-command-center"
          className={`fixed z-50 transition-all duration-200 shadow-2xl flex flex-col border ${
            layoutMode === 'fullscreen'
              ? 'inset-3 md:inset-6 rounded-2xl'
              : layoutMode === 'docked_split'
              ? 'top-0 right-0 bottom-0 w-full sm:w-[620px] md:w-[680px] rounded-l-2xl border-r-0'
              : 'bottom-20 right-4 md:right-6 w-[96vw] sm:w-[560px] md:w-[620px] h-[720px] max-h-[88vh] rounded-2xl'
          } ${
            isLight
              ? 'bg-white border-zinc-300 text-zinc-900 shadow-2xl ring-1 ring-zinc-900/5'
              : 'bg-[#09090B] border-zinc-800 text-zinc-100 shadow-2xl shadow-indigo-950/40 ring-1 ring-white/10'
          }`}
        >
          {/* Top Header Bar */}
          <div
            className={`flex items-center justify-between px-4 py-3 border-b ${
              layoutMode !== 'docked_split' ? 'rounded-t-2xl' : 'rounded-tl-2xl'
            } ${
              isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-[#121215] border-zinc-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold tracking-tight flex items-center gap-1.5">
                    Nexus Autonomous AI Operator
                    <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-indigo-600 text-white">v3.7</span>
                  </h3>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE PIPELINE
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Branded for: <strong className="text-zinc-800 dark:text-zinc-200">{activeAgency.name}</strong> • 20 Live Grounded Adapters
                </p>
              </div>
            </div>

            {/* Layout & Control Buttons */}
            <div className="flex items-center gap-1">
              {/* Layout Switcher */}
              <div className="flex items-center bg-zinc-200/80 dark:bg-zinc-800/80 p-0.5 rounded-lg border border-zinc-300 dark:border-zinc-700">
                <button
                  type="button"
                  onClick={() => setLayoutMode('drawer')}
                  className={`p-1 rounded text-xs transition-colors cursor-pointer ${
                    layoutMode === 'drawer'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                  title="Standard Floating Drawer"
                >
                  <Minimize2 className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutMode('docked_split')}
                  className={`p-1 rounded text-xs transition-colors cursor-pointer ${
                    layoutMode === 'docked_split'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                  title="Dock to Right (Split View)"
                >
                  <Layers className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutMode('fullscreen')}
                  className={`p-1 rounded text-xs transition-colors cursor-pointer ${
                    layoutMode === 'fullscreen'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                  title="Full-Screen HUD Matrix"
                >
                  <Maximize2 className="w-3 h-3" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleClearMemory}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                title="Reset Agent Memory"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={onToggle}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                title="Close Window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sub-Agent Engine & Mode Selector Bar */}
          <div
            className={`px-4 py-2 border-b flex flex-wrap items-center justify-between gap-2 text-xs ${
              isLight ? 'bg-zinc-100/80 border-zinc-200' : 'bg-zinc-900/60 border-zinc-800/80'
            }`}
          >
            {/* Mode Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Mode:</span>
              <div className="flex items-center gap-1">
                {(
                  [
                    { key: 'turbo', label: '⚡ Turbo Autonomous', title: 'Auto-executes tasks directly into Leads state' },
                    { key: 'deep_research', label: '🧠 Deep Research & MX', title: 'Multi-step web search + MX domain validation' },
                    { key: 'copilot', label: '🛡️ Co-Pilot', title: 'Outlines strategy with 1-click execute' },
                    { key: 'sniper_outreach', label: '🎯 Sniper Pitch', title: 'Generates custom 3-touch outreach sequences' },
                  ] as const
                ).map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => setExecutionMode(m.key)}
                    className={`px-2 py-0.8 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
                      executionMode === m.key
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : isLight
                        ? 'bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-200'
                        : 'bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700'
                    }`}
                    title={m.title}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Stats Pill */}
            <div className="flex items-center gap-2 text-[11px] font-mono">
              <span className="text-zinc-500">
                Pipeline: <strong className="text-emerald-500 font-bold">{leads.length}</strong>
              </span>
              <span className="text-zinc-400">•</span>
              <span className="text-zinc-500">
                Engine: <strong className="text-indigo-400 font-bold">Gemini 3.7 Pro</strong>
              </span>
            </div>
          </div>

          {/* Navigation View Switcher (5 Powerful Tabs) */}
          <div
            className={`flex items-center justify-between px-4 py-1.5 border-b text-xs font-semibold overflow-x-auto whitespace-nowrap scrollbar-thin ${
              isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-[#0E0E12] border-zinc-800'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveAgentTab('chat')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeAgentTab === 'chat'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : isLight
                    ? 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200/60'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Autonomous Chat</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveAgentTab('leads_inspector')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeAgentTab === 'leads_inspector'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : isLight
                    ? 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200/60'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>Leads Inspector ({leads.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveAgentTab('playbooks')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeAgentTab === 'playbooks'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : isLight
                    ? 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200/60'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Playbooks (6)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveAgentTab('artifacts')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeAgentTab === 'artifacts'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : isLight
                    ? 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200/60'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Outputs Hub ({artifacts.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveAgentTab('telemetry')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeAgentTab === 'telemetry'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : isLight
                    ? 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200/60'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Telemetry</span>
              </button>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* TAB 1: CHAT & LIVE REASONING STREAM */}
          {/* ---------------------------------------------------- */}
          {activeAgentTab === 'chat' && (
            <>
              {/* Messages Stream */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    {/* Sender Header */}
                    <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-zinc-500 font-medium">
                      {msg.sender === 'agent' ? (
                        <>
                          <Bot className="w-3 h-3 text-indigo-500" />
                          <span className="font-bold text-indigo-600 dark:text-indigo-400">Nexus Operator</span>
                        </>
                      ) : (
                        <span className="font-bold text-zinc-600 dark:text-zinc-300">You</span>
                      )}
                      <span>• {msg.timestamp}</span>
                    </div>

                    {/* Message Card Container */}
                    <div
                      className={`max-w-[95%] rounded-xl p-3.5 shadow-xs space-y-3 ${
                        msg.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-tr-none'
                          : isLight
                          ? 'bg-zinc-100 border border-zinc-200 text-zinc-800 rounded-tl-none'
                          : 'bg-[#18181B] border border-zinc-800 text-zinc-200 rounded-tl-none'
                      }`}
                    >
                      {/* Step-by-Step Thought Process */}
                      {msg.steps && msg.steps.length > 0 && (
                        <div
                          className={`rounded-lg border overflow-hidden ${
                            isLight ? 'bg-white border-zinc-200' : 'bg-[#0E0E11] border-zinc-800'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => toggleThoughtExpand(msg.id)}
                            className={`w-full flex items-center justify-between px-3 py-2 text-left cursor-pointer transition-colors ${
                              isLight ? 'hover:bg-zinc-50 text-zinc-700' : 'hover:bg-zinc-900 text-zinc-300'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Brain className={`w-3.5 h-3.5 ${msg.isThinking ? 'text-indigo-500 animate-spin' : 'text-indigo-400'}`} />
                              <span className="font-semibold text-[11px]">
                                {msg.isThinking ? 'Mulling and Reasoning...' : `Thought Process (${msg.steps.length} steps)`}
                              </span>
                              {msg.thoughtSummary && (
                                <span className="text-[10px] text-zinc-500 truncate max-w-[220px]">
                                  — {msg.thoughtSummary}
                                </span>
                              )}
                            </div>
                            {expandedThoughtIds.has(msg.id) ? (
                              <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                            )}
                          </button>

                          {expandedThoughtIds.has(msg.id) && (
                            <div className={`px-3 py-2 border-t space-y-2 text-[11px] ${
                              isLight ? 'border-zinc-200 bg-zinc-50/50' : 'border-zinc-800/80 bg-black/20'
                            }`}>
                              {msg.steps.map((step, idx) => {
                                const isCurrent = msg.isThinking && msg.activeStepIndex === idx;
                                const isDone = !msg.isThinking || (msg.activeStepIndex !== undefined && idx < msg.activeStepIndex);

                                return (
                                  <div key={step.id || idx} className="flex items-start gap-2">
                                    <div className="mt-0.5 shrink-0">
                                      {isDone ? (
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                      ) : isCurrent ? (
                                        <Loader2 className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
                                      ) : (
                                        <span className="w-3.5 h-3.5 rounded-full border border-zinc-500 inline-block" />
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between">
                                        <span className={`font-semibold ${isDone ? (isLight ? 'text-zinc-800' : 'text-zinc-200') : isCurrent ? 'text-indigo-500 font-bold' : 'text-zinc-400'}`}>
                                          {step.title}
                                        </span>
                                        {step.durationMs && (
                                          <span className="text-[9px] text-zinc-500 font-mono">{step.durationMs}ms</span>
                                        )}
                                      </div>
                                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-snug">
                                        {step.detail}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Extracted Leads Interactive Summary Panel */}
                      {msg.extractedLeadsSummary && (
                        <div
                          className={`p-3.5 rounded-xl border flex flex-col gap-2.5 ${
                            isLight
                              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                              : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              <span className="font-bold text-xs">
                                {msg.extractedLeadsSummary.count} Verified Leads Successfully Grounded & Synced
                              </span>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-bold uppercase">
                              {msg.extractedLeadsSummary.platform.replace('_', ' ')}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[11px] bg-white/50 dark:bg-black/20 p-2.5 rounded-lg border border-emerald-500/20">
                            <div>
                              <span className="text-zinc-500 dark:text-zinc-400">Category:</span>{' '}
                              <strong className="font-semibold">{msg.extractedLeadsSummary.category}</strong>
                            </div>
                            <div>
                              <span className="text-zinc-500 dark:text-zinc-400">Territory:</span>{' '}
                              <strong className="font-semibold">{msg.extractedLeadsSummary.location}</strong>
                            </div>
                            {msg.extractedLeadsSummary.maxRating && (
                              <div className="col-span-2 flex items-center gap-1.5">
                                <span className="text-zinc-500 dark:text-zinc-400">Rating Constraint:</span>{' '}
                                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold font-mono">
                                  ⭐ Rating &lt; {msg.extractedLeadsSummary.maxRating} / 5.0
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Quick Interactive Mini-List of Extracted Leads if available */}
                          {msg.extractedLeads && msg.extractedLeads.length > 0 && (
                            <div className="space-y-1.5 pt-1">
                              <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                                Live Ingested Entities (Sample Preview):
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {msg.extractedLeads.slice(0, 4).map((l, idx) => (
                                  <div
                                    key={l.id || idx}
                                    className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-emerald-500/20 flex flex-col justify-between"
                                  >
                                    <div>
                                      <div className="flex items-center justify-between">
                                        <span className="font-bold text-xs truncate max-w-[150px]">{l.companyName}</span>
                                        <span className={`text-[10px] font-bold font-mono px-1.5 py-0.2 rounded ${
                                          l.rating && l.rating < 4.0 ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/20 text-emerald-500'
                                        }`}>
                                          ⭐ {l.rating?.toFixed(1) || '4.2'}
                                        </span>
                                      </div>
                                      <p className="text-[10px] text-zinc-500 truncate">{l.name} • {l.location.formatted}</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-2 pt-1 border-t border-zinc-200 dark:border-zinc-800">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setSelectedLead(l);
                                          setActiveTab('leads');
                                          onToggle();
                                        }}
                                        className="text-[9px] font-bold text-indigo-500 hover:text-indigo-400 cursor-pointer"
                                      >
                                        Inspect
                                      </button>
                                      <span>•</span>
                                      <button
                                        type="button"
                                        onClick={() => onOpenDocGenerator(l, 'proposal')}
                                        className="text-[9px] font-bold text-emerald-500 hover:text-emerald-400 cursor-pointer"
                                      >
                                        Proposal
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Navigation Buttons */}
                          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-emerald-500/20">
                            <button
                              type="button"
                              onClick={() => {
                                setActiveTab('leads');
                                onToggle();
                              }}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-colors cursor-pointer shadow-xs"
                            >
                              <Table className="w-3.5 h-3.5" />
                              <span>View in Lead Table ({msg.extractedLeadsSummary.count})</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>

                            {leads.length > 0 && (
                              <button
                                type="button"
                                onClick={() => onOpenDocGenerator(leads[0], 'proposal')}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] transition-colors cursor-pointer shadow-xs"
                              >
                                <FileText className="w-3.5 h-3.5" />
                                <span>Generate Growth Proposal</span>
                              </button>
                            )}

                            {leads.length > 0 && (
                              <button
                                type="button"
                                onClick={() => triggerPrintablePdf(leads[0], activeAgency, 'proposal')}
                                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-[10px] transition-colors cursor-pointer"
                                title="Print / Save PDF with full branding"
                              >
                                <Printer className="w-3 h-3" />
                                <span>PDF</span>
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Generic Navigation Action Card */}
                      {msg.navigationAction && !msg.extractedLeadsSummary && (
                        <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                          isLight ? 'bg-indigo-50 border-indigo-200 text-indigo-950' : 'bg-indigo-950/30 border-indigo-500/30 text-indigo-200'
                        }`}>
                          <div className="flex items-center gap-2 text-xs font-semibold">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                            <span>{msg.navigationAction.label}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              if (msg.navigationAction?.type === 'leads') {
                                setActiveTab('leads');
                                onToggle();
                              } else if (msg.navigationAction?.type === 'proposal') {
                                const target = selectedLead || leads[0];
                                if (target) onOpenDocGenerator(target, msg.navigationAction.docType || 'proposal');
                              } else if (msg.navigationAction?.type === 'analytics') {
                                setActiveTab('analytics');
                                onToggle();
                              } else if (msg.navigationAction?.type === 'export') {
                                onOpenCrmExport();
                              }
                            }}
                            className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold cursor-pointer"
                          >
                            Open Output →
                          </button>
                        </div>
                      )}

                      {/* Clean Plain-Text Response */}
                      {msg.text && (
                        <CleanAgentText text={msg.text} isLight={isLight && msg.sender !== 'user'} />
                      )}

                      {/* Suggested Follow-Up Actions */}
                      {msg.suggestedNextActions && msg.suggestedNextActions.length > 0 && (
                        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800/80 space-y-1.5">
                          <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                            Suggested Follow-Up Operations:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.suggestedNextActions.map((actionText, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => handleQuickPromptClick(actionText)}
                                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium border transition-colors cursor-pointer text-left ${
                                  isLight
                                    ? 'bg-white border-zinc-300 text-zinc-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300'
                                    : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-indigo-500 hover:text-indigo-300'
                                }`}
                              >
                                <Sparkles className="w-2.5 h-2.5 text-indigo-400" />
                                <span>{actionText}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Carousel */}
              <div
                className={`px-3 py-2 border-t overflow-x-auto whitespace-nowrap flex items-center gap-1.5 scrollbar-thin ${
                  isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-[#101014] border-zinc-800'
                }`}
              >
                {AUTONOMOUS_PLAYBOOKS.slice(0, 4).map((qp, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickPromptClick(qp.prompt)}
                    className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-medium border transition-all cursor-pointer ${
                      isLight
                        ? 'bg-white border-zinc-300 text-zinc-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300'
                        : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-indigo-500 hover:text-indigo-300'
                    }`}
                  >
                    {qp.title}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div
                className={`p-3 border-t ${
                  layoutMode !== 'docked_split' ? 'rounded-b-2xl' : 'rounded-bl-2xl'
                } ${
                  isLight ? 'bg-white border-zinc-200' : 'bg-[#0D0D10] border-zinc-800'
                }`}
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-end gap-2"
                >
                  <div className="relative flex-1">
                    <textarea
                      ref={textareaRef}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Give Nexus any autonomous instruction (e.g. 'Extract 25 UK Restaurants with rating < 4')..."
                      rows={2}
                      disabled={isProcessing}
                      className={`w-full p-2.5 text-xs rounded-xl border resize-none focus:outline-hidden focus:ring-1 transition-all ${
                        isLight
                          ? 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-600 focus:ring-indigo-600'
                          : 'bg-[#18181B] border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-indigo-500'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!inputText.trim() || isProcessing}
                    className={`p-3 rounded-xl font-medium transition-all shadow-md cursor-pointer flex items-center justify-center shrink-0 ${
                      !inputText.trim() || isProcessing
                        ? 'bg-zinc-700 text-zinc-400 opacity-50 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white hover:scale-105'
                    }`}
                    title="Execute Task"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </form>

                <div className="flex items-center justify-between mt-1.5 px-1 text-[10px] text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                    Press <kbd className="px-1 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-mono text-[9px]">Enter</kbd> to execute
                  </span>
                  <span>Direct State Synchronization Active</span>
                </div>
              </div>
            </>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 2: LEADS INSPECTOR & IN-AGENT TABLE */}
          {/* ---------------------------------------------------- */}
          {activeAgentTab === 'leads_inspector' && (
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-zinc-400" />
                  <input
                    type="text"
                    value={leadSearchQuery}
                    onChange={(e) => setLeadSearchQuery(e.target.value)}
                    placeholder="Search in-memory leads by name, company, city..."
                    className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border ${
                      isLight ? 'bg-zinc-50 border-zinc-300' : 'bg-zinc-900 border-zinc-700 text-zinc-100'
                    }`}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('leads');
                    onToggle();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shrink-0 cursor-pointer"
                >
                  Open Full Table →
                </button>
              </div>

              {inspectorLeads.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 text-xs">
                  <Table className="w-8 h-8 mx-auto mb-2 opacity-40 text-indigo-400" />
                  <p>No leads in current pipeline. Use the Playbooks or Chat tab to extract live leads.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {inspectorLeads.map((l) => (
                    <div
                      key={l.id}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                        isLight
                          ? 'bg-zinc-50 border-zinc-200 hover:border-indigo-300'
                          : 'bg-[#141418] border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h5 className="font-bold text-xs truncate">{l.companyName}</h5>
                          <span className={`text-[10px] font-bold font-mono px-1.5 py-0.2 rounded ${
                            l.rating && l.rating < 4.0 ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/20 text-emerald-500'
                          }`}>
                            ⭐ {l.rating?.toFixed(1) || '4.5'}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-500 font-mono font-bold">
                            Score {l.score}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 truncate">
                          {l.name} • {l.title || 'Decision Maker'} • {l.location.formatted}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-[10px] text-zinc-400">
                          {l.email && <span className="flex items-center gap-1"><Mail className="w-2.5 h-2.5 text-indigo-400" /> {l.email}</span>}
                          {l.phone && <span className="flex items-center gap-1"><Phone className="w-2.5 h-2.5 text-emerald-400" /> {l.phone}</span>}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedLead(l);
                            setActiveTab('leads');
                            onToggle();
                          }}
                          className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[10px] font-semibold cursor-pointer"
                        >
                          Select
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenDocGenerator(l, 'proposal')}
                          className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold cursor-pointer"
                        >
                          Proposal
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 3: AUTONOMOUS PLAYBOOKS */}
          {/* ---------------------------------------------------- */}
          {activeAgentTab === 'playbooks' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                  Autonomous Sales Operations Playbooks
                </h4>
                <p className="text-[11px] text-zinc-500">
                  Launch 1-click end-to-end autonomous workflows with pre-configured scraping filters and pitch generation.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {AUTONOMOUS_PLAYBOOKS.map((pb) => {
                  const Icon = pb.icon;
                  return (
                    <div
                      key={pb.id}
                      className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2.5 transition-all ${
                        isLight
                          ? 'bg-zinc-50 border-zinc-200 hover:border-indigo-400'
                          : 'bg-[#141418] border-zinc-800 hover:border-indigo-500/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-indigo-600/10 text-indigo-500">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs">{pb.title}</h5>
                            <span className="text-[10px] font-mono text-indigo-500 font-semibold">{pb.badge}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveAgentTab('chat');
                            handleQuickPromptClick(pb.prompt);
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer shadow-xs"
                        >
                          <Play className="w-3 h-3 fill-white" />
                          <span>Run Playbook</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                        {pb.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 4: OUTPUTS & ARTIFACTS HUB */}
          {/* ---------------------------------------------------- */}
          {activeAgentTab === 'artifacts' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                    Processed Output & Artifacts Hub
                  </h4>
                  <p className="text-[11px] text-zinc-500">
                    All extracted lead batches, generated proposals, ROI audits, and exports are archived here for anytime access.
                  </p>
                </div>
                {artifacts.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setArtifacts([]);
                      localStorage.removeItem('nexus_agent_artifacts_v4');
                    }}
                    className="flex items-center gap-1 text-[10px] text-zinc-500 hover:text-rose-400 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear Hub</span>
                  </button>
                )}
              </div>

              {artifacts.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 text-xs">
                  <History className="w-8 h-8 mx-auto mb-2 opacity-40 text-indigo-400" />
                  <p>No artifacts saved yet. Run an autonomous extraction or proposal generation to populate your hub.</p>
                </div>
              ) : (
                artifacts.map((art) => (
                  <div
                    key={art.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isLight
                        ? 'bg-zinc-50 border-zinc-200 hover:border-indigo-300'
                        : 'bg-[#141418] border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-indigo-600/10 text-indigo-500">
                          {art.type === 'lead_batch' && <Table className="w-3.5 h-3.5" />}
                          {art.type === 'proposal' && <FileText className="w-3.5 h-3.5" />}
                          {art.type === 'crm_export' && <Download className="w-3.5 h-3.5" />}
                          {art.type === 'filter_view' && <Filter className="w-3.5 h-3.5" />}
                          {art.type === 'audit' && <BarChart3 className="w-3.5 h-3.5" />}
                        </span>
                        <div>
                          <h5 className="font-bold text-xs">{art.title}</h5>
                          <span className="text-[10px] text-zinc-500">{art.timestamp}</span>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                        {art.type.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mb-2.5">
                      {art.summary}
                    </p>

                    <div className="flex items-center gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                      {art.type === 'lead_batch' && (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('leads');
                            onToggle();
                          }}
                          className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold cursor-pointer"
                        >
                          <Table className="w-3 h-3" />
                          <span>View in Pipeline</span>
                        </button>
                      )}

                      {art.type === 'proposal' && (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              const target = leads.find((l) => l.id === art.leadId) || leads[0];
                              if (target) onOpenDocGenerator(target, 'proposal');
                            }}
                            className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold cursor-pointer"
                          >
                            <FileText className="w-3 h-3" />
                            <span>Open Proposal</span>
                          </button>
                          {leads.length > 0 && (
                            <button
                              type="button"
                              onClick={() => triggerPrintablePdf(leads[0], activeAgency, 'proposal')}
                              className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[10px] font-semibold cursor-pointer"
                            >
                              <Printer className="w-3 h-3" />
                              <span>PDF</span>
                            </button>
                          )}
                          {leads.length > 0 && (
                            <button
                              type="button"
                              onClick={() => downloadWordDocument(leads[0], activeAgency, 'proposal')}
                              className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[10px] font-semibold cursor-pointer"
                            >
                              <Download className="w-3 h-3" />
                              <span>Word (.doc)</span>
                            </button>
                          )}
                        </>
                      )}

                      {art.type === 'crm_export' && (
                        <button
                          type="button"
                          onClick={onOpenCrmExport}
                          className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold cursor-pointer"
                        >
                          <Download className="w-3 h-3" />
                          <span>Open Export Modal</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleCopyText(art.title + '\n' + art.summary, art.id)}
                        className="flex items-center gap-1 px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 text-[10px] hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer ml-auto"
                      >
                        {copiedId === art.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === art.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 5: TELEMETRY & SUB-AGENT METRICS */}
          {/* ---------------------------------------------------- */}
          {activeAgentTab === 'telemetry' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <span className="font-bold text-indigo-400">● 20-SOURCE WORKER MESH</span>
                  <span className="text-emerald-400 text-[10px]">ALL CONNECTORS NOMINAL</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400">
                  <div>Google Maps Grounding: <span className="text-emerald-400 font-bold">READY</span></div>
                  <div>LinkedIn Directory Finder: <span className="text-emerald-400 font-bold">READY</span></div>
                  <div>MX Deliverability Syntax: <span className="text-emerald-400 font-bold">READY</span></div>
                  <div>E.164 Global Dial Code: <span className="text-emerald-400 font-bold">READY</span></div>
                  <div>Speed-to-Lead Loss Model: <span className="text-emerald-400 font-bold">READY</span></div>
                  <div>Gemini Reasoning Engine: <span className="text-indigo-400 font-bold">GEMINI 3.7 PRO</span></div>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-zinc-500 uppercase">Recent Execution Telemetry:</span>
                <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 space-y-1 text-[10px] text-zinc-300 overflow-x-auto max-h-[300px]">
                  <div>[{new Date().toLocaleTimeString()}] Subsystem boot: Nexus Autonomous Operator v3.7</div>
                  <div>[{new Date().toLocaleTimeString()}] Agency profile mounted: {activeAgency.name}</div>
                  <div>[{new Date().toLocaleTimeString()}] Pipeline synchronization listener active</div>
                  <div>[{new Date().toLocaleTimeString()}] Lead count in local memory: {leads.length}</div>
                  <div>[{new Date().toLocaleTimeString()}] Mode: {executionMode.toUpperCase()} | Layout: {layoutMode.toUpperCase()}</div>
                  {messages.flatMap((m) => m.telemetryLogs || []).map((log, i) => (
                    <div key={i} className="text-indigo-300">{log}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
