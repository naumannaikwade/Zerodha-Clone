const mongoose = require("mongoose");
const dns = require("dns");

const ensureSrvResolution = async () => {
  if (!process.env.MONGO_URI?.startsWith("mongodb+srv://")) return;

  const hostname = new URL(process.env.MONGO_URI.replace("mongodb+srv://", "http://")).hostname;

  try {
    await dns.promises.resolveSrv(`_mongodb._tcp.${hostname}`);
  } catch (error) {
    if (error.code !== "ECONNREFUSED") throw error;

    dns.setServers(["8.8.8.8", "1.1.1.1"]);
    await dns.promises.resolveSrv(`_mongodb._tcp.${hostname}`);
  }
};

const connectDB = async () => {
  try {
    await ensureSrvResolution();
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
