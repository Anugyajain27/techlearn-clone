const express = require("express");
const cors = require("cors");
const courseRoutes = require("./routes/courseRoutes");

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.use("/api", courseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
