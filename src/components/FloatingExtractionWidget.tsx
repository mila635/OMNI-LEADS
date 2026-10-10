import React, { useState } from 'react';
import {
  Activity,
  CheckCircle,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
  Maximize2,
  X,
  RefreshCw,
  Layers,
  Terminal
} from 'lucide-react';
import { ScrapingJob } from '../types';

interface FloatingExtractionWidgetProps {
  activeJob: ScrapingJob | null;
  onOpenLogsModal: () => void;
  onDismiss?: () => void;
  theme?: 'dark' | 'light';
}

export const FloatingExtractionWidget: React.FC<FloatingExtractionWidgetProps> = ({
  activeJob,
  onOpenLogsModal,
  onDismiss,
  theme = 'dark',
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!activeJob) return null;

  const isRunning = activeJob.status === 'running' || activeJob.status === 'queued';
  const isCompleted = activeJob.status === 'completed';
  const isFailed = activeJob.status === 'failed';

  const isLight = theme === 'light';

  return (
    <div
      id="floating-extraction-widget"
      className="fixed bottom-22 right-6 z-40 transition-all duration-300 select-none animate-in slide-in-from-bottom-5"
    >
      {isMinimized ? (
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className={`flex items-center gap-2 px-3 py-2 rounded-full shadow-2xl border transition-all cursor-pointer ${
            isLight
              ? 'bg-white border-zinc-300 text-zinc-900 shadow-zinc-400/40'
              : 'bg-[#121215] border-[#27272A] text-zinc-100 shadow-black/80'
          }`}
          title="Click to expand live extraction monitor"
        >
          {/* Status Dot */}
          {isRunning && (
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          )}
          {isCompleted && (
            <span className="relative flex h-3 w-3">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 shadow-xs shadow-blue-400"></span>
            </span>
          )}
          {isFailed && (
            <span className="relative flex h-3 w-3">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
          )}

          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-xs font-bold">
            {isRunning
              ? `Extracting (${activeJob.progress}%)`
              : isCompleted
              ? `Extracted (${activeJob.extractedCount})`
              : 'Extraction Failed'}
          </span>
          <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
        </button>
      ) : (
        <div
          className={`w-80 sm:w-96 rounded-xl border shadow-2xl p-3.5 transition-all overflow-hidden ${
            isLight
              ? 'bg-white border-zinc-300 text-zinc-900 shadow-zinc-400/50'
              : 'bg-[#0E0E12] border-[#27272A] text-zinc-100 shadow-black/90'
          }`}
        >
          {/* Top Header */}
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-[#27272A]">
            <div className="flex items-center gap-2">
              {/* Green dot when running, turns to glowing blue when complete */}
              {isRunning && (
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              )}
              {isCompleted && (
                <span className="relative flex h-2.5 w-2.5">
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 shadow-xs shadow-blue-400"></span>
                </span>
              )}
              {isFailed && (
                <span className="relative flex h-2.5 w-2.5">
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                </span>
              )}

              <h4 className="text-xs font-bold uppercase tracking-wider">
                {isRunning ? 'Extraction Running...' : isCompleted ? 'Extraction Completed' : 'Extraction Error'}
              </h4>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={onOpenLogsModal}
                className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-indigo-400 transition-colors cursor-pointer"
                title="Open Real-time Terminal & Logs"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                title="Minimize widget"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {onDismiss && !isRunning && (
                <button
                  type="button"
                  onClick={onDismiss}
                  className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Close widget"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Body Content */}
          <div className="py-2.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium truncate max-w-[200px]">
                {activeJob.params?.query || 'Lead Generation'}
              </span>
              <span className="text-[11px] font-mono font-bold text-indigo-500 dark:text-indigo-400">
                {activeJob.progress}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  isRunning
                    ? 'bg-gradient-to-r from-emerald-500 to-indigo-500'
                    : isCompleted
                    ? 'bg-blue-500'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${activeJob.progress}%` }}
              ></div>
            </div>

            {/* Step Message */}
            <p className="text-[11px] text-zinc-600 dark:text-zinc-300 line-clamp-1">
              {activeJob.currentStep}
            </p>

            {/* Latest Log Line */}
            {activeJob.logs.length > 0 && (
              <div className="p-1.5 rounded bg-zinc-100 dark:bg-[#070709] border border-zinc-200 dark:border-[#27272A] font-mono text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                {activeJob.logs[activeJob.logs.length - 1]}
              </div>
            )}
          </div>

          {/* Footer Action */}
          <button
            type="button"
            onClick={onOpenLogsModal}
            className="w-full py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>View Full Extraction Logs & Live Pipeline</span>
          </button>
        </div>
      )}
    </div>
  );
};
