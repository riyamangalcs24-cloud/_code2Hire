import { useState, useEffect, useCallback } from 'react'

function ProgressHeatmap() {
  const [activityData, setActivityData] = useState([])
  const [totalProblems, setTotalProblems] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)

  // Initialize data on mount
  useEffect(() => {
    const data = []
    let total = 0
    let current = 0
    let max = 0
    let ongoingStreak = 0

    // Load last 365 days
    for (let i = 364; i >= 0; i--) {
      const dateObj = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      const dateKey = dateObj.toLocaleDateString('en-CA') // YYYY-MM-DD
      
      const storedLevel = localStorage.getItem(`prepmaster_heatmap_${dateKey}`)
      const level = storedLevel ? parseInt(storedLevel, 10) : 0
      
      data.push({ date: dateKey, displayDate: dateObj.toLocaleDateString(), level })
      
      total += level

      if (level > 0) {
        ongoingStreak++
        if (ongoingStreak > max) max = ongoingStreak
      } else {
        ongoingStreak = 0
      }
      
      // If we are at the most recent days, track current streak
      if (i === 0 && level > 0) current = ongoingStreak
      else if (i === 0 && level === 0 && ongoingStreak === 0) {
        // If today is 0, check yesterday
        if (data.length > 1 && data[data.length - 2].level > 0) {
           // We'll approximate current streak if today is just missed
           // For simplicity, we just use ongoingStreak calculation
        }
      }
    }

    // A more accurate current streak calculation reading backwards from today
    let actCurrentStreak = 0
    for(let i = data.length - 1; i >= 0; i--) {
       if (data[i].level > 0) {
          actCurrentStreak++
       } else if (i === data.length - 1) {
          // If strictly today is 0, it's fine, we see if yesterday was active
          continue
       } else {
          break
       }
    }

    setActivityData(data)
    setTotalProblems(total)
    setCurrentStreak(actCurrentStreak)
    setMaxStreak(max)
    
    // Dispatch event to update navbar streak
    window.dispatchEvent(new Event('prep_streak_updated'))
  }, [])

  const handleCellClick = (dateKey, currentLevel, index) => {
    // Cycle level: 0 -> 1 -> 2 -> 3 -> 4 -> 0
    const newLevel = currentLevel === 4 ? 0 : currentLevel + 1
    
    // Save to LocalStorage
    localStorage.setItem(`prepmaster_heatmap_${dateKey}`, newLevel)

    // Update State Optimistically
    const newData = [...activityData]
    newData[index].level = newLevel
    setActivityData(newData)

    // Recalculate Stats locally to avoid expensive full re-render loop
    let newTotal = 0
    let newMax = 0
    let ongoingStreak = 0
    
    newData.forEach(day => {
      newTotal += day.level
      if (day.level > 0) {
        ongoingStreak++
        if (ongoingStreak > newMax) newMax = ongoingStreak
      } else {
        ongoingStreak = 0
      }
    })

    let actCurrentStreak = 0
    for(let i = newData.length - 1; i >= 0; i--) {
       if (newData[i].level > 0) {
          actCurrentStreak++
       } else if (i === newData.length - 1) {
          continue
       } else {
          break
       }
    }

    setTotalProblems(newTotal)
    setCurrentStreak(actCurrentStreak)
    setMaxStreak(newMax)
    
    // Dispatch event to update navbar streak globally
    window.dispatchEvent(new Event('prep_streak_updated'))
  }

  const monthLabels = []
  let currentMonth = -1
  for (let i = 0; i < activityData.length; i += 7) {
    const colIndex = i / 7
    const firstDayOfWeek = activityData[i]
    if (firstDayOfWeek) {
      // Create a localized date obj, avoiding tz shift issues
      const [year, monthStr, day] = firstDayOfWeek.date.split('-')
      const dateObj = new Date(year, parseInt(monthStr, 10) - 1, day)
      const month = dateObj.getMonth()
      if (month !== currentMonth) {
        monthLabels.push({ text: dateObj.toLocaleString('default', { month: 'short' }), col: colIndex })
        currentMonth = month
      }
    }
  }

  return (
    <section className="heatmap-section" id="progress">
      <div className="cs-section-header">
        <span className="cs-section-badge">
          <i className="fa-solid fa-fire-flame-curved"></i> Daily Grind
        </span>
        <h2 className="section-title">Your Progress Activity</h2>
        <p className="cs-section-desc">
          Click any box below to log today's practice and build your streak!
        </p>
      </div>

      <div className="heatmap-container">
        <div className="heatmap-stats">
          <div className="stat-card">
            <span className="stat-value">{totalProblems}</span>
            <span className="stat-label">Total Solved</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">
              <i className="fa-solid fa-fire text-orange"></i> {currentStreak}
            </span>
            <span className="stat-label">Current Streak</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">
              <i className="fa-solid fa-crown text-gold"></i> {maxStreak}
            </span>
            <span className="stat-label">Best Streak</span>
          </div>
        </div>

        <div className="heatmap-grid-scroll">
          <div className="heatmap-grid-wrapper">
            <div className="heatmap-months" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.ceil(activityData.length / 7)}, 14px)`, gap: '4px', marginBottom: '8px', width: '100%', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {Array.from({ length: Math.ceil(activityData.length / 7) }).map((_, i) => {
                const label = monthLabels.find(m => m.col === i)
                return (
                  <div key={i} style={{ gridColumn: `${i + 1} / span 1`, overflow: 'visible', whiteSpace: 'nowrap' }}>
                    {label ? label.text : ''}
                  </div>
                )
              })}
            </div>
            <div className="heatmap-grid">
              {activityData.map((day, idx) => (
                <div 
                  key={idx} 
                  className={`heatmap-cell level-${day.level}`} 
                  title={`${day.displayDate}: Level ${day.level} Activity. Click to update!`}
                  onClick={() => handleCellClick(day.date, day.level, idx)}
                ></div>
              ))}
            </div>
            
            <div className="heatmap-legend">
              <span>Less</span>
              <div className="heatmap-cell level-0" style={{cursor: 'default'}}></div>
              <div className="heatmap-cell level-1" style={{cursor: 'default'}}></div>
              <div className="heatmap-cell level-2" style={{cursor: 'default'}}></div>
              <div className="heatmap-cell level-3" style={{cursor: 'default'}}></div>
              <div className="heatmap-cell level-4" style={{cursor: 'default'}}></div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProgressHeatmap
