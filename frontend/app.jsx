import { useEffect, useRef, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Roadmap from './components/Roadmap'
import ProgressHeatmap from './components/ProgressHeatmap'
import './App.css'

import { domainsData } from './data/DomainsData'
import DomainSection from './components/DomainSection'

function App() {
  const path = window.location.pathname

  // Render standalone Roadmap page
  if (path === '/roadmap') {
    return (
      <>
        <Navbar />
        <main>
          <Roadmap />
        </main>
      </>
    )
  }

  // Render full application
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {domainsData.map((domain) => (
          <DomainSection key={domain.id} domain={domain} />
        ))}
        <ProgressHeatmap />

      </main>
    </>
  )
}

export default App