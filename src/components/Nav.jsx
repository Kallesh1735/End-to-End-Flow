import React from 'react'

const items = [
  {id:'overview',label:'Ecosystem'},
  {id:'timeline',label:'Workflow Timeline'},
  {id:'swimlane',label:'Swimlane'},
  {id:'architecture',label:'Architecture'},
  {id:'journey',label:'Journeys'},
  {id:'benefits',label:'Benefits'}
]

export default function Nav(){
  return (
    <header className="sticky top-4 z-30 py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
            <span className="text-indigo-300 font-bold">GI</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold">C-Square × GIROPie</h1>
            <p className="text-sm text-slate-400">Collection Workflow Presentation</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-4 items-center">
          {items.map(i=> (
            <a key={i.id} href={`#${i.id}`} className="text-sm text-slate-300 hover:text-white transition">{i.label}</a>
          ))}
        </nav>
      </div>
    </header>
  )
}
