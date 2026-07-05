const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Middlewares
app.use(cors({
origin: "http://localhost:5173",
credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
res.send("API is running...");
});

module.exports = app;