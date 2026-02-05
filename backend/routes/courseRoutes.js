const express = require("express");
const router = express.Router();

/* MOCK DATA */
const topics = [
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

router.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

router.get("/topics", (req, res) => {
  res.json(topics);
});

module.exports = router;
