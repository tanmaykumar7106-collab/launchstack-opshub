const express = require("express");
const router = express.Router();

const protect = require("../../middleware/auth.middleware");
const validateSOP = require("./sop.validation");

const {
    create,
    getAll,
    getOne,
    update,
    remove,
} = require("./sop.controller");

router.post("/", protect, validateSOP, create);
router.get("/", protect, getAll);
router.get("/:id", protect, getOne);
router.put("/:id", protect, update);
router.delete("/:id", protect, remove);

module.exports = router;