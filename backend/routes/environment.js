const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dataPath = (file) => path.join(__dirname, "../data/environment", file);

router.get("/air-quality", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("air-quality.json"), "utf-8"));
  res.json(data);
});

router.get("/noise-pollution", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("noise-pollution.json"), "utf-8"));
  res.json(data);
});

router.get("/weather-stations", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("weather-stations.json"), "utf-8"));
  res.json(data);
});

router.get("/water-quality", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("water-quality.json"), "utf-8"));
  res.json(data);
});

router.get("/waste-management", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("waste-management.json"), "utf-8"));
  res.json(data);
});

module.exports = router;