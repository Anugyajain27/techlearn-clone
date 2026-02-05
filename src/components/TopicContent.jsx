import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TopicContent({ topic, topics = [], onNavigate }) {
  if (!topic || topics.length === 0) return null;

  const currentIndex = topics.findIndex(t => t.id === topic.id);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < topics.length - 1;

  return (
    <article className="content-article">
      <div className="article-header">
        <div className="article-meta">
          <span className="article-meta-item">
            {currentIndex + 1} of {topics.length}
          </span>
          <span className="article-meta-dot">•</span>
          <span className="article-meta-item">{topic.duration}</span>
        </div>
        <h1 className="article-title">{topic.title}</h1>
      </div>

      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: topic.content }}
      />

      <div className="navigation-buttons">
        {hasPrevious && (
          <button
            className="nav-button"
            onClick={() => onNavigate(topics[currentIndex - 1])}
          >
            <ChevronLeft size={20} />
            Previous Topic
          </button>
        )}

        {hasNext && (
          <button
            className="nav-button nav-button-next"
            onClick={() => onNavigate(topics[currentIndex + 1])}
          >
            Next Topic
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </article>
  );
}
