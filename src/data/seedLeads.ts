import { Lead, LeadCategory, PlatformSource, AgencyProfile } from '../types';

export const DEFAULT_AGENCIES: AgencyProfile[] = [
  {
    id: 'agency-ads-results-247',
    name: 'ADS RESULTS 24/7',
    tagline: 'High-Performance Paid Ads, AI Speed-to-Lead & 24/7 Ingestion Infrastructure',
    website: 'https://adsresults247.com',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=256&q=80',
    senderName: 'Marcus Vance',
    senderRole: 'Head of Client Growth & Partner',
    senderEmail: 'marcus@adsresults247.com',
    senderPhone: '+1 (800) 459-2470',
    companyBio: 'ADS RESULTS 24/7 is a premier full-funnel digital growth agency delivering high-ROI Meta & Google advertising, 24/7 AI-driven speed-to-lead automated booking systems, and revenue recovery infrastructure for service businesses, healthcare practices, and real estate enterprises.',
    coreServices: [
      'Omnichannel Paid Ads (Meta, Google Search, YouTube, TikTok Ads)',
      '24/7 Sub-60s AI Voice & SMS Speed-to-Lead Receptionist',
      'High-Ticket Funnel & Conversion Landing Page Architecture',
      'Negative Review Interception & Local Google Maps Ranking Engine',
      'Dormant Database CRM Reactivation (SMS/Email Sequences)',
      'Direct Appointment Booking Integration & Closed-Loop Attribution',
    ],
    pricingTiers: [
      {
        name: 'Growth Accelerate (Single Channel + AI Bot)',
        price: '$2,450',
        billingPeriod: '/month',
        description: 'Ideal for established local businesses looking to capture every inbound lead within 60 seconds.',
        features: [
          'Full Meta / Google Ads Management',
          '24/7 AI Speed-to-Lead SMS & WhatsApp Concierge',
          'Dedicated High-Converting Landing Page',
          'Weekly Ad Creative Refreshes',
          'CRM Ingestion & Slack/Email Alerts',
        ],
      },
      {
        name: 'Omni-Dominance (Full-Funnel + Multi-Channel)',
        price: '$4,800',
        billingPeriod: '/month',
        description: 'Complete multi-platform customer acquisition engine with guaranteed qualified booked appointments.',
        features: [
          'Omnichannel Ads (Meta + Google Search + YouTube Retargeting)',
          'AI Voice + SMS 2-Way Conversational Appointment Booker',
          'Dormant Database Reactivation Campaign (Recapture 20+ past leads/mo)',
          'Local SEO & Google Maps Review Booster Protocol',
          'Bi-Weekly Strategy & ROI Attribution Calls',
        ],
        highlighted: true,
      },
      {
        name: 'Enterprise Scale (Territory Exclusivity)',
        price: '$8,500',
        billingPeriod: '/month',
        description: 'Complete market domination with geographic territory exclusivity and dedicated account engineers.',
        features: [
          '100% Geo-Territory Exclusivity in your metro market',
          'Custom Vector AI Model trained on your specific business FAQ',
          'Full CRM Pipeline Automation (HubSpot / GoHighLevel / Salesforce)',
          'Daily Ad Spend & Attribution Optimizations',
          '24/7 Priority VIP Support Channel',
        ],
      },
    ],
    guaranteeTerms: 'Guaranteed minimum 20 verified, qualified sales appointments within first 30 days or we work completely free until achieved.',
    caseStudies: [
      {
        clientNiche: 'Luxury Real Estate Brokerage (Miami, FL)',
        headline: 'Added $9.4M in Closed Transaction Volume in 90 Days',
        result: 'Cut speed-to-lead from 45 mins to 28 seconds; booked 41 luxury buyer showings directly into agent calendars.',
      },
      {
        clientNiche: 'Multi-Location Dental & Implant Center',
        headline: 'Generated $142,000 in High-Ticket All-on-4 Cases',
        result: 'Reduced patient acquisition cost by 54% using hyper-targeted Google Search ads and automated review filtering.',
      },
      {
        clientNiche: 'Residential Roofing & Solar Contractor',
        headline: 'Closed 19 New Roof Replacements in 30 Days After Hailstorm',
        result: 'Instant geo-fenced storm alerts combined with AI booking receptionist delivered 6.8x return on ad spend.',
      },
    ],
    targetNiches: [
      'Real Estate',
      'Dental & Healthcare',
      'Home Services & Contractors',
      'Solar & CleanTech',
      'Legal & Financial',
      'SaaS & Tech',
    ],
    pitchTone: 'Executive & Data-Driven',
    isDefault: true,
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z',
  },
  {
    id: 'agency-apex-growth-ai',
    name: 'Apex AI Growth Labs',
    tagline: 'Enterprise B2B Pipeline Engineering & Outbound Intelligence',
    website: 'https://apexaigrowth.io',
    logoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=256&q=80',
    senderName: 'Elena Rostova',
    senderRole: 'Managing Partner',
    senderEmail: 'elena@apexaigrowth.io',
    senderPhone: '+1 (415) 890-3411',
    companyBio: 'Apex AI Growth Labs specializes in B2B outbound automation, cold email infrastructure, and AI-driven pipeline generation for Series A-C SaaS and high-ticket service companies.',
    coreServices: [
      'Cold Email Deliverability & Domain Infrastructure Setup',
      'AI-Personalized Outbound Sequences with Vector Grounding',
      'LinkedIn Social Selling & InMail Automation',
      'Sales Development Rep (SDR) Workflow Engineering',
    ],
    pricingTiers: [
      {
        name: 'SDR Outbound Starter',
        price: '$3,000',
        billingPeriod: '/month',
        description: 'Turnkey cold outreach setup with 1,500 personalized touches per month.',
        features: ['5 Dedicated Sending Inboxes', 'AI Personalization Copywriting', '15-20 Guaranteed Sales Calls/mo'],
      },
      {
        name: 'Enterprise Scale Pipeline',
        price: '$6,500',
        billingPeriod: '/month',
        description: 'Multi-channel outbound with LinkedIn & custom intent signals.',
        features: ['15 Dedicated Inboxes', 'LinkedIn Sales Nav Integration', '35-50 Guaranteed Sales Calls/mo'],
        highlighted: true,
      },
    ],
    guaranteeTerms: 'Minimum 15 qualified enterprise demos per month or month is refunded.',
    caseStudies: [
      {
        clientNiche: 'Series A FinTech SaaS',
        headline: 'Booked 48 Enterprise Demos with Fortune 500 VP Finance in 60 Days',
        result: 'Resulted in $420,000 net new ARR closed pipeline.',
      },
    ],
    targetNiches: ['SaaS & Tech', 'Legal & Financial', 'Marketing & Creative Agency'],
    pitchTone: 'Consultative Strategic Partner',
    isDefault: false,
    createdAt: '2026-08-10T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z',
  },
];

