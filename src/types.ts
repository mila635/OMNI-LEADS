export type PlatformSource =
  | 'apollo'
  | 'google_maps'
  | 'facebook_groups'
  | 'linkedin'
  | 'yelp_trustpilot'
  | 'website_crawler'
  | 'apify_actor'
  | 'clutch_co'
  | 'crunchbase'
  | 'upwork_clients'
  | 'indeed_jobs'
  | 'bbb_accredited'
  | 'product_hunt'
  | 'yellow_pages'
  | 'reddit_communities'
  | 'github_founders'
  | 'instagram'
  | 'twitter_x'
  | 'tiktok'
  | 'custom_actor';

export type LeadCategory =
  | 'Real Estate'
  | 'Dental & Healthcare'
  | 'Home Services & Contractors'
  | 'Roofing & Construction'
  | 'Solar & CleanTech'
  | 'Legal & Law Firms'
  | 'Accounting & Financial'
  | 'SaaS & Tech'
  | 'Marketing & Creative Agency'
  | 'E-Commerce & DTC'
  | 'Restaurants & Hospitality'
  | 'Fitness & MedSpas'
  | 'Automotive & Dealerships'
  | 'Logistics & Supply Chain'
  | 'Insurance & Wealth Management'
  | 'Coaching & Consulting'
  | 'Architecture & Interior Design'
  | 'Veterinary & Pet Care'
  | 'Education & EdTech'
  | 'Manufacturing & Industrial';

export type LeadStatus =
  | 'New'
  | 'Researched'
  | 'In Outreach'
  | 'Meeting Booked'
  | 'Proposal Sent'
  | 'Closed Won'
  | 'Unqualified';

