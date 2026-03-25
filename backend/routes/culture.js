const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dataPath = (file) => path.join(__dirname, "../data/culture", file);

router.get("/upcoming-events", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("upcoming-events.json"), "utf-8"));
  res.json(data);
});

router.get("/museums", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("museums.json"), "utf-8"));
  res.json(data);
});

router.get("/public-libraries", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("public-libraries.json"), "utf-8"));
  res.json(data);
});

router.get("/tourism-analytics", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("tourism-analytics.json"), "utf-8"));
  res.json(data);
});

router.get("/wifi-zones", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("wifi-zones.json"), "utf-8"));
  res.json(data);
});

module.exports = router;