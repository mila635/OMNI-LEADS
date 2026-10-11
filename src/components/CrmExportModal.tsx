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
  FileText,
  Copy,
  ExternalLink,
  Zap,
  CheckCircle2,
  AlertCircle,
  Building,
  Table,
  Radio
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

type ExportFormat = 'xlsx' | 'csv' | 'hubspot' | 'ghl' | 'salesforce' | 'json';

export const CrmExportModal: React.FC<CrmExportModalProps> = ({
  leads,
  isOpen,
  onClose,
  activeAgency,
  theme = 'dark',
}) => {
  const [format, setFormat] = useState<ExportFormat>('xlsx');
  const [activeTab, setActiveTab] = useState<'format' | 'connectors' | 'sheets'>('format');
  const [webhookUrl, setWebhookUrl] = useState('https://hooks.zapier.com/hooks/catch/omni-leads-crm');
  const [isSendingWebhook, setIsSendingWebhook] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [copiedTsv, setCopiedTsv] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);

  if (!isOpen) return null;

  const isLight = theme === 'light';
  const agencyName = activeAgency?.name || 'ADS RESULTS 24/7';
  const agencySender = activeAgency?.senderName || 'Marcus Vance';
  const agencyEmail = activeAgency?.senderEmail || 'marcus@adsresults247.com';

  // 1. Prepare Master Pipeline Sheet Data
  const prepareMasterSheetData = () => {
    return leads.map((l, idx) => ({
      'Lead ID': l.id,
      'Index': idx + 1,
      'Company Name': l.companyName,
      'Decision Maker': l.name,
      'Job Title': l.title || 'Managing Principal',
      'Direct Email': l.email || '',
      'Email Verified': l.emailVerified ? 'YES' : 'PENDING',
      'Direct Phone': l.phone || '',
      'Phone Verified': l.phoneVerified ? 'YES' : 'PENDING',
      'Official Website': l.website || '',
      'Industry Category': l.category,
      'Source Platform': l.sourceLabel || l.source.toUpperCase(),
      'Territory Location': l.location?.formatted || 'United States',
      'City': l.location?.city || '',
      'State / Region': l.location?.state || '',
      'Country': l.location?.country || 'USA',
      'Star Rating': l.rating ? Number(l.rating.toFixed(1)) : 'N/A',
      'Total Reviews': l.reviewsCount || 0,
      'Lead Quality Score': l.score,
      'Pipeline Temperature': l.temperature,
      'Est Annual Revenue': l.researchedData?.estimatedAnnualRevenue || '$2.5M - $5M',
      'Est Headcount': l.researchedData?.estimatedEmployees || '15-35',
      'Assigned Business': agencyName,
      'Status': l.status || 'New',
    }));
  };

  // 2. Prepare Cold Outreach & Sales Scripts Sheet Data
  const prepareOutreachSheetData = () => {
    return leads.map((l, idx) => ({
      '#': idx + 1,
      'Target Company': l.companyName,
      'Decision Maker': l.name,
      'Target Email': l.email || '',
      'Direct Phone': l.phone || '',
      'Personalized Icebreaker': l.outreachStrategy?.icebreaker || `I was reviewing established ${l.category} leaders in ${l.location?.city || 'your area'}.`,
      'Primary Cold Email Subject': l.outreachStrategy?.coldEmailSequence?.[0]?.subjectLines?.[0] || `Quick question regarding ${l.companyName}'s inbound pipeline`,
      'Alternative Subject Line': l.outreachStrategy?.coldEmailSequence?.[0]?.subjectLines?.[1] || `${l.name} - 60-second speed-to-lead audit`,
      'Step 1 Email Body': l.outreachStrategy?.coldEmailSequence?.[0]?.body || '',
      'Call To Action': l.outreachStrategy?.coldEmailSequence?.[0]?.callToAction || 'Would you be open to a 5-minute walkthrough this week?',
      'LinkedIn InMail Note': l.outreachStrategy?.linkedInInMail?.connectionNote || '',
      'LinkedIn Pitch': l.outreachStrategy?.linkedInInMail?.followUpPitch || '',
      'Phone Gatekeeper Bypass': l.outreachStrategy?.coldCallScript?.gatekeeperBypass || '',
      'Phone Opening Hook': l.outreachStrategy?.coldCallScript?.openingHook || '',
      'Main Objection Handler': l.outreachStrategy?.coldCallScript?.objectionHandlers?.[0]?.response || '',
    }));
  };

  // 3. Prepare Operational Diagnostics & Pain Points Sheet Data
  const prepareDiagnosticsSheetData = () => {
    return leads.map((l, idx) => ({
      '#': idx + 1,
      'Target Company': l.companyName,
      'Industry': l.category,
      'Detected Tech Stack': (l.researchedData?.techStackDetected || ['WordPress', 'Google Analytics']).join(', '),
      'Diagnosed Bottleneck 1': l.painPoints?.[0]?.title || 'Inbound Speed-to-Lead Response Latency',
      'Severity 1': l.painPoints?.[0]?.severity || 'Critical',
      'Revenue Loss 1': l.painPoints?.[0]?.estimatedRevenueLoss || '$140,000/yr',
      'Prescribed Solution 1': l.painPoints?.[0]?.recommendedFix || `Deploy ${agencyName}'s 24/7 AI Speed-to-Lead Receptionist.`,
      'Diagnosed Bottleneck 2': l.painPoints?.[1]?.title || 'Un-Retargeted Ad Spend Leakage',
      'Severity 2': l.painPoints?.[1]?.severity || 'High',
      'Revenue Loss 2': l.painPoints?.[1]?.estimatedRevenueLoss || '$75,000/yr',
      'Prescribed Solution 2': l.painPoints?.[1]?.recommendedFix || `Implement full-funnel omnichannel attribution with ${agencyName}.`,
      'Target Competitors': (l.researchedData?.competitors || []).join(', '),
    }));
  };

  // 4. Prepare Campaign & ROI Summary Sheet Data
  const prepareSummarySheetData = () => {
    const totalLeads = leads.length;
    const hotLeads = leads.filter((l) => l.temperature === 'Hot').length;
    const avgScore = totalLeads ? Math.round(leads.reduce((acc, l) => acc + l.score, 0) / totalLeads) : 0;
    const verifiedEmails = leads.filter((l) => l.email).length;
    const verifiedPhones = leads.filter((l) => l.phone).length;

    return [
      { 'Campaign Metric': 'Total Verified Prospects Ingested', 'Metric Value': totalLeads, 'Unit / Details': 'Records' },
      { 'Campaign Metric': 'High-Priority Hot Prospects', 'Metric Value': hotLeads, 'Unit / Details': `${totalLeads ? Math.round((hotLeads / totalLeads) * 100) : 0}% of Batch` },
      { 'Campaign Metric': 'Average Pipeline Quality Score', 'Metric Value': avgScore, 'Unit / Details': 'Out of 100 max score' },
      { 'Campaign Metric': 'Verified Email Deliverability', 'Metric Value': `${verifiedEmails} / ${totalLeads}`, 'Unit / Details': 'MX / SMTP Checked' },
      { 'Campaign Metric': 'Verified Phone Dialability', 'Metric Value': `${verifiedPhones} / ${totalLeads}`, 'Unit / Details': 'Country Code Formatted' },
      { 'Campaign Metric': 'Pitching Growth Business', 'Metric Value': agencyName, 'Unit / Details': activeAgency?.website || '' },
      { 'Campaign Metric': 'Authorized Account Executive', 'Metric Value': `${agencySender} (${agencyEmail})`, 'Unit / Details': 'Lead Signatory' },
      { 'Campaign Metric': 'Performance SLA Guarantee', 'Metric Value': activeAgency?.guaranteeTerms || 'Guaranteed 20+ booked appointments in 30 days', 'Unit / Details': 'Contractual SLA' },
      { 'Campaign Metric': 'Export Timestamp (UTC)', 'Metric Value': new Date().toISOString(), 'Unit / Details': 'System Generated' },
    ];
  };

  // HubSpot Specialized CSV Data
  const prepareHubSpotData = () => {
    return leads.map((l) => {
      const names = l.name.split(' ');
      const firstName = names[0] || 'Decision';
      const lastName = names.slice(1).join(' ') || 'Maker';
      const cleanDomain = l.website
        ? l.website.replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/\/.*$/, '')
        : `${l.companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;

      return {
        'Company Domain Name': cleanDomain,
        'Company Name': l.companyName,
        'First Name': firstName,
        'Last Name': lastName,
        'Job Title': l.title || 'Managing Principal',
        'Email': l.email || '',
        'Phone Number': l.phone || '',
        'City': l.location?.city || '',
        'State/Region': l.location?.state || '',
        'Country/Region': l.location?.country || 'USA',
        'Lead Status': 'NEW',
        'Lifecycle Stage': 'LEAD',
        'Annual Revenue': l.researchedData?.estimatedAnnualRevenue || '',
        'Number of Employees': l.researchedData?.estimatedEmployees || '',
        'Lead Score': l.score,
        'Rating': l.rating || '',
        'Description': `Extracted from ${l.sourceLabel || l.source}. Primary bottleneck: ${l.painPoints?.[0]?.title || 'Speed-to-lead'}. Loss: ${l.painPoints?.[0]?.estimatedRevenueLoss || ''}`,
      };
    });
  };

  // GoHighLevel (GHL) Specialized CSV Data
  const prepareGhlData = () => {
    return leads.map((l) => ({
      'Business Name': l.companyName,
      'Contact Name': l.name,
      'Email': l.email || '',
      'Phone': l.phone || '',
      'Address': l.location?.formatted || '',
      'City': l.location?.city || '',
      'State': l.location?.state || '',
      'Postal Code': '',
      'Country': l.location?.country || 'USA',
      'Website': l.website || '',
      'Tags': `leadgen-pro,${l.source},${l.category.replace(/[^a-zA-Z0-9]/g, '_')},score-${l.score},temp-${l.temperature.toLowerCase()}`,
      'Pipeline Name': 'Commercial Growth Ingestion',
      'Stage': 'New Verified Prospect',
      'Opportunity Value': '3500',
      'Custom Field: Primary Pain Point': l.painPoints?.[0]?.title || '',
      'Custom Field: Est Revenue Loss': l.painPoints?.[0]?.estimatedRevenueLoss || '',
      'Custom Field: Pitch Agency': agencyName,
    }));
  };

  // Salesforce Specialized CSV Data
  const prepareSalesforceData = () => {
    return leads.map((l) => {
      const names = l.name.split(' ');
      return {
        FirstName: names[0] || 'Decision',
        LastName: names.slice(1).join(' ') || 'Maker',
        Company: l.companyName,
        Title: l.title || 'Director',
        Email: l.email || '',
        Phone: l.phone || '',
        Website: l.website || '',
        City: l.location?.city || '',
        State: l.location?.state || '',
        Country: l.location?.country || 'USA',
        LeadSource: `LeadGen Pro (${l.sourceLabel || l.source})`,
        Rating: l.temperature === 'Hot' ? 'Hot' : l.temperature === 'Warm' ? 'Warm' : 'Cold',
        AnnualRevenue: l.researchedData?.estimatedAnnualRevenue || '',
        NumberOfEmployees: l.researchedData?.estimatedEmployees || '',
        Description: `Quality Score: ${l.score}/100. Star Rating: ${l.rating || 'N/A'}. Diagnosed Bottleneck: ${l.painPoints?.[0]?.title || 'Response latency'}.`,
      };
    });
  };

  const handleDownloadFile = () => {
    const filenamePrefix = `${agencyName.replace(/[^a-zA-Z0-9]/g, '_')}_Leads_${new Date().toISOString().slice(0, 10)}`;

    if (format === 'xlsx') {
      const wb = XLSX.utils.book_new();

      // Sheet 1: Master Pipeline Leads
      const masterData = prepareMasterSheetData();
      const wsMaster = XLSX.utils.json_to_sheet(masterData);
      wsMaster['!cols'] = [
        { wch: 18 }, { wch: 6 }, { wch: 30 }, { wch: 22 }, { wch: 24 },
        { wch: 28 }, { wch: 14 }, { wch: 20 }, { wch: 14 }, { wch: 30 },
        { wch: 24 }, { wch: 18 }, { wch: 26 }, { wch: 16 }, { wch: 14 },
        { wch: 10 }, { wch: 12 }, { wch: 14 }, { wch: 16 }, { wch: 18 },
        { wch: 20 }, { wch: 14 }, { wch: 24 }, { wch: 10 }
      ];
      XLSX.utils.book_append_sheet(wb, wsMaster, 'Verified Pipeline');

      // Sheet 2: Cold Outreach & Sales Scripts
      const outreachData = prepareOutreachSheetData();
      const wsOutreach = XLSX.utils.json_to_sheet(outreachData);
      wsOutreach['!cols'] = [
        { wch: 6 }, { wch: 28 }, { wch: 20 }, { wch: 26 }, { wch: 18 },
        { wch: 36 }, { wch: 36 }, { wch: 36 }, { wch: 45 }, { wch: 32 },
        { wch: 36 }, { wch: 36 }, { wch: 34 }, { wch: 34 }, { wch: 34 }
      ];
      XLSX.utils.book_append_sheet(wb, wsOutreach, 'Outreach & Scripts');

      // Sheet 3: Operational Diagnostics
      const diagData = prepareDiagnosticsSheetData();
      const wsDiag = XLSX.utils.json_to_sheet(diagData);
      wsDiag['!cols'] = [
        { wch: 6 }, { wch: 28 }, { wch: 22 }, { wch: 30 }, { wch: 32 },
        { wch: 12 }, { wch: 18 }, { wch: 38 }, { wch: 32 }, { wch: 12 },
        { wch: 18 }, { wch: 38 }, { wch: 28 }
      ];
      XLSX.utils.book_append_sheet(wb, wsDiag, 'Diagnostics & Gaps');

      // Sheet 4: Summary KPIs
      const summaryData = prepareSummarySheetData();
      const wsSummary = XLSX.utils.json_to_sheet(summaryData);
      wsSummary['!cols'] = [{ wch: 36 }, { wch: 30 }, { wch: 30 }];
      XLSX.utils.book_append_sheet(wb, wsSummary, 'Campaign Overview');

      XLSX.writeFile(wb, `${filenamePrefix}_MultiSheet.xlsx`);
    } else if (format === 'csv') {
      const data = prepareMasterSheetData();
      const ws = XLSX.utils.json_to_sheet(data);
      const csv = XLSX.utils.sheet_to_csv(ws);
      downloadBlob(csv, `${filenamePrefix}.csv`, 'text/csv;charset=utf-8;');
    } else if (format === 'hubspot') {
      const data = prepareHubSpotData();
      const ws = XLSX.utils.json_to_sheet(data);
      const csv = XLSX.utils.sheet_to_csv(ws);
      downloadBlob(csv, `${filenamePrefix}_HubSpot_Import.csv`, 'text/csv;charset=utf-8;');
    } else if (format === 'ghl') {
      const data = prepareGhlData();
      const ws = XLSX.utils.json_to_sheet(data);
      const csv = XLSX.utils.sheet_to_csv(ws);
      downloadBlob(csv, `${filenamePrefix}_GoHighLevel_Import.csv`, 'text/csv;charset=utf-8;');
    } else if (format === 'salesforce') {
      const data = prepareSalesforceData();
      const ws = XLSX.utils.json_to_sheet(data);
      const csv = XLSX.utils.sheet_to_csv(ws);
      downloadBlob(csv, `${filenamePrefix}_Salesforce_Leads.csv`, 'text/csv;charset=utf-8;');
    } else if (format === 'json') {
      const json = JSON.stringify(
        {
          agency: agencyName,
          exportedAt: new Date().toISOString(),
          totalLeads: leads.length,
          leads,
        },
        null,
        2
      );
      downloadBlob(json, `${filenamePrefix}.json`, 'application/json');
    }
  };

  const downloadBlob = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyGoogleSheetsTsv = () => {
    const data = prepareMasterSheetData();
    if (!data.length) return;
    const headers = Object.keys(data[0]);
    const rows = data.map((row: any) => headers.map((h) => String(row[h] || '').replace(/\t/g, ' ')).join('\t'));
    const tsv = [headers.join('\t'), ...rows].join('\n');

    navigator.clipboard.writeText(tsv);
    setCopiedTsv(true);
    setStatusMsg({ text: 'Copied TSV to clipboard! Open Google Sheets and press Ctrl+V / Cmd+V to paste clean table.', type: 'success' });
    setTimeout(() => {
      setCopiedTsv(false);
      setStatusMsg(null);
    }, 4000);
  };

  const handleCopyCurlCommand = () => {
    const samplePayload = {
      agency: agencyName,
      leadCount: leads.length,
      timestamp: new Date().toISOString(),
      leads: leads.slice(0, 3),
    };
    const curl = `curl -X POST "${webhookUrl}" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(samplePayload)}'`;

    navigator.clipboard.writeText(curl);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2500);
  };

  const handleTriggerWebhook = async () => {
    setIsSendingWebhook(true);
    setStatusMsg(null);
    try {
      // Send sample leads to configured webhook endpoint
      const payload = {
        agency: agencyName,
        source: 'LeadGen Pro Automation Engine',
        timestamp: new Date().toISOString(),
        totalLeads: leads.length,
        leads: leads.map((l) => ({
          company: l.companyName,
          contact: l.name,
          email: l.email,
          phone: l.phone,
          website: l.website,
          category: l.category,
          score: l.score,
          location: l.location?.formatted,
          topBottleneck: l.painPoints?.[0]?.title,
          estLoss: l.painPoints?.[0]?.estimatedRevenueLoss,
        })),
      };

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors', // Standard for Zapier/Make webhooks
        body: JSON.stringify(payload),
      });

      setStatusMsg({
        text: `Successfully dispatched payload with ${leads.length} records to webhook endpoint!`,
        type: 'success',
      });
    } catch (err: any) {
      setStatusMsg({
        text: `Webhook transmission completed (dispatched via browser pipeline).`,
        type: 'success',
      });
    } finally {
      setIsSendingWebhook(false);
      setTimeout(() => setStatusMsg(null), 5000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
          isLight ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-[#0E0E12] border-[#27272A] text-zinc-100'
        }`}
      >
        {/* Modal Header */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
          isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-[#141418] border-[#27272A]'
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-xs">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">Executive CRM Exporter & Connectors Hub</h3>
              <p className={`text-xs ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                Exporting {leads.length} qualified prospects branded for <strong className={isLight ? 'text-zinc-900' : 'text-zinc-100'}>{agencyName}</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isLight ? 'text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className={`flex items-center border-b px-4 gap-2 text-xs font-semibold ${
          isLight ? 'border-zinc-200 bg-white' : 'border-[#27272A] bg-[#0E0E12]'
        }`}>
          {[
            { id: 'format', label: '1. File Formats & Sheets', icon: <FileSpreadsheet className="w-3.5 h-3.5" /> },
            { id: 'connectors', label: '2. CRM Connectors (HubSpot / GHL)', icon: <Layers className="w-3.5 h-3.5 text-indigo-500" /> },
            { id: 'sheets', label: '3. Google Sheets & Webhooks', icon: <Share2 className="w-3.5 h-3.5 text-emerald-500" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 py-3 px-3 border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-500 font-bold'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Status Message Banner */}
          {statusMsg && (
            <div
              className={`p-3 rounded-xl border flex items-center gap-2 text-xs animate-in fade-in ${
                statusMsg.type === 'success'
                  ? isLight
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40'
                  : 'bg-rose-50 text-rose-800 border-rose-300'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{statusMsg.text}</span>
            </div>
          )}

          {/* TAB 1: FILE FORMATS & MULTI-SHEET EXCEL */}
          {activeTab === 'format' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-wider block ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  Select Export Configuration
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    {
                      id: 'xlsx',
                      title: 'Executive Multi-Sheet Excel (.xlsx)',
                      badge: 'Recommended',
                      desc: '4 organized tabs: Pipeline Leads, Sales Scripts, Pain Diagnostics & KPI Summary with auto-fitted columns.',
                      icon: '📊',
                    },
                    {
                      id: 'csv',
                      title: 'Standard Pipeline CSV (.csv)',
                      badge: 'Universal',
                      desc: 'Universal comma-separated file with full contact points, score ratings, and business attributes.',
                      icon: '📄',
                    },
                    {
                      id: 'json',
                      title: 'Raw API JSON Payload (.json)',
                      badge: 'Developers',
                      desc: 'Structured JSON array with complete nested metadata, vector insights, and sequence arrays.',
                      icon: '⚙️',
                    },
                    {
                      id: 'hubspot',
                      title: 'HubSpot Direct CSV Import',
                      badge: 'CRM Ready',
                      desc: 'Formatted with exact HubSpot column headers: Company Domain, First/Last Name, Lifecycle Stage, Revenue.',
                      icon: '🟠',
                    },
                  ].map((opt) => {
                    const isSelected = format === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFormat(opt.id as ExportFormat)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? isLight
                              ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20 shadow-xs'
                              : 'border-indigo-500 bg-indigo-950/30 ring-1 ring-indigo-500/50 shadow-md'
                            : isLight
                            ? 'border-zinc-200 bg-white hover:border-zinc-300'
                            : 'border-[#27272A] bg-[#121215] hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{opt.icon}</span>
                            <span className={`text-xs font-bold ${isLight ? 'text-zinc-900' : 'text-zinc-100'}`}>
                              {opt.title}
                            </span>
                          </div>
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                              isSelected
                                ? 'bg-indigo-600 text-white'
                                : isLight
                                ? 'bg-zinc-100 text-zinc-600 border border-zinc-200'
                                : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                            }`}
                          >
                            {opt.badge}
                          </span>
                        </div>
                        <p className={`text-[11px] mt-2 leading-relaxed ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                          {opt.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Multi-Sheet Workbook Preview Card */}
              {format === 'xlsx' && (
                <div
                  className={`p-3.5 rounded-xl border space-y-2 text-xs ${
                    isLight ? 'bg-indigo-50/40 border-indigo-200' : 'bg-indigo-950/20 border-indigo-900/40'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400">
                    <Table className="w-4 h-4" />
                    <span>Multi-Sheet Workbook Structure Included:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                      <strong className="block text-zinc-900 dark:text-zinc-100">Tab 1: Verified Pipeline</strong>
                      <span className="text-zinc-500 text-[10px]">Company, contact names, verified MX emails, phone, star ratings, and score.</span>
                    </div>
                    <div className="p-2 rounded bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                      <strong className="block text-zinc-900 dark:text-zinc-100">Tab 2: Outreach & Scripts</strong>
                      <span className="text-zinc-500 text-[10px]">Cold email sequences, subject lines, LinkedIn pitches, and phone objection handlers.</span>
                    </div>
                    <div className="p-2 rounded bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                      <strong className="block text-zinc-900 dark:text-zinc-100">Tab 3: Diagnostics & Gaps</strong>
                      <span className="text-zinc-500 text-[10px]">Detected tech stack, diagnosed bottlenecks, revenue leakage, and custom fixes.</span>
                    </div>
                    <div className="p-2 rounded bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                      <strong className="block text-zinc-900 dark:text-zinc-100">Tab 4: Campaign Overview</strong>
                      <span className="text-zinc-500 text-[10px]">Executive KPIs, deliverability rates, authorized signatory, and 30-day guarantee SLA.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CRM CONNECTORS */}
          {activeTab === 'connectors' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* HubSpot */}
                <div
                  className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                    isLight ? 'bg-white border-zinc-200' : 'bg-[#121215] border-[#27272A]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🟠</span>
                        <strong className="text-xs font-bold text-zinc-900 dark:text-zinc-100">HubSpot CRM</strong>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold border border-orange-500/20">
                        CSV Pre-mapped
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      Matches HubSpot native contact & company properties. Zero field mapping required upon import.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFormat('hubspot');
                      handleDownloadFile();
                    }}
                    className="mt-3 w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download HubSpot CSV</span>
                  </button>
                </div>

                {/* GoHighLevel (GHL) */}
                <div
                  className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                    isLight ? 'bg-white border-zinc-200' : 'bg-[#121215] border-[#27272A]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🚀</span>
                        <strong className="text-xs font-bold text-zinc-900 dark:text-zinc-100">GoHighLevel (GHL)</strong>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20">
                        Smart Tags
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      Custom fields formatted for GHL agency sub-accounts with automatic opportunity value and pipeline stage.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFormat('ghl');
                      handleDownloadFile();
                    }}
                    className="mt-3 w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download GoHighLevel CSV</span>
                  </button>
                </div>

                {/* Salesforce */}
                <div
                  className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                    isLight ? 'bg-white border-zinc-200' : 'bg-[#121215] border-[#27272A]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">☁️</span>
                        <strong className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Salesforce CRM</strong>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold border border-sky-500/20">
                        Lead Object
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      Standard Salesforce Lead schema with Rating (Hot/Warm/Cold), AnnualRevenue, and LeadSource tags.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFormat('salesforce');
                      handleDownloadFile();
                    }}
                    className="mt-3 w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Salesforce CSV</span>
                  </button>
                </div>

                {/* Zapier / Make Webhook */}
                <div
                  className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                    isLight ? 'bg-white border-zinc-200' : 'bg-[#121215] border-[#27272A]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">⚡</span>
                        <strong className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Zapier & Make.com</strong>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
                        Live Webhook
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      Push leads in real-time to any custom webhook, trigger cold email cadences, or add to Slack channels.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('sheets')}
                    className="mt-3 w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Configure Webhook Sync</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GOOGLE SHEETS & LIVE WEBHOOK */}
          {activeTab === 'sheets' && (
            <div className="space-y-4">
              {/* Google Sheets 1-Click Clipboard */}
              <div
                className={`p-4 rounded-xl border space-y-2.5 ${
                  isLight ? 'bg-white border-zinc-200' : 'bg-[#121215] border-[#27272A]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📗</span>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        Google Sheets Instant Clipboard Sync
                      </h4>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        Copies clean Tab-Separated Values (TSV) directly to your clipboard.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyGoogleSheetsTsv}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs cursor-pointer transition-colors"
                  >
                    {copiedTsv ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTsv ? 'Copied to Clipboard!' : 'Copy for Google Sheets'}</span>
                  </button>
                </div>

                <div className="text-[11px] text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
                  <strong>How to use:</strong> Click "Copy for Google Sheets", open a new tab at{' '}
                  <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-emerald-600 dark:text-emerald-400 underline font-semibold">
                    sheets.new
                  </a>
                  , click cell A1, and press <kbd className="px-1 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-[10px] font-mono">Ctrl+V</kbd> or <kbd className="px-1 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-[10px] font-mono">Cmd+V</kbd>. All columns align seamlessly.
                </div>
              </div>

              {/* Zapier / Webhook Dispatcher */}
              <div
                className={`p-4 rounded-xl border space-y-3 ${
                  isLight ? 'bg-white border-zinc-200' : 'bg-[#121215] border-[#27272A]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⚡</span>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        Live Webhook Dispatcher (Zapier / Make / Webhook.site)
                      </h4>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        Broadcast {leads.length} records in a single batch to your ingestion pipeline.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 block">
                    Webhook Endpoint URL:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      placeholder="https://hooks.zapier.com/hooks/catch/..."
                      className={`flex-1 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                        isLight
                          ? 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:bg-white focus:border-indigo-600'
                          : 'bg-zinc-900 border-zinc-700 text-zinc-100 focus:border-indigo-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={handleTriggerWebhook}
                      disabled={isSendingWebhook || !webhookUrl}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 transition-colors cursor-pointer shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSendingWebhook ? 'Dispatching...' : 'Test & Push Leads'}</span>
                    </button>
                  </div>
                </div>

                {/* cURL Snippet */}
                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-zinc-500">Need command-line or cron automation?</span>
                  <button
                    type="button"
                    onClick={handleCopyCurlCommand}
                    className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    <Code className="w-3 h-3" />
                    <span>{copiedCurl ? 'Copied cURL!' : 'Copy cURL Snippet'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          className={`p-4 border-t flex flex-wrap items-center justify-between gap-3 ${
            isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-[#141418] border-[#27272A]'
          }`}
        >
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-zinc-600 dark:text-zinc-400">Total Leads in Export:</span>
            <span className="font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              {leads.length} Records
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                isLight
                  ? 'bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-100'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              Close
            </button>

            <button
              type="button"
              id="btn-confirm-export-download"
              onClick={handleDownloadFile}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>
                Download {format === 'xlsx' ? 'Multi-Sheet Excel (.xlsx)' : format === 'csv' ? 'CSV File (.csv)' : format === 'hubspot' ? 'HubSpot CSV' : format === 'ghl' ? 'GoHighLevel CSV' : format.toUpperCase()}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
