const express = require("express");
const cors = require("cors");
const courseRoutes = require("./routes/courseRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", courseRoutes);

// 👇 IMPORTANT FIX FOR RENDER
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("TechLearn Backend is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
