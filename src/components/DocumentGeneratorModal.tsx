import React, { useState } from 'react';
import {
  X,
  FileText,
  Download,
  Printer,
  Copy,
  Check,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  Building2,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Mail,
  Phone,
  Layers,
  Code,
  Send,
  FileType
} from 'lucide-react';
import { Lead, AgencyProfile } from '../types';
import { downloadWordDocument, triggerPrintablePdf } from '../utils/exportUtils';
import { SendProposalEmailModal } from './SendProposalEmailModal';

interface DocumentGeneratorModalProps {
  lead: Lead | null;
  initialDocType?: string;
  onClose: () => void;
  activeAgency?: AgencyProfile;
  theme?: 'dark' | 'light';
}

export const DocumentGeneratorModal: React.FC<DocumentGeneratorModalProps> = ({
  lead,
  initialDocType = 'proposal',
  onClose,
  activeAgency,
  theme = 'dark',
}) => {
  const [docType, setDocType] = useState(initialDocType);
  const [viewMode, setViewMode] = useState<'formatted' | 'raw'>('formatted');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const isLight = theme === 'light';
  const agencyName = activeAgency?.name || 'ADS RESULTS 24/7';
  const agencyWebsite = activeAgency?.website || 'https://adsresults247.com';
  const agencySender = activeAgency?.senderName || 'Marcus Vance';
  const agencyRole = activeAgency?.senderRole || 'Head of Client Growth & Partner';
  const agencyEmail = activeAgency?.senderEmail || 'marcus@adsresults247.com';
  const agencyPhone = activeAgency?.senderPhone || '+1 (800) 459-2470';
  const agencyLogo = activeAgency?.logoUrl;
  const guaranteeText = activeAgency?.guaranteeTerms || lead?.proposal?.guaranteeTerms || 'Guaranteed minimum 20 verified sales appointments in first 30 days or we work free until achieved.';

  React.useEffect(() => {
    if (!lead) return;
    generateDocument(docType);
  }, [lead, docType, activeAgency]);

  const generateDocument = async (type: string) => {
    if (!lead) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/generate-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          docType: type,
          leadData: lead,
          activeAgency,
        }),
      });
      const data = await res.json();
      if (data.success && data.content) {
        setGeneratedContent(data.content);
      } else {
        setGeneratedContent(getDefaultMarkdown(lead, type));
      }
    } catch (err) {
      console.error('Error generating document:', err);
      setGeneratedContent(getDefaultMarkdown(lead, type));
    } finally {
      setIsGenerating(false);
    }
  };

  const getDefaultMarkdown = (l: Lead, type: string) => {
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const roiGain = l.proposal?.projectedRoi?.[0]?.financialGain || '+$140,000/year';

    if (type === 'audit_report') {
      return `# TECHNICAL & PIPELINE DIAGNOSTIC REPORT
**Target Enterprise:** ${l.companyName} (${l.location.formatted})
**Prepared By:** ${agencyName} | Diagnostic Infrastructure Unit
**Lead Signatory:** ${agencySender} (${agencyRole})
**Direct Contact:** ${agencyEmail} | ${agencyPhone}
**Date:** ${today}
**Classification:** STRICTLY PRIVILEGED & CONFIDENTIAL

---

## 1. EXECUTIVE DIAGNOSTIC SUMMARY
An exhaustive pipeline diagnostic was performed on ${l.companyName}'s digital touchpoints and lead response velocity in ${l.location.city}. Our findings indicate significant prospective deal leakage due to inquiry response latency and un-retargeted ad traffic.

- **Speed-to-Lead Latency:** Inbound inquiries experience delayed callbacks (>35 mins).
- **Projected Revenue Loss:** $15,000 - $30,000/mo in lost consultation bookings.
- **Local Rating & Reputation:** ${l.rating || 4.8}/5.0 Stars (${l.reviewsCount || 50} verified reviews).
- **Detected Infrastructure:** ${l.researchedData?.techStackDetected?.join(', ') || 'WordPress, Google Analytics 4, Meta Pixel'}

---

## 2. DIAGNOSED VULNERABILITIES & REMEDIATION
${(l.painPoints || []).map((pp, i) => `### Bottleneck ${i + 1}: ${pp.title}
• Severity: ${pp.severity}
• Financial Exposure: ${pp.estimatedRevenueLoss}
• Diagnosis: ${pp.description}
• Solution by ${agencyName}: ${pp.recommendedFix}
`).join('\n')}

---

## 3. 30-DAY PIPELINE ACCELERATION BLUEPRINT
| Phase | Timeline | Strategic Implementation |
| :--- | :--- | :--- |
| **Phase 1** | Week 1 | Deploy 24/7 Sub-60s AI Speed-to-Lead Receptionist and CRM calendar booking sync. |
| **Phase 2** | Weeks 2-3 | Launch targeted Meta & Google omni-presence advertising campaigns in ${l.location.city}. |
| **Phase 3** | Week 4+ | Scale high-intent traffic and activate automated 5-star review booster workflows. |

---

## 4. NEXT STEPS & CONSULTATION
Schedule your executive deployment briefing with ${agencyName} at **${agencyWebsite}** or call directly at **${agencyPhone}**.`;
    }

    if (type === 'sales_kit') {
      return `# HIGH-CONVERTING MULTI-TOUCH SALES OUTREACH KIT
**Target Account:** ${l.companyName}
**Target Executive:** ${l.name} (${l.title || 'Decision Maker'})
**Territory:** ${l.location.formatted}
**Pitching Agency:** ${agencyName} (${agencyWebsite})
**Author:** ${agencySender} (${agencyRole})
**Date:** ${today}

---

## 1. STRATEGIC POSITIONING & HOOK
- **Prospect:** ${l.name}, ${l.title || 'Decision Maker'} at ${l.companyName}
- **Value Hook:** Eliminating inbound callback delays to capture an estimated ${roiGain} in high-ticket pipeline.
- **Performance Guarantee:** ${guaranteeText}

---

## 2. 3-TOUCH COLD EMAIL SEQUENCE

### Touch 1: Speed-to-Lead Diagnostic (Day 1)
**Subject:** Quick question about ${l.companyName}'s callback speed in ${l.location.city}
**Body:**
Hi ${l.name},

I was reviewing leading ${l.category} providers in ${l.location.city} and came across ${l.companyName}.

At ${agencyName}, we deploy 24/7 AI speed-to-lead pipelines that engage new inquiries in under 45 seconds and book qualified consultations directly into your calendar.

We back this with a concrete performance guarantee: **${guaranteeText}**

Would you be open to a 5-minute video walkthrough showing how this works for ${l.companyName}?

Best regards,

**${agencySender}**
${agencyRole}
${agencyName} | ${agencyWebsite}

---

### Touch 2: Response Velocity Benchmark (Day 3)
**Subject:** Re: ${l.companyName} inbound inquiry benchmark
**Body:**
Hi ${l.name},

Following up on my note—we found that 48% of high-intent inquiries in ${l.location.city} arrive after 5:30 PM or on weekends when staff is offline.

${agencyName}'s 24/7 AI Receptionist captures and books these prospects in real time.

Are you open for a brief 10-minute demo this Thursday at 10:00 AM?

Best,
**${agencySender}**

---

### Touch 3: Final Follow-Up (Day 7)
**Subject:** 30-day growth blueprint for ${l.companyName}
**Body:**
Hi ${l.name},

I understand you're busy running ${l.companyName}. If you ever want to see how we guarantee **20+ booked appointments in 30 days**, grab a time here: ${agencyWebsite}

Wishing ${l.companyName} continued success!

Best,
**${agencySender}**

---

## 3. LINKEDIN & PHONE OUTREACH
- **LinkedIn InMail:** *"Hi ${l.name}, saw your impressive work at ${l.companyName}. We built an AI speed-to-lead booking concierge that guarantees 20+ booked appointments in 30 days. Open to a 3-minute video overview?"*
- **Cold Call Opening:** *"Hi ${l.name}, this is ${agencySender} with ${agencyName}. We prepared a speed-to-lead audit for ${l.companyName} showing how to capture inbound leads in under 60 seconds."*`;
    }

    if (type === 'contract_sow') {
      return `# MASTER SERVICES AGREEMENT & STATEMENT OF WORK
**Agreement Ref:** MSA-SOW-${Date.now().toString().slice(-6)}
**Effective Date:** ${today}

### PARTIES:
1. **SERVICE PROVIDER:** **${agencyName}** ("Agency")
   - Representative: ${agencySender} (${agencyRole})
   - Contact: ${agencyEmail} | ${agencyPhone} | ${agencyWebsite}
2. **CLIENT:** **${l.companyName}** ("Client")
   - Authorized Signatory: ${l.name} (${l.title || 'Managing Principal'})
   - Territory: ${l.location.formatted}

---

## 1. SCOPE OF SERVICES
${(activeAgency?.coreServices || ['Omnichannel Paid Traffic Management', '24/7 AI Speed-to-Lead Concierge', 'Automated CRM Calendar Sync']).map((s, idx) => `${idx + 1}. **${s}**`).join('\n')}

---

## 2. PERFORMANCE SLA GUARANTEE
**${guaranteeText}**
If Agency fails to achieve the specified appointment benchmark within the first 30 days of live deployment, Agency agrees to continue performing all services at zero additional service cost until achieved.

---

## 3. COMMERCIAL INVESTMENT & PAYMENT
- **Engagement Tier:** ${(activeAgency?.pricingTiers || [])[1]?.name || 'Omni-Dominance Growth Tier'}
- **Monthly Fee:** ${(activeAgency?.pricingTiers || [])[1]?.price || '$4,800'} / month

---

## 4. AUTHORIZED ACCEPTANCE & SIGNATURES
**FOR SERVICE PROVIDER (${agencyName}):**
Signature: ___________________________
Date: ${today}

**FOR CLIENT (${l.companyName}):**
Signature: ___________________________
Date: ${today}`;
    }

    // Default: Commercial Growth Proposal
    return `COMMERCIAL GROWTH PROPOSAL & TECHNICAL AUDIT
Prepared By: ${agencyName} (${agencyWebsite})
Signatory: ${agencySender} (${agencyRole})
Prepared For: ${l.companyName} (${l.name}, ${l.title || 'Decision Maker'})
Territory / Market: ${l.location.formatted}
Date: ${today}
Classification: STRICTLY CONFIDENTIAL & PRIVILEGED

1. EXECUTIVE OVERVIEW & DIAGNOSTIC
This proposal outlines a strategic customer acquisition and conversion architecture engineered specifically for ${l.companyName} by ${agencyName}. Our diagnostic indicates that by eliminating inquiry response latency and deploying high-converting targeted traffic pipelines, ${l.companyName} can capture an estimated additional ${roiGain} in gross profit.

2. DIAGNOSED BUSINESS BOTTLENECKS & REVENUE LEAKAGE
${(l.painPoints || [])
  .map(
    (pp, i) => `Bottleneck ${i + 1}: ${pp.title}
• Severity Level: ${pp.severity}
• Estimated Annual Financial Loss: ${pp.estimatedRevenueLoss}
• Root Operational Cause: ${pp.description}
• Prescribed Solution by ${agencyName}: ${pp.recommendedFix}
`
  )
  .join('\n')}

3. PHASED IMPLEMENTATION ROADMAP
${(l.proposal?.proposedSolution || [])
  .map(
    (phase) => `${phase.phase} (${phase.timeline})
${phase.deliverables.map((d) => `• ${d}`).join('\n')}
`
  )
  .join('\n')}

4. PROJECTED FINANCIAL MODEL & ROI ATTRIBUTION
${(l.proposal?.projectedRoi || [])
  .map((r) => `• ${r.metric}: Current [${r.currentEstimated}] -> Projected With ${agencyName} [${r.projectedWithSolution}] = Net Gain ${r.financialGain}`)
  .join('\n')}

5. COMMERCIAL INVESTMENT PACKAGES
${(activeAgency?.pricingTiers || l.proposal?.pricingTiers || [])
  .map(
    (tier) => `${tier.name} — ${tier.price} ${tier.billingPeriod}
${tier.features.map((f) => `• ${f}`).join('\n')}
`
  )
  .join('\n')}

6. PERFORMANCE GUARANTEE
${guaranteeText}

AUTHORIZED ACCEPTANCE & SIGNATURES:
For ${agencyName}: ${agencySender}, ${agencyRole}
For ${l.companyName}: ${l.name}, ${l.title || 'Managing Director'}
Date: ${new Date().toLocaleDateString()}`;
  };

  const handleCopy = () => {
    const textToCopy = viewMode === 'raw' ? generatedContent : stripMarkdown(generatedContent);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    if (!lead) return;

    // Create a hidden printable iframe with dedicated print CSS to guarantee a pristine multi-page executive PDF
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = '0';
    document.body.appendChild(printFrame);

    const frameDoc = printFrame.contentWindow?.document || printFrame.contentDocument;
    if (!frameDoc) {
      window.print();
      return;
    }

    const printHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${agencyName} - Proposal for ${lead.companyName}</title>
          <meta charset="utf-8" />
          <style>
            @page {
              size: A4 portrait;
              margin: 18mm 15mm 18mm 15mm;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              color: #111827;
              background: #ffffff;
              line-height: 1.5;
              font-size: 13px;
              margin: 0;
              padding: 10px;
            }
            .header-box {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              border-bottom: 2px solid #e5e7eb;
              padding-bottom: 16px;
              margin-bottom: 24px;
            }
            .agency-title {
              font-size: 20px;
              font-weight: 800;
              color: #4f46e5;
              margin: 0 0 4px 0;
            }
            .agency-sub {
              font-size: 11px;
              color: #6b7280;
              margin: 0 0 8px 0;
            }
            .meta-grid {
              font-size: 11px;
              color: #4b5563;
            }
            .client-card {
              background: #f9fafb;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 12px 16px;
              text-align: right;
            }
            .client-card h3 {
              margin: 0 0 4px 0;
              font-size: 15px;
              color: #111827;
            }
            .badge {
              display: inline-block;
              background: #eef2ff;
              color: #4f46e5;
              padding: 3px 8px;
              border-radius: 4px;
              font-size: 10px;
              font-weight: bold;
              text-transform: uppercase;
              margin-bottom: 8px;
            }
            .section-title {
              font-size: 15px;
              font-weight: 700;
              color: #111827;
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 6px;
              margin: 24px 0 12px 0;
            }
            .card {
              border: 1px solid #e5e7eb;
              border-radius: 6px;
              padding: 12px;
              margin-bottom: 10px;
              background: #ffffff;
            }
            .grid-2 {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px;
            }
            .grid-3 {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 12px;
            }
            .tier-box {
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 12px;
              background: #f9fafb;
            }
            .tier-price {
              font-size: 18px;
              font-weight: 800;
              color: #111827;
            }
            .guarantee-box {
              background: #ecfdf5;
              border: 1px solid #a7f3d0;
              border-radius: 8px;
              padding: 12px;
              margin: 16px 0;
              color: #065f46;
            }
            .signature-box {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 24px;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #e5e7eb;
            }
            .sign-line {
              margin-top: 30px;
              border-top: 1px solid #9ca3af;
              padding-top: 4px;
              font-size: 11px;
              color: #6b7280;
            }
            ul {
              margin: 6px 0;
              padding-left: 20px;
            }
            li {
              margin-bottom: 4px;
            }
          </style>
        </head>
        <body>
          <div class="header-box">
            <div>
              <div class="agency-title">${agencyName}</div>
              <div class="agency-sub">${activeAgency?.tagline || 'Strategic Customer Acquisition & Automation Infrastructure'}</div>
              <div class="meta-grid">
                <div>Website: ${agencyWebsite} | Direct: ${agencyPhone}</div>
                <div>Executive Contact: ${agencySender} (${agencyRole})</div>
              </div>
            </div>
            <div class="client-card">
              <div class="badge">Prepared For</div>
              <h3>${lead.companyName}</h3>
              <div>${lead.name} • ${lead.title || 'Managing Principal'}</div>
              <div>${lead.location?.formatted || 'USA'}</div>
              <div style="font-size: 10px; color: #9ca3af; margin-top: 4px;">Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
            </div>
          </div>

          <div class="badge">Executive Proposal & Diagnostic</div>
          <h2 style="margin: 4px 0 12px 0; font-size: 18px; color: #111827;">Commercial Revenue Acceleration Strategy</h2>
          <p style="color: #374151; margin-bottom: 16px;">
            This document outlines a revenue-generation system engineered by <strong>${agencyName}</strong> exclusively for <strong>${lead.companyName}</strong>. 
            Our research indicates that resolving lead response latency and deploying high-converting targeted traffic can capture an estimated additional <strong>${lead.proposal?.projectedRoi?.[0]?.financialGain || '+$140,000/year'}</strong> in gross profit.
          </p>

          <div class="section-title">1. Diagnosed Operational Bottlenecks</div>
          ${(lead.painPoints || []).map((pp, i) => `
            <div class="card">
              <div style="font-weight: 700; color: #b91c1c;">Bottleneck ${i + 1}: ${pp.title}</div>
              <div style="font-size: 11px; color: #4b5563; margin: 4px 0;"><strong>Severity:</strong> ${pp.severity} | <strong>Est. Loss:</strong> ${pp.estimatedRevenueLoss}</div>
              <div style="font-size: 12px; color: #374151;">${pp.description}</div>
              <div style="font-size: 12px; color: #047857; margin-top: 4px;"><strong>Prescribed Solution:</strong> ${pp.recommendedFix}</div>
            </div>
          `).join('')}

          <div class="section-title">2. Phased Implementation Roadmap</div>
          <div class="grid-2">
            ${(lead.proposal?.proposedSolution || []).map((phase) => `
              <div class="card">
                <div style="font-weight: 700; color: #4f46e5;">${phase.phase} (${phase.timeline})</div>
                <ul>
                  ${phase.deliverables.map((d) => `<li style="font-size: 12px;">${d}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>

          <div class="section-title">3. Investment Packages & Pricing</div>
          <div class="grid-3">
            ${(activeAgency?.pricingTiers || lead.proposal?.pricingTiers || []).map((t) => `
              <div class="tier-box">
                <div style="font-weight: 700; font-size: 13px;">${t.name}</div>
                <div class="tier-price">${t.price} <span style="font-size: 11px; font-weight: normal; color: #6b7280;">${t.billingPeriod}</span></div>
                <p style="font-size: 11px; color: #4b5563; margin: 4px 0;">${t.description}</p>
                <ul>
                  ${t.features.map((f) => `<li style="font-size: 11px;">${f}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>

          <div class="guarantee-box">
            <strong>Direct Performance Guarantee:</strong> ${guaranteeText}
          </div>

          <div class="signature-box">
            <div>
              <div style="font-weight: bold; color: #4f46e5;">For ${agencyName}:</div>
              <div>${agencySender}</div>
              <div>${agencyRole}</div>
              <div class="sign-line">Authorized Signatory (Digital Verification #ADV-247)</div>
            </div>
            <div>
              <div style="font-weight: bold; color: #111827;">For ${lead.companyName}:</div>
              <div>${lead.name}</div>
              <div>${lead.title || 'Managing Principal'}</div>
              <div class="sign-line">Client Acceptance Signature & Date</div>
            </div>
          </div>
        </body>
      </html>
    `;

    frameDoc.open();
    frameDoc.write(printHtml);
    frameDoc.close();

    setTimeout(() => {
      printFrame.contentWindow?.focus();
      printFrame.contentWindow?.print();
      setTimeout(() => {
        document.body.removeChild(printFrame);
      }, 2000);
    }, 500);
  };

  const handleDownloadHtml = () => {
    const printHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${agencyName} - Executive Document for ${lead?.companyName}</title>
          <style>
            @page { size: A4; margin: 18mm 16mm; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              color: #111827;
              background: #ffffff;
              line-height: 1.5;
              font-size: 13px;
              padding: 24px;
            }
            .header-box {
              display: flex;
              justify-content: space-between;
              border-bottom: 2px solid #4f46e5;
              padding-bottom: 16px;
              margin-bottom: 20px;
            }
            .agency-title {
              font-size: 22px;
              font-weight: 800;
              color: #4f46e5;
              letter-spacing: -0.5px;
            }
            .agency-sub {
              font-size: 12px;
              color: #6b7280;
              font-weight: 500;
              margin-top: 2px;
            }
            .client-card {
              background: #f9fafb;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 12px 16px;
              min-width: 260px;
            }
            .badge {
              display: inline-block;
              background: #eef2ff;
              color: #4f46e5;
              padding: 3px 8px;
              border-radius: 4px;
              font-size: 10px;
              font-weight: bold;
              text-transform: uppercase;
              margin-bottom: 6px;
            }
            .section-title {
              font-size: 15px;
              font-weight: 700;
              color: #111827;
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 6px;
              margin: 20px 0 10px 0;
            }
            .card {
              border: 1px solid #e5e7eb;
              border-radius: 6px;
              padding: 12px;
              margin-bottom: 10px;
              background: #ffffff;
            }
            .grid-2 {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px;
            }
            .guarantee-box {
              background: #ecfdf5;
              border: 1px solid #a7f3d0;
              border-radius: 8px;
              padding: 12px;
              margin: 16px 0;
              color: #065f46;
            }
            .signature-box {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 24px;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #e5e7eb;
            }
            .sign-line {
              margin-top: 30px;
              border-top: 1px solid #9ca3af;
              padding-top: 4px;
              font-size: 11px;
              color: #6b7280;
            }
          </style>
        </head>
        <body>
          <div class="header-box">
            <div>
              <div class="agency-title">${agencyName}</div>
              <div class="agency-sub">${activeAgency?.tagline || 'Strategic Customer Acquisition & Automation Infrastructure'}</div>
              <div style="font-size: 11px; color: #6b7280; margin-top: 6px;">
                Direct: ${agencyPhone} | Email: ${agencyEmail} | Web: ${agencyWebsite}
              </div>
            </div>
            <div class="client-card">
              <div class="badge">Prepared For</div>
              <h3 style="margin: 0; font-size: 15px; color: #111827;">${lead?.companyName}</h3>
              <div>${lead?.name} • ${lead?.title || 'Managing Principal'}</div>
              <div>${lead?.location?.formatted || 'USA'}</div>
              <div style="font-size: 10px; color: #9ca3af; margin-top: 4px;">Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
            </div>
          </div>
          <div class="section-title">1. Executive Overview & Diagnostic</div>
          <p>${lead?.proposal?.executiveSummary || `${agencyName} has completed a diagnostic on ${lead?.companyName}'s digital pipeline.`}</p>

          <div class="section-title">2. Diagnosed Pipeline Bottlenecks</div>
          ${lead?.painPoints?.map((p: any) => `
            <div class="card">
              <strong style="color: #dc2626;">⚠ ${p.problem}</strong>
              <p style="margin: 4px 0 0 0; color: #4b5563;">${p.impact}</p>
            </div>
          `).join('') || ''}

          <div class="section-title">3. Growth Packages & Investment Options</div>
          <div class="grid-2">
            ${lead?.proposal?.packages?.map((pkg: any) => `
              <div class="card" style="background: #f9fafb;">
                <h4 style="margin: 0 0 4px 0; color: #4f46e5;">${pkg.tier} — $${pkg.price?.toLocaleString()}</h4>
                <p style="font-size: 11px; color: #6b7280; margin: 0 0 8px 0;">${pkg.timeline}</p>
                <ul style="margin: 0; padding-left: 16px;">
                  ${pkg.deliverables?.map((d: string) => `<li>${d}</li>`).join('')}
                </ul>
              </div>
            `).join('') || ''}
          </div>

          <div class="guarantee-box">
            <strong>🛡️ Performance SLA Guarantee:</strong>
            <p style="margin: 4px 0 0 0;">${guaranteeText}</p>
          </div>

          <div class="signature-box">
            <div>
              <div style="font-weight: bold; color: #4f46e5;">For ${agencyName}:</div>
              <div>${agencySender} (${agencyRole})</div>
              <div class="sign-line">Authorized Signatory</div>
            </div>
            <div>
              <div style="font-weight: bold; color: #111827;">For ${lead?.companyName}:</div>
              <div>${lead?.name} (${lead?.title || 'Managing Principal'})</div>
              <div class="sign-line">Client Acceptance Signature & Date</div>
            </div>
          </div>
        </body>
      </html>
    `;

    const element = document.createElement('a');
    const file = new Blob([printHtml], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `${lead?.companyName.replace(/\s+/g, '_')}_Executive_Proposal.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedContent], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${lead?.companyName.replace(/\s+/g, '_')}_Proposal.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Helper to remove any raw asterisks or markdown syntax for copy
  const stripMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/#{1,6}\s?/g, '')
      .replace(/`{1,3}/g, '')
      .trim();
  };

  if (!lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className={`relative w-full max-w-5xl max-h-[92vh] rounded-xl border shadow-2xl flex flex-col overflow-hidden ${
        isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#09090B] border-[#27272A] text-zinc-100'
      }`}>
        
        {/* Modal Top Header */}
        <div className={`flex items-center justify-between px-5 py-3.5 border-b ${
          isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-[#121215] border-[#27272A]'
        }`}>
          <div className="flex items-center gap-3">
            {agencyLogo ? (
              <img
                src={agencyLogo}
                alt={agencyName}
                className={`w-9 h-9 rounded-lg object-cover border ${
                  isLight ? 'border-zinc-300 bg-zinc-100' : 'border-[#27272A] bg-zinc-900'
                }`}
              />
            ) : (
              <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-500 font-bold text-xs">
                {agencyName.substring(0, 2).toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h2 className={`text-sm font-bold tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  Executive Document & Proposal Studio
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-[10px] font-semibold">
                  Branded by {agencyName}
                </span>
              </div>
              <p className={`text-xs ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                Prepared specifically for <strong className={isLight ? 'text-zinc-800' : 'text-zinc-200'}>{lead.companyName}</strong> • {lead.name} ({lead.title || 'Decision Maker'})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isLight ? 'text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Document Type Selector Bar & View Toggles */}
        <div className={`flex flex-wrap items-center justify-between gap-3 px-5 py-2.5 border-b text-xs ${
          isLight ? 'bg-zinc-100/70 border-zinc-200' : 'bg-[#0E0E12] border-[#27272A]'
        }`}>
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {[
              { id: 'proposal', label: 'Commercial Growth Proposal' },
              { id: 'audit_report', label: 'Technical & Pipeline Audit' },
              { id: 'sales_kit', label: 'Complete Sales Outreach Kit' },
              { id: 'contract_sow', label: 'Master Agreement / SOW' },
            ].map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setDocType(type.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  docType === type.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : isLight
                    ? 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/70'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#18181B]'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className={`flex items-center rounded-lg border p-0.5 text-[11px] ${
              isLight ? 'bg-white border-zinc-300' : 'bg-[#141418] border-[#27272A]'
            }`}>
              <button
                type="button"
                onClick={() => setViewMode('formatted')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-colors ${
                  viewMode === 'formatted'
                    ? 'bg-indigo-600 text-white'
                    : isLight
                    ? 'text-zinc-600 hover:text-zinc-900'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <FileText className="w-3 h-3" />
                <span>Branded Letterhead</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('raw')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-colors ${
                  viewMode === 'raw'
                    ? 'bg-indigo-600 text-white'
                    : isLight
                    ? 'text-zinc-600 hover:text-zinc-900'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Code className="w-3 h-3" />
                <span>Markdown / Text</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => generateDocument(docType)}
              disabled={isGenerating}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium disabled:opacity-50 transition-colors cursor-pointer ${
                isLight
                  ? 'bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900'
                  : 'bg-[#18181B] border-[#27272A] text-zinc-300 hover:text-white hover:border-zinc-500'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin text-indigo-500' : ''}`} />
              <span>Regenerate</span>
            </button>
          </div>
        </div>

        {/* Content Viewer */}
        <div className={`flex-1 p-5 overflow-y-auto space-y-4 ${
          isLight ? 'bg-zinc-50' : 'bg-[#09090B]'
        }`}>
          {isGenerating ? (
            <div className={`py-24 flex flex-col items-center justify-center gap-3 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <p className={`text-sm font-medium ${isLight ? 'text-zinc-800' : 'text-zinc-300'}`}>Synthesizing personalized proposal with live research grounding...</p>
              <p className="text-xs text-zinc-500">Customizing for {agencyName} & {lead.companyName}</p>
            </div>
          ) : viewMode === 'formatted' ? (
            /* Professional Formatted Letterhead View */
            <div className={`max-w-4xl mx-auto rounded-xl p-6 sm:p-8 shadow-sm space-y-8 print:bg-white print:text-black print:border-none print:shadow-none ${
              isLight ? 'bg-white border border-zinc-200 text-zinc-900' : 'bg-[#121216] border border-[#27272A] text-zinc-100'
            }`}>
              
              {/* Document Letterhead */}
              <div className={`flex flex-col sm:flex-row items-start justify-between gap-6 pb-6 border-b ${
                isLight ? 'border-zinc-200' : 'border-[#27272A]'
              }`}>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    {agencyLogo ? (
                      <img
                        src={agencyLogo}
                        alt={agencyName}
                        className={`w-12 h-12 rounded-lg object-cover border ${
                          isLight ? 'border-zinc-300 bg-zinc-100' : 'border-[#27272A] bg-zinc-900'
                        }`}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-500 font-black text-sm">
                        {agencyName.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h1 className={`text-lg font-bold tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>{agencyName}</h1>
                      <p className={`text-xs ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>{activeAgency?.tagline || 'High-Performance Customer Acquisition & AI Infrastructure'}</p>
                    </div>
                  </div>

                  <div className={`flex flex-wrap items-center gap-4 text-xs pt-1 ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                  }`}>
                    <span className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-zinc-400" />
                      {agencyWebsite}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-zinc-400" />
                      {agencyEmail}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-zinc-400" />
                      {agencyPhone}
                    </span>
                  </div>
                </div>

                {/* Target Client Meta */}
                <div className={`p-3.5 rounded-lg border text-right sm:text-right w-full sm:w-auto text-xs space-y-1 ${
                  isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-[#18181C] border-[#27272A]'
                }`}>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">Proposal Prepared For</div>
                  <div className={`font-bold text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>{lead.companyName}</div>
                  <div className={`font-medium ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>{lead.name} • {lead.title || 'Managing Principal'}</div>
                  <div className={isLight ? 'text-zinc-500' : 'text-zinc-400'}>{lead.location.formatted}</div>
                  <div className="text-[10px] text-zinc-400 pt-1">Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                </div>
              </div>

              {/* Title & Executive Summary */}
              <div className="space-y-3">
                <div className="inline-block px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[11px] font-bold uppercase tracking-wider">
                  Executive Growth Blueprint
                </div>
                <h2 className={`text-xl font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  Revenue Recovery & Automated Pipeline Acceleration Architecture
                </h2>
                <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                  This proposal establishes a comprehensive revenue infrastructure for <strong className={isLight ? 'text-zinc-900' : 'text-white'}>{lead.companyName}</strong>. 
                  Engineered and deployed by <strong className="text-indigo-600 dark:text-indigo-300">{agencyName}</strong>, this engagement eliminates pipeline friction, 
                  drastically reduces inquiry response times to under 60 seconds, and generates consistent high-value client acquisitions.
                </p>
              </div>

              {/* Diagnosed Bottlenecks Cards */}
              <div className="space-y-3">
                <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                  isLight ? 'text-zinc-600' : 'text-zinc-400'
                }`}>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span>1. Diagnosed Operational Bottlenecks & Revenue Loss</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(lead.painPoints || []).map((pp, idx) => (
                    <div
                      key={pp.id || idx}
                      className={`p-4 rounded-lg border space-y-2 ${
                        isLight ? 'bg-white border-zinc-200' : 'bg-[#16161B] border-[#27272A]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>{pp.title}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                          pp.severity === 'Critical' ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                        }`}>
                          {pp.severity}
                        </span>
                      </div>
                      <p className={`text-xs ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>{pp.description}</p>
                      
                      <div className={`pt-2 border-t flex items-center justify-between text-xs ${
                        isLight ? 'border-zinc-200' : 'border-[#27272A]'
                      }`}>
                        <span className={isLight ? 'text-zinc-500' : 'text-zinc-400'}>Estimated Loss:</span>
                        <span className="font-bold text-rose-600 dark:text-rose-400">{pp.estimatedRevenueLoss}</span>
                      </div>

                      <div className={`text-[11px] p-2 rounded border ${
                        isLight
                          ? 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
                          : 'text-indigo-300 bg-indigo-950/30 border-indigo-500/20'
                      }`}>
                        <strong>Solution:</strong> {pp.recommendedFix}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phased Roadmap */}
              <div className="space-y-3">
                <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                  isLight ? 'text-zinc-600' : 'text-zinc-400'
                }`}>
                  <Layers className="w-3.5 h-3.5 text-indigo-500" />
                  <span>2. Phased Execution & Deliverables Roadmap</span>
                </h3>

                <div className="space-y-2.5">
                  {(lead.proposal?.proposedSolution || [
                    {
                      phase: 'Phase 1: Speed-to-Lead & 24/7 AI Ingestion',
                      timeline: 'Week 1',
                      deliverables: [
                        'Deploy sub-60s AI Receptionist with instant SMS/Voice confirmation',
                        'Integrate CRM webhook relays for live lead ingestion',
                        'Set up negative review interception and Google Maps ranking audit'
                      ]
                    },
                    {
                      phase: 'Phase 2: High-Performance Multi-Channel Ad Dominance',
                      timeline: 'Weeks 2 - 3',
                      deliverables: [
                        'Launch hyper-targeted Meta & Google Search ad campaigns',
                        'Deploy conversion-optimized landing pages with appointment calendar',
                        'Activate dormant customer database reactivation sequence'
                      ]
                    },
                    {
                      phase: 'Phase 3: Scale, Optimization & Territory Exclusivity',
                      timeline: 'Week 4 Onward',
                      deliverables: [
                        'Scale winning ad creatives and optimize cost-per-booked-meeting',
                        'Weekly executive ROI reporting and attribution auditing',
                        'Lock in geographic exclusivity for your service niche'
                      ]
                    }
                  ]).map((phase, idx) => (
                    <div key={idx} className={`p-3.5 rounded-lg border space-y-2 ${
                      isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-[#141418] border-[#27272A]'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold flex items-center gap-2 ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          {phase.phase}
                        </span>
                        <span className={`text-[11px] px-2 py-0.5 rounded font-mono ${
                          isLight ? 'bg-zinc-200 text-zinc-700' : 'bg-zinc-800 text-zinc-300'
                        }`}>
                          {phase.timeline}
                        </span>
                      </div>
                      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-5 text-xs ${
                        isLight ? 'text-zinc-700' : 'text-zinc-300'
                      }`}>
                        {phase.deliverables.map((d, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projected ROI Table */}
              <div className="space-y-3">
                <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                  isLight ? 'text-zinc-600' : 'text-zinc-400'
                }`}>
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  <span>3. Projected Financial Impact & ROI Model</span>
                </h3>

                <div className={`overflow-x-auto rounded-lg border ${
                  isLight ? 'border-zinc-200' : 'border-[#27272A]'
                }`}>
                  <table className="w-full text-left text-xs">
                    <thead className={`font-bold border-b ${
                      isLight ? 'bg-zinc-100 text-zinc-800 border-zinc-200' : 'bg-[#18181C] text-zinc-300 border-[#27272A]'
                    }`}>
                      <tr>
                        <th className="p-3">Core Performance Metric</th>
                        <th className="p-3">Current Baseline</th>
                        <th className="p-3">With {agencyName}</th>
                        <th className="p-3 text-right">Net Financial Gain</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${
                      isLight ? 'divide-zinc-200 text-zinc-800' : 'divide-[#27272A] text-zinc-300'
                    }`}>
                      {(lead.proposal?.projectedRoi || [
                        {
                          metric: 'Inquiry Response Latency',
                          currentEstimated: '42 mins (High drop-off)',
                          projectedWithSolution: 'Under 45 Seconds (AI Bot)',
                          financialGain: '+$140,000 / yr'
                        },
                        {
                          metric: 'Qualified Monthly Sales Meetings',
                          currentEstimated: '6 - 8 calls/mo',
                          projectedWithSolution: '24 - 32 booked meetings/mo',
                          financialGain: '+$210,000 / yr'
                        },
                        {
                          metric: 'Dormant Lead Reactivation',
                          currentEstimated: '0% recovered',
                          projectedWithSolution: '15 - 20 past contacts closed',
                          financialGain: '+$95,000 / yr'
                        }
                      ]).map((roi, idx) => (
                        <tr key={idx} className={`transition-colors ${
                          isLight ? 'hover:bg-zinc-50' : 'hover:bg-[#18181B]/50'
                        }`}>
                          <td className={`p-3 font-semibold ${isLight ? 'text-zinc-900' : 'text-white'}`}>{roi.metric}</td>
                          <td className={`p-3 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>{roi.currentEstimated}</td>
                          <td className="p-3 text-indigo-600 dark:text-indigo-300 font-medium">{roi.projectedWithSolution}</td>
                          <td className="p-3 text-right font-bold text-emerald-600 dark:text-emerald-400">{roi.financialGain}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Commercial Pricing Packages */}
              <div className="space-y-3">
                <h3 className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  4. Commercial Investment Packages
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {(activeAgency?.pricingTiers || lead.proposal?.pricingTiers || [
                    {
                      name: 'Growth Accelerate',
                      price: '$2,450',
                      billingPeriod: '/month',
                      description: 'Single channel ad management + 24/7 AI lead response bot.',
                      features: ['Meta Ads Management', '24/7 AI Concierge', 'Monthly Strategy Reviews'],
                    },
                    {
                      name: 'Omni-Dominance',
                      price: '$4,800',
                      billingPeriod: '/month',
                      description: 'Full multi-platform acquisition with guaranteed booked appointments.',
                      features: ['Meta + Google Ads', 'AI Voice & SMS Booker', 'Database Reactivation Campaign'],
                      highlighted: true,
                    },
                    {
                      name: 'Enterprise Scale',
                      price: '$8,500',
                      billingPeriod: '/month',
                      description: 'Complete market domination with geographic territory exclusivity.',
                      features: ['Geo-Territory Exclusivity', 'Custom Vector AI Model', 'VIP Support Channel'],
                    }
                  ]).map((tier, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border flex flex-col justify-between ${
                        tier.highlighted
                          ? isLight
                            ? 'border-indigo-500 bg-indigo-50/50 shadow-md ring-1 ring-indigo-500/30'
                            : 'border-indigo-500 bg-indigo-950/20 shadow-md ring-1 ring-indigo-500/40'
                          : isLight
                          ? 'border-zinc-200 bg-white'
                          : 'border-[#27272A] bg-[#141418]'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`font-bold text-xs ${isLight ? 'text-zinc-900' : 'text-white'}`}>{tier.name}</span>
                          {tier.highlighted && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-600 text-white uppercase">
                              Recommended
                            </span>
                          )}
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className={`text-lg font-black ${isLight ? 'text-zinc-900' : 'text-white'}`}>{tier.price}</span>
                          <span className={`text-xs ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>{tier.billingPeriod}</span>
                        </div>
                        <p className={`text-[11px] ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>{tier.description}</p>
                        
                        <div className={`pt-2 border-t space-y-1 ${
                          isLight ? 'border-zinc-200' : 'border-[#27272A]'
                        }`}>
                          {tier.features.map((f, fIdx) => (
                            <div key={fIdx} className={`flex items-center gap-1.5 text-[11px] ${
                              isLight ? 'text-zinc-700' : 'text-zinc-300'
                            }`}>
                              <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Guarantee Badge */}
              <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                isLight
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                  : 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200'
              }`}>
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                    Our Direct Performance Guarantee
                  </h4>
                  <p className={`text-xs leading-relaxed font-medium ${isLight ? 'text-emerald-900' : 'text-zinc-300'}`}>
                    {guaranteeText}
                  </p>
                </div>
              </div>

              {/* Signatures & Formal Acceptance */}
              <div className={`pt-6 border-t grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs ${
                isLight ? 'border-zinc-200' : 'border-[#27272A]'
              }`}>
                <div className={`space-y-3 p-4 rounded-lg border ${
                  isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-[#141418] border-[#27272A]'
                }`}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Authorized Agency Signatory
                  </span>
                  <div className="space-y-1">
                    <div className={`font-bold text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>{agencySender}</div>
                    <div className={isLight ? 'text-zinc-600' : 'text-zinc-400'}>{agencyRole}</div>
                    <div className={isLight ? 'text-zinc-600' : 'text-zinc-400'}>{agencyName}</div>
                    <div className="text-zinc-400 text-[11px]">Signature: <i>Marcus Vance (Digital Verification ID: #ADV-247)</i></div>
                  </div>
                </div>

                <div className={`space-y-3 p-4 rounded-lg border ${
                  isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-[#141418] border-[#27272A]'
                }`}>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                  }`}>
                    Client Authorized Acceptance
                  </span>
                  <div className="space-y-1">
                    <div className={`font-bold text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>{lead.name}</div>
                    <div className={isLight ? 'text-zinc-600' : 'text-zinc-400'}>{lead.title || 'Managing Principal'}</div>
                    <div className={isLight ? 'text-zinc-600' : 'text-zinc-400'}>{lead.companyName}</div>
                    <div className="text-zinc-400 text-[11px] pt-1">Date: ________________________</div>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* Clean Plaintext / Markdown Editor */
            <div className="max-w-4xl mx-auto">
              <pre className={`whitespace-pre-wrap font-sans text-xs leading-relaxed p-5 rounded-xl border shadow-xs select-text ${
                isLight ? 'bg-white border-zinc-200 text-zinc-800' : 'bg-[#121215] border-[#27272A] text-zinc-300'
              }`}>
                {generatedContent}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className={`flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t ${
          isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-[#121215] border-[#27272A]'
        }`}>
          <div className={`text-xs hidden sm:flex items-center gap-2 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Ready for Client Presentation, Word, PDF & Direct Email Dispatch</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                isLight
                  ? 'bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900'
                  : 'bg-[#18181B] border-[#27272A] text-zinc-300 hover:text-white hover:border-zinc-500'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            {/* Word Export Button */}
            <button
              type="button"
              id="btn-export-word"
              onClick={() => downloadWordDocument(lead, activeAgency, docType)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                isLight
                  ? 'bg-white border-blue-300 text-blue-700 hover:bg-blue-50'
                  : 'bg-[#18181B] border-blue-500/40 text-blue-300 hover:bg-blue-950/30'
              }`}
              title="Export as Microsoft Word (.doc) formatted document"
            >
              <FileType className="w-3.5 h-3.5 text-blue-500" />
              <span>Export Word (.doc)</span>
            </button>

            {/* PDF Export Button */}
            <button
              type="button"
              id="btn-export-pdf"
              onClick={() => triggerPrintablePdf(lead, activeAgency, docType)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                isLight
                  ? 'bg-white border-rose-300 text-rose-700 hover:bg-rose-50'
                  : 'bg-[#18181B] border-rose-500/40 text-rose-300 hover:bg-rose-950/30'
              }`}
              title="Export as high-resolution printable PDF"
            >
              <Printer className="w-3.5 h-3.5 text-rose-500" />
              <span>Export PDF / Print</span>
            </button>

            {/* Direct Email to Client Button */}
            <button
              type="button"
              id="btn-send-proposal-email"
              onClick={() => setShowEmailModal(true)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors cursor-pointer shadow-xs"
              title="Send branded proposal directly to the client's email via real SMTP system"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send via Email</span>
            </button>
          </div>
        </div>

      </div>

      {/* Real Email Dispatcher Sub-Modal */}
      {showEmailModal && (
        <SendProposalEmailModal
          lead={lead}
          activeAgency={activeAgency}
          theme={theme}
          onClose={() => setShowEmailModal(false)}
        />
      )}
    </div>
  );
};
