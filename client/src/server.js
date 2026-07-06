require("dotenv").config();
const app = require("./AppRoutes");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Start server
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});