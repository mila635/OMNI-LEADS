export interface VectorInsight {
  id: string;
  category: string;
  title: string;
  similarityScore: number;
  insightsSummary: string;
  optimalOutreachAngle: string;
  historicalWinRate: string;
}

export const ARCHITECTURE_METRICS = {
  p95Latency: '24ms',
  maxConcurrency: '2,000 Concurrent Jobs',
  activeWorkers: '48 Pods (Auto-scaling to 128)',
  vectorIndexSize: '520,418 Vectors',
  vectorSimilarityP99: '32ms',
  proxyMeshSize: '120,000+ IPs',
};

export const MOCK_VECTOR_INSIGHTS: VectorInsight[] = [
  {
    id: 'vec-1',
    category: 'Real Estate',
    title: 'High GCI Brokerage • Delayed Lead Response Pattern',
    similarityScore: 0.948,
    insightsSummary: 'Brokerages with >$20M in transaction volume experiencing >15min lead response latency convert 41% fewer inbound portal leads.',
    optimalOutreachAngle: 'Real-time AI speed-to-lead workflow under 45 seconds directly to SMS & WhatsApp.',
    historicalWinRate: '34.2% Deal Close Probability',
  },
  {
    id: 'vec-2',
    category: 'Dental & Healthcare',
    title: 'High-Ticket Implant & Invisalign Practice Leakage',
    similarityScore: 0.912,
    insightsSummary: 'Dental clinics with >100 reviews losing 28% of after-hours callers due to lack of automated 2-way text booking integration.',
    optimalOutreachAngle: 'After-hours conversational triage bot that fills high-value empty chair slots.',
    historicalWinRate: '29.8% Deal Close Probability',
  },
  {
    id: 'vec-3',
    category: 'SaaS & Tech',
    title: 'B2B Demo Drop-off & Mid-Funnel Stagnation',
    similarityScore: 0.884,
    insightsSummary: 'Mid-market SaaS firms lacking interactive ROI calculators suffer 3x longer sales cycles on accounts over $30k ACV.',
    optimalOutreachAngle: 'Dynamic interactive value-realization audit delivered on first touchpoint.',
    historicalWinRate: '38.5% Deal Close Probability',
  },
  {
    id: 'vec-4',
    category: 'Home Services & Contractors',
    title: 'Storm Restoration & Roofing Inbound Surge Bottlenecks',
    similarityScore: 0.865,
    insightsSummary: 'Contractors relying on manual dispatch miss 60% of inbound storm inquiries during peak weather events.',
    optimalOutreachAngle: 'Instant AI voice qualification and automated JobNimbus / RoofQuote schedule sync.',
    historicalWinRate: '42.1% Deal Close Probability',
  },
];

import { SystemMetricNode } from '../types';

