const axios = require("axios");
const Stock = require("../models/Stock");
const { STOCK_SYMBOLS, COMPANY_NAMES } = require("../config/constants");

const API_KEY = process.env.FINNHUB_API_KEY || "demo";

const fetchAndUpdateStocks = async () => {
  console.log("⏳ Fetching latest stock data...");

  for (const symbol of STOCK_SYMBOLS) {
    try {
      const res = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
      );

      const data = res.data;
      if (!data || !data.c) {
        console.warn(`⚠️ Skipping ${symbol}: Invalid response`);
        continue;
      }

      const stockData = {
        symbol,
        name: COMPANY_NAMES[symbol] || symbol,
        ltp: data.c,
        change: data.c - data.pc,
        changePercent: ((data.c - data.pc) / data.pc) * 100,
        lastUpdated: new Date(),
      };

      await Stock.findOneAndUpdate({ symbol }, stockData, {
        upsert: true,
        new: true,
      });

      console.log(`✅ Updated ${symbol}`);
    } catch (err) {
      console.error(`❌ Error updating ${symbol}: ${err.message}`);
    }
  }

  console.log("✅ All stock data updated successfully!");
};

module.exports = fetchAndUpdateStocks;