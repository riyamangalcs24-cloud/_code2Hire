import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'
import AuthModal from './AuthModal'

const calculateCurrentStreak = () => {
    let actCurrentStreak = 0
    for(let i = 0; i < 365; i++) {
       const dateObj = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
       const dateKey = dateObj.toLocaleDateString('en-CA')
       const storedLevel = localStorage.getItem(`prepmaster_heatmap_${dateKey}`)
       const level = storedLevel ? parseInt(storedLevel, 10) : 0
       
       if (level > 0) {
          actCurrentStreak++
       } else if (i === 0) {
          // If strictly today is 0, it's fine, we see if yesterday was active
          continue
       } else {
          break
       }
    }
    return actCurrentStreak
}

function Navbar() {
  const [activeLink, setActiveLink] = useState('Dashboard')
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [globalStreak, setGlobalStreak] = useState(0)

  useEffect(() => {
    // Initial calculate
    setGlobalStreak(calculateCurrentStreak())

    // Listen for custom event
    const handleStreakUpdate = () => {
      setGlobalStreak(calculateCurrentStreak())
    }
    
    window.addEventListener('prep_streak_updated', handleStreakUpdate)
    return () => window.removeEventListener('prep_streak_updated', handleStreakUpdate)
  }, [])

  const links = ['Dashboard', 'Domains', 'Mock Interviews', 'Progress']

  return (
    <nav className="navbar" id="main-nav">
      <div className="logo">
        <a href="/" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          <i className="fa-solid fa-code"></i><span className="gradient-text" style={{ fontSize: '1.6rem', letterSpacing: '-0.5px' }}>code2hire</span>
        </a>
      </div>
      <ul className="nav-links">
        {links.map((link) => (
          <li key={link} className={link === 'Domains' ? 'has-dropdown' : ''}>
            <a
              href={
                link === 'Dashboard' ? '/' : 
                (link === 'Domains' ? '/#domain-cs' : 
                (link === 'Progress' ? '/#progress' : '#'))
              }
              className={activeLink === link ? 'active' : ''}
              onClick={(e) => {
                if (link !== 'Domains' && link !== 'Dashboard' && link !== 'Progress') e.preventDefault()
                setActiveLink(link)
              }}
            >
              {link}
              {link === 'Domains' && (
                <i className="fa-solid fa-chevron-down nav-dropdown-icon"></i>
              )}
            </a>
            {link === 'Domains' && (
              <ul className="nav-dropdown">
                <li><a href="/#domain-cs" onClick={() => setActiveLink('Domains')}><i className="fa-solid fa-laptop-code" style={{width: '20px', marginRight: '8px', opacity: 0.8}}></i> Computer Science</a></li>
                <li><a href="/#domain-mech" onClick={() => setActiveLink('Domains')}><i className="fa-solid fa-gear" style={{width: '20px', marginRight: '8px', opacity: 0.8}}></i> Mechanical</a></li>
                <li><a href="/#domain-elec" onClick={() => setActiveLink('Domains')}><i className="fa-solid fa-bolt" style={{width: '20px', marginRight: '8px', opacity: 0.8}}></i> Electrical</a></li>
                <li><a href="/#domain-ai" onClick={() => setActiveLink('Domains')}><i className="fa-solid fa-microchip" style={{width: '20px', marginRight: '8px', opacity: 0.8}}></i> AI & ML</a></li>
              </ul>
            )}
          </li>
        ))}
        <li>
          <div className="nav-streak" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f97316', fontWeight: 'bold', fontSize: '1.1rem', backgroundColor: 'rgba(249, 115, 22, 0.1)', padding: '6px 12px', borderRadius: '20px', marginLeft: '10px' }} title="Current Global Streak">
            <i className="fa-solid fa-fire"></i> {globalStreak}
          </div>
        </li>
        <li>
          <ThemeToggle />
        </li>
        <li>
          <button className="btn-primary-sm" id="signin-btn" onClick={() => setIsAuthModalOpen(true)}>
            Sign In
          </button>
        </li>
      </ul>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </nav>
  )
}

export default Navbar
