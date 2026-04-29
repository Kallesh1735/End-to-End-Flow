import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowRight,
  BellRing,
  CircleDollarSign,
  FileClock,
  Layers,
  LayoutDashboard,
  Landmark,
  RefreshCcw,
  Server,
  Send,
  ShieldCheck,
  Workflow
} from 'lucide-react'

const BOX_WIDTH = 236
const CONNECTOR_WIDTH = 128
const TRACK_WIDTH = (BOX_WIDTH * 11) + (CONNECTOR_WIDTH * 10)

const LAYERS = [
  {
    id: 'erp',
    order: '01',
    title: 'ERP Layer',
    zone: 'ERP Zone',
    owner: 'Seller ERP',
    type: 'Source System',
    microservice: 'ERP Sync Service',
    purpose: 'Invoice creation system.',
    inputs: ['Seller action'],
    processing: ['Capture invoice context', 'Create payment request flag'],
    outputs: ['Seller ID', 'Buyer Name', 'Buyer Mobile', 'Invoice Number', 'Invoice Amount', 'Due Date', 'KYC Reference', 'Payment Request Flag'],
    nextConnection: 'API Push',
    payload: 'ERP invoice payload with buyer and invoice metadata.',
    arrowLabel: 'API Push',
    style: 'glow',
    icon: Server,
    tone: 'from-cyan-500/18 via-slate-950 to-slate-900/80',
    zoneTone: 'from-cyan-400/8 to-cyan-400/3'
  },
  {
    id: 'integration',
    order: '02',
    title: 'Integration Layer',
    zone: 'Platform Zone',
    owner: 'Platform',
    type: 'Ingestion + Mapping',
    microservice: 'Integration Service',
    purpose: 'Receives ERP payload.',
    inputs: ['ERP invoice payload'],
    processing: ['Validate ERP payload', 'Create request ID', 'Store invoice', 'Create buyer mapping'],
    outputs: ['Request ID', 'Buyer Relationship', 'Invoice Mapping'],
    nextConnection: 'Request Creation',
    payload: 'Normalized invoice record with correlation ID.',
    arrowLabel: 'Request Creation',
    style: 'solid',
    icon: Layers,
    tone: 'from-indigo-500/18 via-slate-950 to-slate-900/80',
    zoneTone: 'from-indigo-400/8 to-indigo-400/3'
  },
  {
    id: 'workflow',
    order: '03',
    title: 'Workflow Engine',
    zone: 'Platform Zone',
    owner: 'Orchestration',
    type: 'Core Orchestration',
    microservice: 'Workflow Service',
    purpose: 'Core orchestration layer.',
    inputs: ['Request ID', 'Invoice Mapping', 'Buyer Mapping'],
    processing: ['Connect invoice to buyer', 'Create payment journey', 'Generate secure link'],
    outputs: ['Buyer request'],
    nextConnection: 'Workflow Creation',
    payload: 'Journey definition for secure invoice collection.',
    arrowLabel: 'Workflow Creation',
    style: 'solid',
    icon: Workflow,
    tone: 'from-sky-500/18 via-slate-950 to-slate-900/80',
    zoneTone: 'from-sky-400/8 to-sky-400/3'
  },
  {
    id: 'notification',
    order: '04',
    title: 'Notification Layer',
    zone: 'Platform Zone',
    owner: 'Communication',
    type: 'Invitation Delivery',
    microservice: 'Notification Service',
    purpose: 'Send invitation.',
    inputs: ['Buyer request'],
    processing: ['Build invitation message', 'Select channel', 'Attach secure URL'],
    outputs: ['SMS', 'WhatsApp', 'Email'],
    nextConnection: 'Secure Invitation',
    payload: 'pay.platform.com/request/REQ9001',
    arrowLabel: 'Secure Invitation',
    style: 'glow',
    icon: BellRing,
    tone: 'from-violet-500/18 via-slate-950 to-slate-900/80',
    zoneTone: 'from-violet-400/8 to-violet-400/3'
  },
  {
    id: 'auth',
    order: '05',
    title: 'Buyer Authentication Layer',
    zone: 'Buyer Zone',
    owner: 'Buyer Identity',
    type: 'Identity Verification',
    microservice: 'Identity Service',
    purpose: 'Verify buyer identity.',
    inputs: ['Mobile Number', 'OTP'],
    processing: ['Match buyer', 'Validate ownership', 'Authenticate session'],
    outputs: ['Authenticated Buyer'],
    nextConnection: 'Identity Verified',
    payload: 'Session token and authenticated buyer profile.',
    arrowLabel: 'Identity Verified',
    style: 'solid',
    icon: ShieldCheck,
    tone: 'from-emerald-500/18 via-slate-950 to-slate-900/80',
    zoneTone: 'from-emerald-400/8 to-emerald-400/3'
  },
  {
    id: 'dashboard',
    order: '06',
    title: 'Buyer Dashboard Layer',
    zone: 'Buyer Zone',
    owner: 'Buyer Experience',
    type: 'Invoice View',
    microservice: 'Buyer View Service',
    purpose: 'Show linked invoices.',
    inputs: ['Authenticated Buyer Session'],
    processing: ['Show linked invoices', 'Display due amount', 'Expose mandate status'],
    outputs: ['Pending invoices', 'Due amount', 'Seller mapping', 'Mandate status'],
    nextConnection: 'Mandate Request',
    payload: 'Buyer-scoped invoice list with action state.',
    arrowLabel: 'Mandate Request',
    style: 'glow',
    icon: LayoutDashboard,
    tone: 'from-cyan-500/18 via-slate-950 to-slate-900/80',
    zoneTone: 'from-cyan-400/8 to-cyan-400/3'
  },
  {
    id: 'mandate',
    order: '07',
    title: 'Mandate Engine',
    zone: 'Banking Zone',
    owner: 'Mandate Orchestration',
    type: 'Consent Builder',
    microservice: 'Mandate Service',
    purpose: 'Collect banking authorization.',
    inputs: ['Account Number', 'IFSC', 'Account Holder', 'Consent'],
    processing: ['Build mandate payload', 'Package consent metadata', 'Prepare partner request'],
    outputs: ['Mandate API Request'],
    nextConnection: 'Mandate API',
    payload: 'eMandate request object with bank consent fields.',
    arrowLabel: 'Mandate API',
    style: 'solid',
    icon: CircleDollarSign,
    tone: 'from-amber-500/18 via-slate-950 to-slate-900/80',
    zoneTone: 'from-amber-400/8 to-amber-400/3'
  },
  {
    id: 'easebuzz',
    order: '08',
    title: 'Easebuzz Layer',
    zone: 'Banking Zone',
    owner: 'Payment Partner',
    type: 'Partner Gateway',
    microservice: 'Partner Gateway',
    purpose: 'Payment partner integration.',
    inputs: ['Mandate request'],
    processing: ['Send partner request', 'Track callback', 'Translate banking response'],
    outputs: ['NPCI request', 'UMRN', 'Status', 'Timestamp'],
    nextConnection: 'Bank Processing',
    payload: 'Partner request and callback token.',
    arrowLabel: 'Bank Processing',
    style: 'glow',
    icon: Send,
    tone: 'from-fuchsia-500/18 via-slate-950 to-slate-900/80',
    zoneTone: 'from-fuchsia-400/8 to-fuchsia-400/3'
  },
  {
    id: 'npci',
    order: '09',
    title: 'NPCI / Banking Layer',
    zone: 'Banking Zone',
    owner: 'Bank / NPCI',
    type: 'Mandate Validation',
    microservice: 'Banking Rail Service',
    purpose: 'Validate mandate.',
    inputs: ['Partner request'],
    processing: ['Validate account', 'Validate consent', 'Generate UMRN'],
    outputs: ['Approved mandate'],
    nextConnection: 'Mandate Approved',
    payload: 'Approved mandate acknowledgement with UMRN.',
    arrowLabel: 'Mandate Approved',
    style: 'solid',
    icon: Landmark,
    tone: 'from-cyan-500/18 via-slate-950 to-slate-900/80',
    zoneTone: 'from-cyan-400/8 to-cyan-400/3'
  },
  {
    id: 'settlement',
    order: '10',
    title: 'Settlement Layer',
    zone: 'Banking Zone',
    owner: 'Settlement Engine',
    type: 'Debit Execution',
    microservice: 'Payment Service',
    purpose: 'Execute debit.',
    inputs: ['Due date trigger', 'Debit request'],
    processing: ['Run debit on due date', 'Reconcile payment response'],
    outputs: ['UTR', 'Payment Status'],
    nextConnection: 'Settlement Complete',
    payload: 'Settlement response carrying UTR and payment status.',
    arrowLabel: 'Settlement Complete',
    style: 'glow',
    icon: CircleDollarSign,
    tone: 'from-red-500/18 via-slate-950 to-slate-900/80',
    zoneTone: 'from-red-400/8 to-red-400/3'
  },
  {
    id: 'sync',
    order: '11',
    title: 'ERP Sync Layer',
    zone: 'Feedback Zone',
    owner: 'Feedback Loop',
    type: 'ERP Callback',
    microservice: 'ERP Sync Service',
    purpose: 'Update ERP.',
    inputs: ['Payment success', 'UTR', 'Mandate status', 'Settlement Date'],
    processing: ['Write back settlement result', 'Close invoice record', 'Update ERP status'],
    outputs: ['Payment success', 'UTR', 'Mandate status', 'Settlement Date'],
    nextConnection: 'Closed Loop',
    payload: 'ERP callback payload with settlement evidence.',
    arrowLabel: 'ERP Update',
    style: 'glow',
    icon: RefreshCcw,
    tone: 'from-emerald-500/18 via-slate-950 to-slate-900/80',
    zoneTone: 'from-emerald-400/8 to-emerald-400/3'
  }
]

