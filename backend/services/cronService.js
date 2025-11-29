const cron = require("node-cron");
const fetchAndUpdateStocks = require("../utils/fetchAndUpdateStocks.js");

// Run immediately at start
fetchAndUpdateStocks();

// Schedule every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  console.log("🔁 Running scheduled stock update...");
  await fetchAndUpdateStocks();
});