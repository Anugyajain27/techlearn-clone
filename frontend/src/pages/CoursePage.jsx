import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import TopicContent from "../components/TopicContent";

const API_URL = import.meta.env.VITE_API_URL;

export default function CoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  const [activeTopic, setActiveTopic] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch(`${API_URL}/api/topics`);
        if (!res.ok) {
          throw new Error("Failed to fetch topics");
        }

        const data = await res.json();
        setTopics(data);

        const selected =
          data.find((t) => t.id === id) || data[0];

        setActiveTopic(selected);
      } catch (error) {
        console.error("Error loading topics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
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

  if (!activeTopic) {
    return <p style={{ padding: "2rem" }}>No topic found.</p>;
  }

  return (
    <div className="app-layout">
      <div className={`sidebar-wrapper ${sidebarOpen ? "open" : "closed"}`}>
        <Sidebar
          topics={topics}
          activeId={activeTopic.id}
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
