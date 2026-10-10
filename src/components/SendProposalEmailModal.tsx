import React, { useState } from 'react';
import {
  X,
  Send,
  Mail,
  Building,
  CheckCircle2,
  AlertCircle,
  Settings2,
  FileText,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { Lead, AgencyProfile } from '../types';

interface SendProposalEmailModalProps {
  lead: Lead;
  activeAgency?: AgencyProfile;
  theme?: 'dark' | 'light';
  onClose: () => void;
  onSuccess?: () => void;
}

export const SendProposalEmailModal: React.FC<SendProposalEmailModalProps> = ({
  lead,
  activeAgency,
  theme = 'dark',
  onClose,
  onSuccess,
}) => {
  const isLight = theme === 'light';
  const agencyName = activeAgency?.name || 'ADS RESULTS 24/7';
  const agencySender = activeAgency?.senderName || 'Marcus Vance';
  const agencyRole = activeAgency?.senderRole || 'Head of Client Growth & Partner';
  const agencyEmail = activeAgency?.senderEmail || 'marcus@adsresults247.com';
  const agencyWebsite = activeAgency?.website || 'https://adsresults247.com';

  const [toEmail, setToEmail] = useState(lead.email || '');
  const [toName, setToName] = useState(lead.name || '');
  const [subject, setSubject] = useState(
    `Strategic Growth Proposal & AI Pipeline Architecture for ${lead.companyName}`
  );
  const [introMessage, setIntroMessage] = useState(
    `Hi ${lead.name},\n\nI prepared a comprehensive, personalized growth proposal for ${lead.companyName} based on our speed-to-lead and digital pipeline audit in ${lead.location.city}.\n\nBelow is the complete executive blueprint, deliverables roadmap, and performance guarantee from ${agencyName}.\n\nLet me know if you would like to schedule a 10-minute briefing this week.`
  );

  const [showSmtpSettings, setShowSmtpSettings] = useState(false);
  const [customSmtp, setCustomSmtp] = useState({
    host: '',
    port: 587,
    secure: false,
    user: '',
    pass: '',
  });

  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState<{
    success?: boolean;
    message?: string;
    messageId?: string;
    previewUrl?: string;
    error?: string;
  } | null>(null);

  const [copiedLink, setCopiedLink] = useState(false);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!toEmail) return;

    setIsSending(true);
    setSendResult(null);

    const emailPayload: any = {
      to: toEmail,
      toName,
      subject,
      message: introMessage,
      leadData: lead,
      activeAgency,
    };

    if (customSmtp.host && customSmtp.user) {
      emailPayload.customSmtp = customSmtp;
    }

    try {
      const res = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailPayload),
      });
      const data = await res.json();

      if (data.success) {
        setSendResult({
          success: true,
          message: data.message || 'Proposal delivered successfully.',
          messageId: data.messageId,
          previewUrl: data.previewUrl,
        });
        if (onSuccess) onSuccess();
      } else {
        setSendResult({
          success: false,
          error: data.error || 'Failed to dispatch email. Please check configuration.',
        });
      }
    } catch (err: any) {
      setSendResult({
        success: false,
        error: err.message || 'Network error sending proposal email.',
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleCopyPreview = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className={`relative w-full max-w-2xl max-h-[92vh] rounded-xl border flex flex-col overflow-hidden shadow-2xl ${
        isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#09090B] border-[#27272A] text-zinc-100'
      }`}>
        
        {/* Modal Top Header */}
        <div className={`flex items-center justify-between px-5 py-3.5 border-b ${
          isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-[#121215] border-[#27272A]'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight">
                Live Client Email Dispatcher
              </h2>
              <p className={`text-xs ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                Send branded proposal to <strong className={isLight ? 'text-zinc-800' : 'text-zinc-200'}>{lead.companyName}</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isLight ? 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body / Email Form */}
        <form onSubmit={handleSendEmail} className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Status / Success Alert */}
          {sendResult && (
            <div className={`p-4 rounded-xl border text-xs space-y-2 ${
              sendResult.success
                ? isLight
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : isLight
                  ? 'bg-rose-50 border-rose-300 text-rose-900'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                {sendResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-rose-500" />}
                <span>{sendResult.success ? 'Proposal Delivered Successfully!' : 'Dispatch Error'}</span>
              </div>
              <p className="leading-relaxed">
                {sendResult.success ? sendResult.message : sendResult.error}
              </p>
              {sendResult.messageId && (
                <div className="text-[11px] font-mono opacity-80">
                  Message-ID: {sendResult.messageId}
                </div>
              )}
              {sendResult.previewUrl && (
                <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between gap-2">
                  <a
                    href={sendResult.previewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 font-bold text-indigo-500 hover:underline"
                  >
                    <span>View Rendered Email in Mail Inbox Preview</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopyPreview(sendResult.previewUrl!)}
                    className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-emerald-600/20 hover:bg-emerald-600/30 cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedLink ? 'Copied' : 'Copy Preview Link'}</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Sender & Recipient Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                isLight ? 'text-zinc-600' : 'text-zinc-400'
              }`}>
                Sender (From)
              </label>
              <div className={`p-2.5 rounded-lg border text-xs flex items-center gap-2 ${
                isLight ? 'bg-zinc-100 border-zinc-300 text-zinc-800' : 'bg-[#18181C] border-[#27272A] text-zinc-300'
              }`}>
                <Building className="w-3.5 h-3.5 text-indigo-500" />
                <div className="truncate">
                  <span className="font-semibold">{agencySender}</span> ({agencyName})
                  <div className={`text-[10px] ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>{agencyEmail}</div>
                </div>
              </div>
            </div>

            <div>
              <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                isLight ? 'text-zinc-600' : 'text-zinc-400'
              }`}>
                Recipient Email (To) *
              </label>
              <input
                type="email"
                required
                value={toEmail}
                onChange={(e) => setToEmail(e.target.value)}
                placeholder="decision.maker@company.com"
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
                  isLight ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-[#18181C] border-[#27272A] text-white'
                }`}
              />
            </div>
          </div>

          {/* Recipient Name & Subject Line */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                isLight ? 'text-zinc-600' : 'text-zinc-400'
              }`}>
                Recipient Name
              </label>
              <input
                type="text"
                value={toName}
                onChange={(e) => setToName(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
                  isLight ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-[#18181C] border-[#27272A] text-white'
                }`}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                isLight ? 'text-zinc-600' : 'text-zinc-400'
              }`}>
                Subject Line *
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
                  isLight ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-[#18181C] border-[#27272A] text-white'
                }`}
              />
            </div>
          </div>

          {/* Intro Message */}
          <div>
            <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
              isLight ? 'text-zinc-600' : 'text-zinc-400'
            }`}>
              Personalized Intro Message & Cover Note
            </label>
            <textarea
              rows={4}
              value={introMessage}
              onChange={(e) => setIntroMessage(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border text-xs focus:ring-2 focus:ring-indigo-500 outline-none transition-all leading-relaxed font-sans ${
                isLight ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-[#18181C] border-[#27272A] text-white'
              }`}
            />
          </div>

          {/* Attached Proposal Embed Info */}
          <div className={`p-3 rounded-lg border flex items-center justify-between text-xs ${
            isLight ? 'bg-indigo-50/70 border-indigo-200 text-indigo-950' : 'bg-indigo-950/20 border-indigo-500/30 text-indigo-200'
          }`}>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-500" />
              <div>
                <span className="font-bold">Attached Document:</span> Complete Interactive HTML & Responsive Email Proposal
                <div className={`text-[10px] ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  Includes diagnosed bottlenecks, ROI model, 30-day roadmap & SLA performance guarantee.
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 border border-indigo-500/30 text-indigo-600 dark:text-indigo-300 uppercase">
              Full HTML
            </span>
          </div>

          {/* Custom SMTP Configuration Toggle */}
          <div className="pt-2 border-t border-zinc-200 dark:border-[#27272A]">
            <button
              type="button"
              onClick={() => setShowSmtpSettings(!showSmtpSettings)}
              className={`flex items-center gap-1.5 text-xs font-semibold hover:underline cursor-pointer ${
                isLight ? 'text-zinc-600 hover:text-zinc-900' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>{showSmtpSettings ? 'Hide Custom SMTP Settings' : 'Configure Custom SMTP Server (Optional)'}</span>
            </button>

            {showSmtpSettings && (
              <div className={`mt-3 p-3 rounded-lg border space-y-3 text-xs animate-in fade-in duration-100 ${
                isLight ? 'bg-zinc-50 border-zinc-300' : 'bg-[#141418] border-[#27272A]'
              }`}>
                <p className={`text-[11px] ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  Leave blank to use the built-in verified mail server and ethereal test sandbox with live browser inbox view.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold uppercase mb-0.5">SMTP Host</label>
                    <input
                      type="text"
                      placeholder="smtp.gmail.com / smtp.sendgrid.net"
                      value={customSmtp.host}
                      onChange={(e) => setCustomSmtp({ ...customSmtp, host: e.target.value })}
                      className={`w-full px-2.5 py-1.5 rounded border text-xs ${
                        isLight ? 'bg-white border-zinc-300' : 'bg-[#18181C] border-[#27272A] text-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase mb-0.5">Port</label>
                    <input
                      type="number"
                      value={customSmtp.port}
                      onChange={(e) => setCustomSmtp({ ...customSmtp, port: Number(e.target.value) })}
                      className={`w-full px-2.5 py-1.5 rounded border text-xs ${
                        isLight ? 'bg-white border-zinc-300' : 'bg-[#18181C] border-[#27272A] text-white'
                      }`}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase mb-0.5">SMTP Username</label>
                    <input
                      type="text"
                      placeholder="your-email@domain.com"
                      value={customSmtp.user}
                      onChange={(e) => setCustomSmtp({ ...customSmtp, user: e.target.value })}
                      className={`w-full px-2.5 py-1.5 rounded border text-xs ${
                        isLight ? 'bg-white border-zinc-300' : 'bg-[#18181C] border-[#27272A] text-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase mb-0.5">SMTP Password / App Key</label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={customSmtp.pass}
                      onChange={(e) => setCustomSmtp({ ...customSmtp, pass: e.target.value })}
                      className={`w-full px-2.5 py-1.5 rounded border text-xs ${
                        isLight ? 'bg-white border-zinc-300' : 'bg-[#18181C] border-[#27272A] text-white'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Actions */}
          <div className={`flex flex-wrap items-center justify-between gap-3 pt-3 border-t ${
            isLight ? 'border-zinc-200' : 'border-[#27272A]'
          }`}>
            <a
              href={`mailto:${encodeURIComponent(toEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(introMessage)}`}
              className={`text-xs hover:underline flex items-center gap-1 ${
                isLight ? 'text-zinc-600' : 'text-zinc-400'
              }`}
            >
              <ExternalLink className="w-3 h-3" />
              <span>Open in Desktop Email Client</span>
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                  isLight
                    ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-700'
                    : 'bg-[#18181B] hover:bg-[#27272A] border-[#27272A] text-zinc-300'
                }`}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSending || !toEmail}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 transition-colors shadow-xs cursor-pointer"
              >
                {isSending ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Transmitting Proposal...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Official Proposal Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
