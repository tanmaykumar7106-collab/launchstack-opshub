const express = require("express");
const router = express.Router();

const protect = require("../../middleware/auth.middleware");

const {
    generateSOP,
    generateTasks,
    generateEmail,
} = require("./ai.controller");

router.post("/sop", protect, generateSOP);
router.post("/tasks", protect, generateTasks);
router.post("/email", protect, generateEmail);

module.exports = router;