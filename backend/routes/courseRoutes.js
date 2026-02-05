const express = require("express");
const router = express.Router();

const topics = require("../data/courseData");

router.get("/topics", (req, res) => {
  res.status(200).json(topics);
});

module.exports = router;
