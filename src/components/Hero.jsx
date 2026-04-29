import React from 'react'
import { motion } from 'framer-motion'

export default function Hero(){
  return (
    <section id="presentation-landing" className="pt-8 pb-12">
      <div className="grid grid-cols-1 gap-8 items-center">
        <div>
          <motion.h2 initial={{y:12,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.1}} className="text-5xl md:text-6xl font-extrabold leading-tight">C-Square × GIROPie Collection Workflow</motion.h2>
          <motion.p initial={{y:8,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.2}} className="mt-4 text-slate-300 max-w-3xl text-lg">A presentation-led architecture demo — illustrating secure, identity-first eMandate orchestration that protects invoice visibility until buyer identity is validated.</motion.p>
          <div className="mt-8">
            <a href="#ecosystem" className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-emerald-500 shadow-lg text-white">Start Presentation</a>
          </div>
        </div>

        <motion.div initial={{opacity:0}} whileInView={{opacity:1}} transition={{delay:0.25}} className="relative mt-6 p-8 glass rounded-3xl">
          <svg viewBox="0 0 900 260" className="w-full h-64">
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.75"/>
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.6"/>
              </linearGradient>
            </defs>
            <g fill="none" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round">
              <path d="M40 200 C160 60, 320 200, 460 100 S740 20, 860 80" opacity="0.95"/>
              <circle cx="460" cy="100" r="6" fill="#7c3aed" />
            </g>
          </svg>
          <div className="absolute right-6 bottom-6 text-sm text-slate-300">Animated architecture flow • Identity-first</div>
        </motion.div>
      </div>
    </section>
  )
}
