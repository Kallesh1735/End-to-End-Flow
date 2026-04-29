import React from 'react'
import Home from './pages/Home'
import Nav from './components/Nav'

export default function App(){
  return (
    <div className="min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <Nav />
        <main className="pt-8">
          <Home />
        </main>
      </div>
    </div>
  )
}
