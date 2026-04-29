import React from 'react'

const BENEFITS = [
  'Faster Collection','Reduced Manual Work','Automated Payments','ERP Expansion','Better Visibility','Buyer Flexibility'
]

export default function Benefits(){
  return (
    <section id="benefits" className="py-10">
      <h3 className="text-2xl font-semibold mb-6">Final Benefits</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {BENEFITS.map(b=> (
          <div key={b} className="glass p-5 rounded-xl">
            <div className="font-semibold">{b}</div>
            <div className="text-slate-300 text-sm mt-2">{getCopy(b)}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function getCopy(b){
  const map = {
    'Faster Collection':'Accelerated time-to-cash with scheduled automated debits.',
    'Reduced Manual Work':'Significant reduction in reconciliation and collection ops.',
    'Automated Payments':'Reliable payments via eMandate and Bank orchestration.',
    'ERP Expansion':'Enable non-ERP buyers without compromising seller systems.',
    'Better Visibility':'UTR/UMRN mapping for audit-ready reconciliations.',
    'Buyer Flexibility':'Multiple payment options and consented recurring debits.'
  }
  return map[b]
}
