import React from 'react'
import { motion } from 'framer-motion'

const LAYERS = [
  'ERP Layer','Identity Layer','Workflow Engine','Mandate Service','Payment Engine','ERP Sync Layer'
]

export default function Architecture(){
  return (
    <section id="architecture" className="py-10">
      <h3 className="text-2xl font-semibold mb-6">Architecture Layers</h3>
      <div className="space-y-4">
        {LAYERS.map((l,i)=> (
          <motion.div key={l} initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-300">Layer {i+1}</div>
                <div className="font-semibold text-lg">{l}</div>
              </div>
              <div className="text-slate-400 text-sm">Secure • Auditable • Scalable</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
