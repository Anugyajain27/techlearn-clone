const express = require("express");
const cors = require("cors");
const courseRoutes = require("./routes/courseRoutes");

const app = express();

app.use(cors());
app.use(express.json());

/* Health check route (VERY IMPORTANT) */
app.get("/", (req, res) => {
  res.send("TechLearn backend is running 🚀");
});

/* API routes */
app.use("/api", courseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
