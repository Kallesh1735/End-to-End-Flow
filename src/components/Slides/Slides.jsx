import React, {useState, useEffect, useRef} from 'react'
import Slide from './Slide'
import {SLIDES} from '../../data/slides'
import { motion, AnimatePresence } from 'framer-motion'

export default function Slides(){
  const [index, setIndex] = useState(0)
  const timeout = useRef(null)

  useEffect(()=>{
    return ()=> clearTimeout(timeout.current)
  },[])

  function next(){
    setIndex(i=> Math.min(SLIDES.length-1, i+1))
  }
  function prev(){
    setIndex(i=> Math.max(0, i-1))
  }

  return (
    <div id="presentation" className="py-8">
      <div className="flex items-center justify-between max-w-7xl mx-auto mb-6">
        <div className="text-sm text-slate-400">Presentation • Slide {index+1} / {SLIDES.length}</div>
        <div className="flex gap-2">
          <button onClick={prev} className="px-3 py-2 rounded bg-slate-800">Prev</button>
          <button onClick={next} className="px-3 py-2 rounded bg-gradient-to-r from-indigo-600 to-emerald-500 text-white">Next</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div key={SLIDES[index].id} initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} transition={{duration:0.45}}>
            <Slide slide={SLIDES[index]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto mt-6 text-center text-slate-400">
        <small>Use the controls or scroll to navigate presentation slides.</small>
      </div>
    </div>
  )
}
