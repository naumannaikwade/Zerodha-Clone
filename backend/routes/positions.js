const express = require("express");
const { getUserPositions } = require("../controllers/positionsController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getUserPositions);

module.exports = router;