import React from 'react'
import { motion } from 'framer-motion'

const PRINCIPLES = [
  'Login before invoice access','OTP verification','Buyer identity mapping','Secure request token','Duplicate prevention','Mandate validation'
]

export default function SecurityPrinciples(){
  return (
    <section id="principles" className="py-12">
      <h3 className="text-2xl font-semibold mb-6">Security Principles</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {PRINCIPLES.map((p,idx)=> (
          <motion.div key={p} initial={{opacity:0,y:6}} whileInView={{opacity:1,y:0}} transition={{delay:idx*0.05}} className="glass p-5 rounded-2xl">
            <div className="font-semibold">{p}</div>
            <div className="text-slate-300 text-sm mt-2">{getText(p)}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function getText(p){
  const map = {
    'Login before invoice access':'Ensure the buyer authenticates before any invoice data is presented.',
    'OTP verification':'Verify possession of channels via transient one-time codes.',
    'Buyer identity mapping':'Match legal entity and KYC to the correct buyer profile.',
    'Secure request token':'Single-use tokens map invitation to invoice context securely.',
    'Duplicate prevention':'Idempotency checks prevent duplicate mandates or debits.',
    'Mandate validation':'Third-party Bank verifications ensure mandate integrity.'
  }
  return map[p]
}
