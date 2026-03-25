const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dataPath = (file) => path.join(__dirname, "../data/finance", file);

router.get("/banks-atms", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("banks-atms.json"), "utf-8"));
  res.json(data);
});

router.get("/budget-allocation", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("budget-allocation.json"), "utf-8"));
  res.json(data);
});

router.get("/tax-revenue", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("tax-revenue.json"), "utf-8"));
  res.json(data);
});

router.get("/smart-payment-systems", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("smart-payment-systems.json"), "utf-8"));
  res.json(data);
});

router.get("/property-market-trends", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath("property-market-trends.json"), "utf-8"));
  res.json(data);
});

module.exports = router;