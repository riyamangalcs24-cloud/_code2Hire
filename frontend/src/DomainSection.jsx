import { useState } from 'react'

function DomainCard({ category, domainId, isExpanded, onToggle }) {
  return (
    <div className={`cs-topic-card ${isExpanded ? 'expanded' : ''}`} id={`${domainId}-${category.id}`}>
      <div className="cs-card-header" onClick={onToggle}>
        <div className={`cs-card-icon ${category.colorClass}`}>
          <i className={category.icon}></i>
        </div>
        <div className="cs-card-title-area">
          <h3>{category.title}</h3>
          {category.subtitle && <span className="cs-subtitle">{category.subtitle}</span>}
          {category.badge && <span className="cs-badge-important">{category.badge}</span>}
        </div>
        <div className="cs-card-meta">
          <span className="cs-topic-count">{category.topics.length} topics</span>
          <i className={`fa-solid fa-chevron-down cs-chevron ${isExpanded ? 'rotated' : ''}`}></i>
        </div>
      </div>

      <div className={`cs-card-body ${isExpanded ? 'show' : ''}`}>
        <ul className="cs-topic-list">
          {category.topics.map((topic, i) => (
            <li key={i} className="cs-topic-item" style={{ animationDelay: `${i * 0.05}s` }}>
              <span className="cs-topic-number">{String(i + 1).padStart(2, '0')}</span>
              <span className="cs-topic-name">{topic}</span>
              <i className="fa-solid fa-arrow-right cs-topic-arrow"></i>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function DomainSection({ domain }) {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <section className="cs-section" id={`domain-${domain.id}`}>
      <div className="cs-section-header">
        <span className="cs-section-badge">
          <i className={domain.icon}></i> {domain.title}
        </span>
        <h2 className="section-title">{domain.subtitle}</h2>
        <p className="cs-section-desc">{domain.desc}</p>
      </div>
      <div className="cs-grid">
        {domain.categories.map((category) => (
          <DomainCard 
            key={category.id} 
            category={category} 
            domainId={domain.id} 
            isExpanded={expandedId === category.id}
            onToggle={() => setExpandedId(expandedId === category.id ? null : category.id)}
          />
        ))}
      </div>
    </section>
  )
}

export default DomainSection
