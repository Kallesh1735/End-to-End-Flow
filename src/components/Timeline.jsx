import React from 'react'
import { motion } from 'framer-motion'
import { TIMELINE } from '../data/flow'
import * as Icons from 'lucide-react'

const Item = ({it,idx})=>{
  const Icon = Icons[it.icon.charAt(0).toUpperCase() + it.icon.slice(1)] || Icons.FileText
  return (
    <motion.div
      initial={{opacity:0, y:16}}
      whileInView={{opacity:1, y:0}}
      viewport={{once:true}}
      transition={{delay: idx*0.04}}
      className="glass p-4 rounded-2xl mb-6 hover:scale-[1.02] transition-shadow"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center text-indigo-300">
          <Icon size={20} />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h4 className="font-semibold">{it.title}</h4>
            <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300">{it.owner}</span>
          </div>
          <p className="text-sm text-slate-300 mt-1">{it.desc}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Timeline(){
  return (
    <section id="timeline" className="py-10">
      <h3 className="text-2xl font-semibold mb-6">Animated Timeline — Presentation Mode</h3>
      <p className="text-slate-300 mb-6">An animated step-by-step storytelling of the end-to-end collection workflow. Each step appears sequentially as you scroll.</p>
      <div className="space-y-6">
        {TIMELINE.map((t,idx)=> (
          <motion.div key={t.id} initial={{opacity:0, scale:0.98}} whileInView={{opacity:1, scale:1}} viewport={{once:true}} transition={{delay: idx*0.05}} className="glass rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-indigo-700 to-emerald-600 flex items-center justify-center text-white text-lg">{idx+1}</div>
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold text-lg">{t.title}</h4>
                  <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300">{t.owner}</span>
                </div>
                <p className="text-slate-300 mt-2">{t.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
