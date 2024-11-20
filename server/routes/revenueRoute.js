// routes/revenueRoutes.js

const express = require("express")
const { addRevenue, updateRevenue } = require( "../controllers/revenueController.js");

const router = express.Router();

router.post("/", addRevenue);
router.put("/:revenueId", updateRevenue);

module.exports = router
