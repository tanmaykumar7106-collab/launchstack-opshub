const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const taskRoutes = require("./modules/tasks");
const authRoutes = require("./modules/auth/auth.routes");
const clientRoutes = require("./modules/clients");
const dashboardRoutes = require("./modules/dashboard");
const projectRoutes = require("./modules/projects");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Server working");
});

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

app.use(errorHandler);

module.exports = app;