export interface ArchitectureLayer {
  id: string;
  name: string;
  badge: string;
  description: string;
  technology: string[];
  latencySpec: string;
  concurrencySpec: string;
  nodes: {
    title: string;
    description: string;
    status: 'operational' | 'high_load' | 'optimizing';
    metrics: string;
    details: string[];
  }[];
}

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: 'layer-scraping',
    name: '1. AI-Driven Distributed Scraping Layer',
    badge: 'Multi-Platform Ingestion',
    description: 'Autonomous scraping actors with rotating residential proxy pools, dynamic headless browser instances, and automatic captcha resolution for Apollo, Facebook Groups, Google Maps, LinkedIn, and Instagram.',
    technology: ['Apify Actor SDK', 'Playwright / Puppeteer Cluster', 'BrightData Proxy Network', 'Anti-Fingerprinting Engine'],
    latencySpec: '1.2s - 3.8s per target batch',
    concurrencySpec: 'Up to 250 parallel workers',
    nodes: [
      {
        title: 'Platform Adapter Pool',
        description: 'Dedicated scraping worker adapters for Apollo, Facebook Groups, Google Maps, LinkedIn, and Instagram API/DOM parsing.',
        status: 'operational',
        metrics: '248 Active Scraping Workers | 99.4% Success Rate',
        details: [
          'Apollo GraphQL reverse-proxy and rate-limit backoff',
          'Facebook Groups DOM parser with sentiment & intent filter',
          'Google Maps Places API & Review scraping crawler',
          'LinkedIn Voyager protocol session rotation',
          'Instagram Graph API & profile bio extraction worker',
        ],
      },
      {
        title: 'Proxy & Anti-Detection Mesh',
        description: 'Intelligent proxy pool with auto-rotation, browser fingerprint spoofing, TLS fingerprint randomization, and header jitter.',
        status: 'operational',
        metrics: '120,000+ Residential IPs | 0 IP bans in 24h',
        details: [
          'Automatic geolocated IP matching (matches target city)',
          'Session stickiness for stateful crawling',
          'Cloudflare Turnstile & hCaptcha automated solver',
        ],
      },
    ],
  },
  {
    id: 'layer-queue',
    name: '2. Event-Driven Asynchronous Task Queue',
    badge: 'High-Concurrency Orchestrator',
    description: 'High-throughput Redis & BullMQ distributed job queue managing intensive scraping, data normalization, AI synthesis, and document compilation asynchronously without blocking the API Gateway.',
    technology: ['Redis 7.2 Cluster', 'BullMQ', 'Event Broker (Kafka/PubSub)', 'Worker Auto-Scaler'],
    latencySpec: '< 15ms queue latency',
    concurrencySpec: '10,000+ jobs / minute capacity',
    nodes: [
      {
        title: 'Job Dispatcher & Priority Broker',
        description: 'Classifies jobs into VIP Real-Time (sub-5s priority) and Bulk Batch Pipelines with automatic dead-letter queue (DLQ) retry logic.',
        status: 'operational',
        metrics: 'Queue Depth: 42 jobs | Mean Processing Time: 1.8s',
        details: [
          'Priority queuing for interactive user searches',
          'Exponential backoff with jitter on transient rate limits',
          'Dead Letter Queue (DLQ) automated replay mechanism',
        ],
      },
      {
        title: 'Horizontal Worker Auto-Scaler',
        description: 'Kubernetes KEDA autoscaler that spins worker pods up and down based on queue depth and memory consumption.',
        status: 'operational',
        metrics: 'Autoscale: 8 -> 64 pods dynamically based on load',
        details: [
          'Zero-downtime rolling worker deployment',
          'Graceful task completion on pod termination',
          'Worker health heartbeat and automatic self-healing',
        ],
      },
    ],
  },
  {
    id: 'layer-vectordb',
    name: '3. Vector Database Insight Retrieval Layer',
    badge: 'Semantic Retrieval & RAG',
    description: 'High-dimensional vector embedding database indexing historical business research, industry pain-point ontologies, winning outreach sequences, and real-time market signals for instant sub-50ms contextual retrieval.',
    technology: ['Pinecone Serverless / Qdrant', 'gemini-embedding-2-preview (1536-dim)', 'HNSW Indexing', 'Cosine Similarity Search'],
    latencySpec: '28ms P95 Query Latency',
    concurrencySpec: '5,000 QPS with sub-50ms P99',
    nodes: [
      {
        title: 'Semantic Business Knowledge Index',
        description: 'Stores 1536-dimensional embeddings of 500,000+ researched business models, industry bottlenecks, GCI benchmarks, and objection maps.',
        status: 'operational',
        metrics: '520k Vectors Indexed | Index Freshness: < 5 min',
        details: [
          'Hybrid search combining Dense Vector Similarity + Sparse BM25 keywords',
          'Industry namespace partitioning for instant query isolation',
          'Automatic deduplication and semantic clustering',
        ],
      },
      {
        title: 'Real-Time Pattern & Win-Rate Cache',
        description: 'Retrieves highest-converting sales outreach frameworks and pain-point diagnoses matching the exact profile of the extracted lead.',
        status: 'operational',
        metrics: 'Cache Hit Rate: 91.2% | P95 Retrieval: 18ms',
        details: [
          'Instant retrieval of proven icebreakers by company size & geography',
          'Dynamic cold email sequence assembly based on past deal closings',
        ],
      },
    ],
  },
  {
    id: 'layer-ai',
    name: '4. AI Reasoning & Automated Document Generation Engine',
    badge: 'Gemini 3.7 Flash Core',
    description: 'Server-side AI synthesis engine powered by Gemini, transforming raw scraped leads and vector insights into hyper-personalized sales dossiers, multi-channel playbooks, and downloadable PDF/Markdown proposals.',
    technology: ['@google/genai SDK (gemini-3.7-flash)', 'Structured JSON Schema Output', 'Dynamic PDF/Markdown Compiler', 'Streaming Token Generator'],
    latencySpec: '800ms - 1.8s generation time',
    concurrencySpec: 'High throughput streaming',
    nodes: [
      {
        title: 'Business Dossier & Pain-Point Diagnoser',
        description: 'Analyzes scraped company tech stack, reviews, social posts, and location to identify top 3 revenue bottlenecks and estimate financial impact.',
        status: 'operational',
        metrics: 'Average Token Generation: 140 tok/sec | Zero Hallucination Guardrails',
        details: [
          'Strict JSON schema validation via Type.OBJECT definition',
          'Multi-channel outreach playbook builder (Cold Email, LinkedIn, Cold Call, Video Audit)',
          'Tailored ROI modeling based on industry benchmarks',
        ],
      },
      {
        title: 'Automated Document & Proposal Generator',
        description: 'Compiles custom executive proposals, opportunity audit reports, sales battlecards, and SOW contracts in real time.',
        status: 'operational',
        metrics: '1-Click PDF & Markdown Export | Custom Prompt Re-tuning',
        details: [
          'Customizable branding, deliverables phases, and pricing tiers',
          'Instant export to PDF, Word Markdown, or CRM format',
        ],
      },
    ],
  },
  {
    id: 'layer-gateway',
    name: '5. High-Concurrency API Gateway & Security Vault',
    badge: 'Sub-50ms API Edge',
    description: 'Enterprise API gateway managing ingress routing, JWT authentication, rate limiting, and secure environment secret encryption with zero API key exposure to browser clients.',
    technology: ['Kong API Gateway / NGINX Ingress', 'JWT / OAuth2 RBAC', 'Redis Rate Limiter', 'Google Cloud Run Managed Edge'],
    latencySpec: '8ms Gateway Overhead',
    concurrencySpec: '50,000+ Concurrent HTTP Connections',
    nodes: [
      {
        title: 'Security & Secret Isolation Proxy',
        description: 'Enforces server-side API key proxying so neither Gemini keys nor Apify tokens are ever leaked to client browsers.',
        status: 'operational',
        metrics: 'Zero Secret Leaks | 100% Server-Side Execution',
        details: [
          'Strict CSP and CORS origin validation',
          'Rate limiting: 120 req/min per IP with token bucket algorithm',
          'Sanitized client inputs preventing injection vectors',
        ],
      },
    ],
  },
  {
    id: 'layer-monitoring',
    name: '6. Real-Time Telemetry & Monitoring Services',
    badge: '24/7 Observability',
    description: 'Continuous metrics collection, distributed tracing, and automated alerting tracking RPS, error rates, scraping worker health, and vector DB latency.',
    technology: ['Prometheus', 'Grafana Real-Time Dashboard', 'OpenTelemetry Tracing', 'Sentry Error Reporting'],
    latencySpec: '1s Metrics Aggregation Window',
    concurrencySpec: 'Real-time streaming telemetry',
    nodes: [
      {
        title: 'Metrics & Health Monitor',
        description: 'Tracks P50, P95, and P99 latency meters across all microservice layers with automated webhook alert triggers.',
        status: 'operational',
        metrics: 'System Uptime: 99.98% | P95 Global Latency: 142ms',
        details: [
          'Live RPS and error rate tracking',
          'Scraping proxy pool health and rotation status',
          'Vector database query performance analytics',
        ],
      },
    ],
  },
];

