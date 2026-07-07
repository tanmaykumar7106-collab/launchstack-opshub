const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const taskRoutes = require("./modules/tasks");
const authRoutes = require("./modules/auth/auth.routes");
const clientRoutes = require("./modules/clients");
const dashboardRoutes = require("./modules/dashboard");
const projectRoutes = require("./modules/projects");
const sopRoutes = require("./modules/sop");
const aiRoutes = require("./modules/ai");
const reportRoutes = require("./modules/reports");

const errorHandler = require("./middleware/error.middleware");

const app = express();

/* ===========================
    CORS Configuration
=========================== */

const allowedOrigins = [
    "http://localhost:5173", // Local frontend
    process.env.CLIENT_URL, // Production frontend (Vercel)
].filter(Boolean);

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (Postman, mobile apps, etc.)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

/* ===========================
    Middlewares
=========================== */

app.use(express.json());
app.use(cookieParser());

/* ===========================
    Health Check
=========================== */

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "LaunchStack API is running 🚀",
    });
});

/* ===========================
    API Routes
=========================== */

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/sop", sopRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/reports", reportRoutes);

/* ===========================
    404 Handler
=========================== */

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

/* ===========================
    Global Error Handler
=========================== */

app.use(errorHandler);

module.exports = app;