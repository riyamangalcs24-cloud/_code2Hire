import { useEffect, useRef, useState } from 'react'

const roadmap15DayData = [
  { day: 1, title: 'Revise basic concepts', desc: 'Fundamentals and definitions of your branch.' },
  { day: 2, title: 'Study Core Subject 1', desc: 'Important topics and formulas.' },
  { day: 3, title: 'Practice Problems', desc: 'Solve scenarios related to Core Subject 1.' },
  { day: 4, title: 'Study Core Subject 2', desc: 'Deep dive into the second main subject.' },
  { day: 5, title: 'Practice Problems', desc: 'Solve scenarios related to Core Subject 2.' },
  { day: 6, title: 'Study Core Subject 3', desc: '(If applicable to your branch)' },
  { day: 7, title: 'Revision & Mock Test', desc: 'Revise all 3 subjects and take one mock test.' },
  { day: 8, title: 'Project Explanation', desc: 'Prepare a clear 2–3 minute explanation of your projects.' },
  { day: 9, title: 'Real-world Applications', desc: 'Study practical applications of your branch.' },
  { day: 10, title: 'Technical Questions', desc: 'Practice technical interview questions (why/how based).' },
  { day: 11, title: 'HR Preparation', desc: 'Tell me about yourself, Strengths & weaknesses, Why you?' },
  { day: 12, title: 'Aptitude & Reasoning', desc: 'Practice logical and quantitative aptitude.' },
  { day: 13, title: 'Full Mock Interview', desc: 'Take a comprehensive mock (technical + HR).' },
  { day: 14, title: 'Weak Areas', desc: 'Revise weak areas and important formulas.' },
  { day: 15, title: 'Relax & Rebuild', desc: 'Light revision, confidence building, and rest.' },
]

const roadmap30DayData = [
  // Week 1
  { day: 1, title: 'Revise basic concepts', desc: 'Fundamentals and definitions' },
  { day: 2, title: 'Core Subject 1', desc: 'Important topics' },
  { day: 3, title: 'Practice problems', desc: 'Subject 1' },
  { day: 4, title: 'Core Subject 2', desc: 'Important topics' },
  { day: 5, title: 'Practice problems', desc: 'Subject 2' },
  { day: 6, title: 'Core Subject 3', desc: 'Basics' },
  { day: 7, title: 'Full revision', desc: '1 mock test' },
  // Week 2
  { day: 8, title: 'Advanced topics', desc: 'Subject 1' },
  { day: 9, title: 'Advanced topics', desc: 'Subject 2' },
  { day: 10, title: 'Numerical/Coding practice', desc: 'Deep dive focus' },
  { day: 11, title: 'Practical/Real-world', desc: 'Applications of concepts' },
  { day: 12, title: 'Interview questions', desc: 'Frequently asked concepts' },
  { day: 13, title: 'Solve previous questions', desc: 'Company exact questions' },
  { day: 14, title: 'Mock technical interview', desc: 'Self-evaluate' },
  // Week 3
  { day: 15, title: 'Prepare project explanation', desc: 'Summarize work precisely' },
  { day: 16, title: 'Prepare diagrams', desc: 'Tools, components, architecture' },
  { day: 17, title: 'Practice explaining', desc: 'Project confidently' },
  { day: 18, title: 'Aptitude practice', desc: 'Quant basics' },
  { day: 19, title: 'Logical reasoning', desc: 'Problem solving skills' },
  { day: 20, title: 'HR question preparation', desc: 'Behavioral scenarios' },
  { day: 21, title: 'Full mock', desc: 'Technical + HR' },
  // Week 4
  { day: 22, title: 'Revise weak areas', desc: 'Focus heavily on struggling topics' },
  { day: 23, title: 'Core formula revision', desc: 'Review sheets' },
  { day: 24, title: 'Rapid-fire questions', desc: 'Fast problem solving' },
  { day: 25, title: 'Company research', desc: 'Profile and alignment' },
  { day: 26, title: 'Improve communication', desc: 'Articulation skills' },
  { day: 27, title: 'Mock interview', desc: 'With friend/mentor' },
  { day: 28, title: 'Revise important concepts', desc: 'Final sweeps' },
  { day: 29, title: 'Light revision', desc: 'Confidence building' },
  { day: 30, title: 'Relax', desc: 'Review notes, stay confident.' }
]

function Roadmap() {
  const containerRef = useRef(null)
  const [activePlan, setActivePlan] = useState(15)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
          }
        })
      },
      { threshold: 0.2 }
    )

    const items = containerRef.current?.querySelectorAll('.timeline-item') || []
    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [activePlan])

  const activeData = activePlan === 15 ? roadmap15DayData : roadmap30DayData;

  return (
    <section className="roadmap-section" id="roadmap">
      <div className="cs-section-header" style={{ position: 'relative' }}>
        <a 
          href="/" 
          style={{ 
            position: 'absolute', 
            left: '20px', 
            top: '0', 
            textDecoration: 'none', 
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.9rem',
            padding: '8px 12px',
            background: 'var(--bg-card)',
            borderRadius: '8px',
            border: '1px solid var(--border-card)'
          }}
        >
          <i className="fa-solid fa-arrow-left"></i> Back
        </a>
        <span className="cs-section-badge">
          <i className="fa-solid fa-map-location-dot"></i> Master Plan
        </span>
        <h2 className="section-title">Interview Preparation Roadmap</h2>
        <p className="cs-section-desc">
          Your step-by-step strategic plan to ace any technical and HR interview.
        </p>

        <div className="roadmap-tabs" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
          <button 
            className={`btn-primary-sm ${activePlan === 15 ? 'active' : ''}`}
            onClick={() => setActivePlan(15)}
            style={{ opacity: activePlan === 15 ? 1 : 0.5, transition: 'all 0.3s ease' }}
          >
            15-Day Plan
          </button>
          <button 
            className={`btn-primary-sm ${activePlan === 30 ? 'active' : ''}`}
            onClick={() => setActivePlan(30)}
            style={{ opacity: activePlan === 30 ? 1 : 0.5, transition: 'all 0.3s ease' }}
          >
            30-Day Plan
          </button>
        </div>
      </div>

      <div className="timeline-container" ref={containerRef}>
        <div className="timeline-line"></div>
        {activeData.map((item, index) => (
          <div className="timeline-item" key={item.day}>
            <div className="timeline-dot"></div>
            <div className={`timeline-content ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="day-badge">Day {item.day}</div>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Roadmap
