import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ShieldCheck, Link2, Search, CheckCircle2, CalendarClock, Landmark, FileClock, LayoutDashboard } from 'lucide-react'

const STAGES = [
  {
    title: '1. Seller creates invoice',
    desc: 'C-Square ERP generates the invoice and sends it to the platform for collection orchestration.',
    owner: 'Seller / ERP',
    icon: FileClock,
    accent: 'from-cyan-500/20 to-slate-900/60'
  },
  {
    title: '2. Secure invitation generated',
    desc: 'The platform creates a secure, single-use request link tied to the invoice context.',
    owner: 'Platform',
    icon: Link2,
    accent: 'from-indigo-500/20 to-slate-900/60'
  },
  {
    title: '3. Buyer clicks secure link',
    desc: 'The journey begins at authentication. No invoice data is exposed yet.',
    owner: 'Buyer',
    icon: Search,
    accent: 'from-emerald-500/20 to-slate-900/60'
  },
  {
    title: '4. Login / Signup appears',
    desc: 'The system gates access with login or sign-up before any request details are shown.',
    owner: 'Authentication Layer',
    icon: ShieldCheck,
    accent: 'from-amber-500/20 to-slate-900/60'
  },
  {
    title: '5. OTP verification',
    desc: 'OTP confirms control of the registered channel and blocks unauthorized access.',
    owner: 'Authentication Layer',
    icon: ShieldCheck,
    accent: 'from-red-500/20 to-slate-900/60'
  },
  {
    title: '6. Buyer identity matched',
    desc: 'Mobile, GSTIN, PAN, and business name are used to match or create the buyer profile.',
    owner: 'Buyer Identity Layer',
    icon: CheckCircle2,
    accent: 'from-teal-500/20 to-slate-900/60'
  },
  {
    title: '7. Request context loaded',
    desc: 'Platform maps the secure token to invoice context and permissions.',
    owner: 'Workflow Engine',
    icon: LayoutDashboard,
    accent: 'from-sky-500/20 to-slate-900/60'
  },
  {
    title: '8. Buyer dashboard opens',
    desc: 'Only after validation does the unified buyer dashboard reveal pending invoices.',
    owner: 'Buyer Portal',
    icon: LayoutDashboard,
    accent: 'from-violet-500/20 to-slate-900/60'
  },
  {
    title: '9. eMandate approved',
    desc: 'The buyer authorizes the mandate, enabling automated debit on due dates.',
    owner: 'Buyer / Mandate Service',
    icon: CheckCircle2,
    accent: 'from-emerald-500/20 to-slate-900/60'
  },
  {
    title: '10. Bank processes mandate',
    desc: 'Mandate request is sent to the Bank for payment rail orchestration.',
    owner: 'Bank',
    icon: Landmark,
    accent: 'from-cyan-500/20 to-slate-900/60'
  },
  {
    title: '11. Bank validates mandate',
    desc: 'Bank validation runs and mandate status is returned asynchronously.',
    owner: 'Bank',
    icon: ShieldCheck,
    accent: 'from-slate-500/20 to-slate-900/60'
  },
  {
    title: '12. UMRN created',
    desc: 'The mandate receives a unique reference for lifecycle and audit tracking.',
    owner: 'Bank',
    icon: CheckCircle2,
    accent: 'from-indigo-500/20 to-slate-900/60'
  },
  {
    title: '13. Scheduler waits for due date',
    desc: 'Daily checks evaluate invoice due dates, extension status, disputes, and mandate state.',
    owner: 'Scheduler Service',
    icon: CalendarClock,
    accent: 'from-amber-500/20 to-slate-900/60'
  },
  {
    title: '14. Debit validation runs',
    desc: 'The platform checks balance, duplicate risk, disputes, and active mandate conditions.',
    owner: 'Workflow Engine',
    icon: ShieldCheck,
    accent: 'from-red-500/20 to-slate-900/60'
  },
  {
    title: '15. Debit executes',
    desc: 'Debit request is sent through the Bank payment rails.',
    owner: 'Bank',
    icon: Landmark,
    accent: 'from-emerald-500/20 to-slate-900/60'
  },
  {
    title: '16. Settlement and ERP sync',
    desc: 'UTR is captured, settlement is reconciled, and ERP status is updated back in C-Square.',
    owner: 'Settlement + ERP Sync',
    icon: CheckCircle2,
    accent: 'from-cyan-500/20 to-slate-900/60'
  }
]

const PROBLEM_POINTS = [
  'Invoice creation stops inside ERP and collection becomes manual.',
  'Buyers do not use ERP, so there is no structured payment journey.',
  'Sellers lose visibility into mandate, debit, and settlement status.',
  'Reconciliation and follow-up happen manually, causing delays and errors.'
]

const SOLUTION_POINTS = [
  'A workflow platform bridges ERP sellers and non-ERP buyers.',
  'Secure links, OTP, and identity matching protect invoice visibility.',
  'eMandate and payment orchestration automate due-date debit execution.',
  'ERP sync keeps invoice, UMRN, UTR, and payment status aligned.'
]

