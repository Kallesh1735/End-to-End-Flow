import React from 'react'
import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'

const BadFlow = () => (
  <div className="p-6 rounded-2xl bg-red-900/20 border border-red-800">
    <div className="flex items-center gap-3 mb-4"><X className="text-red-400"/> <div className="font-semibold">Incorrect Flow</div></div>
    <ol className="text-sm space-y-2 text-red-200">
      <li>Buyer clicks link</li>
      <li>Invoice shown immediately</li>
    </ol>
  </div>
)

const GoodFlow = () => (
  <div className="p-6 rounded-2xl bg-emerald-900/10 border border-emerald-800">
    <div className="flex items-center gap-3 mb-4"><Check className="text-emerald-300"/> <div className="font-semibold">Correct Secure Flow</div></div>
    <ol className="text-sm space-y-2 text-slate-200">
      <li>Buyer clicks secure link</li>
      <li>Login / Signup appears</li>
      <li>OTP verification</li>
      <li>Identity validation / KYC match</li>
      <li>Platform loads request context</li>
      <li>Invoice visibility enabled</li>
    </ol>
  </div>
)

export default function SecurityGate(){
  return (
    <section id="security" className="py-12">
      <h3 className="text-2xl font-semibold mb-6">Security Gate: Invoice Visibility Policy</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{x:-20,opacity:0}} whileInView={{x:0,opacity:1}} className="">
          <BadFlow />
        </motion.div>
        <motion.div initial={{x:20,opacity:0}} whileInView={{x:0,opacity:1}} className="">
          <GoodFlow />
        </motion.div>
      </div>
    </section>
  )
}
