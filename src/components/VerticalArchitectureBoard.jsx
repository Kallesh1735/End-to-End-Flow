import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDown,
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
    tone: 'from-cyan-500/14 via-slate-950 to-slate-900/80'
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
    tone: 'from-indigo-500/14 via-slate-950 to-slate-900/80'
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
    tone: 'from-sky-500/14 via-slate-950 to-slate-900/80'
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
    tone: 'from-violet-500/14 via-slate-950 to-slate-900/80'
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
    tone: 'from-emerald-500/14 via-slate-950 to-slate-900/80'
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
    tone: 'from-cyan-500/14 via-slate-950 to-slate-900/80'
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
    tone: 'from-amber-500/14 via-slate-950 to-slate-900/80'
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
    tone: 'from-fuchsia-500/14 via-slate-950 to-slate-900/80'
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
    tone: 'from-cyan-500/14 via-slate-950 to-slate-900/80'
  },
  {
    id: 'settlement',
    order: '10',
    title: 'Settlement Layer',
    zone: 'Settlement Zone',
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
    tone: 'from-red-500/14 via-slate-950 to-slate-900/80'
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
    tone: 'from-emerald-500/14 via-slate-950 to-slate-900/80'
  }
]

const ZONE_GROUPS = [
  { title: 'ERP Zone', tone: 'from-cyan-500/8 to-cyan-500/3', layers: ['erp'] },
  { title: 'Platform Zone', tone: 'from-indigo-500/8 to-indigo-500/3', layers: ['integration', 'workflow', 'notification'] },
  { title: 'Buyer Zone', tone: 'from-emerald-500/8 to-emerald-500/3', layers: ['auth', 'dashboard'] },
  { title: 'Banking Zone', tone: 'from-amber-500/8 to-amber-500/3', layers: ['mandate', 'easebuzz', 'npci'] },
  { title: 'Settlement Zone', tone: 'from-red-500/8 to-red-500/3', layers: ['settlement'] },
  { title: 'Feedback Zone', tone: 'from-rose-500/8 to-rose-500/3', layers: ['sync'] }
]

const LIFE_CYCLE = ['Invoice', 'Identity', 'Mandate', 'Debit', 'Settlement', 'ERP Sync']

const LEGEND = [
  ['Box meaning', 'One enterprise layer with purpose, data, processing, outputs, ownership, and the next hop.'],
  ['Arrow meaning', 'Solid = main flow, glow = active transfer, dashed = callback or retry path.'],
  ['Ownership', 'Owner chips identify ERP, platform, buyer, banking, settlement, and feedback responsibilities.'],
  ['Layer type', 'Type chips mark source system, orchestration, identity, payment partner, banking, and sync roles.']
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

function Badge({ children, tone = 'border-white/10 bg-white/5 text-slate-200' }) {
  return (
    <span className={joinClassNames('inline-flex items-center rounded-full border px-3 py-1.5 text-[10px] sm:text-xs font-medium tracking-[0.18em] uppercase', tone)}>
      {children}
    </span>
  )
}

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="max-w-5xl">
      <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-cyan-100">
        {eyebrow}
      </div>
      <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">{title}</h2>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-400 sm:text-base md:text-lg md:leading-8">{description}</p>
    </div>
  )
}

function ChipList({ items }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2.5">
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center rounded-full border border-white/10 bg-slate-950/60 px-3.5 py-2 text-[11px] sm:text-xs text-slate-100 shadow-[0_12px_24px_rgba(0,0,0,0.22)]"
        >
          {item}
        </span>
      ))}
    </div>
  )
}

