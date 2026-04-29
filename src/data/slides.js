export const SLIDES = [
  {
    id: 'title',
    title: 'C-Square × GIROPie Collection Workflow',
    subtitle: 'Identity-first, secure eMandate orchestration — presentation demo',
    notes: 'Title slide'
  },
  {
    id: 'objective',
    title: 'Objective & Scope',
    bullets: [
      'Orchestrate collections for non-ERP buyers via identity-first eMandate flows',
      'Protect invoice visibility until buyer identity is validated',
      'Keep C-Square ERP synchronized with mandate and payment lifecycle'
    ]
  },
  {
    id: 'architecture-high',
    title: 'High-Level Architecture',
    diagram: [
      'Seller (C-Square ERP)',
      'ERP Integration Layer',
      'Workflow Engine (Platform)',
      'Buyer Authentication Layer',
      'Buyer Dashboard (presentation-only)',
      'Payment Partner (Easebuzz)',
      'NPCI / Banking Network',
      'Settlement + Callbacks',
      'ERP Sync Layer'
    ]
  },
  {
    id: 'presentation-mode',
    title: 'Presentation Mode',
    text: 'This is a storytelling, scroll-driven presentation — no real buyer portal is shown. All screens are animation-focused to explain architecture and security.'
  },
  {
    id: 'security-gate',
    title: 'Security Gate: Incorrect vs Correct',
    compare: {
      bad: [
        'Buyer clicks link',
        'Invoice shown immediately'
      ],
      good: [
        'Buyer clicks secure link',
        'Login / Signup',
        'OTP verification',
        'Identity validation',
        'Request mapping',
        'Invoice visibility'
      ]
    }
  },
  {
    id: 'layers-erp',
    title: 'ERP Integration Layer',
    bullets: ['Receive invoice data', 'Push mandate & payment updates', 'Sync invoice lifecycle', 'APIs: POST /invoice/create, /invoice/update, /invoice/cancel']
  },
  {
    id: 'layers-orchestration',
    title: 'Workflow Orchestration (Brain)',
    bullets: ['Create buyer relationship', 'Generate secure links', 'Manage mandate lifecycle', 'Decide debit timing & retries', 'Handle disputes and reconciliation']
  },
  {
    id: 'identity',
    title: 'Buyer Identity Layer',
    bullets: ['Primary keys: Mobile, GSTIN, PAN, Business Name', 'Match existing buyers', 'Group invoices, show unified view']
  },
  {
    id: 'mandate-scheduler',
    title: 'Mandate & Scheduler',
    bullets: ['eMandate lifecycle (Pending → Approved → UMRN)', 'Send to Easebuzz', 'Scheduler checks due dates & rules', 'Pre-debit validation']
  },
  {
    id: 'payment-exec',
    title: 'Payment Execution & Settlement',
    bullets: ['Trigger debit via Easebuzz', 'NPCI validation', 'UMRN & UTR mapping', 'Settlement callbacks and reconciliation']
  },
  {
    id: 'microservices',
    title: 'Microservice Topology',
    bullets: ['Invoice Service', 'Buyer Service', 'Mandate Service', 'Payment Service', 'Scheduler', 'ERP Sync', 'Notification Service']
  },
  {
    id: 'data-model',
    title: 'Data Model Snapshot',
    bullets: ['Buyer, Seller, Invoice, Request, Mandate, Payment, Audit Log']
  },
  {
    id: 'security-principles',
    title: 'Security Principles',
    bullets: ['Login before invoice access', 'OTP verification', 'Secure request token', 'Signed callbacks', 'Encryption & RBAC']
  },
  {
    id: 'edge-cases',
    title: 'Edge Cases & Controls',
    bullets: ['Duplicate invitations', 'Existing mandate reuse', 'Partial payments', 'Dispute handling', 'NPCI delays & async polling']
  },
  {
    id: 'ops-scale',
    title: 'Operational & Scalability',
    bullets: ['Queues (Kafka/Rabbit)', 'DB: Postgres + partitioning', 'Cache: Redis', 'Monitoring & SLOs']
  },
  {
    id: 'benefits',
    title: 'Benefits & Call to Action',
    bullets: ['Faster collections', 'Reduced manual effort', 'ERP-friendly expansion', 'Audit-ready reconciliation']
  }
]
