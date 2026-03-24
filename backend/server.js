const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());


//Mobility

app.get("/mobility/parking-lot", (req, res) => {
    res.json({ message: "mobility - parking lot works" });
});

app.get("/mobility/parking-spaces", (req, res) => {
    res.json({ message: "mobility - parking spaces works" });
});

app.get("/mobility/charging-stations", (req, res) => {
    res.json({ message: "mobility - charging stations works" });
});

app.get("/mobility/traffic-flow", (req, res) => {
    res.json({ message: "mobility - traffic flow works" });
});

app.get("/mobility/accidents", (req, res) => {
    res.json({ message: "mobility - accidents works" });
});

app.get("/mobility/bus-stations", (req, res) => {
    res.json({ message: "mobility - bus stations works" });
});

app.get("/mobility/bike-stations", (req, res) => {
    res.json({ message: "mobility - bike stations works" });
});


// Energy

app.get("/energy/power-consumption", (req, res) => {
    res.json({ message: "energy - power consumption works" });
});

app.get("/energy/renewable-energy-production", (req, res) => {
    res.json({ message: "energy - renewable energy production works" });
});

app.get("/energy/street-lighting-system", (req, res) => {
    res.json({ message: "energy - street lighting system works" });
});

app.get("/energy/carbon-emissions", (req, res) => {
    res.json({ message: "energy - carbon emissions works" });
});


// Environment

app.get("/environment/air-quality-index", (req, res) => {
    res.json({ message: "environment - air quality index works" });
});

app.get("/environment/noise-pollution-data", (req, res) => {
    res.json({ message: "environment - noise pollution data works" });
});

app.get("/environment/weather-station-data", (req, res) => {
    res.json({ message: "environment - weather station data works" });
});

app.get("/environment/water-quality", (req, res) => {
    res.json({ message: "environment - water quality works" });
});

app.get("/environment/waste-management", (req, res) => {
    res.json({ message: "environment - waste management works" });
});


// Health

app.get("/health/hospitals", (req, res) => {
    res.json({ message: "health - hospitals works" });
});

app.get("/health/pharmacies", (req, res) => {
    res.json({ message: "health - pharmacies works" });
});

app.get("/health/disease-monitoring", (req, res) => {
    res.json({ message: "health - disease monitoring works" });
});

app.get("/health/emergency-response", (req, res) => {
    res.json({ message: "health - emergency response works" });
});

app.get("/health/health-alerts", (req, res) => {
    res.json({ message: "health - health alerts works" });
});


// Culture

app.get("/culture/upcoming-events", (req, res) => {
    res.json({ message: "culture - upcoming events works" });
});

app.get("/culture/museums", (req, res) => {
    res.json({ message: "culture - museums works" });
});

app.get("/culture/public-libraries", (req, res) => {
    res.json({ message: "culture - public libraries works" });
});

app.get("/culture/tourism-analytics", (req, res) => {
    res.json({ message: "culture - tourism analytics works" });
});

app.get("/culture/public-wifi-zones", (req, res) => {
    res.json({ message: "culture - public wifi zones works" });
});


// Sport

app.get("/sport/facility-locations", (req, res) => {
    res.json({ message: "sport - facility locations works" });
});

app.get("/sport/gymnasiums", (req, res) => {
    res.json({ message: "sport - gymnasiums works" });
});

app.get("/sport/fitness-activity-trends", (req, res) => {
    res.json({ message: "sport - fitness activity trends works" });
});


// Education

app.get("/education/educational-institutions", (req, res) => {
    res.json({ message: "education - educational institutions works" });
});

app.get("/education/school-transports", (req, res) => {
    res.json({ message: "education - school transports works" });
});

app.get("/education/literacy-statistics", (req, res) => {
    res.json({ message: "education - literacy statistics works" });
});


// Finance

app.get("/finance/banks-atms", (req, res) => {
    res.json({ message: "finance - banks & atms works" });
});

app.get("/finance/budget-allocation", (req, res) => {
    res.json({ message: "finance - budget allocation works" });
});

app.get("/finance/tax-revenue-dashboard", (req, res) => {
    res.json({ message: "finance - tax revenue dashboard works" });
});

app.get("/finance/smart-payment-systems", (req, res) => {
    res.json({ message: "finance - smart payment systems works" });
});

app.get("/finance/property-market-trends", (req, res) => {
    res.json({ message: "finance - property market trends works" });
});


app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});