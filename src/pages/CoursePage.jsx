import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import TopicContent from "../components/TopicContent";

/* ---------- MOCK DATA ---------- */
const MOCK_TOPICS = [
  {
    id: "intro",
    title: "Introduction to React",
    duration: "15 min",
    completed: true,
    content: "<h2>Welcome to React</h2><p>React is a UI library...</p>"
  },
  {
    id: "components",
    title: "Understanding Components",
    duration: "20 min",
    completed: true,
    content: "<h2>Components</h2><p>Components are building blocks...</p>"
  },
  {
    id: "jsx",
    title: "JSX Syntax",
    duration: "18 min",
    completed: false,
    content: "<h2>JSX</h2><p>JSX lets you write HTML in JS...</p>"
  }
];

export default function CoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  const [activeTopic, setActiveTopic] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTopics(MOCK_TOPICS);
      const selected =
        MOCK_TOPICS.find(t => t.id === id) || MOCK_TOPICS[0];
      setActiveTopic(selected);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleTopicSelect = (topic) => {
    setActiveTopic(topic);
    navigate(`/topics/${topic.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p className="loading-text">Loading course...</p>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <div className={`sidebar-wrapper ${sidebarOpen ? "open" : "closed"}`}>
        <Sidebar
          topics={topics}
          activeId={activeTopic?.id}
          onSelect={handleTopicSelect}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      <main className="content-area">
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          {sidebarOpen ? "Hide Topics" : "Show Topics"}
        </button>

        <TopicContent
          topic={activeTopic}
          topics={topics}
          onNavigate={handleTopicSelect}
        />
      </main>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
