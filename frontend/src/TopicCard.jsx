import { useRef, useEffect } from 'react'

function TopicCard({ id, iconClass, colorClass, title, description, progress, delay }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card || !('IntersectionObserver' in window)) return

    card.style.opacity = 0
    card.style.transform = 'translateY(20px)'
    card.style.transition = `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s, box-shadow 0.3s ease, border-color 0.3s ease`

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1
            entry.target.style.transform = 'translateY(0)'
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(card)

    return () => observer.disconnect()
  }, [delay])

  return (
    <div className="topic-card" id={id} ref={cardRef}>
      <div className={`card-icon ${colorClass}`}>
        <i className={iconClass}></i>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="card-footer">
        <span className="progress-text">{progress}% Completed</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  )
}

export default TopicCard
