import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CoursePage from "./pages/CoursePage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <span className="nav-left">TechLearn</span>
        <nav className="nav-right">
          <a href="/">Home</a>
          <a href="/">Courses</a>
          <a href="/">About</a>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/topics/intro" />} />
        <Route path="/topics/:id" element={<CoursePage />} />
      </Routes>
    </BrowserRouter>
  );
}
