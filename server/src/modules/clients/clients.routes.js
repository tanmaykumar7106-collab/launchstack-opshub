const express = require("express");

const router = express.Router();

const protect = require("../../middleware/auth.middleware");

const validateClient = require("./clients.validation");

const {
create,
getAll,
getOne,
update,
remove,
} = require("./clients.controller");

// Debug route (remove later)
router.get("/ping", (req, res) => {
res.json({
    success: true,
    message: "Clients route is working",
});
});

router.post("/", protect, validateClient, create);

router.get("/", protect, getAll);

router.get("/:id", protect, getOne);

router.put("/:id", protect, update);

router.delete("/:id", protect, remove);

module.exports = router;