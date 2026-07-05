const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./modules/auth/auth.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

// Middlewares
app.use(
cors({
    origin: "http://localhost:5173",
    credentials: true,
})
);

app.use(express.json());
app.use(cookieParser());

// Health Check
app.get("/", (req, res) => {
res.send("Server working");
});

app.get("/test", (req, res) => {
res.send("Test route working");
});

// Routes
app.use("/api/auth", authRoutes);

// 404
app.use((req, res) => {
res.status(404).json({
    success: false,
    message: "Route not found",
});
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;