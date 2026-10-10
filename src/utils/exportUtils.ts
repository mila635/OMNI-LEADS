import { Lead, AgencyProfile } from '../types';

/**
 * Generates an executive Microsoft Word (.doc) compatible HTML document
 * containing clean formatting, styles, tables, letterhead, and signature blocks.
 */
export function generateWordDocumentBlob(lead: Lead, agency?: AgencyProfile, docType = 'proposal'): Blob {
  const agencyName = agency?.name || 'ADS RESULTS 24/7';
  const agencyWebsite = agency?.website || 'https://adsresults247.com';
  const agencySender = agency?.senderName || 'Marcus Vance';
  const agencyRole = agency?.senderRole || 'Head of Client Growth & Partner';
  const agencyEmail = agency?.senderEmail || 'marcus@adsresults247.com';
  const agencyPhone = agency?.senderPhone || '+1 (800) 459-2470';
  const agencyTagline = agency?.tagline || 'Strategic Customer Acquisition & Automation Infrastructure';
  const guaranteeText = agency?.guaranteeTerms || lead?.proposal?.guaranteeTerms || 'Guaranteed minimum 20 verified sales appointments in first 30 days or we work free until achieved.';
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const wordHtml = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <!--[if gte mso 9]>
  <xml>
  <w:WordDocument>
    <w:View>Print</w:View>
    <w:Zoom>100</w:Zoom>
    <w:DoNotOptimizeForBrowser/>
  </w:WordDocument>
  </xml>
  <![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>${agencyName} - Strategic Growth Proposal for ${lead.companyName}</title>
  <style>
    @page Section1 {
      size: 8.5in 11.0in;
      margin: 1.0in 1.0in 1.0in 1.0in;
      mso-header-margin: 0.5in;
      mso-footer-margin: 0.5in;
      mso-paper-source: 0;
    }
    div.Section1 { page: Section1; }
    body {
      font-family: 'Calibri', 'Arial', sans-serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #111827;
      background-color: #ffffff;
      margin: 0;
      padding: 0;
    }
    h1 {
      font-size: 20pt;
      color: #3730a3;
      margin-bottom: 2pt;
      font-weight: bold;
    }
    h2 {
      font-size: 14pt;
      color: #1e1b4b;
      border-bottom: 1.5pt solid #4f46e5;
      padding-bottom: 4pt;
      margin-top: 18pt;
      margin-bottom: 8pt;
    }
    h3 {
      font-size: 12pt;
      color: #312e81;
      margin-top: 12pt;
      margin-bottom: 4pt;
    }
    p, li {
      font-size: 11pt;
      color: #374151;
    }
    .header-table {
      width: 100%;
      border-collapse: collapse;
      border-bottom: 2pt solid #4f46e5;
      margin-bottom: 16pt;
      padding-bottom: 12pt;
    }
    .client-card {
      background-color: #f3f4f6;
      border: 1pt solid #d1d5db;
      padding: 10pt;
      border-radius: 4pt;
    }
    .badge {
      background-color: #e0e7ff;
      color: #3730a3;
      font-size: 9pt;
      font-weight: bold;
      padding: 2pt 6pt;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin: 12pt 0;
    }
    table.data-table th {
      background-color: #f3f4f6;
      border: 1pt solid #d1d5db;
      padding: 6pt 8pt;
      font-weight: bold;
      color: #111827;
      text-align: left;
    }
    table.data-table td {
      border: 1pt solid #e5e7eb;
      padding: 6pt 8pt;
      color: #374151;
    }
    .card-box {
      border: 1pt solid #e5e7eb;
      background-color: #f9fafb;
      padding: 10pt;
      margin-bottom: 8pt;
      border-left: 3pt solid #4f46e5;
    }
    .guarantee-box {
      border: 1.5pt solid #10b981;
      background-color: #ecfdf5;
      color: #065f46;
      padding: 12pt;
      margin: 14pt 0;
    }
    .signature-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 24pt;
      border-top: 1.5pt solid #d1d5db;
      padding-top: 14pt;
    }
    .sign-line {
      border-top: 1pt solid #9ca3af;
      margin-top: 30pt;
      padding-top: 4pt;
      font-size: 9pt;
      color: #6b7280;
    }
  </style>
</head>
<body>
<div class="Section1">
  <!-- Header Table -->
  <table class="header-table">
    <tr>
      <td style="vertical-align: top; width: 60%;">
        <h1>${agencyName}</h1>
        <p style="margin: 0; color: #6b7280; font-size: 10pt;">${agencyTagline}</p>
        <p style="margin: 4pt 0 0 0; font-size: 9.5pt; color: #4b5563;">
          <strong>Direct:</strong> ${agencyPhone} | <strong>Email:</strong> ${agencyEmail}<br>
          <strong>Website:</strong> ${agencyWebsite}
        </p>
      </td>
      <td style="vertical-align: top; width: 40%; text-align: right;">
        <div class="client-card" style="text-align: left;">
          <span class="badge">OFFICIAL PROPOSAL</span>
          <div style="font-size: 12pt; font-weight: bold; color: #111827; margin-top: 4pt;">${lead.companyName}</div>
          <div style="font-size: 10pt; color: #4b5563;"><strong>Attn:</strong> ${lead.name} (${lead.title || 'Managing Principal'})</div>
          <div style="font-size: 9.5pt; color: #6b7280;">${lead.location?.formatted || 'United States'}</div>
          <div style="font-size: 9pt; color: #9ca3af; margin-top: 4pt;">Date: ${today}</div>
        </div>
      </td>
    </tr>
  </table>

  <h2>1. Executive Summary & Growth Strategy</h2>
  <p>
    This proposal establishes an end-to-end commercial customer acquisition and speed-to-lead automation infrastructure for <strong>${lead.companyName}</strong>. 
    Prepared by <strong>${agencyName}</strong>, this strategic engagement is engineered to eliminate inquiry callback delay, recover abandoned consultation opportunities, and guarantee steady monthly booked sales meetings.
  </p>

  <h2>2. Diagnosed Operational Bottlenecks</h2>
  ${(lead.painPoints || []).map((pp, i) => `
    <div class="card-box">
      <div style="font-weight: bold; color: #b91c1c; font-size: 11pt;">Bottleneck ${i + 1}: ${pp.title}</div>
      <p style="margin: 2pt 0; font-size: 10pt; color: #4b5563;">
        <strong>Severity:</strong> ${pp.severity} | <strong>Est. Financial Impact:</strong> ${pp.estimatedRevenueLoss}
      </p>
      <p style="margin: 4pt 0; font-size: 10.5pt;">${pp.description}</p>
      <p style="margin: 4pt 0 0 0; font-size: 10pt; color: #047857;">
        <strong>Prescribed Solution:</strong> ${pp.recommendedFix}
      </p>
    </div>
  `).join('')}

  <h2>3. Phased Implementation Roadmap</h2>
  ${(lead.proposal?.proposedSolution || [
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
  ]).map((phase) => `
    <div class="card-box" style="border-left-color: #3b82f6;">
      <div style="font-weight: bold; color: #1d4ed8; font-size: 11pt;">${phase.phase} (${phase.timeline})</div>
      <ul style="margin: 4pt 0 0 0; padding-left: 18pt;">
        ${phase.deliverables.map((d: string) => `<li>${d}</li>`).join('')}
      </ul>
    </div>
  `).join('')}

  <h2>4. Projected Financial Return on Investment (ROI)</h2>
  <table class="data-table">
    <thead>
      <tr>
        <th>Performance Indicator</th>
        <th>Current Baseline</th>
        <th>Projected with ${agencyName}</th>
        <th style="text-align: right;">Net Projected Gain</th>
      </tr>
    </thead>
    <tbody>
      ${(lead.proposal?.projectedRoi || [
        {
          metric: 'Inquiry Callback Latency',
          currentEstimated: '42 mins (High drop-off)',
          projectedWithSolution: 'Under 45 Seconds (AI Bot)',
          financialGain: '+$140,000 / yr'
        },
        {
          metric: 'Monthly Qualified Sales Meetings',
          currentEstimated: '6 - 8 calls/mo',
          projectedWithSolution: '24 - 32 booked meetings/mo',
          financialGain: '+$210,000 / yr'
        },
        {
          metric: 'Dormant Customer Reactivation',
          currentEstimated: '0% recovered',
          projectedWithSolution: '15 - 20 closed clients',
          financialGain: '+$95,000 / yr'
        }
      ]).map((roi) => `
        <tr>
          <td><strong>${roi.metric}</strong></td>
          <td>${roi.currentEstimated}</td>
          <td style="color: #4338ca;">${roi.projectedWithSolution}</td>
          <td style="text-align: right; color: #047857; font-weight: bold;">${roi.financialGain}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <h2>5. Commercial Investment Packages</h2>
  <table class="data-table">
    <thead>
      <tr>
        <th>Tier / Package</th>
        <th>Investment</th>
        <th>Scope of Deliverables</th>
      </tr>
    </thead>
    <tbody>
      ${(agency?.pricingTiers || lead.proposal?.pricingTiers || [
        {
          name: 'Growth Accelerate',
          price: '$2,450',
          billingPeriod: '/month',
          description: 'Single channel ad management + 24/7 AI lead response bot.',
          features: ['Meta Ads Management', '24/7 AI Concierge', 'Monthly Strategy Reviews']
        },
        {
          name: 'Omni-Dominance (Recommended)',
          price: '$4,800',
          billingPeriod: '/month',
          description: 'Full multi-platform acquisition with guaranteed booked appointments.',
          features: ['Meta + Google Ads', 'AI Voice & SMS Booker', 'Database Reactivation Campaign']
        },
        {
          name: 'Enterprise Scale',
          price: '$8,500',
          billingPeriod: '/month',
          description: 'Complete market domination with geographic territory exclusivity.',
          features: ['Geo-Territory Exclusivity', 'Custom Vector AI Model', 'VIP Support Channel']
        }
      ]).map((t) => `
        <tr>
          <td><strong>${t.name}</strong><br><span style="font-size: 9pt; color: #6b7280;">${t.description}</span></td>
          <td style="font-size: 13pt; font-weight: bold; color: #3730a3; white-space: nowrap;">${t.price} <span style="font-size: 9pt; font-weight: normal; color: #6b7280;">${t.billingPeriod}</span></td>
          <td>
            <ul style="margin: 0; padding-left: 14pt; font-size: 10pt;">
              ${t.features.map((f: string) => `<li>${f}</li>`).join('')}
            </ul>
          </td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="guarantee-box">
    <strong style="font-size: 11.5pt;">🛡️ Direct Performance SLA Guarantee</strong>
    <p style="margin: 4pt 0 0 0; font-size: 10.5pt;">${guaranteeText}</p>
  </div>

  <h2>6. Formal Authorization & Signatures</h2>
  <table class="signature-table">
    <tr>
      <td style="width: 50%; vertical-align: top; padding-right: 15pt;">
        <div style="font-weight: bold; color: #3730a3; font-size: 11pt;">Authorized for ${agencyName}:</div>
        <div style="font-size: 10.5pt; font-weight: bold; margin-top: 4pt;">${agencySender}</div>
        <div style="font-size: 10pt; color: #6b7280;">${agencyRole}</div>
        <div style="font-size: 9.5pt; color: #4b5563;">${agencyName}</div>
        <div class="sign-line">Authorized Signatory (Digital Verification #ADV-247)</div>
      </td>
      <td style="width: 50%; vertical-align: top; padding-left: 15pt;">
        <div style="font-weight: bold; color: #111827; font-size: 11pt;">Accepted for ${lead.companyName}:</div>
        <div style="font-size: 10.5pt; font-weight: bold; margin-top: 4pt;">${lead.name}</div>
        <div style="font-size: 10pt; color: #6b7280;">${lead.title || 'Managing Principal'}</div>
        <div style="font-size: 9.5pt; color: #4b5563;">${lead.companyName}</div>
        <div class="sign-line">Client Acceptance Signature & Date</div>
      </td>
    </tr>
  </table>
</div>
</body>
</html>
  `;

  return new Blob([wordHtml], { type: 'application/msword;charset=utf-8' });
}

/**
 * Downloads a Word document directly to the client file system.
 */
export function downloadWordDocument(lead: Lead, agency?: AgencyProfile, docType = 'proposal') {
  const blob = generateWordDocumentBlob(lead, agency, docType);
  const cleanName = (lead.companyName || 'Enterprise').replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${cleanName}_Strategic_Proposal.doc`;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Opens high-resolution printable PDF window formatted specifically for PDF generation.
 */
export function triggerPrintablePdf(lead: Lead, agency?: AgencyProfile, docType = 'proposal') {
  const agencyName = agency?.name || 'ADS RESULTS 24/7';
  const agencyWebsite = agency?.website || 'https://adsresults247.com';
  const agencySender = agency?.senderName || 'Marcus Vance';
  const agencyRole = agency?.senderRole || 'Head of Client Growth & Partner';
  const agencyEmail = agency?.senderEmail || 'marcus@adsresults247.com';
  const agencyPhone = agency?.senderPhone || '+1 (800) 459-2470';
  const agencyTagline = agency?.tagline || 'Strategic Customer Acquisition & Automation Infrastructure';
  const guaranteeText = agency?.guaranteeTerms || lead?.proposal?.guaranteeTerms || 'Guaranteed minimum 20 verified sales appointments in first 30 days or we work free until achieved.';
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const printFrame = document.createElement('iframe');
  printFrame.style.position = 'fixed';
  printFrame.style.right = '0';
  printFrame.style.bottom = '0';
  printFrame.style.width = '0';
  printFrame.style.height = '0';
  printFrame.style.border = '0';
  document.body.appendChild(printFrame);

  const frameDoc = printFrame.contentWindow?.document;
  if (!frameDoc) return;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${agencyName} - Growth Proposal for ${lead.companyName}</title>
        <style>
          @page { size: letter portrait; margin: 16mm 14mm; }
          * { box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #111827;
            background: #ffffff;
            line-height: 1.5;
            font-size: 12px;
            padding: 20px;
          }
          .header-box {
            display: flex;
            justify-content: space-between;
            border-bottom: 2.5px solid #4f46e5;
            padding-bottom: 16px;
            margin-bottom: 20px;
          }
          .agency-title { font-size: 22px; font-weight: 800; color: #4f46e5; }
          .agency-sub { font-size: 11px; color: #6b7280; font-weight: 500; margin-top: 2px; }
          .client-card {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 10px 14px;
            min-width: 250px;
          }
          .badge {
            display: inline-block;
            background: #eef2ff;
            color: #4f46e5;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 4px;
          }
          .section-title {
            font-size: 14px;
            font-weight: 700;
            color: #111827;
            border-bottom: 1.5px solid #e5e7eb;
            padding-bottom: 4px;
            margin: 18px 0 10px 0;
          }
          .card {
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 10px 12px;
            margin-bottom: 8px;
            background: #ffffff;
          }
          .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
          .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
          table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 11px; }
          th { background: #f3f4f6; text-align: left; padding: 6px 8px; border: 1px solid #e5e7eb; font-weight: 700; }
          td { padding: 6px 8px; border: 1px solid #e5e7eb; }
          .guarantee-box {
            background: #ecfdf5;
            border: 1.5px solid #a7f3d0;
            border-radius: 6px;
            padding: 12px;
            margin: 14px 0;
            color: #065f46;
          }
          .signature-box {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin-top: 24px;
            padding-top: 16px;
            border-top: 1.5px solid #e5e7eb;
          }
          .sign-line {
            margin-top: 28px;
            border-top: 1px solid #9ca3af;
            padding-top: 4px;
            font-size: 10px;
            color: #6b7280;
          }
        </style>
      </head>
      <body>
        <div class="header-box">
          <div>
            <div class="agency-title">${agencyName}</div>
            <div class="agency-sub">${agencyTagline}</div>
            <div style="font-size: 11px; color: #6b7280; margin-top: 6px;">
              Direct: ${agencyPhone} | Email: ${agencyEmail} | Web: ${agencyWebsite}
            </div>
          </div>
          <div class="client-card">
            <div class="badge">Strategic Growth Proposal</div>
            <h3 style="margin: 0; font-size: 14px; color: #111827;">${lead.companyName}</h3>
            <div>${lead.name} • ${lead.title || 'Managing Principal'}</div>
            <div>${lead.location.formatted}</div>
            <div style="font-size: 10px; color: #9ca3af; margin-top: 3px;">Date: ${today}</div>
          </div>
        </div>

        <div class="section-title">1. Executive Overview & Diagnostic</div>
        <p style="font-size: 12px; color: #374151; margin: 6px 0;">
          ${lead.proposal?.executiveSummary || `This strategic proposal provides ${lead.companyName} with a fully automated, multi-channel customer acquisition infrastructure engineered to capture 100% of high-intent inquiries in under 60 seconds.`}
        </p>

        <div class="section-title">2. Diagnosed Operational Bottlenecks</div>
        <div class="grid-2">
          ${(lead.painPoints || []).map((pp, i) => `
            <div class="card" style="border-left: 3px solid #ef4444;">
              <strong style="color: #b91c1c; font-size: 11.5px;">Bottleneck ${i + 1}: ${pp.title}</strong>
              <div style="font-size: 10px; color: #6b7280; margin: 2px 0;">Severity: ${pp.severity} | Est. Loss: ${pp.estimatedRevenueLoss}</div>
              <div style="font-size: 11px; color: #374151;">${pp.description}</div>
              <div style="font-size: 10.5px; color: #047857; margin-top: 3px;"><strong>Solution:</strong> ${pp.recommendedFix}</div>
            </div>
          `).join('')}
        </div>

        <div class="section-title">3. Projected Financial ROI Model</div>
        <table>
          <thead>
            <tr>
              <th>Performance Indicator</th>
              <th>Current Baseline</th>
              <th>With ${agencyName}</th>
              <th style="text-align: right;">Net Projected Gain</th>
            </tr>
          </thead>
          <tbody>
            ${(lead.proposal?.projectedRoi || [
              { metric: 'Inquiry Response Latency', currentEstimated: '42 mins (High drop-off)', projectedWithSolution: 'Under 45 Seconds (AI Bot)', financialGain: '+$140,000 / yr' },
              { metric: 'Qualified Monthly Sales Meetings', currentEstimated: '6 - 8 calls/mo', projectedWithSolution: '24 - 32 booked meetings/mo', financialGain: '+$210,000 / yr' },
              { metric: 'Dormant Customer Reactivation', currentEstimated: '0% recovered', projectedWithSolution: '15 - 20 closed clients', financialGain: '+$95,000 / yr' },
            ]).map((r) => `
              <tr>
                <td><strong>${r.metric}</strong></td>
                <td>${r.currentEstimated}</td>
                <td style="color: #4338ca;">${r.projectedWithSolution}</td>
                <td style="text-align: right; color: #047857; font-weight: bold;">${r.financialGain}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="section-title">4. Commercial Pricing Packages</div>
        <div class="grid-3">
          ${(agency?.pricingTiers || lead.proposal?.pricingTiers || [
            { name: 'Growth Accelerate', price: '$2,450', billingPeriod: '/month', description: 'Single channel ad management + 24/7 AI lead response bot.', features: ['Meta Ads Management', '24/7 AI Concierge', 'Monthly Reviews'] },
            { name: 'Omni-Dominance', price: '$4,800', billingPeriod: '/month', description: 'Full multi-platform acquisition with guaranteed appointments.', features: ['Meta + Google Ads', 'AI Voice & SMS Booker', 'Reactivation Flow'] },
            { name: 'Enterprise Scale', price: '$8,500', billingPeriod: '/month', description: 'Complete market domination with geographic territory exclusivity.', features: ['Territory Exclusivity', 'Custom Vector Model', 'VIP Support'] },
          ]).map((t) => `
            <div class="card" style="background: #fafafa;">
              <strong style="font-size: 12px; color: #111827;">${t.name}</strong>
              <div style="font-size: 14px; font-weight: bold; color: #4f46e5; margin: 2px 0;">${t.price} <span style="font-size: 9.5px; color: #6b7280; font-weight: normal;">${t.billingPeriod}</span></div>
              <p style="font-size: 10px; color: #4b5563; margin: 3px 0;">${t.description}</p>
              <ul style="margin: 0; padding-left: 14px; font-size: 10px;">
                ${t.features.map((f: string) => `<li>${f}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <div class="guarantee-box">
          <strong>🛡️ Direct SLA Performance Guarantee:</strong>
          <div style="margin-top: 3px;">${guaranteeText}</div>
        </div>

        <div class="signature-box">
          <div>
            <div style="font-weight: bold; color: #4f46e5;">For ${agencyName}:</div>
            <div>${agencySender}</div>
            <div style="color: #6b7280;">${agencyRole}</div>
            <div class="sign-line">Authorized Signatory (Digital Verification #ADV-247)</div>
          </div>
          <div>
            <div style="font-weight: bold; color: #111827;">For ${lead.companyName}:</div>
            <div>${lead.name}</div>
            <div style="color: #6b7280;">${lead.title || 'Managing Principal'}</div>
            <div class="sign-line">Client Acceptance Signature & Date</div>
          </div>
        </div>
      </body>
    </html>
  `;

  frameDoc.open();
  frameDoc.write(html);
  frameDoc.close();

  setTimeout(() => {
    printFrame.contentWindow?.focus();
    printFrame.contentWindow?.print();
    setTimeout(() => {
      document.body.removeChild(printFrame);
    }, 2500);
  }, 500);
}
