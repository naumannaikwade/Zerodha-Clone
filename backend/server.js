// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const fundsRoutes = require("./routes/funds");
const ordersRoutes = require("./routes/orders");
const holdingsRoutes = require("./routes/holdings");
const positionsRoutes = require("./routes/positions");
const errorLogger = require("./middleware/errorLogger");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

// ✅ CORS for frontend + credentials
app.use(cors({
  origin: process.env.FRONTEND_URL, // e.g., https://zerodha-clone-5t7q.onrender.com
  credentials: true,
}));

// ✅ Session setup for cross-domain cookies
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: true,       // must be true on HTTPS
      sameSite: "none",   // allow cross-domain
    },
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/funds", fundsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/holdings", holdingsRoutes);
app.use("/api/positions", positionsRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

// Error handler
app.use(errorLogger);
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
