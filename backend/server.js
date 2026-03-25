const express = require("express");
const cors = require("cors");

const mobilityRoutes = require("./routes/mobility");
const energyRoutes = require("./routes/energy");
const environmentRoutes = require("./routes/environment");
const healthRoutes = require("./routes/health");
const cultureRoutes = require("./routes/culture");
const sportRoutes = require("./routes/sport");
const educationRoutes = require("./routes/education");
const financeRoutes = require("./routes/finance");

const app = express();
const PORT = 5000;

const allowedOrigin = "http://localhost:5173";

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Smart City Tokyo API running" });
});

app.use("/mobility", mobilityRoutes);
app.use("/energy", energyRoutes);
app.use("/environment", environmentRoutes);
app.use("/health", healthRoutes);
app.use("/culture", cultureRoutes);
app.use("/sport", sportRoutes);
app.use("/education", educationRoutes);
app.use("/finance", financeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});