export const INITIAL_SEED_LEADS: Lead[] = [

  {
    id: 'lead-usa-realestate-01',
    name: 'Marcus Vance',
    companyName: 'Vance & Co. Luxury Real Estate Group',
    title: 'Managing Principal Broker & Founder',
    category: 'Real Estate',
    source: 'facebook_groups',
    sourceLabel: 'Facebook Group (Real Estate Investors & Brokers USA)',
    location: {
      city: 'Miami',
      state: 'FL',
      country: 'USA',
      formatted: 'Miami, Florida, United States',
    },
    email: 'marcus@vancerealtygroup.com',
    emailVerified: true,
    phone: '+1 (305) 555-8921',
    phoneVerified: true,
    website: 'https://vancerealtygroup.com',
    profileUrl: 'https://facebook.com/groups/realestateusa/posts/98124912',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
    rating: 4.8,
    reviewsCount: 142,
    followersCount: 18500,
    score: 96,
    temperature: 'Hot',
    status: 'New',
    tags: ['Luxury Brokerage', 'Miami Waterfront', 'Active Buyer Lead Gen', 'High GCI'],
    socials: {
      linkedin: 'https://linkedin.com/in/marcus-vance-realty',
      instagram: 'https://instagram.com/vancerealtymiami',
      facebook: 'https://facebook.com/vancegroupmiami',
      facebookGroup: 'Real Estate Investors & Wholesalers USA (142K Members)',
    },
    sourceSpecificData: {
      facebookGroupName: 'Real Estate Investors & Top Producers USA',
      facebookPostContent: 'Looking for a verified system to automatically follow up with our luxury open-house buyer inquiries and Zillow leads within 90 seconds. Current lead leakage is costing us millions in closings.',
    },
    researchedData: {
      companyOverview: 'Vance & Co. is a boutique luxury residential brokerage in South Florida focusing on waterfront estates ($2.5M - $25M+). 18 active licensed agents with $94M in closed volume last year.',
      marketPositioning: 'Top 3% luxury residential team in Miami-Dade & Palm Beach. Highly visual branding but reliant on manual agent follow-ups and high-cost portal leads.',
      competitors: ['The Jills Zeder Group', 'Douglas Elliman South Florida', 'One Sotheby’s International Realty'],
      estimatedAnnualRevenue: '$3.8M GCI',
      estimatedEmployees: '18 agents + 4 administrative staff',
      techStackDetected: ['WordPress', 'KVCore CRM', 'Meta Pixel', 'Google Tag Manager', 'Cloudflare', 'Mailchimp'],
      reviewSentimentSummary: '94% positive sentiment; praised for negotiating power and staging; 6% mention slow weekend callback response times.',
      recentTriggerEvent: 'Posted 3 days ago in Facebook Broker group asking for AI speed-to-lead and automated WhatsApp/SMS luxury booking cadences.',
      vectorSimilarityRank: 1,
      vectorInsightSnippet: 'Matches pattern [High GCI Real Estate + Lead Leakage + High Ticket Deal Value]. Predicted deal velocity: 14 days.',
    },
    painPoints: [
      {
        id: 'pp-re-1',
        category: 'Sales',
        title: 'Slow Speed-to-Lead Response on Portal Inquiries',
        description: 'Average inquiry response time is currently 42 minutes. In luxury real estate, 78% of affluent buyers choose the first agent who responds with video walkthroughs within 3 minutes.',
        severity: 'Critical',
        estimatedRevenueLoss: '$180,000/quarter in lost seller & buyer commissions',
        recommendedFix: 'Deploy sub-60s multi-channel AI receptionist with instant video brochure SMS and calendar booking.',
      },
      {
        id: 'pp-re-2',
        category: 'Marketing',
        title: 'Over-reliance on Paid Zillow / Realtor.com Portals',
        description: 'Spending over $14,000/mo on shared portal leads with declining ROI and bidding wars against national franchises.',
        severity: 'High',
        estimatedRevenueLoss: '$95,000/year in ad budget fatigue',
        recommendedFix: 'Transition to exclusive organic Meta Group retargeting and AI-driven local luxury homeowner geo-farming.',
      },
      {
        id: 'pp-re-3',
        category: 'Tech',
        title: 'Unsynchronized CRM Workflow & Stale Database',
        description: 'Over 4,200 past contacts sitting inactive in KVCore without automated quarterly home equity valuation triggers.',
        severity: 'Medium',
        estimatedRevenueLoss: '$60,000/yr in missed repeat client referrals',
        recommendedFix: 'Automate hyper-personalized AI equity check-in letters and seasonal market intelligence digests.',
      },
    ],
    outreachStrategy: {
      targetPersona: 'Marcus Vance (Principal Broker, decisive, focuses on GCI and agent retention)',
      bestChannel: 'Multi-Touch',
      idealTiming: 'Tuesday or Thursday 8:15 AM - 9:30 AM EST (before client showings)',
      icebreaker: 'Saw your post in the Real Estate Top Producers group regarding luxury buyer lead leakage on Miami waterfront listings—specifically the 90-second response bottleneck.',
      valueHook: 'We engineered an automated VIP Speed-to-Lead bridge that guarantees 45-second video dossier delivery for luxury buyers, recapturing 4.2 extra listings per quarter.',
      coldEmailSequence: [
        {
          step: 1,
          day: 1,
          title: 'Direct Trigger & Speed-to-Lead Diagnosis',
          subjectLines: [
            'Miami luxury open house speed-to-lead (re: FB group post)',
            'Marcus — 45-sec buyer response workflow for Vance & Co.',
            'recapturing $180k/qtr in South FL listing leads',
          ],
          body: `Hi Marcus,

Saw your breakdown in the Real Estate Top Producers group about luxury buyer lead slippage on your Miami waterfront listings.

With $2.5M+ average transaction sizes, every 30-minute delay on an open house inquiry is an open invitation for Sotheby's or Elliman to grab the buyer representation.

We built an instant AI concierge specifically for luxury brokerages that delivers a custom 3D video dossier to the buyer's phone within 45 seconds and books the private showing directly into your agent's calendar.

A boutique team in Boca Raton just added 5 closed buyer representations ($6.2M volume) in 60 days using this.

Mind if I send over a 90-second screen recording of how this plugs into your KVCore setup?

Best regards,
[Your Name]
Partner, Sales Intelligence Group`,
          hookExplanation: 'Directly cites his specific group post, uses luxury real estate metric (GCI/volume), and offers low-friction video proof.',
          callToAction: 'Can I send over the 90-sec KVCore workflow video?',
        },
        {
          step: 2,
          day: 4,
          title: 'Case Study & Stale Database Reactivation',
          subjectLines: [
            'Quick numbers on Vance & Co.’s 4,200 past contacts',
            'How a South FL team generated 3 listings without ad spend',
          ],
          body: `Hi Marcus,

Following up with a quick insight: beyond incoming portal inquiries, most luxury teams in Miami have 3,000+ past client contacts sitting idle.

We ran an automated Home Equity & Off-Market Market Pulse sequence across an inactive database of 2,800 contacts for a Palm Beach broker. Result: 3 new exclusive seller listings ($8.4M volume) within 21 days with $0 ad spend.

Would you be open to running a test pilot on a small slice of Vance & Co.'s inactive leads next week?

Best,
[Your Name]`,
          hookExplanation: 'Demonstrates monetization of existing assets with zero extra ad spend.',
          callToAction: 'Open to a quick 10-minute diagnostic walkthrough?',
        },
        {
          step: 3,
          day: 8,
          title: '9-Word Re-engagement / Breakup',
          subjectLines: ['Still prioritizing luxury buyer speed-to-lead at Vance & Co.?'],
          body: `Marcus,

Are you still looking to automate Vance & Co.'s buyer response workflow this quarter, or should I take this off your radar?

Best,
[Your Name]`,
          hookExplanation: 'High-converting 9-word classic format that prompts a fast binary yes/no response.',
          callToAction: 'Let me know either way!',
        },
      ],
      linkedInInMail: {
        connectionNote: 'Marcus — saw your insight on Miami luxury lead response times in the Broker group. Built a 45-sec KVCore automation for luxury teams that might save your agents 15 hrs/week.',
        followUpPitch: 'Marcus, appreciate the connect! Quick question: what is your agents’ current average time to first touch on weekend waterfront portal inquiries? We just packaged a blueprint showing how South FL brokers cut response time to under 60 seconds.',
      },
      coldCallScript: {
        gatekeeperBypass: 'Hi, this is [Your Name] calling for Marcus Vance regarding his inquiry on luxury buyer intake automation. Is he between showings right now?',
        openingHook: 'Marcus, [Your Name] here — I know I caught you out of the blue. I saw your post in the Broker mastermind regarding lead leakage on multi-million dollar Miami listings. Got 30 seconds to hear why 45-sec video responses are doubling showing conversion?',
        objectionHandlers: [
          {
            objection: 'Our agents handle their own leads.',
            response: 'Completely understand. The challenge most luxury team leads find is that top agents are in showings 6 hours a day. Our system handles the critical first 3 minutes automatically, then hands the warm buyer directly to your agent.',
          },
          {
            objection: 'We already use KVCore for that.',
            response: 'KVCore is great for standard drip emails, but luxury buyers ignore templated text drips. We layer instant personalized 3D tour SMS widgets that get an 84% open rate in under 2 minutes.',
          },
          {
            objection: 'Send me an email.',
            response: 'Will do! What is the best direct email? I will include the 90-second loom video showing the exact Miami listing example.',
          },
        ],
        closingQuestion: 'Would you be open to taking a look at a 10-minute live demonstration this Thursday at 9:30 AM before your team meeting?',
      },
      videoAuditOutline: {
        duration: '1 minute 45 seconds',
        screenShareKeyPoints: [
          'Show Vance & Co. website on mobile and simulate an inquiry test',
          'Highlight the 40+ minute delay gap compared to national top 1% teams',
          'Show the AI VIP Buyer Concierge sending interactive PDF & private showing calendar link in 45s',
          'Show the ROI dashboard: $180k projected commission recapture',
        ],
        loomCta: 'Click the calendar link below the video to review your custom Miami Brokerage Blueprint.',
      },
      facebookGroupStrategy: {
        groupName: 'Real Estate Investors & Wholesalers USA (142K Members)',
        contextTrigger: 'Replied to his thread about KVCore lead response speed',
        softDmMessage: 'Hey Marcus, saw your question in the RE Top Producers group about open house lead follow-up. We just open-sourced a workflow diagram on how to route weekend inquiries directly to on-call agents with automated SMS brochures. Happy to drop the PDF here if helpful!',
      },
    },
    proposal: {
      proposalTitle: 'VIP Speed-to-Lead & Pipeline Acceleration Blueprint for Vance & Co.',
      executiveSummary: 'This strategic proposal outlines the implementation of an end-to-end AI Sales & Lead Capture Infrastructure for Vance & Co. Luxury Real Estate Group. By reducing first-touch latency from 42 minutes to under 45 seconds and reactivating 4,200 past contacts, the system aims to recapture an estimated $360,000+ in annual gross commission income.',
      diagnosedProblem: 'High-value luxury buyer inquiries are experiencing significant response latency during peak showing hours and weekends. In addition, existing CRM databases are under-utilized without automated event-driven market pulses.',
      proposedSolution: [
        {
          phase: 'Phase 1: Real-Time Concierge & Webhook Routing',
          timeline: 'Week 1 - 2',
          deliverables: [
            'Instant multi-channel webhook integration with Zillow, Meta Ads, and Website forms',
            'Sub-45 second AI interactive SMS with dynamic property video brochure',
            'Round-robin agent dispatch with automatic fallback escalation',
          ],
        },
        {
          phase: 'Phase 2: Database Reactivation & VIP Equity Engine',
          timeline: 'Week 3 - 4',
          deliverables: [
            'AI enrichment and scoring of 4,200 past contacts',
            'Automated localized quarterly home equity valuation triggers',
            'High-intent seller identification and notification dashboard',
          ],
        },
        {
          phase: 'Phase 3: Sales Intelligence & Team Enablement',
          timeline: 'Week 5 - 6',
          deliverables: [
            'Live agent call assistant & objection battlecards',
            'Executive pipeline analytics & conversion tracking dashboard',
            'Weekly performance tuning & prompt optimization',
          ],
        },
      ],
      projectedRoi: [
        {
          metric: 'Average First-Touch Speed',
          currentEstimated: '42 minutes',
          projectedWithSolution: '38 seconds',
          financialGain: '+320% Showing Bookings',
        },
        {
          metric: 'Lead-to-Showing Conversion',
          currentEstimated: '3.2%',
          projectedWithSolution: '8.7%',
          financialGain: '+$210,000/yr Net Commissions',
        },
        {
          metric: 'Past Database Reactivation',
          currentEstimated: '0.4% / yr',
          projectedWithSolution: '2.8% / yr',
          financialGain: '+$180,000/yr Referral Volume',
        },
      ],
      pricingTiers: [
        {
          tierName: 'Growth Team Tier',
          price: '$2,800',
          billingPeriod: '/month',
          features: [
            'Up to 10 Agents supported',
            'Speed-to-Lead Concierge (<60s)',
            'Standard KVCore / Follow Up Boss Sync',
            'Monthly Database Reactivation Sequence',
            'Email & Slack Support',
          ],
        },
        {
          tierName: 'Enterprise Brokerage Tier',
          price: '$4,500',
          billingPeriod: '/month',
          features: [
            'Up to 25 Agents supported',
            'Ultra-Low Latency (<30s) AI Concierge',
            'Custom Branded Video Brochure Generator',
            'Deep AI Database Intelligence & Equity Triggers',
            'Dedicated Sales Engineering Manager',
            'Weekly Pipeline Optimization Reviews',
          ],
          highlighted: true,
        },
      ],
      guaranteeTerms: '100% Performance Guarantee: If the system does not generate at least 3 qualified luxury listing or buyer showings within the first 30 days of deployment, all setup fees are refunded.',
    },
    createdAt: '2026-08-28T14:22:00Z',
    updatedAt: '2026-09-01T08:15:00Z',
  },
  {
    id: 'lead-apollo-saas-02',
    name: 'Elena Rostova',
    companyName: 'CloudScale Automations',
    title: 'VP of Global Growth & Demand Gen',
    category: 'SaaS & Tech',
    source: 'apollo',
    sourceLabel: 'Apollo.io B2B Lead Intelligence',
    location: {
      city: 'Austin',
      state: 'TX',
      country: 'USA',
      formatted: 'Austin, Texas, United States',
    },
    email: 'elena.rostova@cloudscale.io',
    emailVerified: true,
    phone: '+1 (512) 839-4412',
    phoneVerified: true,
    website: 'https://cloudscale.io',
    profileUrl: 'https://apollo.io/companies/cloudscale-automations',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    score: 91,
    temperature: 'Hot',
    status: 'Researched',
    tags: ['Series A', 'B2B SaaS', 'DevOps', 'Scaling SDR Team', 'High ACV ($32k)'],
    socials: {
      linkedin: 'https://linkedin.com/in/elena-rostova-growth',
      twitter: 'https://x.com/elena_saasgrowth',
    },
    sourceSpecificData: {
      apolloId: 'apl_8912783912',
      linkedinHeadline: 'Scaling B2B Pipelines at CloudScale ($12M ARR) | Ex-Twilio Demand Gen | Hiring SDRs',
    },
    researchedData: {
      companyOverview: 'CloudScale Automations is a Series A ($14M raised) infrastructure workflow SaaS helping DevOps teams orchestrate multi-cloud deployments.',
      marketPositioning: 'Mid-market to Enterprise solution competing with Zapier Enterprise and Terraform Cloud. $32,000 Average Contract Value (ACV).',
      competitors: ['Spacelift', 'Env0', 'Harness.io'],
      estimatedAnnualRevenue: '$11.8M ARR',
      estimatedEmployees: '64 employees (expanding sales org by 40% this quarter)',
      techStackDetected: ['HubSpot CRM', 'Segment', 'Apollo.io', 'SalesLoft', 'Datadog', 'PostgreSQL', 'Stripe'],
      recentTriggerEvent: 'Hired 4 new outbound SDRs last month; actively posting on LinkedIn about outbound deliverability and low reply rates.',
      vectorSimilarityRank: 2,
      vectorInsightSnippet: 'Matches pattern [Series A SaaS + Outbound Scaling + SDR Ramp Inefficiency]. High conversion rate for AI outbound personalization.',
    },
    painPoints: [
      {
        id: 'pp-saas-1',
        category: 'Sales',
        title: 'Low SDR Cold Outbound Reply Rates (<1.8%)',
        description: 'New SDR hires are sending generic templated emails with high spam rates and low engagement from VP Engineering prospects.',
        severity: 'Critical',
        estimatedRevenueLoss: '$240,000/yr in SDR payroll inefficiency',
        recommendedFix: 'Implement AI-driven deep repository & tech stack trigger scraper that crafts hyper-specific engineering pain point icebreakers.',
      },
      {
        id: 'pp-saas-2',
        category: 'Marketing',
        title: 'Long Enterprise Sales Cycle (94 Days)',
        description: 'Prospects stall between initial discovery call and technical POC due to lack of customized executive sales battlecards.',
        severity: 'High',
        estimatedRevenueLoss: '$380,000 delayed in pipeline velocity per quarter',
        recommendedFix: 'Automated 1-click tailored ROI proposal and architecture diagram generator for SDRs & AEs.',
      },
    ],
    outreachStrategy: {
      targetPersona: 'Elena Rostova (Metric-driven VP Demand Gen, focused on CAC:LTV, SDR quota attainment, and pipeline predictability)',
      bestChannel: 'LinkedIn',
      idealTiming: 'Tuesday 11:00 AM CST',
      icebreaker: 'Saw your recent post on SDR ramp times and the challenge of scaling personalized outbound to VPs of Engineering without burning domain reputation.',
      valueHook: 'We built a programmatic intelligence pipeline that scrapes prospective companies’ public GitHub commits and cloud stacks, generating 9.4% cold reply rates from DevOps leaders.',
      coldEmailSequence: [
        {
          step: 1,
          day: 1,
          title: 'DevOps Trigger-Based Outreach Proof',
          subjectLines: [
            'CloudScale’s SDR reply rates with VP Eng prospects',
            'Elena — 9.4% outbound reply rate for DevOps SaaS',
            'scaling CloudScale’s outbound without generic templates',
          ],
          body: `Hi Elena,

Noticed CloudScale recently expanded the SDR team in Austin to ramp up outbound to VP Engineering leaders.

The biggest hurdle we hear from DevOps demand gen leaders is that technical decision-makers delete 99% of templated cold emails instantly.

We built an AI workflow that automatically pulls each prospect's active multi-cloud infrastructure triggers (Terraform usage, Kubernetes clusters, public incident postmortems) and generates custom 3-line technical value hooks.

For a similar Series A infrastructure company, this boosted cold outbound reply rate from 1.6% to 9.2% in 45 days.

Open to seeing a 2-minute sample breakdown of what this looks like for CloudScale's top 50 target enterprise accounts?

Best,
[Your Name]`,
          hookExplanation: 'Speaks directly to technical outbound friction, references company hiring data and provides credible metrics.',
          callToAction: 'Can I send a sample intelligence pack for 50 target accounts?',
        },
      ],
      linkedInInMail: {
        connectionNote: 'Elena — love your insights on B2B SaaS pipeline efficiency. Built a tech-stack scraping engine tailored for DevOps SDR teams that might help your new hires hit quota faster.',
        followUpPitch: 'Elena, saw your team is targeting multi-cloud enterprise accounts. We created a real-time vector intelligence tool that equips SDRs with account-specific infrastructure pain points in 1 click. Would love to share the brief case study if relevant!',
      },
      coldCallScript: {
        gatekeeperBypass: 'Hi, connecting with Elena Rostova regarding the demand generation scaling workflow for the SDR team.',
        openingHook: 'Elena, [Your Name] from Pipeline Intelligence. I saw CloudScale is ramping outbound for enterprise DevOps. Got 20 seconds for me to explain how we tripled technical meeting bookings for similar Series A teams?',
        objectionHandlers: [
          {
            objection: 'We already use Apollo and SalesLoft.',
            response: 'Apollo is great for contact data and SalesLoft for sending, but SDRs still spend 20 minutes researching every prospect manually. We plug directly into SalesLoft and auto-insert researched technical pain points in seconds.',
          },
        ],
        closingQuestion: 'Could we put 15 minutes on the calendar next Tuesday at 11 AM to benchmark your current reply rates?',
      },
      videoAuditOutline: {
        duration: '2 minutes',
        screenShareKeyPoints: [
          'Show a target prospect (e.g. VP Infrastructure at a Fortune 500)',
          'Demonstrate real-time AI extraction of their multi-cloud architecture',
          'Show the automatically generated, hyper-technical cold email and proposal draft',
        ],
        loomCta: 'Grab 15 minutes on our engineering calendar to test live with your domain.',
      },
    },
    proposal: {
      proposalTitle: 'AI-Powered Outbound Pipeline Engine for CloudScale Automations',
      executiveSummary: 'This proposal presents an enterprise deployment of automated account intelligence and dynamic sales document generation, tailored to accelerate CloudScale’s SDR pipeline to $3.2M in new qualified pipeline per quarter.',
      diagnosedProblem: 'Generic outbound sequences are producing sub-2% reply rates, increasing SDR ramp time to 4.5 months and resulting in high customer acquisition costs.',
      proposedSolution: [
        {
          phase: 'Phase 1: Deep Data Enrichment & Signal Triggers',
          timeline: 'Week 1 - 2',
          deliverables: ['Custom scraper for GitHub/Cloud infrastructure triggers', 'Bi-directional HubSpot & SalesLoft sync'],
        },
        {
          phase: 'Phase 2: Dynamic Sales Battlecards & Outreach Generator',
          timeline: 'Week 3 - 4',
          deliverables: ['Automated 1-click personalized email and InMail generator', 'Real-time competitive objection battlecards'],
        },
      ],
      projectedRoi: [
        {
          metric: 'SDR Outbound Reply Rate',
          currentEstimated: '1.7%',
          projectedWithSolution: '8.5%',
          financialGain: '+400% Qualified Pipeline',
        },
        {
          metric: 'SDR Ramp Time',
          currentEstimated: '4.5 months',
          projectedWithSolution: '1.5 months',
          financialGain: '$95k Saved in Training Payroll',
        },
      ],
      pricingTiers: [
        {
          tierName: 'Scale Accelerator',
          price: '$3,600',
          billingPeriod: '/month',
          features: ['Up to 8 SDR Seats', 'Unlimited AI Account Enrichments', 'Full HubSpot & SalesLoft Integration', 'Custom Technical Trigger Scraper'],
          highlighted: true,
        },
      ],
      guaranteeTerms: 'Guaranteed 2.5x increase in qualified discovery calls booked within 45 days or money back.',
    },
    createdAt: '2026-08-29T10:15:00Z',
    updatedAt: '2026-09-01T08:20:00Z',
  },
  {
    id: 'lead-gmaps-dental-03',
    name: 'Dr. Arthur Sterling',
    companyName: 'Sterling Smile Dental & Implant Institute',
    title: 'Owner & Chief Cosmetic Surgeon',
    category: 'Dental & Healthcare',
    source: 'google_maps',
    sourceLabel: 'Google Maps Local Business Scraper',
    location: {
      city: 'London',
      country: 'UK',
      formatted: 'Kensington, London, United Kingdom',
    },
    email: 'dr.sterling@sterlingsmiles.co.uk',
    emailVerified: true,
    phone: '+44 20 7946 0912',
    phoneVerified: true,
    website: 'https://sterlingsmiles.co.uk',
    profileUrl: 'https://maps.google.com/?cid=189230192301',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=256&q=80',
    rating: 4.4,
    reviewsCount: 310,
    score: 88,
    temperature: 'Hot',
    status: 'New',
    tags: ['High-Ticket Implants', 'Invisalign Center', 'Missed Weekend Bookings', 'Private Clinic'],
    socials: {
      instagram: 'https://instagram.com/sterlingsmilesuk',
      facebook: 'https://facebook.com/sterlingsmileslondon',
    },
    sourceSpecificData: {
      googlePlaceId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    },
    researchedData: {
      companyOverview: 'Premier private dental practice in Kensington specializing in All-on-4 dental implants (£9,000 - £16,000 per arch) and cosmetic veneers.',
      marketPositioning: 'Luxury aesthetic practice. Strong Google reviews (4.4 stars from 310 patients) but lacks instant online booking after hours.',
      competitors: ['Harley Street Dental Clinic', 'Bupa Dental Care Kensington', 'Kensington Dental Practice'],
      estimatedAnnualRevenue: '£2.4M GBP',
      estimatedEmployees: '14 clinical & support staff',
      techStackDetected: ['WordPress', 'Google Analytics 4', 'Meta Pixel', 'Dentally Cloud'],
      reviewSentimentSummary: 'Praised for surgical precision and pain-free treatments; 8% of recent reviews complain of long phone hold times when booking consultations.',
      recentTriggerEvent: 'Recently updated Google Business Profile with new All-on-4 implant services.',
      vectorSimilarityRank: 3,
      vectorInsightSnippet: 'Matches pattern [High Ticket Clinic + Telephone Booking Bottleneck]. Estimated monthly revenue unlock: £28,000.',
    },
    painPoints: [
      {
        id: 'pp-dent-1',
        category: 'Operations',
        title: '64% of High-Ticket Implant Inquiries Occur After 6 PM',
        description: 'Prospective patients researching £10k+ cosmetic treatments in the evening hit an answering machine, resulting in 70% booking abandonment to competitors.',
        severity: 'Critical',
        estimatedRevenueLoss: '£35,000/month in lost implant patient case acceptance',
        recommendedFix: 'Implement 24/7 AI WhatsApp & Web Concierge with instant financing pre-qualification and consultation deposit collection.',
      },
      {
        id: 'pp-dent-2',
        category: 'Reputation',
        title: 'Unaddressed Review Friction regarding Telephone Hold Times',
        description: 'Multiple 3-star reviews citing difficulty reaching the front desk for appointment rescheduling.',
        severity: 'Medium',
        estimatedRevenueLoss: '£15,000/year in brand reputation leakage',
        recommendedFix: 'Automated 2-way SMS confirmation and patient self-rescheduling portal.',
      },
    ],
    outreachStrategy: {
      targetPersona: 'Dr. Arthur Sterling (Owner-surgeon, values patient care excellence and high-ticket treatment volume)',
      bestChannel: 'Email',
      idealTiming: 'Wednesday 7:30 AM GMT or 1:15 PM GMT (between surgery blocks)',
      icebreaker: 'Looked through your clinic’s fantastic reputation in Kensington for All-on-4 implants—noticed your practice has over 310 top-rated reviews.',
      valueHook: 'We helped a private cosmetic clinic in Mayfair capture 18 extra full-arch implant consultations per month by solving after-hours inquiry drop-off with an AI WhatsApp patient coordinator.',
      coldEmailSequence: [
        {
          step: 1,
          day: 1,
          title: 'After-Hours Patient Inquiry Opportunity',
          subjectLines: [
            'Kensington All-on-4 implant after-hours bookings',
            'Dr. Sterling — after-hours patient intake for Sterling Smile',
            're: 310 reviews & implant inquiries after 6 PM',
          ],
          body: `Dear Dr. Sterling,

Impressed by Sterling Smile's stellar reputation in Kensington, particularly for complex All-on-4 and aesthetic cases.

Looking at your Google profile and digital channels, we noticed that like most high-end London practices, prospective patients researching £10k+ treatments between 7 PM and 11 PM can only leave a voicemail.

Data shows that 68% of cosmetic patients who encounter a voicemail browse the next clinic on Google Maps rather than waiting until 9 AM the next morning.

We deployed an AI WhatsApp & Web treatment coordinator for a clinic in Mayfair that answers patient clinical FAQs, calculates estimated financing in real-time, and books consultations directly into Dentally.

Result: 14 additional confirmed implant consultations in their first month (£126,000 in accepted treatment value).

Would you be open to a 5-minute video walkthrough showing how this would look on Sterling Smile's website?

Kind regards,
[Your Name]
Healthcare Growth Director`,
          hookExplanation: 'Focuses on patient psychology and lost after-hours revenue for high-ticket dental surgery.',
          callToAction: 'Can I share the 5-minute custom video overview?',
        },
      ],
      linkedInInMail: {
        connectionNote: 'Dr. Sterling — admired your cosmetic implant case studies in Kensington. Sharing a quick workflow for capturing evening patient inquiries automatically.',
        followUpPitch: 'Dr. Sterling, thank you for connecting. We recently published a benchmark on how London cosmetic clinics are unlocking £30k+/mo by automating evening treatment inquiries. Happy to send over the 1-page PDF if useful.',
      },
      coldCallScript: {
        gatekeeperBypass: 'Good morning, calling for Dr. Sterling regarding his All-on-4 treatment intake channel. Is the practice manager or Dr. Sterling available between patient appointments?',
        openingHook: 'Dr. Sterling, [Your Name] calling briefly. I noticed your clinic does exceptional implant surgery in Kensington. We built an after-hours patient booking tool that captures evening inquiries. Do you have 30 seconds to hear how it generated £120k for a Mayfair clinic?',
        objectionHandlers: [
          {
            objection: 'Our receptionists handle all bookings.',
            response: 'Your receptionists do a great job during practice hours! Our tool specifically protects you between 6 PM and 9 AM and over weekends when reception is closed and patients are actively searching.',
          },
        ],
        closingQuestion: 'Could we schedule a quick 10-minute briefing next Tuesday at 1:15 PM during your lunch break?',
      },
      videoAuditOutline: {
        duration: '1 minute 30 seconds',
        screenShareKeyPoints: [
          'Show Sterling Smile Google Maps listing and website after 6 PM',
          'Demonstrate live how a prospect gets stuck on a contact form',
          'Show the AI WhatsApp implant coordinator in action with financing estimates',
          'Show direct booking into Dentally calendar',
        ],
        loomCta: 'Book a 10-min clinical intake demo with our dental specialists.',
      },
    },
    proposal: {
      proposalTitle: '24/7 VIP Patient Concierge & High-Ticket Implant Growth Strategy for Sterling Smile',
      executiveSummary: 'A customized proposal designed to eliminate patient booking drop-off during peak evening research hours, expected to increase monthly All-on-4 consultation bookings by 35% with zero additional staff overhead.',
      diagnosedProblem: 'Evening and weekend searchers for high-value cosmetic dentistry currently encounter static forms and voicemails, resulting in an estimated 15-20 lost consultation inquiries each month.',
      proposedSolution: [
        {
          phase: 'Phase 1: 24/7 AI Clinical Treatment Coordinator',
          timeline: '10 Days',
          deliverables: [
            'Custom AI WhatsApp and Website widget trained on Sterling Smile treatments and pricing',
            'Instant financing calculation & FAQ triage',
            'Integration with practice management software (Dentally/Exact)',
          ],
        },
      ],
      projectedRoi: [
        {
          metric: 'Monthly Implant Consultations',
          currentEstimated: '22 / month',
          projectedWithSolution: '36 / month',
          financialGain: '+£120,000/month Accepted Treatment Value',
        },
      ],
      pricingTiers: [
        {
          tierName: 'Practice Growth Tier',
          price: '£1,450',
          billingPeriod: '/month',
          features: ['24/7 AI WhatsApp & Web Concierge', 'Dentally Calendar Sync', 'Automated SMS Reminders', 'Monthly Review Generation Engine'],
          highlighted: true,
        },
      ],
      guaranteeTerms: 'Minimum 5 extra qualified cosmetic consultations generated in month 1 or full refund.',
    },
    createdAt: '2026-08-30T09:00:00Z',
    updatedAt: '2026-09-01T08:25:00Z',
  },
  {
    id: 'lead-insta-dtc-04',
    name: 'Chloe Bennett',
    companyName: 'Aura Glow Skincare',
    title: 'Founder & Creative Director',
    category: 'E-Commerce & DTC',
    source: 'instagram',
    sourceLabel: 'Instagram Brand & Creator Scraper',
    location: {
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      formatted: 'Los Angeles, California, United States',
    },
    email: 'chloe@auraglowskin.com',
    emailVerified: true,
    phone: '+1 (310) 902-8812',
    phoneVerified: true,
    website: 'https://auraglowskin.com',
    profileUrl: 'https://instagram.com/auraglowskin',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    followersCount: 84200,
    score: 85,
    temperature: 'Warm',
    status: 'In Outreach',
    tags: ['Shopify Plus', 'Clean Beauty', 'High AOV ($78)', 'Micro-Influencer Gifting'],
    socials: {
      instagram: 'https://instagram.com/auraglowskin',
      tiktok: 'https://tiktok.com/@auraglowskin',
    },
    sourceSpecificData: {
      instagramBio: 'Clean, botanical skincare formulated in LA ✨ Vegan & Cruelty-free | As seen in Vogue | Orders ship same day 📦 chloe@auraglowskin.com',
    },
    researchedData: {
      companyOverview: 'Fast-growing clean beauty e-commerce brand operating on Shopify Plus with $4.2M in annual GMV. Strong organic community on Instagram & TikTok.',
      marketPositioning: 'Premium botanical skincare targeting Gen Z and Millennial women ($38 - $92 price points). High repeat purchase rate.',
      competitors: ['Summer Fridays', 'Youth to the People', 'Tower 28 Beauty'],
      estimatedAnnualRevenue: '$4.2M GMV',
      estimatedEmployees: '9 core team members',
      techStackDetected: ['Shopify Plus', 'Klaviyo', 'Gorgias', 'Recharge Subscriptions', 'Meta Pixel', 'TikTok Pixel', 'Yotpo'],
      recentTriggerEvent: 'Launched a new peptide hydration serum with viral TikTok engagement but experiencing abandoned cart checkout drop-offs.',
      vectorSimilarityRank: 4,
      vectorInsightSnippet: 'Matches pattern [DTC E-commerce + Shopify Abandoned Cart + SMS Automation Gap]. Projected +18% revenue lift.',
    },
    painPoints: [
      {
        id: 'pp-dtc-1',
        category: 'Sales',
        title: 'Abandoned Checkout Recovery Rate Lagging at 7.2%',
        description: 'Industry benchmark for luxury beauty is 14-18%. Standard email-only abandoned checkout drips are missing mobile-first Instagram traffic.',
        severity: 'Critical',
        estimatedRevenueLoss: '$42,000/month in unrecovered Shopify checkout carts',
        recommendedFix: 'Implement dynamic AI MMS checkout recovery with 1-click discount auto-apply and personalized skin quiz recommendations.',
      },
    ],
    outreachStrategy: {
      targetPersona: 'Chloe Bennett (Visual, brand-first DTC founder focused on ROAS, customer LTV, and aesthetic integrity)',
      bestChannel: 'Instagram DM',
      idealTiming: 'Monday or Thursday 2:00 PM PST',
      icebreaker: 'Loved Aura Glow’s new peptide serum campaign aesthetic—the UGC styling on your IG reels is so crisp.',
      valueHook: 'We built a visual 1-click MMS cart recovery sequence specifically for Shopify Plus beauty brands that lifted recovered revenue by $38k/mo without discounting brand equity.',
      coldEmailSequence: [
        {
          step: 1,
          day: 1,
          title: 'Shopify Checkout Optimization Insight',
          subjectLines: [
            'Aura Glow’s peptide serum mobile checkout',
            'Chloe — quick visual idea for Aura Glow’s cart recovery',
            'recovering $40k/mo in uncaptured Shopify carts',
          ],
          body: `Hi Chloe,

Obsessed with Aura Glow's branding and the momentum on your new peptide serum launch!

Noticed you are driving tons of high-intent mobile traffic from Instagram into Shopify Plus.

For clean beauty brands doing $4M+ GMV, the average mobile cart abandonment is 74%, and standard Klaviyo plain-text emails only recover a fraction of mobile shoppers.

We designed an interactive MMS checkout rescue flow that delivers a 3-second aesthetic product gif with 1-tap Apple Pay recovery directly to the shopper's phone within 15 minutes of abandonment.

For a similar clean skincare brand in Venice, this increased checkout recovery rate from 6.8% to 16.4% ($34,000 extra net revenue/mo).

Could I send you a 60-second mockup of what this MMS sequence would look like with Aura Glow's visual assets?

Best,
[Your Name]
DTC Retention Lead`,
          hookExplanation: 'Speaks the aesthetic language of beauty DTC, cites exact platform (Shopify/Klaviyo) and offers a visual mockup.',
          callToAction: 'Can I send over the 60-second visual mockup?',
        },
      ],
      linkedInInMail: {
        connectionNote: 'Chloe — huge fan of what you are building with Aura Glow. Wanted to share a visual retention playbook we built for clean beauty brands.',
        followUpPitch: 'Hi Chloe, congratulations on the Vogue feature! We recently helped a Los Angeles skincare brand add 18% to their monthly Shopify GMV through automated SMS checkout flows. Would love to pass over the case study.',
      },
      coldCallScript: {
        gatekeeperBypass: 'Hi, connecting with Chloe regarding Aura Glow’s mobile commerce optimization.',
        openingHook: 'Chloe, [Your Name] here — quick 20-second call because I saw your viral serum launch. We help beauty brands recover $30k+/mo in abandoned mobile checkouts. Got a quick moment?',
        objectionHandlers: [
          {
            objection: 'We already use Klaviyo.',
            response: 'We love Klaviyo and integrate right on top of it. Our MMS widget sends branded visual rich media that gets 98% open rates compared to 20% on standard emails.',
          },
        ],
        closingQuestion: 'Would you be open to a 10-minute visual review next Tuesday at 2 PM PST?',
      },
      videoAuditOutline: {
        duration: '1 minute 15 seconds',
        screenShareKeyPoints: [
          'Show Aura Glow mobile checkout flow on an iPhone screen',
          'Demonstrate the visual gap between standard emails vs rich MMS',
          'Show sample Aura Glow MMS card with 1-click checkout',
        ],
        loomCta: 'Reply to this email or message on IG to receive the full visual kit.',
      },
    },
    proposal: {
      proposalTitle: 'Mobile Retention & High-Converting Checkout Engine for Aura Glow Skincare',
      executiveSummary: 'Proposal to deploy a high-converting, brand-safe mobile checkout recovery and VIP subscription retention infrastructure for Aura Glow on Shopify Plus.',
      diagnosedProblem: 'High mobile cart abandonment from social media ad traffic is leaking substantial revenue due to delayed, low-engagement email notifications.',
      proposedSolution: [
        {
          phase: 'Phase 1: Dynamic Rich MMS & SMS Engine',
          timeline: '1 Week',
          deliverables: ['Custom visual MMS templates', 'Klaviyo & Shopify Plus webhook integration', 'A/B testing matrix'],
        },
      ],
      projectedRoi: [
        {
          metric: 'Abandoned Cart Recovery Rate',
          currentEstimated: '7.2%',
          projectedWithSolution: '15.8%',
          financialGain: '+$38,000/month Net Sales',
        },
      ],
      pricingTiers: [
        {
          tierName: 'DTC Accelerator',
          price: '$2,200',
          billingPeriod: '/month + 4% of recovered sales',
          features: ['Full Shopify Plus Integration', 'Custom Branded Visual MMS', 'VIP Subscription Retention Flows', 'Weekly A/B Performance Tuning'],
          highlighted: true,
        },
      ],
      guaranteeTerms: 'Guaranteed 3x ROI on monthly fee within 30 days.',
    },
    createdAt: '2026-08-31T11:00:00Z',
    updatedAt: '2026-09-01T08:30:00Z',
  },
  {
    id: 'lead-linkedin-roofing-05',
    name: 'David Callahan',
    companyName: 'Apex Roofing & Solar Contractors',
    title: 'President & Founder',
    category: 'Home Services & Contractors',
    source: 'linkedin',
    sourceLabel: 'LinkedIn B2B Executive Scraper',
    location: {
      city: 'Dallas',
      state: 'TX',
      country: 'USA',
      formatted: 'Dallas, Texas, United States',
    },
    email: 'david@apexroofingtexas.com',
    emailVerified: true,
    phone: '+1 (214) 771-3390',
    phoneVerified: true,
    website: 'https://apexroofingtexas.com',
    profileUrl: 'https://linkedin.com/in/david-callahan-roofing',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    rating: 4.9,
    reviewsCount: 188,
    score: 93,
    temperature: 'Hot',
    status: 'New',
    tags: ['Commercial & Residential', 'Storm Damage Claims', 'Solar Add-on', 'High Ticket ($18k avg)'],
    socials: {
      linkedin: 'https://linkedin.com/in/david-callahan-roofing',
      facebook: 'https://facebook.com/apexroofingdallas',
    },
    sourceSpecificData: {
      linkedinHeadline: 'President at Apex Roofing & Solar | $18M in Completed Storm Restorations in North Texas | GAF Master Elite Contractor',
    },
    researchedData: {
      companyOverview: 'Leading commercial and residential roofing contractor in DFW with GAF Master Elite certification. $18M in storm restoration projects over the past 3 years.',
      marketPositioning: 'Top tier roofing brand with 4.9 stars on Google Maps. High ticket size ($16k-$45k per commercial roof).',
      competitors: ['KPost Roofing', 'Lon Smith Roofing', 'Texas Traditions Roofing'],
      estimatedAnnualRevenue: '$6.5M Annual',
      estimatedEmployees: '32 field crew + 8 project estimators',
      techStackDetected: ['JobNimbus CRM', 'Hover 3D Estimator', 'Meta Pixel', 'Google Ads', 'WordPress'],
      recentTriggerEvent: 'Severe hailstorm event in North DFW last week created thousands of roof damage claims.',
      vectorSimilarityRank: 5,
      vectorInsightSnippet: 'Matches pattern [Storm Event Trigger + High Ticket Contractor + JobNimbus CRM]. High intent for automated satellite storm outreach.',
    },
    painPoints: [
      {
        id: 'pp-roof-1',
        category: 'Sales',
        title: 'Slow Neighborhood Canvassing After Hail Storm Events',
        description: 'Estimators take 7-10 days to manually knock doors in storm-damaged zip codes, while out-of-state storm chasers deploy automated direct mail and SMS in 24 hours.',
        severity: 'Critical',
        estimatedRevenueLoss: '$250,000 in lost insurance restoration contracts per storm event',
        recommendedFix: 'Automated Hail Radar GIS scraper that matches affected rooftops with property owner contacts within 4 hours of storm.',
      },
    ],
    outreachStrategy: {
      targetPersona: 'David Callahan (No-BS Texas contractor, focuses on crew utilization, insurance claim velocity, and beating storm chasers)',
      bestChannel: 'Cold Call',
      idealTiming: 'Monday 6:45 AM CST or 5:30 PM CST (before/after jobsites)',
      icebreaker: 'David, saw the severe hail track that hit North DFW last Tuesday. Apex is clearly the top-rated local crew to handle those roofs before the out-of-state storm chasers swarm in.',
      valueHook: 'We built a radar-triggered property intelligence tool that maps exact hail hailstone impact zones and delivers pre-qualified homeowner claim appointments to your JobNimbus in 24 hours.',
      coldEmailSequence: [
        {
          step: 1,
          day: 1,
          title: 'DFW Hail Event Radar & Homeowner Fast-Track',
          subjectLines: [
            'DFW hail track homeowner leads (JobNimbus ready)',
            'David — radar-targeted storm claims for Apex Roofing',
            'beating out-of-state storm chasers to North Texas roofs',
          ],
          body: `David,

Saw the 2.5" hail swath that hit Denton & Collin County last week.

Usually within 48 hours, dozens of fly-by-night storm chasers flood the neighborhood while local GAF Master Elite contractors like Apex have to rely on manual door knocking.

We built an automated Hail Radar GIS pipeline that overlays NOAA radar data onto homeowner deed records, delivering verified contact data for damaged roofs directly into JobNimbus.

Last hail season, a contractor in Fort Worth booked 42 approved insurance claims ($670k volume) within 14 days of the storm.

Can I send over the live radar map showing the top 350 damaged residential roofs in your territory?

Best,
[Your Name]
Contractor Growth Systems`,
          hookExplanation: 'Leverages immediate real-world weather trigger and targets his competitor pain (storm chasers).',
          callToAction: 'Can I send the live radar map for your territory?',
        },
      ],
      linkedInInMail: {
        connectionNote: 'David — respect what you built with Apex in DFW. Built a hail-radar data pipeline for GAF Master Elite contractors that routes storm claims to JobNimbus in hours.',
        followUpPitch: 'David, hope the crews are staying safe after the storms. If you are looking to load up your estimators with exclusive DFW hail claims without buying shared HomeAdvisor leads, I would love to share our radar map.',
      },
      coldCallScript: {
        gatekeeperBypass: 'Morning! This is [Your Name] calling for David Callahan regarding the hail tracking data for Denton County. Is he in the office or on a jobsite?',
        openingHook: 'David, [Your Name] here — quick 20 seconds. I saw the hail track across North Texas last week. We mapped out 350 commercial and residential roofs with verified hail strikes in your zip code. Want me to send the map over to your estimators?',
        objectionHandlers: [
          {
            objection: 'We have enough work right now.',
            response: 'Understood, that is great! But the high-margin $25k+ commercial insurance claims get locked up in the first 7 days. Our data helps your guys target the highest-value roofs first.',
          },
        ],
        closingQuestion: 'What is the best email to send the interactive GIS storm map to?',
      },
      videoAuditOutline: {
        duration: '1 minute 40 seconds',
        screenShareKeyPoints: [
          'Show NOAA live radar overlay on Dallas map with hail severity contours',
          'Zoom into high-density luxury residential neighborhoods with hail damage',
          'Show 1-click sync into JobNimbus with property owner phone & insurance carrier info',
        ],
        loomCta: 'Click below to claim your exclusive territory for this storm season.',
      },
    },
    proposal: {
      proposalTitle: 'Rapid Storm Intelligence & Claim Acquisition Pipeline for Apex Roofing',
      executiveSummary: 'A turnkey GIS radar and automated property intelligence pipeline designed to position Apex Roofing as the primary restoration partner across DFW within hours of weather events.',
      diagnosedProblem: 'Manual canvassing is too slow to capture storm-damaged properties before out-of-state competitors arrive.',
      proposedSolution: [
        {
          phase: 'Phase 1: Real-Time Hail Radar API & JobNimbus Integration',
          timeline: '5 Days',
          deliverables: ['Automated NOAA hail trigger alerts', 'Deed & contact data enrichment', 'JobNimbus field dispatch routing'],
        },
      ],
      projectedRoi: [
        {
          metric: 'Storm Response Speed',
          currentEstimated: '7 Days',
          projectedWithSolution: '4 Hours',
          financialGain: '+35 Approved Insurance Roof Claims / Storm',
        },
      ],
      pricingTiers: [
        {
          tierName: 'Storm Mastery Tier',
          price: '$2,900',
          billingPeriod: '/month',
          features: ['Full DFW Territory Exclusivity', 'Real-Time Hail Radar Webhooks', 'Unlimited Property Deed Enrichments', 'JobNimbus Auto-Sync'],
          highlighted: true,
        },
      ],
      guaranteeTerms: 'Guaranteed minimum 10 verified storm damage inspections within first month.',
    },
    createdAt: '2026-08-31T15:30:00Z',
    updatedAt: '2026-09-01T08:35:00Z',
  },
];