export interface AgencyPricingTier {
  name: string;
  price: string;
  billingPeriod: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export interface AgencyCaseStudy {
  clientNiche: string;
  headline: string;
  result: string;
}

export interface AgencyProfile {
  id: string;
  name: string; // e.g. "ADS RESULTS 24/7"
  tagline: string; // e.g. "High-Performance Paid Ads, AI Speed-to-Lead & 24/7 Pipeline Ingestion"
  website: string; // e.g. "https://adsresults247.com"
  logoUrl?: string; // base64 or hosted image
  senderName: string; // e.g. "Marcus Vance"
  senderRole: string; // e.g. "Head of Client Growth & Partner"
  senderEmail: string; // e.g. "marcus@adsresults247.com"
  senderPhone?: string; // e.g. "+1 (800) 459-2470"
  companyBio: string;
  coreServices: string[];
  pricingTiers: AgencyPricingTier[];
  guaranteeTerms: string;
  caseStudies: AgencyCaseStudy[];
  targetNiches: string[];
  pitchTone: 'Executive & Data-Driven' | 'High-Energy Direct Response' | 'Consultative Strategic Partner' | 'B2B Enterprise';
  isDefault?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SocialHandles {
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  tiktok?: string;
  facebookGroup?: string;
  github?: string;
  youtube?: string;
}

export interface BusinessPainPoint {
  id: string;
  category: 'Sales' | 'Marketing' | 'Operations' | 'Tech' | 'Reputation';
  title: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium';
  estimatedRevenueLoss: string;
  recommendedFix: string;
}

export interface ColdEmailStep {
  step: number;
  day: number;
  title: string;
  subjectLines: string[];
  body: string;
  hookExplanation: string;
  callToAction: string;
}

export interface OutreachStrategy {
  targetPersona: string;
  bestChannel: 'Email' | 'LinkedIn' | 'Cold Call' | 'Facebook DM' | 'Instagram DM' | 'Multi-Touch';
  idealTiming: string;
  icebreaker: string;
  valueHook: string;
  pitchingAgencyName?: string;
  coldEmailSequence: ColdEmailStep[];
  linkedInInMail: {
    connectionNote: string;
    followUpPitch: string;
  };
  coldCallScript: {
    gatekeeperBypass: string;
    openingHook: string;
    objectionHandlers: {
      objection: string;
      response: string;
    }[];
    closingQuestion: string;
  };
  videoAuditOutline: {
    duration: string;
    screenShareKeyPoints: string[];
    loomCta: string;
  };
  facebookGroupStrategy?: {
    groupName: string;
    contextTrigger: string;
    softDmMessage: string;
  };
}

export interface BusinessProposal {
  proposalTitle: string;
  executiveSummary: string;
  diagnosedProblem: string;
  pitchingAgencyName?: string;
  proposedSolution: {
    phase: string;
    timeline: string;
    deliverables: string[];
  }[];
  projectedRoi: {
    metric: string;
    currentEstimated: string;
    projectedWithSolution: string;
    financialGain: string;
  }[];
  pricingTiers: {
    tierName: string;
    price: string;
    billingPeriod: string;
    features: string[];
    highlighted?: boolean;
  }[];
  guaranteeTerms: string;
}

export interface ResearchedIntelligence {
  companyOverview: string;
  marketPositioning: string;
  competitors: string[];
  estimatedAnnualRevenue: string;
  estimatedEmployees: string;
  techStackDetected: string[];
  reviewSentimentSummary?: string;
  recentTriggerEvent?: string;
  vectorSimilarityRank?: number;
  vectorInsightSnippet?: string;
  fundingRaised?: string;
  hiringRoles?: string[];
  bbbRating?: string;
  clutchReviewScore?: string;
  averageContractBudget?: string;
}

export interface Lead {
  id: string;
  name: string;
  companyName: string;
  title?: string;
  category: LeadCategory;
  source: PlatformSource;
  sourceLabel?: string;
  location: {
    city: string;
    state?: string;
    country: string;
    formatted: string;
  };
  email?: string;
  emailVerified?: boolean;
  phone?: string;
  phoneVerified?: boolean;
  website?: string;
  profileUrl?: string;
  avatarUrl?: string;
  rating?: number;
  reviewsCount?: number;
  followersCount?: number;
  score: number; // 0 - 100
  temperature: 'Hot' | 'Warm' | 'Cold';
  status: LeadStatus;
  notes?: string;
  tags: string[];
  socials: SocialHandles;
  deliverabilityScore?: number;
  sourceSpecificData?: {
    apolloId?: string;
    facebookGroupName?: string;
    facebookPostContent?: string;
    googlePlaceId?: string;
    linkedinHeadline?: string;
    instagramBio?: string;
    negativeReviewSnippet?: string;
    clutchHourlyRate?: string;
    crunchbaseFundingRound?: string;
    indeedJobTitleHiring?: string;
    upworkJobBudget?: string;
    bbbAccreditedYear?: string;
  };
  researchedData: ResearchedIntelligence;
  painPoints: BusinessPainPoint[];
  outreachStrategy: OutreachStrategy;
  proposal: BusinessProposal;
  batchId?: string;
  agencyId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExtractionBatchRecord {
  id: string;
  timestamp: string;
  platform: PlatformSource;
  query: string;
  category: LeadCategory;
  location: string;
  leadCount: number;
  agencyName: string;
  status: 'completed' | 'running' | 'failed';
  leadIds: string[];
}

export interface LeadFilterState {
  keyword: string;
  sources: PlatformSource[];
  categories: LeadCategory[];
  countries: string[];
  temperature: ('Hot' | 'Warm' | 'Cold')[];
  minScore: number;
  requireEmail: boolean;
  requirePhone: boolean;
  requireWebsite: boolean;
  requireVerified: boolean;
  minRating: number;
  maxRating?: number;
  minReviews: number;
  revenueRange: string;
  employeeRange: string;
  techStack: string[];
  status: LeadStatus | 'All';
  batchId?: string;
  sortBy: 'score_desc' | 'rating_desc' | 'reviews_desc' | 'revenue_desc' | 'date_desc' | 'name_asc';
}

export interface ScrapingTaskParams {
  platform: PlatformSource;
  query: string;
  category: LeadCategory;
  location: string;
  country: string;
  maxResults: number;
  minRating?: number;
  maxRating?: number;
  websiteOnly?: boolean;
  jobTitles?: string;
  facebookGroupKeyword?: string;
  customActorId?: string;
  customInputJson?: string;
  customWebsiteUrl?: string;
  apifyApiKey?: string;
  activeAgency?: AgencyProfile;
  enableAiResearch?: boolean;
  enableVectorIndexing?: boolean;
  hiringRoleKeyword?: string;
  minFundingAmount?: string;
}

export interface ScrapingJob {
  id: string;
  params: ScrapingTaskParams;
  status: 'queued' | 'running' | 'enriching_vector_db' | 'generating_proposals' | 'completed' | 'failed';
  progress: number;
  currentStep: string;
  extractedCount: number;
  logs: string[];
  results?: Lead[];
}

export interface ScrapingTaskStatus {
  taskId: string;
  platform: PlatformSource;
  query: string;
  status: 'queued' | 'running' | 'enriching_vector_db' | 'generating_proposals' | 'completed' | 'failed';
  progressPercent: number;
  leadsFound: number;
  leadsEnriched: number;
  startedAt: string;
  estimatedTimeRemainingSeconds: number;
  currentStepMessage: string;
  logs: string[];
  results?: Lead[];
}

export interface WebsiteCrawlResult {
  url: string;
  title: string;
  description: string;
  emailsFound: string[];
  phonesFound: string[];
  techStack: string[];
  socialLinks: Record<string, string>;
  speedScore: number;
  seoGaps: string[];
  auditSummary: string;
}

export interface SystemMetricNode {
  id: string;
  name: string;
  type: 'scraper' | 'queue' | 'vectordb' | 'ai_engine' | 'gateway' | 'monitoring';
  status: 'healthy' | 'warning' | 'busy' | 'offline';
  latencyMs: number;
  throughputRps: number;
  details: Record<string, string | number>;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone?: string;
  companyName: string;
  role: string;
  avatarUrl?: string;
  authProvider: 'google' | 'phone' | 'email';
  plan: 'Starter' | 'Growth' | 'Agency Scale' | 'Enterprise';
  createdAt: string;
}

