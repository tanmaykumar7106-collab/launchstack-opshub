const express = require("express");
const router = express.Router();

const protect = require("../../middleware/auth.middleware");
const { getStats } = require("./dashboard.controller");

router.get("/stats", protect, getStats);

module.exports = router;