import React, { useState, useRef } from 'react';
import {
  AgencyProfile,
  AgencyPricingTier,
} from '../types';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  Globe,
  Sparkles,
  ShieldCheck,
  X,
  ArrowRight,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

interface AgencyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  agencies: AgencyProfile[];
  activeAgency: AgencyProfile;
  onSelectActiveAgency: (agency: AgencyProfile) => void;
  onSaveAgency: (agency: AgencyProfile) => void;
  onDeleteAgency: (agencyId: string) => void;
}

export const AgencyProfileModal: React.FC<AgencyProfileModalProps> = ({
  isOpen,
  onClose,
  agencies,
  activeAgency,
  onSelectActiveAgency,
  onSaveAgency,
  onDeleteAgency,
}) => {
  const [editingAgency, setEditingAgency] = useState<AgencyProfile | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [website, setWebsite] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderRole, setSenderRole] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [companyBio, setCompanyBio] = useState('');
  const [servicesInput, setServicesInput] = useState('');
  const [guaranteeTerms, setGuaranteeTerms] = useState('');
  const [pitchTone, setPitchTone] = useState<AgencyProfile['pitchTone']>('Executive & Data-Driven');
  const [pricingTiers, setPricingTiers] = useState<AgencyPricingTier[]>([]);

  if (!isOpen) return null;

  const startEdit = (agency: AgencyProfile) => {
    setEditingAgency(agency);
    setIsCreatingNew(false);
    setName(agency.name);
    setTagline(agency.tagline);
    setWebsite(agency.website);
    setLogoUrl(agency.logoUrl || '');
    setSenderName(agency.senderName);
    setSenderRole(agency.senderRole);
    setSenderEmail(agency.senderEmail);
    setSenderPhone(agency.senderPhone || '');
    setCompanyBio(agency.companyBio);
    setServicesInput(agency.coreServices.join('\n'));
    setGuaranteeTerms(agency.guaranteeTerms);
    setPitchTone(agency.pitchTone);
    setPricingTiers(agency.pricingTiers || []);
  };

  const startCreate = () => {
    setEditingAgency(null);
    setIsCreatingNew(true);
    setName('');
    setTagline('Performance Growth & AI Sales Automation');
    setWebsite('https://');
    setLogoUrl('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=256&q=80');
    setSenderName('Alex Morgan');
    setSenderRole('Head of Growth');
    setSenderEmail('alex@company.com');
    setSenderPhone('+1 (800) 555-0199');
    setCompanyBio('Full-service revenue generation and AI automated lead infrastructure agency.');
    setServicesInput(
      'Omnichannel Paid Advertising (Meta & Google Ads)\n24/7 Sub-60s AI Speed-to-Lead Receptionist\nHigh-Converting Landing Pages & Funnel Optimization\nCRM Pipeline Automation & Ingestion'
    );
    setGuaranteeTerms('Guaranteed minimum 15 qualified appointments in first 30 days or work free.');
    setPitchTone('Executive & Data-Driven');
    setPricingTiers([
      {
        name: 'Growth Starter',
        price: '$2,500',
        billingPeriod: '/month',
        description: 'Single channel ad management with 24/7 AI lead response bot.',
        features: ['Meta Ads Management', '24/7 AI Concierge', 'Monthly Strategy Reviews'],
      },
      {
        name: 'Scale Domination',
        price: '$4,900',
        billingPeriod: '/month',
        description: 'Full-funnel omnichannel acquisition with appointment booking guarantee.',
        features: ['Meta + Google Ads', 'AI Voice & SMS Booker', 'Database Reactivation Campaign'],
        highlighted: true,
      },
    ]);
  };

  // PC File Upload Handler for Logo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, SVG, WebP).');
      return;
    }

    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size exceeds 5MB. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setLogoUrl(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const services = servicesInput
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const now = new Date().toISOString();
    const updatedAgency: AgencyProfile = {
      id: editingAgency ? editingAgency.id : `agency_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      tagline: tagline.trim(),
      website: website.trim(),
      logoUrl: logoUrl.trim() || undefined,
      senderName: senderName.trim(),
      senderRole: senderRole.trim(),
      senderEmail: senderEmail.trim(),
      senderPhone: senderPhone.trim() || undefined,
      companyBio: companyBio.trim(),
      coreServices: services.length > 0 ? services : ['Paid Ads Management', 'AI Speed-to-Lead Concierge'],
      pricingTiers: pricingTiers.length > 0 ? pricingTiers : [
        {
          name: 'Growth Acceleration',
          price: '$2,450',
          billingPeriod: '/month',
          description: 'Full-service lead acquisition engine.',
          features: ['Targeted Ads', '24/7 AI Receptionist', 'Weekly Reporting'],
          highlighted: true,
        },
      ],
      guaranteeTerms: guaranteeTerms.trim() || 'Guaranteed verified qualified appointments or work free.',
      caseStudies: editingAgency ? editingAgency.caseStudies : [],
      targetNiches: editingAgency ? editingAgency.targetNiches : ['Real Estate', 'Healthcare', 'Home Services', 'SaaS & Tech'],
      pitchTone,
      isDefault: editingAgency ? editingAgency.isDefault : agencies.length === 0,
      createdAt: editingAgency ? editingAgency.createdAt : now,
      updatedAt: now,
    };

    onSaveAgency(updatedAgency);
    setEditingAgency(null);
    setIsCreatingNew(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-xl border border-[#27272A] bg-[#09090B] shadow-2xl text-zinc-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#27272A] bg-[#121215]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">
                Business & Pitching Agency Profiles
              </h2>
              <p className="text-xs text-zinc-400">
                All generated proposals, cold emails, and audit reports are customized to your selected business.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {/* List of Existing Agencies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Active Business Profiles ({agencies.length})
              </span>
              <button
                type="button"
                id="btn-add-business"
                onClick={startCreate}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Business</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {agencies.map((agency) => {
                const isActive = activeAgency.id === agency.id;
                return (
                  <div
                    key={agency.id}
                    className={`relative p-4 rounded-lg border transition-all ${
                      isActive
                        ? 'border-indigo-500 bg-indigo-950/20 shadow-md ring-1 ring-indigo-500/40'
                        : 'border-[#27272A] bg-[#141418] hover:border-zinc-700'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[9px] font-bold uppercase tracking-wider">
                        <Check className="w-2.5 h-2.5" />
                        <span>Active Pitching</span>
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      {agency.logoUrl ? (
                        <img
                          src={agency.logoUrl}
                          alt={agency.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-lg object-cover border border-[#27272A] shrink-0 bg-zinc-900"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-black text-sm shrink-0">
                          {agency.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}

                      <div className="flex-1 min-w-0 pr-16">
                        <h3 className="font-bold text-sm text-white truncate">{agency.name}</h3>
                        <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">{agency.tagline}</p>
                        
                        <div className="flex items-center gap-3 mt-2 text-[11px] text-zinc-400">
                          {agency.website && (
                            <a
                              href={agency.website}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1 hover:text-indigo-400 truncate"
                            >
                              <Globe className="w-3 h-3 shrink-0" />
                              <span className="truncate">{agency.website.replace(/^https?:\/\//, '')}</span>
                            </a>
                          )}
                          <span className="truncate">• {agency.senderName} ({agency.senderRole})</span>
                        </div>
                      </div>
                    </div>

                    {/* Services Pill Preview */}
                    <div className="mt-3 pt-3 border-t border-[#27272A]/70">
                      <div className="text-[10px] text-zinc-400 font-medium mb-1.5">Core Pitch Offerings:</div>
                      <div className="flex flex-wrap gap-1">
                        {agency.coreServices.slice(0, 3).map((service, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded bg-[#18181B] border border-[#27272A] text-zinc-300 truncate max-w-[200px]"
                          >
                            {service}
                          </span>
                        ))}
                        {agency.coreServices.length > 3 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                            +{agency.coreServices.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#27272A]/50">
                      {!isActive ? (
                        <button
                          type="button"
                          onClick={() => onSelectActiveAgency(agency)}
                          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                        >
                          <span>Switch to this Business</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Currently Selected
                        </span>
                      )}

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => startEdit(agency)}
                          className="p-1 rounded bg-[#18181B] border border-[#27272A] text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors cursor-pointer"
                          title="Edit Business Details"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {agencies.length > 1 && (
                          <button
                            type="button"
                            onClick={() => onDeleteAgency(agency.id)}
                            className="p-1 rounded bg-[#18181B] border border-[#27272A] text-zinc-400 hover:text-rose-400 hover:border-rose-500/40 transition-colors cursor-pointer"
                            title="Delete Business"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form to Create or Edit Agency */}
          {(editingAgency || isCreatingNew) && (
            <div className="p-4 sm:p-5 rounded-xl border border-indigo-500/40 bg-[#121216] space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    {isCreatingNew ? 'Connect New Business Profile' : `Edit ${editingAgency?.name}`}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingAgency(null);
                    setIsCreatingNew(false);
                  }}
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                {/* Logo Upload Section */}
                <div className="p-3.5 rounded-lg border border-[#27272A] bg-[#18181B] space-y-2.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-300">
                    Business Logo (Upload from PC or Direct URL)
                  </label>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Preview Box */}
                    <div className="relative w-16 h-16 rounded-lg bg-zinc-900 border border-[#27272A] flex items-center justify-center overflow-hidden shrink-0">
                      {logoUrl ? (
                        <>
                          <img
                            src={logoUrl}
                            alt="Logo preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setLogoUrl('')}
                            className="absolute top-1 right-1 p-0.5 bg-black/70 rounded text-zinc-300 hover:text-white"
                            title="Remove logo"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </>
                      ) : (
                        <ImageIcon className="w-6 h-6 text-zinc-600" />
                      )}
                    </div>

                    {/* Upload Controls */}
                    <div className="flex-1 w-full space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          accept="image/*"
                          className="hidden"
                          id="agency-logo-upload"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-semibold text-white transition-colors cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Image from PC</span>
                        </button>
                        <span className="text-[11px] text-zinc-500">PNG, JPG, WebP, SVG (Max 5MB)</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-zinc-400 uppercase">OR URL:</span>
                        <input
                          type="url"
                          value={logoUrl}
                          onChange={(e) => setLogoUrl(e.target.value)}
                          placeholder="https://example.com/logo.png"
                          className="flex-1 rounded border border-[#27272A] bg-[#121215] px-2.5 py-1 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                      Business / Agency Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. ADS RESULTS 24/7"
                      className="w-full rounded border border-[#27272A] bg-[#18181B] px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                      Website URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://adsresults247.com"
                      className="w-full rounded border border-[#27272A] bg-[#18181B] px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                      Tagline / Core Value Proposition
                    </label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="e.g. High-Performance Paid Ads & AI Speed-to-Lead Infrastructure"
                      className="w-full rounded border border-[#27272A] bg-[#18181B] px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                      Sender / Signatory Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Marcus Vance"
                      className="w-full rounded border border-[#27272A] bg-[#18181B] px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                      Sender Role / Title
                    </label>
                    <input
                      type="text"
                      value={senderRole}
                      onChange={(e) => setSenderRole(e.target.value)}
                      placeholder="e.g. Head of Client Growth & Partner"
                      className="w-full rounded border border-[#27272A] bg-[#18181B] px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                      Sender Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="marcus@adsresults247.com"
                      className="w-full rounded border border-[#27272A] bg-[#18181B] px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                      Contact Phone Number
                    </label>
                    <input
                      type="text"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      placeholder="+1 (800) 459-2470"
                      className="w-full rounded border border-[#27272A] bg-[#18181B] px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                      Pitch Tone & Personality
                    </label>
                    <select
                      value={pitchTone}
                      onChange={(e) => setPitchTone(e.target.value as any)}
                      className="w-full rounded border border-[#27272A] bg-[#18181B] px-3 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="Executive & Data-Driven">Executive & Data-Driven (CRO Tone)</option>
                      <option value="High-Energy Direct Response">High-Energy Direct Response</option>
                      <option value="Consultative Strategic Partner">Consultative Strategic Partner</option>
                      <option value="B2B Enterprise">B2B Enterprise Formal</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                    Services Offered (1 service per line)
                  </label>
                  <textarea
                    rows={3}
                    value={servicesInput}
                    onChange={(e) => setServicesInput(e.target.value)}
                    placeholder="Paid Ads Management (Meta & Google)&#10;24/7 AI Speed-to-Lead Concierge&#10;CRM Pipeline Automation&#10;Local SEO & Google Maps Ranking"
                    className="w-full rounded border border-[#27272A] bg-[#18181B] px-3 py-2 text-xs text-white placeholder-zinc-500 font-mono focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                    Performance Guarantee Terms
                  </label>
                  <input
                    type="text"
                    value={guaranteeTerms}
                    onChange={(e) => setGuaranteeTerms(e.target.value)}
                    placeholder="e.g. Guaranteed minimum 20 verified appointments in first 30 days or work free."
                    className="w-full rounded border border-[#27272A] bg-[#18181B] px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-[#27272A]">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingAgency(null);
                      setIsCreatingNew(false);
                    }}
                    className="px-4 py-1.5 rounded border border-[#27272A] text-xs font-medium text-zinc-300 hover:bg-[#27272A] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-xs transition-colors cursor-pointer"
                  >
                    Save Business Profile
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#27272A] bg-[#121215] flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Active Pitching: <strong className="text-white">{activeAgency.name}</strong></span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1 rounded bg-[#18181B] border border-[#27272A] text-white hover:bg-[#27272A] text-xs font-medium cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