const STORYBOARD = [
  { step: '01', title: 'Invoice created', note: 'Seller raises the invoice inside ERP.', detail: 'Invoice ID, amount, due date and buyer reference are captured.', icon: FileClock },
  { step: '02', title: 'Request generated', note: 'Platform creates the secure collection request.', detail: 'A unique request ID links the invoice to the workflow.', icon: Link2 },
  { step: '03', title: 'Invitation sent', note: 'Buyer receives a secure invitation link.', detail: 'SMS, WhatsApp, or email can be used for delivery.', icon: LayoutDashboard },
  { step: '04', title: 'Buyer clicks link', note: 'The journey begins from the secure request.', detail: 'Invoice data stays hidden until authentication completes.', icon: Search },
  { step: '05', title: 'Login / OTP', note: 'Authentication happens before invoice access.', detail: 'OTP verifies the buyer’s registered mobile identity.', icon: ShieldCheck },
  { step: '06', title: 'Identity matched', note: 'Buyer is matched to the request context.', detail: 'The platform confirms the correct buyer and seller mapping.', icon: CheckCircle2 },
  { step: '07', title: 'Dashboard opens', note: 'Pending invoices appear after verification.', detail: 'Only validated invoices are shown in the buyer view.', icon: LayoutDashboard },
  { step: '08', title: 'Mandate approved', note: 'Auto-debit permission is granted by the buyer.', detail: 'The consented mandate becomes ready for future execution.', icon: CheckCircle2 },
  { step: '09', title: 'Bank validates', note: 'Bank validates mandate and returns approval.', detail: 'Bank checks account validity and mandate eligibility.', icon: Landmark },
  { step: '10', title: 'UMRN created', note: 'The mandate gets a unique reference.', detail: 'The mandate reference is stored for audit and tracking.', icon: CheckCircle2 },
  { step: '11', title: 'Scheduler waits', note: 'System waits until invoice due date.', detail: 'Daily jobs check due invoices and active mandate status.', icon: CalendarClock },
  { step: '12', title: 'Debit executes', note: 'Debit is triggered through bank rails.', detail: 'Pre-debit validation ensures the invoice is still eligible.', icon: Landmark },
  { step: '13', title: 'Settlement complete', note: 'Payment is settled and reconciled.', detail: 'UTR is returned and matching begins automatically.', icon: CheckCircle2 },
  { step: '14', title: 'ERP synced', note: 'ERP receives the final updated status.', detail: 'Payment success and settlement info flow back to ERP.', icon: FileClock }
]

function StepCard({ step, index }) {
  const Icon = step.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: index * 0.03 }}
      className={`relative overflow-hidden rounded-[18px] sm:rounded-[24px] border border-white/10 bg-gradient-to-br ${step.accent} shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl`}
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 via-indigo-400 to-transparent opacity-70" />
      <div className="p-4 sm:p-5 md:p-6 flex gap-3 sm:gap-4 md:gap-5 items-start">
        <div className="shrink-0 w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-slate-950/40 border border-white/10 flex items-center justify-center text-cyan-200 shadow-lg shadow-cyan-500/10">
          <Icon size={20} className="sm:hidden" />
          <Icon size={24} className="hidden sm:block" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
            <span className="inline-flex items-center justify-center min-w-9 h-9 px-3 rounded-full bg-white/8 text-white border border-white/10 text-sm font-semibold">
              {step.title.split('.')[0]}
            </span>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white leading-snug">{step.title.replace(/^\d+\.\s*/, '')}</h3>
            <span className="text-[10px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.22em] uppercase px-2.5 py-1 rounded-full bg-white/8 text-slate-300 border border-white/10">{step.owner}</span>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-6 max-w-3xl">{step.desc}</p>
        </div>
      </div>
    </motion.div>
  )
}

