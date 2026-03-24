const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dataPath = (file) => path.join(__dirname, "../data/energy", file);

router.get("/power-consumption", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("power-consumption.json"), "utf-8"));
  res.json(data);
});

router.get("/renewable-energy", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("renewable-energy.json"), "utf-8"));
  res.json(data);
});

router.get("/street-lighting", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("street-lighting.json"), "utf-8"));
  res.json(data);
});

router.get("/carbon-emissions", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("carbon-emissions.json"), "utf-8"));
  res.json(data);
});

module.exports = router;