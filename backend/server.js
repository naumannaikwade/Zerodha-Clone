require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const validateEnvironment = require("./config/env");
const { createCorsOptions } = require("./config/cors");

// Import routes
const authRoutes = require("./routes/auth");
const fundsRoutes = require("./routes/funds");
const ordersRoutes = require("./routes/orders");
const holdingsRoutes = require("./routes/holdings");
const positionsRoutes = require("./routes/positions");
const stockRoutes = require("./routes/stocks");

const app = express();
const isProduction = process.env.NODE_ENV === "production";

validateEnvironment();

if (isProduction) {
  app.set("trust proxy", 1);
  app.disable("x-powered-by");
}

// Middleware
app.use(cors(createCorsOptions()));
app.use(express.json({ limit: "100kb" }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/funds", fundsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/holdings", holdingsRoutes);
app.use("/api/positions", positionsRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running 🚀" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  const cronEnabled = process.env.ENABLE_STOCK_CRON === "true"
    || (!isProduction && process.env.ENABLE_STOCK_CRON !== "false");

  if (cronEnabled) {
    require("./services/cronService");
  }

  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

startServer();