export const SYSTEM_METRIC_NODES: SystemMetricNode[] = [
  {
    id: 'node-scraper',
    name: 'Scraper Cluster (Apify + Headless)',
    type: 'scraper',
    status: 'healthy',
    latencyMs: 1420,
    throughputRps: 184,
    details: {
      activeWorkers: 48,
      proxiesAvailable: 124000,
      successRate: '99.4%',
      platformsActive: 'Apollo, FB, Maps, LI, IG',
    },
  },
  {
    id: 'node-queue',
    name: 'Redis / BullMQ Event Queue',
    type: 'queue',
    status: 'healthy',
    latencyMs: 12,
    throughputRps: 620,
    details: {
      queuedJobs: 28,
      activeJobs: 14,
      completedLastHour: 1840,
      dlqFailedJobs: 2,
    },
  },
  {
    id: 'node-vectordb',
    name: 'Pinecone Vector DB (HNSW Index)',
    type: 'vectordb',
    status: 'healthy',
    latencyMs: 24,
    throughputRps: 450,
    details: {
      indexedVectors: '520,418',
      dimension: 1536,
      similarityMetric: 'Cosine',
      p95Latency: '26ms',
    },
  },
  {
    id: 'node-ai',
    name: 'Gemini 3.7 Flash Reasoning Engine',
    type: 'ai_engine',
    status: 'healthy',
    latencyMs: 840,
    throughputRps: 92,
    details: {
      model: 'gemini-3.7-flash',
      mode: 'Structured JSON & Stream',
      avgTokensPerSec: 146,
      cachedContextRate: '68%',
    },
  },
  {
    id: 'node-gateway',
    name: 'API Gateway & Security Proxy',
    type: 'gateway',
    status: 'healthy',
    latencyMs: 6,
    throughputRps: 890,
    details: {
      activeConnections: 1420,
      jwtAuthRate: '100% Pass',
      rateLimitDrops: 0,
      serverPort: 3000,
    },
  },
  {
    id: 'node-monitoring',
    name: 'Prometheus & Grafana Telemetry',
    type: 'monitoring',
    status: 'healthy',
    latencyMs: 4,
    throughputRps: 1200,
    details: {
      uptime: '99.98%',
      p99Latency: '1.82s',
      errorRate: '0.04%',
      clusterHealth: 'Nominal',
    },
  },
];
