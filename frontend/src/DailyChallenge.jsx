import RippleButton from './RippleButton'

function DailyChallenge() {
  return (
    <section className="daily-challenge" id="daily-challenge">
      <div className="challenge-content">
        <span className="badge">Problem of the Day</span>
        <h2>Merge k Sorted Lists</h2>
        <p className="difficulty hard">Difficulty: Hard</p>
        <p>
          You are given an array of k linked-lists lists, each linked-list is
          sorted in ascending order. Merge all the linked-lists into one sorted
          linked-list and return it.
        </p>
        <RippleButton className="btn-primary mt-2" id="solve-daily-btn">
          Solve Now
        </RippleButton>
      </div>
      <div className="challenge-stats">
        <div className="stat">
          <span className="stat-value">12,402</span>
          <span className="stat-label">Attempts</span>
        </div>
        <div className="stat">
          <span className="stat-value">42%</span>
          <span className="stat-label">Success Rate</span>
        </div>
      </div>
    </section>
  )
}

export default DailyChallenge
