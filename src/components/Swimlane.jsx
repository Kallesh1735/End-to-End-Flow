import React from 'react'
import { LANES, TIMELINE } from '../data/flow'
import { motion } from 'framer-motion'

export default function Swimlane(){
  return (
    <section id="swimlane" className="py-10">
      <h3 className="text-2xl font-semibold mb-6">Swimlane Diagram — Ownership</h3>
      <div className="overflow-x-auto">
        <div className="min-w-[1000px] grid grid-cols-8 gap-4">
          {LANES.map(l=> (
            <div key={l} className="glass rounded-xl p-4">
              <div className="text-sm font-medium mb-3">{l}</div>
              <div className="space-y-2 text-slate-300 text-sm">
                {TIMELINE.filter(t=> t.owner===l).map(s=> (
                  <motion.div key={s.id} whileHover={{scale:1.02}} className="p-2 bg-slate-900/30 rounded">
                    {s.title}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
