const express = require("express");
const { buyStock, sellStock, getUserOrders } = require("../controllers/ordersController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.use(authMiddleware);
router.post("/buy", buyStock);
router.post("/sell", sellStock);
router.get("/", getUserOrders);

module.exports = router;