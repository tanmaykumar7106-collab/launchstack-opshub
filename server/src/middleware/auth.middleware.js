const jwt = require("jsonwebtoken");
const User = require("../modules/auth/auth.model");

// Protect middleware
const protect = async (req, res, next) => {
try {
    let token;

    // Get token from header
    if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
    ) {
    token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
    return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
    });
    console.log("Token:", token);
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded:", decoded);

    // Get user from DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
    return res.status(401).json({
        success: false,
        message: "User not found",
    });
    }

    req.user = user;
    next();
} catch (error) {
    res.status(401).json({
    success: false,
    message: "Not authorized, token failed",
    });
}
};

module.exports = protect;