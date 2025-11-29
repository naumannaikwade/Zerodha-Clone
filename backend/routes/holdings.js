const express = require("express");
const { getUserHoldings } = require("../controllers/holdingsController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getUserHoldings);

module.exports = router;