const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dataPath = (file) => path.join(__dirname, "../data/sport", file);

router.get("/facility-locations", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("facility-locations.json"), "utf-8"));
  res.json(data);
});

router.get("/gymnasiums", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("gymnasiums.json"), "utf-8"));
  res.json(data);
});

router.get("/fitness-activity-trends", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("fitness-activity-trends.json"), "utf-8"));
  res.json(data);
});

module.exports = router;