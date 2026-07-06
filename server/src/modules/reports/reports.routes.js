const express = require("express");
const router = express.Router();

const protect = require("../../middleware/auth.middleware");
const { getOverview } = require("./reports.controller");

router.get("/overview", protect, getOverview);

module.exports = router;