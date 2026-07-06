const express = require("express");
const router = express.Router();

const protect = require("../../middleware/auth.middleware");
const validateProject = require("./projects.validation");

const {
    create,
    getAll,
    getOne,
    update,
    remove,
} = require("./projects.controller");

router.post("/", protect, validateProject, create);
router.get("/", protect, getAll);
router.get("/:id", protect, getOne);
router.put("/:id", protect, update);
router.delete("/:id", protect, remove);

module.exports = router;