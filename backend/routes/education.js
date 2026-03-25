const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dataPath = (file) => path.join(__dirname, "../data/education", file);

router.get("/educational-institutions", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("educational-institutions.json"), "utf-8"));
  res.json(data);
});

router.get("/school-transports", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("school-transports.json"), "utf-8"));
  res.json(data);
});

router.get("/literacy-statistics", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("literacy-statistics.json"), "utf-8"));
  res.json(data);
});

module.exports = router;