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
    title: '10. Easebuzz processes mandate',
    desc: 'Mandate request is sent to Easebuzz for payment rail orchestration.',
    owner: 'Easebuzz',
    icon: Landmark,
    accent: 'from-cyan-500/20 to-slate-900/60'
  },
  {
    title: '11. NPCI validates',
    desc: 'Banking network validation runs and mandate status is returned asynchronously.',
    owner: 'NPCI / Bank',
    icon: ShieldCheck,
    accent: 'from-slate-500/20 to-slate-900/60'
  },
  {
    title: '12. UMRN created',
    desc: 'The mandate receives a unique reference for lifecycle and audit tracking.',
    owner: 'Mandate Service',
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
    desc: 'Debit request is sent through the payment partner to the banking network.',
    owner: 'Payment Service',
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

function StepCard({ step, index }) {
  const Icon = step.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: index * 0.03 }}
      className={`rounded-[22px] sm:rounded-[28px] border border-white/10 bg-gradient-to-br ${step.accent} shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl`}
    >
      <div className="p-4 sm:p-6 md:p-7 flex gap-3 sm:gap-4 md:gap-6 items-start">
        <div className="shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center text-cyan-200 shadow-lg shadow-cyan-500/10">
          <Icon size={20} className="sm:hidden" />
          <Icon size={24} className="hidden sm:block" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white leading-snug">{step.title}</h3>
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
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">Start to End Flowchart</h2>
                <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl leading-6 sm:leading-7">Each block represents one stage in the collection workflow. The sequence is intentionally linear so stakeholders can follow the full chain without seeing a portal UI.</p>
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

      </div>
    </main>
  )
}
