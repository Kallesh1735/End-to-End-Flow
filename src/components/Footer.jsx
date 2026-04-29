import React from 'react'

export default function Footer(){
  return (
    <footer className="py-8 text-center text-slate-400">
      <div className="max-w-3xl mx-auto">
        <div className="text-sm">Fintech Workflow Infrastructure Powered by GIROPie Logic</div>
        <div className="text-xs mt-3">© {new Date().getFullYear()} GIROPie — Confidential Presentation</div>
      </div>
    </footer>
  )
}