export const CATEGORY_ICON_MAP: Record<LeadCategory, string> = {
  'Real Estate': 'Building2',
  'Dental & Healthcare': 'Stethoscope',
  'Home Services & Contractors': 'Hammer',
  'Roofing & Construction': 'HardHat',
  'Solar & CleanTech': 'SunMedium',
  'Legal & Law Firms': 'Scale',
  'Accounting & Financial': 'BadgeDollarSign',
  'SaaS & Tech': 'Laptop',
  'Marketing & Creative Agency': 'Sparkles',
  'E-Commerce & DTC': 'ShoppingBag',
  'Restaurants & Hospitality': 'Utensils',
  'Fitness & MedSpas': 'Dumbbell',
  'Automotive & Dealerships': 'Car',
  'Logistics & Supply Chain': 'Truck',
  'Insurance & Wealth Management': 'ShieldAlert',
  'Coaching & Consulting': 'GraduationCap',
  'Architecture & Interior Design': 'Compass',
  'Veterinary & Pet Care': 'HeartHandshake',
  'Education & EdTech': 'BookOpen',
  'Manufacturing & Industrial': 'Factory',
};

export const PLATFORM_CONFIG: Record<
  PlatformSource,
  {
    name: string;
    icon: string;
    color: string;
    badgeBg: string;
    description: string;
    capabilities: string[];
  }
