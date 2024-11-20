// routes/userRoutes.js

const express = require("express");
const { getUser } = require("../controllers/meController");

const router = express.Router();

// Route for retrieving user data
router.get("/", getUser);

module.exports = router;
