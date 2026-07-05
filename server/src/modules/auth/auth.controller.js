const { registerUser, loginUser, generateToken } = require("./auth.service");

// =========================
// REGISTER CONTROLLER
// =========================
const register = async (req, res) => {
try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
    return res.status(400).json({
        success: false,
        message: "All fields are required",
    });
    }

    const user = await registerUser({ name, email, password });

    const token = generateToken(user._id);

    res.status(201).json({
    success: true,
    user: {
        id: user._id,
        name: user.name,
        email: user.email,
    },
    token,
    });
} catch (error) {
    res.status(400).json({
    success: false,
    message: error.message,
    });
}
};

// =========================
// LOGIN CONTROLLER
// =========================
const login = async (req, res) => {
try {
    const { email, password } = req.body;

    if (!email || !password) {
    return res.status(400).json({
        success: false,
        message: "Email and password are required",
    });
    }

    const user = await loginUser({ email, password });

    const token = generateToken(user._id);

    res.status(200).json({
    success: true,
    user: {
        id: user._id,
        name: user.name,
        email: user.email,
    },
    token,
    });
} catch (error) {
    res.status(400).json({
    success: false,
    message: error.message,
    });
}
};

// GET CURRENT USER
const getMe = async (req, res) => {
res.status(200).json({
    success: true,
    user: req.user,
});
};

module.exports = {
register,
login,
getMe,
};

