const express = require("express");
const router = express.Router();

const protect = require("../../middleware/auth.middleware");
const validateTask = require("./tasks.validation");

const {
    create,
    getAll,
    getOne,
    update,
    remove,
} = require("./tasks.controller");

router.post("/", protect, validateTask, create);
router.get("/", protect, getAll);
router.get("/:id", protect, getOne);
router.put("/:id", protect, update);
router.delete("/:id", protect, remove);

module.exports = router;