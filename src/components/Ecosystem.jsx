import React from 'react'
import { ArrowDown } from 'lucide-react'

const nodes = [
  'Seller','C-Square ERP','Collection Platform','Buyer Authentication Layer','Buyer Dashboard','Bank','Settlement','ERP Sync'
]

export default function Ecosystem(){
  return (
    <section id="ecosystem" className="py-10">
      <h3 className="text-2xl font-semibold mb-6">Ecosystem Architecture</h3>
      <div className="flex flex-col items-center gap-6">
        {nodes.map((n,i)=> (
          <div key={n} className="flex items-center gap-6 w-full max-w-3xl">
            <div className="glass rounded-2xl p-4 flex-1">
              <div className="text-sm text-slate-300">{n}</div>
            </div>
            {i < nodes.length-1 && <ArrowDown className="text-slate-500" />}
          </div>
        ))}
      </div>
    </section>
  )
}
