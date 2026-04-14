import RippleButton from './RippleButton'

function Hero() {
  return (
    <header className="hero" id="hero-section">
      <h1>
        Ace Your Next <span className="gradient-text">Tech Interview</span>
      </h1>
      <p>
        Master Data Structures, System Design, and Behavioral topics with
        curated paths.
      </p>
      <div className="hero-actions">
        <RippleButton 
          className="btn-primary" 
          id="start-practicing-btn"
          onClick={() => document.getElementById('domain-cs')?.scrollIntoView()}
        >
          Start Practicing
        </RippleButton>
        <RippleButton 
          className="btn-secondary" 
          id="view-roadmap-btn"
          onClick={() => window.open('/roadmap', '_blank')}
        >
          View Roadmap
        </RippleButton>
      </div>
    </header>
  )
}

export default Hero
