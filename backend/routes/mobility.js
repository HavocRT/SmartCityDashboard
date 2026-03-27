const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dataPath = (file) => path.join(__dirname, "../data/mobility", file);

router.get("/parking-lots", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("parking-lots.json"), "utf-8"));
  res.json(data);
});

router.get("/parking-spaces", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("parking-spaces.json"), "utf-8"));
  res.json(data);
});

router.get("/charging-stations", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("charging-stations.json"), "utf-8"));
  res.json(data);
});

router.get("/accidents", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("accidents.json"), "utf-8"));
  res.json(data);
});

router.get("/bus-stations", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("bus-stations.json"), "utf-8"));
  res.json(data);
});

router.get("/bike-stations", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("bike-stations.json"), "utf-8"));
  res.json(data);
});

module.exports = router;