const LIFE_CYCLE = ['Invoice', 'Identity', 'Mandate', 'Debit', 'Settlement', 'ERP Sync']

const LEGEND = [
  {
    title: 'Architecture box',
    note: 'One layer in the enterprise flow. Each box shows purpose, data, processing, and output.'
  },
  {
    title: 'Arrow meaning',
    note: 'Solid = main flow, dashed = callback path, glow = active/critical transfer.'
  },
  {
    title: 'Ownership',
    note: 'The owner chip shows whether the layer belongs to ERP, platform, buyer, bank, or feedback.'
  },
  {
    title: 'Layer type',
    note: 'The small type chip identifies source systems, orchestration, identity, banking, settlement, and sync.'
  }
]

const FAILURE_FLOW = [
  {
    title: 'Debit Failed',
    note: 'Bank returns a failure for balance, consent, or rail validation.'
  },
  {
    title: 'Retry Engine',
    note: 'Workflow schedules a controlled retry or fallback evaluation.'
  },
  {
    title: 'Reminder Sent',
    note: 'Notification layer sends follow-up and escalation messaging.'
  },
  {
    title: 'ERP Updated',
    note: 'ERP receives the failure status and next-step tracking state.'
  }
]

function joinClassNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function buildZoneStyle(startBox, endBox) {
  const left = (startBox - 1) * (BOX_WIDTH + CONNECTOR_WIDTH)
  const width = ((endBox - startBox + 1) * BOX_WIDTH) + ((endBox - startBox) * CONNECTOR_WIDTH)
  return { left, width }
}

