const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dataPath = (file) => path.join(__dirname, "../data/health", file);

router.get("/hospitals", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("hospitals.json"), "utf-8"));
  res.json(data);
});

router.get("/pharmacies", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("pharmacies.json"), "utf-8"));
  res.json(data);
});

router.get("/disease-monitoring", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("disease-monitoring.json"), "utf-8"));
  res.json(data);
});

router.get("/emergency-response", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("emergency-response.json"), "utf-8"));
  res.json(data);
});

router.get("/health-alerts", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("health-alerts.json"), "utf-8"));
  res.json(data);
});

module.exports = router;