import React from 'react'
import { motion } from 'framer-motion'

export function BuyerJourney(){
  const items = [
    {t:'Buyer onboarding', d:'Seamless signup with KYC and identity recognition.'},
    {t:'Invoice grouping', d:'Consolidated view of pending invoices and auto-match rules.'},
    {t:'Mandate approval', d:'Clear consent capture with audit trail and UMRN mapping.'},
    {t:'Dashboard', d:'Real-time status, upcoming debits, and historical UTRs.'}
  ]
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map(i=> (
        <motion.div key={i.t} whileHover={{scale:1.02}} className="glass p-4 rounded-xl">
          <div className="font-semibold">{i.t}</div>
          <div className="text-slate-300 text-sm mt-1">{i.d}</div>
        </motion.div>
      ))}
    </div>
  )
}

export function SellerJourney(){
  const items = [
    {t:'Invoice creation', d:'Automated push from ERP with validation hooks.'},
    {t:'Payment monitoring', d:'Realtime payment and mandate status in ERP ledger.'},
    {t:'ERP updates', d:'Two-way sync ensuring UMRN and UTR reconciliation.'},
    {t:'UTR visibility', d:'Traceable transaction identifiers for audit and reporting.'}
  ]
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map(i=> (
        <motion.div key={i.t} whileHover={{scale:1.02}} className="glass p-4 rounded-xl">
          <div className="font-semibold">{i.t}</div>
          <div className="text-slate-300 text-sm mt-1">{i.d}</div>
        </motion.div>
      ))}
    </div>
  )
}

export default function Journey(){
  return (
    <section id="journey" className="py-10">
      <h3 className="text-2xl font-semibold mb-6">Buyer & Seller Journeys</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-3">Buyer Journey</h4>
          <BuyerJourney />
        </div>
        <div>
          <h4 className="font-semibold mb-3">Seller Journey</h4>
          <SellerJourney />
        </div>
      </div>
    </section>
  )
}
