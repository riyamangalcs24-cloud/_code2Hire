import TopicCard from './TopicCard'

const topics = [
  {
    id: 'card-dsa',
    iconClass: 'fa-solid fa-network-wired',
    colorClass: 'algorithms',
    title: 'Data Structures',
    description: 'Arrays, Trees, Graphs, and Dynamic Programming.',
    progress: 45,
  },
  {
    id: 'card-system-design',
    iconClass: 'fa-solid fa-server',
    colorClass: 'system-design',
    title: 'System Design',
    description: 'Scalability, Microservices, and Databases.',
    progress: 12,
  },
  {
    id: 'card-behavioral',
    iconClass: 'fa-solid fa-users',
    colorClass: 'behavioral',
    title: 'Behavioral',
    description: 'Leadership principles and STAR method.',
    progress: 80,
  },
  {
    id: 'card-web',
    iconClass: 'fa-brands fa-react',
    colorClass: 'web-tech',
    title: 'Web Technologies',
    description: 'React, Node.js, HTML/CSS, and Browser Internals.',
    progress: 0,
  },
]

function TopicsGrid() {
  return (
    <section className="topics-section" id="topics">
      <h2 className="section-title">Explore Domains</h2>
      <div className="topics-grid">
        {topics.map((topic, index) => (
          <TopicCard key={topic.id} {...topic} delay={index * 0.1} />
        ))}
      </div>
    </section>
  )
}

export default TopicsGrid