function FieldBlock({ label, items, highlight = false }) {
  return (
    <div className={joinClassNames('rounded-[28px] border p-5 sm:p-6 md:p-7', highlight ? 'border-cyan-400/20 bg-cyan-500/8' : 'border-white/10 bg-white/5')}>
      <div className="flex items-center justify-between gap-3">
        <div className="text-[10px] sm:text-xs uppercase tracking-[0.26em] text-slate-400">{label}</div>
        <Badge tone={highlight ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-100' : 'border-white/10 bg-white/5 text-slate-300'}>Payload</Badge>
      </div>
      <ChipList items={items} />
    </div>
  )
}

function MetaBlock({ label, value }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-950/40 px-4 py-4 sm:px-5 sm:py-5">
      <div className="text-[10px] uppercase tracking-[0.26em] text-slate-500">{label}</div>
      <div className="mt-2 text-sm sm:text-base font-semibold text-white">{value}</div>
    </div>
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
            {index < LIFE_CYCLE.length - 1 && <ArrowDown size={14} className="hidden sm:block text-slate-500 rotate-[-90deg]" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

function ArchitectureCard({ layer, active, onClick }) {
  const Icon = layer.icon

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -5, scale: 1.004 }}
      className={joinClassNames(
        'group relative w-full overflow-visible rounded-[36px] border text-left shadow-[0_30px_100px_rgba(0,0,0,0.36)] backdrop-blur-xl transition-all duration-300',
        active ? 'border-cyan-400/60 bg-cyan-500/10 ring-1 ring-cyan-300/40 shadow-[0_30px_120px_rgba(34,211,238,0.20)]' : 'border-white/10 bg-[#0b1524]/88'
      )}
    >
      <div className={joinClassNames('absolute inset-0 rounded-[36px] bg-gradient-to-br opacity-90', layer.tone)} />
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-white/10 via-cyan-300/70 to-transparent opacity-80" />
      <div className="relative p-6 sm:p-8 md:p-10 lg:p-12">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge tone="border-cyan-400/20 bg-cyan-400/10 text-cyan-100">Layer {layer.order}</Badge>
              <Badge tone="border-white/10 bg-white/5 text-slate-300">{layer.zone}</Badge>
              <Badge tone="border-white/10 bg-white/5 text-slate-300">{layer.type}</Badge>
            </div>

            <h3 className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-4xl">{layer.title}</h3>
            <p className="mt-4 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">{layer.purpose}</p>

            <div className="mt-6 rounded-[28px] border border-white/10 bg-slate-950/40 px-4 py-4 sm:px-5 sm:py-5">
              <div className="text-[10px] uppercase tracking-[0.26em] text-slate-500">Arrow Label</div>
              <div className="mt-2 text-sm sm:text-base font-semibold text-cyan-100">{layer.arrowLabel}</div>
              <div className="mt-2 text-sm text-slate-400">{layer.nextConnection}</div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-4 rounded-[28px] border border-white/10 bg-white/5 px-4 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/60 text-cyan-200 shadow-lg shadow-cyan-500/10">
              <Icon size={28} />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Owner</div>
              <div className="mt-1 text-lg font-semibold text-white">{layer.owner}</div>
              <div className="mt-1 text-sm text-slate-400">{layer.microservice}</div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6">
          <FieldBlock label="Input Data" items={layer.inputs} />
          <FieldBlock label="Processing" items={layer.processing} highlight />
          <FieldBlock label="Output Data" items={layer.outputs} />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <MetaBlock label="Owner + Service" value={`${layer.owner} • ${layer.microservice}`} />
          <MetaBlock label="Next Connection" value={layer.nextConnection} />
          <MetaBlock label="Data Payload" value={layer.payload} />
        </div>
      </div>
</motion.button>
  )
}

