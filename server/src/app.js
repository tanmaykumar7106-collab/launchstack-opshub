const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Routes
const authRoutes = require("./modules/auth/auth.routes");
const clientRoutes = require("./modules/clients");

// Middleware
const errorHandler = require("./middleware/error.middleware");

const app = express();

// =====================
// MIDDLEWARES
// =====================
app.use(
cors({
    origin: "http://localhost:5173",
    credentials: true,
})
);

app.use(express.json());
app.use(cookieParser());

// =====================
// HEALTH CHECK
// =====================
app.get("/", (req, res) => {
res.send("Server working");
});

app.get("/test", (req, res) => {
res.send("Test route working");
});

// =====================
// API ROUTES
// =====================
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);

// =====================
// 404 HANDLER
// =====================
app.use((req, res) => {
res.status(404).json({
    success: false,
    message: "Route not found",
});
});

// =====================
// ERROR HANDLER
// =====================
app.use(errorHandler);

module.exports = app;