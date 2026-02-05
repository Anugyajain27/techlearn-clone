import {
  Search,
  CheckCircle2,
  Circle,
  BookOpen,
  ExternalLink
} from "lucide-react";

export default function Sidebar({
  topics,
  activeId,
  onSelect,
  searchQuery,
  onSearchChange
}) {
  const completedCount = topics.filter(t => t.completed).length;
  const progressPercentage =
    topics.length > 0 ? (completedCount / topics.length) * 100 : 0;

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTopicNumber = (id) =>
    topics.findIndex(t => t.id === id) + 1;

  return (
    <aside className="sidebar">
      {/* Course Info */}
      <div className="sidebar-section course-info">
        <BookOpen size={32} className="course-icon" />
        <h1 className="course-title">React Fundamentals</h1>
        <p className="course-description">
          Master the core concepts of React and build modern web applications
        </p>
      </div>

      {/* Progress */}
      <div className="sidebar-section progress-section">
        <div className="progress-header">
          <span className="progress-label">Course Progress</span>
          <span className="progress-percentage">
            {Math.round(progressPercentage)}%
          </span>
        </div>

        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <p className="progress-stats">
          {completedCount} of {topics.length} topics completed
        </p>
      </div>

      {/* Search */}
      <div className="sidebar-section search-section">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Topics */}
      <div className="sidebar-section topics-section">
        <div className="sidebar-section-title">Course Content</div>
        <ul className="topics-list">
          {filteredTopics.map(topic => (
            <li
              key={topic.id}
              className={`topic-item ${
                activeId === topic.id ? "active" : ""
              }`}
              onClick={() => onSelect(topic)}
            >
              <div className="topic-icon">
                {topic.completed ? (
                  <CheckCircle2 size={20} className="icon-completed" />
                ) : (
                  <Circle size={20} className="icon-incomplete" />
                )}
              </div>

              <div className="topic-content">
                <div className="topic-number">
                  Topic {getTopicNumber(topic.id)}
                </div>
                <div className="topic-title">{topic.title}</div>
                <div className="topic-duration">{topic.duration}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Resources */}
      <div className="sidebar-section resources-section">
        <div className="sidebar-section-title">Resources</div>

        <a
          href="https://react.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="resource-link"
        >
          Official React Docs
          <ExternalLink size={14} />
        </a>

        <a
          href="https://react.dev/learn"
          target="_blank"
          rel="noopener noreferrer"
          className="resource-link"
        >
          React Tutorial
          <ExternalLink size={14} />
        </a>
      </div>
    </aside>
  );
}
