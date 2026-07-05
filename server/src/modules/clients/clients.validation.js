const validateClient = (req, res, next) => {
const {
    companyName,
    contactPerson,
    email,
    phone,
} = req.body;

if (!companyName || !contactPerson || !email || !phone) {
    return res.status(400).json({
    success: false,
    message:
        "Company name, contact person, email and phone are required.",
    });
}

next();
};

module.exports = validateClient;