function VerticalConnector({ label, styleType = 'solid' }) {
  const isGlow = styleType === 'glow'
  const isDashed = styleType === 'dashed'

  return (
    <div className="relative flex h-40 sm:h-48 md:h-56 items-center justify-center py-2">
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-cyan-400/10 via-white/10 to-cyan-400/10" />
      <motion.div
        aria-hidden="true"
        className={joinClassNames('absolute left-1/2 top-0 h-full w-px -translate-x-1/2', isGlow ? 'bg-cyan-300/60 shadow-[0_0_22px_rgba(34,211,238,0.45)]' : 'bg-white/10')}
        animate={{ opacity: isGlow ? [0.45, 1, 0.45] : [0.18, 0.6, 0.18] }}
        transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-6 h-8 w-8 -translate-x-1/2 rounded-full border border-cyan-300/30 bg-cyan-300/8 shadow-[0_0_18px_rgba(34,211,238,0.20)]"
        animate={{ y: [0, 120, 0], opacity: [0.18, 1, 0.18], scale: [0.92, 1, 0.92] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex h-full w-full items-center justify-center text-cyan-200">
          <ArrowDown size={15} />
        </div>
      </motion.div>

      <motion.div
        className={joinClassNames(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.26em] shadow-[0_16px_36px_rgba(0,0,0,0.22)] backdrop-blur-xl',
          isGlow ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-100' : isDashed ? 'border-white/10 bg-slate-950/70 text-slate-300' : 'border-white/10 bg-white/6 text-slate-300'
        )}
        animate={{ scale: [0.98, 1.03, 0.98] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        {label}
      </motion.div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-slate-500">
        <ArrowDown size={18} />
      </div>
    </div>
  )
}

function VerticalArchitectureCanvas({ activeLayerId, setActiveLayerId }) {
  const layerRefs = useRef([])
  const layerMap = useMemo(() => Object.fromEntries(LAYERS.map((layer) => [layer.id, layer])), [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target?.dataset?.layerId) {
          setActiveLayerId(visible.target.dataset.layerId)
        }
      },
      { threshold: [0.35, 0.5, 0.65], rootMargin: '-18% 0px -40% 0px' }
    )

    layerRefs.current.forEach((node) => {
      if (node) observer.observe(node)
    })

    return () => observer.disconnect()
  }, [setActiveLayerId])

  return (
    <div className="rounded-[40px] border border-white/10 bg-[#08111d]/90 p-4 sm:p-6 md:p-8 shadow-[0_30px_100px_rgba(0,0,0,0.42)] backdrop-blur-xl">
      <SectionTitle
        eyebrow="Vertical Architecture Canvas"
        title="Main Architecture Diagram"
        description="A top-to-bottom enterprise board that explains the full ERP → Buyer → eMandate → Payment → ERP Sync path without any horizontal scrolling."
      />

      <div className="mt-8 space-y-8 sm:space-y-10 md:space-y-12">
        {ZONE_GROUPS.map((group, groupIndex) => {
          const groupLayers = group.layers.map((layerId) => layerMap[layerId]).filter(Boolean)
          const lastLayer = groupLayers[groupLayers.length - 1]

          return (
            <section
              key={group.title}
              className={joinClassNames('relative overflow-hidden rounded-[34px] border border-white/10 bg-white/5 p-4 sm:p-6 md:p-8', `bg-gradient-to-b ${group.tone}`)}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.07),_transparent_36%)] opacity-80" />
              <div className="relative mb-6 flex items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center rounded-full border border-white/10 bg-slate-950/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.26em] text-slate-300">
                    {group.title}
                  </div>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                    Subtle background band for the {group.title.toLowerCase()} layers in the vertical enterprise flow.
                  </p>
                </div>
                <Badge tone="border-cyan-400/20 bg-cyan-400/10 text-cyan-100">Scroll down</Badge>
              </div>

              <div className="relative mx-auto flex w-full max-w-[1180px] flex-col items-center">
                {groupLayers.map((layer, index) => {
                  const isActive = layer.id === activeLayerId

                  return (
                    <React.Fragment key={layer.id}>
                      <div
                        ref={(node) => {
                          const refIndex = LAYERS.findIndex((candidate) => candidate.id === layer.id)
                          layerRefs.current[refIndex] = node
                        }}
                        data-layer-id={layer.id}
                        className="w-full"
                      >
                        <ArchitectureCard
                          layer={layer}
                          active={isActive}
                          onClick={() => setActiveLayerId(layer.id)}
                        />
                      </div>

                      {index < groupLayers.length - 1 && (
                        <VerticalConnector label={layer.arrowLabel} styleType={layer.style} />
                      )}
                    </React.Fragment>
                  )
                })}

                {groupIndex < ZONE_GROUPS.length - 1 && lastLayer && (
                  <div className="w-full">
                    <VerticalConnector label={lastLayer.arrowLabel} styleType={lastLayer.style} />
                  </div>
                )}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

function SelectedLayerDetailsPanel({ layer }) {
  const Icon = layer.icon

  return (
    <section className="rounded-[40px] border border-white/10 bg-white/5 p-5 sm:p-6 md:p-8 shadow-[0_26px_90px_rgba(0,0,0,0.34)] backdrop-blur-xl">
      <SectionTitle
        eyebrow="Selected Layer Details Panel"
        title={layer.title}
        description="This panel expands the current layer with ownership, payload meaning, processing logic, and the next integration hop."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <div className="rounded-[34px] border border-white/10 bg-slate-950/40 p-6 sm:p-7 md:p-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge tone="border-cyan-400/20 bg-cyan-400/10 text-cyan-100">Layer {layer.order}</Badge>
            <Badge tone="border-white/10 bg-white/5 text-slate-300">{layer.zone}</Badge>
            <Badge tone="border-white/10 bg-white/5 text-slate-300">{layer.owner}</Badge>
          </div>

          <h3 className="mt-5 text-2xl font-semibold text-white sm:text-3xl">{layer.purpose}</h3>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">{layer.payload}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <MetaBlock label="Owner" value={layer.owner} />
            <MetaBlock label="Microservice" value={layer.microservice} />
            <MetaBlock label="Arrow Label" value={layer.arrowLabel} />
          </div>

          <div className="mt-6 grid gap-5">
            <FieldBlock label="Input Data" items={layer.inputs} />
            <FieldBlock label="Processing" items={layer.processing} highlight />
            <FieldBlock label="Output Data" items={layer.outputs} />
          </div>
        </div>

        <div className="grid gap-4 content-start">
          <div className="rounded-[30px] border border-white/10 bg-white/5 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/50 text-cyan-200">
                <Icon size={22} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.26em] text-slate-500">Current Layer</div>
                <div className="mt-1 text-lg font-semibold text-white">{layer.title}</div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Click any box in the vertical board to update this panel. The selected layer glows and the description updates to match the active scroll position.
            </p>
          </div>

          <div className="rounded-[30px] border border-cyan-400/15 bg-cyan-500/10 p-5 sm:p-6">
            <div className="text-[10px] uppercase tracking-[0.26em] text-cyan-100/80">Next Connection</div>
            <p className="mt-2 text-lg font-semibold text-white">{layer.nextConnection}</p>
            <p className="mt-2 text-sm leading-7 text-cyan-100/80">{layer.payload}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function FailureFlow() {
  return (
    <section className="rounded-[40px] border border-white/10 bg-white/5 p-5 sm:p-6 md:p-8 shadow-[0_26px_90px_rgba(0,0,0,0.34)] backdrop-blur-xl">
      <SectionTitle
        eyebrow="Failure Flow"
        title="Debit Failure / Retry Path"
        description="A clean callback path for the architecture wall, showing how the system responds when debit execution fails."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {FAILURE_FLOW.map((step, index) => (
          <div key={step.title} className="relative rounded-[28px] border border-rose-400/15 bg-slate-950/45 p-5 sm:p-6">
            <Badge tone="border-rose-400/20 bg-rose-400/10 text-rose-100">0{index + 1}</Badge>
            <h4 className="mt-4 text-lg font-semibold text-white">{step.title}</h4>
            <p className="mt-3 text-sm leading-7 text-slate-400">{step.note}</p>
            {index < FAILURE_FLOW.length - 1 && (
              <div className="absolute right-[-1rem] top-1/2 hidden h-px w-8 -translate-y-1/2 bg-gradient-to-r from-rose-300/70 to-transparent md:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function LegendBlock() {
  return (
    <section className="rounded-[40px] border border-white/10 bg-white/5 p-5 sm:p-6 md:p-8 shadow-[0_26px_90px_rgba(0,0,0,0.34)] backdrop-blur-xl">
      <SectionTitle
        eyebrow="Legend"
        title="Box, Arrow, Ownership, Layer Meaning"
        description="A quick guide for reading the architecture wall during a meeting."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {LEGEND.map(([title, note]) => (
          <div key={title} className="rounded-[28px] border border-white/10 bg-slate-950/45 p-5">
            <div className="text-sm font-semibold text-white">{title}</div>
            <p className="mt-2 text-sm leading-7 text-slate-400">{note}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function BoardSummaryRibbon({ activeLayer }) {
  return (
    <section className="rounded-[34px] border border-white/10 bg-white/5 p-5 sm:p-6 md:p-8 shadow-[0_26px_90px_rgba(0,0,0,0.34)] backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Active Layer</div>
          <h3 className="mt-2 text-2xl font-semibold text-white">{activeLayer.title}</h3>
          <p className="mt-2 text-sm leading-7 text-slate-400">{activeLayer.purpose}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone="border-cyan-400/20 bg-cyan-400/10 text-cyan-100">{activeLayer.zone}</Badge>
          <Badge tone="border-white/10 bg-white/5 text-slate-300">{activeLayer.owner}</Badge>
          <Badge tone="border-white/10 bg-white/5 text-slate-300">{activeLayer.microservice}</Badge>
        </div>
      </div>
    </section>
  )
}

export default function VerticalArchitectureBoard() {
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
          <div className="space-y-8 md:space-y-10">
            <BoardSummaryRibbon activeLayer={activeLayer} />
            <VerticalArchitectureCanvas activeLayerId={activeLayerId} setActiveLayerId={setActiveLayerId} />
            <SelectedLayerDetailsPanel layer={activeLayer} />
            <FailureFlow />
            <LegendBlock />
          </div>
        </section>
      </div>
    </main>
  )
}
