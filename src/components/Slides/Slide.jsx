import React from 'react'
import { motion } from 'framer-motion'

export default function Slide({slide}){
  return (
    <motion.section initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} viewport={{once:true}} className="min-h-[60vh] py-12">
      <div className="glass p-8 rounded-3xl max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
        {slide.subtitle && <div className="text-slate-300 mb-4">{slide.subtitle}</div>}
        {slide.text && <div className="text-slate-300 mb-4">{slide.text}</div>}
        {slide.bullets && (
          <ul className="list-disc ml-6 text-slate-300 space-y-2">
            {slide.bullets.map(b=> <li key={b}>{b}</li>)}
          </ul>
        )}
        {slide.diagram && (
          <div className="mt-6 space-y-2">
            {slide.diagram.map((d,i)=> (
              <div key={d} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-indigo-700 rounded-full flex items-center justify-center text-white">{i+1}</div>
                <div className="text-slate-200">{d}</div>
              </div>
            ))}
          </div>
        )}
        {slide.compare && (
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-lg bg-red-900/10 border border-red-800">
              <div className="font-semibold text-red-300 mb-2">Incorrect Flow</div>
              <ol className="text-red-200 list-decimal ml-6">
                {slide.compare.bad.map(b=> <li key={b}>{b}</li>)}
              </ol>
            </div>
            <div className="p-4 rounded-lg bg-emerald-900/8 border border-emerald-800">
              <div className="font-semibold text-emerald-300 mb-2">Correct Flow</div>
              <ol className="text-slate-200 list-decimal ml-6">
                {slide.compare.good.map(b=> <li key={b}>{b}</li>)}
              </ol>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  )
}