function getTrackWidth() {
  return `${TRACK_WIDTH}px`
}

function Badge({ children, tone = 'bg-white/6 text-slate-200 border-white/10' }) {
  return (
    <span className={joinClassNames('inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-medium tracking-[0.16em] uppercase', tone)}>
      {children}
    </span>
  )
}

function LifecycleRibbon() {
  return (
    <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.28)]">
      <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-xs tracking-[0.24em] uppercase text-slate-400">
        {LIFE_CYCLE.map((item, index) => (
          <React.Fragment key={item}>
            <span className={joinClassNames('rounded-full border px-3 py-2', index === 0 ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-100' : 'border-white/10 bg-white/5 text-slate-300')}>
              {item}
            </span>
            {index < LIFE_CYCLE.length - 1 && <ArrowRight size={14} className="hidden sm:block text-slate-500" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

function DetailItem({ label, items }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-[10px] uppercase tracking-[0.24em] text-slate-500">{label}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1.5 text-xs text-slate-200">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function ArchitectureBox({ layer, active, onClick }) {
  const Icon = layer.icon

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={joinClassNames(
        'group relative flex h-[540px] w-[236px] flex-none flex-col overflow-hidden rounded-[30px] border text-left shadow-[0_28px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl transition-all duration-300',
        active ? 'border-cyan-400/60 bg-cyan-500/8 ring-1 ring-cyan-300/40 shadow-[0_28px_90px_rgba(34,211,238,0.16)]' : 'border-white/10 bg-[#0b1524]/85'
      )}
    >
      <div className={joinClassNames('absolute inset-0 bg-gradient-to-br opacity-90', layer.tone)} />
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-white/10 via-cyan-300/70 to-transparent opacity-80" />
      <div className="relative flex h-full flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="border-cyan-400/20 bg-cyan-400/10 text-cyan-100">Layer {layer.order}</Badge>
              <Badge tone="border-white/10 bg-white/5 text-slate-300">{layer.zone}</Badge>
            </div>
            <h3 className="mt-3 text-xl font-semibold leading-tight text-white">{layer.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{layer.purpose}</p>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-200 shadow-lg shadow-cyan-500/10">
            <Icon size={22} />
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <DetailItem label="Input Data" items={layer.inputs} />
          <DetailItem label="Processing" items={layer.processing} />
          <DetailItem label="Output Data" items={layer.outputs} />
        </div>

        <div className="mt-auto pt-4">
          <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-400">
            <Badge tone="border-white/10 bg-white/5 text-slate-200">Owner: {layer.owner}</Badge>
            <Badge tone="border-white/10 bg-white/5 text-slate-200">{layer.type}</Badge>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-cyan-400/15 bg-black/20 px-4 py-3">
            <span className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Next Connection</span>
            <span className="text-sm font-semibold text-cyan-100">{layer.nextConnection}</span>
          </div>
          <div className="mt-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm leading-6 text-slate-300">
            <span className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Payload</span>
            <p className="mt-1">{layer.payload}</p>
          </div>
          <div className="mt-4 text-[11px] uppercase tracking-[0.24em] text-slate-500">{layer.microservice}</div>
        </div>
      </div>
    </motion.button>
  )
}

function ArchitectureConnector({ label, styleType }) {
  const isDashed = styleType === 'dashed'
  const isGlow = styleType === 'glow'

  return (
    <div className="relative flex h-[540px] w-[128px] flex-none items-center justify-center">
      <div className="absolute inset-y-0 left-1/2 w-px bg-white/5" />
      <div className="relative flex h-full w-full items-center justify-center">
        <motion.div
          aria-hidden="true"
          className={joinClassNames('absolute top-[50%] h-px w-[112px] -translate-y-1/2', isGlow ? 'bg-cyan-300/70 shadow-[0_0_22px_rgba(34,211,238,0.5)]' : isDashed ? 'bg-white/40' : 'bg-cyan-300/40')}
          initial={{ scaleX: 0.72, opacity: 0.45 }}
          animate={{ scaleX: [0.82, 1, 0.82], opacity: isGlow ? [0.65, 1, 0.65] : 0.7 }}
          transition={{ duration: isGlow ? 2.4 : 3.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'center' }}
        />
        <svg className="absolute top-[50%] -translate-y-1/2" width="128" height="42" viewBox="0 0 128 42" fill="none" aria-hidden="true">
          <line
            x1="10"
            y1="21"
            x2="108"
            y2="21"
            stroke={isGlow ? '#67e8f9' : '#cbd5e1'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={isDashed ? '7 7' : '0'}
            opacity={isGlow ? '0.95' : '0.55'}
          />
          <path
            d="M 102 15 L 110 21 L 102 27"
            stroke={isGlow ? '#67e8f9' : '#cbd5e1'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity={isGlow ? '0.95' : '0.55'}
          />
          {isGlow && <circle cx="34" cy="21" r="2" fill="#67e8f9" opacity="0.9" />}
        </svg>
        <div className="absolute top-[calc(50%-58px)] max-w-[112px] rounded-full border border-white/10 bg-slate-950/80 px-3 py-1 text-center text-[10px] uppercase tracking-[0.2em] text-slate-300 shadow-[0_12px_28px_rgba(0,0,0,0.28)]">
          {label}
        </div>
      </div>
    </div>
  )
}

function ArchitectureCanvas({ activeLayerId, setActiveLayerId }) {
  return (
    <div className="rounded-[34px] border border-white/10 bg-[#08111d]/90 p-4 sm:p-6 shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">Main Architecture Diagram</h2>
          <p className="mt-2 max-w-3xl text-sm sm:text-base leading-7 text-slate-400">
            Horizontal enterprise flow with layered ownership, payload exchange, banking communication, and ERP synchronization.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-slate-400">
          <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
          Architecture canvas
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#07101a]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.10),_transparent_38%),radial-gradient(circle_at_70%_10%,_rgba(99,102,241,0.08),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.08),_transparent_35%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:64px_64px]" />

        <div className="relative overflow-x-auto pb-6">
          <div className="relative px-4 pt-8" style={{ minWidth: getTrackWidth() }}>
            <div className="pointer-events-none absolute inset-y-0" style={{ width: getTrackWidth() }}>
              {[
                { label: 'ERP Zone', start: 1, end: 1, tone: 'bg-cyan-500/6' },
                { label: 'Platform Zone', start: 2, end: 4, tone: 'bg-indigo-500/6' },
                { label: 'Buyer Zone', start: 5, end: 6, tone: 'bg-emerald-500/6' },
                { label: 'Banking Zone', start: 7, end: 10, tone: 'bg-amber-500/6' },
                { label: 'Feedback Zone', start: 11, end: 11, tone: 'bg-rose-500/6' }
              ].map((zone) => {
                const dims = buildZoneStyle(zone.start, zone.end)
                return (
                  <div
                    key={zone.label}
                    className={joinClassNames('absolute top-3 bottom-3 rounded-[32px] border border-white/5 backdrop-blur-sm', zone.tone)}
                    style={{ left: `${dims.left}px`, width: `${dims.width}px` }}
                  >
                    <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-slate-300">
                      {zone.label}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="relative flex items-stretch">
              {LAYERS.map((layer, index) => {
                const isActive = layer.id === activeLayerId
                return (
                  <React.Fragment key={layer.id}>
                    <ArchitectureBox
                      layer={layer}
                      active={isActive}
                      onClick={() => setActiveLayerId(layer.id)}
                    />
                    {index < LAYERS.length - 1 && (
                      <ArchitectureConnector label={layer.arrowLabel} styleType={layer.style} />
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LegendBlock() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/5 p-5 sm:p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <h3 className="text-xl font-semibold text-white">Legend + Color Meaning</h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {LEGEND.map((item) => (
          <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
            <div className="text-sm font-semibold text-white">{item.title}</div>
            <p className="mt-2 text-sm leading-6 text-slate-400">{item.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function FailureFlow() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/5 p-5 sm:p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">Failure Flow Section</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">Callback and retry path for settlement failures.</p>
        </div>
        <Badge tone="border-rose-400/20 bg-rose-400/10 text-rose-100">Callback Path</Badge>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {FAILURE_FLOW.map((step, index) => (
          <div key={step.title} className="relative rounded-[26px] border border-rose-400/15 bg-slate-950/50 p-4">
            <div className="flex items-center justify-between">
              <Badge tone="border-rose-400/20 bg-rose-400/10 text-rose-100">0{index + 1}</Badge>
              {index < FAILURE_FLOW.length - 1 && <ArrowRight size={16} className="text-rose-300/60 md:hidden" />}
            </div>
            <div className="mt-4 text-lg font-semibold text-white">{step.title}</div>
            <p className="mt-2 text-sm leading-6 text-slate-400">{step.note}</p>
            {index < FAILURE_FLOW.length - 1 && (
              <div className="absolute -right-2 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-gradient-to-r from-rose-300/60 to-transparent md:block" />
            )}
            {index < FAILURE_FLOW.length - 1 && (
              <div className="absolute right-0 top-1/2 hidden h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full border border-rose-300/50 bg-slate-950 md:block" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function DetailPanel({ layer }) {
  const Icon = layer.icon

  return (
    <div className="rounded-[34px] border border-white/10 bg-white/5 p-5 sm:p-6 shadow-[0_28px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl lg:sticky lg:top-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="border-cyan-400/20 bg-cyan-400/10 text-cyan-100">Selected Layer</Badge>
            <Badge tone="border-white/10 bg-white/5 text-slate-300">{layer.zone}</Badge>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-white">{layer.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{layer.purpose}</p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-200 shadow-lg shadow-cyan-500/10">
          <Icon size={26} />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
          <div className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Owner</div>
          <div className="mt-2 text-base font-semibold text-white">{layer.owner}</div>
          <div className="mt-1 text-sm text-slate-400">{layer.type}</div>
        </div>

        <DetailItem label="Inputs" items={layer.inputs} />
        <DetailItem label="Outputs" items={layer.outputs} />
        <DetailItem label="Processing" items={layer.processing} />

        <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
          <div className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Data Payload</div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{layer.payload}</p>
        </div>

        <div className="rounded-3xl border border-cyan-400/15 bg-cyan-500/10 p-4">
          <div className="text-[10px] uppercase tracking-[0.24em] text-cyan-100/80">Next Connection</div>
          <p className="mt-2 text-base font-semibold text-cyan-50">{layer.nextConnection}</p>
          <p className="mt-1 text-sm text-cyan-100/70">Arrow label: {layer.arrowLabel}</p>
          <p className="mt-3 text-[10px] uppercase tracking-[0.24em] text-cyan-100/60">Microservice: {layer.microservice}</p>
        </div>
      </div>
    </div>
  )
}

export default function ArchitectureBoard() {
  const [activeLayerId, setActiveLayerId] = useState(LAYERS[0].id)
  const activeLayer = LAYERS.find((layer) => layer.id === activeLayerId) || LAYERS[0]

  return (
    <main className="min-h-screen bg-[#07111d] text-white">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_30%),radial-gradient(circle_at_70%_10%,_rgba(99,102,241,0.12),_transparent_26%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.10),_transparent_28%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px]" />

        <section className="relative mx-auto max-w-[1680px] px-4 pb-10 pt-12 sm:px-6 md:px-10 md:pt-16">
          <div className="max-w-5xl">
            <Badge tone="border-cyan-400/20 bg-cyan-400/10 text-cyan-100">Enterprise Architecture Presentation</Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.04] tracking-tight text-white sm:text-5xl md:text-7xl">
              ERP → Buyer → eMandate → Payment → ERP Sync
            </h1>
            <p className="mt-5 max-w-4xl text-sm leading-7 text-slate-300 sm:text-base md:text-xl md:leading-8">
              A meeting-ready architecture wall for explaining the full enterprise flow, payload exchange, ownership, banking communication, settlement logic, and ERP synchronization without dashboard patterns or portal UI.
            </p>
          </div>

          <LifecycleRibbon />
        </section>

        <section className="relative mx-auto max-w-[1680px] px-4 pb-12 sm:px-6 md:px-10 md:pb-16">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
            <div className="space-y-6">
              <ArchitectureCanvas activeLayerId={activeLayerId} setActiveLayerId={setActiveLayerId} />

              <div className="grid gap-6 xl:grid-cols-2">
                <LegendBlock />
                <FailureFlow />
              </div>
            </div>

            <DetailPanel layer={activeLayer} />
          </div>
        </section>
      </div>
    </main>
  )
}