function InfoBlock({ title, points, tone }) {
  return (
    <div className={`rounded-[24px] sm:rounded-[28px] border border-white/10 backdrop-blur-xl p-5 sm:p-6 md:p-7 ${tone}`}>
      <h4 className="text-base sm:text-lg font-semibold text-white mb-4">{title}</h4>
      <div className="space-y-3">
        {points.map((bullet) => (
          <div key={bullet} className="flex items-start gap-3 text-slate-300 text-sm leading-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>{bullet}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ArrowLine() {
  return (
    <div className="flex justify-center py-3 sm:py-5">
      <div className="flex flex-col items-center text-slate-500">
        <ArrowDown size={16} className="sm:hidden" />
        <ArrowDown size={18} className="hidden sm:block" />
        <div className="w-px h-7 sm:h-10 bg-gradient-to-b from-slate-500 to-transparent mt-1" />
      </div>
    </div>
  )
}

function StoryboardCard({ item, index }) {
  const Icon = item.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className="group relative overflow-hidden rounded-[20px] sm:rounded-[26px] border border-white/10 bg-[#10182f]/80 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.35)] hover:shadow-[0_24px_80px_rgba(0,150,255,0.15)] transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-indigo-500/10 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative p-5 sm:p-6 md:p-7">
        <div className="flex items-start justify-between gap-3 mb-4 sm:mb-5">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="inline-flex h-7 sm:h-8 min-w-7 sm:min-w-8 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-bold text-cyan-200 border border-cyan-400/30">
              {item.step}
            </span>
            <h3 className="text-base sm:text-lg font-semibold text-white">{item.title}</h3>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-2 sm:px-3 py-1 text-[9px] sm:text-[10px] text-slate-400 whitespace-nowrap">Video frame</span>
        </div>

        {/* Icon */}
        <div className="flex justify-center py-3 sm:py-4 mb-4">
          <div className="relative flex h-16 sm:h-20 w-16 sm:w-20 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[0_0_0_8px_rgba(34,211,238,0.04)]">
            <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-xl group-hover:blur-2xl transition-all" />
            <Icon size={32} className="relative text-cyan-300 sm:hidden" />
            <Icon size={40} className="relative hidden sm:block text-cyan-300" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2 sm:space-y-2.5">
          <p className="text-sm sm:text-base text-slate-200 leading-6 font-medium">{item.note}</p>
          <p className="text-[12px] sm:text-sm text-slate-400 leading-5">{item.detail}</p>
        </div>
      </div>
    </motion.div>
  )
}

function StoryboardRoute() {
  return (
    <div className="relative">
      {/* Center connecting thread - vertical line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/40 via-indigo-400/20 to-cyan-400/40" />

      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12">
        {STORYBOARD.map((item, index) => {
          const isEven = index % 2 === 0
          return (
            <motion.div
              key={item.step + item.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`relative flex items-center group ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
            >
              {/* Horizontal connector to center line */}
              <div className={`hidden lg:block absolute left-1/2 top-1/2 -translate-y-1/2 h-px ${isEven ? 'right-1/2 mr-px' : 'left-1/2 ml-px'} w-12 bg-gradient-to-r ${isEven ? 'from-cyan-400/40 to-transparent' : 'from-transparent to-cyan-400/40'}`} />

              {/* Connecting dot on center line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border-2 border-cyan-400/60 bg-slate-950 z-10 shadow-lg shadow-cyan-400/20" />

              {/* Card container - alternating left/right on desktop, centered on mobile */}
              <div className={`w-full lg:w-[calc(50%-2rem)] ${isEven ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'} px-0`}>
                <StoryboardCard item={item} index={index} />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default function FlowPresentation() {
  return (
    <main className="min-h-screen bg-[#0B1120] text-white overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute top-[22rem] right-[-8rem] h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-[-8rem] h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-12 sm:pt-16 md:pt-20 pb-8 md:pb-14">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 sm:px-4 py-2 text-[10px] sm:text-xs md:text-sm tracking-[0.18em] sm:tracking-[0.24em] uppercase text-cyan-200">
              Stakeholder Presentation • End-to-End Workflow
            </span>
            <h1 className="mt-5 sm:mt-6 text-3xl sm:text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight text-white max-w-4xl">
              C-Square × GIROPie Non-ERP Buyer Collection Flow
            </h1>
            <p className="mt-4 sm:mt-5 max-w-3xl text-sm sm:text-base md:text-xl text-slate-300 leading-7 sm:leading-8">
              A clear, start-to-end architecture flow for tomorrow’s meeting. This is not a product website. It is a premium visual explanation of secure invoice collection, eMandate orchestration, payment execution, and ERP synchronization.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 md:grid-cols-2">
            <InfoBlock
              title="Problem Statement"
              points={PROBLEM_POINTS}
              tone="bg-white/5"
            />
            <InfoBlock
              title="Solution We Provide"
              points={SOLUTION_POINTS}
              tone="bg-gradient-to-br from-cyan-500/10 to-indigo-500/10"
            />
          </div>
        </section>

        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 md:px-10 pb-14 md:pb-24">
          <div className="rounded-[28px] sm:rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_40px_100px_rgba(0,0,0,0.45)] p-4 sm:p-6 md:p-10">
              <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">Diagrammatic Flow</h2>
                <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl leading-6 sm:leading-7">A visual flow diagram from invoice creation to settlement, using generic Bank language only.</p>
              </div>
            </div>

            <div className="space-y-2 md:space-y-3">
              {STAGES.map((step, index) => (
                <React.Fragment key={step.title}>
                  <StepCard step={step} index={index} />
                  {index < STAGES.length - 1 && <ArrowLine />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pb-16 md:pb-24">
          <div className="mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">Animated End-to-End Storyboard</h2>
            <p className="mt-3 sm:mt-4 max-w-3xl text-sm sm:text-base text-slate-400 leading-6 sm:leading-7">
              A video-style sequence of visual frames that plays like a boardroom animation, showing the flow from invoice creation to ERP sync.
            </p>
          </div>

          <StoryboardRoute />
        </section>

      </div>
    </main>
  )
}
