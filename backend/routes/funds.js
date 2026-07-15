const express = require("express");
const { getUserFunds, addDemoFunds } = require("../controllers/fundsController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getUserFunds);
router.post("/add-demo", authMiddleware, addDemoFunds);

module.exports = router;