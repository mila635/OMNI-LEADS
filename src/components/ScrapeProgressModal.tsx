import React from 'react';
import {
  Terminal,
  Activity,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  Globe,
  Database
} from 'lucide-react';
import { ScrapingJob } from '../types';

interface ScrapeProgressModalProps {
  job: ScrapingJob | null;
  onCancel?: () => void;
}

export const ScrapeProgressModal: React.FC<ScrapeProgressModalProps> = ({ job, onCancel }) => {
  if (!job || job.status === 'completed' || job.status === 'failed') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-lg border border-[#27272A] bg-[#09090B] shadow-2xl overflow-hidden">
        {/* Animated Accent Top Bar */}
        <div className="h-1 w-full bg-[#18181B] overflow-hidden">
          <div
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${job.progress}%` }}
          ></div>
        </div>

        <div className="p-4 sm:p-5 space-y-3.5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-8 h-8 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                <Activity className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2 uppercase tracking-wider">
                  <span>Executing Distributed Extraction</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                    {job.progress}% Complete
                  </span>
                </h3>
                <p className="text-[11px] text-zinc-400">
                  Targeting <strong className="text-zinc-200 font-medium">{job.params.platform}</strong> • Query: "{job.params.query}"
                </p>
              </div>
            </div>

            <div className="text-right font-mono text-xs text-indigo-400 font-semibold">
              {job.extractedCount} / {job.params.maxResults} Leads Extracted
            </div>
          </div>

          {/* Current Step Banner */}
          <div className="p-2.5 rounded bg-[#18181B] border border-[#27272A] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-zinc-200 font-medium text-[11px]">{job.currentStep}</span>
            </div>
            <span className="text-[9px] font-mono text-cyan-400">P95: 24ms • 48 Pods</span>
          </div>

          {/* Terminal Logs Output */}
          <div className="rounded border border-[#27272A] bg-[#121215] p-3 font-mono text-[10px] text-zinc-300 space-y-1 max-h-48 overflow-y-auto">
            <div className="text-zinc-500 flex items-center gap-1.5 pb-1 border-b border-[#27272A]">
              <Terminal className="w-3 h-3 text-indigo-400" />
              <span>CLUSTER LOG STREAM [ID: {job.id.slice(0, 8)}]</span>
            </div>
            {job.logs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-1.5">
                <span className="text-zinc-600 select-none">&gt;</span>
                <span className={log.includes('Synthesizing') || log.includes('vector') ? 'text-indigo-300' : 'text-zinc-300'}>
                  {log}
                </span>
              </div>
            ))}
          </div>

          {/* Micro Telemetry Footer */}
          <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-2 border-t border-[#27272A]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Proxy Mesh: Rotating Residential IP (US/UK)</span>
            </div>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
              >
                Cancel Job
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
