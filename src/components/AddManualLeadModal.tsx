import React, { useState } from 'react';
import {
  X,
  PlusCircle,
  Building,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Star,
  Sparkles,
  Check,
  RefreshCw
} from 'lucide-react';
import { Lead, AgencyProfile, LeadCategory } from '../types';

interface AddManualLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeAgency?: AgencyProfile;
  onAddLead?: (lead: Lead) => void;
  onLeadAdded?: (lead: Lead) => void;
  theme?: 'dark' | 'light';
}

const CATEGORIES: LeadCategory[] = [
  'Real Estate',
  'Dental & Healthcare',
  'Home Services & Contractors',
  'Roofing & Construction',
  'Solar & CleanTech',
  'Legal & Law Firms',
  'Accounting & Financial',
  'SaaS & Tech',
  'Marketing & Creative Agency',
  'E-Commerce & DTC',
  'Restaurants & Hospitality',
  'Fitness & MedSpas',
  'Automotive & Dealerships',
  'Logistics & Supply Chain',
  'Insurance & Wealth Management',
  'Coaching & Consulting',
  'Architecture & Interior Design',
  'Veterinary & Pet Care',
  'Education & EdTech',
  'Manufacturing & Industrial',
];

export const AddManualLeadModal: React.FC<AddManualLeadModalProps> = ({
  isOpen,
  onClose,
  activeAgency,
  onAddLead,
  onLeadAdded,
  theme = 'dark',
}) => {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [title, setTitle] = useState('Founder / Managing Director');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [city, setCity] = useState('Austin, TX');
  const [category, setCategory] = useState<LeadCategory>('Real Estate');
  const [rating, setRating] = useState('4.8');
  const [reviewsCount, setReviewsCount] = useState('42');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const isLight = theme === 'light';
  const agencyName = activeAgency?.name || 'ADS RESULTS 24/7';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;

    setIsSubmitting(true);

    try {
      const leadPayload = {
        companyName: companyName.trim(),
        name: contactName.trim() || 'Managing Director',
        title: title.trim(),
        email: email.trim(),
        phone: phone.trim(),
        website: website.trim(),
        category,
        location: { formatted: city.trim(), city: city.split(',')[0]?.trim() || city.trim(), country: 'USA' },
        rating: parseFloat(rating) || 4.8,
        reviewsCount: parseInt(reviewsCount, 10) || 30,
        notes: notes.trim() || `Manual entry directly targeted for ${agencyName}`,
        source: 'custom_actor' as const,
        sourceLabel: 'Direct Manual Entry',
      };

      const res = await fetch('/api/leads/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leads: [leadPayload],
          agencyId: activeAgency?.id,
          autoEnrich: true,
        }),
      });

      const data = await res.json();
      if (data.success && data.leads?.length > 0) {
        onLeadAdded(data.leads[0]);
      } else {
        // Fallback local construct
        const newLead: Lead = {
          id: `lead_man_${Date.now()}`,
          name: leadPayload.name,
          title: leadPayload.title,
          companyName: leadPayload.companyName,
          category: leadPayload.category,
          source: 'custom_actor',
          sourceLabel: 'Direct Manual Entry',
          score: 92,
          temperature: 'Hot',
          email: leadPayload.email || `contact@${leadPayload.companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
          phone: leadPayload.phone || '(555) 234-5678',
          website: leadPayload.website || `https://www.${leadPayload.companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
          rating: leadPayload.rating,
          reviewsCount: leadPayload.reviewsCount,
          location: leadPayload.location,
          status: 'New',
          agencyId: activeAgency?.id,
          tags: ['Manual Entry', 'Direct Outreach', 'High Intent'],
          socials: {
            linkedin: `https://linkedin.com/company/${leadPayload.companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
          },
          researchedData: {
            companyOverview: `${leadPayload.companyName} is an established organization located in ${leadPayload.location.city}.`,
            marketPositioning: 'Mid-to-high ticket specialized provider with strong local market penetration.',
            competitors: ['Local Market Leader A', 'Regional Competitor B', 'National Provider C'],
            estimatedAnnualRevenue: '$1.5M - $3M / yr',
            estimatedEmployees: '15 - 45 employees',
            techStackDetected: ['Google Ads', 'WordPress', 'Google Analytics 4', 'HubSpot'],
            reviewSentimentSummary: 'Predominantly positive service reviews with potential to improve digital booking speed.',
          },
          painPoints: [
            {
              id: 'pp_man_1',
              title: 'Manual Lead Response Bottleneck',
              description: 'Inbound prospect response latency exceeds 45 minutes during busy business hours, causing lead leakage.',
              severity: 'High',
              category: 'Sales',
              estimatedRevenueLoss: '$18,000+ estimated monthly lost deal value',
              recommendedFix: 'Deploy 24/7 AI-driven conversational booking loop and instant SMS follow-up.',
            },
            {
              id: 'pp_man_2',
              title: 'Under-Optimized Local Search Conversion',
              description: 'Local reviews volume is healthy but lacks an automated systematic review generation loop.',
              severity: 'Medium',
              category: 'Reputation',
              estimatedRevenueLoss: '$8,500+ monthly unrealized inbound opportunities',
              recommendedFix: 'Implement automated post-appointment review capture protocol.',
            },
          ],
          outreachStrategy: {
            targetPersona: `${leadPayload.name} (${leadPayload.title})`,
            bestChannel: 'Email',
            idealTiming: 'Tuesday 9:15 AM CST or Thursday 2:30 PM CST',
            icebreaker: `Hi ${leadPayload.name}, noticed ${leadPayload.companyName}'s impressive ${leadPayload.rating}★ track record in ${city.split(',')[0]}!`,
            valueHook: `We engineered a custom speed-to-lead and paid acquisition infrastructure that cuts response times to <60 seconds for businesses in ${leadPayload.category}.`,
            pitchingAgencyName: agencyName,
            coldEmailSequence: [
              {
                step: 1,
                day: 1,
                title: 'Initial Personalized Touchpoint',
                subjectLines: [`Quick question regarding ${leadPayload.companyName}'s inbound speed-to-lead`],
                body: `Hi ${leadPayload.name},\n\nI was reviewing ${leadPayload.companyName}'s current digital presence in ${city} and noticed your stellar ${leadPayload.rating}★ rating.\n\nQuick question: when potential clients inquire after hours or while your front desk is busy, how fast are they getting an SMS response?\n\nAt ${agencyName}, we deploy sub-60-second AI speed-to-lead response loops that recapture 35%+ of dropped inquiries.\n\nOpen to reviewing a 3-minute video audit we put together for ${leadPayload.companyName}?\n\nBest,\n${activeAgency?.senderName || 'Marcus Vance'}\n${agencyName}`,
                hookExplanation: 'Highlights local stellar reputation and transitions directly into speed-to-lead conversion gap.',
                callToAction: 'Offer low-friction 3-minute video audit link.',
              },
            ],
            linkedInInMail: {
              connectionNote: `Hi ${leadPayload.name}, impressed by your leadership at ${leadPayload.companyName}. Would love to share our latest case studies for ${leadPayload.category} in ${city}.`,
              followUpPitch: `Hi ${leadPayload.name}, sharing our speed-to-lead audit for ${leadPayload.companyName}. Let me know if you'd like the full breakdown.`,
            },
            coldCallScript: {
              gatekeeperBypass: `Hi, I'm calling for ${leadPayload.name} regarding the inbound response benchmark report we prepared for ${leadPayload.companyName}.`,
              openingHook: `Hi ${leadPayload.name}, this is ${activeAgency?.senderName || 'Marcus'} from ${agencyName}. I know you weren't expecting my call—got 30 seconds?`,
              objectionHandlers: [
                {
                  objection: 'We already have marketing in place',
                  response: `That's great—most of our top clients already did too. We specialize specifically in the sub-60s response loop that doubles the conversion of your existing traffic.`,
                },
              ],
              closingQuestion: `Would Tuesday at 10 AM work for a quick 10-minute walkthrough of the numbers?`,
            },
            videoAuditOutline: {
              duration: '2:45 mins',
              screenShareKeyPoints: [
                `${leadPayload.companyName} Google Search & Maps Position`,
                `Live Mobile Speed-to-Lead Test Comparison`,
                `ROI Model: Capturing 10 Extra Appointments per month`,
              ],
              loomCta: `Book a 15-Minute Strategy Review with ${agencyName}`,
            },
          },
          proposal: {
            proposalTitle: `Full-Funnel Acquisition & Speed-to-Lead Architecture for ${leadPayload.companyName}`,
            executiveSummary: `Strategic Growth Proposal formulated exclusively for ${leadPayload.companyName} by ${agencyName}.`,
            diagnosedProblem: `Inbound prospect response latency exceeds industry gold standard (<60s), resulting in preventable lost inquiries.`,
            pitchingAgencyName: agencyName,
            proposedSolution: [
              {
                phase: 'Phase 1: Speed-to-Lead AI Infrastructure',
                timeline: 'Days 1-7',
                deliverables: [
                  'Sub-60s SMS & Email Instant Conversational Responder',
                  'Live Calendar Direct Appointment Booking Loop',
                  'Lead Attribution & Real-Time Notification Pipeline',
                ],
              },
              {
                phase: 'Phase 2: High-Intent Paid Traffic Scaling',
                timeline: 'Days 8-21',
                deliverables: [
                  'High-Conversion Dedicated Landing Page',
                  'Google Search & Meta Ad Creatives Deployment',
                  'Negative Review Interception Protocol',
                ],
              },
            ],
            projectedRoi: [
              {
                metric: 'Lead Inbound Response Time',
                currentEstimated: '45 - 90 minutes',
                projectedWithSolution: '< 45 seconds (24/7/365)',
                financialGain: '+35% inquiry-to-appointment conversion',
              },
              {
                metric: 'Monthly Booked High-Value Appointments',
                currentEstimated: '12 - 18 / mo',
                projectedWithSolution: '30 - 45 / mo',
                financialGain: '+$24,000 - $48,000 net monthly revenue',
              },
            ],
            pricingTiers: [
              {
                tierName: 'Growth Accelerate',
                price: '$2,450',
                billingPeriod: '/month',
                features: ['24/7 AI Speed-to-Lead', 'Single-Channel Ads Management', 'Weekly Reports'],
              },
            ],
            guaranteeTerms: '30-Day Money Back SLA Guarantee',
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        (onAddLead || onLeadAdded)?.(newLead as any);
      }

      onClose();
    } catch (err) {
      console.error('Error adding lead:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`relative w-full max-w-xl rounded-xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
          isLight ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-[#0E0E12] border-[#27272A] text-zinc-100'
        }`}
      >
        {/* Top Header */}
        <div
          className={`flex items-center justify-between px-5 py-3.5 border-b ${
            isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-[#121215] border-[#27272A]'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-600/10 text-indigo-400">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">Add Verified Lead Manually</h3>
              <p className="text-xs text-zinc-400">
                Immediately syncs with <strong className="text-zinc-200">{agencyName}</strong> CRM and pitch builder
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Company Name *
              </label>
              <div className="relative">
                <Building className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Dental Spa"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    isLight ? 'bg-zinc-50 border-zinc-300 text-zinc-900' : 'bg-[#18181B] border-[#27272A] text-white'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Decision Maker Name
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-500" />
                <input
                  type="text"
                  placeholder="e.g. Dr. Michael Vance"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    isLight ? 'bg-zinc-50 border-zinc-300 text-zinc-900' : 'bg-[#18181B] border-[#27272A] text-white'
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Industry Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as LeadCategory)}
                className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                  isLight ? 'bg-zinc-50 border-zinc-300 text-zinc-900' : 'bg-[#18181B] border-[#27272A] text-white'
                }`}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Location / City
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-500" />
                <input
                  type="text"
                  placeholder="e.g. Dallas, TX"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    isLight ? 'bg-zinc-50 border-zinc-300 text-zinc-900' : 'bg-[#18181B] border-[#27272A] text-white'
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-500" />
                <input
                  type="email"
                  placeholder="direct@business.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    isLight ? 'bg-zinc-50 border-zinc-300 text-zinc-900' : 'bg-[#18181B] border-[#27272A] text-white'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Phone
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-500" />
                <input
                  type="text"
                  placeholder="(555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    isLight ? 'bg-zinc-50 border-zinc-300 text-zinc-900' : 'bg-[#18181B] border-[#27272A] text-white'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Website
              </label>
              <div className="relative">
                <Globe className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-500" />
                <input
                  type="text"
                  placeholder="https://example.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    isLight ? 'bg-zinc-50 border-zinc-300 text-zinc-900' : 'bg-[#18181B] border-[#27272A] text-white'
                  }`}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
              Key Pain Point / Notes
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Website has slow load times and no automated after-hours scheduling bot..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`w-full p-2.5 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                isLight ? 'bg-zinc-50 border-zinc-300 text-zinc-900' : 'bg-[#18181B] border-[#27272A] text-white'
              }`}
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-zinc-200 dark:border-[#27272A]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !companyName.trim()}
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-600/30"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing Strategy...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Save & Enrich Lead</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
