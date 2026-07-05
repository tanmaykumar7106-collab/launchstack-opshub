const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./auth.model");

// REGISTER USER
const registerUser = async ({ name, email, password }) => {
const existingUser = await User.findOne({ email });

if (existingUser) {
    throw new Error("User already exists");
}

const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
    name,
    email,
    password: hashedPassword,
});

return user;
};

// LOGIN USER
const loginUser = async ({ email, password }) => {
const user = await User.findOne({ email });

if (!user) {
    throw new Error("User not found");
}

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
    throw new Error("Invalid credentials");
}

return user;
};

// GENERATE JWT
const generateToken = (userId) => {
return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
});
};

module.exports = {
registerUser,
loginUser,
generateToken,
};