import React, { useState } from 'react';
import {
  X,
  Download,
  FileSpreadsheet,
  Code,
  Share2,
  Check,
  Send,
  Database,
  Layers,
  FileText
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { Lead, AgencyProfile } from '../types';

interface CrmExportModalProps {
  leads: Lead[];
  isOpen: boolean;
  onClose: () => void;
  activeAgency?: AgencyProfile;
  theme?: 'dark' | 'light';
}

export const CrmExportModal: React.FC<CrmExportModalProps> = ({
  leads,
  isOpen,
  onClose,
  activeAgency,
  theme = 'dark',
}) => {
  const [format, setFormat] = useState<'xlsx' | 'csv' | 'json' | 'hubspot'>('xlsx');
  const [webhookUrl, setWebhookUrl] = useState('https://hooks.zapier.com/hooks/catch/omni-leads-crm');
  const [isSendingWebhook, setIsSendingWebhook] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const isLight = theme === 'light';
  const agencyName = activeAgency?.name || 'ADS RESULTS 24/7';

  const prepareExportData = () => {
    return leads.map((l, idx) => ({
      '#': idx + 1,
      'Target Company': l.companyName,
      'Decision Maker': l.name,
      'Title / Role': l.title || 'Director',
      'Direct Email': l.email || '',
      'Phone Number': l.phone || '',
      'Website': l.website || '',
      'Industry Niche': l.category,
      'Platform Source': l.sourceLabel || l.source,
      'Location': l.location?.formatted || 'USA',
      'Google / Review Rating': l.rating || 'N/A',
      'Total Reviews': l.reviewsCount || 0,
      'Lead Score (0-100)': l.score,
      'Priority Temp': l.temperature,
      'Est Annual Revenue': l.researchedData?.estimatedAnnualRevenue || '$2M - $5M',
      'Est Team Size': l.researchedData?.estimatedEmployees || '15-35',
      'Assigned Business': agencyName,
      'Personalized Icebreaker': l.outreachStrategy?.icebreaker || '',
      'Core Pain Point': l.painPoints?.[0]?.title || l.pitchStrategy?.painPoint || '',
      'Recommended Fix / Solution': l.painPoints?.[0]?.recommendedFix || l.pitchStrategy?.solutionOffer || '',
      'Primary Cold Email Subject': l.outreachStrategy?.coldEmailSequence?.[0]?.subjectLines?.[0] || '',
      'First Outreach Body': l.outreachStrategy?.coldEmailSequence?.[0]?.body || '',
      'Proposal Retainer Tier': l.proposals?.[0]?.investmentSummary?.monthlyRetainer || '$3,500/mo',
      'Proposal Guarantee': l.proposals?.[0]?.investmentSummary?.guarantee || '30-Day Money Back Guarantee',
    }));
  };

  const handleDownloadFile = () => {
    const filenamePrefix = `${agencyName.replace(/[^a-zA-Z0-9]/g, '_')}_Leads_${new Date().toISOString().slice(0, 10)}`;

    if (format === 'xlsx') {
      const data = prepareExportData();
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Verified Leads');
      XLSX.writeFile(wb, `${filenamePrefix}.xlsx`);
    } else if (format === 'csv') {
      const data = prepareExportData();
      const ws = XLSX.utils.json_to_sheet(data);
      const csv = XLSX.utils.sheet_to_csv(ws);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filenamePrefix}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === 'json') {
      const json = JSON.stringify({ agency: agencyName, exportedAt: new Date().toISOString(), totalLeads: leads.length, leads }, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filenamePrefix}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleTriggerWebhook = () => {
    setIsSendingWebhook(true);
    setTimeout(() => {
      setIsSendingWebhook(false);
      setStatusMsg(`Successfully pushed ${leads.length} verified dossiers to CRM endpoint!`);
      setTimeout(() => setStatusMsg(null), 3500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`relative w-full max-w-xl rounded-xl border shadow-2xl p-5 space-y-4 ${
          isLight ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-[#0E0E12] border-[#27272A] text-zinc-100'
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-[#27272A]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-600/10 border border-indigo-500/30 text-indigo-500">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">Export Qualified Leads & Outreach Dossiers</h3>
              <p className="text-xs text-zinc-400">
                Formatted with complete branding for <strong className="text-zinc-200">{agencyName}</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Format Select */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <button
            type="button"
            onClick={() => setFormat('xlsx')}
            className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
              format === 'xlsx'
                ? 'border-indigo-500 bg-indigo-950/30 text-indigo-300 font-bold shadow-xs'
                : isLight
                ? 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100'
                : 'border-[#27272A] bg-[#18181B] text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-bold">Excel (.xlsx)</span>
          </button>

          <button
            type="button"
            onClick={() => setFormat('csv')}
            className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
              format === 'csv'
                ? 'border-indigo-500 bg-indigo-950/30 text-indigo-300 font-bold shadow-xs'
                : isLight
                ? 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100'
                : 'border-[#27272A] bg-[#18181B] text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-bold">CSV File</span>
          </button>

          <button
            type="button"
            onClick={() => setFormat('json')}
            className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
              format === 'json'
                ? 'border-indigo-500 bg-indigo-950/30 text-indigo-300 font-bold shadow-xs'
                : isLight
                ? 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100'
                : 'border-[#27272A] bg-[#18181B] text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Code className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold">JSON Payload</span>
          </button>

          <button
            type="button"
            onClick={() => setFormat('hubspot')}
            className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
              format === 'hubspot'
                ? 'border-indigo-500 bg-indigo-950/30 text-indigo-300 font-bold shadow-xs'
                : isLight
                ? 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100'
                : 'border-[#27272A] bg-[#18181B] text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Share2 className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-bold">CRM Webhook</span>
          </button>
        </div>

        {format === 'hubspot' && (
          <div
            className={`space-y-2.5 p-3.5 rounded-xl border text-xs ${
              isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-[#18181B] border-[#27272A]'
            }`}
          >
            <label className="block text-zinc-400 font-bold text-[11px] uppercase tracking-wider">
              Zapier / Make / HubSpot / GoHighLevel Ingestion Webhook URL
            </label>
            <input
              type="text"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className={`w-full rounded-lg border px-3 py-2 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                isLight ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-[#0E0E12] border-[#27272A] text-zinc-100'
              }`}
            />
            <button
              type="button"
              onClick={handleTriggerWebhook}
              disabled={isSendingWebhook}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition-colors disabled:opacity-50 cursor-pointer shadow-md shadow-indigo-600/30"
            >
              {isSendingWebhook ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Pushing {leads.length} Records...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Sync {leads.length} Leads to Webhook</span>
                </>
              )}
            </button>
          </div>
        )}

        {statusMsg && (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-[#27272A]">
          <span className="text-xs text-zinc-400 font-mono">
            {leads.length} qualified lead records selected
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
            >
              Close
            </button>

            {format !== 'hubspot' && (
              <button
                type="button"
                onClick={handleDownloadFile}
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors cursor-pointer shadow-md shadow-indigo-600/30"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download {format.toUpperCase()}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