> = {
  apollo: {
    name: 'Apollo.io B2B Database',
    icon: 'Database',
    color: '#F59E0B',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    description: 'B2B executive database with verified work emails, direct mobile numbers, company funding, and tech stack detection.',
    capabilities: ['Direct Dial Verification', 'Funding Rounds Filter', 'Tech Stack Detection', 'Employee Headcount Filter'],
  },
  google_maps: {
    name: 'Google Maps Places',
    icon: 'MapPin',
    color: '#10B981',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    description: 'Local business place data with verified coordinates, review sentiment analysis, phone numbers, and website audit signals.',
    capabilities: ['Place ID & Geocoding', 'Star Rating & Review Count', 'Missing Website Detector', 'Opening Hours & Local SEO Audit'],
  },
  facebook_groups: {
    name: 'Facebook Groups & Communities',
    icon: 'Users',
    color: '#3B82F6',
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    description: 'Scrapes high-intent discussions, questions, and member profiles from active niche communities and mastermind groups.',
    capabilities: ['Group Post Intent Analysis', 'Community Question Mining', 'Member Profile Extraction', 'Contextual Trigger Scraping'],
  },
  linkedin: {
    name: 'LinkedIn B2B & Decision Makers',
    icon: 'Linkedin',
    color: '#0A66C2',
    badgeBg: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    description: 'Executive profiles, decision-maker hierarchy, corporate tenure, hiring signals, and recent post activity.',
    capabilities: ['C-Suite & Decision Makers', 'Hiring Spree Triggers', 'InMail Angle Generation', 'Company Growth Velocity'],
  },
  clutch_co: {
    name: 'Clutch.co Verified Agencies',
    icon: 'Award',
    color: '#EC4899',
    badgeBg: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
    description: 'Verified B2B agencies, dev shops, and consultancies with client ratings, hourly rates, and min project sizes.',
    capabilities: ['Hourly Rates & Min Project Size', 'Verified Client Review Scores', 'Service Focus Breakdown', 'Agency Leadership Contacts'],
  },
  crunchbase: {
    name: 'Crunchbase Funded Startups',
    icon: 'TrendingUp',
    color: '#8B5CF6',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    description: 'Recently funded startups (Seed, Series A-C) with verified cash reserves and active growth mandates.',
    capabilities: ['Funding Round & Amount Filter', 'Lead Investor Extraction', 'Founder Contacts', 'Growth Velocity Signals'],
  },
  upwork_clients: {
    name: 'Upwork Enterprise Clients',
    icon: 'Briefcase',
    color: '#14B8A6',
    badgeBg: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
    description: 'High-spending client job posts looking for marketing, development, and operational solutions right now.',
    capabilities: ['Active Job Budget Extraction', 'Client Total Spend History', 'Exact Project Scope Text', 'Immediate Intent Pitching'],
  },
  indeed_jobs: {
    name: 'Indeed & Glassdoor Hiring Signals',
    icon: 'Search',
    color: '#2563EB',
    badgeBg: 'bg-blue-600/10 text-blue-400 border-blue-600/30',
    description: 'Identifies companies actively hiring for marketing, sales, or tech roles—primed for agency solutions instead.',
    capabilities: ['Hiring Urgency Signals', 'Open Job Roles Extraction', 'Salary Budget Inference', 'Replacement vs Outsourcing Angle'],
  },
  yelp_trustpilot: {
    name: 'Yelp & Trustpilot Reviews',
    icon: 'Star',
    color: '#EF4444',
    badgeBg: 'bg-red-500/10 text-red-400 border-red-500/30',
    description: 'Mines live negative customer feedback (1-3 stars) to identify exact operational pain points and sales pitch angles.',
    capabilities: ['1-3 Star Review Complaint Mining', 'Competitor Dissatisfaction Hooks', 'Review Velocity Tracking', 'Reputation Recovery Hooks'],
  },
  bbb_accredited: {
    name: 'Better Business Bureau (BBB)',
    icon: 'ShieldCheck',
    color: '#0284C7',
    badgeBg: 'bg-sky-600/10 text-sky-400 border-sky-600/30',
    description: 'Accredited local contractors, remodelers, and professional services with official rating and complaints history.',
    capabilities: ['BBB Letter Grade (A+ to F)', 'Years in Business Verification', 'Owner / Principal Identification', 'Unresolved Complaint Extraction'],
  },
  product_hunt: {
    name: 'Product Hunt Makers & Founders',
    icon: 'Rocket',
    color: '#EA580C',
    badgeBg: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    description: 'New product launches, tech makers, indie hackers, and SaaS creators looking for growth & distribution.',
    capabilities: ['Launch Upvotes & Comments', 'Maker Twitter/LinkedIn Profiles', 'Product Tagline & Category', 'Fresh Launch Pitch Trigger'],
  },
  yellow_pages: {
    name: 'YellowPages Commercial Directory',
    icon: 'BookOpen',
    color: '#EAB308',
    badgeBg: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    description: 'Established blue-collar, industrial, trade, and commercial businesses with high ticket values and outdated marketing.',
    capabilities: ['Direct Phone & Fax Parsing', 'Physical Address & Service Area', 'Legacy Business Detector', 'High Value Trade Leads'],
  },
  website_crawler: {
    name: 'Live Domain Crawler',
    icon: 'Globe',
    color: '#06B6D4',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    description: 'Real-time live deep crawl of company websites to extract emails, phone numbers, tech stacks, and SEO/conversion gaps.',
    capabilities: ['Deep HTML Scraping', 'Direct Email & Phone Parsing', 'CMS & Pixel Detection', 'Site Speed & SEO Audit'],
  },
  reddit_communities: {
    name: 'Reddit Subreddit Problem Posts',
    icon: 'MessageSquare',
    color: '#FF4500',
    badgeBg: 'bg-orange-600/10 text-orange-400 border-orange-600/30',
    description: 'Scrapes business owners posting in r/smallbusiness, r/entrepreneur, and niche subreddits asking for help.',
    capabilities: ['Real-Time Frustration Mining', 'Subreddit Post Sentiment', 'OP Profile Identification', 'Hyper-Relevant Solution Hook'],
  },
  github_founders: {
    name: 'GitHub Dev Tools & Founders',
    icon: 'Github',
    color: '#94A3B8',
    badgeBg: 'bg-zinc-500/10 text-zinc-300 border-zinc-500/30',
    description: 'Trending repository maintainers, developer tool companies, and funded open-source startups.',
    capabilities: ['Repo Star Velocity', 'Maintainer Public Emails', 'Tech Stack & Language', 'Open Source Monetization Hooks'],
  },
  apify_actor: {
    name: 'Apify Store Connect',
    icon: 'Terminal',
    color: '#10B981',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    description: 'Connect directly to Apify platform scrapers (Google Places, Apollo, LinkedIn, Facebook Groups, Yelp).',
    capabilities: ['Direct Apify API Integration', 'Actor ID Pipeline Execution', 'Raw Dataset Export', 'Proxy Rotation'],
  },
  instagram: {
    name: 'Instagram DTC Brands',
    icon: 'Instagram',
    color: '#EC4899',
    badgeBg: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
    description: 'E-commerce brands, creator storefronts, visual aesthetic analysis, bio email scraping, and influencer engagement rates.',
    capabilities: ['Bio Email & WhatsApp Extraction', 'Follower & Engagement Ratios', 'Visual Aesthetic Profiling', 'Direct DM Strategy'],
  },
  twitter_x: {
    name: 'Twitter / X Founders',
    icon: 'Twitter',
    color: '#E2E8F0',
    badgeBg: 'bg-slate-500/10 text-slate-300 border-slate-500/30',
    description: 'Tech founders, builders, indie hackers, and VC investors discussing real-time problems and software needs.',
    capabilities: ['Bio Keyword Search', 'Recent Tweet Sentiment', 'Tech Stack Mentions', 'Fast DM Engagement'],
  },
  tiktok: {
    name: 'TikTok Shop & DTC',
    icon: 'Video',
    color: '#8B5CF6',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    description: 'Viral product sellers, TikTok Shop merchants, and brand marketing directors.',
    capabilities: ['TikTok Shop Verification', 'Viral Video Signals', 'Creator Gifting Outreach', 'Fast Trend Detection'],
  },
  custom_actor: {
    name: 'Custom Webhook / Actor',
    icon: 'Terminal',
    color: '#6366F1',
    badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    description: 'Connect any custom cloud actor or REST webhook via custom JSON payload.',
    capabilities: ['Raw Actor ID Execution', 'Custom JSON Schema Input', 'High Concurrency Multi-Threading', 'Webhook Relay'],
  },
};

