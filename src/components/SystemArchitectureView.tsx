import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  Database,
  Shield,
  Activity,
  Zap,
  Server,
  Terminal,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Search,
  Sliders,
  Share2,
  BarChart,
  HardDrive
} from 'lucide-react';
import {
  ARCHITECTURE_LAYERS,
  ARCHITECTURE_METRICS,
  MOCK_VECTOR_INSIGHTS,
  VectorInsight
} from '../data/architectureData';

export const SystemArchitectureView: React.FC = () => {
  const [selectedLayerId, setSelectedLayerId] = useState<string>('scraping_layer');
  const [vectorQuery, setVectorQuery] = useState('Real estate broker speed to lead in USA');
  const [vectorCategory, setVectorCategory] = useState('Real Estate');
  const [vectorResults, setVectorResults] = useState<VectorInsight[]>(MOCK_VECTOR_INSIGHTS);
  const [isQueryingVector, setIsQueryingVector] = useState(false);
  const [simulatedJobsCount, setSimulatedJobsCount] = useState(148);
  const [activeWorkers, setActiveWorkers] = useState(48);

  const selectedLayer = ARCHITECTURE_LAYERS.find((l) => l.id === selectedLayerId) || ARCHITECTURE_LAYERS[0];

  const handleTestVectorSearch = async () => {
    setIsQueryingVector(true);
    try {
      const res = await fetch('/api/vector/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: vectorQuery, category: vectorCategory, topK: 4 }),
      });
      const data = await res.json();
      if (data.success && data.matches) {
        setVectorResults(data.matches);
      }
    } catch (err) {
      console.error('Vector search error:', err);
    } finally {
      setIsQueryingVector(false);
    }
  };

  const handleSimulateLoadBurst = () => {
    setSimulatedJobsCount((prev) => prev + 50);
    setActiveWorkers((prev) => Math.min(128, prev + 16));
    setTimeout(() => {
      setSimulatedJobsCount((prev) => Math.max(20, prev - 40));
      setActiveWorkers(48);
    }, 4000);
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-lg border border-[#27272A] bg-[#09090B] shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-mono">
                Production Architecture
              </span>
              <span className="text-zinc-400 text-xs font-mono">High-Throughput Vectorized Engine</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-zinc-100 tracking-tight">
              AI-Driven Multi-Platform Scraping & Vector Synthesis System
            </h1>
            <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
              End-to-end distributed topology with event-driven Redis task queuing, proxy mesh auto-rotation, 1536-dimensional Pinecone vector retrieval, and secure server-side Gemini Flash intelligence.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSimulateLoadBurst}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-cyan-600 text-white hover:bg-cyan-500 transition-colors cursor-pointer shadow-xs shrink-0"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Simulate Burst (+50 Tasks)</span>
          </button>
        </div>

        {/* Live Architecture Metric Gauges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 mt-4 pt-3.5 border-t border-[#27272A] text-xs">
          <div className="p-2.5 rounded bg-[#18181B] border border-[#27272A]">
            <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-wider block">P95 Scraping Latency</span>
            <span className="text-emerald-400 font-mono font-bold text-sm mt-0.5 block">{ARCHITECTURE_METRICS.p95Latency}</span>
          </div>

          <div className="p-2.5 rounded bg-[#18181B] border border-[#27272A]">
            <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-wider block">Max Concurrent Jobs</span>
            <span className="text-cyan-400 font-mono font-bold text-sm mt-0.5 block">{simulatedJobsCount} / 2,000</span>
          </div>

          <div className="p-2.5 rounded bg-[#18181B] border border-[#27272A]">
            <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-wider block">Active Worker Pods</span>
            <span className="text-purple-400 font-mono font-bold text-sm mt-0.5 block">{activeWorkers} Nodes</span>
          </div>

          <div className="p-2.5 rounded bg-[#18181B] border border-[#27272A]">
            <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-wider block">Vector Index Size</span>
            <span className="text-amber-400 font-mono font-bold text-sm mt-0.5 block">{ARCHITECTURE_METRICS.vectorIndexSize}</span>
          </div>

          <div className="p-2.5 rounded bg-[#18181B] border border-[#27272A]">
            <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-wider block">Vector Match Latency</span>
            <span className="text-emerald-400 font-mono font-bold text-sm mt-0.5 block">{ARCHITECTURE_METRICS.vectorSimilarityP99}</span>
          </div>

          <div className="p-2.5 rounded bg-[#18181B] border border-[#27272A]">
            <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-wider block">Proxy Mesh Pool</span>
            <span className="text-blue-400 font-mono font-bold text-sm mt-0.5 block">{ARCHITECTURE_METRICS.proxyMeshSize}</span>
          </div>
        </div>
      </div>

      {/* Interactive Architecture Flow Diagram */}
      <div className="p-4 sm:p-5 rounded-lg border border-[#27272A] bg-[#09090B] space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Interactive Multi-Layer Topology Flow</span>
          </h2>
          <span className="text-[11px] text-zinc-500">Click layer to inspect telemetry</span>
        </div>

        {/* Horizontal Node Flow */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {ARCHITECTURE_LAYERS.map((layer, idx) => {
            const isSelected = selectedLayerId === layer.id;
            return (
              <button
                key={layer.id}
                type="button"
                id={`arch-layer-btn-${layer.id}`}
                onClick={() => setSelectedLayerId(layer.id)}
                className={`p-2.5 rounded border text-left transition-colors cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-950/20 shadow-xs'
                    : 'border-[#27272A] bg-[#18181B] hover:border-zinc-600'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 mb-1">
                    <span>STEP 0{idx + 1}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  </div>
                  <div className="font-bold text-xs text-zinc-100 line-clamp-1">{layer.name}</div>
                  <div className="text-[10px] text-indigo-300 font-mono mt-0.5 line-clamp-1">{layer.technology.slice(0, 2).join(' • ')}</div>
                </div>
                <div className="mt-2 pt-1.5 border-t border-[#27272A] text-[9px] text-zinc-400 flex items-center justify-between">
                  <span>{layer.nodes.length} Components</span>
                  <ArrowRight className="w-2.5 h-2.5 text-zinc-500" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Layer Technical Drill-Down */}
        <div className="mt-4 p-4 rounded-lg border border-[#27272A] bg-[#121215] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#27272A]">
            <div>
              <span className="text-[9px] uppercase font-bold tracking-wider text-indigo-400 block mb-0.5">
                Active Component Telemetry
              </span>
              <h3 className="text-sm font-bold text-zinc-100">{selectedLayer.name}</h3>
              <p className="text-xs text-zinc-400 mt-0.5">{selectedLayer.description}</p>
            </div>
            <div className="px-2 py-1 rounded bg-[#18181B] border border-[#27272A] text-[11px] font-mono text-cyan-300">
              Stack: {selectedLayer.technology.join(', ')}
            </div>
          </div>

          {/* Node Spec Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {selectedLayer.nodes.map((node, nIdx) => (
              <div
                key={nIdx}
                className="p-3 rounded border border-[#27272A] bg-[#18181B] flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-zinc-200">{node.title}</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {node.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed mb-2">
                    {node.description}
                  </p>
                  {node.details && (
                    <ul className="space-y-0.5 text-[10px] text-zinc-400">
                      {node.details.map((d, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-1">
                          <span className="text-indigo-400 select-none">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="pt-2 border-t border-[#27272A] text-[10px] font-mono text-cyan-400">
                  {node.metrics}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vector Database RAG Simulation Section */}
      <div className="p-4 sm:p-5 rounded-lg border border-[#27272A] bg-[#09090B] space-y-4">
        <div className="flex items-center justify-between pb-2.5 border-b border-[#27272A]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-zinc-100 flex items-center gap-2 uppercase tracking-wider">
                <span>Vector Database Knowledge Retrieval Lab (RAG)</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                  1536-dim Embeddings
                </span>
              </h2>
              <p className="text-[11px] text-zinc-400">
                Test real-time semantic similarity retrieval across 520k+ stored sales insights and historical deal playbooks.
              </p>
            </div>
          </div>
        </div>

        {/* Search query form */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 text-xs">
          <div className="md:col-span-8">
            <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1">
              Semantic Search Query / Problem Statement
            </label>
            <input
              type="text"
              value={vectorQuery}
              onChange={(e) => setVectorQuery(e.target.value)}
              placeholder="e.g. Dental clinic missed call follow-up, Real estate lead speed to lead"
              className="w-full rounded border border-[#27272A] bg-[#18181B] px-3 py-1.5 text-xs text-zinc-100 focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div className="md:col-span-4 flex items-end">
            <button
              type="button"
              onClick={handleTestVectorSearch}
              disabled={isQueryingVector}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-cyan-600 text-white font-medium text-xs hover:bg-cyan-500 transition-colors cursor-pointer disabled:opacity-50"
            >
              {isQueryingVector ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Computing Embeddings...</span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>Query Vector Index</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Vector Matches Result Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {vectorResults.map((item) => (
            <div key={item.id} className="p-3.5 rounded-lg border border-[#27272A] bg-[#18181B] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-[#121215] text-zinc-300 border border-[#27272A]">
                    {item.category}
                  </span>
                  <span className="text-cyan-400 font-mono font-bold text-[11px]">
                    {(item.similarityScore * 100).toFixed(1)}% Sim
                  </span>
                </div>
                <h4 className="font-bold text-zinc-100 mb-1 text-xs">{item.title}</h4>
                <p className="text-zinc-400 text-[11px] leading-relaxed mb-2.5">
                  {item.insightsSummary}
                </p>
              </div>

              <div className="pt-2 border-t border-[#27272A] space-y-1 text-[10px]">
                <div className="flex justify-between text-zinc-400">
                  <span>Optimal Angle:</span>
                  <span className="text-emerald-400 font-semibold">{item.optimalOutreachAngle}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Historical Win Rate:</span>
                  <span className="text-amber-400 font-mono font-bold">{item.historicalWinRate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
